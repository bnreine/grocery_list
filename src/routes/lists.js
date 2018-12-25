const express = require("express");
const router = express.Router();
const listController = require("../controllers/listController")

router.get("/grocery_list", listController.index);

module.exports = router;
