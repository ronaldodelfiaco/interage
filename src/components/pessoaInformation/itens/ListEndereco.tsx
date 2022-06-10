import { MoreHoriz } from '@mui/icons-material';
import { Box, IconButton } from '@mui/material';
import axios from 'axios';
import React, { FC, MouseEvent } from 'react';
import { herokuConfig } from '../../../config';
import FlexBox from '../../FlexBox';
import { H6, Tiny } from '../../Typography';

type cidade = {
  id: number;
  nome: string;
  uf_cidade: string;
  ddd_cidade: string;
  status: boolean;
};

// component interface
interface ListCardProps {
  item: {
    id: number;
    id_cidade: number;
    cep: string;
    logradouro: string;
    uf?: string;
    bairro: string;
    complemento: string;
    recebe_correspondencia: boolean;
    status: boolean;
  };
  handleMore: (event: MouseEvent<HTMLButtonElement>) => void;
}

const ListCard: FC<ListCardProps> = ({ item, handleMore }) => {
  let user = localStorage.getItem('user');
  user = user === null ? '...' : user;
  const _user = JSON.parse(user);

  const [cidade, setCidade] = React.useState<cidade[]>([]);

  const heroku = `${herokuConfig}genericCRUD?id_usuario=${_user?.id}&token=${_user?.token}&table=cidades`;

  React.useEffect(() => {
    axios
      .get(heroku)
      .then(({ data }: any) => {
        console.log(heroku);
        setCidade(data.body.rows);
      })
      .catch((error) => {
        console.log(2, error);
        setCidade([]);
      });
  }, [heroku]);

  return (
    <FlexBox justifyContent="space-between" alignItems="center">
      <FlexBox alignItems="center">
        <Box ml="1rem">
          {cidade.map((object) =>
            object.id === item.id_cidade ? <H6>{object.nome}</H6> : null,
          )}

          <Tiny>
            {'Bairro: ' + item.bairro + ' Cep: ' + item.cep}
            {item.complemento ? ' Complemento: ' + item.complemento : null}
          </Tiny>
          {item.logradouro === '' ? null : (
            <>
              <Tiny>{' Logradouro: ' + item.logradouro}</Tiny>
              <br />
            </>
          )}
          {item.recebe_correspondencia ? (
            <>
              <Tiny>Recebe Correspondencia</Tiny>
              <br />
            </>
          ) : null}
        </Box>
      </FlexBox>
      <IconButton onClick={handleMore}>
        <MoreHoriz sx={{ color: 'secondary.400' }} />
      </IconButton>
    </FlexBox>
  );
};

export default ListCard;
