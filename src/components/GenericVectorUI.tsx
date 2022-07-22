import { Box, Card, Grid, Typography } from '@mui/material';
import axios from 'axios';
import {
  Dispatch,
  FC,
  MouseEvent,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import AddIconButton from './AddIconButton';
import FlexBox from './FlexBox';
import GenericModal from './itens/GenericModal';
import ListGeneric from './ListGeneric';
import MoreOptions from './MoreOptions';
import { Tiny } from './Typography';

interface GenericVectorUProps {
  Array: Array<any>;
  setItem: Dispatch<SetStateAction<any>>;
  setEdit: Dispatch<SetStateAction<any>>;
  setOpenModal: Dispatch<SetStateAction<any>>;
  heroku?: string;
}

const GenericVectorUI: FC<GenericVectorUProps> = ({
  Array,
  setItem,
  setEdit,
  setOpenModal,
  heroku,
}) => {
  // MoreOptions
  const [idEdit, setIdEdit] = useState(0);
  const [genericEl, setGenericEl] = useState<null | HTMLElement>(null);
  const handleGenericMoreOpen = (event: MouseEvent<HTMLButtonElement>) => {
    setGenericEl(event.currentTarget);
  };
  const handleGenericMoreClose = () => setGenericEl(null);

  // Logica de Editar
  const Edit = () => {
    setItem(idEdit);
    setEdit(true), setOpenModal(true);
    handleGenericMoreClose();
  };

  // Logica de apagar
  const Erase = () => {
    Array.splice(idEdit, 1);
    handleGenericMoreClose();
  };

  // Caso necessario apagar do banco
  const EraseHeroku = () => {
    axios
      .delete(heroku + '&id=' + Array[idEdit].id)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
    handleGenericMoreClose();
  };

  return (
    <Card sx={{ padding: 3, pb: 4 }}>
      <Grid container spacing={3} pt={3}>
        {Array.map((value, index) => (
          <Grid item xs={12} sm={6} key={value}>
            {/* Criar Generic ListCard */}
            <ListGeneric
              setID={setIdEdit}
              index={index}
              item={value}
              handleMore={handleGenericMoreOpen}
            />
          </Grid>
        ))}
        <MoreOptions
          id={idEdit}
          anchorEl={genericEl}
          handleMoreClose={handleGenericMoreClose}
          editar={Edit}
          apagar={!heroku? Erase: EraseHeroku}
        />
        <Grid item xs={12} sm={6}>
          <FlexBox alignItems="center">
            <AddIconButton onClick={() => setOpenModal(true)} />
            <Box ml="1rem">
              <Typography variant="h6">Adicionar</Typography>
              <Tiny color="secondary.400">novo valor</Tiny>
            </Box>
          </FlexBox>
        </Grid>
      </Grid>
    </Card>
  );
};

export default GenericVectorUI;
