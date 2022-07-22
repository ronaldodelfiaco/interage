import { useEffect, useState } from 'react';
import GenericVectorUI from '../components/GenericVectorUI';
import GenericModal from '../components/itens/GenericModal';

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
      <GenericVectorUI
        Array={Array}
        setItem={setItem}
        setEdit={setEdit}
        setOpenModal={setOpenModal}
      />
      <GenericModal
        open={openModal}
        setOpen={setOpenModal}
        setDadosAtributos={setNewGenericDados}
        itemDados={Array[itemDados]}
        editar={edit}
      />
    </>
  );
};

export default VetorExemplo;
