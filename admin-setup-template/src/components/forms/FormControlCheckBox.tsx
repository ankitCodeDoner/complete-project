import { FormControlLabel } from "@mui/material";
import React from "react";
import { Checkbox as MuiCheckbox } from "@mui/material";

interface CheckboxProps {
  label: string;
  value?: string | number;
  name?: string;
  checked?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}
interface Props {
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
}

const FormControlCheckBox = ({ checked, onChange, label }: Props) => {
  return (
    <FormControlLabel
      control={
        <MuiCheckbox
          checked={checked}
          onChange={onChange}
          sx={{ color: "gray", "&.Mui-checked": { color: "#4338ca" } }}
        />
      }
      label={label}
    />
  );
};

export default FormControlCheckBox;

export const Checkbox = ({
  label,
  value,
  onChange,
  name,
  checked,
  disabled = false,
}: CheckboxProps) => {
  return (
    <label className="text-nowrap">
      <MuiCheckbox
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        sx={{
          color: "gray",
        }}
      />
      {label}
    </label>
  );
};
