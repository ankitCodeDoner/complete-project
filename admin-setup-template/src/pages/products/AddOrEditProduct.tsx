import { Form, Formik, type FormikHelpers } from "formik";
import * as Yup from "yup";
import { Box, Typography } from "@mui/material";
import toast from "react-hot-toast";
import { TextInput } from "../../components/forms/BasicTextFields";
import { SelectDropdown } from "../../components/forms/SelectDropdown";
import FormControlCheckBox from "../../components/forms/FormControlCheckBox";
import { ImageInput } from "../../components/forms/ImageInput";
import { FieldArrayGroup } from "../../components/forms/FieldArrayGroup";
import { UISubmitButton } from "../../components/ui/buttons/CustomButton";
import {
  useCreateProductMutation,
  useUpdateProductMutation,
} from "../../store/services/product/productSlice";
import { useGetCategoryQuery } from "../../store/services/category/categorySlice";
import { useGetBrandQuery } from "../../store/services/brand/brandSlice";
import type { ImageValue, Product, ProductSpec } from "../../utils/interfaces/SiteInterface";
import { getApiError, toFormData } from "../../utils/helper";

interface Props {
  product: Product | null;
  onClose: () => void;
}

interface ProductForm {
  name: string;
  slug: string;
  categorySlug: string;
  category: string;
  brandSlug: string;
  brand: string;
  origin: string;
  speciality: string;
  packSize: string;
  generic: string;
  image: ImageValue;
  rating: number | string;
  reviews: number | string;
  price: number | string;
  originalPrice: number | string;
  inStock: boolean;
  description: string;
  specs: ProductSpec[];
  bulkTag: string;
}

const validationSchema = Yup.object({
  name: Yup.string().trim().required("Name is required"),
  categorySlug: Yup.string().required("Choose a category"),
  category: Yup.string().trim().required("Category label is required"),
  brandSlug: Yup.string().required("Choose a brand"),
  brand: Yup.string().trim().required("Brand label is required"),
  origin: Yup.string().trim().required("Origin is required"),
  speciality: Yup.string().trim().required("Speciality is required"),
  packSize: Yup.string().trim().required("Pack size is required"),
  generic: Yup.string().trim().required("Generic name is required"),
  image: Yup.mixed().required("Image is required"),
  rating: Yup.number().typeError("Enter a number").min(0).max(5).required("Rating is required"),
  reviews: Yup.number().typeError("Enter a number").integer().min(0).required("Reviews is required"),
  price: Yup.number().typeError("Enter a number").positive().required("Price is required"),
  originalPrice: Yup.number()
    .typeError("Enter a number")
    .positive()
    .required("MRP is required")
    .min(Yup.ref("price"), "MRP must be at least the price"),
  description: Yup.string().trim().required("Description is required"),
});

const AddOrEditProduct = ({ product, onClose }: Props) => {
  const { data: categoryData } = useGetCategoryQuery(undefined, { refetchOnMountOrArgChange: true });
  const { data: brandData } = useGetBrandQuery(undefined, { refetchOnMountOrArgChange: true });
  const [createProduct] = useCreateProductMutation();
  const [updateProduct] = useUpdateProductMutation();

  const categories = categoryData?.data || [];
  const brands = brandData?.data || [];
  const categoryOptions = categories.map((c) => ({ id: c.slug, name: c.name }));
  const brandOptions = brands.map((b) => ({ id: b.slug, name: b.name }));

  const initialValues: ProductForm = {
    name: product?.name || "",
    slug: product?.slug || "",
    categorySlug: product?.categorySlug || "",
    category: product?.category || "",
    brandSlug: product?.brandSlug || "",
    brand: product?.brand || "",
    origin: product?.origin || "",
    speciality: product?.speciality || "",
    packSize: product?.packSize || "",
    generic: product?.generic || "",
    image: product?.image || "",
    rating: product?.rating ?? "",
    reviews: product?.reviews ?? 0,
    price: product?.price ?? "",
    originalPrice: product?.originalPrice ?? "",
    inStock: product?.inStock ?? true,
    description: product?.description || "",
    specs: product?.specs || [],
    bulkTag: product?.bulkTag || "",
  };

  const handleSubmit = async (
    values: ProductForm,
    { setSubmitting }: FormikHelpers<ProductForm>
  ) => {
    try {
      const formData = toFormData({ ...values });
      if (product) {
        await updateProduct({ id: product.id, values: formData }).unwrap();
        toast.success("Product updated successfully");
      } else {
        await createProduct(formData).unwrap();
        toast.success("Product created successfully");
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
        const price = Number(values.price);
        const mrp = Number(values.originalPrice);
        const discount = price > 0 && mrp >= price ? Math.round((1 - price / mrp) * 100) : null;

        return (
          <Form>
            <Box className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Box className="md:col-span-2">
                <TextInput name="name" label="Product name" />
              </Box>
              <Box className="md:col-span-2">
                <TextInput name="slug" label="URL slug (blank = generate from name)" />
                <Typography variant="caption" color="text.secondary">
                  Page: /products/{values.slug || "…"}
                </Typography>
              </Box>

              <SelectDropdown
                label="Category"
                value={values.categorySlug}
                options={categoryOptions}
                onChange={(e) => {
                  const slug = e.target.value;
                  setFieldValue("categorySlug", slug);
                  if (!values.category) {
                    setFieldValue("category", categories.find((c) => c.slug === slug)?.name || "");
                  }
                }}
              />
              <TextInput name="category" label="Category label shown on product" />

              <SelectDropdown
                label="Brand"
                value={values.brandSlug}
                options={brandOptions}
                onChange={(e) => {
                  const slug = e.target.value;
                  setFieldValue("brandSlug", slug);
                  if (!values.brand) {
                    setFieldValue("brand", brands.find((b) => b.slug === slug)?.name || "");
                  }
                }}
              />
              <TextInput name="brand" label="Brand label shown on product" />

              <TextInput name="generic" label="Generic name" />
              <TextInput name="speciality" label="Speciality" />
              <TextInput name="origin" label="Country of origin" />
              <TextInput name="packSize" label="Pack size" />

              <TextInput name="price" label="Price (₹)" type="number" />
              <TextInput name="originalPrice" label="MRP / original price (₹)" type="number" />
              <Typography variant="body2" color="text.secondary" className="md:col-span-2">
                Discount shown on the website:{" "}
                <strong>{discount === null ? "—" : `${discount}% off`}</strong> (calculated)
              </Typography>

              <TextInput name="rating" label="Rating (0–5)" type="number" />
              <TextInput name="reviews" label="Number of reviews" type="number" />

              <TextInput name="bulkTag" label="Bulk offer tag (optional)" />
              <FormControlCheckBox
                label="In stock"
                checked={values.inStock}
                onChange={(e) => setFieldValue("inStock", e.target.checked)}
              />

              <Box className="md:col-span-2">
                <TextInput name="description" label="Description" multiline rows={4} />
              </Box>

              <Box className="md:col-span-2">
                <ImageInput name="image" label="Product image" />
              </Box>

              <Box className="md:col-span-2">
                <FieldArrayGroup
                  name="specs"
                  label="Specifications"
                  itemLabel="Spec"
                  fields={[
                    { name: "label", label: "Label" },
                    { name: "value", label: "Value" },
                  ]}
                />
              </Box>
            </Box>

            <Box mt={3}>
              <UISubmitButton
                text={product ? "Update Product" : "Create Product"}
                disabled={isSubmitting}
              />
            </Box>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddOrEditProduct;
