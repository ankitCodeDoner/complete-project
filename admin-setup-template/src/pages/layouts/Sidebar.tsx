import React, { useState } from "react";
import { List, ListItemText, Collapse, Typography } from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import {
  LogoContainer,
  LogoLetter,
  SidebarRoot,
  StyledListItemButton,
  StyledListItemIcon,
} from "./Sidebar.styles";
import { sidebarItems } from "./sidebarItems";
import { useLocation, useNavigate } from "react-router-dom";

interface SidebarItem {
  label: string;
  icon?: React.ReactNode;
  link?: any;
  children?: SidebarItem[];
  key?: string;
}

interface SidebarProps {
  sidebarOpen?: boolean;
}

export default function Sidebar({ sidebarOpen = true }: SidebarProps) {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});
  const location = useLocation();
  const navigate = useNavigate();
  const handleToggle = (label: string, isOpen: boolean) => {
    setOpenItems((prev) => ({
      ...prev,
      [label]: !isOpen,
    }));
  };

  const renderSidebarItem = (item: SidebarItem) => {
    const hasChildren = !!item.children?.length;
    // Groups start expanded when they contain the current page.
    const isOpen =
      openItems[item.label] ??
      !!item.children?.some((child) => child.link === location.pathname);
    const active = location.pathname === item.link;
    return (
      <React.Fragment key={item.label}>
        <StyledListItemButton
          onClick={() =>
            hasChildren ? handleToggle(item.label, isOpen) : navigate(item.link)
          }
          selected={active}
          sidebarOpen={sidebarOpen}
          active={active}
          sx={{ cursor: hasChildren ? "pointer" : "default" }}
        >
          {item.icon && (
            <StyledListItemIcon sidebarOpen={sidebarOpen} active={active}>
              {item.icon}
            </StyledListItemIcon>
          )}

          {sidebarOpen && <ListItemText primary={item.label} />}

          {hasChildren &&
            (isOpen ? (
              <ExpandLess sx={{ color: "#fff" }} />
            ) : (
              <ExpandMore sx={{ color: "#fff" }} />
            ))}
        </StyledListItemButton>

        {hasChildren && (
          <Collapse in={isOpen} timeout="auto" unmountOnExit>
            <List
              component="div"
              disablePadding
              sx={{ pl: sidebarOpen ? 4 : 0 }}
            >
              {item.children!.map((child) => (
                <StyledListItemButton
                  key={child.label}
                  sidebarOpen={sidebarOpen}
                  selected={location.pathname === child.link}
                  active={location.pathname === child.link}
                  sx={{
                    justifyContent: sidebarOpen ? "initial" : "center",
                    px: sidebarOpen ? 2 : 1,
                    mb: 1,
                  }}
                  onClick={() => navigate(child?.link)}
                >
                  {sidebarOpen && <ListItemText primary={child.label} />}
                </StyledListItemButton>
              ))}
            </List>
          </Collapse>
        )}
      </React.Fragment>
    );
  };

  return (
    <SidebarRoot sidebarOpen={sidebarOpen}>
      <LogoContainer sidebarOpen={sidebarOpen}>
        <LogoLetter variant="h4" fontWeight="bold" sidebarOpen={sidebarOpen}>
          E
        </LogoLetter>
        {sidebarOpen && (
          <Typography variant="h4" fontWeight="bold" sx={{ flexShrink: 0 }}>
            Commerce
          </Typography>
        )}
      </LogoContainer>

      <List>{sidebarItems.map(renderSidebarItem)}</List>
    </SidebarRoot>
  );
}
