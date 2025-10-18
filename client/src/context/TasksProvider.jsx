import { TasksContext } from "./TasksContext";

import useTasks from "../hooks/useTasks"; // مسار الـ hook اللي عندك

// 1️⃣ نعمل السياق

// 2️⃣ نعمل Provider عشان نلف بيه التطبيق كله
export function TasksProvider({ children }) {
  const {
    tasksList,
    setTasksList,
    onAddTask,
    onDeleteTask,
    onCheckBoxTask,
    selectedList,
    setSelectedList,
    onAddNote,
    onChangeTaskText,
  } = useTasks();

  return (
    <TasksContext.Provider
      value={{
        tasksList,
        setTasksList,
        onAddTask,
        onDeleteTask,
        onCheckBoxTask,
        selectedList,
        setSelectedList,
        onAddNote,
        onChangeTaskText,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
}
