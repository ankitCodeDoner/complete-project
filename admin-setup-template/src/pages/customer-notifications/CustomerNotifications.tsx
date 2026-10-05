import { Box, Chip, Typography } from "@mui/material";
import { FaPenToSquare } from "react-icons/fa6";
import { FaTrashAlt } from "react-icons/fa";
import MainContainer from "../../components/ui/container/MainContainer";
import PageTitle from "../../components/ui/container/PageTitle";
import AddEntityButton from "../../components/ui/buttons/AddEntityButton";
import RenderTable from "../../components/tables/RenderTable";
import { TableRow } from "../../components/tables/TableRow";
import { IconButton } from "../../components/ui/buttons/IconButton";
import RightDrawer from "../../components/ui/drawers/RightDrawer";
import { useDeleteConfirm } from "../../hooks/useDeleteConfirm";
import { useDrawerState } from "../../hooks/useDrawerState";
import {
  useDeleteNotificationMutation,
  useGetNotificationQuery,
} from "../../store/services/notification/notificationSlice";
import type { CustomerNotification } from "../../utils/interfaces/SiteInterface";
import AddOrEditNotification from "./AddOrEditNotification";

const columns = [
  { label: "#" },
  { label: "Notification" },
  { label: "Link" },
  { label: "Time" },
  { label: "Status" },
  { label: "Actions" },
];

const CustomerNotifications = () => {
  const drawer = useDrawerState<CustomerNotification>();
  const { data, refetch } = useGetNotificationQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const [deleteNotification] = useDeleteNotificationMutation();
  const notifications = data?.data || [];

  const { handleDelete } = useDeleteConfirm<string>({
    label: "Notification",
    deleteFn: (id) => deleteNotification(id).unwrap(),
    refetch,
  });

  return (
    <MainContainer>
      <PageTitle title="Customer Notifications" />
      <Box display="flex" alignItems="center" justifyContent="space-between" gap={2}>
        <Typography variant="body2" color="text.secondary">
          Updates shown in the customer's Notifications page and the unread badge in My Account.
        </Typography>
        <AddEntityButton text="Add Notification" onClick={drawer.openCreate} />
      </Box>

      <RenderTable columns={columns}>
        {notifications.map((notification, index) => (
          <TableRow key={notification.id} itemIndex={index}>
            <td className="p-4 rounded-l-lg">{index + 1}</td>
            <td className="p-4">
              <div className="font-medium">{notification.title}</div>
              <div className="text-sm text-gray-600">{notification.body}</div>
            </td>
            <td className="p-4 text-sm">{notification.href}</td>
            <td className="p-4 whitespace-nowrap">{notification.time}</td>
            <td className="p-4">
              <Chip
                label={notification.read ? "Read" : "Unread"}
                size="small"
                color={notification.read ? "default" : "secondary"}
              />
            </td>
            <td className="p-4 rounded-r-lg">
              <Box className="flex gap-2">
                <IconButton
                  tooltip="Edit"
                  icon={<FaPenToSquare size={16} />}
                  iconColor="WHITE"
                  bgColor="GREEN"
                  onClick={() => drawer.openEdit(notification)}
                />
                <IconButton
                  tooltip="Delete"
                  icon={<FaTrashAlt size={16} />}
                  iconColor="WHITE"
                  onClick={() => handleDelete(notification.id)}
                />
              </Box>
            </td>
          </TableRow>
        ))}
      </RenderTable>

      <RightDrawer
        open={drawer.open}
        onClose={drawer.close}
        title={drawer.selected ? "Edit Notification" : "Add Notification"}
      >
        <AddOrEditNotification
          notification={drawer.selected}
          onClose={() => {
            drawer.close();
            refetch();
          }}
        />
      </RightDrawer>
    </MainContainer>
  );
};

export default CustomerNotifications;
