import React, { useEffect, useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { getTodos, updateTodo, deleteTodo } from "../../api/todoApi";
import TodoItem from "./TodoItem";
import CreateTodo from "./CreateTodo";
import Navbar from "../Navbar";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const navigate = useNavigate(); // Hook untuk navigasi

  const fetchTodos = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login"); // Arahkan ke login jika tidak ada token
        return;
      }
      const { data } = await getTodos();
      setTodos(data);
    } catch (error) {
      navigate("/login"); // Arahkan ke login jika token tidak valid atau error lainnya
    }
  };

  const handleUpdateTodo = async (id, updatedData) => {
    try {
      await updateTodo(id, updatedData);
      setTodos((prevTodos) =>
        prevTodos.map((todo) => (todo._id === id ? { ...todo, ...updatedData } : todo))
      );
    } catch (error) {
      navigate("/login"); // Arahkan ke login jika terjadi error otorisasi
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      await deleteTodo(id);
      setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== id));
    } catch (error) {
      navigate("/login"); // Arahkan ke login jika terjadi error otorisasi
    }
  };

  const handleTodoCreated = (newTodo) => {
    setTodos((prevTodos) => [newTodo, ...prevTodos]);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  // Filter todos berdasarkan kategori
  const todosPending = todos.filter(
    (todo) => !todo.isCompleted && !todo.isInProgress
  );
  const todosOnGoing = todos.filter(
    (todo) => !todo.isCompleted && todo.isInProgress
  );
  const todosCompleted = todos.filter((todo) => todo.isCompleted);

  const handleDrop = (todoId, newStatus) => {
    const updatedTodo = todos.find((todo) => todo._id === todoId);
    if (!updatedTodo) return;

    const updatedData =
      newStatus === "OnGoing"
        ? { isInProgress: true, isCompleted: false }
        : newStatus === "Completed"
        ? { isInProgress: false, isCompleted: true }
        : { isInProgress: false, isCompleted: false };

    handleUpdateTodo(todoId, updatedData);
  };

  const Column = ({ title, items, onDrop }) => {
    const [, dropRef] = useDrop({
      accept: "TODO_ITEM",
      drop: (item) => onDrop(item.id),
    });

    return (
      <div
        ref={dropRef}
        className="bg-base-200 p-4 rounded-lg shadow-md min-h-[200px]"
      >
        <h2 className="text-xl font-semibold  mb-4">{title}</h2>
        {items.length > 0 ? (
          items.map((todo) => (
            <TodoItem
              key={todo._id}
              todo={todo}
              onUpdate={handleUpdateTodo}
              onDelete={handleDeleteTodo}
            />
          ))
        ) : (
          <p className="text-gray-500">No {title.toLowerCase()} todos.</p>
        )}
      </div>
    );
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen bg-base-300">
        <Navbar />
        <div className="container mx-auto py-6 px-4">
          <h1 className="text-3xl font-bold mb-6">To-Do-List</h1>
          <CreateTodo onTodoCreated={handleTodoCreated} />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Todo Column */}
            <Column
              title="Todo"
              items={todosPending}
              onDrop={(todoId) => handleDrop(todoId, "Pending")}
            />

            {/* On Going Column */}
            <Column
              title="On Going"
              items={todosOnGoing}
              onDrop={(todoId) => handleDrop(todoId, "OnGoing")}
            />

            {/* Completed Column */}
            <Column
              title="Completed"
              items={todosCompleted}
              onDrop={(todoId) => handleDrop(todoId, "Completed")}
            />
          </div>
        </div>
      </div>
    </DndProvider>
  );
};

export default TodoList;
