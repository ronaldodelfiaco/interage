import {
  Autocomplete,
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
import axios from 'axios';
import { format } from 'date-fns';
import { Form, Formik, useFormik } from 'formik';
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
  id: string;
};

type cidadeTable = {
  label: string;
  id: number;
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
    uf: '' || itemDados?.uf,
    logradouro: '' || itemDados?.logradouro,
    bairro: '' || itemDados?.bairro,
    complemento: '' || itemDados?.complemento,
    recebe_correspondencia: false || itemDados?.recebe_correspondencia,
    status: false || itemDados?.status,
    dtalteracao: '' || itemDados?.dtalteracao,
    dtinclusao: '' || itemDados?.dtinclusao,
  };

  const Formik = useFormik({
    initialValues: initialValues,
    onSubmit: (values) => {
      setTimeout(() => {
        if (values.dtinclusao !== '') {
          values.dtalteracao = format(new Date(), 'dd-MM-yyyy HH:mm:ss');
        } else {
          values.dtinclusao = format(new Date(), 'dd-MM-yyyy HH:mm:ss');
        }
        setDadosAtributos(values), setOpen(false);
      }, 1000);
    },
  });

  const [herokuCidade, setHerokuCidade] = React.useState('');

  const herokuUF = `${herokuConfig}genericCRUD?id_usuario=${_user?.id}&token=${_user?.token}&table=uf`;
  React.useEffect(() => {
    setHerokuCidade(
      `${herokuConfig}genericCRUD?id_usuario=${_user?.id}&token=${_user?.token}&table=cidades&filter=uf_cidade=\'${Formik.values.uf}\'`,
    );
  }, [Formik.values.uf]);
  console.log(Formik.values.uf);
  console.log(herokuCidade);

  const [estado, setEstado] = React.useState<uf[]>([]);
  const [estadoTable, setEstadoTable] = React.useState<ufTable[]>([]);
  const [cidade, setCidade] = React.useState<cidade[]>([]);
  const [cidadeTable, setCidadeTable] = React.useState<cidadeTable[]>([]);

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
    setEstadoTable(estado.map((uf) => ({ label: uf.nome, id: uf.uf })));
  }, [estado]);

  React.useEffect(() => {
    setCidadeTable(cidade.map((uf) => ({ label: uf.nome, id: uf.id })));
  }, [cidade]);

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <form onSubmit={Formik.handleSubmit}>
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
          <FormControl fullWidth>
            <InputLabel id="estadoLabel">Estado</InputLabel>
            <Select
              labelId="estadoLabel"
              label="Estado"
              value={Formik.values.uf}
              name="uf"
              id="uf"
              onChange={Formik.handleChange}
            >
              {estadoTable.map((item) => (
                <MenuItem value={item.id}>{item.label}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <br />
          <br />
          <FormControl fullWidth>
            <InputLabel id="cidadeLabel">Cidade</InputLabel>
            <Select
              labelId="cidadeLabel"
              label="Cidade"
              value={Formik.values.id_cidade}
              name="id_cidade"
              id="id_cidade"
              onChange={Formik.handleChange}
            >
              {cidadeTable.map((item) => (
                <MenuItem value={item.id}>{item.label}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FlexBox
            my="1.5rem"
            flexWrap="wrap"
            alignItems="center"
            justifyContent="space-between"
          >
            <LightTextField
              label="cep"
              value={Formik.values.cep}
              fullWidth
              onChange={Formik.handleChange}
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
              value={Formik.values.logradouro}
              fullWidth
              onChange={Formik.handleChange}
              name={'logradouro'}
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
              value={Formik.values.bairro}
              fullWidth
              onChange={Formik.handleChange}
              name={'bairro'}
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
              value={Formik.values.complemento}
              fullWidth
              onChange={Formik.handleChange}
              name={'complemento'}
            />
          </FlexBox>

          <FormControl>
            <FormGroup onChange={Formik.handleChange} row>
              <FormControlLabel
                value={Formik.values.recebe_correspondencia}
                control={<Checkbox />}
                label="Recebe Correspondencia"
                name="recebe_correspondencia"
              />
            </FormGroup>
          </FormControl>
          <FormControl>
            <FormGroup onChange={Formik.handleChange} row>
              <FormControlLabel
                value={Formik.values.status}
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
                  id_cidade: '',
                  cep: '',
                  uf: '',
                  logradouro: '',
                  bairro: '',
                  complemento: '',
                  recebe_correspondencia: false,
                  status: false,
                  dtalteracao: '',
                  dtinclusao: '',
                });
              }}
            >
              Cancelar
            </Button>
          </FlexBox>
        </Card>
      </form>
    </Modal>
  );
};

export default modalTelefone;
