import { Form, Formik, type FormikHelpers } from "formik";
import * as Yup from "yup";
import { Box } from "@mui/material";
import toast from "react-hot-toast";
import { TextInput } from "../../components/forms/BasicTextFields";
import { IconSelect } from "../../components/forms/IconSelect";
import { UISubmitButton } from "../../components/ui/buttons/CustomButton";
import {
  useCreateFeatureMutation,
  useUpdateFeatureMutation,
} from "../../store/services/feature/featureSlice";
import type { Feature } from "../../utils/interfaces/SiteInterface";
import { getApiError, toFormData } from "../../utils/helper";

interface Props {
  feature: Feature | null;
  onClose: () => void;
}

interface FeatureForm {
  title: string;
  description: string;
  icon: string;
}

const validationSchema = Yup.object({
  title: Yup.string().trim().required("Title is required"),
  description: Yup.string().trim().required("Description is required"),
  icon: Yup.string().required("Choose an icon"),
});

const AddOrEditFeature = ({ feature, onClose }: Props) => {
  const [createFeature] = useCreateFeatureMutation();
  const [updateFeature] = useUpdateFeatureMutation();

  const initialValues: FeatureForm = {
    title: feature?.title || "",
    description: feature?.description || "",
    icon: feature?.icon || "",
  };

  const handleSubmit = async (values: FeatureForm, { setSubmitting }: FormikHelpers<FeatureForm>) => {
    try {
      const formData = toFormData({ ...values });
      if (feature) {
        await updateFeature({ id: feature.id, values: formData }).unwrap();
        toast.success("Feature updated successfully");
      } else {
        await createFeature(formData).unwrap();
        toast.success("Feature created successfully");
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
      {({ isSubmitting }) => (
        <Form>
          <Box display="flex" flexDirection="column" gap={2}>
            <TextInput name="title" label="Title" />
            <TextInput name="description" label="Description" multiline />
            <IconSelect name="icon" />
            <UISubmitButton
              text={feature ? "Update Feature" : "Create Feature"}
              disabled={isSubmitting}
            />
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default AddOrEditFeature;
