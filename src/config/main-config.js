require("dotenv").config();
const path = require("path");
const viewsFolder = path.join(__dirname, "..", "views");
const bodyParser = require('body-parser');

module.exports = {
  init(app, express){
    app.set("views", viewsFolder);
    app.set("view engine", "ejs");
    app.use(express.static(path.join(__dirname, "..", "assets")));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    if (process.env.NODE_ENV === 'production') {
      app.use(express.static(path.join(__dirname, './../../client/build')));
      app.get('*', function(req, res) {   //separate to routing
        res.sendFile(path.join(__dirname, './../../client/build', 'index.html'));  //separate to controller
      });
    }



  }
};
