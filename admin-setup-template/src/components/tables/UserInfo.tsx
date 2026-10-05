import { Avatar, Stack, Typography } from "@mui/material";

interface UserInfoProps {
  profileImage?: string;
  firstName?: string;
  empName: string;
  phoneNumber: string;
  email: string;
}

const UserInfo = ({
  profileImage,
  firstName,
  empName,
  phoneNumber,
  email,
}: UserInfoProps) => {
  return (
    <Stack direction="row" spacing={2} alignItems="center">
      <Avatar sx={{ width: 56, height: 56 }} src={profileImage || ""}>
        {firstName?.charAt(0) || "U"}
      </Avatar>
      <Stack spacing={0.3}>
        <Typography variant="subtitle2" fontWeight={600}>
          {empName}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Phone: {phoneNumber}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Email: {email}
        </Typography>
      </Stack>
    </Stack>
  );
};

export default UserInfo;
