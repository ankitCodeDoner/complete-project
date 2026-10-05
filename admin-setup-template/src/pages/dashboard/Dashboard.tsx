import { Box, Typography } from "@mui/material";
import LaptopMacIcon from "@mui/icons-material/LaptopMac";
import GroupIcon from "@mui/icons-material/Group";
import SchoolIcon from "@mui/icons-material/School";
import TimerIcon from "@mui/icons-material/Timer";

const stats = [
  {
    value: "1958",
    label: "Completed Courses",
    icon: <LaptopMacIcon />,
    bgColor: "#fef3c7", // amber-100
    iconColor: "#fbbf24", // amber-400
  },
  {
    value: "1600",
    label: "Enrolled Courses",
    icon: <GroupIcon />,
    bgColor: "#ede9fe", // violet-100
    iconColor: "#7c3aed", // violet-600
  },
  {
    value: "1235",
    label: "Course In Progress",
    icon: <SchoolIcon />,
    bgColor: "#e0e7ff", // indigo-100
    iconColor: "#4338ca", // indigo-700
  },
  {
    value: "845 hrs",
    label: "Total Watch Time",
    icon: <TimerIcon />,
    bgColor: "#dcfce7", // green-100
    iconColor: "#22c55e", // green-500
  },
];

export default function Dashboard() {
  return (
    <Box sx={{ p: 4, display: "flex", gap: 4 }}>
      {stats.map(({ value, label, icon, bgColor, iconColor }) => (
        <Box
          key={label}
          sx={{
            flex: 1,
            bgcolor: bgColor,
            p: 3,
            borderRadius: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box>
            <Typography variant="h4" fontWeight="bold">
              {value}
            </Typography>
            <Typography variant="body1">{label}</Typography>
          </Box>
          <Box
            sx={{
              bgcolor: iconColor,
              borderRadius: "50%",
              width: 56,
              height: 56,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
            }}
          >
            {icon}
          </Box>
        </Box>
      ))}
    </Box>
  );
}
