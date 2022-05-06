import {
  Box,
  Button,
  Card,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import * as React from 'react';
import { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IMaskInput } from 'react-imask';
import * as Yup from 'yup';
import useTitle from '../../hooks/useTitle';
import FlexBox from '../FlexBox';
import LightTextField from '../LightTextField';
import LerPessoa from './LerDados';

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

const maskCPFCNPJ = React.forwardRef<HTMLElement, CustomProps>(
  function maskCPFCNPJ(props, ref) {
    const { onChange, ...other } = props;

    return (
      <IMaskInput
        {...other}
        mask="000.000.000-00"
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
  },
);

const maskDtNascimento = React.forwardRef<HTMLElement, CustomProps>(
  function maskDtNascimento(props, ref) {
    const { onChange, ...other } = props;

    return (
      <IMaskInput
        {...other}
        mask="[00]{/}[00]{/}[0000]"
        definitions={{
          '#': /[0-9]/,
        }}
        //InputRef = {ref}
        onAccept={(value: any) =>
          onChange({ target: { name: props.name, value } })
        }
        overwrite
      />
    );
  },
);

interface InformacoesPrincipaisProps {
  idPessoa: string | undefined;
}

interface IFormData {
  tipo: string;
  idPronomeTratamento: string;
  id_atividade: string;
  nome: string;
  apelidoFantasia: string;
  email: string;
  website: string;
  cpfCpj: string;
  rgIe: string;
  rgOrgaoemisssor: string;
  rgUf: string;
  rgVia: string;
  rgDtExpedicao: string;
  dataNascimento: string;
  observacoes: string;
  sexo: string;
  nacionalidade: string;
  estadoCivil: string;
  idEscolaridade: string;
  cnh: string;
  cnhValidade: string;
  status: boolean;
  cnhCategoria: string;
  idCidadeNatural: string;
}

const InformacoesPrincipais: FC<InformacoesPrincipaisProps> = ({
  idPessoa,
}) => {
  const { t } = useTranslation();
  const [idPronome, setPronome] = useState('1');

  // useEffect(() => {
  //   LerPessoa(idPessoa)
  //     .then((result): any => {
  //       setPessoa(result.pessoa);
  //     })
  //     .catch((error): any => {
  //       console.log('Error ', error);
  //       setPessoa([]);
  //     });
  // }, []);

  const initialValues: IFormData = {
    //name: data?.name || "",
    tipo: 'F',
    idPronomeTratamento: '', // F
    id_atividade: '', // F - profissão  J- atividade atividade comercail
    nome: '', // F- nome J - Razão Social
    apelidoFantasia: '', // F - aplido  J Nome de Fantasia
    email: '',
    website: '', // J
    cpfCpj: '', // F - CPF  J - CNPJ
    rgIe: '', // F Ristro geral    J -  inscrição estadual
    rgOrgaoemisssor: '', // F
    rgUf: '', //  F
    rgVia: '', //  F
    rgDtExpedicao: '', // F
    dataNascimento: '', // F
    observacoes: '',
    sexo: '', // F
    nacionalidade: '', // F
    estadoCivil: '', // F
    idEscolaridade: '', // F
    cnh: '', // F
    cnhValidade: '', // F
    status: true,
    cnhCategoria: '', // F
    idCidadeNatural: '', // F
  };

  const fieldValidationSchema = Yup.object().shape({
    nome: Yup.string()
      .min(3, 'Nome muito curto')
      .required('Campo obrigatório!'),
    cpfCpj: Yup.string().required('Campo obrigatório!'),
  });

  const formik = useFormik({
    initialValues,
    validationSchema: fieldValidationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const pronomes = [
    {
      id: '1',
      nome: 'Sr.',
    },
    {
      id: '2',
      nome: 'Sra.',
    },
    {
      id: '3',
      nome: 'Dr.',
    },
    {
      id: '4',
      nome: 'Dra.',
    },
  ];

  const pronomeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPronome(event.target.value);
  };

  if (idPessoa) useTitle('Editando: ' + formik.values.nome);
  else useTitle('Adicionando Pessoa');
  const router = useRouter();

  useEffect(() => {
    if (idPessoa) {
      LerPessoa(idPessoa).then((row: any) => {
        formik.setValues({
          tipo: row.pessoa.tipo,
          idPronomeTratamento: row.pessoa.id_pronome_tratamento,
          id_atividade: row.pessoa.id_atividade,
          nome: row.pessoa.nome,
          apelidoFantasia: row.pessoa.apelido_fantasia,
          email: row.pessoa.email,
          website: row.pessoa.website,
          cpfCpj: row.pessoa.cpf_cnpj,
          rgIe: row.pessoa.rg_ie,
          rgOrgaoemisssor: row.pessoa.rg_orgaoemissor,
          rgUf: row.pessoa.rg_uf,
          rgVia: row.pessoa.rg_via,
          rgDtExpedicao: row.pessoa.rg_dt_expedicao,
          dataNascimento: row.pessoa.datanascimento,
          observacoes: row.pessoa.observacoes,
          sexo: row.pessoa.sexo,
          nacionalidade: row.pessoa.nacionalidade,
          estadoCivil: row.pessoa.estadoCivil,
          idEscolaridade: row.pessoa.id_escolaridade,
          cnh: row.pessoa.cnh,
          cnhValidade: row.pessoa.cnh_validade,
          status: row.pessoa.status,
          cnhCategoria: row.pessoa.cnh_categoria,
          idCidadeNatural: row.pessoa.id_cidade_natural,
        });
      });
    }
  }, [idPessoa]);

  return (
    <Card sx={{ padding: '1.5rem', pb: '4rem' }}>
      <form onSubmit={formik.handleSubmit}>
        <FlexBox
          my="1.5rem"
          flexWrap="wrap"
          alignItems="center"
          justifyContent="space-between"
        >
          <Box my="1rem">
            <Typography variant="h6">Tipo de Pessoa</Typography>
            <RadioGroup
              row
              name="tipo"
              onChange={formik.handleChange}
              value={formik.values.tipo}
            >
              <FormControlLabel value="F" control={<Radio />} label="Física" />
              <FormControlLabel
                value="J"
                control={<Radio />}
                label="Jurídica"
              />
            </RadioGroup>
          </Box>
          <div>
            <TextField
              id="pronome"
              select
              label="Pronome"
              value={idPronome}
              onChange={pronomeChange}
              sx={{ width: 100 }}
            >
              {pronomes.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  {option.nome}
                </MenuItem>
              ))}
            </TextField>
          </div>
        </FlexBox>

        <Grid container spacing={4}>
          <Grid item xs={12} sm={6}>
            <LightTextField
              fullWidth
              name="nome"
              label="Nome"
              value={formik.values.nome}
              onChange={formik.handleChange}
              helperText={formik.touched.nome && formik.errors.nome}
              error={Boolean(formik.touched.nome && formik.errors.nome)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <LightTextField
              fullWidth
              name="apelidoFantasia"
              label="Apelido"
              onChange={formik.handleChange}
              value={formik.values.apelidoFantasia}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <LightTextField
              fullWidth
              name="cpfCpj"
              label="CPF"
              onChange={formik.handleChange}
              value={formik.values.cpfCpj}
              // helperText={formik.touched.cpfCpj && formik.errors.cpfCpj}
              // error={Boolean(formik.touched.cpfCpj && formik.errors.cpfCpj)}
              InputProps={{
                inputComponent: maskCPFCNPJ as any,
              }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <LightTextField
              fullWidth
              name="dataNascimento"
              label="Data de Nascimento"
              onChange={formik.handleChange}
              value={formik.values.dataNascimento}
              InputProps={{
                inputComponent: maskDtNascimento as any,
              }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <LightTextField
              fullWidth
              name="email"
              label="Email"
              onChange={formik.handleChange}
              value={formik.values.email}
            />
          </Grid>
        </Grid>
        <br />
        <br />
        <FlexBox justifyContent="space-between" alignItems="center">
          <Button
            variant="outlined"
            sx={{
              width: 124,
              color: 'text.disabled',
              borderColor: 'text.disabled',
            }}
            fullWidth
            onClick={() => router.back()}
          >
            {t('Cancel')}
          </Button>
          <Button
            fullWidth
            type="submit"
            variant="contained"
            sx={{ width: 124 }}
          >
            {t('Save')}
          </Button>
        </FlexBox>
      </form>
    </Card>
  );
};

export default InformacoesPrincipais;
