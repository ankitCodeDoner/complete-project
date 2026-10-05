import { Form, Formik, type FormikHelpers } from "formik";
import * as Yup from "yup";
import { Box } from "@mui/material";
import toast from "react-hot-toast";
import { TextInput } from "../../components/forms/BasicTextFields";
import { UISubmitButton } from "../../components/ui/buttons/CustomButton";
import {
  useCreateRegionMutation,
  useUpdateRegionMutation,
} from "../../store/services/region/regionSlice";
import type { Region } from "../../utils/interfaces/SiteInterface";
import { getApiError, toFormData } from "../../utils/helper";

interface Props {
  region: Region | null;
  onClose: () => void;
}

interface RegionForm {
  name: string;
  code: string;
  description: string;
  markets: string;
}

const validationSchema = Yup.object({
  name: Yup.string().trim().required("Name is required"),
  code: Yup.string().trim().required("Code is required"),
  description: Yup.string().trim().required("Description is required"),
  markets: Yup.string().trim().required("Markets are required"),
});

const AddOrEditRegion = ({ region, onClose }: Props) => {
  const [createRegion] = useCreateRegionMutation();
  const [updateRegion] = useUpdateRegionMutation();

  const initialValues: RegionForm = {
    name: region?.name || "",
    code: region?.code || "",
    description: region?.description || "",
    markets: region?.markets || "",
  };

  const handleSubmit = async (values: RegionForm, { setSubmitting }: FormikHelpers<RegionForm>) => {
    try {
      const formData = toFormData({ ...values });
      if (region) {
        await updateRegion({ id: region.id, values: formData }).unwrap();
        toast.success("Region updated successfully");
      } else {
        await createRegion(formData).unwrap();
        toast.success("Region created successfully");
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
            <Box className="grid grid-cols-2 gap-4">
              <TextInput name="name" label="Name" />
              <TextInput name="code" label="Code (e.g. GCC)" />
            </Box>
            <TextInput name="markets" label="Markets (e.g. UAE · Saudi Arabia)" />
            <TextInput name="description" label="Description" multiline />
            <UISubmitButton
              text={region ? "Update Region" : "Create Region"}
              disabled={isSubmitting}
            />
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default AddOrEditRegion;
