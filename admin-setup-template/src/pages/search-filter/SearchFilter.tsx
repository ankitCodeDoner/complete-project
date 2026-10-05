import React from "react";

import { Form, Formik } from "formik";
import { Box } from "@mui/material";
import dayjs from "dayjs";
import { useGetUserLookupQuery } from "../../store/services/user-role/userRoleSlice";
import { TextInput } from "../../components/forms/BasicTextFields";
import { SearchableSelectDropdown } from "../../components/forms/SelectDropdown";
import InBetweenDateSearch from "../../components/forms/InBetweenDateSearch";
import { Refresh } from "../../components/ui/buttons/AddEntityButton";
import { UISubmitButton } from "../../components/ui/buttons/CustomButton";

// Define a type for the fields you want to support
export interface SearchFormValues {
  Email?: string;
  Name?: string;
  MobileNumber?: string;
  StartDate?: string;
  EndDate?: string;
  userId?: string;
  courseId?: string;
  lectureId?: string;
  [key: string]: any;
}

interface SearchFilterProps {
  initialValues: SearchFormValues;
  onSubmit: (values: SearchFormValues) => void;
  children?: React.ReactNode;
  onDateRangeChange?: (start: string | null, end: string | null) => void;
  onRefresh?: () => void;
  isSpinning?: boolean;
}

const SearchFilter: React.FC<SearchFilterProps> = ({
  initialValues,
  onSubmit,
  children,
  onDateRangeChange,
  onRefresh,
  isSpinning,
}) => {
  const { data: userLookup } = useGetUserLookupQuery();

  return (
    <Box>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {({ setFieldValue, values }) => {
          return (
            <Form>
              <Box className="flex gap-4 mt-6 mb-6">
                {children ? (
                  children
                ) : (
                  <>
                    {initialValues.Name !== undefined && (
                      <Box flex={1}>
                        <TextInput name="Name" label="Name" />
                      </Box>
                    )}
                    {initialValues.MobileNumber !== undefined && (
                      <Box flex={1}>
                        <TextInput
                          name="MobileNumber"
                          label="Phone Number"
                          type="number"
                        />
                      </Box>
                    )}
                    {initialValues.Email !== undefined && (
                      <Box flex={1}>
                        <TextInput name="Email" label="Email" />
                      </Box>
                    )}

                    {initialValues.userId !== undefined && (
                      <Box flex={1}>
                        <SearchableSelectDropdown
                          label="User"
                          value={values.userId}
                          onChange={(e) =>
                            setFieldValue("userId", e.target.value)
                          }
                          options={userLookup?.data}
                          name="userId"
                        />
                      </Box>
                    )}
                  </>
                )}

                {/* Date Range Search - always rendered, but handles null dates */}
                {onDateRangeChange && (
                  <InBetweenDateSearch
                    onDateRangeChange={(start, end) => {
                      onDateRangeChange(start, end);
                      if (start && end) {
                        setFieldValue(
                          "StartDate",
                          dayjs(start).format("YYYY-MM-DD")
                        );
                        setFieldValue(
                          "EndDate",
                          dayjs(end).format("YYYY-MM-DD")
                        );
                      } else {
                        setFieldValue("StartDate", undefined);
                        setFieldValue("EndDate", undefined);
                      }
                    }}
                  />
                )}

                {/* Refresh Button - conditionally rendered */}
                {onRefresh && (
                  <Refresh
                    onRefresh={onRefresh}
                    isSpinning={isSpinning || false}
                  />
                )}

                <UISubmitButton text="Search" />
              </Box>
            </Form>
          );
        }}
      </Formik>
    </Box>
  );
};

export default SearchFilter;
