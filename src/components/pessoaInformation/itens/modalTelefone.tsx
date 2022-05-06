import {
  Box,
  Modal,
  Card,
  Button,
  FormControl,
  FormGroup,
  Checkbox,
  FormControlLabel,
} from '@mui/material';
import { Formik, Form } from 'formik';
import * as React from 'react';
import { Dispatch, FC } from 'react';
import FlexBox from '../../FlexBox';
import LightTextField from '../../LightTextField';

interface ModalFilhoProps {
  open: boolean;
  setOpen: Dispatch<React.SetStateAction<boolean>>;
  setDadosAtributos: Dispatch<React.SetStateAction<any>>;
  // openDados: Array<any>;
  // setDadosProps: Dispatch<React.SetStateAction<Array<any> >>;
  // itemDados: any;
}

interface IFormData {
  id: number;
  id_pessoa: number;
  ddd: number;
  telefone: number;
  ramal: number;
  principal: boolean;
  id_tipo_telefone: number;
  contato: string;
  ddi: string;
  dtalteracao: string;
  dtinclusao: string;
}

const modalTelefone: FC<ModalFilhoProps> = ({
  open,
  setOpen,
  setDadosAtributos,
}) => {
  const initialValues: IFormData = {
    id: 0,
    id_pessoa: 0,
    ddd: 0,
    telefone: 0,
    ramal: 0,
    principal: false,
    id_tipo_telefone: 0,
    contato: '',
    ddi: '',
    dtalteracao: '',
    dtinclusao: '',
  };

  // falta colocar o id, e o id_pessoa
  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, actions) => {
          setTimeout(() => {
            console.log(values);
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
                  label="ddi"
                  value={formikMeta.values.ddi}
                  fullWidth
                  onChange={formikMeta.handleChange}
                  name={'ddi'}
                />
              </FlexBox>
              <FlexBox
                my="1.5rem"
                flexWrap="wrap"
                alignItems="center"
                justifyContent="space-between"
              >
                <LightTextField
                  label="ddd"
                  value={formikMeta.values.ddd}
                  fullWidth
                  onChange={formikMeta.handleChange}
                  name={'ddd'}
                />
              </FlexBox>
              <FlexBox
                my="1.5rem"
                flexWrap="wrap"
                alignItems="center"
                justifyContent="space-between"
              >
                <LightTextField
                  label="telefone"
                  value={formikMeta.values.telefone}
                  fullWidth
                  onChange={formikMeta.handleChange}
                  name={'telefone'}
                />
              </FlexBox>
              <FlexBox
                my="1.5rem"
                flexWrap="wrap"
                alignItems="center"
                justifyContent="space-between"
              >
                <LightTextField
                  label="ramal"
                  value={formikMeta.values.ramal}
                  fullWidth
                  onChange={formikMeta.handleChange}
                  name={'ramal'}
                />
              </FlexBox>
              <FlexBox
                my="1.5rem"
                flexWrap="wrap"
                alignItems="center"
                justifyContent="space-between"
              >
                <LightTextField
                  label="contato"
                  value={formikMeta.values.contato}
                  fullWidth
                  onChange={formikMeta.handleChange}
                  name={'contato'}
                />
              </FlexBox>
              <FormControl>
                <FormGroup onChange={formikMeta.handleChange} row>
                  <FormControlLabel
                    control={<Checkbox />}
                    label="principal"
                    value="principal"
                    name="sintomasAnteriores"
                  />
                </FormGroup>
              </FormControl>

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
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default modalTelefone;
