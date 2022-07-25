import { Box, Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import AddIconButton from '../components/AddIconButton';
import FlexBox from '../components/FlexBox';
import ExemploVectorUI from '../components/VectorUI';
import GenericModal from '../components/itens/GenericModal';
import ListGeneric from '../components/ListGeneric';
import { Tiny } from '../components/Typography';

function VetorExemplo() {
  // Logica do Modal
  const [edit, setEdit] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [newGenericDados, setNewGenericDados] = useState();

  // Para o modo de edição caso o modal feche
  useEffect(() => {
    if (!openModal && edit) {
      setEdit(false);
    }
  }, [openModal]);

  const [itemDados, setItem] = useState<number>(0);

  const [Array, setArray] = useState([
    { nome: 'Banana', tipo: 'fruta', boolean: true, number: 0 },
    { nome: 'Couve', tipo: 'verdura', boolean: true, number: 0 },
    { nome: 'Repolho', tipo: 'vegetal', boolean: false, number: 4 },
    { nome: 'Brocoles', tipo: 'vegetal', boolean: false, number: 0 },
  ]);

  useEffect(() => {
    if (newGenericDados !== undefined) {
      if (!edit) {
        setArray((prevGeneric: any) => [...prevGeneric, newGenericDados]);
      } else {
        Array.forEach((Element) => {
          const index = Array.indexOf(Element);
          Array.splice(index, 1, newGenericDados);
          setEdit(false);
          setItem(0);
        });
      }
    }
  }, [newGenericDados]);

  return (
    <>
      <h1> Eventos </h1>
      {/* Gerencia informação do vetor */}
      <ExemploVectorUI
        Array={Array}
        setItem={setItem}
        setEdit={setEdit}
        setOpenModal={setOpenModal}
        ListCard={ListGeneric}
      />
      <Grid item xs={12} sm={6}>
        <FlexBox alignItems="center">
          <AddIconButton onClick={() => setOpenModal(true)} />
          <Box ml="1rem">
            <Typography variant="h6">Adicionar</Typography>
            <Tiny color="secondary.400">novo tipo</Tiny>
          </Box>
        </FlexBox>
      </Grid>
      <GenericModal
        open={openModal}
        setOpen={setOpenModal}
        setDadosAtributos={setNewGenericDados}
        itemDados={Array[itemDados]}
        editar={edit}
      />
    </>
  );
}

export default VetorExemplo;
