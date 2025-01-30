const Todo = require("../models/Todo");

// Membuat Todo baru
const createTodo = async (req, res) => {
  const { title, description } = req.body;

  try {
    // Buat Todo baru dengan ID user dari token JWT
    const newTodo = new Todo({
      title,
      description,
      user: req.user.id, // Ambil user dari middleware auth
    });

    await newTodo.save();
    res.status(201).json({ message: "Todo created successfully", todo: newTodo });
  } catch (error) {
    console.error("Error creating todo:", error.message);
    res.status(500).json({ message: "Server Error" });
  }
};


  const getTodos = async (req, res) => {
    try {
      // Gunakan req.user.id dari authMiddleware
      const todos = await Todo.find({ user: req.user.id }).sort({ order: 1 });
      res.status(200).json(todos);
    } catch (error) {
      console.error("Error fetching todos:", error.message);
      res.status(500).json({ message: "Server Error" });
    }
  };
  

// Mengupdate Todo (status completed atau isCompleted)
const updateTodo = async (req, res) => {
  const { todoId } = req.params;
  const { title, description, isCompleted, isInProgress } = req.body;

  try {
    const todo = await Todo.findById(todoId);
    if (!todo) return res.status(404).json({ message: "Todo not found" });

    // Update nilai berdasarkan input
    if (title) todo.title = title;
    if (description) todo.description = description;
    if (isCompleted !== undefined) {
      todo.isCompleted = isCompleted;

      // Jika isCompleted diatur ke true, set isInProgress ke false
      if (isCompleted) todo.isInProgress = false;
    }
    if (isInProgress !== undefined && !todo.isCompleted) {
      // isInProgress hanya bisa diubah jika todo belum selesai
      todo.isInProgress = isInProgress;
    }

    await todo.save();
    res.status(200).json({ message: "Todo updated successfully", todo });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const deleteTodo = async (req, res) => {
  const { todoId } = req.params;

  try {
    const todo = await Todo.findById(todoId);

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    // Pastikan hanya pengguna yang membuat todo dapat menghapusnya
    if (todo.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "You are not authorized to delete this todo" });
    }

    // Gunakan deleteOne untuk menghapus
    await todo.deleteOne();
    res.status(200).json({ message: "Todo deleted successfully" });
  } catch (error) {
    console.error("Error deleting todo:", error.message);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};


// Mengupdate urutan Todo (Drag & Drop)
const updateTodoOrder = async (req, res) => {
  const { todos } = req.body;  // Array urutan baru dari frontend

  try {
    // Update urutan todos berdasarkan urutan baru
    for (let i = 0; i < todos.length; i++) {
      await Todo.findByIdAndUpdate(todos[i]._id, { order: i });
    }
    
    res.status(200).json({ message: "Todo order updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createTodo,
  getTodos,
  updateTodo,
  deleteTodo,
  updateTodoOrder,
};
