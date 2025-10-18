import React from "react";
import TaskItem from "./TaskItem";

import { useTasksContext } from "./context/useTasksContext";
export default function TaskList({
  filterdLIstBySearch,
  setSideTaskMenuOpen,
  setSelectedTaskForSideTaskMenu,
}) {
  const { tasksList, onDeleteTask, onCheckBoxTask, selectedList } =
    useTasksContext();
  let tasksToShow = filterdLIstBySearch;
  if (filterdLIstBySearch === null) {
    tasksToShow =
      tasksList.find((list) => list.name === selectedList)?.tasks || [];
  }

  return (
    <ul className="task-list">
      {tasksToShow?.map((task) => {
        return (
          <TaskItem
            setSideTaskMenuOpen={setSideTaskMenuOpen}
            setSelectedTaskForSideTaskMenu={setSelectedTaskForSideTaskMenu}
            onDeleteTask={onDeleteTask}
            onCheckBoxTask={onCheckBoxTask}
            key={task.id}
            taskDetails={task}
          ></TaskItem>
        );
      })}
    </ul>
  );
}
