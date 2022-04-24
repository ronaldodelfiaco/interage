import { Box, IconButton, MenuItem, Popover, styled } from "@mui/material";
import { H6 } from "../../../components/Typography";
import { FC, useRef, useState } from "react";

// dummy language options
const languageOptions = [
  {
    icon: "/static/flags/br.png",
    label: "Brazil",
  },
  {
    icon: '/static/flags/spain.png',
    label: 'Spanish',
  },
  {
    icon: "/static/flags/uk.png",
    label: "English",
  },
  {
    icon: "/static/flags/usa.png",
    label: "USA",
  },
  {
    icon: "/static/flags/in.png",
    label: "Hindi",
  },
];

// custom styled components
const IconWrapper = styled(Box)(() => ({
  display: "flex",
  height: 20,
  width: 20,
  "& img": {
    width: "100%",
    borderRadius: "50%",
    objectFit: "cover",
  },
}));

const ItemWrapper = styled(Box)(() => ({
  display: "flex",
  "& img": {
    width: "100%",
  },
}));

const LanguagePopover: FC = () => {
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(languageOptions[0]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChangeLanguage = (language: { icon: string; label: string }) => {
    setSelectedLanguage(language);
    setOpen(false);
  };

  return (
    <>
      <IconButton onClick={handleOpen} ref={anchorRef}>
        <IconWrapper>
          <img alt={selectedLanguage.label} src={selectedLanguage.icon} />
        </IconWrapper>
      </IconButton>
      <Popover
        keepMounted
        open={open}
        onClose={handleClose}
        anchorEl={anchorRef.current}
        anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
        PaperProps={{
          sx: {
            width: 150,
            padding: "0.5rem 0",
          },
        }}
      >
        {languageOptions.map((language) => (
          <MenuItem
            key={language.label}
            onClick={() => handleChangeLanguage(language)}
          >
            <ItemWrapper>
              <img alt={language.label} src={language.icon} />
              <H6 fontWeight={600} ml={1}>
                {language.label}
              </H6>
            </ItemWrapper>
          </MenuItem>
        ))}
      </Popover>
    </>
  );
};

export default LanguagePopover;