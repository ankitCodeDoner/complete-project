import { Box, Typography } from "@mui/material";
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
import SiteIcon from "../../components/ui/SiteIcon";
import { useDeleteConfirm } from "../../hooks/useDeleteConfirm";
import { useDrawerState } from "../../hooks/useDrawerState";
import { useReorder } from "../../hooks/useReorder";
import {
  useDeleteFeatureMutation,
  useGetFeatureQuery,
  useReorderFeatureMutation,
} from "../../store/services/feature/featureSlice";
import type { Feature } from "../../utils/interfaces/SiteInterface";
import AddOrEditFeature from "./AddOrEditFeature";

const columns = [
  { label: "#" },
  { label: "Icon" },
  { label: "Title" },
  { label: "Description" },
  { label: "Order" },
  { label: "Actions" },
];

const HomeFeatures = () => {
  const drawer = useDrawerState<Feature>();
  const { data, refetch } = useGetFeatureQuery(undefined, { refetchOnMountOrArgChange: true });
  const [deleteFeature] = useDeleteFeatureMutation();
  const [reorderFeature] = useReorderFeatureMutation();
  const items = data?.data || [];

  const { handleDelete } = useDeleteConfirm({
    label: "Feature",
    deleteFn: (id) => deleteFeature(id).unwrap(),
    refetch,
  });
  const { handleMove } = useReorder({
    items,
    reorderFn: (ids) => reorderFeature(ids).unwrap(),
    refetch,
  });

  return (
    <MainContainer>
      <PageTitle title="Why Choose Us" />
      <Box display="flex" alignItems="center" justifyContent="space-between" gap={2}>
        <Typography variant="body2" color="text.secondary">
          Cards in the homepage “Why Choose Us” section, in this order.
        </Typography>
        <AddEntityButton text="Add Feature" onClick={drawer.openCreate} />
      </Box>

      <RenderTable columns={columns}>
        {items.map((item, index) => (
          <TableRow key={item.id} itemIndex={index}>
            <td className="p-4 rounded-l-lg">{index + 1}</td>
            <td className="p-4">
              <SiteIcon name={item.icon} size={22} />
            </td>
            <td className="p-4 font-medium">{item.title}</td>
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
        title={drawer.selected ? "Edit Feature" : "Add Feature"}
      >
        <AddOrEditFeature
          feature={drawer.selected}
          onClose={() => {
            drawer.close();
            refetch();
          }}
        />
      </RightDrawer>
    </MainContainer>
  );
};

export default HomeFeatures;
