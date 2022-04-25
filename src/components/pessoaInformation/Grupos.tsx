import { Card, Grid } from '@mui/material';
import MoreOptions from '../MoreOptions';
import { H3 } from '../Typography';
import { FC, MouseEvent, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ListCard from './itens/ListCard';
import NewItemCard from './itens/NewItemCard';
import { herokuConfig } from '../../config';
import axios from 'axios';

interface GruposProps {
  idPessoa: string | string[] | undefined;
}

const Grupos: FC<GruposProps> = ({ idPessoa }) => {
  const { t } = useTranslation();
  const [moreEl, setMoreEl] = useState<null | HTMLElement>(null);
  const handleMoreOpen = (event: MouseEvent<HTMLButtonElement>) => {
    setMoreEl(event.currentTarget);
  };
  const handleMoreClose = () => setMoreEl(null);
  const [gruposPessoa, setGruposPessoa] = useState([]);

  let user = localStorage.getItem('user');
  user = user === null ? '...' : user;
  const _user = JSON.parse(user);

  const heroku = `${herokuConfig}genericCRUD?id_usuario=${_user?.id}&token=${_user?.token}&table=view_grupos&filter=id_pessoa=${idPessoa}`;

  useEffect(() => {
    axios
      .get(heroku)
      .then(({ data }: any) => {
        // setPessoa(data.body.rows[0]);
        setGruposPessoa(data.body.rows);
      })
      .catch((error) => {
        console.log(2, error);
        setGruposPessoa([]);
      });
  }, [heroku]);

  return (
    <Card sx={{ padding: '1.5rem', pb: '4rem' }}>
      <H3>{t('Groups')}</H3>
      <Grid container spacing={4} pt="1.5rem">
        {gruposPessoa.map((item) => (
          <Grid item xs={12} sm={6} key={item?.id}>
            <ListCard item={item} handleMore={handleMoreOpen} />
          </Grid>
        ))}

        <MoreOptions anchorEl={moreEl} handleMoreClose={handleMoreClose} />

        <Grid item xs={12} sm={6}>
          <NewItemCard />
        </Grid>
      </Grid>
    </Card>
  );
};

export default Grupos;
