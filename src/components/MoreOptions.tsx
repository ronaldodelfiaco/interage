import { Menu, MenuItem } from '@mui/material';
import React, { FC, useEffect, useState } from 'react';
import DeleteIcon from '../icons/DeleteIcon';
import PencilIcon from '../icons/PencilIcon';
import { Small } from './Typography';

// component props interface

interface MoreOptionsProps {
  // open: boolean;
  anchorEl: HTMLElement | null;
  id: number;
  handleMoreClose: () => void;
  apagar: (id: any) => void;
  editar: (id: any) => void;
}

const MoreOptions: FC<MoreOptionsProps> = ({
  anchorEl,
  id,
  handleMoreClose,
  apagar,
  editar,
}) => {
  const index = id;
  return (
    <Menu
      id={`basic-menu-${id}`}
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={handleMoreClose}
    >
      <MenuItem
        onClick={() => {
          editar(index);
        }}
        sx={{ '&:hover': { color: 'primary.main' } }}
      >
        <PencilIcon sx={{ fontSize: 14, marginRight: 1 }} />
        <Small fontWeight={500}>Editar</Small>
      </MenuItem>
      <MenuItem
        onClick={() => {
          apagar(index);
        }}
        sx={{ '&:hover': { color: 'primary.main' } }}
      >
        <DeleteIcon sx={{ fontSize: 14, marginRight: 1 }} />
        <Small fontWeight={500}>Remover</Small>
      </MenuItem>
    </Menu>
  );
};

export default MoreOptions;
