import { useState } from "react";

export default function ContextMenu({ options, children }) {
  const [menuPos, setMenuPos] = useState({ x: 0, y: 0 });
  const [showMenu, setShowMenu] = useState(false);

  const handleRightClick = (e) => {
    e.preventDefault(); // stops default browser menu
    setMenuPos({ x: e.pageX, y: e.pageY });
    setShowMenu(true);
  };

  const handleClickOutside = () => setShowMenu(false);

  return (
    <div
      onContextMenu={handleRightClick}
      onClick={handleClickOutside}
      className="relative w-full"
    >
      {showMenu && (
        <ul
          className="absolute bg-white border shadow-md rounded p-2 z-50"
          style={{ top: menuPos.y, left: menuPos.x }}
          onClick={(e) => e.stopPropagation()} // prevent closing when clicking menu
        >
          {options.map((opt, idx) => (
            <li
              key={idx}
              className="p-2 hover:bg-gray-200 cursor-pointer"
              onClick={() => {
                opt.action();
                setShowMenu(false);
              }}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}
      {children}
    </div>
  );
}
