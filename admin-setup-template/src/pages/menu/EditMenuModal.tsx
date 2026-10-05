import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Box,
} from "@mui/material";
import { useUpdateMenuMutation } from "../../store/services/menu/menuSlice";
import { UISubmitButton } from "../../components/ui/buttons/CustomButton";

interface EditMenuModalProps {
  open: boolean;
  onClose: () => void;
  menu: any;
  refetchMenu: () => void;
}

const EditMenuModal = ({
  open,
  onClose,
  menu,
  refetchMenu,
}: EditMenuModalProps) => {
  const [form, setForm] = useState({ ...menu });
  const [updateMenu] = useUpdateMenuMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      await updateMenu({ id: form.id, values: form }).unwrap();
      onClose();
      refetchMenu();
    } catch (error) {
      console.error("Error updating menu:", error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Edit Menu</DialogTitle>
      <DialogContent dividers>
        <Box display="flex" flexDirection="column" gap={2} mt={1}>
          <TextField
            label="Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="URL"
            name="url"
            value={form.url}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Icon URL"
            name="icon"
            value={form.icon}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Parent ID"
            name="parentId"
            type="number"
            value={form.parentId ?? ""}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Menu Type ID"
            name="menuTypeId"
            type="number"
            value={form.menuTypeId}
            onChange={handleChange}
            fullWidth
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <UISubmitButton text="Cancel" onClick={onClose} />
        <UISubmitButton text="Save" onClick={handleSubmit} />
      </DialogActions>
    </Dialog>
  );
};

export default EditMenuModal;
