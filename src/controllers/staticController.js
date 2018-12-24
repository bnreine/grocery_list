module.exports = {
  index(req, res, next){
    //res.send("Hello There")  //works up to controller
    res.render("static/index", {title: "Welcome to Grocery List"});
  }
}
