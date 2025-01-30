import React, { useState } from "react";
import { createTodo } from "../../api/todoApi";

const CreateTodo = ({ onTodoCreated }) => {
  const [formData, setFormData] = useState({ title: "", description: "" });
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await createTodo(formData);
      onTodoCreated(data.todo);
      setFormData({ title: "", description: "" });
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create todo.");
    }
  };

  return (
    <form
      className="bg-base-200 p-4 rounded-lg shadow-md mb-6"
      onSubmit={handleSubmit}
    >
      <h2 className="text-lg font-semibold mb-4">Create New Todo</h2>
      {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
      <input
        type="text"
        placeholder="Title"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        required
        className="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <textarea
        placeholder="Description"
        value={formData.description}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        required
        className="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
      ></textarea>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
      >
        Add Todo
      </button>
    </form>
  );
};

export default CreateTodo;
