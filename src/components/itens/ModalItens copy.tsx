import { Box, Button, Card, Modal } from '@mui/material';
import { useFormik } from 'formik';
import { Dispatch, FC } from 'react';
import LightTextField from '../LightTextField';
import FlexBox from '../FlexBox';
import DarkTextField from '../DarkTextField';
import { H6 } from '../Typography';

interface ModalItensProps {
  open: boolean;
  setOpen: Dispatch<React.SetStateAction<boolean>>;
  atributosProps: Array<string>;
  // openDados: Array<any>;
  // setDadosProps: Dispatch<React.SetStateAction<Array<any> >>;
  setDadosAtributos: Dispatch<React.SetStateAction<Array<any>>>;
  itemDados: Array<any>;
}

const ModalItens: FC<ModalItensProps> = ({
  open,
  setOpen,
  atributosProps,
  setDadosAtributos,
}) => {
  let objectAtributos = "{ "
  atributosProps.forEach((value) => {
    objectAtributos = objectAtributos + `"${value}" : "", `;
  })
  objectAtributos = objectAtributos.substring(0, objectAtributos.length - 2) + "}";
  const objectAtributos_ = JSON.parse( objectAtributos)

  const Values = "values.Nome"
  const initialValues = objectAtributos_
  // {
  //   nome: '',
  //   idade: '',
  // };

  const { values, errors, touched, handleChange, handleSubmit } = useFormik({
    initialValues,
    onSubmit: (values) => {
      console.log('values ', values);
      setOpen(false);
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
          {atributosProps.map((atributo, index) => (
          <FlexBox
            my="1.5rem"
            flexWrap="wrap"
            alignItems="center"
            justifyContent="space-between"
            key={index}
          >
             <H6 mb={1}>{atributo}</H6>
            <DarkTextField
              //value={`values.${atributo}`}
              fullWidth
              onChange={handleChange}
              name={atributo}
            />
          </FlexBox>
          ))}
          <FlexBox justifyContent="space-between" alignItems="center">
            <Button
              fullWidth
              type="submit"
              variant="contained"
            >
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

export default ModalItens;