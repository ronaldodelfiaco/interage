import { Card, Grid, Typography } from '@mui/material';
import axios from 'axios';
import { format } from 'date-fns';
import { FC, useEffect, useState } from 'react';
import { herokuConfig } from '../../config';
import AddIconButton from '../AddIconButton';
import FlexBox from '../FlexBox';
import ModalGrupo from '../pessoaInformation/itens/modalGrupo';
import { H3, Tiny } from '../Typography';
import VectorUI from '../VectorUI';
import ListGrupo from './itens/ListGrupo';

interface GruposProps {
  idPessoa: string;
}

type grupo = {
  id?: number;
  id_pessoa?: string;
  id_grupo: number;
  dt_final: string;
  dt_inicial: string;
  principal: boolean;
};

type view_Table = {
  id_pessoa: number;
  id_grupo: number;
  disponivel: boolean;
};

const Grupos: FC<GruposProps> = ({ idPessoa }) => {
  const [GruposPessoa, setGruposPessoa] = useState<grupo[]>([]);

  const [newGrupo, setNewGrupo] = useState<grupo>();
  const [openModalGrupo, setOpenModalGrupo] = useState(false);

  const [itemDados, setItem] = useState(0);
  let user = localStorage.getItem('user');

  user = user === null ? '...' : user;
  const _user = JSON.parse(user);

  const heroku = `${herokuConfig}genericCRUD?id_usuario=${_user?.id}&token=${_user?.token}&table=pessoas_grupos`;

  const [editar, setEditar] = useState(false);

  const herokuFiltro = heroku + `&filter=id_pessoa=${idPessoa}`;

  useEffect(() => {
    if (!openModalGrupo && editar) {
      setEditar(false);
    }
  }, [openModalGrupo]);

  const loadTable = () => {
    setTimeout(() => {
      axios
        .get(herokuFiltro)
        .then(({ data }: any) => {
          // setPessoa(data.body.rows[0]);
          setGruposPessoa(data.body.rows);
        })
        .catch((error) => {
          console.log(2, error);
          setGruposPessoa([]);
        });
    }, 15);
  };

  useEffect(() => {
    loadTable();
  }, []);

  //Adiciona novos dados, no vetor de grupo
  useEffect(() => {
    if (newGrupo !== undefined) {
      if (newGrupo.principal) {
        GruposPessoa.forEach((Element) => {
          if (Element.principal) {
            axios
              .put(heroku + '&id=' + Element.id, {
                id: Element.id,
                id_pessoa: Element.id_pessoa,
                id_grupo: Element.id_grupo,
                dt_final: format(
                  new Date(Element.dt_final),
                  'dd/MM/yyyy HH:m:ss',
                ),
                dt_inicial: format(
                  new Date(Element.dt_inicial),
                  'dd/MM/yyyy HH:m:ss',
                ),
                principal: false,
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
        axios
          .post(heroku, newGrupo)
          .then((response) => {
            console.log(response);
            loadTable();
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
        axios
          .put(heroku + '&id=' + newGrupo.id, newGrupo)
          .then((response) => {
            console.log(response);
            loadTable();
          })
          .catch((error) => {
            console.error(error);
          });
        GruposPessoa.forEach((Element) => {
          if (Element.id === newGrupo.id) {
            setEditar(false);
            setItem(0);
          }
        });
      }
    }
  }, [newGrupo]);

  return (
    <Card sx={{ padding: '1.5rem', pb: '4rem' }}>
      <H3>Grupos</H3>
      <Grid container spacing={4} pt="1.5rem">
        <VectorUI
          Array={GruposPessoa}
          setItem={setItem}
          setEdit={setEditar}
          setOpenModal={setOpenModalGrupo}
          heroku={heroku}
          ListCard={ListGrupo}
        />
        <Grid item xs={12} sm={6}>
          <FlexBox alignItems={'center'}>
            <AddIconButton onClick={() => setOpenModalGrupo(true)} />
            <Grid ml="1rem">
              <Typography variant="h6">Adicionar</Typography>
              <Tiny color="secondary.400">novo grupo</Tiny>
            </Grid>

            <ModalGrupo
              editar={editar}
              open={openModalGrupo}
              setOpen={setOpenModalGrupo}
              setDadosAtributos={setNewGrupo}
              itemDados={GruposPessoa[itemDados]}
            />
          </FlexBox>
        </Grid>
      </Grid>
    </Card>
  );
};

export default Grupos;
