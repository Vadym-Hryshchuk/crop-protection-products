const express = require("express");

const router = express.Router();

const chemicalsRouter = require("./chemicals");
const transactionsRouter = require("./transactions");
const inventoryRouter = require("./inventory");

router.use("/chemicals", chemicalsRouter);
router.use("/transactions", transactionsRouter);
router.use("/inventory", inventoryRouter);

module.exports = router;
