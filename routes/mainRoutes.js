//Require's
const express = require("express");
const router = express.Router();

//Controller
const mainController = require("../controllers/mainController");
const data = require('../controllers/dataController');

//Index
router.get("/", mainController.index);



module.exports = router;
