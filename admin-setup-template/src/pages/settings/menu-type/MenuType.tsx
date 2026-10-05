import React, { useMemo, useState } from "react";
import DynamicDrawer from "../DynamicDrawer";
import { Box } from "@mui/material";
import {
  useCreateMenuTypeMutation,
  useDeleteMenuTypeMutation,
  useGetMenuTypeByIdQuery,
  useGetMenuTypeQuery,
  useUpdateMenuTypeMutation,
} from "../../../store/services/menu-type/menuTypeSlice";
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

export interface MenuTypeType {
  id?: number;
  name: string;
}

const MenuType = ({ label, state, toggleDrawer }: Props) => {
  const [id, setId] = useState<number | undefined>();

  // RTK Query Hooks
  const { data, refetch } = useGetMenuTypeQuery();
  const { data: singleData, refetch: refetchSingle } = useGetMenuTypeByIdQuery(
    id,
    { skip: !id }
  );

  // refetch data when id changes
  useRefetchOnIdChange(id, refetchSingle);

  // RTK Query Mutations
  const [createMenuType] = useCreateMenuTypeMutation();
  const [updateMenuType] = useUpdateMenuTypeMutation();
  const [deleteMenuType] = useDeleteMenuTypeMutation();

  // Handle Delete
  const handleDelete = async (id: number) => {
    try {
      await deleteMenuType(id).unwrap();
      toast.success("MenuType deleted successfully!");
      refetch();
    } catch (error) {
      toast.error("Failed to delete MenuType.");
      console.error("Error deleting MenuType:", error);
    }
  };

  // Handle Create or Update
  const handleSubmit = async (values: MenuTypeType) => {
    try {
      if (id) {
        await updateMenuType({ id, values }).unwrap();
        toast.success("MenuType updated successfully!");
      } else {
        await createMenuType(values).unwrap();
        toast.success("MenuType created successfully!");
      }
      setId(undefined);
      refetch();
    } catch (error) {
      toast.error("Failed to submit MenuType.");
      console.error("Error submitting MenuType:", error);
    }
  };
  const [search, setSearch] = useState("");
  const processedData: MenuTypeType[] = data?.data;

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

export default MenuType;
