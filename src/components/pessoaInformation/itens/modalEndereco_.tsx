import {
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
import Router from 'next/router';
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
  itemDados: any;
  editar: boolean;
  // setItemDados: Dispatch<React.SetStateAction<any>>;
  // openDados: Array<any>;
  // setDadosProps: Dispatch<React.SetStateAction<Array<any> >>;
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

type Endereco = {
  id: number;
  id_pessoa: number;
  id_cidade: number;
  cep: string;
  logradouro: string;
  bairro: string;
  complemento?: string;
  recebe_correspondencia: boolean;
  status: boolean;
  dtalteracao: string;
  dtinclusao: string;
};

type uf = {
  uf: string;
  nome: string;
  status: boolean;
};

type cidade = {
  id: number;
  nome: string;
  uf_cidade: string;
  ddd_cidade: string;
  status: boolean;
};

const modalTelefone: FC<ModalFilhoProps> = ({
  editar,
  open,
  itemDados,
  setOpen,
  setDadosAtributos,
  // setItemDados,
}) => {
  let user = localStorage.getItem('user');
  user = user === null ? '...' : user;
  const _user = JSON.parse(user);
  const { id } = Router.query;
  const [idPessoa, setPessoa] = React.useState<number>(
    typeof id === 'string' ? parseInt(id) : 0,
  );
  // controla cidade e estado
  const [cidade, setCidade] = React.useState<cidade[]>([]);
  // const [cidadeID, setCidadeID] = React.useState(0);
  const [estado, setEstado] = React.useState<uf[]>([]);
  // const [CEP, setCepInfo] = React.useState<CEPInfo>();
  const herokuUF = `${herokuConfig}genericCRUD?id_usuario=${_user?.id}&token=${_user?.token}&table=uf`;
  const herokuCidade = `${herokuConfig}genericCRUD?id_usuario=${_user?.id}&token=${_user?.token}&table=cidades`;

  React.useEffect(() => {
    setPessoa(typeof id === 'string' ? parseInt(id) : 0);
  }, [id]);

  const initialValues = {
    id: 0,
    id_pessoa: idPessoa,
    id_cidade: 0,
    cep: '',
    logradouro: '',
    bairro: '',
    complemento: '',
    status: false,
    recebe_correspondencia: false,
    dtalteracao: '',
    dtinclusao: '',
    uf: '',
  };

  const fieldValidationSchema = Yup.object().shape({
    cep: Yup.string()
      .min(9, 'cep incompleto')
      .required('Campo obrigatório!')
      .max(9, 'cep incorreto'),
    logradouro: Yup.string().required('Campo obrigatório!'),
    bairro: Yup.string().required('Campo obrigatório!'),
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
        const valoresBanco = {
          id_pessoa: values.id_pessoa,
          id_cidade: values.id_cidade,
          cep: values.cep.replace('-', ''),
          logradouro: values.logradouro,
          bairro: values.bairro,
          complemento: values.complemento,
          status: values.status,
          recebe_correspondencia: values.recebe_correspondencia,
          dtalteracao: values.dtalteracao,
          dtinclusao: values.dtinclusao,
        };
        setOpen(false);
        setDadosAtributos(valoresBanco);
        console.log(values);
      }, 1000);
    },
  });

  React.useEffect(() => {
    editar
      ? typeof itemDados === 'undefined'
        ? console.error('Nada Envidado para o modal para editar')
        : Formik.setValues({
            id: itemDados.id,
            id_pessoa: idPessoa,
            id_cidade: itemDados.id_cidade,
            cep: itemDados.cep,
            logradouro: itemDados.logradouro,
            bairro: itemDados.bairro,
            complemento: itemDados.complemento,
            status: itemDados.status,
            recebe_correspondencia: itemDados.recebe_correspondencia,
            dtalteracao: itemDados.dtalteracao,
            dtinclusao: itemDados.dtinclusao,
            uf: '',
          })
      : Formik.setValues({
          id: 0,
          id_pessoa: 0,
          id_cidade: 0,
          cep: '',
          logradouro: '',
          bairro: '',
          complemento: '',
          recebe_correspondencia: false,
          status: false,
          dtalteracao: '',
          dtinclusao: '',
          uf: '',
        });
  }, [itemDados]);

  // Busca cidades e estado disponivel do banco de dados

  React.useEffect(() => {
    axios
      .get(herokuUF)
      .then(({ data }: any) => {
        setEstado(data.body.rows);
      })
      .catch((error) => {
        console.error(2, error);
        setEstado([]);
      });
  }, [herokuUF]);

  React.useEffect(() => {
    axios
      .get(herokuCidade)
      .then(({ data }: any) => {
        setCidade(data.body.rows);
      })
      .catch((error) => {
        console.error(2, error);
        setCidade([]);
      });
  }, [herokuCidade]);

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
            <FormControl fullWidth>
              <LightTextField
                select
                label="Estado"
                value={Formik.values.uf}
                onChange={Formik.handleChange}
                name="uf"
                helperText={Formik.touched.uf && Formik.errors.uf}
                error={Boolean(Formik.touched.uf && Formik.errors.uf)}
              >
                {estado.map((item) => (
                  <MenuItem value={item.uf}>{item.nome}</MenuItem>
                ))}
              </LightTextField>
            </FormControl>
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
                label="Cidade"
                value={Formik.values.id_cidade}
                onChange={Formik.handleChange}
                name="id_cidade"
              >
                {cidade.map((item) =>
                  Formik.values.uf !== '' ? (
                    item.uf_cidade === Formik.values.uf ? (
                      <MenuItem value={item.id}>{item.nome}</MenuItem>
                    ) : null
                  ) : (
                    <MenuItem value={item.id}>{item.nome}</MenuItem>
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
            <LightTextField
              label="logradouro"
              value={Formik.values.logradouro}
              fullWidth
              onChange={Formik.handleChange}
              name={'logradouro'}
              // helperText={Formik.touched.logradouro && Formik.errors.logradouro}
              error={Boolean(
                Formik.touched.logradouro && Formik.errors.logradouro,
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
              label="bairro"
              value={Formik.values.bairro}
              fullWidth
              onChange={Formik.handleChange}
              name={'bairro'}
              // helperText={Formik.touched.bairro && Formik.errors.bairro}
              error={Boolean(Formik.touched.bairro && Formik.errors.bairro)}
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
      </form>
    </Modal>
  );
};
export default modalTelefone;
