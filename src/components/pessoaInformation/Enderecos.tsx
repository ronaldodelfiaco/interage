import { Card, Grid, Typography } from '@mui/material';
import axios from 'axios';
import { FC, MouseEvent, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { herokuConfig } from '../../config';
import AddIconButton from '../AddIconButton';
import FlexBox from '../FlexBox';
import MoreOptions from '../MoreOptions';
import ModalEndereco from '../pessoaInformation/itens/modalEndereco';
import { H3, Tiny } from '../Typography';
import ListEndereco from './itens/ListEndereco';

interface TelefonesProps {
  idPessoa: string;
}

type Endereco = {
  id: number;
  id_pessoa: string;
  id_cidade: number;
  cep: string;
  logradouro: string;
  uf: string;
  bairro: string;
  complemento: string;
  recebe_correspondencia: boolean;
  status: boolean;
  dtalteracao: string;
  dtinclusao: string;
};

const Endereco: FC<TelefonesProps> = ({ idPessoa }) => {
  const { t } = useTranslation();
  const [moreEl, setMoreEl] = useState<null | HTMLElement>(null);
  const handleMoreOpen = (event: MouseEvent<HTMLButtonElement>) => {
    setMoreEl(event.currentTarget);
  };
  const handleMoreClose = () => setMoreEl(null);
  const [EnderecoPessoa, setEnderecoPessoa] = useState<Endereco[]>([]);

  const [newEnderecoPessoa, setNewEnderecoPessoa] = useState<Endereco>();
  const [openModalTelefone, setOpenModalEndereco] = useState(false);

  const [itemDados, setItemDados] = useState<Endereco>();

  let user = localStorage.getItem('user');
  user = user === null ? '...' : user;
  const _user = JSON.parse(user);

  const [editar, setEditar] = useState(false);

  const heroku = `${herokuConfig}genericCRUD?id_usuario=${_user?.id}&token=${_user?.token}&table=pessoas_enderecos&filter=id_pessoa=${idPessoa}`;

  useEffect(() => {
    axios
      .get(heroku)
      .then(({ data }: any) => {
        console.log(heroku);
        // setPessoa(data.body.rows[0]);
        setEnderecoPessoa(data.body.rows);
      })
      .catch((error) => {
        console.log(2, error);
        setEnderecoPessoa([]);
      });
  }, [heroku]);

  //Adiciona novos dados, no vetor de Endereco
  useEffect(() => {
    if (newEnderecoPessoa !== undefined) {
      if (!editar) {
        setEnderecoPessoa((prevTelefone) => [
          ...prevTelefone,
          {
            id: EnderecoPessoa.length,
            id_pessoa: idPessoa,
            id_cidade: newEnderecoPessoa.id_cidade,
            cep: newEnderecoPessoa.cep,
            logradouro: newEnderecoPessoa.logradouro,
            bairro: newEnderecoPessoa.bairro,
            uf: newEnderecoPessoa.uf,
            complemento: newEnderecoPessoa.complemento,
            recebe_correspondencia: newEnderecoPessoa.recebe_correspondencia,
            status: newEnderecoPessoa.status,
            dtalteracao: newEnderecoPessoa.dtalteracao,
            dtinclusao: newEnderecoPessoa.dtinclusao,
          },
        ]);
      } else {
        EnderecoPessoa.splice(newEnderecoPessoa.id, 1, newEnderecoPessoa);
        setEditar(false);
        setItemDados({
          id: -1,
          id_pessoa: '',
          id_cidade: -1,
          cep: '',
          uf: '',
          logradouro: '',
          bairro: '',
          complemento: '',
          recebe_correspondencia: false,
          status: false,
          dtalteracao: '',
          dtinclusao: '',
        });
      }
    }
  }, [newEnderecoPessoa]);

  const editarNumero = (id: number) => {
    setItemDados(EnderecoPessoa[id]);
    setOpenModalEndereco(true);
    setEditar(true);
    handleMoreClose();
  };

  const apagarNumero = (id: number) => {
    EnderecoPessoa.forEach((Element) => {
      if (Element.id === id) {
        const index = EnderecoPessoa.indexOf(Element);
        EnderecoPessoa.splice(index, 1);
      }
    });
    handleMoreClose();
  };

  return (
    <Card sx={{ padding: '1.5rem', pb: '4rem' }}>
      <H3>Endereço</H3>
      <Grid container spacing={4} pt="1.5rem">
        {EnderecoPessoa.map((item) => (
          <Grid item xs={12} sm={6} key={item?.id}>
            <ListEndereco item={item} handleMore={handleMoreOpen} />
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
            <AddIconButton onClick={() => setOpenModalEndereco(true)} />
            <Grid ml="1rem">
              <Typography variant="h6">Adicionar</Typography>
              <Tiny color="secondary.400">novo Endereco</Tiny>
            </Grid>
            <ModalEndereco
              open={openModalTelefone}
              setOpen={setOpenModalEndereco}
              setDadosAtributos={setNewEnderecoPessoa}
              itemDados={itemDados}
              setItemDados={setItemDados}
            />
          </FlexBox>
        </Grid>
      </Grid>
    </Card>
  );
};

export default Endereco;
