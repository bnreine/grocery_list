const List = require("./models").List;


module.exports = {
  getAllListItems(callback){
    List.findAll({
      order: [
        ['id', 'ASC'],
      ],
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
  updatePurchased(updatedListItem, callback){
    return List.findById(updatedListItem.id)
    .then((listItem) => {
      if(!listItem){
        return callback("List Item not found");
      }
      listItem.update(updatedListItem, {
        fields: Object.keys(updatedListItem)
      })
      .then(() => {
        callback(null, listItem);
      })
      .catch((err) => {
        callback(err);
      });
    });
  },
  delete(id, callback){
    return List.findById(id)
    .then((listItem) => {
        listItem.destroy()
        .then((res) => {
          callback(null, listItem);
        });
    })
    .catch((err) => {
      callback(err);
    });
  },
  updateItem(updatedListItem, callback){
    return List.findById(updatedListItem.id)
    .then((listItem) => {
      if(!listItem){
        return callback("List Item not found");
      }
      listItem.update(updatedListItem, {
        fields: Object.keys(updatedListItem)
      })
      .then(() => {
        callback(null, listItem);
      })
      .catch((err) => {
        callback(err);
      });
    });
  },

}
