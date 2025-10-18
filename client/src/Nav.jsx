import { useTasksContext } from "./context/useTasksContext";
import ListItem from "./ListItem";
import Search from "./Search";
import AddList from "./AddList";
import { TextAlignStart } from "lucide-react";

export default function Nav({
  setIsSearchFocused,
  setSearchInputValue,
  searchInputValue,
  isNavOpen,
  setIsNavOpen,
}) {
  const { tasksList, setSelectedList } = useTasksContext();

  return (
    <>
      <div
        className={`bg-slate-50 flex flex-col transition-all duration-300 ease-in-out
    ${isNavOpen ? "w-64" : "w-20"} 
    overflow-y-auto  overflow-x-hidden py-6 px-3 items-start justify-between h-screen`}
      >
        <div className="flex flex-col w-full">
          <div
            className={`flex ${
              isNavOpen ? "justify-start" : "justify-center"
            } px-3`}
          >
            <TextAlignStart
              onClick={() => setIsNavOpen(!isNavOpen)}
              className="mb-3 w-6 h-6 shrink-0 cursor-pointer text-gray-700 hover:text-gray-900 transition-colors"
            />
          </div>

          {/* Fade-in animation for Search */}
          <div
            className={`transition-opacity duration-300 ease-in-out ${
              isNavOpen ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            <Search
              searchInputValue={searchInputValue}
              setSearchInputValue={setSearchInputValue}
              setIsSearchFocused={setIsSearchFocused}
            />
          </div>

          {tasksList.slice(0, 4).map((list) => (
            <ListItem
              key={list.name}
              onClick={() => {
                setSelectedList(list.name);
                setIsSearchFocused(false);
              }}
              listName={list.name}
              isNavOpen={isNavOpen}
              iconName={list.icon}
              iconColor={list.iconColor}
            />
          ))}

          {tasksList.length > 4 && (
            <div className="w-full border-t border-gray-300 my-2"></div>
          )}

          {tasksList.slice(4).map((list) => (
            <ListItem
              key={list.name}
              onClick={() => {
                setSelectedList(list.name);
                setIsSearchFocused(false);
              }}
              isNavOpen={isNavOpen}
              listName={list.name}
              iconName={list.icon}
              iconColor={list.iconColor}
            />
          ))}
        </div>

        {/* Fade-in for AddList */}
        <div
          className={`w-full mt-4 transition-opacity duration-300 ease-in-out ${
            isNavOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <AddList />
        </div>
      </div>
    </>
  );
}
