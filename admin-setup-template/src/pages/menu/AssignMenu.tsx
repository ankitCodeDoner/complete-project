import { useEffect, useMemo, useState } from "react";
import {
  Box,
  FormControlLabel,
  IconButton,
  Switch,
  Typography,
  FormLabel,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

import EditMenuModal from "./EditMenuModal";
import toast from "react-hot-toast";
import {
  useGetMenuQuery,
  useUpdateMenuMutation,
} from "../../store/services/menu/menuSlice";
import {
  useGetUserRoleByIdQuery,
  useGetUserRoleQuery,
} from "../../store/services/user-role/userRoleSlice";
import { Checkbox } from "../../components/forms/FormControlCheckBox";
import MainContainer from "../../components/ui/container/MainContainer";
import PageTitle from "../../components/ui/container/PageTitle";
import { UISubmitButton } from "../../components/ui/buttons/CustomButton";

const AssignMenu = () => {
  const { data: menuData, refetch: refetchMenu } = useGetMenuQuery();
  const { data: rolesData, refetch: refetchRole } = useGetUserRoleQuery({});

  const [selectedRoleId, setSelectedRoleId] = useState<string>("");
  const { data: roleByIdData, refetch } = useGetUserRoleByIdQuery(
    Number(selectedRoleId),
    {
      skip: !Number(selectedRoleId),
    }
  );

  const [assignMenusToRole] = useUpdateMenuMutation();

  const menus: any[] = menuData?.data || [];
  const roles: any[] = rolesData?.data || [];
  const role: any | undefined = useMemo(() => {
    return roleByIdData?.data;
  }, [roleByIdData]);

  const [selected, setSelected] = useState<number[]>([]);
  const [editingMenu, setEditingMenu] = useState<any | null>(null);
  const [canEdit, setCanEdit] = useState<boolean>(false);

  // When role changes, load its menus
  useEffect(() => {
    if (role?.roleMenus) {
      const roleMenuIds = role.roleMenus.map((menu: any) => menu.id);
      setSelected(roleMenuIds);
    } else {
      setSelected([]);
    }
  }, [role?.id, selectedRoleId]);

  useEffect(() => {
    if (selectedRoleId) {
      refetch();
    }
  }, [selectedRoleId, refetch]);

  const toggleParent = (parentId: number, children: number[]) => {
    const isSelected = selected.includes(parentId);
    if (isSelected) {
      setSelected(
        selected.filter((id) => id !== parentId && !children.includes(id))
      );
    } else {
      setSelected([...selected, parentId, ...children]);
    }
  };

  const toggleChild = (childId: number) => {
    setSelected((prev) =>
      prev.includes(childId)
        ? prev.filter((id) => id !== childId)
        : [...prev, childId]
    );
  };

  const handleSave = async () => {
    if (!selectedRoleId) {
      toast.error("Please select a role before saving.");
      return;
    }

    try {
      await assignMenusToRole({
        id: Number(selectedRoleId),
        values: selected,
      }).unwrap();
      setTimeout(() => {
        refetch();
        refetchMenu();
        refetchRole();
      }, 300);
      toast.success("Menus updated successfully!");
    } catch (error) {
      console.error("Update failed", error);
      toast.error("Failed to update menus. Please try again.");
    }
  };

  const renderMenuTree = (menu: any, level: number = 0): React.ReactNode => {
    const hasChildren = menu.children && menu.children.length > 0;
    const paddingLeft = 3 + level * 6;

    return (
      <div key={menu.id} className={`pl-${paddingLeft} py-1`}>
        <div className="flex items-center justify-between">
          <Checkbox
            label={menu.name}
            checked={selected.includes(menu.id)}
            onChange={() =>
              hasChildren
                ? toggleParent(
                    menu.id,
                    menu.children.map((c: any) => c.id)
                  )
                : toggleChild(menu.id)
            }
          />
          {canEdit && (
            <IconButton onClick={() => setEditingMenu(menu)} size="small">
              <EditIcon fontSize="small" />
            </IconButton>
          )}
        </div>

        {hasChildren && (
          <div className="ml-4 border-l-2 border-gray-100 pl-3">
            {menu.children.map((child: any) =>
              renderMenuTree(child, level + 1)
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <MainContainer>
      <PageTitle title="Menu Management" />

      {/* Top Controls: Role Selection + Edit Toggle */}
      <Box
        padding="20px"
        borderRadius="8px"
        bgcolor="white"
        overflow="auto"
        sx={{
          boxShadow: `rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px`,
        }}
      >
        <div className="flex items-center justify-between mb-4">
          <Box>
            <Typography variant="h6">Assign Menus</Typography>

            <FormLabel className="font-medium mb-1 mt-2 block">
              Select Role:
            </FormLabel>

            <FormControl fullWidth size="small" sx={{ mt: 1 }}>
              <InputLabel id="select-role-label">Role</InputLabel>
              <Select
                labelId="select-role-label"
                value={selectedRoleId}
                label="Role"
                onChange={(e) => setSelectedRoleId(e.target.value)}
              >
                {roles.map((role) => (
                  <MenuItem key={role.id} value={role.id}>
                    {role.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <FormControlLabel
            control={
              <Switch
                checked={canEdit}
                onChange={(e) => setCanEdit(e.target.checked)}
                color="primary"
              />
            }
            label="Enable Editing"
          />
        </div>

        {/* Menu Cards */}
        <div className="grid grid-cols-5 gap-4">
          {menus.map((menu) => (
            <div key={menu.id} className="bg-white p-2 rounded-lg border">
              {renderMenuTree(menu)}
            </div>
          ))}
        </div>

        {/* Save Button */}
        <div className="flex justify-end pt-6">
          <UISubmitButton text="Save Menus" onClick={handleSave} />
        </div>
      </Box>

      {/* Edit Modal */}
      {editingMenu && (
        <EditMenuModal
          refetchMenu={refetchMenu}
          open={!!editingMenu}
          onClose={() => setEditingMenu(null)}
          menu={editingMenu}
        />
      )}
    </MainContainer>
  );
};

export default AssignMenu;
