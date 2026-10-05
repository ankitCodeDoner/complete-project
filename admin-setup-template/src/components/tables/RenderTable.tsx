import React from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  useTheme,
} from "@mui/material";

export interface TableColumn {
  label: string | React.ReactNode;
}

interface Props {
  columns: TableColumn[];
  children: React.ReactNode;
}

const RenderTable: React.FC<Props> = ({ columns, children }) => {
  const theme = useTheme();

  return (
    <Box
      padding={2.5}
      borderRadius={2}
      bgcolor="background.paper"
      boxShadow="rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px"
    >
      <Box sx={{ width: "100%", overflowX: "auto" }}>
        <Table stickyHeader size="small" aria-label="data table">
          <TableHead
            sx={{
              "& .MuiTableCell-root": {
                backgroundColor: theme.palette.primary.main,
                p: 2.1,
              },
            }}
          >
            <TableRow>
              {columns.map((col, index) => (
                <TableCell
                  key={index}
                  component="th"
                  scope="col"
                  sx={{
                    color: theme.palette.common.white,
                    fontWeight: "500",
                    textTransform: "uppercase",
                    fontSize: "0.875rem",
                    whiteSpace: "nowrap",
                  }}
                  className={`p-4 text-start ${
                    index === 0 ? "rounded-l-md" : ""
                  } ${index === columns.length - 1 ? "rounded-r-md" : ""}`}
                >
                  {col.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>{children}</TableBody>
        </Table>
      </Box>
    </Box>
  );
};

export default RenderTable;
