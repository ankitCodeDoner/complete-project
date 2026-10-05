import { Form, Formik } from "formik";
import * as Yup from "yup";
import { TextInput } from "../../../../components/forms/BasicTextFields";
import { UISubmitButton } from "../../../../components/ui/buttons/CustomButton";

interface Type {
  id?: number;
  name: string;
  isActive: boolean;
}
interface FormProps {
  singleData: Type | null;
  onSubmit: (values: any) => void;
  isActive?: boolean;
}

const DrawerForm = ({ singleData, onSubmit }: FormProps) => {
  const initialValues = {
    name: singleData?.name || "",
    isActive: singleData?.isActive || true,
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={Yup.object({
        name: Yup.string().required("Name is required"),
      })}
      onSubmit={(values, { resetForm }) => {
        onSubmit(values);
        resetForm();
      }}
      enableReinitialize
    >
      {({ handleSubmit }) => (
        <Form onSubmit={handleSubmit} className="space-y-4">
          <TextInput name="name" label="Name" />

          <div className="flex justify-end">
            <UISubmitButton
              text={singleData ? "Update" : "Create"}
              onClick={handleSubmit}
            />
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default DrawerForm;
