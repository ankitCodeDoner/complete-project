import React, { useState, type ReactNode } from "react";
import {
  Menu,
  MenuItem,
  Tooltip,
  IconButton as MuiIconBTN,
} from "@mui/material";
import { IconButton } from "../buttons/IconButton";
import { TiEye } from "react-icons/ti";
import { BsThreeDotsVertical } from "react-icons/bs";

interface ViewMenuProps {
  tooltip?: string;
  iconSize?: number;
  children?: ReactNode;
  isView?: boolean;
}

const ViewMenu = ({
  tooltip = "View",
  children,
  isView = true,
}: ViewMenuProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Tooltip title={tooltip} arrow>
        {isView ? (
          <IconButton
            tooltip={tooltip}
            icon={<TiEye size={16} />}
            iconColor="WHITE"
            bgColor="GREEN"
            // @ts-ignore
            onClick={handleOpen}
          />
        ) : (
          <MuiIconBTN
            aria-label="more"
            aria-controls="action-menu"
            aria-haspopup="true"
            onClick={handleOpen}
          >
            <BsThreeDotsVertical size={16} />
          </MuiIconBTN>
        )}
      </Tooltip>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
      >
        {children || <MenuItem disabled>No content available</MenuItem>}
      </Menu>
    </>
  );
};

export default ViewMenu;
