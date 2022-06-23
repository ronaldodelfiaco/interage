import { Card, Grid, Typography } from '@mui/material';
import axios from 'axios';
import { FC, MouseEvent, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { herokuConfig } from '../../config';
import AddIconButton from '../AddIconButton';
import FlexBox from '../FlexBox';
import MoreOptions from '../MoreOptions';
import ModalGrupo from '../pessoaInformation/itens/modalGrupo';
import { H3, Tiny } from '../Typography';
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
};

type view_Table = {
  id_pessoa: number;
  id_grupo: number;
  disponivel: boolean;
};

const Grupos: FC<GruposProps> = ({ idPessoa }) => {
  const { t } = useTranslation();
  const [moreEl, setMoreEl] = useState<null | HTMLElement>(null);
  const handleMoreOpen = (event: MouseEvent<HTMLButtonElement>) => {
    setMoreEl(event.currentTarget);
  };
  const handleMoreClose = () => setMoreEl(null);
  const [GruposPessoa, setGruposPessoa] = useState<grupo[]>([]);

  const [newGrupo, setNewGrupo] = useState<grupo>();
  const [openModalGrupo, setOpenModalGrupo] = useState(false);

  const [itemDados, setItemDados] = useState<grupo>();
  let user = localStorage.getItem('user');

  user = user === null ? '...' : user;
  const _user = JSON.parse(user);

  const heroku = `${herokuConfig}genericCRUD?id_usuario=${_user?.id}&token=${_user?.token}&table=pessoas_grupos`;

  const [editar, setEditar] = useState(false);

  const herokuFiltro = heroku + `&filter=id_pessoa=${idPessoa}`;

  useEffect(() =>{
    if(!openModalGrupo && editar){
      setEditar(false);
    }
  }, [openModalGrupo])

  const loadTable = () => {
    setTimeout(() => {
      axios
        .get(herokuFiltro)
        .then(({ data }: any) => {
          console.log(herokuFiltro);
          // setPessoa(data.body.rows[0]);
          setGruposPessoa(data.body.rows);
        })
        .catch((error) => {
          console.log(2, error);
          setGruposPessoa([]);
        });
    }, 1);
  };

  useEffect(() => {
    loadTable();
  }, []);

  //Adiciona novos dados, no vetor de grupo
  useEffect(() => {
    if (newGrupo !== undefined) {
      if (!editar) {
        // setGruposPessoa((prevGrupo) => [
        //   ...prevGrupo,
        //   {
        //     id_grupo: newGrupo.id_grupo,
        //     dt_final: newGrupo.dt_final,
        //     dt_inicial: newGrupo.dt_inicial,
        //   },
        // ]);
        console.log(1, heroku);
        console.log(2, newGrupo);
        axios
          .post(heroku, newGrupo)
          .then((response) => {
            console.log(response);
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
        axios
          .put(heroku + '&id=' + newGrupo.id, newGrupo)
          .then((response) => {
            console.log(response);
          })
          .catch((error) => {
            console.error(error);
          });
        GruposPessoa.forEach((Element) => {
          if (Element.id === newGrupo.id) {
            // const index = GruposPessoa.indexOf(Element);
            // GruposPessoa.splice(index, 1, newGrupo);
            setEditar(false);
            setItemDados(undefined);
          }
        });
      }
    }
    loadTable();
  }, [newGrupo]);

  const editarNumero = (id: number) => {
    GruposPessoa.forEach((Element) => {
      if (Element.id === id) {
        const index = GruposPessoa.indexOf(Element);
        setItemDados(GruposPessoa[index]);
        setOpenModalGrupo(true);
        setEditar(true);
      }
    });
    handleMoreClose();
  };

  const apagarNumero = (id: number) => {
    // console.log(GruposPessoa);
    // Achar o indice do vetor
    GruposPessoa.forEach((Element) => {
      if (Element.id === id) {
        // const index = GruposPessoa.indexOf(Element);
        // GruposPessoa.splice(index, 1);
        axios
          .delete(heroku + '&id=' + id)
          .then((response) => {
            console.log(response);
          })
          .catch((error) => {
            console.error(error);
          });
      }
    });
    loadTable();
    handleMoreClose();
  };

  return (
    <Card sx={{ padding: '1.5rem', pb: '4rem' }}>
      <H3>Grupos</H3>
      <Grid container spacing={4} pt="1.5rem">
        {GruposPessoa.map((item) => (
          <Grid item xs={12} sm={6} key={item?.id}>
            <ListGrupo item={item} handleMore={handleMoreOpen} />
            <MoreOptions
              id={item?.id}
              anchorEl={moreEl}
              handleMoreClose={handleMoreClose}
              editar={editarNumero}
              apagar={apagarNumero}
            />
          </Grid>
        ))}

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
              itemDados={itemDados}
              // setItemDados={setItemDados}
            />
          </FlexBox>
        </Grid>
      </Grid>
    </Card>
  );
};

export default Grupos;
