const express = require("express");
const cors = require("cors");

const app = express();
const routes = require("./routes");

app.use(cors());
app.use(express.json());

app.use("/api", routes);

app.use((_, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, _, res, __) => {
  res.status(500).json({ message: err.message });
});

module.exports = app;
