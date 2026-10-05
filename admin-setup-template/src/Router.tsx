import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { AppEndPoints } from "./utils/rout-endpoints/AppEndPoints";
import Layout from "./pages/layouts/Layout";
import Login from "./pages/auth/Login";
import { Box, Typography } from "@mui/material";
import BlockIcon from "@mui/icons-material/Block";
import { UISubmitButton } from "./components/ui/buttons/CustomButton";
import { StaticRoutes } from "./utils/permission/StaticRoutes";
import { useUserRole } from "./hooks/useUserRole";
import { useEffect, type ReactElement } from "react";

const claimsList = [
  "Dashboard",
  "Settings",
  "Menus",
  "Products",
  "Categories",
  "Brands",
  "Banners",
  "BlogPosts",
  "HomeStats",
  "HomeFeatures",
  "ExportRegions",
  "AboutPage",
  "ContactPage",
  "Orders",
  "CustomerProfile",
  "CustomerNotifications",
];

const AuthGuard = () => {

  const token = localStorage.getItem("authToken");
  return token ? <Outlet /> : <Navigate to={AppEndPoints.LOGIN} replace />;
};

const AppRouter = () => {
  const { refetch, isLoading, decoded } = useUserRole();
  const queryEnabled = !!decoded?.Id;
  useEffect(() => {
    if (queryEnabled) {
      refetch();
    }
  }, [queryEnabled, refetch]);
  // Role-based claims (needs `roleData` from useUserRole and extractClaimList from permissionUtils):
  // const userClaims = extractClaimList(roleData?.[0]?.roleMenus || []) || claimsList;
  const userClaims =  claimsList;

  if (isLoading) return <p>Loading...</p>;
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path={AppEndPoints.LOGIN} element={<Login />} />
        {/* Protected Routes (Requires Auth) */}
        <Route element={<AuthGuard />}>
          {/* Main Layout Route */}
          <Route path={AppEndPoints.DASHBOARD} element={<Layout />}>
            {/* Dashboard Home */}
            {StaticRoutes.map(({ path, element, claim }) => (
              <Route
                key={claim}
                path={path}
                element={
                  <ProtectedRoute
                    claim={claim}
                    userClaims={userClaims}
                    element={element}
                  />
                }
              />
            ))}
          </Route>
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRouter;


interface ProtectedRouteProps {
  claim: string;
  userClaims: string[];
  element: ReactElement;
}

const ProtectedRoute = ({
  claim,
  userClaims,
  element,
}: ProtectedRouteProps) => {
  const location = useLocation();
  const hasAccess = userClaims.includes(claim);
  const navigate = useNavigate();

  if (!hasAccess) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="60vh"
        textAlign="center"
      >
        <BlockIcon sx={{ fontSize: 60, color: "error.main", mb: 2 }} />
        <Typography variant="h4" color="error" gutterBottom>
          Access Denied
        </Typography>
        <Typography variant="body1" mb={2}>
          You do not have permission to access this page:
        </Typography>
        <Typography variant="inherit" color="text.secondary" mb={3}>
          <strong>{location.pathname}</strong>
        </Typography>
        <UISubmitButton text=" Go to Dashboard" onClick={() => navigate("/")} />
      </Box>
    );
  }

  return element;
};


