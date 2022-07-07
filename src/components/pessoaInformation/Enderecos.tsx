import { Card, Grid, Typography } from '@mui/material';
import axios from 'axios';
import { FC, MouseEvent, useEffect, useState } from 'react';
import { herokuConfig } from '../../config';
import AddIconButton from '../AddIconButton';
import FlexBox from '../FlexBox';
import MoreOptions from '../MoreOptions';
import { H3, Tiny } from '../Typography';
import ListEndereco from './itens/ListEndereco';
import ModalEndereco from './itens/modalEndereco';

interface TelefonesProps {
  idPessoa: string;
}

type Endereco = {
  id: number;
  id_pessoa: number;
  id_cidade: number;
  cep: string;
  logradouro: string;
  bairro: string;
  complemento?: string;
  recebe_correspondencia: boolean;
  status: boolean;
  dtalteracao: string;
  dtinclusao: string;
};

const Endereco: FC<TelefonesProps> = ({ idPessoa }) => {
  const [EnderecoPessoa, setEnderecoPessoa] = useState<Endereco[]>([]);
  const [newEndereco, setNewEndereco] = useState<Endereco>();
  const [moreEl, setMoreEl] = useState<null | HTMLElement>(null);
  const [openModalEndereco, setOpenModalEndereco] = useState(false);
  const [itemDados, setItem] = useState<number>(0);
  let user = localStorage.getItem('user');
  user = user === null ? '...' : user;
  const _user = JSON.parse(user);
  const heroku = `${herokuConfig}genericCRUD?id_usuario=${_user?.id}&token=${_user?.token}&table=pessoas_enderecos`;
  const herokuFiltro = heroku + `&filter=id_pessoa=${idPessoa}`;
  const [editar, setEditar] = useState(false);

  const handleMoreOpen = (event: MouseEvent<HTMLButtonElement>) => {
    setMoreEl(event.currentTarget);
  };
  const handleMoreClose = () => setMoreEl(null);

  // Carregar Tabela
  function loadTable() {
    setTimeout(() => {
      axios
        .get(herokuFiltro)
        .then(({ data }: any) => {
          // setPessoa(data.body.rows[0]);
          setEnderecoPessoa(data.body.rows);
        })
        .catch((error) => {
          console.error(2, error);
          setEnderecoPessoa([]);
        });
    }, 20);
  }

  // Primeira chamada da tabela
  useEffect(() => {
    loadTable();
  }, [heroku]);

  // Adicionar Novos dados na tabela
  useEffect(() => {
    if (newEndereco !== undefined) {
      if (!editar) {
        console.log('Enviou');
        axios
          .post(heroku, newEndereco)
          .then((response) => {
            console.log(response);
            loadTable();
          })
          .catch((error) => {
            console.log(heroku, error, 'erro');
            console.error(error);
          });
      } else {
        axios
          .put(heroku + '&id=' + newEndereco.id, newEndereco)
          .then((response) => {
            console.log(response);
            loadTable();
          })
          .catch((error) => {
            console.error(error);
          });
        EnderecoPessoa.forEach((Element) => {
          if (Element.id === newEndereco.id) {
            setEditar(false);
            setItem(0);
          }
        });
      }
    }
  }, [newEndereco]);

  useEffect(() => {
    if (!openModalEndereco && editar) {
      setEditar(false);
    }
  }, [openModalEndereco]);

  function editarEndereco(id: number) {
    EnderecoPessoa.forEach((Element) => {
      if (Element.id === id) {
        const index = EnderecoPessoa.indexOf(Element);
        setItem(index);
      }
    });
    setEditar(true);
    setOpenModalEndereco(true);
    handleMoreClose();
  }

  function apagarEndereco(id: number) {
    axios
      .delete(heroku + '&id=' + id)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
    loadTable();
    handleMoreClose();
  }

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
              editar={editarEndereco}
              apagar={apagarEndereco}
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
              open={openModalEndereco}
              setOpen={setOpenModalEndereco}
              setDadosAtributos={setNewEndereco}
              itemDados={EnderecoPessoa[itemDados]}
              editar={editar}
            />
          </FlexBox>
        </Grid>
      </Grid>
    </Card>
  );
};

export default Endereco;
