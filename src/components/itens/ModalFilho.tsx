import { Box, Button, Card, Modal } from '@mui/material';
import { useFormik } from 'formik';
import { Dispatch, FC } from 'react';
import LightTextField from '../LightTextField';
import FlexBox from '../FlexBox';

interface ModalFilhoProps {
  open: boolean;
  setOpen: Dispatch<React.SetStateAction<boolean>>;
  // openDados: Array<any>;
  // setDadosProps: Dispatch<React.SetStateAction<Array<any> >>;
  itemDados: any;
  setDadosAtributos: any;
}

const ModalFilho: FC<ModalFilhoProps> = ({
  open,
  setOpen,
  setDadosAtributos,
}) => {
  // const Values = 'values.NomeFilho';
  const initialValues = {
    nome: '',
    idade: '',
  };

  const { values, handleChange, handleSubmit } = useFormik({
    initialValues,
    onSubmit: (values) => {
      console.log('values ', values);
      setDadosAtributos(values), setOpen(false);
    },
  });

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <form onSubmit={handleSubmit}>
        <Card
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            boxShadow: 1,
            p: 4,
          }}
        >
          <FlexBox
            my="1.5rem"
            flexWrap="wrap"
            alignItems="center"
            justifyContent="space-between"
          >
            <LightTextField
              label="Nome do Filho(a)"
              value={values.nome}
              fullWidth
              onChange={handleChange}
              name={'nome'}
            />
          </FlexBox>
          <FlexBox
            my="1.5rem"
            flexWrap="wrap"
            alignItems="center"
            justifyContent="space-between"
          >
            <LightTextField
              label="Idade do Filho(a)"
              value={values.idade}
              fullWidth
              onChange={handleChange}
              name={'idade'}
            />
          </FlexBox>
          <FlexBox justifyContent="space-between" alignItems="center">
            <Button fullWidth type="submit" variant="contained">
              Enviar
            </Button>
            <Box width={40} />
            <Button
              variant="contained"
              fullWidth
              onClick={() => setOpen(false)}
            >
              Cancelar
            </Button>
          </FlexBox>
        </Card>
      </form>
    </Modal>
  );
};

export default ModalFilho;
