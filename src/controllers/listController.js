const listQueries = require("../db/queries.lists.js");


module.exports = {
  index(req, res, next){
    listQueries.getAllListItems((err, lists) => {
      if(err){
        res.redirect("/");
      } else {
        res.send({lists});
      }
    })
  },
  addItem(req, res, next){
    let newListItem= {
      item: req.body.newListItem.item,
      purchased: req.body.newListItem.purchased
    };
    listQueries.addListItem(newListItem, (err, listItem) => {
      if(err){
        console.log(err);
      } else {
        res.send({listItem});
      }
    })
  },
  checkUncheckItem(req, res, next){
    const updatedListItem = req.body.listItem;

    listQueries.updatePurchased(updatedListItem, (err, listItem) => {
      if(err){
        console.log(err);
      } else {
        res.send({listItem});
      }
    })
  },
  deleteItem(req, res, next){

    const deletionId = req.body.listItem.id;

    listQueries.delete(deletionId, (err, listItem) => {
      if(err){
        console.log(err);
      } else {
        res.send({listItem});
      }
    })
  },

}
