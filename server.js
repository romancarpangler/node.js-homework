const mongoose = require("mongoose");
const app = require("./app");

const { host } = process.env;
mongoose
  .connect(host)
  .then(() => {
    app.listen(3000, () => {
      console.log("Server running. Use our API on port: 3000");
    });
  })
  .catch((err) => {
    console.log(err.message);
    process.exit(1);
  });
