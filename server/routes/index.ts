import fs from "fs";
import path from "path";

export = routes => {
  // API routes
  fs.readdirSync(__dirname + "/api/").forEach(file => {
    require(`./api/${file.substr(0, file.indexOf("."))}`)(routes);
  });
};
