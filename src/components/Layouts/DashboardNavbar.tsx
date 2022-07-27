import { Brightness4 } from "@mui/icons-material";
import {
  AppBar,
  Box,
  IconButton,
  styled,
  Theme,
  Toolbar,
  useMediaQuery,
} from "@mui/material";
import { H2 } from "../../components/Typography";
import { SettingsContext } from "../../contexts/SettingsContext";
import { TitleContext } from "../../contexts/TitleContext";
import LTR from "../../icons/LTR";
import RtlIcon from "../../icons/RTL";
import ThemeIcon from "../../icons/ThemeIcon";
import ToggleIcon from "../../icons/ToggleIcon";
import { FC, useContext } from "react";
import { themeSettingsProps } from "../../theme";
import { THEMES } from "../../constants";
import ActivityPopover from "./popovers/ActivityPopover";
import LanguagePopover from "./popovers/LanguagePopover";
import NotificationsPopover from "./popovers/NotificationsPopover";
import ProfilePopover from "./popovers/ProfilePopover";
import ServicePopover from "./popovers/ServicePopover";

// root component interface
interface DashboardNavBarProps {
  setShowSideBar: () => void;
  setShowMobileSideBar: () => void;
}

// custom styled components
const DashboardNavbarRoot = styled(AppBar)(() => ({
  zIndex: 11,
  boxShadow: "none",
  paddingTop: "1rem",
  paddingBottom: "1rem",
  backdropFilter: "blur(6px)",
  backgroundColor: "transparent",
}));

const StyledToolBar = styled(Toolbar)(() => ({
  "@media (min-width: 0px)": {
    paddingLeft: 0,
    paddingRight: 0,
    minHeight: "auto",
  },
}));

const StyledIconButton = styled(IconButton)(() => ({
  "&:hover": { backgroundColor: "transparent" },
}));

// root component
const DashboardNavbar: FC<DashboardNavBarProps> = (props) => {
  const { setShowSideBar, setShowMobileSideBar } = props;

  const { title } = useContext(TitleContext);
  const { settings, saveSettings } = useContext(SettingsContext);
  const downMd = useMediaQuery((theme: Theme) => theme.breakpoints.down("md"));
  const upSm = useMediaQuery((theme: Theme) => theme.breakpoints.up("sm"));

  const handleChangeTheme = (theme: string) => {
    saveSettings({ ...settings, theme } as themeSettingsProps);
  };

  const handleChangeDirection = (direction: string) => {
    saveSettings({ ...settings, direction } as themeSettingsProps);
  };

  return (
    <DashboardNavbarRoot position="sticky">
      <StyledToolBar>
        <StyledIconButton
          disableRipple
          sx={{ pl: 0, transition: "left 0.4s ease" }}
          onClick={downMd ? setShowMobileSideBar : setShowSideBar}
        >
          <ToggleIcon />
        </StyledIconButton>
        <H2 fontSize={21} lineHeight={0} fontWeight="700" color="text.primary">
          {title}
        </H2>

        <Box flexGrow={1} ml={1} />

        {/* {settings.direction === "ltr" ? (
          <StyledIconButton
            disableRipple
            onClick={() => handleChangeDirection("rtl")}
          >
            <RtlIcon sx={{ color: "text.disabled" }} />
          </StyledIconButton>
        ) : (
          <StyledIconButton
            disableRipple
            onClick={() => handleChangeDirection("ltr")}
          >
            <LTR sx={{ color: "text.disabled" }} />
          </StyledIconButton>
        )} */}

        {/* {settings.theme === "light" ? (
          <StyledIconButton
            disableRipple
            onClick={() => handleChangeTheme(THEMES.DARK)}
          >
            <ThemeIcon />
          </StyledIconButton>
        ) : (
          <StyledIconButton
            disableRipple
            onClick={() => handleChangeTheme(THEMES.LIGHT)}
          >
            <Brightness4 />
          </StyledIconButton>
        )} */}

        {upSm && (
          <>
            {/* <LanguagePopover /> */}
            {/* <NotificationsPopover /> */}
            {/* <ServicePopover /> */}
            {/* <ActivityPopover /> */}
          </>
        )}
        <ProfilePopover />
      </StyledToolBar>
    </DashboardNavbarRoot>
  );
};

export default DashboardNavbar;