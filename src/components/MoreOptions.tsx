import { Menu, MenuItem } from '@mui/material';
import DeleteIcon from '../icons/DeleteIcon';
import PencilIcon from '../icons/PencilIcon';
import React, { FC } from 'react';
import { Small } from './Typography';

// component props interface

interface MoreOptionsProps {
  open?: boolean;
  anchorEl: HTMLElement | null;
  id?: number;
  handleMoreClose: () => void;
  apagar: (id: any) => void;
  editar: (id: any) => void;
}

const MoreOptions: FC<MoreOptionsProps> = ({
  anchorEl,
  handleMoreClose,
  id,
  apagar,
  editar,
}) => {
  return (
    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={handleMoreClose}
    >
      <MenuItem
        onClick={() => {
          editar(id);
        }}
        sx={{ '&:hover': { color: 'primary.main' } }}
      >
        <PencilIcon sx={{ fontSize: 14, marginRight: 1 }} />
        <Small fontWeight={500}>Editar</Small>
      </MenuItem>
      <MenuItem
        onClick={() => {
          apagar(id);
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
