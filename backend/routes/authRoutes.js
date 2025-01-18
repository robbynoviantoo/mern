const express = require("express");
const {
  registerUser,
  loginUser,
  editUser,
} = require("../controllers/authController");
const authenticate = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.put(
  "/edit/:userId",
  authenticate,
  upload.single("profileImage"),
  editUser
);

module.exports = router;
