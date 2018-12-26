const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:5000/grocery_list/";
const sequelize = require('../../src/db/models/index').sequelize;
const List = require("../../src/db/models").List;

console.log("hello")


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
        expect(body).not.toBeNull();
        done();
      });
    });

  });



  describe("POST /grocery_list/add_item", () => {
    it("should add an item to the database", (done) => {
      const options = {
        url: `${base}add_item`,
        form: {
          newListItem: {
            item: "tomatos",
            purchased: false
          }
        }
      };
        request.post(options, (err, res, body) => {
          List.findOne({where: {item: "tomatos"}})
          .then((list) => {
            expect(list).not.toBeNull();
            expect(list.item).toBe("tomatos");
            expect(list.purchased).toBe(false);
            done();
          })
          .catch((err) => {
            console.log(err);
            done();
          })
        })
    })

  })





/*

  describe("POST /grocery_list/check_uncheck_item", () => {
    it("should update item in the database", (done) => {


      const options = {
        url: `${base}add_item`,
        form: {
          newListItem: {
            item: "ravioli",
            purchased: false
          }
        }
      };
      request.post(options, (err, res, body) => {
        List.findOne({where: {item: "tomatos"}})
        .then((list) => {
          expect(list).not.toBeNull();
          expect(list.item).toBe("tomatos");
          expect(list.purchased).toBe(false);
          done();
        })
        .catch((err) => {
          console.log(err);
          done();
        })
      })







      List.findById(1)
      .then((listItem) => {
        expect(listItem.item).toBe("cabbage");
        listItem.update(updatedListItem, {
          fields: Object.keys(updatedListItem)
        })
        .then((newlyUpdatedListItem) => {
          expect(newlyUpdatedListItem.item).toBe("ravioli");
          done();
        })
        .catch((err) => {
          console.log(err);
          done();
        });
      });
    })
  })
*/




});
