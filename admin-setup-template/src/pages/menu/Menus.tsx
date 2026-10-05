import { Box } from "@mui/material";

import { FaPenToSquare } from "react-icons/fa6";
import { FaTrashAlt } from "react-icons/fa";

import {
  useDeleteMenuMutation,
  useGetMenuQuery,
} from "../../store/services/menu/menuSlice";
import MainContainer from "../../components/ui/container/MainContainer";
import PageTitle from "../../components/ui/container/PageTitle";
import AddEntityButton from "../../components/ui/buttons/AddEntityButton";
import RenderTable from "../../components/tables/RenderTable";
import { TableRow } from "../../components/tables/TableRow";
import { IconButton } from "../../components/ui/buttons/IconButton";
import { useDeleteConfirm } from "../../hooks/useDeleteConfirm";
import RightDrawer from "../../components/ui/drawers/RightDrawer";
import { useState } from "react";
import AddOrEditMenu, { type Menu } from "./AddOrEditMenu";

const columns = [
  { label: "#" },
  { label: "Name" },
  { label: "Claim Value" },
  { label: "Menu Type" },
  { label: "Actions" },
];

const Menus = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [singleMenu, setSingleMenu] = useState<Menu | null>(null);
  const { data, refetch } = useGetMenuQuery();
  const [deleteMenu] = useDeleteMenuMutation();
  const menuData = data?.data || [];

  const { handleDelete } = useDeleteConfirm({
    label: "Menu",
    deleteFn: (id) => deleteMenu(id).unwrap(),
    refetch,
  });
  return (
    <MainContainer>
      <PageTitle title="Menus" />

      <AddEntityButton text="Add Menu" onClick={() => setDrawerOpen(true)} />

      <RenderTable columns={columns}>
        {menuData.map((menu: any, index: any) => (
          <TableRow key={menu.id} itemIndex={index}>
            <td className="p-4 rounded-l-lg">{index + 1}</td>

            <td className="p-4 rounded-r-lg">
              <Box className="flex gap-2">
                <IconButton
                  tooltip="Edit"
                  icon={<FaPenToSquare size={16} />}
                  iconColor="WHITE"
                  bgColor="GREEN"
                  onClick={() => {
                    setDrawerOpen(true);
                    setSingleMenu(menu);
                  }}
                />
                <IconButton
                  tooltip="Delete"
                  icon={<FaTrashAlt size={16} />}
                  iconColor="WHITE"
                  onClick={() => handleDelete(menu.id)}
                />
              </Box>
            </td>
          </TableRow>
        ))}
      </RenderTable>
      <RightDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        title="Menu"
      >
        <AddOrEditMenu
          onClose={() => {
            setDrawerOpen(false);
            refetch();
          }}
          singleMenu={singleMenu}
        />
      </RightDrawer>
    </MainContainer>
  );
};

export default Menus;
