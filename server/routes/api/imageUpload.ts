const cloudinary = require("cloudinary");
export = app => {
  app.post("/api/image-upload", (req, res) => {
    //console.log("req.files", req.files);
    const values = Object.values(req.files);
    const promises = values.map(image =>
      cloudinary.uploader.upload(image["path"])
    );

    Promise.all(promises)
      .then(results => res.json(results))
      .catch(err => res.status(400).json(err));
  });
};
