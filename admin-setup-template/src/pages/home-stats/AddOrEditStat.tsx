import { Form, Formik, type FormikHelpers } from "formik";
import * as Yup from "yup";
import { Box } from "@mui/material";
import toast from "react-hot-toast";
import { TextInput } from "../../components/forms/BasicTextFields";
import { IconSelect } from "../../components/forms/IconSelect";
import { UISubmitButton } from "../../components/ui/buttons/CustomButton";
import {
  useCreateStatMutation,
  useUpdateStatMutation,
} from "../../store/services/stat/statSlice";
import type { Stat } from "../../utils/interfaces/SiteInterface";
import { getApiError, toFormData } from "../../utils/helper";

interface Props {
  stat: Stat | null;
  onClose: () => void;
}

interface StatForm {
  label: string;
  value: number | string;
  suffix: string;
  icon: string;
}

const validationSchema = Yup.object({
  label: Yup.string().trim().required("Label is required"),
  value: Yup.number().typeError("Enter a number").integer().min(0).required("Value is required"),
  icon: Yup.string().required("Choose an icon"),
});

const AddOrEditStat = ({ stat, onClose }: Props) => {
  const [createStat] = useCreateStatMutation();
  const [updateStat] = useUpdateStatMutation();

  const initialValues: StatForm = {
    label: stat?.label || "",
    value: stat?.value ?? "",
    suffix: stat?.suffix ?? "+",
    icon: stat?.icon || "",
  };

  const handleSubmit = async (values: StatForm, { setSubmitting }: FormikHelpers<StatForm>) => {
    try {
      const formData = toFormData({ ...values });
      if (stat) {
        await updateStat({ id: stat.id, values: formData }).unwrap();
        toast.success("Stat updated successfully");
      } else {
        await createStat(formData).unwrap();
        toast.success("Stat created successfully");
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
            <TextInput name="label" label="Label" />
            <Box className="grid grid-cols-2 gap-4">
              <TextInput name="value" label="Number" type="number" />
              <TextInput name="suffix" label="Suffix (e.g. +, K+, %)" />
            </Box>
            <IconSelect name="icon" />
            <UISubmitButton
              text={stat ? "Update Stat" : "Create Stat"}
              disabled={isSubmitting}
            />
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default AddOrEditStat;
