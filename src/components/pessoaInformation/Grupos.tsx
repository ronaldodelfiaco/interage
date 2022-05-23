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
  id: number;
  id_pessoa: string;
  id_grupo_pertence: number;
  dtalteracao: string;
  dtinclusao: string;
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

  const heroku = `${herokuConfig}genericCRUD?id_usuario=${_user?.id}&token=${_user?.token}&table=pessoas_grupos&filter=id_pessoa=${idPessoa}`;

  const [editar, setEditar] = useState(false);

  useEffect(() => {
    axios
      .get(heroku)
      .then(({ data }: any) => {
        console.log(heroku);
        // setPessoa(data.body.rows[0]);
        setGruposPessoa(data.body.rows);
      })
      .catch((error) => {
        console.log(2, error);
        setGruposPessoa([]);
      });
  }, [heroku]);

  //Adiciona novos dados, no vetor de grupo
  useEffect(() => {
    if (newGrupo !== undefined) {
      if (!editar) {
        setGruposPessoa((prevGrupo) => [
          ...prevGrupo,
          {
            id: GruposPessoa.length,
            id_pessoa: idPessoa,
            id_grupo_pertence: newGrupo.id_grupo_pertence,
            dtalteracao: newGrupo.dtalteracao,
            dtinclusao: newGrupo.dtinclusao,
          },
        ]);
      } else {
        GruposPessoa.splice(
          newGrupo.id,
          1,
          newGrupo,
        );
        setEditar(false);
        setItemDados({
          id: -1,
          id_pessoa: '',
          id_grupo_pertence: -1,
          dtalteracao: '',
          dtinclusao: '',
        });
      }
    }
  }, [newGrupo]);

  const editarNumero = (id: number) => {
    setItemDados(GruposPessoa[id]);
    setOpenModalGrupo(true);
    setEditar(true);
    handleMoreClose();
  };

  const apagarNumero = (id: number) => {
    setGruposPessoa(GruposPessoa.splice(id, 0));
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
            <AddIconButton onClick={() => setOpenModalGrupo(true)} />
            <Grid ml="1rem">
              <Typography variant="h6">Adicionar</Typography>
              <Tiny color="secondary.400">novo grupo</Tiny>
            </Grid>
            <ModalGrupo
              open={openModalGrupo}
              setOpen={setOpenModalGrupo}
              setDadosAtributos={setNewGrupo}
              itemDados={itemDados}
              setItemDados={setItemDados}
            />
          </FlexBox>
        </Grid>
      </Grid>
    </Card>
  );
};

export default Grupos;
