import { FaPenToSquare } from "react-icons/fa6";
import RenderTable from "../../../../components/tables/RenderTable";
import { IconButton } from "../../../../components/ui/buttons/IconButton";
import { FaTrashAlt } from "react-icons/fa";

interface Column {
  label: string;
  key: string;
}

interface Props {
  data: any[];
  columns?: Column[];
  setId: (id: number) => void;
  handleDelete: (id: number) => void;
}
const getValueByPath = (obj: any, path: string): any => {
  return path.split(".").reduce((acc, key) => acc?.[key], obj);
};

const ListItem1X = ({ data, columns, setId, handleDelete }: Props) => {
  return (
    <div className="mt-4">
      <RenderTable
        columns={[
          { label: "Sr.No" },
          { label: "Name" },
          ...(columns || []),
          { label: "Actions" },
        ]}
      >
        {data?.map((item, index) => (
          <tr key={item.id} className="border-t">
            <td className="px-4 py-2">{index + 1}</td>
            <td className="px-4 py-2">{item.name}</td>

            {columns?.map((col, i) => (
              <td key={i} className="px-4 py-2">
                {getValueByPath(item, col.key) ?? "-"}
              </td>
            ))}

            <td className="px-4 py-2 flex space-x-2">
              <IconButton
                tooltip="Edit"
                icon={<FaPenToSquare size={16} />}
                iconColor="WHITE"
                bgColor="GREEN"
                onClick={() => setId(item.id)}
              />
              <IconButton
                tooltip="Delete"
                icon={<FaTrashAlt size={16} />}
                iconColor="WHITE"
                onClick={() => handleDelete(item.id)}
              />
            </td>
          </tr>
        ))}
      </RenderTable>
    </div>
  );
};

export default ListItem1X;
