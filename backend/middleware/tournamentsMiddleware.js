const multer = require("multer"); // Import multer for handling file uploads
const fs = require("fs");
const path = require("path");

// Create products folder if it doesn't exist
const uploadDir = path.join(__dirname, "../tournamentImages");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname +
        "-" +
        uniqueSuffix +
        "." +
        file.originalname.split(".").pop()
    );
  },
});

// req.file: contains information about the uploaded file, including its original name, encoding, MIME type, and the path where it was saved on the server.
// if football.jpeg is uploaded then:
// file.fieldname = image
// file.originalname = football.jpeg
// file.path = tournamentImages/image-123456789.jpeg
// file.originalname.split('.').pop() will give the extension "jpeg".

const fileFilter = function (req, file, cb) {
  if (
    file.mimetype === "image/jpeg" || file.mimetype === "image/png" || file.mimetype === "image/jpg"
  ) {
    cb(null, true);
  } else {
    cb(new Error("Only JPEG or PNG or JPG files are allowed!"), false);
  }
};


const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
});

module.exports = upload ;