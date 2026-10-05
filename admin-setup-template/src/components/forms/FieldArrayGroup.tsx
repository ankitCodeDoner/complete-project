import { FieldArray, getIn, useFormikContext } from "formik";
import { Box, Button, Typography } from "@mui/material";
import { FaArrowDown, FaArrowUp, FaPlus, FaTrashAlt } from "react-icons/fa";
import { TextInput } from "./BasicTextFields";
import { IconSelect } from "./IconSelect";
import { IconButton } from "../ui/buttons/IconButton";

export interface SubField {
  name: string;
  label: string;
  multiline?: boolean;
  /** Renders the website icon picker instead of a text box. */
  icon?: boolean;
}

interface Props {
  name: string;
  label: string;
  /** Singular name for one row, e.g. "Spec". */
  itemLabel: string;
  /** Object rows. Omit for a plain list of strings. */
  fields?: SubField[];
  /** For string lists: render each entry as a textarea. */
  multiline?: boolean;
}

/**
 * Repeatable rows inside a Formik form, in display order. Supports
 * object rows (`fields`) or plain strings, with add/remove/reorder.
 */
export const FieldArrayGroup = ({ name, label, itemLabel, fields, multiline }: Props) => {
  const { values, errors } = useFormikContext<Record<string, unknown>>();
  const rows: unknown[] = getIn(values, name) || [];
  const listError = getIn(errors, name);

  const emptyRow = fields
    ? Object.fromEntries(fields.map((f) => [f.name, ""]))
    : "";

  return (
    <FieldArray name={name}>
      {({ push, remove, move }) => (
        <Box>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
            <Typography variant="subtitle2">{label}</Typography>
            <Button size="small" startIcon={<FaPlus size={12} />} onClick={() => push(emptyRow)}>
              Add {itemLabel}
            </Button>
          </Box>

          {rows.length === 0 && (
            <Typography variant="body2" color="text.secondary" mb={1}>
              No {label.toLowerCase()} yet.
            </Typography>
          )}

          {rows.map((_, index) => (
            <Box
              key={index}
              className="border border-gray-200 rounded-lg bg-white"
              sx={{ p: 1.5, mb: 1.5 }}
            >
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                <Typography variant="caption" color="text.secondary">
                  {itemLabel} {index + 1}
                </Typography>
                <Box display="flex" gap={1}>
                  <IconButton
                    tooltip="Move up"
                    size="small"
                    bgColor="GRAY"
                    disabled={index === 0}
                    className={index === 0 ? "opacity-40" : ""}
                    icon={<FaArrowUp size={10} />}
                    onClick={() => move(index, index - 1)}
                  />
                  <IconButton
                    tooltip="Move down"
                    size="small"
                    bgColor="GRAY"
                    disabled={index === rows.length - 1}
                    className={index === rows.length - 1 ? "opacity-40" : ""}
                    icon={<FaArrowDown size={10} />}
                    onClick={() => move(index, index + 1)}
                  />
                  <IconButton
                    tooltip="Remove"
                    size="small"
                    icon={<FaTrashAlt size={10} />}
                    onClick={() => remove(index)}
                  />
                </Box>
              </Box>

              {fields ? (
                <Box display="flex" flexDirection="column" gap={1.5}>
                  {fields.map((f) =>
                    f.icon ? (
                      <IconSelect key={f.name} name={`${name}[${index}].${f.name}`} label={f.label} />
                    ) : (
                      <TextInput
                        key={f.name}
                        name={`${name}[${index}].${f.name}`}
                        label={f.label}
                        multiline={f.multiline}
                      />
                    )
                  )}
                </Box>
              ) : (
                <TextInput
                  name={`${name}[${index}]`}
                  label={itemLabel}
                  multiline={multiline}
                  rows={4}
                />
              )}
            </Box>
          ))}

          {typeof listError === "string" && (
            <Typography variant="caption" color="error">
              {listError}
            </Typography>
          )}
        </Box>
      )}
    </FieldArray>
  );
};
