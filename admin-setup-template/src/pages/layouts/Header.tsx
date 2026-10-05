import {
  Box,
  InputBase,
  IconButton,
  Avatar,
  Toolbar,
  Popover,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import { useUserRole } from "../../hooks/useUserRole";
import { AppEndPoints } from "../../utils/rout-endpoints/AppEndPoints";
import { useNavigate } from "react-router-dom";
import { getInitials } from "../../utils/helper";
import { useState } from "react";

interface HeaderProps {
  onMenuClick?: () => void;
  showMenuIcon?: boolean;
}

export default function Header({
  onMenuClick,
  showMenuIcon = false,
}: HeaderProps) {
  const { decoded } = useUserRole();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleProfileClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (path: string) => {
    handlePopoverClose();
    navigate(path);
  };

  const handleLogout = () => {
    handlePopoverClose();
    localStorage.clear();
    navigate(AppEndPoints.LOGIN);
  };

  const open = Boolean(anchorEl);
  return (
    <Toolbar
      sx={{
        height: 64,
        px: 4,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        bgcolor: "background.paper",
        borderBottom: "1px solid #e0e0e0",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        {showMenuIcon && (
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={onMenuClick}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
        )}

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            bgcolor: "#f3f4f6",
            borderRadius: 2,
            px: 2,
            py: 0.5,
            width: 300,
          }}
        >
          <InputBase
            placeholder="Search"
            fullWidth
            inputProps={{ "aria-label": "search" }}
            sx={{ fontSize: 14 }}
          />
          <IconButton type="submit" aria-label="search" size="small">
            <SearchIcon fontSize="small" />
          </IconButton>
        </Box>
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
        <IconButton onClick={handleProfileClick} sx={{ ml: 1 }}>
            <Avatar
              sx={{
                width: 36,
                height: 36,
                bgcolor: "white",
                color: "#4338ca",
                fontSize: 16,
                border: "1px solid #e0e0e0",
              }}
            >
              {getInitials(decoded?.Name)}
            </Avatar>
          </IconButton>
      </Box>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        sx={{
          mt: 1.5,
        }}
      >
        <Box sx={{ width: 240, py: 1 }}>
          <Box sx={{ px: 2, py: 1.5, pb: 2 }}>
            <Typography variant="subtitle2" fontWeight={600}>
              {decoded?.Name}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
              {decoded?.Email}
            </Typography>
          </Box>
          <Divider />
          <MenuItem
            onClick={() => handleMenuItemClick(AppEndPoints.USER_INFO)}
            sx={{ py: 1.5, px: 2 }}
          >
            <ListItemIcon>
              <PersonOutlineIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Profile</ListItemText>
          </MenuItem>
          <MenuItem
            onClick={() => handleMenuItemClick(AppEndPoints.SETTINGS)}
            sx={{ py: 1.5, px: 2 }}
          >
            <ListItemIcon>
              <SettingsOutlinedIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Settings</ListItemText>
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleLogout} sx={{ py: 1.5, px: 2 }}>
            <ListItemIcon>
              <LogoutIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Logout</ListItemText>
          </MenuItem>
        </Box>
      </Popover>
    </Toolbar>
  );
}
