const multer = require("multer");

const uploadMiddleware = multer({
  dest: "./uploads/",
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype !==
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ) {
      cb(new Error("Please upload an Excel file."));
      return;
    }

    cb(null, true);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

module.exports = uploadMiddleware;
