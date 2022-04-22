import { Box } from "@mui/material";
import NProgress from "nprogress";
import { useEffect } from "react";

const LoadingScreen = () => {
  useEffect(() => {
    NProgress.start();

    return () => {
      NProgress.done();
    };
  }, []);

  return (
    <Box
      sx={{
        backgroundColor: "background.paper",
        minHeight: "100%",
      }}
    />
  );
};

export default LoadingScreen;
