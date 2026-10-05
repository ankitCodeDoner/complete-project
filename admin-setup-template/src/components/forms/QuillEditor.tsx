import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

interface QuillEditorProps {
  col?: number;
  label: string;
  h?: number;
  name: string;
  value: string;
  onChange: (field: string, value: string) => void;
  error?: any;
  touched?: any;
}

export const QuillEditor: React.FC<QuillEditorProps> = ({
  col = 4,
  label,
  h = 100,
  name,
  value,
  onChange,
  error,
  touched,
}) => {
  const widthClass =
    col === 12
      ? "w-full"
      : col === 6
      ? "w-1/2"
      : col === 4
      ? "w-1/3"
      : "w-auto";

  const editorClass = `custom-quill-${name}`;

  return (
    <div className={`${widthClass} mb-4`}>
      <label style={{ fontWeight: 500, display: "block", marginBottom: 8 }}>
        {label}
      </label>
      <div
        className={`${editorClass} bg-white border border-gray-300 rounded-md`}
      >
        <ReactQuill
          theme="snow"
          value={value}
          onChange={(val) => onChange(name, val)}
        />
      </div>
      {error && touched && <p className="mt-1 text-sm text-red-600">{error}</p>}

      <style>
        {`
          .${editorClass} .ql-editor {
            min-height: ${h}px;
            max-height: 400px;
            overflow-y: auto;
          }
        `}
      </style>
    </div>
  );
};
