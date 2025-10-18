// Search.jsx
import { Input } from "antd";

export default function Search({
  searchInputValue,
  setSearchInputValue,
  setIsSearchFocused,
}) {
  return (
    <Input.Search
      className="px-6 my-3"
      value={searchInputValue}
      onFocus={() => setIsSearchFocused(true)}
      onChange={(e) => setSearchInputValue(e.target.value)}
      placeholder="Search tasks..."
      variant="filled"
    />
  );
}
