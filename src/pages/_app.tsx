import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";

import Link from 'next/link'
import TitleContextProvider from '../contexts/TitleContext';
import { AuthProvider } from '../contexts/FirebaseAuthContext';
import SettingsProvider from '../contexts/SettingsContext'
import { StyledEngineProvider } from '@mui/material'
import { ukoTheme } from '../theme'
import useSettings from '../hooks/useSettings'
import { useEffect } from 'react'
import router from 'next/router'


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
  //    {
  //     router.push('/Eventos')
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [])



  return (

<> 
 <Head>
        <title>Interage</title>
        <link rel="shortcut icon" href="/rcisistemas.png" type="image/x-icon" />
      </Head>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
      <AuthProvider>
      <SettingsProvider>
      <TitleContextProvider>
      <StyledEngineProvider injectFirst>
  

      <Component {...pageProps} />



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
          Powered by{' '} RCI SISTEMAS
          <span className={styles.logo}>
            {/* <Image src="/rcisistemas.png" alt="Vercel Logo" width={100} height={100} /> */}
          </span>
        </a>
      </footer>
      
      </>
  )
}

export default InterageApp
