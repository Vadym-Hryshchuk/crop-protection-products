const app = require("./app");

const mongoose = require("mongoose");

// mongoose.set("strictQuery", true);

const { DB_HOST } = process.env;

mongoose
  .connect(DB_HOST)
  .then(() => {
    console.log("Database connection successful");
    app.listen(8080, () => {
      console.log("Server started successful");
    });
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
