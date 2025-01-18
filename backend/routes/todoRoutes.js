const express = require("express");
const authenticate = require("../middleware/authMiddleware");
const {
  createTodo,
  getTodos,
  updateTodo,
  deleteTodo,
  updateTodoOrder,
} = require("../controllers/todoController");

const router = express.Router();

// Membuat Todo baru
router.post("/", authenticate, createTodo);

// Mendapatkan semua Todos berdasarkan user
router.get("/:userId", authenticate, getTodos);

// Mengupdate Todo
router.put("/:todoId", authenticate, updateTodo);

// Menghapus Todo
router.delete("/:todoId", authenticate, deleteTodo);

// Mengupdate urutan Todo
router.put("/update-order", authenticate, updateTodoOrder);

module.exports = router;
