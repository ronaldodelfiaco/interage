import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  ButtonBase,
  Card,
  Divider,
  FormControlLabel,
  FormHelperText,
  Switch,
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
import { useRouter } from 'next/router';
import Image from 'next/image';

const Login: FC = () => {
  const navigate = useRouter();
  const { login,  loginWithFacebook, loginWithGoogle } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const initialValues = {
    email: "jason@ui-lib.com",
    password: "123456",
    submit: null,
    remember: true,
  };
  // form field value validation schema
  const validationSchema = Yup.object().shape({
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
        login(values.email, values.password)
          .then(() => {
            setLoading(false);
            toast.success("You Logged In Successfully");
            navigate.push('/pessoas');
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
          <Image src="/favicon.png" width="100%" height="100%" alt="Logo"  />
          <H1 fontWeight={700}>Sign In to Uko</H1>
        </Box>

        <FlexBox justifyContent="space-between" flexWrap="wrap" my="1rem">
          <SocialIconButton
             onClick={loginWithGoogle}
            startIcon={<GoogleIcon sx={{ mr: "0.5rem" }} />}
          >
            Sign in with Google
          </SocialIconButton>
          <SocialIconButton
           // onClick={loginWithFacebook}
            startIcon={<FacebookIcon sx={{ mr: "0.5rem" }} />}
          >
            Sign in with Facebook
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

              <TextFieldWrapper>
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
            </FlexBox>

            <FlexBox mt={2} alignItems="center" justifyContent="space-between">
              <FormControlLabel
                control={
                  <Switch
                    name="remember"
                    checked={values.remember}
                    onChange={handleChange}
                  />
                }
                label="Remember Me"
                sx={{
                  "& .MuiTypography-root": { fontWeight: 600 },
                }}
              />
              <ButtonBase disableRipple>
                <Small color="secondary.red">Forgot Password?</Small>
              </ButtonBase>
            </FlexBox>

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
                  Sign In
                </LoadingButton>
              ) : (
                <Button fullWidth type="submit" variant="contained">
                  Sign In
                </Button>
              )}
            </Box>
          </form>

          <Small margin="auto" mt={3} color="text.disabled">
            Don&apos;t have an account?{" "}
            <Link href="/authentication/Register">
              <a style={{ color: "#61A9FF" }}>Create an account</a>
            </Link>
          </Small>
        </FlexBox>
      </Card>
    </FlexBox>
  );
};

export default Login;