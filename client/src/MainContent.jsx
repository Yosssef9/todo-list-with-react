import AddTask from "./AddTask";
import TaskList from "./TaskList";
import { useTasksContext } from "./context/useTasksContext";
import * as Icons from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Swal from "sweetalert2";
import useOutsideClick from "./hooks/useOutsideClick";

import { useState, useRef, useEffect } from "react";

export default function MainContent({
  filterdLIstBySearch,
  isSearchFocused,
  setSideTaskMenuOpen,
  setSelectedTaskForSideTaskMenu,
}) {
  const { selectedList, setSelectedList, tasksList, setTasksList } =
    useTasksContext();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const [isChangeIconMenuOpen, setIsChangeIconMenuOpen] = useState(false);
  const changeIconMenu = useRef(null);

  let selectedListObj = tasksList.find((list) => list.name === selectedList);
  const Icon = selectedListObj
    ? Icons[selectedListObj.icon] || Icons.AlignJustify
    : Icons.AlignJustify;

  const Ellipsis = Icons.Ellipsis;

  // Close menu if clicked outside

  useOutsideClick(menuRef, () => setIsMenuOpen(false));
  useOutsideClick(changeIconMenu, () => setIsChangeIconMenuOpen(false));

  function menuOnClickDelete() {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setSelectedList("My day");
        setTasksList((prevLists) =>
          prevLists.filter((list) => list.name !== selectedListObj.name)
        );
        Swal.fire({
          title: "Deleted!",
          text: "Your list has been deleted.",
          icon: "success",
        });
      }
    });
  }

  function handleRenameList() {
    Swal.fire({
      title: "Rename your list",
      input: "text",
      inputValue: selectedListObj.name, // pre-fill with current name
      showCancelButton: true,
      confirmButtonText: "Save",
      cancelButtonText: "Cancel",
      inputValidator: (value) => {
        if (!value.trim()) {
          return "List name can't be empty!";
        }
        if (value.trim().length < 3) {
          return "List name is too short!";
        }
        const isDuplicate = tasksList.some(
          (list) => list.name && list.name.toLowerCase() === value.toLowerCase()
        );
        if (isDuplicate) {
          return "List name already exists!";
        }
      },
    }).then((result) => {
      if (result.isConfirmed) {
        setSelectedList(result.value);
        setTasksList((prevLists) =>
          prevLists.map((list) =>
            list.name === selectedListObj.name
              ? { ...list, name: result.value }
              : list
          )
        );

        Swal.fire({
          icon: "success",
          title: "List renamed!",
          text: `New name: ${result.value}`,
          timer: 1200,
          showConfirmButton: false,
        });
      }
    });
  }
  function changeBackGroundListColor(e) {
    let bgcolor = e.currentTarget.dataset.bgcolor;
    setTasksList((prevLists) =>
      prevLists.map((list) =>
        list.name === selectedListObj.name ? { ...list, bg: bgcolor } : list
      )
    );
  }

  function changeListIconColor(e) {
    let iconcolor = e.currentTarget.dataset.iconcolor;
    setTasksList((prevLists) =>
      prevLists.map((list) =>
        list.name === selectedListObj.name
          ? { ...list, iconColor: iconcolor }
          : list
      )
    );
  }
  function changeListIcon(e) {
    let icon = e.currentTarget.dataset.icon;
    setTasksList((prevLists) =>
      prevLists.map((list) =>
        list.name === selectedListObj.name ? { ...list, icon: icon } : list
      )
    );
  }

  const bgColors = [
    "bg-sky-200",
    "bg-green-900",
    "bg-blue-900",
    "bg-sky-800",
    "bg-rose-700",
    "bg-purple-700",
    "bg-sky-500",
    "bg-gray-400",
  ];
  const iconColors = [
    { iconColor: "text-red-500", bgColor: "bg-red-500" },
    { iconColor: "text-amber-600", bgColor: "bg-amber-600" },
    { iconColor: "text-lime-700", bgColor: "bg-lime-700" },
    { iconColor: "text-indigo-400", bgColor: "bg-indigo-400" },
    { iconColor: "text-pink-500", bgColor: "bg-pink-500" },
    { iconColor: "text-cyan-600", bgColor: "bg-cyan-600" },
    { iconColor: "text-yellow-700", bgColor: "bg-yellow-700" },
    { iconColor: "text-teal-500", bgColor: "bg-teal-500" },
  ];
  const icons = [
    "TextAlignJustify",
    "Moon",
    "Star",
    "Heart",
    "Bell",
    "Camera",
    "Coffee",
    "Music",
    "Smile",
    "Cloud",
    "Home",
    "User",
    "Settings",
    "Search",
    "Check",
    "X",
    "Trash",
    "Edit",
    "Folder",
    "Lock",
  ];
  return (
    <>
      <div
        className={` ${selectedListObj.bg} h-screen box-border  flex flex-col justify-between  p-10 relative`}
      >
        <AnimatePresence mode="wait">
          {(!isSearchFocused || filterdLIstBySearch === null) && (
            <motion.div
              key="header"
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="flex gap-4 items-center justify-between mb-8 relative"
            >
              <div className="flex items-center gap-4">
                <div className="relative inline-block" ref={changeIconMenu}>
                  <div
                    onClick={() => setIsChangeIconMenuOpen((prev) => !prev)}
                    className={` ${
                      selectedListObj.primaryList
                        ? ""
                        : "hover:bg-black/5 cursor-pointer group"
                    }  p-2  rounded-md transition-colors duration-300 `}
                  >
                    <Icon
                      size={36}
                      className={`${selectedListObj.iconColor} transition-transform duration-300 group-hover:scale-110`}
                    />
                  </div>
                  {/* Dropdown ChangeIcon menu */}
                  <AnimatePresence>
                    {isChangeIconMenuOpen && !selectedListObj.primaryList && (
                      <motion.ul
                        initial={{ opacity: 0, y: -10, x: "-50%" }}
                        animate={{ opacity: 1, y: 0, x: "-50%" }}
                        exit={{ opacity: 0, y: -10, x: "-50%" }}
                        transition={{ duration: 0.2 }}
                        className="absolute p-1 left-1/2 top-full mt-2  flex flex-col bg-white shadow-md rounded-md border w-72 z-50"
                      >
                        <li className="p-2 rounded-md ">
                          Colors
                          <ul className="flex flex-wrap  gap-2  mt-3 ">
                            {iconColors.map(({ iconColor, bgColor }) => (
                              <li
                                key={iconColor}
                                data-iconcolor={iconColor}
                                onClick={(e) => changeListIconColor(e)}
                                className={`p-2 cursor-pointer rounded-full w-6 h-6 ${bgColor} border transition-all duration-150
           ${
             selectedListObj.iconColor === iconColor
               ? "border-2 border-blue-700"
               : "hover:border-2 hover:border-gray-400"
           }`}
                              ></li>
                            ))}
                          </ul>
                        </li>
                        <div className="border-t border-gray-300 my-1 w-5/6 mx-auto box-border"></div>
                        <li className="p-2">
                          <ul className="flex flex-wrap justify-center  gap-2  mt-3 ">
                            {icons.map((icon) => {
                              const IconComponent = Icons[icon];
                              return (
                                <li
                                  key={icon}
                                  data-icon={icon}
                                  onClick={(e) => changeListIcon(e)}
                                  className={`cursor-pointer flex-1   border flex items-center justify-center transition-all duration-150
    ${
      selectedListObj.icon === icon
        ? "border-2 border-blue-700"
        : "hover:border-2 hover:border-gray-400"
    }`}
                                >
                                  <div className="bg-gray-200 rounded-md p-4 flex items-center justify-center w-full h-full">
                                    <IconComponent className="w-5 h-5 text-gray-700" />
                                  </div>
                                </li>
                              );
                            })}
                          </ul>
                        </li>
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </div>
                {selectedListObj.primaryList ? (
                  <div className="text-3xl ">{selectedList}</div>
                ) : (
                  <div className="group">
                    <div
                      onClick={handleRenameList}
                      className="text-3xl hover:bg-black/5 rounded-md  p-2 transition-transform duration-300 group-hover:scale-x-105 cursor-pointer"
                    >
                      {selectedList}
                    </div>
                  </div>
                )}
              </div>

              {/* Ellipsis button */}
              <div className="relative" ref={menuRef}>
                <Ellipsis
                  size={28}
                  className="cursor-pointer hover:scale-110 transition-transform"
                  onClick={() => setIsMenuOpen((prev) => !prev)}
                />

                {/* Dropdown menu */}
                <AnimatePresence>
                  {isMenuOpen && (
                    <motion.ul
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-2 p-3 flex justify-start flex-col bg-white shadow-md rounded-md border w-40 z-50"
                    >
                      <li className="p-2 rounded-md ">
                        Theme
                        <ul className="grid grid-cols-4 mt-3 gap-1">
                          {bgColors.map((color) => (
                            <li
                              key={color}
                              data-bgcolor={color}
                              onClick={(e) => changeBackGroundListColor(e)}
                              className={`p-2 cursor-pointer rounded-md w-10 h-10 ${color} border transition-all duration-150
           ${
             selectedListObj.bg === color
               ? "border-2 border-blue-700"
               : "hover:border-2 hover:border-gray-400"
           }`}
                            ></li>
                          ))}
                        </ul>
                      </li>
                      {!selectedListObj.primaryList && (
                        <>
                          <li
                            onClick={handleRenameList}
                            className="p-2 rounded-md text-sm hover:bg-gray-100 cursor-pointer"
                          >
                            ✏️ Rename List
                          </li>
                          <li
                            onClick={menuOnClickDelete}
                            className="p-2 rounded-md hover:bg-gray-100 cursor-pointer text-red-600"
                          >
                            🗑️ Delete List
                          </li>
                        </>
                      )}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {selectedListObj.tasks.length === 0 ? (
          <div className="flex-1 flex flex-col gap-y-1 items-center justify-center">
            {selectedListObj.name === "Assigned to me" && (
              <p className="text-gray-600 text-lg w-52 text-center">
                tasks assigned to you show up here.
              </p>
            )}
            {selectedListObj.name === "Important" && (
              <>
                <img
                  className="w-36 h-36"
                  src=".\imges\a3cda8e248a22f334594d97312c1b66f.png"
                  alt=""
                />
                <p className="text-gray-600 text-lg w-52 text-center">
                  try starring some tasks to see them here.
                </p>
              </>
            )}
          </div>
        ) : (
          <div className="flex-1 overflow-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
            <TaskList
              filterdLIstBySearch={filterdLIstBySearch}
              setSideTaskMenuOpen={setSideTaskMenuOpen}
              setSelectedTaskForSideTaskMenu={setSelectedTaskForSideTaskMenu}
            />
          </div>
        )}

        <AnimatePresence mode="wait">
          {(!isSearchFocused || filterdLIstBySearch === null) && (
            <motion.div
              key="addtask"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              <AddTask />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
