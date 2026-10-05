import { useState } from "react";
import { Box, Chip } from "@mui/material";
import { FaPenToSquare } from "react-icons/fa6";
import MainContainer from "../../components/ui/container/MainContainer";
import PageTitle from "../../components/ui/container/PageTitle";
import RenderTable from "../../components/tables/RenderTable";
import { TableRow } from "../../components/tables/TableRow";
import { IconButton } from "../../components/ui/buttons/IconButton";
import RightDrawer from "../../components/ui/drawers/RightDrawer";
import { SelectDropdown } from "../../components/forms/SelectDropdown";
import { useDrawerState } from "../../hooks/useDrawerState";
import { useGetOrderQuery } from "../../store/services/order/orderSlice";
import type { Order } from "../../utils/interfaces/SiteInterface";
import { formatDate, formatInr } from "../../utils/helper";
import { ORDER_STATUSES, ORDER_STATUS_COLORS, toOptions } from "../../utils/siteOptions";
import OrderDetails from "./OrderDetails";

const columns = [
  { label: "#" },
  { label: "Order" },
  { label: "Placed on" },
  { label: "Items" },
  { label: "Total" },
  { label: "Payment" },
  { label: "Status" },
  { label: "Actions" },
];

const Orders = () => {
  const drawer = useDrawerState<Order>();
  const [status, setStatus] = useState("");
  const { data, refetch } = useGetOrderQuery(undefined, { refetchOnMountOrArgChange: true });
  const orders = data?.data || [];
  const visible = status ? orders.filter((o) => o.status === status) : orders;

  return (
    <MainContainer>
      <PageTitle title="Orders" />
      <Box maxWidth={260} my={2}>
        <SelectDropdown
          label="Filter by status"
          value={status}
          options={[{ id: "", name: "All orders" }, ...toOptions(ORDER_STATUSES)]}
          onChange={(e) => setStatus(e.target.value)}
        />
      </Box>

      <RenderTable columns={columns}>
        {visible.map((order, index) => (
          <TableRow key={order.id} itemIndex={index}>
            <td className="p-4 rounded-l-lg">{index + 1}</td>
            <td className="p-4 font-medium">{order.id}</td>
            <td className="p-4 whitespace-nowrap">{formatDate(order.placedOn)}</td>
            <td className="p-4">{order.items.length}</td>
            <td className="p-4 whitespace-nowrap">{formatInr(order.total)}</td>
            <td className="p-4">{order.payment}</td>
            <td className="p-4">
              <Chip label={order.status} size="small" color={ORDER_STATUS_COLORS[order.status]} />
            </td>
            <td className="p-4 rounded-r-lg">
              <IconButton
                tooltip="View & update"
                icon={<FaPenToSquare size={16} />}
                iconColor="WHITE"
                bgColor="GREEN"
                onClick={() => drawer.openEdit(order)}
              />
            </td>
          </TableRow>
        ))}
      </RenderTable>

      <RightDrawer open={drawer.open} onClose={drawer.close} title="Order" width={600}>
        {drawer.selected && (
          <OrderDetails
            orderId={drawer.selected.id}
            onClose={() => {
              drawer.close();
              refetch();
            }}
          />
        )}
      </RightDrawer>
    </MainContainer>
  );
};

export default Orders;
