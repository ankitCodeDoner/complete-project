import React from "react";

interface Props {
  title: string;
  className?: string;
}

const FormTitle: React.FC<Props> = ({ title, className = "" }) => {
  return (
    <div
      className={`sm:flex items-center justify-between border-b pb-2 ${className}`}
    >
      <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
    </div>
  );
};

export default FormTitle;
