const listQueries = require("../db/queries.lists.js");


module.exports = {
  index(req, res, next){
    listQueries.getAllListItems((err, lists) => {
      if(err){
        res.redirect("/");
      } else {
        res.render("lists/grocery_list_static", {lists});
      }
    })
  }
}
