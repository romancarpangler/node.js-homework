const multer = require("multer");
const path = require("path");

const way = path.resolve("tmp");

const storage = multer.diskStorage({
  destination: way,
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

module.exports = upload;
