import { Form, Formik, type FormikHelpers } from "formik";
import * as Yup from "yup";
import { Box, Chip, Divider, Typography } from "@mui/material";
import toast from "react-hot-toast";
import { TextInput } from "../../components/forms/BasicTextFields";
import { SelectDropdown } from "../../components/forms/SelectDropdown";
import { FieldArrayGroup } from "../../components/forms/FieldArrayGroup";
import { UISubmitButton } from "../../components/ui/buttons/CustomButton";
import {
  useGetOrderByIdQuery,
  useUpdateOrderMutation,
} from "../../store/services/order/orderSlice";
import type { OrderEvent, OrderStatus } from "../../utils/interfaces/SiteInterface";
import { assetUrl, formatDate, formatInr, getApiError, toFormData } from "../../utils/helper";
import { ORDER_STATUSES, ORDER_STATUS_COLORS, toOptions } from "../../utils/siteOptions";

interface Props {
  orderId: string;
  onClose: () => void;
}

interface OrderForm {
  status: OrderStatus;
  payment: string;
  timeline: OrderEvent[];
}

const validationSchema = Yup.object({
  status: Yup.string().required("Status is required"),
  payment: Yup.string().trim().required("Payment is required"),
});

const OrderDetails = ({ orderId, onClose }: Props) => {
  const { data } = useGetOrderByIdQuery(orderId, { refetchOnMountOrArgChange: true });
  const [updateOrder] = useUpdateOrderMutation();
  const order = data?.data;

  if (!order) return <Typography color="text.secondary">Loading…</Typography>;

  const initialValues: OrderForm = {
    status: order.status,
    payment: order.payment,
    timeline: order.timeline,
  };

  const handleSubmit = async (values: OrderForm, { setSubmitting }: FormikHelpers<OrderForm>) => {
    try {
      await updateOrder({ id: order.id, values: toFormData({ ...values }) }).unwrap();
      toast.success("Order updated successfully");
      onClose();
    } catch (error) {
      toast.error(getApiError(error));
    }
    setSubmitting(false);
  };

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box>
          <Typography variant="h6">{order.id}</Typography>
          <Typography variant="body2" color="text.secondary">
            Placed {formatDate(order.placedOn)}
          </Typography>
        </Box>
        <Chip label={order.status} color={ORDER_STATUS_COLORS[order.status]} />
      </Box>

      <Box>
        <Typography variant="subtitle2" mb={1}>
          Items
        </Typography>
        {order.items.map((item) => (
          <Box key={item.slug} display="flex" alignItems="center" gap={2} py={1}>
            <img src={assetUrl(item.image)} alt={item.name} className="h-12 w-12 rounded object-cover" />
            <Box flex={1}>
              <Typography variant="body2" fontWeight={500}>
                {item.name}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {item.packSize} · {item.qty} × {formatInr(item.price)}
              </Typography>
            </Box>
            <Typography variant="body2" fontWeight={500}>
              {formatInr(item.qty * item.price)}
            </Typography>
          </Box>
        ))}
        <Divider />
        <Box display="flex" justifyContent="space-between" pt={1}>
          <Typography variant="subtitle2">Total</Typography>
          <Typography variant="subtitle2">{formatInr(order.total)}</Typography>
        </Box>
      </Box>

      {order.address && (
        <Box>
          <Typography variant="subtitle2" mb={0.5}>
            Ship to — {order.address.label}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {order.address.contact}, {order.address.line}, {order.address.city},{" "}
            {order.address.state} {order.address.pin} · {order.address.phone}
          </Typography>
        </Box>
      )}

      <Divider />

      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, values, setFieldValue }) => (
          <Form>
            <Box display="flex" flexDirection="column" gap={2}>
              <SelectDropdown
                label="Status"
                value={values.status}
                options={toOptions(ORDER_STATUSES)}
                onChange={(e) => setFieldValue("status", e.target.value)}
              />
              <TextInput name="payment" label='Payment (e.g. "Prepaid", "30-day credit")' />
              <FieldArrayGroup
                name="timeline"
                label="Tracking timeline (shown to the customer)"
                itemLabel="Step"
                fields={[
                  { name: "label", label: "Step" },
                  { name: "at", label: 'When (e.g. "29 Sep 2026, 10:15" or "Pending")' },
                ]}
              />
              <UISubmitButton text="Update Order" disabled={isSubmitting} />
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default OrderDetails;
