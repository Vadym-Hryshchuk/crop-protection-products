const express = require("express");
const {
  getChemicals,
  addChemicals,
  removeChemicals,
} = require("../controllers/chemicals");

const router = express.Router();

router.get("/", getChemicals);

router.post("/", addChemicals);

router.delete("/", removeChemicals);

module.exports = router;
