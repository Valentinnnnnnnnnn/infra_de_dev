import type { LetterStatus } from "../../types/game";
import { getStatusColor } from "../../utils/gameHelpers";

interface KeyProps {
  keyValue: string;
  status: LetterStatus;
  onClick: (key: string) => void;
  disabled?: boolean;
}

export const Key = ({
  keyValue,
  status,
  onClick,
  disabled = false,
}: KeyProps) => {
  const handleClick = () => {
    if (!disabled) {
      onClick(keyValue);
    }
  };

  const isSpecialKey = keyValue === "ENTER" || keyValue === "BACKSPACE";
  const statusColor = getStatusColor(status);

  const baseClasses =
    "font-semibold rounded transition-all duration-200 active:scale-95";
  const sizeClasses = isSpecialKey ? "px-4 py-3 text-sm" : "w-10 h-12 text-lg";
  const disabledClasses = disabled
    ? "cursor-not-allowed opacity-50"
    : "cursor-pointer hover:bg-opacity-80";

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className={`${baseClasses} ${sizeClasses} ${statusColor} ${disabledClasses}`}
    >
      {keyValue === "BACKSPACE" ? "⌫" : keyValue}
    </button>
  );
};
