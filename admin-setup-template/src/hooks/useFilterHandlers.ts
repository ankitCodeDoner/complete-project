import { useState } from "react";
import dayjs from "dayjs";

type Filters = Record<string, string>;
type UseFilterHandlersProps = {
  initialFilters?: Filters;
  onRefetch?: () => void;
};

export const useFilterHandlers = ({
  initialFilters = { PageNumber: "1", PageSize: "10" },
  onRefetch,
}: UseFilterHandlersProps) => {
  const [filters, setFilters] = useState<Filters>(initialFilters);
  const [isSpinning, setIsSpinning] = useState(false);

  const onDateRangeChange = (start: string | null, end: string | null) => {
    if (start && end) {
      setFilters((prev) => ({
        ...prev,
        StartDate: dayjs(start).format("YYYY-MM-DD"),
        EndDate: dayjs(end).format("YYYY-MM-DD"),
      }));
    } else {
      setFilters((prev) => {
        const { StartDate, EndDate, ...rest } = prev;
        return rest;
      });
    }
  };

  const handleSubmit = (values: any) => {
    const filteredValues = Object.fromEntries(
      Object.entries(values).filter(([_, v]) => v !== "")
    );
    setFilters((prev) => ({
      ...prev,
      ...(filteredValues as Filters),
    }));
  };

  const handleClear = () => {
    setFilters(initialFilters);
    onRefetch?.();
    setIsSpinning(true);
    setTimeout(() => setIsSpinning(false), 1000);
    document.querySelector("form")?.reset();
  };

  return {
    filters,
    isSpinning,
    onDateRangeChange,
    handleSubmit,
    handleClear,
    setFilters,
  };
};
