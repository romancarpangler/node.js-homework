const mongoose = require("mongoose");
const app = require("./app");

const db =
  "mongodb+srv://roman:Noro2005@cluster0.n6tskri.mongodb.net/home-work-contacts?retryWrites=true&w=majority";

mongoose
  .connect(db)
  .then(() => {
    app.listen(3000, () => {
      console.log("Server running. Use our API on port: 3000");
    });
  })
  .catch((err) => {
    console.log(err.message);
    process.exit(1);
  });
