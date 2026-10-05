import React from "react";

import { Form, Formik } from "formik";
import { Box } from "@mui/material";
import dayjs from "dayjs";
import { useGetCourseLookupQuery } from "../../store/services/course/courseSlice";
import { useGetUserLookupQuery } from "../../store/services/user-role/userRoleSlice";
import { useGetStatusQuery } from "../../store/services/engagement-hub/engagementHubSlice";
import { useGetLectureByCourseIdQuery } from "../../store/services/lecture/lectureSlice";
import { TextInput } from "../../components/forms/BasicTextFields";
import {
  SearchableSelectDropdown,
  SelectDropdown,
} from "../../components/forms/SelectDropdown";
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
  const { data: courseLookup } = useGetCourseLookupQuery();
  const { data: userLookup } = useGetUserLookupQuery();
  const { data: statusData } = useGetStatusQuery();

  return (
    <Box>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {({ setFieldValue, values }) => {
          const { data: lectures } = useGetLectureByCourseIdQuery(
            values?.courseId ? Number(values.courseId) : 0,
            { skip: !values?.courseId }
          );
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
                    {initialValues.status !== undefined && (
                      <Box flex={1}>
                        <SelectDropdown
                          label="Status"
                          value={values.status}
                          onChange={(e) =>
                            setFieldValue("status", e.target.value)
                          }
                          options={statusData?.data}
                          name="status"
                        />
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
                    {initialValues.courseId !== undefined && (
                      <Box flex={1}>
                        <SearchableSelectDropdown
                          label="Course"
                          value={values.courseId}
                          onChange={(e) =>
                            setFieldValue("courseId", e.target.value)
                          }
                          options={courseLookup?.data}
                          name="courseId"
                        />
                      </Box>
                    )}
                    {initialValues.lectureId !== undefined && (
                      <Box flex={1}>
                        <SearchableSelectDropdown
                          label="Lecture"
                          value={values.lectureId}
                          onChange={(e) =>
                            setFieldValue("lectureId", e.target.value)
                          }
                          options={lectures?.data}
                          name="lectureId"
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
