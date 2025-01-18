const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: false,
    trim: true,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Relasi dengan User
    required: true,
  },
  order: {
    type: Number,
    required: true,
    default: 0,  // Menyimpan urutan item
  },
}, {
  timestamps: true,  // Menambahkan createdAt dan updatedAt
});

module.exports = mongoose.model("Todo", TodoSchema);
