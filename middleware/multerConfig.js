const multer = require("multer");
const path = require("path");

//SET STORAGE
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); //FILES STORAGE PATH
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); //FILENAME
  },
});

//FILE VALIDATE
const fileFilter = (req, file, cb) => {
  // console.log("Received file:", file);
  const allowedFileTypes = /\.(jpeg|jpg|png)$/i;
  const extname = allowedFileTypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  // const mimetype = allowedFileTypes.test(file.mimetype);
  const mimetype = /image\/(jpeg|jpg|png)/.test(file.mimetype);
  // console.log("Extname Check:", path.extname(file.originalname), extname); // Debug
  // console.log("Mimetype Check:", file.mimetype, mimetype); // Debug
  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb(new Error("Only .jpeg .png and .jpg files are allowed!"));
  }
};

//UPLOAD CONFIG
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, //MAX FILE SIZE:5 MB
});

module.exports = upload;
