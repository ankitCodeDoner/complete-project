import { Box, Chip, Typography } from "@mui/material";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import CategoryIcon from "@mui/icons-material/Category";
import ArticleIcon from "@mui/icons-material/Article";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { useNavigate } from "react-router-dom";
import RenderTable from "../../components/tables/RenderTable";
import { TableRow } from "../../components/tables/TableRow";
import { useGetDashboardSummaryQuery } from "../../store/services/dashboard/dashboardSlice";
import { formatDate, formatInr } from "../../utils/helper";
import { AppEndPoints } from "../../utils/rout-endpoints/AppEndPoints";
import { ORDER_STATUS_COLORS } from "../../utils/siteOptions";

const orderColumns = [
  { label: "Order" },
  { label: "Placed on" },
  { label: "Customer" },
  { label: "Items" },
  { label: "Total" },
  { label: "Status" },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const { data } = useGetDashboardSummaryQuery(undefined, { refetchOnMountOrArgChange: true });
  const summary = data?.data;
  const counts = summary?.counts;

  const stats = [
    {
      value: counts?.products ?? "–",
      label: "Products",
      detail: counts ? `${counts.outOfStock} out of stock` : "",
      icon: <Inventory2Icon />,
      bgColor: "#fef3c7", // amber-100
      iconColor: "#fbbf24", // amber-400
      link: AppEndPoints.PRODUCT_LIST,
    },
    {
      value: counts ? `${counts.categories} / ${counts.brands}` : "–",
      label: "Categories / Brands",
      detail: "",
      icon: <CategoryIcon />,
      bgColor: "#ede9fe", // violet-100
      iconColor: "#7c3aed", // violet-600
      link: AppEndPoints.SITE_CATEGORY_LIST,
    },
    {
      value: counts?.openOrders ?? "–",
      label: "Open Orders",
      detail: counts ? `${counts.orders} orders in total` : "",
      icon: <LocalShippingIcon />,
      bgColor: "#e0e7ff", // indigo-100
      iconColor: "#4338ca", // indigo-700
      link: AppEndPoints.ORDER_LIST,
    },
    {
      value: counts?.blogPosts ?? "–",
      label: "Blog Posts",
      detail: counts ? `${counts.unreadNotifications} unread customer notifications` : "",
      icon: <ArticleIcon />,
      bgColor: "#dcfce7", // green-100
      iconColor: "#22c55e", // green-500
      link: AppEndPoints.BLOG_POSTS,
    },
  ];

  return (
    <Box sx={{ p: 4 }}>
      <Box sx={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
        {stats.map(({ value, label, detail, icon, bgColor, iconColor, link }) => (
          <Box
            key={label}
            onClick={() => navigate(link)}
            sx={{
              flex: "1 1 220px",
              bgcolor: bgColor,
              p: 3,
              borderRadius: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              cursor: "pointer",
            }}
          >
            <Box>
              <Typography variant="h4" fontWeight="bold">
                {value}
              </Typography>
              <Typography variant="body1">{label}</Typography>
              {detail && (
                <Typography variant="caption" color="text.secondary">
                  {detail}
                </Typography>
              )}
            </Box>
            <Box
              sx={{
                bgcolor: iconColor,
                borderRadius: "50%",
                width: 56,
                height: 56,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
              }}
            >
              {icon}
            </Box>
          </Box>
        ))}
      </Box>

      <Typography variant="h6" mt={5} mb={2}>
        Recent orders
      </Typography>
      <RenderTable columns={orderColumns}>
        {(summary?.recentOrders || []).map((order, index) => (
          <TableRow key={order.id} itemIndex={index}>
            <td className="p-4 rounded-l-lg font-medium">{order.id}</td>
            <td className="p-4">{formatDate(order.placedOn)}</td>
            <td className="p-4">{order.business}</td>
            <td className="p-4">{order.items}</td>
            <td className="p-4">{formatInr(order.total)}</td>
            <td className="p-4 rounded-r-lg">
              <Chip label={order.status} size="small" color={ORDER_STATUS_COLORS[order.status]} />
            </td>
          </TableRow>
        ))}
      </RenderTable>
    </Box>
  );
}
