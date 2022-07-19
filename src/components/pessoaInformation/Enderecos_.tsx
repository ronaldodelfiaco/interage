import { Card, Grid, Typography } from '@mui/material';
import axios from 'axios';
import { FC, MouseEvent, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { herokuConfig } from '../../config';
import AddIconButton from '../AddIconButton';
import FlexBox from '../FlexBox';
import MoreOptions from '../MoreOptions';
import ModalEndereco from './itens/modalEndereco_';
import { H3, Tiny } from '../Typography';
import ListEndereco from './itens/ListEndereco';

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
  const { t } = useTranslation();
  const [moreEl, setMoreEl] = useState<null | HTMLElement>(null);
  const handleMoreOpen = (event: MouseEvent<HTMLButtonElement>) => {
    setMoreEl(event.currentTarget);
  };
  const handleMoreClose = () => setMoreEl(null);
  const [EnderecoPessoa, setEnderecoPessoa] = useState<Endereco[]>([]);

  const [newEnderecoPessoa, setNewEnderecoPessoa] = useState<Endereco>();
  const [openModalEndereco, setOpenModalEndereco] = useState(false);

  const [itemDados, setItem] = useState<number>(0);
  //const [itemDados, setItemDados] = useState<Endereco>();

  let user = localStorage.getItem('user');
  user = user === null ? '...' : user;
  const _user = JSON.parse(user);

  const heroku = `${herokuConfig}genericCRUD?id_usuario=${_user?.id}&token=${_user?.token}&table=pessoas_enderecos`;

  const [editar, setEditar] = useState(false);
  const [idEdit, setIdEdit] = useState(0);

  const herokuFiltro = heroku + `&filter=id_pessoa=${idPessoa}`;
  const loadTable = () => {
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
    }, 1);
  };

  useEffect(() => {
    loadTable();
  }, [heroku]);

  //Adiciona novos dados, no vetor de Endereco
  useEffect(() => {
    if (newEnderecoPessoa !== undefined) {
      if (!editar) {
        axios
          .post(heroku, newEnderecoPessoa)
          .then((response) => {
            console.log(response);
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
        EnderecoPessoa.forEach((Element) => {
          axios
            .put(heroku + '&id=' + newEnderecoPessoa.id, newEnderecoPessoa)
            .then((response) => {
              console.log(response);
            })
            .catch((error) => {
              console.error(error);
            });
          if (Element.id === newEnderecoPessoa.id) {
            setEditar(false);
            setItem(0);
          }
        });
      }
    }
    loadTable();
  }, [newEnderecoPessoa]);

  function editarEndereco() {
    setItem(idEdit);
    setEditar(true), setOpenModalEndereco(true);
    handleMoreClose();
  }

  const apagarEndereco = () => {
    // const index = EnderecoPessoa.indexOf(Element);
    // EnderecoPessoa.splice(index, 1);
    axios
      .delete(heroku + '&id=' + EnderecoPessoa[idEdit])
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
    loadTable();
    handleMoreClose();
  };

  return (
    <Card sx={{ padding: '1.5rem', pb: '4rem' }}>
      <H3>Endereço</H3>
      <Grid container spacing={4} pt="1.5rem">
        {EnderecoPessoa.map((item, index) => (
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
              setDadosAtributos={setNewEnderecoPessoa}
              itemDados={EnderecoPessoa[itemDados]}
              editar={editar}
              // setItemDados={setItem}
            />
          </FlexBox>
        </Grid>
      </Grid>
    </Card>
  );
};

export default Endereco;
