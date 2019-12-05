// const UserSession = require("../../models/UserSession");
// const User = require("../../models/User");
// const bcrypt = require("bcryptjs");

import UserSession from "../../models/UserSession";
import User from "../../models/User";
import bcrypt from "bcryptjs";
export = app => {
  app.post("/api/account/signin", (req, res, next) => {
    const { body } = req;
    const { password } = body;
    let { email } = body;
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
      (err, users) => {
        if (err) {
          console.log("err 2:", err);
          return res.send({
            success: false,
            message: "Error: server error"
          });
        }
        if (users.length != 1) {
          return res.send({
            success: false,
            message: "*No user found with email id specified"
          });
        }
        const user = users[0];
        bcrypt.compare(password, user.password, (err, success) => {
          if (err) {
            return res.send({
              success: false,
              err: err,
              message: "Error: server error"
            });
          }
          if (success) {
            const userSession = new UserSession();
            userSession.userId = user._id;
            userSession.save((err, doc) => {
              if (err) {
                console.log(err);
                return res.send({
                  success: false,
                  message: "Error: server error"
                });
              }
              return res.send({
                success: true,
                message: "*SignIn successfull",
                token: doc._id
              });
            });
          } else {
            return res.json({
              success: false,
              message: "*Password do not match"
            });
          }
        });
      }
    );
  });
  app.get("/api/account/logout", (req, res, next) => {
    // Get the token
    const { query } = req;
    const { token } = query;
    // ?token=test
    // Verify the token is one of a kind and it's not deleted.
    UserSession.findOneAndUpdate(
      {
        _id: token,
        isDeleted: false
      },
      {
        $set: {
          isDeleted: true
        }
      },
      null,
      (err, sessions) => {
        if (err) {
          console.log(err);
          return res.send({
            success: false,
            message: "Error: Server error"
          });
        }
        return res.send({
          success: true,
          message: "Good"
        });
      }
    );
  });
  app.get("/api/account/verify", (req, res, next) => {
    // Get the token
    const { query } = req;
    const { token } = query;
    // ?token=test
    // Verify the token is one of a kind and it's not deleted.
    UserSession.find(
      {
        _id: token,
        isDeleted: false
      },
      (err, sessions) => {
        if (err) {
          console.log(err);
          return res.send({
            success: false,
            message: "Error: Server error"
          });
        }
        if (sessions.length != 1) {
          return res.send({
            success: false,
            message: "Error: Invalid"
          });
        } else {
          // DO ACTION
          return res.send({
            success: true,
            message: "Good"
          });
        }
      }
    );
  });
};
