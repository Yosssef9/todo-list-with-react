import * as Icons from "lucide-react";

export default function ListItem({
  listName,
  iconName,
  iconColor,
  onClick,
  isNavOpen,
}) {
  const Icon = Icons[iconName] || Icons.TextAlignJustify; // fallback icon if not found

  return (
    <div
      onClick={onClick}
      className={`group flex items-center ${
        !isNavOpen && "justify-center"
      }  gap-3 w-full p-3 rounded-xl hover:bg-slate-200 transition-colors duration-200 cursor-pointer`}
    >
      {/* Icon */}
      <Icon
        size={22}
        className={`${iconColor} w-6 h-6 shrink-0 group-hover:scale-110 transition-transform duration-200`}
      />

      {/* List Name */}
      {isNavOpen && (
        <span className="text-gray-800 text-lg truncate">{listName}</span>
      )}
    </div>
  );
}
