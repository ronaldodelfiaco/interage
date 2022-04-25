import { CameraAlt } from '@mui/icons-material';
import {
  Box,
  Button,
  Card,
  Grid,
  IconButton,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { parseJSON } from 'date-fns/esm';
import { useFormik } from 'formik';
import * as React from 'react';
import { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IMaskInput } from 'react-imask';
import * as Yup from 'yup';
import FlexBox from '../FlexBox';
import LightTextField from '../LightTextField';
import { H5, Tiny } from '../Typography';
import UkoAvatar from '../UkoAvatar';
import { herokuConfig } from '../../config';
import useAuth from '../../hooks/useAuth';
import { StyledBadge } from './StyledComponent';
import axios from 'axios';
import { useRouter } from 'next/router';
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
  idPessoa: string ;
}

const InformacoesPrincipais: FC<InformacoesPrincipaisProps> = ({
  idPessoa,
}) => {
  const { t } = useTranslation();
  const [idPronome, setPronome] = useState('1');
  const [pessoa, setPessoa] = useState({});

  useEffect(() => {
   
    LerPessoa(idPessoa)
      .then(( result ) : any => {
        setPessoa(result?.pessoa);
      })
      .catch((error) : any => {
        console.log('Error ', error)
        setPessoa([]);
      });



  }, []);

  const initialValues = {
    //name: data?.name || "",
    tipo: pessoa?.tipo || 'F',
    idPronomeTratamento: pessoa?.id_pronome_tratamento || '', // F
    id_atividade: pessoa?.id_atividade || '', // F - profissão  J- atividade atividade comercail
    nome: pessoa?.nome || '', // F- nome J - Razão Social
    apelidoFantasia: pessoa?.apelido_fantasia || '', // F - aplido  J Nome de Fantasia
    email: pessoa?.email || '',
    website: pessoa?.website || '', // J
    cpfCpj: pessoa?.cpf_cnpj || '', // F - CPF  J - CNPJ
    rgIe: pessoa?.rg_ie || '', // F Ristro geral    J -  inscrição estadual
    rgOrgaoemisssor: pessoa?.rg_orgaoemissor || '', // F
    rgUf: pessoa?.rg_uf || '', //  F
    rgVia: pessoa?.rg_via || '', //  F
    rgDtExpedicao: pessoa?.rg_dt_expedicao || '', // F
    dataNascimento: pessoa?.datanascimento || '', // F
    observacoes: pessoa?.observacoes || '',
    sexo: pessoa?.sexo || '', // F
    nacionalidade: pessoa?.nacionalidade || '', // F
    estadoCivil: pessoa?.estado_civil || '', // F
    idEscolaridade: pessoa?.id_escolaridade || '', // F
    cnh: pessoa?.cnh || '', // F
    cnhValidade: pessoa?.cnh_validade || '', // F
    status: pessoa?.status || true,
    cnhCategoria: pessoa?.cnh_categoria || '', // F
    idCidadeNatural: pessoa?.id_cidade_natural || '', // F
  };

  const fieldValidationSchema = Yup.object().shape({
    nome: Yup.string()
      .min(3, 'Nome muito curto')
      .required('Campo obrigatório!'),
    cpfCpj: Yup.string().required('Campo obrigatório!'),
  });

  const { values, errors, touched, handleChange, handleSubmit } = useFormik({
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

  const router = useRouter();

  return (
    <Card sx={{ padding: '1.5rem', pb: '4rem' }}>
      <form onSubmit={handleSubmit}>
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
              name="tipoPessoa"
              defaultValue="F"
              //onChange={handleChange}
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
              value={pessoa?.nome}
              onChange={handleChange}
              helperText={touched.nome && errors.nome}
              error={Boolean(touched.nome && errors.nome)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <LightTextField
              fullWidth
              name="apelidoFantasia"
              label="Apelido"
              value={values.apelidoFantasia}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <LightTextField
              fullWidth
              name="cpfCpj"
              label="CPF"
              value={values.cpfCpj}
              // onChange={handleChange}
              //helperText={touched.cpfCpj && errors.cpfCpj}
              // error={Boolean(touched.cpfCpj && errors.cpfCpj)}
              // InputProps={{
              //   inputComponent: maskCPFCNPJ as any,
              // }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <LightTextField
              fullWidth
              name="dataNascimento"
              label="Data de Nascimento"
              value={values.dataNascimento}
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
              value={values.email}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            {idPessoa}
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
