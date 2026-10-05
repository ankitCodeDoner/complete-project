import { useState } from "react";
import {
  Box,
  CssBaseline,
  useTheme,
  useMediaQuery,
  Drawer,
} from "@mui/material";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { Outlet } from "react-router-dom";

const drawerWidthOpen = 280;
const drawerWidthClosed = 72;

export default function Layout() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [mobileOpen, setMobileOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);
  const handleSidebarToggle = () => setSidebarOpen(!sidebarOpen);

  const drawerContent = (
    <Box
      sx={{
        width: sidebarOpen ? drawerWidthOpen : drawerWidthClosed,
        p: 0,
        height: "100%",
      }}
    >
      <Sidebar sidebarOpen={sidebarOpen} />
    </Box>
  );

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <CssBaseline />

      {isMobile ? (
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidthOpen,
              height: "100vh",
              backgroundColor: theme.palette.sidebar.mainBg,
            },
          }}
        >
          {drawerContent}
        </Drawer>
      ) : (
        <Box
          sx={{
            width: sidebarOpen ? drawerWidthOpen : drawerWidthClosed,
            flexShrink: 0,
            transition: theme.transitions.create("width", {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
            overflowX: "hidden",
            borderRight: "1px solid #ddd",
            display: { xs: "none", md: "block" },
            height: "100vh",
            backgroundColor: theme.palette.sidebar.mainBg,
          }}
        >
          {drawerContent}
        </Box>
      )}

      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          overflowX: "hidden",
        }}
      >
        <Header
          onMenuClick={isMobile ? handleDrawerToggle : handleSidebarToggle}
          showMenuIcon={true}
        />

        <Box
          component="main"
          sx={{
            flex: 1,
            bgcolor: "#f9fafb",
            overflowY: "auto",
            p: 1,
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}
