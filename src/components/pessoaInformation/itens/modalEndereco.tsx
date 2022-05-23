import {
  Autocomplete,
  Box,
  Button,
  Card,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  MenuItem,
  Modal,
} from '@mui/material';
import axios from 'axios';
import { format } from 'date-fns';
import { useFormik } from 'formik';
import * as React from 'react';
import { Dispatch, FC } from 'react';
import { IMaskInput } from 'react-imask';
import * as Yup from 'yup';
import { herokuConfig } from '../../../config';
import FlexBox from '../../FlexBox';
import LightTextField from '../../LightTextField';

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

interface ModalFilhoProps {
  open: boolean;
  setOpen: Dispatch<React.SetStateAction<boolean>>;
  setDadosAtributos: Dispatch<React.SetStateAction<any>>;
  setItemDados: Dispatch<React.SetStateAction<any>>;
  // openDados: Array<any>;
  // setDadosProps: Dispatch<React.SetStateAction<Array<any> >>;
  itemDados: any;
}

const maskCEP = React.forwardRef<HTMLElement, CustomProps>(function maskCPFCNPJ(
  props,
  ref,
) {
  const { onChange, ...other } = props;

  return (
    <IMaskInput
      {...other}
      mask="00000-000"
      definitions={{
        '#': /[1-9]/,
      }}
      //InputRef = {ref}
      onAccept={(value: any) =>
        onChange({ target: { name: props.name, value } })
      }
      overwrite
    />
  );
});

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
  uf: string;
};

type cidade = {
  id: number;
  nome: string;
  uf_cidade: string;
  ddd_cidade: string;
  status: boolean;
};

