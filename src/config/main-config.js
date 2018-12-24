require("dotenv").config();
const path = require("path");
const viewsFolder = path.join(__dirname, "..", "views");

module.exports = {
  init(app, express){
    app.set("views", viewsFolder);
    console.log("before")
    app.set("view engine", "ejs");  //Seems to work properly
    console.log("after")
    app.use(express.static(path.join(__dirname, "..", "assets")));
  }
};
