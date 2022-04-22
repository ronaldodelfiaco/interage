declare module "@mui/material/styles" {
  interface PaletteColor {
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    red: string;
    purple: string;
    yellow: string;
  }
}

export const primary = {
  100: "#E5EEFF",
  200: "#C6D3ED",
  300: "#A0CCFF",
  400: "#7EB9FF",
  500: "#61A9FF",
  main: "#61A9FF", // main
  light: "#E5EEFF",
};

export const secondary = {
  100: "#F9F9F9",
  200: "#ECEFF5",
  300: "#E5EAF2", // outline or border
  400: "#94A4C4", // text muted
  500: "#283252", // main text
  main: "#283252", // main text
  light: "#F9F9F9",
  red: "#FF6B93",
  purple: "#A798FF",
  yellow: "#FF9777",
};

export const error = {
  main: "#FD396D",
};

export const success = {
  main: "#2CC5BD",
};

export const warning = {
  main: "#FFE91F",
  dark: "#FFD600",
};

export const info = {
  main: "#A798FF",
};

export const text = {
  primary: secondary[500],
  secondary: secondary[300],
  disabled: secondary[400],
};
