import { Form, Formik, type FormikHelpers } from "formik";
import * as Yup from "yup";
import { Box, Typography } from "@mui/material";
import toast from "react-hot-toast";
import { TextInput } from "../../components/forms/BasicTextFields";
import { ImageInput } from "../../components/forms/ImageInput";
import DynamicFieldArray from "../../components/forms/DynamicFieldArray";
import { UISubmitButton } from "../../components/ui/buttons/CustomButton";
import {
  useCreateBrandMutation,
  useUpdateBrandMutation,
} from "../../store/services/brand/brandSlice";
import type { Brand, ImageValue } from "../../utils/interfaces/SiteInterface";
import { getApiError, toFormData } from "../../utils/helper";

interface Props {
  brand: Brand | null;
  onClose: () => void;
}

interface BrandForm {
  name: string;
  slug: string;
  logo: ImageValue;
  productCount: string;
  description: string;
  origin: string;
  established: string;
  specialities: string[];
}

const validationSchema = Yup.object({
  name: Yup.string().trim().required("Name is required"),
  logo: Yup.mixed().required("Logo is required"),
  productCount: Yup.string().trim().required("Product count label is required"),
  description: Yup.string().trim().required("Description is required"),
  origin: Yup.string().trim().required("Origin is required"),
  established: Yup.string().trim().required("Established year is required"),
});

const AddOrEditBrand = ({ brand, onClose }: Props) => {
  const [createBrand] = useCreateBrandMutation();
  const [updateBrand] = useUpdateBrandMutation();

  const initialValues: BrandForm = {
    name: brand?.name || "",
    slug: brand?.slug || "",
    logo: brand?.logo || "",
    productCount: brand?.productCount || "",
    description: brand?.description || "",
    origin: brand?.origin || "",
    established: brand?.established || "",
    specialities: brand?.specialities?.length ? brand.specialities : [""],
  };

  const handleSubmit = async (values: BrandForm, { setSubmitting }: FormikHelpers<BrandForm>) => {
    try {
      const formData = toFormData({ ...values });
      if (brand) {
        await updateBrand({ id: brand.id, values: formData }).unwrap();
        toast.success("Brand updated successfully");
      } else {
        await createBrand(formData).unwrap();
        toast.success("Brand created successfully");
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
            <TextInput name="name" label="Brand name" />
            <Box>
              <TextInput name="slug" label="URL slug (blank = generate from name)" />
              {brand && (
                <Typography variant="caption" color="text.secondary">
                  Changing the slug changes /brands/{brand.slug} and updates linked products.
                </Typography>
              )}
            </Box>
            <ImageInput name="logo" label="Logo" />
            <TextInput name="productCount" label='Product count label (e.g. "160+ Products")' />
            <Box className="grid grid-cols-2 gap-4">
              <TextInput name="origin" label="Country of origin" />
              <TextInput name="established" label="Established (year)" />
            </Box>
            <TextInput name="description" label="Description" multiline rows={4} />
            <DynamicFieldArray name="specialities" label="Specialities" type="text" pushInitialValue="" />
            <UISubmitButton text={brand ? "Update Brand" : "Create Brand"} disabled={isSubmitting} />
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default AddOrEditBrand;
