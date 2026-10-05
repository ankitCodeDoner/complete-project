import React, { useMemo, useState } from "react";
import DrawerForm from "./components/DrawerForm";
import ListItem from "./components/ListItem";
import { SearchMaster } from "../../../components/forms/Search";

interface Type {
  id?: number;
  name: string;
  icon: string;
  isActive: boolean;
}
interface Type1 {
  id?: number;
  name: string;
  IconId: string;
  isActive: boolean;
}
interface Props {
  id: number | undefined;
  data: any[];
  setId: (id: number) => void;
  singleData: Type;
  onSubmit: (data: Type1) => void;
  handleDelete: (id: number) => void;
}

const MasterCrud = ({
  id,
  data,
  setId,
  singleData,
  onSubmit,
  handleDelete,
}: Props) => {
  const [search, setSearch] = useState("");

  const filteredData = useMemo(() => {
    return data?.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, data]);
  return (
    <React.Fragment>
      <DrawerForm
        singleData={id ? singleData : null}
        onSubmit={onSubmit}
        isActive={data?.some((item) => item.isActive)}
      />
      <SearchMaster value={search} onChange={setSearch} />

      <ListItem data={filteredData} setId={setId} handleDelete={handleDelete} />
    </React.Fragment>
  );
};

export default MasterCrud;
