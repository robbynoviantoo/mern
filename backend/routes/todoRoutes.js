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

// Mendapatkan semua Todos berdasarkan user (gunakan user dari token)
router.get("/", authenticate, getTodos);

// Mengupdate Todo berdasarkan ID
router.put("/:todoId", authenticate, updateTodo);

// Menghapus Todo berdasarkan ID
router.delete("/:todoId", authenticate, deleteTodo);

// Mengupdate urutan Todos
router.put("/order/update", authenticate, updateTodoOrder);

module.exports = router;
