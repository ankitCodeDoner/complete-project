import FormTitle from "./FormTitle";
import { Box } from "@mui/material";

const BoxTitle = ({
  title,
  children,
  className,
}: {
  title: string;
  children: any;
  className?: string;
}) => {
  return (
    <Box className={`p-4 border rounded-lg ${className}`}>
      <FormTitle title={title} />
      {children}
    </Box>
  );
};

export default BoxTitle;
