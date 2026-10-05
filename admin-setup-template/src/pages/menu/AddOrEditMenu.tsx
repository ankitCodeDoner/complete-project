import { Form, Formik } from "formik";
import { Box } from "@mui/material";
import { UISubmitButton } from "../../components/ui/buttons/CustomButton";
import toast from "react-hot-toast";
import {
  useCreateMenuMutation,
  useGetMenuQuery,
  useUpdateMenuMutation,
} from "../../store/services/menu/menuSlice";
import { TextInput } from "../../components/forms/BasicTextFields";
import { SelectDropdown } from "../../components/forms/SelectDropdown";
import { useGetMenuTypeQuery } from "../../store/services/menu-type/menuTypeSlice";

export interface Menu {
  id: string;
  name: string;
  claimValue: string;
  menuTypeId: number;
  parentId: number;
}

interface Props {
  singleMenu?: Menu | null;
  onClose: () => void;
}

const AddOrEditMenu = ({ singleMenu, onClose }: Props) => {
  const { data: menuTypes } = useGetMenuTypeQuery();
  const { data: menus } = useGetMenuQuery();
  const [createMenu] = useCreateMenuMutation();
  const [updateMenu] = useUpdateMenuMutation();

  const initialValues = {
    name: singleMenu?.name || "",
    claimValue: singleMenu?.claimValue || "",
    menuTypeId: singleMenu?.menuTypeId || "",
    parentId: singleMenu?.parentId || "",
  };

  const handleSubmit = async (values: any, { setSubmitting }: any) => {
    console.log(1, values);
    try {
      const formData = new FormData();

      Object.entries(values).forEach(([key, value]) => {
        if (value !== null && value !== undefined && value !== "") {
          if (value instanceof Blob) {
            formData.append(key, value);
          } else if (typeof value === "object") {
            formData.append(key, JSON.stringify(value));
          } else {
            formData.append(key, String(value));
          }
        }
      });

      if (singleMenu?.id) {
        await updateMenu({
          id: Number(singleMenu?.id),
          values: formData,
        }).unwrap();
        toast.success("Menu updated successfully");
      } else {
        await createMenu(formData).unwrap();
        toast.success("Menu created successfully");
      }
      onClose();
      setSubmitting(false);
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something went wrong.");
      setSubmitting(false);
    }
  };
  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      onSubmit={handleSubmit}
    >
      {({ handleSubmit, isSubmitting, values, setFieldValue }) => {
        return (
          <Form onSubmit={handleSubmit}>
            <Box mb={2}>
              <TextInput name="name" label="Name" />
            </Box>

            <Box mb={2}>
              <TextInput name="claimValue" label="ClaimValue" />
            </Box>

            <Box mb={2}>
              <SelectDropdown
                label="Menu Types"
                value={values.menuTypeId}
                onChange={(e: any) =>
                  setFieldValue("menuTypeId", e.target.value)
                }
                options={menuTypes?.data}
              />
            </Box>
            <Box mb={2}>
              <SelectDropdown
                label="Parent"
                value={values.parentId}
                onChange={(e: any) => setFieldValue("parentId", e.target.value)}
                options={menus?.data}
              />
            </Box>
            <UISubmitButton
              text={singleMenu?.id ? "Update Menu" : "Create Menu"}
              disabled={isSubmitting}
            />
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddOrEditMenu;
