import { useField } from "formik";
import { Box, TextField } from "@mui/material";
import { DragDropUploader } from "./DragDropUploader";
import { assetUrl } from "../../utils/helper";
import type { ImageValue } from "../../utils/interfaces/SiteInterface";

interface Props {
  name: string;
  label: string;
}

/**
 * Formik image field: upload a file (saved into the website's
 * public/assets/images/uploads) or keep/enter a path or Unsplash URL —
 * the only remote image host the website's next.config allows.
 */
export const ImageInput = ({ name, label }: Props) => {
  const [field, meta, helpers] = useField<ImageValue>(name);
  const value = field.value;
  const isFile = value instanceof File;

  return (
    <Box>
      <DragDropUploader
        name={name}
        label={label}
        file={isFile ? value : assetUrl(value)}
        onChange={(file) => helpers.setValue(file)}
      />
      <TextField
        fullWidth
        size="small"
        sx={{ mt: 1.5 }}
        label="…or image path / Unsplash URL"
        placeholder="/assets/images/… or https://images.unsplash.com/…"
        value={isFile ? "" : value || ""}
        onChange={(e) => helpers.setValue(e.target.value)}
        onBlur={() => helpers.setTouched(true)}
        error={Boolean(meta.touched && meta.error)}
        helperText={
          isFile ? `Selected file: ${value.name}` : meta.touched && meta.error
        }
      />
    </Box>
  );
};
