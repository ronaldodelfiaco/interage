import { Box } from "@mui/material";
import AddIconButton from "../../../components/AddIconButton";
import FlexBox from "../../../components/FlexBox";
import { H6, Tiny } from "../../../components/Typography";
import { FC } from "react";

const NewItemCard: FC = () => {
  return (
    <FlexBox alignItems="center">
      <AddIconButton />
      <Box ml="1rem">
        <H6>New Item</H6>
        <Tiny color="secondary.400">Add a new work experience item</Tiny>
      </Box>
    </FlexBox>
  );
};

export default NewItemCard;
