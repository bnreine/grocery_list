const List = require("./models").List;


module.exports = {
  getAllListItems(callback){
    List.all()
    .then((lists) => {
      callback(null, lists);
    })
    .catch((err) => {
      callback(err);
    })
  }
}
