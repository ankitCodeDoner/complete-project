import React, { useMemo, useState } from "react";
import DynamicDrawer from "../DynamicDrawer";
import { Box } from "@mui/material";
import {
  useCreateUserTypeMutation,
  useDeleteUserTypeMutation,
  useGetUserTypeByIdQuery,
  useGetUserTypeQuery,
  useUpdateUserTypeMutation,
} from "../../../store/services/user-type/userTypeSlice";
import useRefetchOnIdChange from "../../../hooks/useRefetchOnIdChange";
import toast from "react-hot-toast";
import DrawerForm from "../master-crud/components/DrawerForm";
import { SearchMaster } from "../../../components/forms/Search";
import ListItem1X from "../master-crud/components/ListItem";

interface Props {
  state: boolean;
  toggleDrawer: () => void;
  label: string;
}

export interface UserTypeType {
  id?: number;
  name: string;
}

const UserType = ({ label, state, toggleDrawer }: Props) => {
  const [id, setId] = useState<number | undefined>();

  // RTK Query Hooks
  const { data, refetch } = useGetUserTypeQuery();
  const { data: singleData, refetch: refetchSingle } = useGetUserTypeByIdQuery(
    id,
    { skip: !id }
  );

  // refetch data when id changes
  useRefetchOnIdChange(id, refetchSingle);

  // RTK Query Mutations
  const [createUserType] = useCreateUserTypeMutation();
  const [updateUserType] = useUpdateUserTypeMutation();
  const [deleteUserType] = useDeleteUserTypeMutation();

  // Handle Delete
  const handleDelete = async (id: number) => {
    try {
      await deleteUserType(id).unwrap();
      toast.success("UserType deleted successfully!");
      refetch();
    } catch (error) {
      toast.error("Failed to delete UserType.");
      console.error("Error deleting UserType:", error);
    }
  };

  // Handle Create or Update
  const handleSubmit = async (values: UserTypeType) => {
    try {
      if (id) {
        await updateUserType({ id, values }).unwrap();
        toast.success("UserType updated successfully!");
      } else {
        await createUserType(values).unwrap();
        toast.success("UserType created successfully!");
      }
      setId(undefined);
      refetch();
    } catch (error) {
      toast.error("Failed to submit UserType.");
      console.error("Error submitting UserType:", error);
    }
  };
  const [search, setSearch] = useState("");
  const processedData: UserTypeType[] = data?.data;

  const filteredData = useMemo(() => {
    return processedData?.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, data]);
  return (
    <React.Fragment>
      <DynamicDrawer
        open={state}
        onClose={() => toggleDrawer()}
        onOpen={() => toggleDrawer()}
        width={550}
        label={label}
      >
        <Box sx={{ p: 2 }}>
          <DrawerForm
            singleData={id ? singleData?.data : null}
            onSubmit={handleSubmit}
          />

          <SearchMaster value={search} onChange={setSearch} />

          <ListItem1X
            data={filteredData}
            setId={setId}
            handleDelete={handleDelete}
          />
        </Box>
      </DynamicDrawer>
    </React.Fragment>
  );
};

export default UserType;
