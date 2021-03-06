import { Box, styled } from "@mui/material";

export const DroppableWrapper = styled(Box)(() => ({
  maxHeight: "calc(100% - 53px)",
  minHeight: "calc(100% - 53px)",
  padding: "1rem",
  overflow: "auto",
  "&[data-rbd-droppable-id='todo']": {
    maxHeight: "calc(100% - 129px)",
    minHeight: "calc(100% - 129px)",
  },
}));

export const ColorDot = styled(Box)<{ color: string }>(({ color }) => ({
  width: 6,
  height: 6,
  marginTop: 6,
  marginRight: 10,
  borderRadius: "50%",
  backgroundColor: color,
}));
