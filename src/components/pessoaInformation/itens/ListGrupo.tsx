import { MoreHoriz } from '@mui/icons-material';
import { Box, IconButton } from '@mui/material';
import FlexBox from '../../FlexBox';
import { H6, Tiny } from '../../Typography';
import React, { FC, MouseEvent } from 'react';

// component interface
interface ListCardProps {
  item: {
    id_grupo_pertence: number;
  };
  handleMore: (event: MouseEvent<HTMLButtonElement>) => void;
}

const ListCard: FC<ListCardProps> = ({ item, handleMore }) => {
  const grupoPertence = [
    {
      nome: 'Celular',
      id: 1,
    },
    {
      nome: 'Comercial',
      id: 2,
    },
    {
      nome: 'Trabalho',
      id: 3,
    },
    {
      nome: 'Residencial',
      id: 4,
    },
    {
      nome: 'Recado',
      id: 5,
    },
    {
      nome: 'Fixo - 1',
      id: 6,
    },
    {
      nome: 'Fixo - 1',
      id: 7,
    },
    {
      nome: 'telefone_fixo',
      id: 8,
    },
    {
      nome: 'telefone_celular',
      id: 9,
    },
    {
      nome: 'telefone_celular_aux',
      id: 10,
    },
    {
      nome: 'telefone_comercial',
      id: 11,
    },
  ];

  return (
    <FlexBox justifyContent="space-between" alignItems="center">
      <FlexBox alignItems="center">
        <Box ml="1rem">
          <H6>
            {grupoPertence.map((object) =>
              item.id_grupo_pertence === object.id ? object.nome : null,
            )}
          </H6>
        </Box>
      </FlexBox>
      <IconButton onClick={handleMore}>
        <MoreHoriz sx={{ color: 'secondary.400' }} />
      </IconButton>
    </FlexBox>
  );
};

export default ListCard;
