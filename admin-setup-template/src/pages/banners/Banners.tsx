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
import { useDeleteConfirm } from "../../hooks/useDeleteConfirm";
import { useDrawerState } from "../../hooks/useDrawerState";
import { useReorder } from "../../hooks/useReorder";
import {
  useDeleteBannerMutation,
  useGetBannerQuery,
  useReorderBannerMutation,
} from "../../store/services/banner/bannerSlice";
import type { SiteBanner } from "../../utils/interfaces/SiteInterface";
import { assetUrl } from "../../utils/helper";
import AddOrEditBanner from "./AddOrEditBanner";

const columns = [
  { label: "#" },
  { label: "Image" },
  { label: "Label" },
  { label: "Alt text" },
  { label: "Order" },
  { label: "Actions" },
];

const Banners = () => {
  const drawer = useDrawerState<SiteBanner>();
  const { data, refetch } = useGetBannerQuery(undefined, { refetchOnMountOrArgChange: true });
  const [deleteBanner] = useDeleteBannerMutation();
  const [reorderBanner] = useReorderBannerMutation();
  const banners = data?.data || [];

  const { handleDelete } = useDeleteConfirm({
    label: "Banner",
    deleteFn: (id) => deleteBanner(id).unwrap(),
    refetch,
  });
  const { handleMove } = useReorder({
    items: banners,
    reorderFn: (ids) => reorderBanner(ids).unwrap(),
    refetch,
  });

  return (
    <MainContainer>
      <PageTitle title="Home Banners" />
      <Box display="flex" alignItems="center" justifyContent="space-between" gap={2}>
        <Typography variant="body2" color="text.secondary">
          Slides in the homepage promo carousel, in this order.
        </Typography>
        <AddEntityButton text="Add Banner" onClick={drawer.openCreate} />
      </Box>

      <RenderTable columns={columns}>
        {banners.map((banner, index) => (
          <TableRow key={banner.id} itemIndex={index}>
            <td className="p-4 rounded-l-lg">{index + 1}</td>
            <td className="p-4">
              <img
                src={assetUrl(banner.image)}
                alt={banner.alt}
                className="h-16 w-40 rounded object-cover"
              />
            </td>
            <td className="p-4 font-medium">{banner.category}</td>
            <td className="p-4 text-sm text-gray-600">{banner.alt}</td>
            <td className="p-4">
              <Box className="flex gap-2">
                <ReorderButtons index={index} count={banners.length} onMove={handleMove} />
              </Box>
            </td>
            <td className="p-4 rounded-r-lg">
              <Box className="flex gap-2">
                <IconButton
                  tooltip="Edit"
                  icon={<FaPenToSquare size={16} />}
                  iconColor="WHITE"
                  bgColor="GREEN"
                  onClick={() => drawer.openEdit(banner)}
                />
                <IconButton
                  tooltip="Delete"
                  icon={<FaTrashAlt size={16} />}
                  iconColor="WHITE"
                  onClick={() => handleDelete(banner.id)}
                />
              </Box>
            </td>
          </TableRow>
        ))}
      </RenderTable>

      <RightDrawer
        open={drawer.open}
        onClose={drawer.close}
        title={drawer.selected ? "Edit Banner" : "Add Banner"}
        width={480}
      >
        <AddOrEditBanner
          banner={drawer.selected}
          onClose={() => {
            drawer.close();
            refetch();
          }}
        />
      </RightDrawer>
    </MainContainer>
  );
};

export default Banners;
