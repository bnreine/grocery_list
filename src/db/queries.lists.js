const List = require("./models").List;


module.exports = {
  getAllListItems(callback){
    List.findAll({
      attributes: ['item', 'purchased', 'id']
    })
    .then((lists) => {
      callback(null, lists);
    })
    .catch((err) => {
      callback(err);
    })
  },
  addListItem(newListItem, callback){
    return List.create(newListItem)
    .then((listItem) => {
      callback(null, listItem);
    })
    .catch((err) => {
      callback(err);
    })
  },
}
