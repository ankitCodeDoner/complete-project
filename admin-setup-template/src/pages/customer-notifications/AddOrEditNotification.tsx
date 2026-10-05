import { Form, Formik, type FormikHelpers } from "formik";
import * as Yup from "yup";
import { Box } from "@mui/material";
import toast from "react-hot-toast";
import { TextInput } from "../../components/forms/BasicTextFields";
import FormControlCheckBox from "../../components/forms/FormControlCheckBox";
import { UISubmitButton } from "../../components/ui/buttons/CustomButton";
import {
  useCreateNotificationMutation,
  useUpdateNotificationMutation,
} from "../../store/services/notification/notificationSlice";
import type { CustomerNotification } from "../../utils/interfaces/SiteInterface";
import { getApiError, toFormData } from "../../utils/helper";

interface Props {
  notification: CustomerNotification | null;
  onClose: () => void;
}

interface NotificationForm {
  title: string;
  body: string;
  time: string;
  href: string;
  read: boolean;
}

const validationSchema = Yup.object({
  title: Yup.string().trim().required("Title is required"),
  body: Yup.string().trim().required("Message is required"),
  time: Yup.string().trim().required("Time label is required"),
  href: Yup.string()
    .trim()
    .matches(/^\//, 'Use a website path starting with "/", e.g. /orders/MV-24140')
    .required("Link is required"),
});

const AddOrEditNotification = ({ notification, onClose }: Props) => {
  const [createNotification] = useCreateNotificationMutation();
  const [updateNotification] = useUpdateNotificationMutation();

  const initialValues: NotificationForm = {
    title: notification?.title || "",
    body: notification?.body || "",
    time: notification?.time || "Just now",
    href: notification?.href || "",
    read: notification?.read ?? false,
  };

  const handleSubmit = async (
    values: NotificationForm,
    { setSubmitting }: FormikHelpers<NotificationForm>
  ) => {
    try {
      const formData = toFormData({ ...values });
      if (notification) {
        await updateNotification({ id: notification.id, values: formData }).unwrap();
        toast.success("Notification updated successfully");
      } else {
        await createNotification(formData).unwrap();
        toast.success("Notification created successfully");
      }
      onClose();
    } catch (error) {
      toast.error(getApiError(error));
    }
    setSubmitting(false);
  };

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, values, setFieldValue }) => (
        <Form>
          <Box display="flex" flexDirection="column" gap={2}>
            <TextInput name="title" label="Title" />
            <TextInput name="body" label="Message" multiline />
            <TextInput name="time" label='Time label (e.g. "2 hours ago", "18 Aug 2026")' />
            <TextInput name="href" label="Link on the website (e.g. /orders/MV-24140)" />
            <FormControlCheckBox
              label="Already read"
              checked={values.read}
              onChange={(e) => setFieldValue("read", e.target.checked)}
            />
            <UISubmitButton
              text={notification ? "Update Notification" : "Create Notification"}
              disabled={isSubmitting}
            />
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default AddOrEditNotification;
