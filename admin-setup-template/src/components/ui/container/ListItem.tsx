import { ListItem, ListItemButton } from "@mui/material";

interface Props {
  label: string;
  onClick: () => void;
}

const MuiListItem = ({ label, onClick }: Props) => {
  return (
    <ListItem disablePadding>
      <ListItemButton
        onClick={onClick}
        className="bg-gray-100"
        sx={{
          border: " 1px solid #ccc",
          textAlign: "center",
          borderRadius: "6px",
          my: 0.5,
          bgcolor: "#f3f4f6",
        }}
      >
        {label}
      </ListItemButton>
    </ListItem>
  );
};

export default MuiListItem;
