const sequelize = require("../../src/db/models/index").sequelize;
const List = require("../../src/db/models").List;

describe("Topic", () => {

  beforeEach((done) => {
    sequelize.sync({force: true}).then((res) => {
      done();
    });
  });





  describe("#create()", () => {
    it("should create and store list object with an item name and purchased boolean", (done) => {
      List.create({
        item: "butter",
        purchased: false
      })
      .then((list) => {
        expect(list.item).toBe("butter");
        done();
      })
      .catch((err) => {
        console.log(err);
        done();
      })
    })
  })



})
