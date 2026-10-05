import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import Typography from "@mui/material/Typography";

export const SidebarRoot = styled(Box, {
  shouldForwardProp: (prop) => prop !== "sidebarOpen",
})<{ sidebarOpen: boolean }>(({ sidebarOpen, theme }) => ({
  height: "100%",
  color: theme.palette.sidebar.textPrimary,
  display: "flex",
  flexDirection: "column",
  padding: sidebarOpen ? theme.spacing(2) : theme.spacing(1),
}));

export const LogoContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== "sidebarOpen",
})<{ sidebarOpen: boolean }>(({ sidebarOpen, theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),
  marginBottom: theme.spacing(2),
  userSelect: "none",
  whiteSpace: "nowrap",
  width: sidebarOpen ? 250 : 0,
  transition: "width 0.3s ease",
}));

export const LogoLetter = styled(Typography, {
  shouldForwardProp: (prop) => prop !== "sidebarOpen",
})<{ sidebarOpen: boolean }>(({ sidebarOpen, theme }) => ({
  color: theme.palette.secondary.main,
  width: sidebarOpen ? "auto" : 0,
  transition: "width 0.3s",
}));

export const StyledListItemButton = styled(ListItemButton, {
  shouldForwardProp: (prop) => prop !== "sidebarOpen" && prop !== "active",
})<{ sidebarOpen: boolean; active?: boolean }>(
  ({ sidebarOpen, active, theme }) => ({
    marginBottom: theme.spacing(1),
    justifyContent: sidebarOpen ? "initial" : "center",
    paddingLeft: sidebarOpen ? theme.spacing(2) : theme.spacing(1),
    paddingRight: sidebarOpen ? theme.spacing(2) : theme.spacing(1),
    cursor: "pointer",
    borderRadius: 10,
    ...(active && {
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.sidebar.textPrimary,
      "& .MuiListItemIcon-root": {
        color: theme.palette.sidebar.textPrimary,
      },
    }),
    "&.Mui-selected": {
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.sidebar.textPrimary,
      "& .MuiListItemIcon-root": {
        color: theme.palette.sidebar.textPrimary,
      },
    },
    "&:hover": {
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.sidebar.textPrimary,
      "& .MuiListItemIcon-root": {
        color: theme.palette.sidebar.textPrimary,
      },
    },
  })
);

export const StyledListItemIcon = styled(ListItemIcon, {
  shouldForwardProp: (prop) => prop !== "sidebarOpen" && prop !== "active",
})<{ sidebarOpen: boolean; active?: boolean }>(
  ({ sidebarOpen, active, theme }) => ({
    minWidth: 0,
    marginRight: sidebarOpen ? 24 : 0,
    justifyContent: "center",
    color: active
      ? theme.palette.sidebar.textPrimary
      : theme.palette.sidebar.textSecondary,
  })
);
