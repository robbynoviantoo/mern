const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema(
  {
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
    isInProgress: {
      type: Boolean,
      default: false, // Menambahkan status On Going dengan nilai default
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Relasi dengan User
      required: true,
    },
    order: {
      type: Number,
      required: false, // Menjadikan urutan opsional
      default: 0, // Nilai default jika tidak diset
    },
  },
  {
    timestamps: true, // Menambahkan createdAt dan updatedAt secara otomatis
  }
);

module.exports = mongoose.model("Todo", TodoSchema);
