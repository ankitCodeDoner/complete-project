import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Typography } from "@mui/material";
interface Props {
  open: boolean;
  onClose: () => void;
  onOpen: () => void;
  children: React.ReactNode;
  label: string;
  width: number;
}

const DynamicDrawer = ({
  open,
  onClose,
  onOpen,
  width = 500,
  children,
  label,
}: Props) => {
  return (
    <SwipeableDrawer
      anchor="right"
      open={open}
      onClose={onClose}
      onOpen={onOpen}
    >
      <Box sx={{ width: width }} role="presentation">
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            p: 2,
          }}
        >
          <Typography
            component="h6"
            sx={{ fontWeight: 500, fontSize: 22, lineHeight: "10px" }}
          >
            {label}
          </Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        {children}
      </Box>
    </SwipeableDrawer>
  );
};

export default DynamicDrawer;

const DynamicDrawer2 = ({
  open,
  onClose,
  onOpen,
  width = 500,
  children,
  label,
}: Props) => {
  return (
    <SwipeableDrawer
      anchor="right"
      open={open}
      onClose={onClose}
      onOpen={onOpen}
    >
      <Box sx={{ width: width }} role="presentation">
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            p: 2,
          }}
        >
          <Typography
            component="h6"
            sx={{ fontWeight: 500, fontSize: 22, lineHeight: "10px" }}
          >
            {label}
          </Typography>
        </Box>
        {children}
      </Box>
    </SwipeableDrawer>
  );
};

export { DynamicDrawer2 };
