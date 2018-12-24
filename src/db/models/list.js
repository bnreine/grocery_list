'use strict';
module.exports = (sequelize, DataTypes) => {
  const List = sequelize.define('List', {
    item: {
      type: DataTypes.STRING,
      allowNull: false
    },
    purchased: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  }, {});
  List.associate = function(models) {
    // associations can be defined here
  };
  return List;
};
