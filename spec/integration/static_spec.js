const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/";

describe("routes: static", () => {

  describe("GET /", () => {
    it("should contain Welcome to grocery list", (done) => {
        request.get(base, (err, res, body) => {
          expect(body).toContain("Welcome to Grocery List");
          done();
        })
    })

  })


})
