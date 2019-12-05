import bodyParser from "body-parser";
import express from "express";
import path from "path";
import mongoose from "mongoose";

import routes from "./routes/index";
import config from "./config/config";
const isDev = process.env.NODE_ENV !== "production";
const app = express();
const port = process.env.PORT || 5000;
mongoose.connect(isDev ? config["db_dev"] : config["db"]);
mongoose.Promise = global.Promise;
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");

  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, "../../client/build")));
routes(app);
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../../client/build/index.html"));
  res.end();
});

app.listen(port, () => console.log(`Listening on port ${port}`));
