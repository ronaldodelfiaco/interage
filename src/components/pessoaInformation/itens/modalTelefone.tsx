import { Label } from '@mui/icons-material';
import {
  Box,
  Button,
  Card,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Typography,
} from '@mui/material';
import { format } from 'date-fns';
import { Form, Formik } from 'formik';
import Router from 'next/router';
import * as React from 'react';
import { Dispatch, FC } from 'react';
import FlexBox from '../../FlexBox';
import LightTextField from '../../LightTextField';

interface ModalTelefoneProps {
  open: boolean;
  setOpen: Dispatch<React.SetStateAction<boolean>>;
  setDadosAtributos: Dispatch<React.SetStateAction<any>>;
  // openDados: Array<any>;
  // setDadosProps: Dispatch<React.SetStateAction<Array<any> >>;
  editar: boolean;
  itemDados: any;
}

const modalTelefone: FC<ModalTelefoneProps> = ({
  open,
  setOpen,
  setDadosAtributos,
  editar,
  itemDados,
}) => {
  const { id } = Router.query;
  const idPessoa = typeof id === 'string' ? parseInt(id) : null;

  const initialValues = editar
    ? {
        id: itemDados?.id,
        id_pessoa: idPessoa,
        ddd: itemDados?.ddd,
        telefone: itemDados?.telefone,
        ramal: itemDados?.ramal,
        principal: itemDados?.principal,
        id_tipo_telefone: itemDados?.id_tipo_telefone,
        contato: itemDados?.contato,
        ddi: itemDados?.ddi,
        dtalteracao: itemDados?.dtalteracao,
        dtinclusao: itemDados?.dtinclusao,
      }
    : {
        id_pessoa: idPessoa,
        ddd: '',
        telefone: '',
        ramal: '',
        principal: false,
        id_tipo_telefone: '',
        contato: '',
        ddi: '+55',
        dtalteracao: '',
        dtinclusao: '',
      };

  const tipoTelefone = [
    {
      nome: 'Selecione',
      id: 0,
    },
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
              values.dtalteracao = format(new Date(), 'dd/MM/yyyy HH:m:ss');
              values.dtinclusao = format(
                new Date(values.dtinclusao),
                'dd/MM/yyyy HH:m:ss',
              );
            } else {
              values.dtinclusao = format(new Date(), 'dd/MM/yyyy HH:m:ss');
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
                <FormControl fullWidth>
                  <LightTextField
                    select
                    label="tipo de telefone"
                    value={formikMeta.values.id_tipo_telefone}
                    fullWidth
                    id="id_tipo_telefone"
                    onChange={formikMeta.handleChange}
                    name="id_tipo_telefone"
                  >
                    {tipoTelefone.map((option) => (
                      <MenuItem value={option.id} key={option.id}>
                        {option.nome}
                      </MenuItem>
                    ))}
                  </LightTextField>
                </FormControl>
              </FlexBox>
              <Checkbox
                checked={formikMeta.values.principal}
                value={formikMeta.values.principal}
                name="principal"
                id="principal"
                onChange={formikMeta.handleChange}
              />
              <FormLabel id="principal">Principal</FormLabel>
              <FlexBox justifyContent="space-between" alignItems="center">
                <Button fullWidth type="submit" variant="contained">
                  Salvar
                </Button>
                <Box width={40} />
                <Button
                  variant="contained"
                  fullWidth
                  onClick={() => {
                    setOpen(false);
                  }}
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
