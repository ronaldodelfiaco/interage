import { MoreHoriz } from '@mui/icons-material';
import { Box, IconButton } from '@mui/material';
import FlexBox from '../../FlexBox';
import { H6, Tiny } from '../../Typography';
import React, { FC, MouseEvent } from 'react';

// component interface
interface ListCardProps {
  item: {
    ddd: number;
    telefone: number;
    ramal: string;
    ddi: string;
    principal: boolean;
    id_tipo_telefone: number;
  };
  handleMore: (event: MouseEvent<HTMLButtonElement>) => void;
}

const ListCard: FC<ListCardProps> = ({ item, handleMore }) => {
  const tipoTelefone = [
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
            {'Número: ' + item.ddi + ' (' + item.ddd + ') ' + item.telefone}
          </H6>
          {item.ramal === '' ? null : (
            <>
              <Tiny>{'Ramal: ' + item.ramal}</Tiny>
              <br />
            </>
          )}
          {item.principal ? (
            <>
              <Tiny>Numero Principal</Tiny>
              <br />
            </>
          ) : null}
          <Tiny>
            {tipoTelefone.map((object) =>
              item.id_tipo_telefone === object.id ? object.nome : null,
            )}
          </Tiny>
        </Box>
      </FlexBox>
      <IconButton onClick={handleMore}>
        <MoreHoriz sx={{ color: 'secondary.400' }} />
      </IconButton>
    </FlexBox>
  );
};

export default ListCard;