type CEPInfo = {
  cep: string;
  uf: string;
  localidade: string;
  logradouro: string;
  complemento: string;
  bairro: string;
};

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

  // const [herokuCidade, setHerokuCidade] = React.useState('');
  const [estado, setEstado] = React.useState<uf[]>([]);
  const [estadoTable, setEstadoTable] = React.useState<ufTable[]>([]);
  const [cidade, setCidade] = React.useState<cidade[]>([]);
  const [cidadeTable, setCidadeTable] = React.useState<cidadeTable[]>([]);

  const [cepInfo, setCepInfo] = React.useState<CEPInfo>();
  const [cidadeAtual, setCidadeAtual] = React.useState(0);
  const [estadoAtual, setEstadoAtual] = React.useState('');

  const initialValues = {
    id: 0 || itemDados?.id,
    id_pessoa: '' || itemDados?.id_pessoa,
    id_cidade: 0 || cidadeAtual || itemDados?.id_cidade,
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

  const fieldValidationSchema = Yup.object().shape({
    cep: Yup.string()
      .min(9, 'cep incompleto')
      .required('Campo obrigatório!')
      .max(9, 'cep incorreto'),
  });

  const Formik = useFormik({
    initialValues: initialValues,
    validationSchema: fieldValidationSchema,
    onSubmit: async (values) => {
      setTimeout(() => {
        if (values.dtinclusao !== '') {
          values.dtalteracao = format(new Date(), 'dd-MM-yyyy HH:mm:ss');
        } else {
          values.dtinclusao = format(new Date(), 'dd-MM-yyyy HH:mm:ss');
        }
        setOpen(false);
        setDadosAtributos(values);
      }, 1000);
    },
  });

  // Abre somente na primeira vez, apaga tudo que tiver dentro do modal

  React.useEffect(() => {
    if (itemDados)
      Formik.setValues({
        id: '' || itemDados.id,
        id_pessoa: '' || itemDados.id_pessoa,
        id_cidade: '' || itemDados.id_cidade,
        cep: '' || itemDados.cep,
        logradouro: '' || itemDados.logradouro,
        uf: '' || itemDados.uf,
        bairro: '' || itemDados.bairro,
        complemento: '' || itemDados.complemento,
        recebe_correspondencia: '' || itemDados.recebe_correspondencia,
        status: '' || itemDados.status,
        dtalteracao: '' || itemDados.dtalteracao,
        dtinclusao: '' || itemDados.dtinclusao,
      });
    else {
      setItemDados({
        id: '',
        id_pessoa: '',
        id_cidade: '',
        cep: '',
        logradouro: '',
        uf: '',
        bairro: '',
        complemento: '',
        recebe_correspondencia: '',
        status: '',
        dtalteracao: '',
        dtinclusao: '',
      });
    }
  }, []);

  // Busca cidades e estado disponivel do banco de dados

  const herokuUF = `${herokuConfig}genericCRUD?id_usuario=${_user?.id}&token=${_user?.token}&table=uf`;
  const herokuCidade = `${herokuConfig}genericCRUD?id_usuario=${_user?.id}&token=${_user?.token}&table=cidades`;

  // Cidade dinamica diretamente do react
  // React.useEffect(() => {
  //   setHerokuCidade(
  //     `${herokuConfig}genericCRUD?id_usuario=${_user?.id}&token=${_user?.token}&table=cidades&filter=uf_cidade=\'${Formik.values.uf}\'`,
  //   );
  // }, [Formik.values.uf]);

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
    setCidadeTable(
      cidade.map((uf) => ({ label: uf.nome, id: uf.id, uf: uf.uf_cidade })),
    );
  }, [cidade]);

  // Preenchimento automatico com o CEP

  React.useEffect(() => {
    if (Formik.values.cep) {
      axios
        .get(`https://viacep.com.br/ws/${Formik.values.cep}/json`)
        .then((response: any) => {
          setCepInfo(response.data);
        })
        .catch(function (error) {
          console.warn(error);
        });
    }
    setTimeout(() => {
      cidadeTable.map((object) => {
        if (cepInfo) {
          if (object.label === cepInfo.localidade) {
            setCidadeAtual(object.id);
          }
        }
      });
      if (cepInfo) {
        Formik.values.id_cidade = cidadeAtual;
        Formik.values.uf = `${cepInfo.uf}`;
        Formik.values.logradouro = `${cepInfo.logradouro}`;
        Formik.values.complemento = `${cepInfo.complemento}`;
        Formik.values.bairro = `${cepInfo.bairro}`;
      }
    }, 1000);
  }, [Formik.values.cep]);

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
          <FlexBox
            my="1.5rem"
            flexWrap="wrap"
            alignItems="center"
            justifyContent="space-between"
          >
            <FormControl fullWidth>
              <LightTextField
                select
                label="Estado"
                value={Formik.values.uf}
                name="uf"
                id="uf"
                onChange={Formik.handleChange}
              >
                {estadoTable.map((item) => (
                  <MenuItem value={item.id}>{item.label}</MenuItem>
                ))}
              </LightTextField>
            </FormControl>
            {/* <Autocomplete
              disablePortal
              id="estado"
              options={estadoTable}
              fullWidth
              onChange={Formik.handleChange}
              value={Formik.values.uf}
              renderInput={(params) => (
                <LightTextField {...params} label="Estado" />
              )}
            /> */}
          </FlexBox>
          <FlexBox
            my="1.5rem"
            flexWrap="wrap"
            alignItems="center"
            justifyContent="space-between"
          >
            {/* <Autocomplete
              disablePortal
              id="cidade"
              options={cidadeTable}
              fullWidth
              onChange={Formik.handleChange}
              value={Formik.values.id_cidade}
              renderInput={(params) => (
                <LightTextField {...params} label="Cidade" />
              )}
            /> */}
            <FormControl fullWidth>
              <LightTextField
                select
                label="Cidade"
                value={Formik.values.id_cidade}
                name="id_cidade"
                id="id_cidade"
                onChange={Formik.handleChange}
              >
                {cidadeTable.map((item) =>
                  Formik.values.uf !== '' ? (
                    item.uf === Formik.values.uf ? (
                      <MenuItem value={item.id}>{item.label}</MenuItem>
                    ) : null
                  ) : (
                    <MenuItem value={item.id}>{item.label}</MenuItem>
                  ),
                )}
              </LightTextField>
            </FormControl>
          </FlexBox>
          <FlexBox
            my="1.5rem"
            flexWrap="wrap"
            alignItems="center"
            justifyContent="space-between"
          >
            {/* https://viacep.com.br/ */}
            <LightTextField
              label="cep"
              value={Formik.values.cep}
              fullWidth
              onChange={Formik.handleChange}
              name={'cep'}
              helperText={Formik.touched.cep && Formik.errors.cep}
              error={Boolean(Formik.touched.cep && Formik.errors.cep)}
              InputProps={{
                inputComponent: maskCEP as any,
              }}
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
                  id_cidade: 0,
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
