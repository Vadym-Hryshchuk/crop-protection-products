const express = require("express");
const { getInventorys } = require("../controllers/inventory");

const router = express.Router();

router.get("/", getInventorys);

// router.post("/", addTransaction);

router.delete("/:id");

module.exports = router;
