const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/grocery_list/";
const sequelize = require('../../src/db/models/index').sequelize;
const List = require("../../src/db/models").List;

describe("routes : lists", () => {

  beforeEach((done) => {
    this.item1;
    this.item2;

    sequelize.sync({force: true}).then((res) => {
      List.create({
        item: "cabbage",
        purchased: false
      })
      .then((item1) => {
        this.item1 = item1;
        List.create({
          item: "pasta",
          purchased: true
        })
        .then((item2) => {
          this.item2 = item2;
          done();
        })
        .catch((err) => {
          console.log(err);
          done();
        })
        done();
      })
      .catch((err) => {
        console.log(err);
        done();
      })
      done();
    });
  });



  describe("GET /grocery_list", () => {

    it("should return a status code 200", (done) => {
      request.get(base, (err, res, body) => {
        expect(res.statusCode).toBe(200);
        done();
      });
    });

  });
});
