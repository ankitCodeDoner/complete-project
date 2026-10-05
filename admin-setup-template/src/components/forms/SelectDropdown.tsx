import React from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Autocomplete,
  TextField,
  Typography,
} from "@mui/material";
import { useFormikContext } from "formik";

interface SelectProps {
  name?: string;
  label: string;
  value: any;
  onChange: (event: any) => void;
  options: any[];
  disabled?: boolean;
}

export const SelectDropdown: React.FC<SelectProps> = ({
  value,
  onChange,
  options,
  label,
  disabled,
}) => {
  return (
    <FormControl fullWidth className="mb-5" size="small">
      <InputLabel>{label}</InputLabel>
      <Select
        value={value || ""}
        onChange={onChange}
        label={label}
        disabled={disabled}
      >
        {options?.map((item) => (
          <MenuItem key={item.id} value={item.id}>
            {item.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

interface SearchableSelectDropdownProps {
  name?: any;
  label: string;
  value: any;
  onChange: (event: { target: { value: string } }) => void;
  options: any[];
  disabledOptionText?: string;
  disabled?: boolean;
  errors?: any;
  touched?: any;
}
export const SearchableSelectDropdown: React.FC<
  SearchableSelectDropdownProps & { required?: boolean }
> = ({
  label,
  value,
  onChange,
  options = [],
  disabled,
  errors,
  touched,
  name,
  required = false,
}) => {
  const selectedOption =
    options.find(
      (option) =>
        String(option.value) === String(value) ||
        String(option.id) === String(value)
    ) || null;

  return (
    <FormControl fullWidth className="mb-2" size="small" required={required}>
      <Autocomplete
        value={selectedOption}
        onChange={(_event, newValue) => {
          if (!disabled) {
            onChange({
              target: { value: newValue?.value || newValue?.id || "" },
            });
          }
        }}
        options={options}
        getOptionLabel={(option) => {
          const name = option?.name
            ? option.name.charAt(0).toUpperCase() + option.name.slice(1)
            : "";
          const userName = option?.userName
            ? option.userName.charAt(0).toUpperCase() + option.userName.slice(1)
            : "";
          return name || userName || "";
        }}
        isOptionEqualToValue={(option, value) =>
          option?.value === value?.value || option?.id === value?.id
        }
        renderInput={(params) => (
          <TextField
            {...params}
            label={label + (required ? " *" : "")}
            size="small"
            sx={{ fontSize: "12px" }}
            disabled={disabled}
            error={Boolean(touched?.[name] && errors?.[name])}
            helperText={touched?.[name] && errors?.[name]}
          />
        )}
        getOptionDisabled={() => Boolean(disabled)}
        // disableClearable={disabled}
        // open={disabled ? false : undefined}
        // noOptionsText={disabled ? "" : disabledOptionText}
        sx={{ minHeight: "32px", fontSize: "12px" }}
      />
    </FormControl>
  );
};

export interface Option {
  id?: string;
  value?: string;
  name?: string;
  userName?: string;
}

interface MultiSelectDropdownProps {
  label: string;
  value: any[];
  onChange: (event: { target: { value: string[] } }) => void;
  options: Option[];
  disabled?: boolean;
}

export const MultiSelectDropdown: React.FC<MultiSelectDropdownProps> = ({
  label,
  value = [],
  onChange,
  options = [],
  disabled,
}) => {
  const selectedOptions = options.filter((option) =>
    value.map(String).includes(String(option.id ?? option.value))
  );

  return (
    <FormControl fullWidth className="mb-2" size="small">
      <Autocomplete
        multiple
        value={selectedOptions}
        onChange={(_event, newValue) => {
          if (!disabled) {
            const ids = newValue.map(
              (option) => option.id ?? option.value ?? ""
            );
            onChange({
              target: { value: ids },
            });
          }
        }}
        options={options}
        getOptionLabel={(option) => option.name || option.userName || ""}
        isOptionEqualToValue={(option, selected) =>
          String(option.id ?? option.value) ===
          String(selected.id ?? selected.value)
        }
        renderInput={(params) => (
          <TextField
            {...params}
            label={label}
            size="small"
            disabled={disabled}
          />
        )}
      />
    </FormControl>
  );
};

interface IconOption {
  id?: string;
  value?: string;
  name?: string;
  userName?: string;
  iconUrl?: string;
}

interface SearchableIconSelectDropdownProps {
  label: string;
  value: any;
  onChange: (event: { target: { value: string } }) => void;
  options: IconOption[];
  disabledOptionText?: string;
  disabled?: boolean;
}
export const SearchableIconSelectDropdown: React.FC<
  SearchableIconSelectDropdownProps
> = ({ label, value, onChange, options = [], disabled }) => {
  const selectedOption =
    options.find(
      (option) =>
        String(option.value) === String(value) ||
        String(option.id) === String(value)
    ) || null;
  console.log(selectedOption);
  console.log(value);
  return (
    <FormControl fullWidth className="mb-2" size="small">
      <Autocomplete
        value={selectedOption}
        onChange={(_event, newValue) => {
          if (!disabled) {
            onChange({
              target: { value: newValue?.value || newValue?.id || "" },
            });
          }
        }}
        options={options}
        getOptionLabel={(option) => {
          const name = option?.name
            ? option.name.charAt(0).toUpperCase() + option.name.slice(1)
            : "";
          const userName = option?.userName
            ? option.userName.charAt(0).toUpperCase() + option.userName.slice(1)
            : "";
          return name || userName || "";
        }}
        isOptionEqualToValue={(option, value) =>
          option?.value === value?.value || option?.id === value?.id
        }
        renderInput={(params) => (
          <TextField
            {...params}
            label={label}
            size="small"
            sx={{ fontSize: "12px" }}
            disabled={disabled}
          />
        )}
        getOptionDisabled={() => Boolean(disabled)}
        // disableClearable={disabled}
        // open={disabled ? false : undefined}
        // noOptionsText={disabled ? "" : disabledOptionText}
        sx={{ minHeight: "32px", fontSize: "12px" }}
      />
    </FormControl>
  );
};

interface OptionType {
  id: number;
  name: string;
  basePrice?: number;
}

interface SelectDropdownProps {
  name: string;
  label: string;
  value: any;
  options: OptionType[];
}

export const SelectDropdownWithPrice: React.FC<SelectDropdownProps> = ({
  name,
  label,
  value,
  options,
}) => {
  const { setFieldValue } = useFormikContext<any>();

  const handleChange = (event: any) => {
    const selectedId = event.target.value;
    const selectedOption = options.find((item) => item.id === selectedId);

    setFieldValue(name, selectedId);
    if (selectedOption?.basePrice !== undefined) {
      setFieldValue("price", selectedOption.basePrice);
    }
  };

  return (
    <FormControl fullWidth className="mb-5" size="small">
      <InputLabel>{label}</InputLabel>
      <Select value={value || ""} onChange={handleChange} label={label}>
        {options.map((item) => (
          <MenuItem key={item.id} value={item.id}>
            <div className="flex justify-between w-full">
              <Typography>{item.name}</Typography>
              {item.basePrice !== undefined && (
                <Typography variant="body2" color="text.secondary">
                  ₹{item?.basePrice}
                </Typography>
              )}
            </div>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
