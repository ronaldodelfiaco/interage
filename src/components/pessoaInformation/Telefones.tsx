import { Card, Grid, Typography } from '@mui/material';
import axios from 'axios';
import { format } from 'date-fns';
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
  idPessoa: string;
}

type telefone = {
  id: number;
  id_pessoa: string;
  ddd: string;
  telefone: string;
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

  const [newTelefone, setNewTelefone] = useState<telefone>();
  const [openModalTelefone, setOpenModalTelefone] = useState(false);

  const [itemDados, setItemDados] = useState(0);

  let user = localStorage.getItem('user');
  user = user === null ? '...' : user;
  const _user = JSON.parse(user);

  const heroku = `${herokuConfig}genericCRUD?id_usuario=${_user?.id}&token=${_user?.token}&table=pessoas_telefones`;

  const [editar, setEditar] = useState(false);
  const [idEdit, setIdEdit] = useState(0);

  const herokuFiltro = heroku + `&filter=id_pessoa=${idPessoa}`;

  const loadTable = () => {
    axios
      .get(herokuFiltro)
      .then(({ data }: any) => {
        // setPessoa(data.body.rows[0]);
        setTelefonesPessoa(data.body.rows);
      })
      .catch((error) => {
        console.error(2, error);
        setTelefonesPessoa([]);
      });
  };

  useEffect(() => {
    loadTable();
  }, [heroku]);

  useEffect(() => {
    if (!openModalTelefone && editar) {
      setEditar(false);
    }
  }, [openModalTelefone]);

  //Adiciona novos dados, no vetor de telefone
  useEffect(() => {
    if (newTelefone !== undefined) {
      if (newTelefone.principal) {
        TelefonesPessoa.forEach((Element) => {
          if (Element.principal) {
            axios
              .put(heroku + '&id=' + Element.id, {
                id: Element.id,
                id_pessoa: Element.id_pessoa,
                ddd: Element.ddd,
                telefone: Element.telefone,
                ramal: Element.ramal,
                principal: false,
                id_tipo_telefone: Element.id_tipo_telefone,
                contato: Element.contato,
                ddi: Element.ddi,
                dtalteracao: format(
                  new Date(Element.dtalteracao),
                  'dd/MM/yyyy HH:m:ss',
                ),
                dtinclusao: format(
                  new Date(Element.dtinclusao),
                  'dd/MM/yyyy HH:m:ss',
                ),
              })
              .then((response) => {
                console.log(response);
                loadTable();
              })
              .catch((error) => {
                console.error(error);
              });
          }
        });
      }
      if (!editar) {
        console.log(heroku, newTelefone);
        axios
          .post(heroku, newTelefone)
          .then((response) => {
            console.log(response);
            loadTable();
          })
          .catch((error) => {
            console.log('falha');
            console.error(error);
          });
      } else {
        axios
          .put(heroku + '&id=' + newTelefone.id, newTelefone)
          .then((response) => {
            console.log(response);
            loadTable();
          })
          .catch((error) => {
            console.error(error);
          });
        TelefonesPessoa.forEach((Element) => {
          if (Element.id === newTelefone.id) {
            // const index = TelefonesPessoa.indexOf(Element);
            // TelefonesPessoa.splice(index, 1, newTelefone);
            // TelefonesPessoa.splice(newTelefone.id, 1, newTelefone);
            setEditar(false);
            setItemDados(0);
          }
        });
      }
    }
  }, [newTelefone]);

  const editarNumero = () => {
    setItemDados(idEdit);
    setOpenModalTelefone(true), setEditar(true);
    handleMoreClose();
  };

  const apagarNumero = () => {
    // const index = TelefonesPessoa.indexOf(Element);
    // TelefonesPessoa.splice(index, 1);
    axios
      .delete(heroku + '&id=' + TelefonesPessoa[idEdit].id)
      .then((response) => {
        console.log(response);
        loadTable();
      })
      .catch((error) => {
        console.error(error);
      });
    handleMoreClose();
  };

  return (
    <Card sx={{ padding: '1.5rem', pb: '4rem' }}>
      <H3>Telefones</H3>
      <Grid container spacing={4} pt="1.5rem">
        {TelefonesPessoa.map((item, index) => (
          <Grid item xs={12} sm={6} key={index}>
            <ListTelefone
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
          editar={editarNumero}
          apagar={apagarNumero}
        />

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
              setDadosAtributos={setNewTelefone}
              itemDados={TelefonesPessoa[itemDados]}
              editar={editar}
            />
          </FlexBox>
        </Grid>
      </Grid>
    </Card>
  );
};

export default Telefones;
