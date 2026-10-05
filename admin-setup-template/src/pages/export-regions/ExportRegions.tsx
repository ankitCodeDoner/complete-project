import { Box, Chip, Typography } from "@mui/material";
import { FaPenToSquare } from "react-icons/fa6";
import { FaTrashAlt } from "react-icons/fa";
import MainContainer from "../../components/ui/container/MainContainer";
import PageTitle from "../../components/ui/container/PageTitle";
import AddEntityButton from "../../components/ui/buttons/AddEntityButton";
import RenderTable from "../../components/tables/RenderTable";
import { TableRow } from "../../components/tables/TableRow";
import { IconButton } from "../../components/ui/buttons/IconButton";
import { ReorderButtons } from "../../components/ui/buttons/ReorderButtons";
import RightDrawer from "../../components/ui/drawers/RightDrawer";
import { useDeleteConfirm } from "../../hooks/useDeleteConfirm";
import { useDrawerState } from "../../hooks/useDrawerState";
import { useReorder } from "../../hooks/useReorder";
import {
  useDeleteRegionMutation,
  useGetRegionQuery,
  useReorderRegionMutation,
} from "../../store/services/region/regionSlice";
import type { Region } from "../../utils/interfaces/SiteInterface";
import AddOrEditRegion from "./AddOrEditRegion";

const columns = [
  { label: "#" },
  { label: "Code" },
  { label: "Region" },
  { label: "Description" },
  { label: "Order" },
  { label: "Actions" },
];

const ExportRegions = () => {
  const drawer = useDrawerState<Region>();
  const { data, refetch } = useGetRegionQuery(undefined, { refetchOnMountOrArgChange: true });
  const [deleteRegion] = useDeleteRegionMutation();
  const [reorderRegion] = useReorderRegionMutation();
  const items = data?.data || [];

  const { handleDelete } = useDeleteConfirm({
    label: "Region",
    deleteFn: (id) => deleteRegion(id).unwrap(),
    refetch,
  });
  const { handleMove } = useReorder({
    items,
    reorderFn: (ids) => reorderRegion(ids).unwrap(),
    refetch,
  });

  return (
    <MainContainer>
      <PageTitle title="Export Regions" />
      <Box display="flex" alignItems="center" justifyContent="space-between" gap={2}>
        <Typography variant="body2" color="text.secondary">
          Regions listed on the Export page, in this order.
        </Typography>
        <AddEntityButton text="Add Region" onClick={drawer.openCreate} />
      </Box>

      <RenderTable columns={columns}>
        {items.map((item, index) => (
          <TableRow key={item.id} itemIndex={index}>
            <td className="p-4 rounded-l-lg">{index + 1}</td>
            <td className="p-4">
              <Chip label={item.code} size="small" />
            </td>
            <td className="p-4">
              <div className="font-medium">{item.name}</div>
              <div className="text-xs text-gray-500">{item.markets}</div>
            </td>
            <td className="p-4 text-sm text-gray-600 max-w-lg">{item.description}</td>
            <td className="p-4">
              <Box className="flex gap-2">
                <ReorderButtons index={index} count={items.length} onMove={handleMove} />
              </Box>
            </td>
            <td className="p-4 rounded-r-lg">
              <Box className="flex gap-2">
                <IconButton
                  tooltip="Edit"
                  icon={<FaPenToSquare size={16} />}
                  iconColor="WHITE"
                  bgColor="GREEN"
                  onClick={() => drawer.openEdit(item)}
                />
                <IconButton
                  tooltip="Delete"
                  icon={<FaTrashAlt size={16} />}
                  iconColor="WHITE"
                  onClick={() => handleDelete(item.id)}
                />
              </Box>
            </td>
          </TableRow>
        ))}
      </RenderTable>

      <RightDrawer
        open={drawer.open}
        onClose={drawer.close}
        title={drawer.selected ? "Edit Region" : "Add Region"}
      >
        <AddOrEditRegion
          region={drawer.selected}
          onClose={() => {
            drawer.close();
            refetch();
          }}
        />
      </RightDrawer>
    </MainContainer>
  );
};

export default ExportRegions;
