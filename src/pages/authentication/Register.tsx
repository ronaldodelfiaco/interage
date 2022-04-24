import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  Card,
  Checkbox,
  Divider,
  FormControlLabel,
  FormHelperText,
} from "@mui/material";
import {
  SocialIconButton,
  StyledTextField,
  TextFieldWrapper,
} from "../../components/authentication/StyledComponents";
import FlexBox from "../../components/FlexBox";
import { H1, H3, Paragraph, Small } from "../../components/Typography";
import { useFormik } from "formik";
import useAuth from "../../hooks/useAuth";
import FacebookIcon from "../../icons/FacebookIcon";
import GoogleIcon from "../../icons/GoogleIcon";
import Link from "next/link";
import { FC, useState } from "react";
import toast from "react-hot-toast";
import * as Yup from "yup";

const Register: FC = () => {
  const { register } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const initialValues = {
    name: "",
    email: "",
    password: "",
    terms: true,
    submit: null,
  };
  // form field value validation schema
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Must be a valid email")
      .max(255)
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password should be of minimum 6 characters length")
      .required("Password is required"),
  });

  const { errors, values, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema,
      onSubmit: (values) => {
        setLoading(true);

        register(values.email, values.password, values.name)
          .then((response) => {
            setLoading(false);
            toast.success("You registered successfully");
          })
          .catch((error) => {
            setError(error.message);
            setLoading(false);
          });
      },
    });

  return (
    <FlexBox
      height="100vh"
      alignItems="center"
      flexDirection="column"
      justifyContent="center"
    >
      <Card sx={{ padding: 4, maxWidth: 600, marginTop: 4, boxShadow: 1 }}>
        <Box textAlign="center" mb={5}>
          <img src="/static/logo/logo.svg" width={50} alt="Uko Logo" />
          <H1 fontWeight={700}>Sign In to Uko</H1>
        </Box>

        <FlexBox justifyContent="space-between" flexWrap="wrap" my="1rem">
          <SocialIconButton
            // onClick={loginWithGoogle}
            startIcon={<GoogleIcon sx={{ mr: "0.5rem" }} />}
          >
            Sign up with Google
          </SocialIconButton>
          <SocialIconButton
            // onClick={loginWithFacebook}
            startIcon={<FacebookIcon sx={{ mr: "0.5rem" }} />}
          >
            Sign up with Facebook
          </SocialIconButton>

          <Divider sx={{ my: 3, width: "100%", alignItems: "flex-start" }}>
            <H3 color="text.disabled" px={1}>
              Or
            </H3>
          </Divider>

          <form noValidate onSubmit={handleSubmit} style={{ width: "100%" }}>
            <FlexBox justifyContent="space-between" flexWrap="wrap">
              <TextFieldWrapper>
                <Paragraph fontWeight={600} mb={1}>
                  Name
                </Paragraph>
                <StyledTextField
                  fullWidth
                  name="name"
                  type="text"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.name || ""}
                  error={Boolean(touched.name && errors.name)}
                  helperText={touched.name && errors.name}
                />
              </TextFieldWrapper>

              <TextFieldWrapper>
                <Paragraph fontWeight={600} mb={1}>
                  Email
                </Paragraph>
                <StyledTextField
                  fullWidth
                  name="email"
                  type="email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.email || ""}
                  error={Boolean(touched.email && errors.email)}
                  helperText={touched.email && errors.email}
                />
              </TextFieldWrapper>
            </FlexBox>

            <TextFieldWrapper sx={{ mt: 2, width: "100%" }}>
              <Paragraph fontWeight={600} mb={1}>
                Password
              </Paragraph>
              <StyledTextField
                fullWidth
                name="password"
                type="password"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password || ""}
                error={Boolean(touched.password && errors.password)}
                helperText={touched.password && errors.password}
              />
            </TextFieldWrapper>

            <FormControlLabel
              control={
                <Checkbox
                  disableRipple
                  checked={values.terms}
                  onChange={handleChange}
                  name="terms"
                />
              }
              label="I agree to terms & conditions"
              sx={{
                marginTop: "0.5rem",
                "& .MuiTypography-root": { fontWeight: 600 },
              }}
            />

            {error && (
              <FormHelperText
                error
                sx={{
                  mt: 2,
                  fontSize: 13,
                  fontWeight: 500,
                  textAlign: "center",
                }}
              >
                {error}
              </FormHelperText>
            )}

            <Box sx={{ mt: 4 }}>
              {loading ? (
                <LoadingButton loading fullWidth variant="contained">
                  Sign Up
                </LoadingButton>
              ) : (
                <Button fullWidth type="submit" variant="contained">
                  Sign Up
                </Button>
              )}
            </Box>
          </form>

          <Small margin="auto" mt={3} color="text.disabled">
            Do you already have an account?{" "}
            <Link href="/authentication/Login">
              <a style={{ color: "#61A9FF" }}>Log in</a>
            </Link>
          </Small>
        </FlexBox>
      </Card>
    </FlexBox>
  );
};

export default Register;