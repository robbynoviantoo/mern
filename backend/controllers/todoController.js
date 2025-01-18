const Todo = require("../models/Todo");

// Membuat Todo baru
const createTodo = async (req, res) => {
    const { title, description, userId } = req.body;
  
    // Pastikan ID pengguna yang dikirim di request body sesuai dengan ID pengguna yang terautentikasi
    if (userId !== req.user.id) {
      return res.status(403).json({ message: "You can only create todo for your own account" });
    }
  
    try {
      const newTodo = new Todo({
        title,
        description,
        user: req.user.id,  // Gunakan ID dari token JWT
      });
  
      await newTodo.save();
      res.status(201).json({ message: "Todo created successfully", todo: newTodo });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

// Mendapatkan semua Todo berdasarkan user
const getTodos = async (req, res) => {
  const { userId } = req.params;

  try {
    const todos = await Todo.find({ user: userId }).sort({ order: 1 }); // Mengurutkan berdasarkan 'order'
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Mengupdate Todo (status completed atau isCompleted)
const updateTodo = async (req, res) => {
  const { todoId } = req.params;
  const { title, description, isCompleted } = req.body;

  try {
    const todo = await Todo.findById(todoId);
    if (!todo) return res.status(404).json({ message: "Todo not found" });

    if (title) todo.title = title;
    if (description) todo.description = description;
    if (isCompleted !== undefined) todo.isCompleted = isCompleted;

    await todo.save();
    res.status(200).json({ message: "Todo updated successfully", todo });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Menghapus Todo
const deleteTodo = async (req, res) => {
  const { todoId } = req.params;

  try {
    const todo = await Todo.findById(todoId);
    if (!todo) return res.status(404).json({ message: "Todo not found" });

    await todo.remove();
    res.status(200).json({ message: "Todo deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
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
