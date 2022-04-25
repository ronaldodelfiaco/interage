import { LoadingButton } from '@mui/lab';
import { Box, Button, Card, FormHelperText } from '@mui/material';
import { TextFieldWrapper } from '../../components/authentication/StyledComponents';
import FlexBox from '../../components/FlexBox';
import LightTextField from '../../components/LightTextField';
import { H1, Paragraph, Small } from '../../components/Typography';
import { useFormik } from 'formik';
import useAuth from '../../hooks/useAuth';

import Image from 'next/image';
import Link from 'next/link';
import { FC, useState } from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';
import * as Yup from 'yup';

const Login: FC = () => {
  const navigate = useRouter();
  const { login } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const initialValues = {
    email: '',
    password: '',
    submit: null,
    remember: true,
  };
  // form field value validation schema
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      // .email("Precisa digitar um email valido")
      .max(255)
      .required('Este campo e obrigatorio'),
    password: Yup.string()
      // .min(6, "A senha precisa no minimo de 6 caracteres")
      .required('A senha e obrigatoria'),
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
            toast.success('Login efetuado com sucesso');
            navigate.push('/pessoas');
          })
          .catch((error) => {
            /* setError(error.message); */
            toast.error('Login errado');
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
      <Card sx={{ padding: 4, maxWidth: 600, boxShadow: 1 }}>
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
            ENTRAR
          </H1>
        </FlexBox>

        <FlexBox justifyContent="space-between" flexWrap="wrap" my="1rem">
          <form noValidate onSubmit={handleSubmit} style={{ width: '100%' }}>
            <FlexBox justifyContent="space-between" flexWrap="wrap">
              <TextFieldWrapper>
                <Paragraph fontWeight={600} mb={1}>
                  Login
                </Paragraph>
                <LightTextField
                  fullWidth
                  name="email"
                  type="email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.email || ''}
                  error={Boolean(touched.email && errors.email)}
                  helperText={touched.email && errors.email}
                />
              </TextFieldWrapper>

              <TextFieldWrapper>
                <Paragraph fontWeight={600} mb={1}>
                  Senha
                </Paragraph>
                <LightTextField
                  fullWidth
                  name="password"
                  type="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.password || ''}
                  error={Boolean(touched.password && errors.password)}
                  helperText={touched.password && errors.password}
                />
              </TextFieldWrapper>
            </FlexBox>

            {/* <FlexBox mt={2} alignItems="center" justifyContent="space-between">
              <Link href="/authentication/ForgetPassword" passHref>
                <Small color="secondary.red">
                   <a>Esqueceu a senha? </a>
                   </Small>
              </Link>
            </FlexBox> */}

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
                  Entrar
                </LoadingButton>
              ) : (
                <Button fullWidth type="submit" variant="contained">
                  Entrar
                </Button>
              )}
            </Box>
          </form>
        </FlexBox>
      </Card>
    </FlexBox>
  );
};

export default Login;
