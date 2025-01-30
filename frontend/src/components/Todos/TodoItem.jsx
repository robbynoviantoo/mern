import React from "react";
import { useDrag, useDrop } from "react-dnd";

const ItemType = "TODO_ITEM";

const TodoItem = ({ todo, currentStatus, onUpdate, onDelete }) => {
  const [{ isDragging }, drag] = useDrag({
    type: ItemType,
    item: { id: todo._id, currentStatus },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: ItemType,
    drop: (draggedItem) => {
      if (draggedItem.currentStatus !== currentStatus) {
        const updatedData =
          currentStatus === "OnGoing"
            ? { isInProgress: true, isCompleted: false }
            : currentStatus === "Completed"
            ? { isInProgress: false, isCompleted: true }
            : { isInProgress: false, isCompleted: false };
        onUpdate(draggedItem.id, updatedData);
      }
    },
  });

  return (
    <div
      ref={(node) => drag(drop(node))}
      className={`flex flex-col bg-base-100 p-4 rounded-lg shadow-md mb-4 ${
        isDragging ? "opacity-50" : "opacity-100"
      }`}
    >
      {/* Bagian Title dan Description */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold">{todo.title}</h3>
        <p className="">{todo.description}</p>
        <p
          className={`text-sm ${
            todo.isCompleted
              ? "text-green-500"
              : todo.isInProgress
              ? "text-yellow-500"
              : "text-red-500"
          }`}
        >
          {todo.isCompleted
            ? "Completed"
            : todo.isInProgress
            ? "On Going"
            : "Pending"}
        </p>
      </div>

      {/* Bagian Tombol */}
      <div className="flex justify-start space-x-2">
        {!todo.isCompleted && (
          <button
            onClick={() =>
              onUpdate(todo._id, { isInProgress: !todo.isInProgress })
            }
            className={`py-1 px-4 rounded ${
              todo.isInProgress ? "bg-gray-500" : "bg-yellow-500"
            } text-white hover:opacity-90 transition`}
          >
            {todo.isInProgress ? "Mark as Pending" : "Mark as On Going"}
          </button>
        )}

        <button
          onClick={() => onUpdate(todo._id, { isCompleted: !todo.isCompleted })}
          className={`py-1 px-4 rounded ${
            todo.isCompleted ? "bg-gray-500" : "bg-green-500"
          } text-white hover:opacity-90 transition`}
        >
          {todo.isCompleted ? "Undo Completed" : "Mark as Completed"}
        </button>

        <button
          onClick={() => onDelete(todo._id)}
          className="py-1 px-4 rounded bg-red-500 text-white hover:opacity-90 transition"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
