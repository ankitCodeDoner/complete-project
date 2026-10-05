import { Box } from "@mui/material";
import { useFormikContext } from "formik";

const FileUploadField = ({
  image,
  label = "Upload Image",
}: {
  image: string;
  label?: string;
}) => {
  const { values, setFieldValue } = useFormikContext<any>();
  return (
    <Box mt={2}>
      <label style={{ fontWeight: 500, display: "block", marginBottom: 8 }}>
        {label}
      </label>
      <input
        type="file"
        accept="image/*"
        className="w-full border rounded px-2 py-1 text-sm"
        onChange={(e) => {
          if (e.currentTarget.files?.[0]) {
            setFieldValue(image, e.currentTarget.files[0]);
          }
        }}
      />
      {values.image && typeof values.image === "object" && (
        <p style={{ fontSize: 12, color: "gray" }}>
          Selected: {values.image.name}
        </p>
      )}
    </Box>
  );
};

export default FileUploadField;
