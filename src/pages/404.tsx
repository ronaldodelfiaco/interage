import { Box, useTheme } from "@mui/material";
import FlexBox from "../components/FlexBox";
import { H1, Paragraph } from "../components/Typography";
import Link from "next/link";
import { FC } from "react";
import Image from 'next/image'

const ErrorPage: FC = () => {
  const theme = useTheme();

  return (
    <FlexBox
      p={4}
      height="100%"
      alignItems="center"
      flexDirection="column"
      justifyContent="center"
    >
      <Box maxWidth={350}>
        <Image
          src="/static/illustration/error-page.svg"
          width={100}
          height={100}
          alt="Error 404"
        />
      </Box>
      <H1 fontSize={64} fontWeight={700} color="primary.main" mt={3}>
        Ooops... 404!
      </H1>
      <Paragraph color="text.disabled" fontWeight="500">
            A página solicitada não pôde ser encontrada.
      </Paragraph>

      <Link href="/">
        <a
          style={{
            display: "block",
            marginTop: "1.5rem",
            fontWeight: 600,
            textDecoration: "underline",
            color: theme.palette.primary.main,
          }}
        >
          Retorna para página principal 
        </a>
      </Link>
    </FlexBox>
  );
};

export default ErrorPage;
