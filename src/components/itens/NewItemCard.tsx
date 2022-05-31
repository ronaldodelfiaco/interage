import { Box } from '@mui/material';
import AddIconButton from '../AddIconButton';
import FlexBox from '../FlexBox';
import { H6, Tiny } from '../Typography';
import { Dispatch, FC, useEffect, useState } from 'react';
import ModalItens from './ModalItens';

interface newItensProps {
  nameItem: string;
  nameAtributos: Array<string>;
  setDadosAtributos: Dispatch<React.SetStateAction<Array<any>>>;
  itemDados: Array<any>;
}


const NewItemCard: FC<newItensProps> = (newItensProps) => {
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    console.log(1, newItensProps.nameAtributos);
    console.log(2, newItensProps.itemDados )
  }, []);

  return (
    <FlexBox alignItems="center">
      <AddIconButton onClick={() => setOpenModal(true)} />
      <Box ml="1rem">
        <H6>Adicionar</H6>
        <Tiny color="secondary.400">novo {newItensProps.nameItem}</Tiny>
      </Box>
      <ModalItens
        open={openModal}
        setOpen={setOpenModal}
        atributosProps={newItensProps.nameAtributos}
        //  openDados={dados} setDadosProps = {setDados}
        setDadosAtributos={newItensProps.setDadosAtributos}
        itemDados={newItensProps.itemDados}
      />
    </FlexBox>
  );
};

export default NewItemCard;