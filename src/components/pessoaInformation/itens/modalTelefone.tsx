import {
  Box,
  Button,
  Card,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputLabel,
  MenuItem,
  Modal,
  Select,
} from '@mui/material';
import { format } from 'date-fns';
import { Form, Formik } from 'formik';
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
  itemDados: any;
}

const modalTelefone: FC<ModalFilhoProps> = ({
  open,
  setOpen,
  setDadosAtributos,
  itemDados,
}) => {
  const [idTipoTelefone, setIdTipo] = React.useState<number>();

  const initialValues = {
    id: 0 || itemDados?.id,
    id_pessoa: '' || itemDados?.id_pessoa,
    ddd: '' || itemDados?.ddd,
    telefone: '' || itemDados?.telefone,
    ramal: '' || itemDados?.ramal,
    principal: false || itemDados?.principal,
    id_tipo_telefone: '' || itemDados?.id_tipo_telefone,
    contato: '' || itemDados?.contato,
    ddi: '+55' || itemDados?.ddi,
    dtalteracao: '' || itemDados?.dtalteracao,
    dtinclusao: '' || itemDados?.dtinclusao,
  };

  const tipoTelefone = [
    {
      nome: 'Celular',
      id: 1,
    },
    {
      nome: 'Comercial',
      id: 2,
    },
    {
      nome: 'Trabalho',
      id: 3,
    },
    {
      nome: 'Residencial',
      id: 4,
    },
    {
      nome: 'Recado',
      id: 5,
    },
    {
      nome: 'Fixo - 1',
      id: 6,
    },
    {
      nome: 'Fixo - 1',
      id: 7,
    },
    {
      nome: 'telefone_fixo',
      id: 8,
    },
    {
      nome: 'telefone_celular',
      id: 9,
    },
    {
      nome: 'telefone_celular_aux',
      id: 10,
    },
    {
      nome: 'telefone_comercial',
      id: 11,
    },
  ];

  // falta colocar o id, e o id_pessoa
  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, actions) => {
          setTimeout(() => {
            if (values.dtinclusao !== '') {
              values.dtalteracao = format(new Date(), 'dd-MM-yyyy HH:mm:ss');
            } else {
              values.dtinclusao = format(new Date(), 'dd-MM-yyyy HH:mm:ss');
            }
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
                  type="number"
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
                  type="number"
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
                  type="number"
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
              <FlexBox
                my="1.5rem"
                flexWrap="wrap"
                alignItems="center"
                justifyContent="space-between"
              >
                {/* <TextField
                  fullWidth
                  select
                  label="tipo de telefone"
                  onChange={formikMeta.handleChange}
                  value={formikMeta.values.id_tipo_telefone}
                >
                  <MenuItem key={''} value={''}>
                    Selecionar
                  </MenuItem>
                  {tipoTelefone.map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                      {option.nome}
                    </MenuItem>
                  ))}
                </TextField> */}
                <FormControl fullWidth>
                  <InputLabel id="tipoTelefone">tipo de telefone</InputLabel>
                  <Select
                    fullWidth
                    id="id_tipo_telefone"
                    value={formikMeta.values.id_tipo_telefone}
                    onChange={formikMeta.handleChange}
                    name="id_tipo_telefone"
                  >
                    {tipoTelefone.map((option) => (
                      <MenuItem value={option.id} key={option.id}>
                        {option.nome}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </FlexBox>
              <FormControl>
                <FormGroup onChange={formikMeta.handleChange} row>
                  <FormControlLabel
                    control={<Checkbox />}
                    label="principal"
                    name="principal"
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
