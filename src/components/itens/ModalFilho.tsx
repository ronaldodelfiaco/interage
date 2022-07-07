import { Box, Button, Card, Modal } from '@mui/material';
import { Form, Formik } from 'formik';
import * as React from 'react';
import { Dispatch, FC, Ref } from 'react';
import FlexBox from '../FlexBox';
import LightTextField from '../LightTextField';

interface ModalFilhoProps {
  open: boolean;
  setOpen: Dispatch<React.SetStateAction<boolean>>;
  setDadosAtributos: Dispatch<React.SetStateAction<any>>;
  // openDados: Array<any>;
  // setDadosProps: Dispatch<React.SetStateAction<Array<any> >>;
  editar: boolean;
  itemDados: any;
}

const ModalFilho: FC<ModalFilhoProps> = ({
  open,
  setOpen,
  setDadosAtributos,
  editar,
  itemDados,
}) => {
  // const Values = 'values.nome';
  const initialValues = editar
    ? {
        nome: itemDados?.nome,
        idade: itemDados?.idade,
      }
    : {
        nome: '',
        idade: '',
      };

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, actions) => {
          setTimeout(() => {
            setDadosAtributos(values), setOpen(false);
            actions.setSubmitting(false);
          }, 1000);
        }}
      >
        {(formikMeta) => (
          <Form>
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
                  value={formikMeta.values.nome}
                  fullWidth
                  onChange={formikMeta.handleChange}
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
                  value={formikMeta.values.idade}
                  fullWidth
                  onChange={formikMeta.handleChange}
                  name={'idade'}
                />
              </FlexBox>
              <FlexBox justifyContent="space-between" alignItems="center">
                <Button fullWidth type="submit" variant="contained">
                  Salvar
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
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default ModalFilho;
