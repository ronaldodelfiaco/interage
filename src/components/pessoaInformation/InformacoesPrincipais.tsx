import {
  Box,
  Button,
  Card,
  CircularProgress,
  Grid,
  MenuItem,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { format, parseISO } from 'date-fns';
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
import LerPessoa, { adicionarPessoa, atualizarPessoa } from './LerDados';

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

const maskCPF = React.forwardRef<HTMLElement, CustomProps>(function maskCPFCNPJ(
  props,
  ref,
) {
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
});

const maskCNPJ = React.forwardRef<HTMLElement, CustomProps>(
  function maskCPFCNPJ(props, ref) {
    const { onChange, ...other } = props;

    return (
      <IMaskInput
        {...other}
        mask="00.000.000/0000-00"
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
  idPessoa: string;
}

interface IFormData {
  tipo: string;
  id_pronome_tratamento: string;
  id_atividade: string;
  nome: string;
  apelido_fantasia: string;
  email: string;
  website: string;
  cpf_cnpj: string;
  rg_ie: string;
  rg_orgaoemissor: string;
  rg_uf: string;
  rg_via: string;
  rg_dt_expedicao: string;
  datanascimento: string;
  observacoes: string;
  sexo: string;
  nacionalidade: string;
  estado_civil: string;
  id_escolaridade: string;
  cnh: string;
  cnh_validade: string;
  status: boolean;
  cnh_categoria: string;
  id_cidade_natural: string;
  dtinclusao: string;
  dtalteracao: string;
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
  //       console.error('Error ', error);
  //       setPessoa([]);
  //     });
  // }, []);

  const initialValues: IFormData = {
    //name: data?.name || "",
    tipo: 'F',
    id_pronome_tratamento: '', // F
    id_atividade: '', // F - profissão  J- atividade atividade comercail
    nome: '', // F- nome J - Razão Social
    apelido_fantasia: '', // F - aplido  J Nome de Fantasia
    email: '',
    website: '', // J
    cpf_cnpj: '', // F - CPF  J - CNPJ
    rg_ie: '', // F Ristro geral    J -  inscrição estadual
    rg_orgaoemissor: '', // F
    rg_uf: '', //  F
    rg_via: '', //  F
    rg_dt_expedicao: '', // F
    datanascimento: '', // F
    observacoes: '',
    sexo: '', // F
    nacionalidade: '', // F
    estado_civil: '', // F
    id_escolaridade: '', // F
    cnh: '', // F
    cnh_validade: '', // F
    status: true,
    cnh_categoria: '', // F
    id_cidade_natural: '', // F
    dtinclusao: '',
    dtalteracao: '',
  };

  const fieldValidationSchema = Yup.object().shape({
    nome: Yup.string()
      .min(3, 'Nome muito curto')
      .required('Campo obrigatório!'),
    cpf_cnpj: Yup.string().required('Campo obrigatório!'),
  });

  const formik = useFormik({
    initialValues,
    validationSchema: fieldValidationSchema,
    onSubmit: (values) => {
      if (values.dtinclusao === '' || values.dtinclusao === null) {
        values.dtinclusao = format(new Date(), 'dd-MM-yyyy HH:MI:ss');
      } else {
        values.dtinclusao = format(
          new Date(parseISO(values.dtinclusao)),
          'dd-MM-yyyy HH:MI:ss',
        );
        values.dtalteracao = format(new Date(), 'dd-MM-yyyy');
      }
      !idPessoa
        ? adicionarPessoa(values)
        : atualizarPessoa(values, parseInt(idPessoa));
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

  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    if (idPessoa) {
      LerPessoa(idPessoa).then((row: any) => {
        formik.setValues({
          nome: row.pessoa.nome,
          tipo: row.pessoa.tipo,
          id_pronome_tratamento: row.pessoa.id_pronome_tratamento,
          id_atividade: row.pessoa.id_atividade,
          apelido_fantasia: row.pessoa.apelido_fantasia,
          email: row.pessoa.email,
          website: row.pessoa.website,
          cpf_cnpj: row.pessoa.cpf_cnpj,
          rg_ie: row.pessoa.rg_ie,
          rg_orgaoemissor: row.pessoa.rg_orgaoemissor,
          rg_uf: row.pessoa.rg_uf,
          rg_via: row.pessoa.rg_via,
          rg_dt_expedicao: row.pessoa.rg_dt_expedicao,
          datanascimento: format(
            new Date(row.pessoa.datanascimento),
            'dd/MM/yyyy HH:mi:ss',
          ),
          observacoes: row.pessoa.observacoes,
          sexo: row.pessoa.sexo,
          nacionalidade: row.pessoa.nacionalidade,
          estado_civil: row.pessoa.estado_civil,
          id_escolaridade: row.pessoa.id_escolaridade,
          cnh: row.pessoa.cnh,
          cnh_validade: row.pessoa.cnh_validade,
          status: row.pessoa.status,
          cnh_categoria: row.pessoa.cnh_categoria,
          id_cidade_natural: row.pessoa.id_cidade_natural,
          dtalteracao: row.pessoa.dtalteracao,
          dtinclusao: row.pessoa.dtinclusao,
        });
      });
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [idPessoa]);

  return (
    <Card sx={{ padding: '1.5rem', pb: '4rem' }}>
      {isLoading ? (
        <Stack
          justifyContent="center"
          sx={{ color: 'grey.500' }}
          spacing={2}
          direction="row"
          alignContent="center"
        >
          <CircularProgress />
        </Stack>
      ) : (
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
                <FormControlLabel
                  value="F"
                  control={<Radio />}
                  label="Física"
                />
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
                name="apelido_fantasia"
                label="Apelido"
                onChange={formik.handleChange}
                value={formik.values.apelido_fantasia}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <LightTextField
                fullWidth
                name="cpf_cnpj"
                label="CPF ou CNPJ"
                value={formik.values.cpf_cnpj}
                onChange={formik.handleChange}
                helperText={formik.touched.cpf_cnpj && formik.errors.cpf_cnpj}
                error={Boolean(
                  formik.touched.cpf_cnpj && formik.errors.cpf_cnpj,
                )}
                InputProps={
                  formik.values.tipo === 'F'
                    ? {
                        inputComponent: maskCPF as any,
                      }
                    : {
                        inputComponent: maskCNPJ as any,
                      }
                }
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <LightTextField
                fullWidth
                name="datanascimento"
                label="Data de Nascimento"
                onChange={formik.handleChange}
                value={formik.values.datanascimento}
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
            <Grid item xs={12} sm={6}>
              <LightTextField
                fullWidth
                name="website"
                label="Website"
                onChange={formik.handleChange}
                value={formik.values.website}
              />
            </Grid>
          </Grid>
          <br />
          <br />
          <FlexBox justifyContent="space-between" alignItems="center">
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
      )}
    </Card>
  );
};

export default InformacoesPrincipais;
