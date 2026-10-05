import { Box } from "@mui/material";

interface Props {
  children: React.ReactNode;
}

const SectionBox = ({ children }: Props) => {
  return (
    <Box
      padding="20px"
      borderRadius="8px"
      bgcolor="white"
      overflow="auto"
      sx={{
        boxShadow: `rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px`,
      }}
    >
      {children}
    </Box>
  );
};

export default SectionBox;
