const mongoose = require("mongoose");
const app = require("./app");

const { host } = process.env;
mongoose
  .connect(host)
  .then(() => {
    app.listen(3000, () => {
      console.log("Database connection successful");
    });
  })
  .catch((err) => {
    console.log(err.message);
    process.exit(1);
  });
