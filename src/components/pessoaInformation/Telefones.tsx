import { Card, Grid, Typography } from '@mui/material';
import axios from 'axios';
import { FC, MouseEvent, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { herokuConfig } from '../../config';
import AddIconButton from '../AddIconButton';
import FlexBox from '../FlexBox';
import MoreOptions from '../MoreOptions';
import ModalTelefone from '../pessoaInformation/itens/modalTelefone';
import { H3, Tiny } from '../Typography';
import ListTelefone from './itens/ListTelefone';

interface TelefonesProps {
  idPessoa: string | string[] | undefined;
}

type telefone = {
  id: number;
  id_pessoa: string;
  ddd: string;
  telefone: string;
  ramal: string;
  principal: boolean;
  id_tipo_telefone: string;
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

  const [itemDados, setItemDados] = useState<telefone>();

  let user = localStorage.getItem('user');
  user = user === null ? '...' : user;
  const _user = JSON.parse(user);

  const heroku = `${herokuConfig}genericCRUD?id_usuario=${_user?.id}&token=${_user?.token}&table=pessoas_telefones&filter=id_pessoa=${idPessoa}`;

  const [editar, setEditar] = useState(false);

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
      if (!editar) {
        setTelefonesPessoa((prevTelefone) => [
          ...prevTelefone,
          {
            id: TelefonesPessoa.length,
            id_pessoa: newTelefonePessoa.id_pessoa,
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
      } else {
        TelefonesPessoa.splice(
          newTelefonePessoa.id,
          1,
          newTelefonePessoa,
        );
        setEditar(false);
        setItemDados({
          id: -1,
          id_pessoa: '',
          ddd: '',
          telefone: '',
          ramal: '',
          principal: false,
          id_tipo_telefone: '',
          contato: '',
          ddi: '',
          dtalteracao: '',
          dtinclusao: '',
        });
      }
    }
  }, [newTelefonePessoa]);

  const editarNumero = (id: number) => {
    setItemDados(TelefonesPessoa[id]);
    setOpenModalTelefone(true);
    setEditar(true);
    handleMoreClose();
  };

  const apagarNumero = (id: number) => {
    setTelefonesPessoa(TelefonesPessoa.splice(id, 0));
    handleMoreClose();
  };

  return (
    <Card sx={{ padding: '1.5rem', pb: '4rem' }}>
      <H3>Telefones</H3>
      <Grid container spacing={4} pt="1.5rem">
        {TelefonesPessoa.map((item) => (
          <Grid item xs={12} sm={6} key={item?.id}>
            <ListTelefone item={item} handleMore={handleMoreOpen} />
            <MoreOptions
              id={item.id}
              anchorEl={moreEl}
              handleMoreClose={handleMoreClose}
              editar={editarNumero}
              apagar={apagarNumero}
            />
          </Grid>
        ))}

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
              itemDados={itemDados}
              setItemDados={setItemDados}
            />
          </FlexBox>
        </Grid>
      </Grid>
    </Card>
  );
};

export default Telefones;
