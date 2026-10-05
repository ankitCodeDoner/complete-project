import { Form, Formik, type FormikHelpers } from "formik";
import * as Yup from "yup";
import { Box, Chip, Typography } from "@mui/material";
import toast from "react-hot-toast";
import MainContainer from "../../components/ui/container/MainContainer";
import PageTitle from "../../components/ui/container/PageTitle";
import SectionBox from "../../components/ui/container/SectionBox";
import FormTitle from "../../components/ui/container/FormTitle";
import RenderTable from "../../components/tables/RenderTable";
import { TableRow } from "../../components/tables/TableRow";
import { TextInput } from "../../components/forms/BasicTextFields";
import FormControlCheckBox from "../../components/forms/FormControlCheckBox";
import { UISubmitButton } from "../../components/ui/buttons/CustomButton";
import {
  useGetCustomerAddressesQuery,
  useGetCustomerProfileQuery,
  useUpdateCustomerProfileMutation,
} from "../../store/services/customer/customerSlice";
import type { CustomerProfile as Profile } from "../../utils/interfaces/SiteInterface";
import { getApiError, toFormData } from "../../utils/helper";

const validationSchema = Yup.object({
  business: Yup.string().trim().required("Business name is required"),
  contact: Yup.string().trim().required("Contact person is required"),
  role: Yup.string().trim().required("Role is required"),
  email: Yup.string().trim().email("Enter a valid email").required("Email is required"),
  phone: Yup.string().trim().required("Phone is required"),
  gst: Yup.string().trim().required("GST number is required"),
  creditTerms: Yup.string().trim().required("Credit terms are required"),
  memberSince: Yup.string().trim().required("Member since is required"),
});

const addressColumns = [
  { label: "#" },
  { label: "Label" },
  { label: "Contact" },
  { label: "Address" },
  { label: "Phone" },
  { label: "Default" },
];

const CustomerProfile = () => {
  const { data, refetch } = useGetCustomerProfileQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const { data: addressData } = useGetCustomerAddressesQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const [updateProfile] = useUpdateCustomerProfileMutation();
  const profile = data?.data;
  const addresses = addressData?.data || [];

  const handleSubmit = async (values: Profile, { setSubmitting }: FormikHelpers<Profile>) => {
    try {
      await updateProfile(toFormData({ ...values })).unwrap();
      toast.success("Customer profile saved");
      refetch();
    } catch (error) {
      toast.error(getApiError(error));
    }
    setSubmitting(false);
  };

  return (
    <MainContainer>
      <PageTitle title="Customer Account" />
      <Typography variant="body2" color="text.secondary" mb={2}>
        The business account shown in the website's My Account area (profile, orders, addresses
        and notifications).
      </Typography>

      {profile && (
        <SectionBox>
          <FormTitle title="Business profile" className="mb-4" />
          <Formik
            enableReinitialize
            initialValues={profile}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, values, setFieldValue }) => (
              <Form>
                <Box className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <TextInput name="business" label="Business name" />
                  <TextInput name="gst" label="GST number" />
                  <TextInput name="contact" label="Contact person" />
                  <TextInput name="role" label="Role" />
                  <TextInput name="email" label="Email" type="email" />
                  <TextInput name="phone" label="Phone" />
                  <TextInput name="creditTerms" label='Credit terms (e.g. "30-day credit")' />
                  <TextInput name="memberSince" label='Member since (e.g. "March 2024")' />
                  <Box display="flex" alignItems="center" gap={1}>
                    <FormControlCheckBox
                      label="Business verified"
                      checked={values.verified}
                      onChange={(e) => setFieldValue("verified", e.target.checked)}
                    />
                    <Chip
                      size="small"
                      label={values.verified ? "Verified" : "Pending"}
                      color={values.verified ? "success" : "warning"}
                    />
                  </Box>
                </Box>
                <Box display="flex" justifyContent="end" mt={2}>
                  <UISubmitButton text="Save Profile" disabled={isSubmitting} />
                </Box>
              </Form>
            )}
          </Formik>
        </SectionBox>
      )}

      <Box mt={3}>
        <Typography variant="h6" mb={1}>
          Saved addresses
        </Typography>
        <Typography variant="body2" color="text.secondary" mb={2}>
          Addresses are managed by the customer on the website and are shown here for reference.
        </Typography>
        <RenderTable columns={addressColumns}>
          {addresses.map((address, index) => (
            <TableRow key={address.id} itemIndex={index}>
              <td className="p-4 rounded-l-lg">{index + 1}</td>
              <td className="p-4 font-medium">{address.label}</td>
              <td className="p-4">{address.contact}</td>
              <td className="p-4">
                {address.line}, {address.city}, {address.state} {address.pin}
              </td>
              <td className="p-4">{address.phone}</td>
              <td className="p-4 rounded-r-lg">
                {address.isDefault && <Chip label="Default" size="small" color="secondary" />}
              </td>
            </TableRow>
          ))}
        </RenderTable>
      </Box>
    </MainContainer>
  );
};

export default CustomerProfile;
