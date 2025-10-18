import React, { useRef, useMemo } from "react";
import useOutsideClick from "./hooks/useOutsideClick";
import { Trash2, X } from "lucide-react";

import { useTasksContext } from "./context/useTasksContext";

export default function SideTaskMenu({
  taskDetailsId,
  setSideTaskMenuOpen,
  isSideTaskMenuOpen,
}) {
  const {
    onDeleteTask,
    onCheckBoxTask,
    onAddNote,
    onChangeTaskText,
    tasksList,
  } = useTasksContext();

  const sideTaskMenu = useRef(null);
  useOutsideClick(sideTaskMenu, () => setSideTaskMenuOpen(false));

  const currentTask = useMemo(() => {
    return tasksList
      .flatMap((list) => list.tasks)
      .find((t) => t.id === taskDetailsId);
  }, [tasksList, taskDetailsId]);

  const formattedDate = currentTask
    ? new Date(currentTask.createdOn).toLocaleDateString("ar-EG", {
        weekday: "long",
        day: "numeric",
        month: "long",
      })
    : "";

  return (
    <div
      ref={sideTaskMenu}
      className={`fixed flex flex-col justify-between top-0 right-0 h-full border-l-2 border-gray-300 w-80 bg-white shadow-lg
                  transform transition-transform duration-300 ease-in-out
                  ${isSideTaskMenuOpen ? "translate-x-0" : "translate-x-full"}`}
    >
      {currentTask && (
        <>
          <div className="py-2 px-4 flex-1">
            <div className="flex justify-end">
              <button
                onClick={() => {
                  setSideTaskMenuOpen(false);
                }}
                className="flex items-center justify-center p-2 hover:bg-red-50 rounded-full transition"
                title="Delete task"
              >
                <X className="text-gray-400 w-5 h-5" />
              </button>
            </div>

            <div className="border border-slate-300 p-5 mt-5">
              <div className="flex items-center gap-3  w-full">
                <input
                  checked={currentTask.checked}
                  onChange={() => onCheckBoxTask(currentTask.id)}
                  type="checkbox"
                  className="w-5 h-5 appearance-none border-2 border-gray-400 rounded-full
             checked:bg-blue-500 checked:shadow-[inset_0_0_0_3px_white]
             checked:border-blue-500 cursor-pointer transition-all duration-200"
                />
                <span className={`text-gray-800 text-base`}>
                  <input
                    value={currentTask.text}
                    onChange={(e) =>
                      onChangeTaskText(currentTask.id, e.target.value)
                    }
                    type="text"
                    className={`w-full bg-transparent border border-gray-300 rounded-md px-2 py-1 
               text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-200 
               focus:border-blue-300 transition-all duration-200
               placeholder:text-gray-400 disabled:opacity-60 ${
                 currentTask.checked ? "text-gray-400 line-through" : ""
               }`}
                    placeholder="Enter task name..."
                  />
                </span>
              </div>
            </div>
            <div className="border border-slate-300 p-5 mt-5 rounded-xl bg-slate-50 shadow-sm">
              <label
                htmlFor="taskNotes"
                className="block text-sm font-medium text-gray-600 mb-2"
              >
                Notes
              </label>
              <textarea
                value={currentTask.note || ""}
                onChange={(e) => onAddNote(currentTask.id, e.target.value)}
                id="taskNotes"
                placeholder="Write your notes here..."
                className="w-full h-32 resize-none rounded-lg border border-gray-300 p-3 text-gray-700
               focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-300
               placeholder:text-gray-400 transition-all duration-200 ease-in-out"
              />
            </div>
          </div>

          <div className="border-t border-gray-200 px-6 py-4 flex items-center justify-between">
            <p className="text-sm text-slate-400 whitespace-nowrap">
              created On {formattedDate}
            </p>
            <button
              onClick={() => {
                onDeleteTask(currentTask.id);
                setSideTaskMenuOpen(false);
              }}
              className="flex items-center justify-center p-2 hover:bg-red-50 rounded-full transition"
              title="Delete task"
            >
              <Trash2 className="text-gray-600 w-5 h-5" />
            </button>
          </div>
        </>
      )}
    </div>
  );
}
