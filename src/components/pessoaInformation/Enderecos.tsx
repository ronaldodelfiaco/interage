import { Card, Grid, Typography } from '@mui/material';
import axios from 'axios';
import { format } from 'date-fns';
import { FC, MouseEvent, useEffect, useState } from 'react';
import { herokuConfig } from '../../config';
import AddIconButton from '../AddIconButton';
import FlexBox from '../FlexBox';
import { H3, Tiny } from '../Typography';
import VectorUI from '../VectorUI';
import ListEndereco from './itens/ListEndereco';
import ModalEndereco from './itens/modalEndereco';

interface EnderecoProps {
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

const Endereco: FC<EnderecoProps> = ({ idPessoa }) => {
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
  const [idEdit, setIdEdit] = useState(0);

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
      if (newEndereco.recebe_correspondencia) {
        EnderecoPessoa.forEach((Element) => {
          if (Element.recebe_correspondencia) {
            axios.put(heroku + '&id=' + Element.id, {
              id: Element.id,
              id_pessoa: Element.id_pessoa,
              id_cidade: Element.id_cidade,
              cep: Element.cep,
              logradouro: Element.logradouro,
              bairro: Element.bairro,
              complemento: Element.complemento,
              recebe_correspondencia: false,
              status: Element.status,
              dtalteracao: format(
                new Date(Element.dtalteracao),
                'dd/MM/yyyy HH:m:ss',
              ),
              dtinclusao: format(
                new Date(Element.dtinclusao),
                'dd/MM/yyyy HH:m:ss',
              ),
            });
          }
        });
      }
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

  function editarEndereco() {
    setItem(idEdit);
    setEditar(true), setOpenModalEndereco(true);
    handleMoreClose();
  }

  function apagarEndereco() {
    axios
      .delete(heroku + '&id=' + EnderecoPessoa[idEdit].id)
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
        {/*{EnderecoPessoa.map((item, index) => (
          <Grid item xs={12} sm={6} key={index}>
            <ListEndereco
              setID={setIdEdit}
              index={index}
              item={item}
              handleMore={handleMoreOpen}
            />
          </Grid>
        ))}
        <MoreOptions
          id={idEdit}
          anchorEl={moreEl}
          handleMoreClose={handleMoreClose}
          editar={editarEndereco}
          apagar={apagarEndereco}
        /> */}
      <VectorUI
        Array={EnderecoPessoa}
        setItem={setItem}
        setEdit={setEditar}
        setOpenModal={setOpenModalEndereco}
        heroku={heroku}
        ListCard={ListEndereco}
      />
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
