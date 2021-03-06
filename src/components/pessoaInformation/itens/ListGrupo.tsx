import { MoreHoriz } from '@mui/icons-material';
import { Box, IconButton, Typography } from '@mui/material';
import axios from 'axios';
import { format } from 'date-fns';
import { formatWithOptions } from 'date-fns/fp';
import { ptBR } from 'date-fns/locale';
import React, { FC, MouseEvent } from 'react';
import { herokuConfig } from '../../../config';
import FlexBox from '../../FlexBox';
import { H6 } from '../../Typography';

const dateToString = formatWithOptions({ locale: ptBR }, 'dd/MM/yyyy');

// component interface
interface ListCardProps {
  item: {
    id_grupo: number;
    dt_final: string;
    dt_inicial: string;
  };
  handleMore: (event: MouseEvent<HTMLButtonElement>) => void;
  setID: (index: number) => void;
  index: number;
}

type Grupos = {
  id: number;
  nome: string;
  state: boolean;
};

const ListCard: FC<ListCardProps> = ({ item, handleMore, setID, index }) => {
  let user = localStorage.getItem('user');
  user = user === null ? '...' : user;
  const _user = JSON.parse(user);
  
  const heroku = `${herokuConfig}genericCRUD?id_usuario=${_user?.id}&token=${_user?.token}&table=grupos`;

  const [grupoPertence, setGrupoPertence] = React.useState<Grupos[]>([]);

  React.useEffect(() => {
    axios
      .get(heroku)
      .then(({ data }: any) => {
        setGrupoPertence(data.body.rows);
      })
      .catch((error) => {
        console.error(2, error);
        setGrupoPertence([]);
      });
  }, [heroku]);

  return (
    <FlexBox justifyContent="space-between" alignItems="center">
      <FlexBox alignItems="center">
        <Box ml="1rem">
          <H6>
            {grupoPertence.map((object) =>
              item.id_grupo === object.id ? object.nome : null,
            )}
          </H6>
          <Typography>
            {/* Inicio: {item.dt_inicial.split('-')[2].split('T')[0]}/
            {item.dt_inicial.split('-')[1]}/{item.dt_inicial.split('-')[0]} */}
            Inicio: {format(new Date(item.dt_inicial), 'dd/MM/yyyy', {locale:ptBR})}
          </Typography>
          <Typography>
            {item.dt_final === null || item.dt_final === undefined || item.dt_final === ''
              ? null
              : 'Fim: ' + format(new Date(item.dt_final), 'dd/MM/yyyy', {locale:ptBR})
              //item.dt_final.split('-')[2].split('T')[0] + '/' +
              //item.dt_final.split('-')[1] + '/' + item.dt_final.split('-')[0]
            }
          </Typography>
        </Box>
      </FlexBox>
      <IconButton
        onClick={(event) => {
          handleMore(event);
          setID(index);
        }}
      >        <MoreHoriz sx={{ color: 'secondary.400' }} />
      </IconButton>
    </FlexBox>
  );
};

export default ListCard;
