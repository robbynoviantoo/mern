const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

// Konfigurasi penyimpanan Multer untuk Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "user-profiles", // Folder di Cloudinary
    allowed_formats: ["jpg", "png", "jpeg"], // Format yang diperbolehkan
  },
});

const upload = multer({ storage });

module.exports = upload;