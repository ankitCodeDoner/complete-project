import { Box, Chip } from "@mui/material";
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
  useDeleteBrandMutation,
  useGetBrandQuery,
  useReorderBrandMutation,
} from "../../store/services/brand/brandSlice";
import { useGetProductQuery } from "../../store/services/product/productSlice";
import type { Brand } from "../../utils/interfaces/SiteInterface";
import { assetUrl } from "../../utils/helper";
import AddOrEditBrand from "./AddOrEditBrand";

const columns = [
  { label: "#" },
  { label: "Logo" },
  { label: "Brand" },
  { label: "Origin" },
  { label: "Specialities" },
  { label: "Products" },
  { label: "Order" },
  { label: "Actions" },
];

const Brands = () => {
  const drawer = useDrawerState<Brand>();
  const { data, refetch } = useGetBrandQuery(undefined, { refetchOnMountOrArgChange: true });
  const { data: productData } = useGetProductQuery(undefined, { refetchOnMountOrArgChange: true });
  const [deleteBrand] = useDeleteBrandMutation();
  const [reorderBrand] = useReorderBrandMutation();
  const brands = data?.data || [];
  const products = productData?.data || [];

  const { handleDelete } = useDeleteConfirm({
    label: "Brand",
    deleteFn: (id) => deleteBrand(id).unwrap(),
    refetch,
  });
  const { handleMove } = useReorder({
    items: brands,
    reorderFn: (ids) => reorderBrand(ids).unwrap(),
    refetch,
  });

  return (
    <MainContainer>
      <PageTitle title="Brands" />
      <AddEntityButton text="Add Brand" onClick={drawer.openCreate} />

      <RenderTable columns={columns}>
        {brands.map((brand, index) => (
          <TableRow key={brand.id} itemIndex={index}>
            <td className="p-4 rounded-l-lg">{index + 1}</td>
            <td className="p-4">
              <img
                src={assetUrl(brand.logo)}
                alt={brand.name}
                className="h-12 w-20 object-contain bg-white rounded"
              />
            </td>
            <td className="p-4">
              <div className="font-medium">{brand.name}</div>
              <div className="text-xs text-gray-500">
                {brand.href} · {brand.productCount}
              </div>
            </td>
            <td className="p-4 whitespace-nowrap">
              {brand.origin} · est. {brand.established}
            </td>
            <td className="p-4">
              <Box className="flex flex-wrap gap-1">
                {brand.specialities.map((s) => (
                  <Chip key={s} label={s} size="small" />
                ))}
              </Box>
            </td>
            <td className="p-4">{products.filter((p) => p.brandSlug === brand.slug).length}</td>
            <td className="p-4">
              <Box className="flex gap-2">
                <ReorderButtons index={index} count={brands.length} onMove={handleMove} />
              </Box>
            </td>
            <td className="p-4 rounded-r-lg">
              <Box className="flex gap-2">
                <IconButton
                  tooltip="Edit"
                  icon={<FaPenToSquare size={16} />}
                  iconColor="WHITE"
                  bgColor="GREEN"
                  onClick={() => drawer.openEdit(brand)}
                />
                <IconButton
                  tooltip="Delete"
                  icon={<FaTrashAlt size={16} />}
                  iconColor="WHITE"
                  onClick={() => handleDelete(brand.id)}
                />
              </Box>
            </td>
          </TableRow>
        ))}
      </RenderTable>

      <RightDrawer
        open={drawer.open}
        onClose={drawer.close}
        title={drawer.selected ? "Edit Brand" : "Add Brand"}
        width={520}
      >
        <AddOrEditBrand
          brand={drawer.selected}
          onClose={() => {
            drawer.close();
            refetch();
          }}
        />
      </RightDrawer>
    </MainContainer>
  );
};

export default Brands;
