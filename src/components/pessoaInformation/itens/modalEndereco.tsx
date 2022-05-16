import {
  Autocomplete,
  Box,
  Button,
  Card,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  Modal
} from '@mui/material';
import axios from 'axios';
import { format } from 'date-fns';
import { Form, Formik } from 'formik';
import * as React from 'react';
import { Dispatch, FC } from 'react';
import { herokuConfig } from '../../../config';
import FlexBox from '../../FlexBox';
import LightTextField from '../../LightTextField';

type uf = {
  uf: string;
  nome: string;
  status: boolean;
};

type ufTable = {
  label: string;
  uf: string;
};

type cidade = {
  id: number;
  nome: string;
  uf_cidade: string;
  ddd_cidade: string;
  status: boolean;
};

interface ModalFilhoProps {
  open: boolean;
  setOpen: Dispatch<React.SetStateAction<boolean>>;
  setDadosAtributos: Dispatch<React.SetStateAction<any>>;
  setItemDados: Dispatch<React.SetStateAction<any>>;
  // openDados: Array<any>;
  // setDadosProps: Dispatch<React.SetStateAction<Array<any> >>;
  itemDados: any;
}

const modalTelefone: FC<ModalFilhoProps> = ({
  open,
  setOpen,
  setDadosAtributos,
  setItemDados,
  itemDados,
}) => {
  let user = localStorage.getItem('user');
  user = user === null ? '...' : user;
  const _user = JSON.parse(user);

  const initialValues = {
    id: 0 || itemDados?.id,
    id_pessoa: '' || itemDados?.id_pessoa,
    id_cidade: '' || itemDados?.id_cidade,
    cep: '' || itemDados?.cep,
    uf: '',
    logradouro: '' || itemDados?.logradouro,
    bairro: false || itemDados?.bairro,
    complemento: '' || itemDados?.complemento,
    recebe_correspondencia: '' || itemDados?.recebe_correspondencia,
    status: '+55' || itemDados?.status,
    dtalteracao: '' || itemDados?.dtalteracao,
    dtinclusao: '' || itemDados?.dtinclusao,
  };

  const tipoTelefone = [
    {
      label: 'Selecione',
      id: 0,
    },
    {
      label: 'Celular',
      id: 1,
    },
    {
      label: 'Comercial',
      id: 2,
    },
    {
      label: 'Trabalho',
      id: 3,
    },
    {
      label: 'Residencial',
      id: 4,
    },
    {
      label: 'Recado',
      id: 5,
    },
    {
      label: 'Fixo - 1',
      id: 6,
    },
    {
      label: 'Fixo - 1',
      id: 7,
    },
    {
      label: 'telefone_fixo',
      id: 8,
    },
    {
      label: 'telefone_celular',
      id: 9,
    },
    {
      label: 'telefone_celular_aux',
      id: 10,
    },
    {
      label: 'telefone_comercial',
      id: 11,
    },
  ];

  const herokuCidade = `${herokuConfig}genericCRUD?id_usuario=${_user?.id}&token=${_user?.token}&table=cidades`;
  const herokuUF = `${herokuConfig}genericCRUD?id_usuario=${_user?.id}&token=${_user?.token}&table=uf`;

  const [estado, setEstado] = React.useState<uf[]>([]);
  const [estadoTable, setEstadoTable] = React.useState<ufTable[]>([]);
  const [cidade, setCidade] = React.useState<cidade[]>([]);
  const [cidadeTable, setCidadeTable] = React.useState<ufTable[]>([]);

  React.useEffect(() => {
    axios
      .get(herokuUF)
      .then(({ data }: any) => {
        console.log(herokuUF);
        setEstado(data.body.rows);
      })
      .catch((error) => {
        console.log(2, error);
        setEstado([]);
      });
  }, [herokuUF]);

  React.useEffect(() => {
    axios
      .get(herokuCidade)
      .then(({ data }: any) => {
        console.log(herokuCidade);
        setCidade(data.body.rows);
      })
      .catch((error) => {
        console.log(2, error);
        setCidade([]);
      });
  }, [herokuCidade]);

  React.useEffect(() => {
    return setEstadoTable(estado.map((uf) => ({ label: uf.nome, uf: uf.uf })));
  }, [estado]);

  React.useEffect(() => {
    return setCidadeTable(
      cidade.map((uf) => ({ label: uf.nome, uf: uf.uf_cidade })),
    );
  }, [cidade]);

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
                <Autocomplete
                  fullWidth
                  id="uf"
                  options={estadoTable}
                  onChange={formikMeta.handleChange}
                  renderInput={(params) => (
                    <LightTextField
                      {...params}
                      label="Estado"
                      value={formikMeta.values.uf}
                    />
                  )}
                />
              </FlexBox>
              <FlexBox
                my="1.5rem"
                flexWrap="wrap"
                alignItems="center"
                justifyContent="space-between"
              >
                <Autocomplete
                  value={formikMeta.values.id_cidade}
                  fullWidth
                  id="id_cidade"
                  options={cidadeTable}
                  filterOptions={(options) => options.filter(option => {
                    let candidate = (option);
                    return candidate.uf === formikMeta.values.uf
                  })}
                  onChange={formikMeta.handleChange}
                  renderInput={(params) => (
                    <LightTextField {...params} label="Cidade" />
                  )}
                />
              </FlexBox>
              <FlexBox
                my="1.5rem"
                flexWrap="wrap"
                alignItems="center"
                justifyContent="space-between"
              >
                <LightTextField
                  label="cep"
                  value={formikMeta.values.cep}
                  fullWidth
                  onChange={formikMeta.handleChange}
                  name={'cep'}
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
                  label="logradouro"
                  value={formikMeta.values.logradouro}
                  fullWidth
                  onChange={formikMeta.handleChange}
                  name={'logradouro'}
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
                  label="bairro"
                  value={formikMeta.values.bairro}
                  fullWidth
                  onChange={formikMeta.handleChange}
                  name={'bairro'}
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
                  label="complemento"
                  value={formikMeta.values.complemento}
                  fullWidth
                  onChange={formikMeta.handleChange}
                  name={'complemento'}
                />
              </FlexBox>

              <FormControl>
                <FormGroup onChange={formikMeta.handleChange} row>
                  <FormControlLabel
                    value={formikMeta.values.recebe_correspondencia}
                    control={<Checkbox />}
                    label="Recebe Correspondencia"
                    name="recebe_correspondencia"
                  />
                </FormGroup>
              </FormControl>
              <FormControl>
                <FormGroup onChange={formikMeta.handleChange} row>
                  <FormControlLabel
                    value={formikMeta.values.status}
                    control={<Checkbox />}
                    label="status"
                    name="status"
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
                  onClick={() => {
                    setOpen(false);
                    setItemDados({
                      id: -1,
                      id_pessoa: '',
                      ddd: '',
                      telefone: '',
                      ramal: '',
                      principal: false,
                      id_tipo_telefone: 0,
                      contato: '',
                      ddi: '',
                      dtalteracao: '',
                      dtinclusao: '',
                    });
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
