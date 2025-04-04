const express = require("express");
const {
  getTransactions,
  addTransaction,
  removeTransaction,
} = require("../controllers/transactions");

const router = express.Router();

router.get("/", getTransactions);

router.post("/", addTransaction);

router.delete("/:id", removeTransaction);

module.exports = router;
