const express = require("express");
const {
  registerUser,
  loginUser,
  getUsers,
  getUserById,
  editUser,
  deleteUser,
} = require("../controllers/authController");
const authenticate = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

router.get("/users", authenticate, getUsers);
router.get("/users/:id", authenticate, getUserById);
router.put("/users/:id", authenticate, editUser);
router.delete("/users/:id", authenticate, deleteUser);

module.exports = router;
