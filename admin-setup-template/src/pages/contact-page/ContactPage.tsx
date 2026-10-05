import { Form, Formik, type FormikHelpers } from "formik";
import { Box, Typography } from "@mui/material";
import toast from "react-hot-toast";
import MainContainer from "../../components/ui/container/MainContainer";
import PageTitle from "../../components/ui/container/PageTitle";
import SectionBox from "../../components/ui/container/SectionBox";
import { FieldArrayGroup } from "../../components/forms/FieldArrayGroup";
import { UISubmitButton } from "../../components/ui/buttons/CustomButton";
import {
  useGetContactQuery,
  useUpdateContactMutation,
} from "../../store/services/contact/contactSlice";
import type { ContactInfo } from "../../utils/interfaces/SiteInterface";
import { getApiError, toFormData } from "../../utils/helper";

const ContactPage = () => {
  const { data, refetch } = useGetContactQuery(undefined, { refetchOnMountOrArgChange: true });
  const [updateContact] = useUpdateContactMutation();
  const contact = data?.data;

  const handleSubmit = async (values: ContactInfo, { setSubmitting }: FormikHelpers<ContactInfo>) => {
    try {
      await updateContact(toFormData({ ...values })).unwrap();
      toast.success("Contact details saved");
      refetch();
    } catch (error) {
      toast.error(getApiError(error));
    }
    setSubmitting(false);
  };

  return (
    <MainContainer>
      <PageTitle title="Contact & FAQs" />
      {contact && (
        <Formik enableReinitialize initialValues={contact} onSubmit={handleSubmit}>
          {({ isSubmitting }) => (
            <Form>
              <Box display="flex" flexDirection="column" gap={2}>
                <Typography variant="body2" color="text.secondary">
                  Offices appear on the /contact page. The first office is used as the head
                  office in the site-wide business details for search engines, so keep at least
                  one. FAQs appear on /contact and in the account Help &amp; Support page.
                </Typography>
                <SectionBox>
                  <FieldArrayGroup
                    name="offices"
                    label="Offices"
                    itemLabel="Office"
                    fields={[
                      { name: "city", label: "City / name" },
                      { name: "address", label: "Address", multiline: true },
                      { name: "phone", label: "Phone" },
                      { name: "email", label: "Email" },
                    ]}
                  />
                </SectionBox>
                <SectionBox>
                  <FieldArrayGroup
                    name="faqs"
                    label="FAQs"
                    itemLabel="FAQ"
                    fields={[
                      { name: "question", label: "Question" },
                      { name: "answer", label: "Answer", multiline: true },
                    ]}
                  />
                </SectionBox>
                <Box display="flex" justifyContent="end">
                  <UISubmitButton text="Save Contact & FAQs" disabled={isSubmitting} />
                </Box>
              </Box>
            </Form>
          )}
        </Formik>
      )}
    </MainContainer>
  );
};

export default ContactPage;
