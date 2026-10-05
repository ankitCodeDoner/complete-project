import { Button } from "@mui/material";
import "./style.css";

interface UiRButtonProps {
  text: string;
  type?: "button" | "submit" | "reset";
  size?: "small" | "medium" | "large";
  width?: "w-full" | "w-auto";
  onClick?: () => void;
  disabled?: boolean;
  bgColor?:
    | "secondary.main"
    | "primary.main"
    | "error.main"
    | "success.main"
    | "warning.main"
    | "info.main";
}
export const UISubmitButton = ({
  text,
  width = "w-auto",
  type = "submit",
  size = "small",
  onClick,
  disabled,
  bgColor = "secondary.main",
}: UiRButtonProps) => {
  return (
    <Button
      type={type}
      className={`${width} inline-flex px-4 py-2 text-nowrap`}
      size={size}
      onClick={onClick}
      disabled={disabled}
      sx={{ backgroundColor: bgColor, px: 2, py: 1 }}
      variant="contained"
    >
      <div className="btnText">{text}</div>
    </Button>
  );
};
