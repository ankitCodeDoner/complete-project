import React from "react";
import { Box, IconButton, Tooltip } from "@mui/material";
import { UISubmitButton } from "./CustomButton";
import { TbRefresh } from "react-icons/tb";

interface AddEntityButtonProps {
  text: string;
  onClick: () => void;
  marginTop?: number;
  marginBottom?: number;
}

const AddEntityButton: React.FC<AddEntityButtonProps> = ({
  text,
  onClick,
  marginTop = 2,
  marginBottom = 2,
}) => {
  return (
    <Box
      sx={{ mt: marginTop, mb: marginBottom }}
      display="flex"
      justifyContent="end"
    >
      <UISubmitButton text={text} onClick={onClick} />
    </Box>
  );
};

export default AddEntityButton;
interface RefreshProps {
  onRefresh: () => void;
  isSpinning?: boolean;
}
export const Refresh = ({ onRefresh, isSpinning }: RefreshProps) => {
  return (
    <div className="shadow rounded-md bg-white">
      <Tooltip title={"Refresh"} arrow>
        <IconButton onClick={onRefresh}>
          <TbRefresh className={`${isSpinning ? "animate-spin" : ""}`} />
        </IconButton>
      </Tooltip>
    </div>
  );
};
