import {
  LocalizationProvider,
  DatePicker as MuiDatePicker,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

interface Props {
  label: string;
  setFieldValue: (field: string, value: any) => void;
  values: any;
  setField: string;
  onChange?: (value: any) => void;
}

const DatePicker = ({ label, setFieldValue, values, setField }: Props) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <MuiDatePicker
        label={label}
        value={values ? dayjs(values) : null}
        onChange={(newValue: any) =>
          setFieldValue(setField, newValue.format("YYYY-MM-DD"))
        }
        maxDate={dayjs()}
        views={["year", "month", "day"]}
        slotProps={{
          textField: {
            size: "small",
            fullWidth: true,
          },
        }}
      />
    </LocalizationProvider>
  );
};

export default DatePicker;
