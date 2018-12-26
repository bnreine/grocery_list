const express = require("express");
const router = express.Router();
const listController = require("../controllers/listController")

router.get("/grocery_list", listController.index);
router.post("/grocery_list/add_item", listController.addItem);
router.post("/grocery_list/check_uncheck_item", listController.checkUncheckItem);
router.post("/grocery_list/delete", listController.deleteItem);

module.exports = router;
