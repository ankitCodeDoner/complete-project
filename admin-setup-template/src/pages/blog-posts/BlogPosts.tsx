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
  useDeleteBlogPostMutation,
  useGetBlogPostQuery,
  useReorderBlogPostMutation,
} from "../../store/services/blog/blogSlice";
import type { BlogPost } from "../../utils/interfaces/SiteInterface";
import { assetUrl, formatDate } from "../../utils/helper";
import AddOrEditBlogPost from "./AddOrEditBlogPost";

const columns = [
  { label: "#" },
  { label: "Cover" },
  { label: "Title" },
  { label: "Tag" },
  { label: "Date" },
  { label: "Author" },
  { label: "Order" },
  { label: "Actions" },
];

const BlogPosts = () => {
  const drawer = useDrawerState<BlogPost>();
  const [search, setSearch] = useState("");
  const { data, refetch } = useGetBlogPostQuery(undefined, { refetchOnMountOrArgChange: true });
  const [deleteBlogPost] = useDeleteBlogPostMutation();
  const [reorderBlogPost] = useReorderBlogPostMutation();
  const posts = data?.data || [];

  const { handleDelete } = useDeleteConfirm({
    label: "Blog post",
    deleteFn: (id) => deleteBlogPost(id).unwrap(),
    refetch,
  });
  const { handleMove } = useReorder({
    items: posts,
    reorderFn: (ids) => reorderBlogPost(ids).unwrap(),
    refetch,
  });

  const term = search.trim().toLowerCase();
  const visible = term
    ? posts.filter((p) => [p.title, p.tag, p.author].some((v) => v.toLowerCase().includes(term)))
    : posts;

  return (
    <MainContainer>
      <PageTitle title="Blog & News" />
      <Box display="flex" alignItems="center" justifyContent="space-between" gap={2}>
        <Box maxWidth={360} flex={1}>
          <SearchMaster value={search} onChange={setSearch} />
        </Box>
        <AddEntityButton text="Add Post" onClick={drawer.openCreate} />
      </Box>
      <Typography variant="body2" color="text.secondary" mb={2}>
        Posts are listed newest first and the first one is featured at the top of /blog. New posts
        are added at the top.{term && " Clear the search to reorder."}
      </Typography>

      <RenderTable columns={columns}>
        {visible.map((post, index) => (
          <TableRow key={post.id} itemIndex={index}>
            <td className="p-4 rounded-l-lg">{posts.indexOf(post) + 1}</td>
            <td className="p-4">
              <img
                src={assetUrl(post.image)}
                alt={post.title}
                className="h-12 w-20 rounded object-cover"
              />
            </td>
            <td className="p-4">
              <div className="font-medium">{post.title}</div>
              <div className="text-xs text-gray-500">{post.href}</div>
              {posts.indexOf(post) === 0 && (
                <Chip label="Featured" size="small" color="secondary" sx={{ mt: 0.5 }} />
              )}
            </td>
            <td className="p-4">
              <Chip label={post.tag} size="small" />
            </td>
            <td className="p-4 whitespace-nowrap">{formatDate(post.date)}</td>
            <td className="p-4">
              <div>{post.author}</div>
              <div className="text-xs text-gray-500">{post.readTime}</div>
            </td>
            <td className="p-4">
              <Box className="flex gap-2">
                <ReorderButtons
                  index={posts.indexOf(post)}
                  count={posts.length}
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
                  onClick={() => drawer.openEdit(post)}
                />
                <IconButton
                  tooltip="Delete"
                  icon={<FaTrashAlt size={16} />}
                  iconColor="WHITE"
                  onClick={() => handleDelete(post.id)}
                />
              </Box>
            </td>
          </TableRow>
        ))}
      </RenderTable>

      <RightDrawer
        open={drawer.open}
        onClose={drawer.close}
        title={drawer.selected ? "Edit Post" : "Add Post"}
        width={640}
      >
        <AddOrEditBlogPost
          post={drawer.selected}
          onClose={() => {
            drawer.close();
            refetch();
          }}
        />
      </RightDrawer>
    </MainContainer>
  );
};

export default BlogPosts;
