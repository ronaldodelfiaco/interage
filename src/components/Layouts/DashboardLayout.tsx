import { Box, styled } from "@mui/material";
import { FC, Fragment, useState } from "react";
import DashboardNavbar from "./DashboardNavbar";
import DashboardSidebar from "./DashboardSideBar";

// styled components
const Wrapper = styled(Box)<{ show?: boolean }>(({ theme, show }) => ({
  paddingLeft: "3rem",
  paddingRight: "3rem",
  transition: "0.4s ease",
  marginLeft: show ? 80 : 0,
  [theme.breakpoints.down("md")]: {
    marginLeft: 0,
    paddingLeft: "2rem",
    paddingRight: "2rem",
  },
}));

const InnerWrapper = styled(Box)(({ theme }) => ({
  [theme.breakpoints.up("lg")]: {
    maxWidth: 1200,
    margin: "auto",
  },
}));
interface DashboardLayoutProps {
    children?: React.ReactNode;
  }

const DashboardLayout:  FC<DashboardLayoutProps>  = ({ children }) => {
  const [showSideBar, setShowSideBar] = useState(true);
  const [showMobileSideBar, setShowMobileSideBar] = useState(false);

  return (
    <Fragment>
      <DashboardSidebar
        showSideBar={showSideBar}
        showMobileSideBar={showMobileSideBar}
        closeMobileSideBar={() => setShowMobileSideBar(false)}
      />

      <Wrapper show={showSideBar}>
        <InnerWrapper>
          <DashboardNavbar
            setShowSideBar={() => setShowSideBar((state) => !state)}
            setShowMobileSideBar={() => setShowMobileSideBar((state) => !state)}
          />
          {children}
        </InnerWrapper>
      </Wrapper>
    </Fragment>
  );
};

export default DashboardLayout;