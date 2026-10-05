import { Form, Formik, type FormikHelpers } from "formik";
import { Box, Typography } from "@mui/material";
import toast from "react-hot-toast";
import MainContainer from "../../components/ui/container/MainContainer";
import PageTitle from "../../components/ui/container/PageTitle";
import SectionBox from "../../components/ui/container/SectionBox";
import { FieldArrayGroup } from "../../components/forms/FieldArrayGroup";
import { UISubmitButton } from "../../components/ui/buttons/CustomButton";
import {
  useGetCompanyQuery,
  useUpdateCompanyMutation,
} from "../../store/services/company/companySlice";
import type { Company } from "../../utils/interfaces/SiteInterface";
import { getApiError, toFormData } from "../../utils/helper";

const AboutPage = () => {
  const { data, refetch } = useGetCompanyQuery(undefined, { refetchOnMountOrArgChange: true });
  const [updateCompany] = useUpdateCompanyMutation();
  const company = data?.data;

  const handleSubmit = async (values: Company, { setSubmitting }: FormikHelpers<Company>) => {
    try {
      await updateCompany(toFormData({ ...values })).unwrap();
      toast.success("About page saved");
      refetch();
    } catch (error) {
      toast.error(getApiError(error));
    }
    setSubmitting(false);
  };

  return (
    <MainContainer>
      <PageTitle title="About Page" />
      {company && (
        <Formik enableReinitialize initialValues={company} onSubmit={handleSubmit}>
          {({ isSubmitting }) => (
            <Form>
              <Box display="flex" flexDirection="column" gap={2}>
                <Typography variant="body2" color="text.secondary">
                  Content of the website's /about page. The stats strip on that page is managed
                  under Homepage Stats.
                </Typography>
                <SectionBox>
                  <FieldArrayGroup
                    name="milestones"
                    label="Journey milestones"
                    itemLabel="Milestone"
                    fields={[
                      { name: "year", label: "Year" },
                      { name: "title", label: "Title" },
                      { name: "text", label: "Text", multiline: true },
                    ]}
                  />
                </SectionBox>
                <SectionBox>
                  <FieldArrayGroup
                    name="values"
                    label="Our values"
                    itemLabel="Value"
                    fields={[
                      { name: "icon", label: "Icon", icon: true },
                      { name: "title", label: "Title" },
                      { name: "text", label: "Text", multiline: true },
                    ]}
                  />
                </SectionBox>
                <SectionBox>
                  <FieldArrayGroup
                    name="leadership"
                    label="Leadership team"
                    itemLabel="Leader"
                    fields={[
                      { name: "name", label: "Name" },
                      { name: "role", label: "Role" },
                      { name: "bio", label: "Bio", multiline: true },
                    ]}
                  />
                </SectionBox>
                <Box display="flex" justifyContent="end">
                  <UISubmitButton text="Save About Page" disabled={isSubmitting} />
                </Box>
              </Box>
            </Form>
          )}
        </Formik>
      )}
    </MainContainer>
  );
};

export default AboutPage;
