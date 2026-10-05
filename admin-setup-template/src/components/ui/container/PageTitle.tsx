import { Box, Breadcrumbs, Link, Typography, useTheme } from "@mui/material";
import { APP_TEXT } from "../../../utils/DefaultAppText.utils";
import { FaHome } from "react-icons/fa";
import { IoArrowBackCircle } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const PageTitle = ({ title }: { title: string }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        p: 2,
        borderRadius: 2,
        boxShadow: 2,
        backgroundColor: "white",
        mb: 2,
      }}
    >
      <Typography
        variant="h6"
        color={theme.palette.primary.main}
        className="flex items-center gap-2"
      >
        {title !== "Dashboard" && (
          <IoArrowBackCircle
            className="cursor-pointer"
            aria-label="breadcrumb"
            color={theme.palette.primary.main}
            size={25}
            onClick={() => navigate(-1)}
          />
        )}
        {title}
      </Typography>
      {title !== "Dashboard" && (
        <Breadcrumbs
          aria-label="breadcrumb"
          color={theme.palette.primary.main}
          separator="›"
          sx={{ fontSize: "12px", paddingLeft: "7px" }}
        >
          <Link
            underline="none"
            color="inherit"
            href="/"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <FaHome />
            {APP_TEXT.sidebar.DASHBOARD}
          </Link>
          <Typography sx={{ fontSize: "12px" }}>{title}</Typography>
        </Breadcrumbs>
      )}
    </Box>
  );
};

export default PageTitle;
