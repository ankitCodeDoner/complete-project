import { useState } from "react";
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
import { SearchMaster } from "../../components/forms/Search";
import { useDeleteConfirm } from "../../hooks/useDeleteConfirm";
import { useDrawerState } from "../../hooks/useDrawerState";
import { useReorder } from "../../hooks/useReorder";
import {
  useDeleteProductMutation,
  useGetProductQuery,
  useReorderProductMutation,
} from "../../store/services/product/productSlice";
import type { Product } from "../../utils/interfaces/SiteInterface";
import { assetUrl, formatInr } from "../../utils/helper";
import { FEATURED_PRODUCT_COUNT } from "../../utils/siteOptions";
import AddOrEditProduct from "./AddOrEditProduct";

const columns = [
  { label: "#" },
  { label: "Image" },
  { label: "Product" },
  { label: "Category" },
  { label: "Brand" },
  { label: "Price" },
  { label: "Stock" },
  { label: "Order" },
  { label: "Actions" },
];

const Products = () => {
  const drawer = useDrawerState<Product>();
  const [search, setSearch] = useState("");
  const { data, refetch } = useGetProductQuery(undefined, { refetchOnMountOrArgChange: true });
  const [deleteProduct] = useDeleteProductMutation();
  const [reorderProduct] = useReorderProductMutation();
  const products = data?.data || [];

  const { handleDelete } = useDeleteConfirm({
    label: "Product",
    deleteFn: (id) => deleteProduct(id).unwrap(),
    refetch,
  });
  const { handleMove } = useReorder({
    items: products,
    reorderFn: (ids) => reorderProduct(ids).unwrap(),
    refetch,
  });

  const term = search.trim().toLowerCase();
  const visible = term
    ? products.filter((p) =>
        [p.name, p.brand, p.category, p.generic].some((v) => v.toLowerCase().includes(term))
      )
    : products;

  return (
    <MainContainer>
      <PageTitle title="Products" />

      <Box display="flex" alignItems="center" justifyContent="space-between" gap={2}>
        <Box maxWidth={360} flex={1}>
          <SearchMaster value={search} onChange={setSearch} />
        </Box>
        <AddEntityButton text="Add Product" onClick={drawer.openCreate} />
      </Box>
      <Typography variant="body2" color="text.secondary" mb={2}>
        The first {FEATURED_PRODUCT_COUNT} products appear in “Top Selling” and “Offers” on the
        homepage — use the arrows to change which ones.
        {term && " Clear the search to reorder."}
      </Typography>

      <RenderTable columns={columns}>
        {visible.map((product, index) => {
          const position = products.indexOf(product);
          return (
            <TableRow key={product.id} itemIndex={index}>
              <td className="p-4 rounded-l-lg">{position + 1}</td>
              <td className="p-4">
                <img
                  src={assetUrl(product.image)}
                  alt={product.name}
                  className="h-12 w-12 rounded object-cover"
                />
              </td>
              <td className="p-4">
                <div className="font-medium">{product.name}</div>
                <div className="text-xs text-gray-500">/products/{product.slug}</div>
                {position < FEATURED_PRODUCT_COUNT && (
                  <Chip label="Homepage" size="small" color="secondary" sx={{ mt: 0.5 }} />
                )}
              </td>
              <td className="p-4">{product.category}</td>
              <td className="p-4">{product.brand}</td>
              <td className="p-4 whitespace-nowrap">
                <div className="font-medium">{formatInr(product.price)}</div>
                <div className="text-xs text-gray-500">
                  <s>{formatInr(product.originalPrice)}</s> · {product.discount}% off
                </div>
              </td>
              <td className="p-4">
                <Chip
                  label={product.inStock ? "In stock" : "Out of stock"}
                  size="small"
                  color={product.inStock ? "success" : "default"}
                />
              </td>
              <td className="p-4">
                <Box className="flex gap-2">
                  <ReorderButtons
                    index={position}
                    count={products.length}
                    onMove={handleMove}
                    disabled={Boolean(term)}
                  />
                </Box>
              </td>
              <td className="p-4 rounded-r-lg">
                <Box className="flex gap-2">
                  <IconButton
                    tooltip="Edit"
                    icon={<FaPenToSquare size={16} />}
                    iconColor="WHITE"
                    bgColor="GREEN"
                    onClick={() => drawer.openEdit(product)}
                  />
                  <IconButton
                    tooltip="Delete"
                    icon={<FaTrashAlt size={16} />}
                    iconColor="WHITE"
                    onClick={() => handleDelete(product.id)}
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
        title={drawer.selected ? "Edit Product" : "Add Product"}
        width={760}
      >
        <AddOrEditProduct
          product={drawer.selected}
          onClose={() => {
            drawer.close();
            refetch();
          }}
        />
      </RightDrawer>
    </MainContainer>
  );
};

export default Products;
