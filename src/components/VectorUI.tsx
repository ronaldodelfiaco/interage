import { Grid } from '@mui/material';
import axios from 'axios';
import { Dispatch, FC, MouseEvent, SetStateAction, useState } from 'react';
import MoreOptions from './MoreOptions';

interface ListCardProps {
  item: any;
  handleMore: (event: MouseEvent<HTMLButtonElement>) => void;
  setID: (index: number) => void;
  index: number;
}

interface GenericVectorUProps {
  Array: Array<any>;
  setItem: Dispatch<SetStateAction<any>>;
  setEdit: Dispatch<SetStateAction<any>>;
  setOpenModal: Dispatch<SetStateAction<any>>;
  ListCard: FC<ListCardProps>;
  heroku?: string;
}

const GenericVectorUI: FC<GenericVectorUProps> = ({
  Array,
  setItem,
  setEdit,
  setOpenModal,
  ListCard,
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

    // Chamado para apagar visualmente.
    Erase();
    handleGenericMoreClose();
  };

  return (
    <>
      {Array.map((value, index) => (
        <Grid item xs={12} sm={6} key={value}>
          {/* Criar Generic ListCard */}
          <ListCard
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
        apagar={!heroku ? Erase : EraseHeroku}
      />
      {/* <Grid item xs={12} sm={6}>
         <FlexBox alignItems="center">
            <AddIconButton onClick={() => setOpenModal(true)} />
            <Box ml="1rem">
              <Typography variant="h6">Adicionar</Typography>
              <Tiny color="secondary.400">novo valor</Tiny>
            </Box>
          </FlexBox> 
      </Grid>*/}
    </>
  );
};

export default GenericVectorUI;
