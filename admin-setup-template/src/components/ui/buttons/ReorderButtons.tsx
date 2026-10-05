import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import { IconButton } from "./IconButton";

interface Props {
  index: number;
  count: number;
  onMove: (index: number, direction: -1 | 1) => void;
  disabled?: boolean;
}

export const ReorderButtons = ({ index, count, onMove, disabled }: Props) => {
  const isFirst = disabled || index === 0;
  const isLast = disabled || index === count - 1;
  return (
    <>
      <IconButton
        tooltip="Move up"
        icon={<FaArrowUp size={14} />}
        bgColor="GRAY"
        disabled={isFirst}
        className={isFirst ? "opacity-40" : ""}
        onClick={() => onMove(index, -1)}
      />
      <IconButton
        tooltip="Move down"
        icon={<FaArrowDown size={14} />}
        bgColor="GRAY"
        disabled={isLast}
        className={isLast ? "opacity-40" : ""}
        onClick={() => onMove(index, 1)}
      />
    </>
  );
};
