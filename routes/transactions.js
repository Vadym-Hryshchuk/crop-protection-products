const express = require("express");
const {
  getTransactions,
  addTransaction,
} = require("../controllers/transactions");

const router = express.Router();

router.get("/", getTransactions);

router.post("/", addTransaction);

router.delete("/:id");

module.exports = router;
