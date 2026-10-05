import { Box } from "@mui/material";
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
  useDeleteCategoryMutation,
  useGetCategoryQuery,
  useReorderCategoryMutation,
} from "../../store/services/category/categorySlice";
import { useGetProductQuery } from "../../store/services/product/productSlice";
import type { Category } from "../../utils/interfaces/SiteInterface";
import { paletteFromClass } from "../../utils/siteOptions";
import AddOrEditCategory from "./AddOrEditCategory";

const columns = [
  { label: "#" },
  { label: "Icon" },
  { label: "Name" },
  { label: "Blurb" },
  { label: "Products" },
  { label: "Order" },
  { label: "Actions" },
];

const Categories = () => {
  const drawer = useDrawerState<Category>();
  const { data, refetch } = useGetCategoryQuery(undefined, { refetchOnMountOrArgChange: true });
  const { data: productData } = useGetProductQuery(undefined, { refetchOnMountOrArgChange: true });
  const [deleteCategory] = useDeleteCategoryMutation();
  const [reorderCategory] = useReorderCategoryMutation();
  const categories = data?.data || [];
  const products = productData?.data || [];

  const { handleDelete } = useDeleteConfirm({
    label: "Category",
    deleteFn: (id) => deleteCategory(id).unwrap(),
    refetch,
  });
  const { handleMove } = useReorder({
    items: categories,
    reorderFn: (ids) => reorderCategory(ids).unwrap(),
    refetch,
  });

  return (
    <MainContainer>
      <PageTitle title="Categories" />
      <AddEntityButton text="Add Category" onClick={drawer.openCreate} />

      <RenderTable columns={columns}>
        {categories.map((category, index) => {
          const palette = paletteFromClass(category.iconColor);
          return (
            <TableRow key={category.id} itemIndex={index}>
              <td className="p-4 rounded-l-lg">{index + 1}</td>
              <td className="p-4">
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    bgcolor: palette.bg,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <SiteIcon name={category.icon} size={20} color={palette.icon} />
                </Box>
              </td>
              <td className="p-4">
                <div className="font-medium">{category.name}</div>
                <div className="text-xs text-gray-500">{category.href}</div>
              </td>
              <td className="p-4 text-sm text-gray-600 max-w-md">{category.blurb}</td>
              <td className="p-4">
                {products.filter((p) => p.categorySlug === category.slug).length}
              </td>
              <td className="p-4">
                <Box className="flex gap-2">
                  <ReorderButtons index={index} count={categories.length} onMove={handleMove} />
                </Box>
              </td>
              <td className="p-4 rounded-r-lg">
                <Box className="flex gap-2">
                  <IconButton
                    tooltip="Edit"
                    icon={<FaPenToSquare size={16} />}
                    iconColor="WHITE"
                    bgColor="GREEN"
                    onClick={() => drawer.openEdit(category)}
                  />
                  <IconButton
                    tooltip="Delete"
                    icon={<FaTrashAlt size={16} />}
                    iconColor="WHITE"
                    onClick={() => handleDelete(category.id)}
                  />
                </Box>
              </td>
            </TableRow>
          );
        })}
      </RenderTable>

      <RightDrawer
        open={drawer.open}
        onClose={drawer.close}
        title={drawer.selected ? "Edit Category" : "Add Category"}
        width={480}
      >
        <AddOrEditCategory
          category={drawer.selected}
          onClose={() => {
            drawer.close();
            refetch();
          }}
        />
      </RightDrawer>
    </MainContainer>
  );
};

export default Categories;
