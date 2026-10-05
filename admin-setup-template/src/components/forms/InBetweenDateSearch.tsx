import { useState } from "react";
import { MenuItem, Select, FormControl } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";

type InBetweenDateSearchProps = {
  onDateRangeChange?: (
    startDate: string | null,
    endDate: string | null
  ) => void;
};

type DateRange = {
  label: string;
  range: [Dayjs | null, Dayjs | null];
};

type DateRangeOptionKey =
  | "empty"
  | "today"
  | "yesterday"
  | "thisWeek"
  | "lastWeek"
  | "thisMonth"
  | "lastMonth";

const InBetweenDateSearch = ({
  onDateRangeChange,
}: InBetweenDateSearchProps) => {
  const [selectedOption, setSelectedOption] = useState<
    DateRangeOptionKey | "custom"
  >("empty");
  const [customDateRange, setCustomDateRange] = useState<
    [Dayjs | null, Dayjs | null]
  >([null, null]);

  const getDateRangeOptions = (): Record<DateRangeOptionKey, DateRange> => {
    const today = dayjs();
    const yesterday = today.subtract(1, "day");

    return {
      empty: { label: "Select Date Range", range: [null, null] },
      today: {
        label: "Today",
        range: [today.startOf("day"), today.endOf("day")],
      },
      yesterday: {
        label: "Yesterday",
        range: [yesterday.startOf("day"), yesterday.endOf("day")],
      },
      thisWeek: {
        label: "This Week",
        range: [today.startOf("week"), today.endOf("day")],
      },
      lastWeek: {
        label: "Last Week",
        range: [
          today.subtract(1, "week").startOf("week"),
          today.subtract(1, "week").endOf("week"),
        ],
      },
      thisMonth: {
        label: "This Month",
        range: [today.startOf("month"), today.endOf("day")],
      },
      lastMonth: {
        label: "Last Month",
        range: [
          today.subtract(1, "month").startOf("month"),
          today.subtract(1, "month").endOf("month"),
        ],
      },
    };
  };

  const handleOptionChange = (event: any) => {
    const option = event.target.value;
    setSelectedOption(option);

    if (option !== "custom") {
      const optionsMap = getDateRangeOptions();
      if (option in optionsMap) {
        const { range } = optionsMap[option as DateRangeOptionKey];
        onDateRangeChange?.(
          range[0] ? range[0].format("MM-DD-YYYY") : null,
          range[1] ? range[1].format("MM-DD-YYYY") : null
        );
      }
    }
  };

  const handleCustomDateChange = (newRange: [Dayjs | null, Dayjs | null]) => {
    setCustomDateRange(newRange);
    if (newRange[0] && newRange[1]) {
      onDateRangeChange?.(
        newRange[0].startOf("day").format("MM-DD-YYYY"),
        newRange[1].endOf("day").format("MM-DD-YYYY")
      );
    }
  };

  return (
    <div className="flex gap-4 items-center">
      <FormControl className="min-w-[200px]">
        <Select
          value={selectedOption}
          onChange={handleOptionChange}
          size="small"
          className="bg-white"
          color="primary"
        >
          {Object.entries(getDateRangeOptions()).map(([key, { label }]) => (
            <MenuItem key={key} value={key}>
              {label}
            </MenuItem>
          ))}
          <MenuItem value="custom">Custom Range</MenuItem>
        </Select>
      </FormControl>

      {selectedOption === "custom" && (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <div className="flex gap-2">
            <DatePicker
              value={customDateRange[0]}
              onChange={(date) =>
                handleCustomDateChange([date, customDateRange[1]])
              }
              slotProps={{
                textField: { size: "small", placeholder: "Start Date" },
              }}
            />
            <DatePicker
              value={customDateRange[1]}
              onChange={(date) =>
                handleCustomDateChange([customDateRange[0], date])
              }
              slotProps={{
                textField: { size: "small", placeholder: "End Date" },
              }}
            />
          </div>
        </LocalizationProvider>
      )}
    </div>
  );
};

export default InBetweenDateSearch;
