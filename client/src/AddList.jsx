import { useState } from "react";
import { useTasksContext } from "./context/useTasksContext";
import { Button, Input, Space } from "antd";

export default function AddList() {
  const { tasksList, setTasksList } = useTasksContext();
  const [addListInputValue, setAddListInputValue] = useState("");
  function handleAddListButton() {
    const trimmedValue = addListInputValue.trim();

    if (trimmedValue.length < 3) {
      alert("List name must be at least 3 characters");
      return;
    }

    const isDuplicate = tasksList.some(
      (list) =>
        list.name && list.name.toLowerCase() === trimmedValue.toLowerCase()
    );

    if (isDuplicate) {
      alert("List name already exists!");
      return;
    }

    setTasksList([
      ...tasksList,
      {
        name: trimmedValue,
        tasks: [],
        icon: "TextAlignJustify",
        iconColor: "text-black-500",
        primaryList: false,
        bg: "bg-gray-400",
      },
    ]);

    setAddListInputValue("");
  }

  return (
    <>
      <Space.Compact style={{ width: "100%" }}>
        <Input
          value={addListInputValue}
          onChange={(e) => setAddListInputValue(e.target.value)}
          placeholder="Enter New List Name"
          variant="filled"
        />
        <Button onClick={handleAddListButton} type="primary">
          Submit
        </Button>
      </Space.Compact>
    </>
  );
}
