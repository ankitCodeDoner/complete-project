import { useField } from "formik";
import { TextField } from "@mui/material";

interface TextInputProps {
  name: string;
  label: string;
  type?: "text" | "password" | "email" | "number" | "date" | "file";
  disabled?: boolean;
  multiline?: boolean;
  rows?: number;
}

export const TextInput = ({
  label,
  type = "text",
  multiline = false,
  rows = 3,
  ...props
}: TextInputProps) => {
  const [field, meta] = useField(props.name);

  return (
    <TextField
      {...field}
      {...props}
      label={label}
      type={type}
      fullWidth
      variant="outlined"
      size="small"
      error={Boolean(meta.touched && meta.error)}
      helperText={meta.touched && meta.error}
      InputLabelProps={{ shrink: !!field.value }}
      multiline={multiline}
      rows={multiline ? rows : undefined}
      className="mb-2"
    />
  );
};
