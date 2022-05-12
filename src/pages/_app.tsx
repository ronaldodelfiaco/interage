import { LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { Card, CssBaseline, ThemeProvider } from '@mui/material';
import { StyledEngineProvider } from '@mui/material/styles';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Toaster } from 'react-hot-toast';
import AuthGuard from '../components/authentication/AuthGuard';
import DashboardLayout from '../components/Layouts/DashboardLayout';
import RTL from '../components/RTL';
import { AuthProvider } from '../contexts/AuthContext';
import SettingsProvider from '../contexts/SettingsContext';
import TitleContextProvider from '../contexts/TitleContext';
import useSettings from '../hooks/useSettings';
import '../styles/globals.css';
import styles from '../styles/Home.module.css';
import { ukoTheme } from '../theme';

function InterageApp({ Component, pageProps }: AppProps) {
  const { settings } = useSettings();
  // Configuração do tema
  const appTheme = ukoTheme({
    theme: settings.theme,
    direction: settings.direction,
    responsiveFontSizes: settings.responsiveFontSizes,
  });

  // Configuração das notificações no react
  const toasterOptions = {
    style: {
      fontWeight: 500,
      fontFamily: "'Montserrat', sans-serif",
    },
  };

  // useEffect(() => {
  // {
  // router.push('/Eventos')
  // }
  // }, [])

  return (
    <Card>
      <Head>
        <title>Interage</title>
        <link rel="shortcut icon" href="/rcisistemas.png" type="image/x-icon" />
      </Head>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <AuthProvider>
          <SettingsProvider>
            <TitleContextProvider>
              <StyledEngineProvider>
                <ThemeProvider theme={appTheme}>
                  <RTL direction={appTheme.direction}>
                    <AuthGuard>
                      <DashboardLayout>
                        <CssBaseline />
                        <Toaster toastOptions={toasterOptions} />
                        <Component {...pageProps} />
                      </DashboardLayout>
                    </AuthGuard>
                  </RTL>
                </ThemeProvider>
              </StyledEngineProvider>
            </TitleContextProvider>
          </SettingsProvider>
        </AuthProvider>
      </LocalizationProvider>
      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by RCI SISTEMAS
          <span className={styles.logo}>
            {/*
        <Image src="/rcisistemas.png" alt="Vercel Logo" width={100} height={100} /> */}
          </span>
        </a>
      </footer>
    </Card>
  );
}

export default InterageApp;
