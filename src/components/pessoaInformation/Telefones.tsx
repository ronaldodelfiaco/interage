import { Card, Grid, Typography } from '@mui/material';
import MoreOptions from '../MoreOptions';
import { H3, Tiny } from '../Typography';
import { FC, MouseEvent, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ListTelefone from './itens/ListTelefone';
import NewItemCard from './itens/NewItemCard';
import { herokuConfig } from '../../config';
import axios from 'axios';
import FlexBox from '../FlexBox';
import AddIconButton from '../AddIconButton';
import ModalTelefone from '../pessoaInformation/itens/modalTelefone';

interface TelefonesProps {
  idPessoa: string | string[] | undefined;
}

type telefone = {
  id: number;
  id_pessoa: number;
  ddd: number;
  telefone: number;
  ramal: string;
  principal: boolean;
  id_tipo_telefone: number;
  contato: string;
  ddi: string;
  dtalteracao: string;
  dtinclusao: string;
};

const Telefones: FC<TelefonesProps> = ({ idPessoa }) => {
  const { t } = useTranslation();
  const [moreEl, setMoreEl] = useState<null | HTMLElement>(null);
  const handleMoreOpen = (event: MouseEvent<HTMLButtonElement>) => {
    setMoreEl(event.currentTarget);
  };
  const handleMoreClose = () => setMoreEl(null);
  const [TelefonesPessoa, setTelefonesPessoa] = useState<telefone[]>([]);

  const [newTelefonePessoa, setNewTelefonePessoa] = useState<telefone>();
  const [openModalTelefone, setOpenModalTelefone] = useState(false);

  let user = localStorage.getItem('user');
  user = user === null ? '...' : user;
  const _user = JSON.parse(user);

  const heroku = `${herokuConfig}genericCRUD?id_usuario=${_user?.id}&token=${_user?.token}&table=view_telefones&filter=id_pessoa=${idPessoa}`;

  useEffect(() => {
    axios
      .get(heroku)
      .then(({ data }: any) => {
        console.log(heroku);
        // setPessoa(data.body.rows[0]);
        setTelefonesPessoa(data.body.rows);
      })
      .catch((error) => {
        console.log(2, error);
        setTelefonesPessoa([]);
      });
  }, [heroku]);

  //Adiciona novos dados, no vetor de telefone
  useEffect(() => {
    if (newTelefonePessoa !== undefined) {
      setTelefonesPessoa((prevTelefone) => [
        ...prevTelefone,
        {
          id: 0,
          id_pessoa: 0,
          ddd: newTelefonePessoa.ddd,
          telefone: newTelefonePessoa.telefone,
          ramal: newTelefonePessoa.ramal,
          principal: newTelefonePessoa.principal,
          id_tipo_telefone: newTelefonePessoa.id_tipo_telefone,
          contato: newTelefonePessoa.contato,
          ddi: newTelefonePessoa.ddi,
          dtalteracao: newTelefonePessoa.dtalteracao,
          dtinclusao: newTelefonePessoa.dtinclusao,
        },
      ]);
    }
  }, [newTelefonePessoa]);

  console.log(TelefonesPessoa);

  return (
    <Card sx={{ padding: '1.5rem', pb: '4rem' }}>
      <H3>{t('Groups')}</H3>
      <Grid container spacing={4} pt="1.5rem">
        {TelefonesPessoa.map((item) => (
          <Grid item xs={12} sm={6} key={item?.id}>
            <ListTelefone item={item} handleMore={handleMoreOpen} />
          </Grid>
        ))}

        <MoreOptions anchorEl={moreEl} handleMoreClose={handleMoreClose} />

        <Grid item xs={12} sm={6}>
          <FlexBox alignItems={'center'}>
            <AddIconButton onClick={() => setOpenModalTelefone(true)} />
            <Grid ml="1rem">
              <Typography variant="h6">Adicionar</Typography>
              <Tiny color="secondary.400">novo telefone</Tiny>
            </Grid>
            <ModalTelefone
              open={openModalTelefone}
              setOpen={setOpenModalTelefone}
              setDadosAtributos={setNewTelefonePessoa}
            />
          </FlexBox>
        </Grid>
      </Grid>
    </Card>
  );
};

export default Telefones;
