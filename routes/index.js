const express = require("express");

const router = express.Router();

const chemicalsRouter = require("./chemicals");
const transactionsRouter = require("./transactions");
const inventoryRouter = require("./inventory");
const pingRouter = require("./ping");

router.use("/chemicals", chemicalsRouter);
router.use("/transactions", transactionsRouter);
router.use("/inventory", inventoryRouter);
router.use("/ping", pingRouter);

module.exports = router;
