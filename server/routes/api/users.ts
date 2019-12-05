// const User = require("../../models/User");
// const cloudinary = require("cloudinary");

import User from "../../models/User";
const cloudinary = require("cloudinary");

export = app => {
  app.get("/api/users", (req, res, next) => {
    User.find()
      .exec()
      .then(users => res.json(users))
      .catch(err => next(err));
  });

  app.get("/api/users/:id", (req, res, next) => {
    User.findById(req.params.id)
      .exec()
      .then(user => res.json(user))
      .catch(err => next(err));
  });

  app.post("/api/users", (req, res, next) => {
    if (!req.body || !req.files) {
      return;
    }
    const { body, files } = req;
    let {
      accountHolderName,
      email,
      contact,
      password,
      userType,
      gender,
      addressProofType,
      idProofType
    } = body;

    let { addressProof, idProof, photo } = files;
    let userRawData = {
      accountHolderName: accountHolderName,
      email: email,
      contact: contact,
      userType: userType,
      gender: gender,
      addressProof: {
        type: addressProofType,
        document: {}
      },
      idProof: {
        type: idProofType,
        document: {}
      },
      photo: {}
    };

    if (!email) {
      return res.send({
        success: false,
        message: "Error: Email cannot be blank."
      });
    }
    if (!password) {
      return res.send({
        success: false,
        message: "Error: Password cannot be blank."
      });
    }
    email = email.toLowerCase();
    email = email.trim();
    User.find(
      {
        email: email
      },
      (err, previousUsers) => {
        if (err) {
          return res.send({
            success: false,
            message: "Error: Server error"
          });
        } else if (previousUsers.length > 0) {
          return res.send({
            success: false,
            users: previousUsers,
            message: "Error: Account with this email already exist."
          });
        }

        //SAVE USER OTHERWISE
        let promiseAddressProof = cloudinary.uploader.upload(
          addressProof["path"]
        );
        let promiseIdProof = cloudinary.uploader.upload(idProof["path"]);
        let promisePhoto = cloudinary.uploader.upload(photo["path"]);

        Promise.all([promiseAddressProof, promiseIdProof, promisePhoto])
          .then(results => {
            userRawData.addressProof.document = results[0];
            userRawData.idProof.document = results[1];
            userRawData.photo = results[2];
            let NewUser = new User(userRawData);
            NewUser.password = NewUser.generateHash(password);
            /*NewUser.save()
          .then(user => res.json(user))
          .catch(err => next(err));*/
            NewUser.save((err, user) => {
              if (err) {
                return res.send({
                  success: false,
                  message: "Error: Server error"
                });
              }
              return res.send({
                success: true,
                user: user,
                message: "Signed up"
              });
            });
          })
          .catch(err => res.status(400).json(err));
      }
    );
  });
  app.put("/api/users/:id", (req, res, next) => {
    if (!req.body) {
      return;
    }
    const { body } = req;
    let {
      accountHolderName,
      email,
      contact,
      password,
      userType,
      gender,
      addressProofType,
      idProofType
    } = body;
    let userRawData = {
      accountHolderName: accountHolderName,
      email: email,
      contact: contact,
      password: password,
      userType: userType,
      gender: gender,
      addressProof: {
        type: addressProofType
      },
      idProof: {
        type: idProofType
      },
      photo: {}
    };

    let promises = [];

    User.findById(req.params.id)
      .exec()
      .then(user => {
        if (req.files["addressProof"]) {
          promises.push(
            cloudinary.uploader
              .upload(req.files["addressProof"]["path"])
              .then(result => {
                userRawData.addressProof["document"] = result;
              })
          );
          promises.push(
            cloudinary.uploader.destroy(user.addressProof.document["public_id"])
          );
        } else {
          userRawData.addressProof["document"] = JSON.parse(
            req.body.addressProof
          );
        }
        if (req.files["idProof"]) {
          promises.push(
            cloudinary.uploader
              .upload(req.files["idProof"]["path"])
              .then(result => {
                userRawData.idProof["document"] = result;
              })
          );
          promises.push(
            cloudinary.uploader.destroy(user.idProof.document["public_id"])
          );
        } else {
          userRawData.idProof["document"] = JSON.parse(req.body.idProof);
        }
        if (req.files["photo"]) {
          promises.push(
            cloudinary.uploader
              .upload(req.files["photo"]["path"])
              .then(result => {
                userRawData.photo = result;
              })
          );
          promises.push(cloudinary.uploader.destroy(user.photo["public_id"]));
        } else {
          userRawData.photo = JSON.parse(req.body.photo);
        }
        Promise.all(promises)
          .then(() => {
            //console.log("then userRawData", userRawData);
          })
          .finally(() => {
            //console.log("finally userRawData", userRawData);
            let OldUser = new User(userRawData);
            userRawData.password = OldUser.generateHash(password);
            User.findOneAndUpdate(
              { _id: req.params.id },
              { $set: userRawData },
              { new: true, useFindAndModify: false }
            )
              .then(user => res.json(user))
              .catch(err => next(err));
          })
          .catch(err => res.status(400).json(err));
      });
  });

  app.delete("/api/users/:id", (req, res, next) => {
    User.findById(req.params.id)
      .exec()
      .then(user => {
        let values = [
          user.addressProof.document.public_id,
          user.idProof.document.public_id,
          user.photo.public_id
        ];
        const promises = values.map(publicid =>
          cloudinary.uploader.destroy(publicid)
        );
        Promise.all(promises)
          .then(results => {
            User.findOneAndRemove({ _id: user._id })
              .exec()
              .then(() => {
                res.json({});
              })
              .catch(err => next(err));
          })
          .catch(err => res.status(400).json(err));
      });

    // User.findOneAndRemove({ _id: req.params.id })
    //   .exec()
    //   .then(() => {
    //     res.json({});
    //   })
    //   .catch(err => next(err));
  });
};
