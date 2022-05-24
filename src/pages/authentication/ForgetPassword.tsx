import { LoadingButton } from '@mui/lab';
import { Box, Button, Card, FormHelperText } from '@mui/material';
import { useFormik } from 'formik';
import Image from 'next/image';
import Link from 'next/link';
import { FC, useState } from 'react';
import toast from 'react-hot-toast';
import * as Yup from 'yup';
import FlexBox from '../../components/FlexBox';
import LightTextField from '../../components/LightTextField';
import { H1, Small } from '../../components/Typography';

const ForgetPassword: FC = () => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const initialValues = {
    email: 'demo@example.com',
    submit: null,
  };
  // form field value validation schema
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Must be a valid email')
      .max(255)
      .required('Email is required'),
  });

  const { errors, values, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema,
      onSubmit: (values) => {
        setLoading(true);

        setTimeout(() => {
          setLoading(false);
          toast.success('Reset link has been sent!');
        }, 1000);

        if (error) {
          setError('Error!');
          setLoading(false);
        }
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
        <FlexBox
          alignItems="center"
          flexDirection="column"
          justifyContent="center"
          mb={5}
        >
          <Box width={38} mb={1}>
            <Image src="/favicon.png" width="100%" height="100%" alt="Logo" />{' '}
          </Box>
          <H1 fontSize={24} fontWeight={700}>
            Esqueceu a senha?
          </H1>
        </FlexBox>

        <FlexBox justifyContent="space-between" flexWrap="wrap" my={2}>
          <form noValidate onSubmit={handleSubmit} style={{ width: '100%' }}>
            <LightTextField
              fullWidth
              name="email"
              type="email"
              label="Email"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email || ''}
              error={Boolean(touched.email && errors.email)}
              helperText={touched.email && errors.email}
            />

            {error && (
              <FormHelperText
                error
                sx={{
                  mt: 2,
                  fontSize: 13,
                  fontWeight: 500,
                  textAlign: 'center',
                }}
              >
                {error}
              </FormHelperText>
            )}

            <Box sx={{ mt: 4 }}>
              {loading ? (
                <LoadingButton loading fullWidth variant="contained">
                  Trocar
                </LoadingButton>
              ) : (
                <Button fullWidth type="submit" variant="contained">
                  Trocar
                </Button>
              )}
            </Box>
          </form>

          {/* <Small margin="auto" mt={3} color="text.disabled">
            Não possui uma conta?{' '}
            <Link href="/register">
              <Small color="primary.main">Create an account</Small>
            </Link>
          </Small> */}
        </FlexBox>
      </Card>
    </FlexBox>
  );
};

export default ForgetPassword;
