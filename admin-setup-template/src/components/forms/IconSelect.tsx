import { useField } from "formik";
import {
  Box,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import SiteIcon from "../ui/SiteIcon";
import { ICON_NAMES } from "../../utils/siteOptions";

interface Props {
  name: string;
  label?: string;
}

/** Formik select for the website's Lucide icon names, with previews. */
export const IconSelect = ({ name, label = "Icon" }: Props) => {
  const [field, meta, helpers] = useField<string>(name);
  const hasError = Boolean(meta.touched && meta.error);

  const renderOption = (icon: string) => (
    <Box display="flex" alignItems="center" gap={1}>
      <SiteIcon name={icon} />
      {icon}
    </Box>
  );

  return (
    <FormControl fullWidth size="small" error={hasError}>
      <InputLabel>{label}</InputLabel>
      <Select
        value={field.value || ""}
        label={label}
        onChange={(e) => helpers.setValue(e.target.value)}
        onBlur={() => helpers.setTouched(true)}
        renderValue={renderOption}
        MenuProps={{ PaperProps: { sx: { maxHeight: 320 } } }}
      >
        {ICON_NAMES.map((icon) => (
          <MenuItem key={icon} value={icon}>
            {renderOption(icon)}
          </MenuItem>
        ))}
      </Select>
      {hasError && <FormHelperText>{meta.error}</FormHelperText>}
    </FormControl>
  );
};
