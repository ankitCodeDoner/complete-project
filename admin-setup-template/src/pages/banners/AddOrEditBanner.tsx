import { Form, Formik, type FormikHelpers } from "formik";
import * as Yup from "yup";
import { Box } from "@mui/material";
import toast from "react-hot-toast";
import { TextInput } from "../../components/forms/BasicTextFields";
import { ImageInput } from "../../components/forms/ImageInput";
import { UISubmitButton } from "../../components/ui/buttons/CustomButton";
import {
  useCreateBannerMutation,
  useUpdateBannerMutation,
} from "../../store/services/banner/bannerSlice";
import type { ImageValue, SiteBanner } from "../../utils/interfaces/SiteInterface";
import { getApiError, toFormData } from "../../utils/helper";

interface Props {
  banner: SiteBanner | null;
  onClose: () => void;
}

interface BannerForm {
  image: ImageValue;
  alt: string;
  category: string;
}

const validationSchema = Yup.object({
  image: Yup.mixed().required("Image is required"),
  alt: Yup.string().trim().required("Alt text is required"),
  category: Yup.string().trim().required("Label is required"),
});

const AddOrEditBanner = ({ banner, onClose }: Props) => {
  const [createBanner] = useCreateBannerMutation();
  const [updateBanner] = useUpdateBannerMutation();

  const initialValues: BannerForm = {
    image: banner?.image || "",
    alt: banner?.alt || "",
    category: banner?.category || "",
  };

  const handleSubmit = async (values: BannerForm, { setSubmitting }: FormikHelpers<BannerForm>) => {
    try {
      const formData = toFormData({ ...values });
      if (banner) {
        await updateBanner({ id: banner.id, values: formData }).unwrap();
        toast.success("Banner updated successfully");
      } else {
        await createBanner(formData).unwrap();
        toast.success("Banner created successfully");
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
            <ImageInput name="image" label="Banner image" />
            <TextInput name="alt" label="Alt text (describes the image)" />
            <TextInput name="category" label="Label shown on the banner" />
            <UISubmitButton text={banner ? "Update Banner" : "Create Banner"} disabled={isSubmitting} />
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default AddOrEditBanner;
