import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Container,
  Box,
  Typography,
  Paper,
} from "@mui/material";
import { AppEndPoints } from "../../utils/rout-endpoints/AppEndPoints";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useLoginUserMutation } from "../../store/services/auth/authSlice";
import { getErrorMessage } from "../../utils/helper";
import { UISubmitButton } from "../../components/ui/buttons/CustomButton";
import FormikTextField from "../../components/forms/FormikTextField";

const Login = () => {
  const navigate = useNavigate();
  const [loginUser, { isLoading, error }] = useLoginUserMutation();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      navigate(AppEndPoints.DASHBOARD, { replace: true });
    }
  }, [navigate]);

  // Form Validation Schema
  const validationSchema = Yup.object({
    code: Yup.string()
      .required("Email or phone number is required")
      .test(
        "is-email-or-phone",
        "Enter a valid email or phone number",
        (value) =>
          !!value &&
          (/^\S+@\S+\.\S+$/.test(value) || /^[\d+]{7,15}$/.test(value))
      ),
    password: Yup.string()
      .min(6, "Must be at least 6 characters")
      .required("Password is required"),
  });


  const handleLogin = async (
    values: { code: string; password: string },
    { setSubmitting }: any
  ) => {
    try {
      console.log(" Form submitted with values: ", values);
      const response = await loginUser(values).unwrap();
      console.log("Login successful:", response);
      localStorage.setItem("authToken", response.token);

      navigate(AppEndPoints.DASHBOARD);
      window.location.reload();
    } catch (err) {
      console.error("Login failed:", err);
    }
    setSubmitting(false);
  };
  return (
    <Container component="main" maxWidth="sm">
      <Box display="flex" flexDirection="column" alignItems="center" mt={8}>
        <Paper
          elevation={3}
          sx={{ p: 4, mt: 3, width: "100%", borderRadius: 2 }}
        >
          <Typography component="h2" variant="h6" gutterBottom mt={3}>
            Sign in to your account
          </Typography>

          {/* Formik Form */}
          <Formik
            initialValues={{ code: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
              console.log("Form submitted");
              handleLogin(values, { setSubmitting });
            }}
          >
            {({ isSubmitting, handleSubmit }) => (
              <Form>
                <FormikTextField
                  name="code"
                  label="Email"
                  placeholder="Enter your email"
                  type="text"
                />

                <FormikTextField
                  name="password"
                  label="Password"
                  placeholder="••••••••"
                  type="password"
                />

                <Box
                  display="flex"
                  justifyContent="end"
                  alignItems="center"
                  mt={1}
                >
                  <Typography variant="body1">
                    <Link
                      to={AppEndPoints.FORGOT_PASSWORD}
                      className="font-medium text-blue-600 hover:underline"
                    >
                      Forgot password?
                    </Link>
                  </Typography>
                </Box>

                {error && (
                  <Typography color="error" variant="body2" mt={1}>
                    {getErrorMessage(error)}
                  </Typography>
                )}

                <Box mt={2} mb={2}>
                  <UISubmitButton
                    width="w-full"
                    onClick={handleSubmit}
                    text={
                      isSubmitting || isLoading ? "Signing In..." : "Sign In"
                    }
                    disabled={isSubmitting || isLoading}
                  />
                </Box>
              </Form>
            )}
          </Formik>
        </Paper>
      </Box>
    </Container>
  );
};

export default Login;
