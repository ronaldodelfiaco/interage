import {
  Box,
  Button,
  Card,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  MenuItem,
  Modal
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

type FormValues = {
  id: number;
  id_pessoa: string;
  id_cidade: number;
  cep: string;
  uf: string;
  logradouro: string;
  bairro: string;
  complemento: string;
  recebe_correspondencia: boolean;
  status: boolean;
  dtalteracao: string;
  dtinclusao: string;
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

  // controla cidade e estado
  const [cidade, setCidade] = React.useState<cidade[]>([]);
  const [cidadeID, setCidadeID] = React.useState(0);
  const [estado, setEstado] = React.useState<uf[]>([]);
  const [CEP, setCepInfo] = React.useState<CEPInfo>();

  const initialValues: FormValues = {
    id: 0 || itemDados?.id,
    id_pessoa: '' || itemDados?.id_pessoa,
    id_cidade: 0 || itemDados?.id_cidade,
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
        setOpen(false);
        setDadosAtributos(values);
        console.log(values);
      }, 1000);
    },
  });

  // Busca cidades e estado disponivel do banco de dados

  const herokuUF = `${herokuConfig}genericCRUD?id_usuario=${_user?.id}&token=${_user?.token}&table=uf`;
  const herokuCidade = `${herokuConfig}genericCRUD?id_usuario=${_user?.id}&token=${_user?.token}&table=cidades`;

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
  }, [Formik.values.cep]);

  React.useEffect(() => {
    if (CEP) {
      cidade.map((item) => {
        if (CEP.localidade === item.nome && CEP.uf === item.uf_cidade) {
          setCidadeID(item.id);
        }
      });
      Formik.values.logradouro = CEP.logradouro;
      Formik.values.complemento = CEP.complemento;
      Formik.values.bairro = CEP.bairro;
    }
  }, [CEP]);

  React.useEffect(() => {
    if (CEP) {
      Formik.values.uf = CEP.uf;
      console.log(Formik.values.uf);
    }
    Formik.values.id_cidade = cidadeID;
  }, [cidadeID]);

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
              helperText={Formik.touched.logradouro && Formik.errors.logradouro}
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
              helperText={Formik.touched.bairro && Formik.errors.bairro}
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
