const express = require("express");
const router = express.Router();
const  employeeController  = require("../../controller/employeesController");

router.route("/").get(employeeController.getAllEmployees);

module.exports = router