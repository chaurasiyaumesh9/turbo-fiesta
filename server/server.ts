import bodyParser from "body-parser";
import express from "express";
import { postMessages, putMessage } from "./routes/messages";
import { getUser } from "./routes/users";
import path from "path";
const app = express();
const port = process.env.PORT || 5000;

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// user
app.get("/api/users/:id", getUser);

// messages
app.post("/api/messages", postMessages);
app.put("/api/messages/:id", putMessage);

// app.get("/*", function(req, res) {
//   res.sendFile(path.resolve(__dirname, "./build", "index.html"));
// });
// tslint:disable-next-line:no-console
app.listen(port, () => console.log(`Listening on port ${port}`));
