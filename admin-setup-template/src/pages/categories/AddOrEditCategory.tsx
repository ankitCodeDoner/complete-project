import { Form, Formik, type FormikHelpers } from "formik";
import * as Yup from "yup";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import toast from "react-hot-toast";
import { TextInput } from "../../components/forms/BasicTextFields";
import { IconSelect } from "../../components/forms/IconSelect";
import { UISubmitButton } from "../../components/ui/buttons/CustomButton";
import SiteIcon from "../../components/ui/SiteIcon";
import {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
} from "../../store/services/category/categorySlice";
import type { Category } from "../../utils/interfaces/SiteInterface";
import { getApiError, toFormData } from "../../utils/helper";
import { CATEGORY_PALETTES, paletteFromClass } from "../../utils/siteOptions";

interface Props {
  category: Category | null;
  onClose: () => void;
}

interface CategoryForm {
  name: string;
  slug: string;
  icon: string;
  iconColor: string;
  bgColor: string;
  blurb: string;
}

const validationSchema = Yup.object({
  name: Yup.string().trim().required("Name is required"),
  icon: Yup.string().required("Choose an icon"),
  blurb: Yup.string().trim().required("Blurb is required"),
});

const Swatch = ({ icon, bg }: { icon: string; bg: string }) => (
  <Box
    component="span"
    sx={{ width: 18, height: 18, borderRadius: "50%", bgcolor: bg, border: `3px solid ${icon}` }}
  />
);

const AddOrEditCategory = ({ category, onClose }: Props) => {
  const [createCategory] = useCreateCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const defaultPalette = CATEGORY_PALETTES[0];

  const initialValues: CategoryForm = {
    name: category?.name || "",
    slug: category?.slug || "",
    icon: category?.icon || "",
    iconColor: category?.iconColor || defaultPalette.iconClass,
    bgColor: category?.bgColor || defaultPalette.bgClass,
    blurb: category?.blurb || "",
  };

  const handleSubmit = async (
    values: CategoryForm,
    { setSubmitting }: FormikHelpers<CategoryForm>
  ) => {
    try {
      const formData = toFormData({ ...values });
      if (category) {
        await updateCategory({ id: category.id, values: formData }).unwrap();
        toast.success("Category updated successfully");
      } else {
        await createCategory(formData).unwrap();
        toast.success("Category created successfully");
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
      {({ isSubmitting, values, setFieldValue }) => {
        const palette = paletteFromClass(values.iconColor);
        return (
          <Form>
            <Box display="flex" flexDirection="column" gap={2}>
              <TextInput name="name" label="Name" />
              <Box>
                <TextInput name="slug" label="URL slug (blank = generate from name)" />
                {category && (
                  <Typography variant="caption" color="text.secondary">
                    Changing the slug changes /categories/{category.slug} and updates linked
                    products.
                  </Typography>
                )}
              </Box>
              <IconSelect name="icon" />
              <FormControl fullWidth size="small">
                <InputLabel>Colour</InputLabel>
                <Select
                  label="Colour"
                  value={palette.name}
                  onChange={(e) => {
                    const next = CATEGORY_PALETTES.find((p) => p.name === e.target.value)!;
                    setFieldValue("iconColor", next.iconClass);
                    setFieldValue("bgColor", next.bgClass);
                  }}
                >
                  {CATEGORY_PALETTES.map((p) => (
                    <MenuItem key={p.name} value={p.name}>
                      <Box display="flex" alignItems="center" gap={1} textTransform="capitalize">
                        <Swatch icon={p.icon} bg={p.bg} />
                        {p.name}
                      </Box>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextInput name="blurb" label="Blurb (shown under the category title)" multiline />

              <Box>
                <Typography variant="subtitle2" mb={1}>
                  Preview
                </Typography>
                <Box
                  display="inline-flex"
                  flexDirection="column"
                  alignItems="center"
                  gap={1}
                  p={2}
                  border="1px solid #e5e7eb"
                  borderRadius={2}
                >
                  <Box
                    sx={{
                      width: 56,
                      height: 56,
                      borderRadius: "50%",
                      bgcolor: palette.bg,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <SiteIcon name={values.icon} size={26} color={palette.icon} />
                  </Box>
                  <Typography variant="body2" fontWeight={600}>
                    {values.name || "Category name"}
                  </Typography>
                </Box>
              </Box>

              <UISubmitButton
                text={category ? "Update Category" : "Create Category"}
                disabled={isSubmitting}
              />
            </Box>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddOrEditCategory;
