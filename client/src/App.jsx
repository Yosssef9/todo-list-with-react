import { useMemo, useState, useRef } from "react";
import "./App.css";
import MainContent from "./MainContent";
import Nav from "./Nav";
import Login from "./Login";
import SideTaskMenu from "./SideTaskMenu";
import { motion } from "framer-motion";
import { useAuth } from "./context/useAuth";

import { useTasksContext } from "./context/useTasksContext";
export default function App() {
  const { tasksList } = useTasksContext();
  const { user } = useAuth();
  const [searchInputValue, setSearchInputValue] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(true);
  const [isSideTaskMenuOpen, setSideTaskMenuOpen] = useState(false);

  const [selectedTaskForSideTaskMenu, setSelectedTaskForSideTaskMenu] =
    useState(null);
  let filterdLIstBySearch = useMemo(() => {
    if (!searchInputValue.trim()) return null;

    const lowerSearch = searchInputValue.toLowerCase();

    return tasksList.flatMap((list) =>
      list.tasks.filter((task) => task.text.toLowerCase().includes(lowerSearch))
    );
  }, [tasksList, searchInputValue]);
  // if (!user) return <Login />;
  return (
    <>
      <div className="grid grid-cols-[auto_1fr_auto] min-h-screen overflow-y-hidden  ">
        <Nav
          setIsSearchFocused={setIsSearchFocused}
          searchInputValue={searchInputValue}
          setSearchInputValue={setSearchInputValue}
          setIsNavOpen={setIsNavOpen}
          isNavOpen={isNavOpen}
        />

        <MainContent
          filterdLIstBySearch={isSearchFocused ? filterdLIstBySearch : null}
          isSearchFocused={isSearchFocused}
          setSideTaskMenuOpen={setSideTaskMenuOpen}
          setSelectedTaskForSideTaskMenu={setSelectedTaskForSideTaskMenu}
        ></MainContent>
        {/* {isSideTaskMenuOpen && ( */}
        <SideTaskMenu
          taskDetailsId={selectedTaskForSideTaskMenu}
          setSideTaskMenuOpen={setSideTaskMenuOpen}
          isSideTaskMenuOpen={isSideTaskMenuOpen}
        />
        {/* )} */}
      </div>
    </>
  );
}
