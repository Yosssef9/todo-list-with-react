import { useState, useEffect } from "react";

export default function useTasks() {
  const [tasksList, setTasksList] = useState(() => {
    const saved = localStorage.getItem("tasksList");
    return saved
      ? JSON.parse(saved)
      : [
          {
            name: "My day",
            tasks: [],
            icon: "Sun",
            iconColor: "text-gray-500",
            primaryList: true,
            bg: "bg-sky-200",
          },
          {
            name: "Important",
            tasks: [],
            icon: "Star",
            iconColor: "text-red-500",
            primaryList: true,
            bg: "bg-red-200",
          },
          {
            name: "Assigned to me",
            tasks: [],
            icon: "User",
            iconColor: "text-green-500",
            primaryList: true,
            bg: "bg-green-200",
          },
          {
            name: "Tasks",
            tasks: [],
            icon: "House",
            iconColor: "text-blue-500",
            primaryList: true,
            bg: "bg-blue-200",
          },
        ];
  });
  const [selectedList, setSelectedList] = useState("My day");

  useEffect(() => {
    localStorage.setItem("tasksList", JSON.stringify(tasksList));
  }, [tasksList]);

  function onAddTask(text) {
    const now = new Date();
    setTasksList((prevLists) =>
      prevLists.map((list) =>
        list.name === selectedList
          ? {
              ...list,
              tasks: [
                ...list.tasks,
                {
                  id: Date.now(),
                  text,
                  checked: false,
                  createdOn: now.toISOString(),
                  note: "",
                },
              ],
            }
          : list
      )
    );
  }

  function onDeleteTask(id) {
    setTasksList((prevLists) =>
      prevLists.map((list) =>
        list.name === selectedList
          ? { ...list, tasks: list.tasks.filter((task) => task.id !== id) }
          : list
      )
    );
  }
  function onCheckBoxTask(id) {
    setTasksList((prevLists) =>
      prevLists.map((list) =>
        list.name === selectedList
          ? {
              ...list,
              tasks: list.tasks.map((task) =>
                task.id === id ? { ...task, checked: !task.checked } : task
              ),
            }
          : list
      )
    );
  }
  function onAddNote(id, text) {
    setTasksList((prevLists) =>
      prevLists.map((list) =>
        list.name === selectedList
          ? {
              ...list,
              tasks: list.tasks.map((task) =>
                task.id === id ? { ...task, note: text } : task
              ),
            }
          : list
      )
    );
  }
  function onChangeTaskText(id, text) {
    setTasksList((prevLists) =>
      prevLists.map((list) =>
        list.name === selectedList
          ? {
              ...list,
              tasks: list.tasks.map((task) =>
                task.id === id ? { ...task, text: text } : task
              ),
            }
          : list
      )
    );
  }

  return {
    tasksList,
    setTasksList,
    onAddTask,
    onDeleteTask,
    onCheckBoxTask,
    selectedList,
    setSelectedList,
    onAddNote,
    onChangeTaskText,
  };
}
