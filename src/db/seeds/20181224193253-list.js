'use strict';

var lists = [];

lists.push({
  id: 1,
  item: "green eggs",
  purchased: false,
  createdAt: new Date(),
  updatedAt: new Date(),
});

lists.push({
  id: 2,
  item: "ham",
  purchased: false,
  createdAt: new Date(),
  updatedAt: new Date(),
});

lists.push({
  id: 3,
  item: "beans",
  purchased: true,
  createdAt: new Date(),
  updatedAt: new Date(),
});

module.exports = {
  up: (queryInterface, Sequelize) => {
     return queryInterface.bulkInsert("Lists", lists, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Lists", null, {});
  }
};
