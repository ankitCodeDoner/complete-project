import React from "react";
import { Field, FieldArray, ErrorMessage, useFormikContext } from "formik";
import { FaPlus } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

interface DynamicFieldArrayProps {
  col?: number;
  name: string;
  label: string;
  type: "text" | "file";
  pushInitialValue: any;
}

const DynamicFieldArray: React.FC<DynamicFieldArrayProps> = ({
  col = 6,
  name,
  label,
  type,
  pushInitialValue,
}) => {
  const { values, setFieldValue } = useFormikContext<any>();
  return (
    <FieldArray name={name}>
      {({ push, remove }) => (
        <div className={`w-full md:col-span-${col}`}>
          <div className="flex justify-between items-center mb-2 relative">
            <label className="font-medium text-sm">{label}</label>
            <FaPlus
              onClick={() => push(pushInitialValue)}
              className="text-indigo-600 hover:text-indigo-800 cursor-pointer absolute top-0 right-0"
            />
          </div>

          {values[name]?.map((item: any, index: number) => (
            <div
              key={index}
              className="flex items-center gap-3 mb-3 bg-white border border-gray-300 rounded px-3 py-2"
            >
              {type === "file" ? (
                <input
                  type="file"
                  className="w-full border rounded px-2 py-1 text-sm"
                  name={`${name}[${index}].file`}
                  onChange={(event) =>
                    setFieldValue(
                      `${name}[${index}].file`,
                      event.currentTarget.files?.[0]
                    )
                  }
                />
              ) : (
                <Field
                  type="text"
                  name={`${name}[${index}]`}
                  className="w-full border rounded px-2 py-1 text-sm"
                />
              )}

              <MdDeleteForever
                onClick={() => {
                  remove(index);
                  if (type === "file") {
                    console.log("Deleting item:", item);
                    if (item?.id) {
                      console.log(item?.id, "documentsToDelete");
                      setFieldValue(
                        "documentsToDelete",
                        [...(values?.documentsToDelete ?? []), item.id],
                        false
                      );
                    }
                  }

                  if (type === "text") {
                    if (item?.id) {
                      console.log(item?.id, "videoToDelete");
                      setFieldValue(
                        "videoToDelete",
                        [...(values?.videoToDelete ?? []), item.id],
                        false
                      );
                    }
                  }
                }}
                className="text-red-500 hover:text-red-700 cursor-pointer"
                size={22}
              />
            </div>
          ))}

          <ErrorMessage
            name={name}
            component="div"
            className="text-red-500 text-sm"
          />
        </div>
      )}
    </FieldArray>
  );
};

export default DynamicFieldArray;
