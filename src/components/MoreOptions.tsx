import { Menu, MenuItem } from "@mui/material";
import DeleteIcon from "../icons/DeleteIcon";
import PencilIcon from "../icons/PencilIcon";
import React, { FC } from "react";
import { Small } from "./Typography";

// component props interface

interface MoreOptionsProps {
  open?: boolean;
  anchorEl: HTMLElement | null;
  handleMoreClose: () => void;
  pessoa: Array<any>;
}

const MoreOptions: FC<MoreOptionsProps> = ({
  anchorEl,
  handleMoreClose,
  pessoa,
}) => {
  return (
    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={handleMoreClose}
    >
      <MenuItem
        onClick={() => {
          console.log("Editar", pessoa);
          // pessoa[0] = [nome="Pedro", idade=15]
        }}
        sx={{ "&:hover": { color: "primary.main" } }}
      >
        <PencilIcon sx={{ fontSize: 14, marginRight: 1 }} />
        <Small fontWeight={500}>Editar</Small>
      </MenuItem>
      <MenuItem
        onClick={() => {
          console.log("Remover", anchorEl);
          pessoa.splice(0, 1);
        }}
        sx={{ "&:hover": { color: "primary.main" } }}
      >
        <DeleteIcon sx={{ fontSize: 14, marginRight: 1 }} />
        <Small fontWeight={500}>Remover</Small>
      </MenuItem>
    </Menu>
  );
};

export default MoreOptions;
