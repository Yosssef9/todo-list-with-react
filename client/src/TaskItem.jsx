import React from "react";
import { useTasksContext } from "./context/useTasksContext";
import { StickyNote } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export default function TaskItem({
  taskDetails,
  setSideTaskMenuOpen,
  setSelectedTaskForSideTaskMenu,
}) {
  const { onDeleteTask, onCheckBoxTask } = useTasksContext();

  function handleTaskClick() {
    setSideTaskMenuOpen(true);
    setSelectedTaskForSideTaskMenu(taskDetails.id);
  }

  return (
    <li
      className="flex items-center justify-between bg-white rounded-lg shadow-sm 
                 p-3 mb-2 hover:shadow-md transition-all duration-300 ease-in-out"
    >
      {/* Left Side: checkbox + text + note */}
      <div
        onClick={handleTaskClick}
        className="flex items-center gap-3 cursor-pointer flex-1"
      >
        <input
          checked={taskDetails.checked}
          onClick={(e) => e.stopPropagation()}
          onChange={() => {
            onCheckBoxTask(taskDetails.id);
          }}
          type="checkbox"
          className="w-5 h-5 self-start appearance-none border-2 border-gray-400 rounded-full
             checked:bg-blue-500 checked:shadow-[inset_0_0_0_3px_white]
             checked:border-blue-500 cursor-pointer transition-all duration-200"
        />

        {/* Text + note vertically */}
        <div className="flex flex-col">
          <span
            className={`text-gray-800 text-base ${
              taskDetails.checked ? "line-through text-gray-400" : ""
            }`}
          >
            {taskDetails.text}
          </span>

          {/* 👇 Animated Note icon */}
          <AnimatePresence>
            {taskDetails.note && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.25 }}
                className="flex items-center gap-1 mt-1 text-gray-500"
              >
                <StickyNote
                  size={14}
                  strokeWidth={1.5}
                  className="text-gray-500"
                />
                <span className="text-xs">Note</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <button
        onClick={() => onDeleteTask(taskDetails.id)}
        type="button"
        className="text-white bg-red-600 hover:bg-red-500 px-3 py-2 rounded-md 
                   font-medium text-sm transition-colors duration-200"
      >
        Delete
      </button>
    </li>
  );
}
