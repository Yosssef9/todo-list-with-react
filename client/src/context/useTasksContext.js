import { useContext } from "react";
import { TasksContext } from "./TasksContext";

export function useTasksContext() {
  return useContext(TasksContext);
}
