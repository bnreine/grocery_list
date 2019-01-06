module.exports = {
  index(req, res, next){
    //res.render("static/index", {title: "Welcome to Grocery List"});
    res.send("Welcome to Grocery List")
  }
}
