import { styled, TextField, TextFieldProps } from "@mui/material";
import React from "react";

const StyledTextField = styled(TextField)<TextFieldProps>(({ theme }) => ({
  "& .MuiOutlinedInput-root:hover": {
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: theme.palette.primary.main,
    },
  },
  "& .MuiOutlinedInput-input": {
    height: 40,
    fontSize: 12,
    fontWeight: 500,
    padding: "0px 15px",
    color: theme.palette.text.primary,
  },
  "& .MuiOutlinedInput-notchedOutline": {
    borderRadius: "8px",
    border: "2px solid",
    borderColor:
      theme.palette.mode === "light"
        ? theme.palette.secondary[300]
        : theme.palette.divider,
  },
  "& .MuiOutlinedInput-root.Mui-disabled .MuiOutlinedInput-notchedOutline": {
    borderColor: theme.palette.secondary[300],
  },
}));

const LightTextField = (props: TextFieldProps) => {
  return <StyledTextField {...props} />;
};

export default LightTextField;
