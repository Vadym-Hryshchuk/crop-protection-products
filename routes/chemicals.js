const express = require("express");
const { getChemicals, addChemicals } = require("../controllers/chemicals");

const router = express.Router();

router.get("/", getChemicals);

router.post("/", addChemicals);

router.delete("/:id");

module.exports = router;
