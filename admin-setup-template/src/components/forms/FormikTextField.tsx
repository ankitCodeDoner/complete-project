import  { useState } from "react";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import { useField } from "formik";
import { Visibility, VisibilityOff } from "@mui/icons-material";

interface FormikTextFieldProps {
  label: string;
  type?: string;
  placeholder?: string;
  name: string;
}

const FormikTextField = ({ label, type = "text", placeholder, ...props }: FormikTextFieldProps) => {
  const [field, meta] = useField(props);
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => setShowPassword((prev) => !prev);

  return (
    <TextField
      fullWidth
      label={label}
      margin="normal"
      variant="outlined"
      type={type === "password" && showPassword ? "text" : type}
      placeholder={placeholder}
      {...field}
      error={meta.touched && Boolean(meta.error)}
      helperText={meta.touched && meta.error}
      InputProps={
        type === "password"
          ? {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleTogglePassword} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }
          : undefined
      }
    />
  );
};

export default FormikTextField;
