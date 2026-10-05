import { Form, Formik, type FormikHelpers } from "formik";
import * as Yup from "yup";
import { Box, Typography } from "@mui/material";
import toast from "react-hot-toast";
import { TextInput } from "../../components/forms/BasicTextFields";
import DatePicker from "../../components/forms/DatePicker";
import { ImageInput } from "../../components/forms/ImageInput";
import { FieldArrayGroup } from "../../components/forms/FieldArrayGroup";
import { UISubmitButton } from "../../components/ui/buttons/CustomButton";
import {
  useCreateBlogPostMutation,
  useUpdateBlogPostMutation,
} from "../../store/services/blog/blogSlice";
import type { BlogPost, ImageValue } from "../../utils/interfaces/SiteInterface";
import { getApiError, toFormData } from "../../utils/helper";

interface Props {
  post: BlogPost | null;
  onClose: () => void;
}

interface BlogPostForm {
  title: string;
  slug: string;
  excerpt: string;
  date: string;
  tag: string;
  author: string;
  readTime: string;
  image: ImageValue;
  content: string[];
}

const validationSchema = Yup.object({
  title: Yup.string().trim().required("Title is required"),
  excerpt: Yup.string().trim().required("Excerpt is required"),
  date: Yup.string().required("Date is required"),
  tag: Yup.string().trim().required("Tag is required"),
  author: Yup.string().trim().required("Author is required"),
  readTime: Yup.string().trim().required("Read time is required"),
  image: Yup.mixed().required("Cover image is required"),
  content: Yup.array()
    .of(Yup.string().trim())
    .test("has-text", "Add at least one paragraph", (rows) => !!rows?.some(Boolean)),
});

const today = () => new Date().toISOString().slice(0, 10);

const AddOrEditBlogPost = ({ post, onClose }: Props) => {
  const [createBlogPost] = useCreateBlogPostMutation();
  const [updateBlogPost] = useUpdateBlogPostMutation();

  const initialValues: BlogPostForm = {
    title: post?.title || "",
    slug: post?.slug || "",
    excerpt: post?.excerpt || "",
    date: post?.date || today(),
    tag: post?.tag || "",
    author: post?.author || "MedVance Newsroom",
    readTime: post?.readTime || "",
    image: post?.image || "",
    content: post?.content?.length ? post.content : [""],
  };

  const handleSubmit = async (
    values: BlogPostForm,
    { setSubmitting }: FormikHelpers<BlogPostForm>
  ) => {
    try {
      const formData = toFormData({ ...values });
      if (post) {
        await updateBlogPost({ id: post.id, values: formData }).unwrap();
        toast.success("Post updated successfully");
      } else {
        await createBlogPost(formData).unwrap();
        toast.success("Post created successfully");
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
            <Box>
              <TextInput name="slug" label="URL slug (blank = generate from title)" />
              <Typography variant="caption" color="text.secondary">
                Page: /blog/{values.slug || "…"}
              </Typography>
            </Box>
            <Box className="grid grid-cols-2 gap-4">
              <DatePicker label="Date" values={values.date} setFieldValue={setFieldValue} setField="date" />
              <TextInput name="tag" label='Tag (e.g. "Partnership")' />
              <TextInput name="author" label="Author" />
              <TextInput name="readTime" label='Read time (e.g. "3 min read")' />
            </Box>
            <TextInput name="excerpt" label="Excerpt (shown on cards)" multiline />
            <ImageInput name="image" label="Cover image" />
            <FieldArrayGroup name="content" label="Article paragraphs" itemLabel="Paragraph" multiline />
            <UISubmitButton text={post ? "Update Post" : "Create Post"} disabled={isSubmitting} />
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default AddOrEditBlogPost;
