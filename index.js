const express = require("express");

const app = express();

app.get("/", (_, res) => {
  res.send("Привіт, запит виконався");
});

app.listen(8080, () => {
  console.log("Server started on port 8080");
});
