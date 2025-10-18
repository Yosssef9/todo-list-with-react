import React, { useState } from "react";
import { useTasksContext } from "./context/useTasksContext";

export default function AddTask() {
  const { onAddTask } = useTasksContext();
  const [input, setInputValue] = useState("");

  function handleOnClick(e) {
    e.preventDefault();
    if (!input.trim()) return;
    onAddTask(input);
    setInputValue("");
  }

  return (
    <form
      onSubmit={handleOnClick}
      className="
        flex flex-col  sm:flex-row items-stretch sm:items-center 
        gap-3 bg-white p-3 sm:p-4 rounded-xl shadow-sm  mx-auto
        hover:shadow-md transition-all duration-300 sm:w-full w-3/4 mt-4
      "
    >
      <input
        value={input}
        onChange={(e) => setInputValue(e.target.value)}
        type="text"
        name="task"
        placeholder="Add a new task..."
        className="flex-1 border border-gray-300 rounded-lg px-3 py-2 
                   focus:outline-none focus:ring-2 focus:ring-blue-400 
                   text-gray-800 placeholder-gray-400"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white font-medium px-4 py-2 rounded-lg 
                   hover:bg-blue-600 active:scale-95 transition-transform duration-150"
      >
        Add
      </button>
    </form>
  );
}
