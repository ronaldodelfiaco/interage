import {
  Box,
  Button,
  Card,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  Typography
} from "@mui/material";
import { useFormik } from "formik";
import { FC } from "react";
import * as Yup from "yup";
import LightTextField from "../components/LightTextField";
import MaskCPFCNPJ from "../components/masks/maskCPFCNPJ";
import MaskDt from "../components/masks/maskDt";
// O Lag vem do Radio e do Checkbox

const teste: FC = () => {
  const initialValues = {
    cpf: "",
    nome: "",
    dataNascimento: "",
    estadoCivil: "",
    naturalidade: "",
    nomeEsposa: "",
    tempoCasado: "",
    idadeEsposa: "",
    profissaoEsposa: "",
    esposaUsuaria: [],
    estadoCivilPais: "",
    paisVivos: [],
    nomePai: "",
    idadePai: "",
    profissaoPai: "",
    nomeMae: "",
    idadeMae: "",
    profissaoMae: "",
    moraQuem: "",
    enderecoAtual: "",
    bairroAtual: "",
    cidadeAtual: "",
    profissao: "",
    localFuncao: "",
    afastado: "",
    escolaridade: "",
    motivoAbandono: "",
    drogasAlcool: "",
    usaQuaisDrogas: [],
    idadeAlcool: "",
    idadeMaconha: "",
    idadeCocainaI: "",
    idadeCocainaA: "",
    idadeCrack: "",
    idadeComprimido: "",
    idadeLSD: "",
    idadeInalantes: "",
    idadeMesclado: "",
    idadeTabaco: "",
    idadeOutras: "",
    quaisOutras: "",
    motivoInicio: "",
    tipodroga: "",
    observacoes: "",
    periodoAbstinencia: "",
    situacoesUso: [],
    observacoesB: "",
    familiaUsaDrogas: "",
    familiaGrauParentesco: "",
    temNamorada: "",
    namoradaNome: "",
    namoradaTempo: "",
    namoradaUsaDrogas: "",
    namoradaDrogaTipo: "",
    comoSeSenteNoUso: "",
    mudancasComportamento: "",
    prejuisoUso: "",
    comoFinanciaUso: "",
    lugaresUso: "",
    percebeuProblemaUso: "",
    tempoSemUso: "",
    comoEstaVida: "",
    relacionamentoFamiliar: "",
    comQuemMora: "",
    apoioFamiliarTratamento: "",
    relacionamentoPai: "",
    relacionamentoMae: "",
    relacionamentoIrmao: "",
    relacionamentoEsposo: "",
    relacionamentoFilhos: "",
    relacionamentoSocial: "",
    periodoSono: "",
    temPesadelos: "",
    observacaoGeral: "",
    alimentecao: "",
    temAlucinacao: "",
    qtdTipoAlucinacaoDroga: "",
    alucinacaoSemDrogas: "",
    qtdTipoAlucinacao: "",
    tipoAlucinacao: "",
    descricaoAlucinacao: "",
    desmaioComDrogas: "",
    qndTipoDrogaDesmaio: "",
    desmaioSemDrogas: "",
    qndDesmaio: "",
    desmaioDescricao: "",
    temOverdose: "",
    qtdTipoDrogaOverdose: "",
    tomaRemedio: "",
    sobreRemedio: "",
    sintomasAnteriores: [],
    outroSintomasAnteriores: "",
    acidentes: "",
    cirurgias: "",
    tratamentosAnteriores: "",
    consideraDependente: "",
    consideraDependenteJustificativa: "",
    motivoProcuraInstituicao: "",
    expectaviaTratamento: "",
    problemaJustica: "",
    temProcesso: "",
    porqueProblemaJustica: "",
  };

  const fieldValidationSchema = Yup.object().shape({
    nome: Yup.string()
      .min(3, "Nome muito curto")
      .required("Campo obrigatório!"),
    cpf: Yup.string().min(14, "CPF muito curto").required("Campo obrigatório!"),
  });

  const { values, touched, errors, handleChange, handleSubmit } = useFormik({
    initialValues,
    validationSchema: fieldValidationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <Card sx={{ padding: "1.5rem", pb: "4rem" }}>
      <form onSubmit={handleSubmit}>
        <Box
          display="flex"
          my="1.5rem"
          flexWrap="wrap"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="h5">Identificação</Typography>
        </Box>
        <Card sx={{ padding: 3, pb: 4 }}>
          <Box
            display="flex"
            my="1.5rem"
            flexWrap="wrap"
            alignItems="center"
            justifyContent="space-between"
          >
            <MaskCPFCNPJ
              value={values.cpf}
              onChange={handleChange}
              name="cpf"
              label="cpf ou cnpj"
              helperText={touched.cpf && errors.cpf}
              error={Boolean(touched.cpf && errors.cpf)}
            />
          </Box>
          <Box
            display="flex"
            my="1.5rem"
            flexWrap="wrap"
            alignItems="center"
            justifyContent="space-between"
          >
            <LightTextField
              fullWidth
              name="nome"
              label="Nome"
              value={values.nome}
              onChange={handleChange}
              helperText={touched.nome && errors.nome}
              error={Boolean(touched.nome && errors.nome)}
            />
          </Box>
          <Box
            display="flex"
            my="1.5rem"
            flexWrap="wrap"
            alignItems="center"
            justifyContent="space-between"
          >
            <MaskDt
              value={values.dataNascimento}
              onChange={handleChange}
              label="Data de Nascimento"
              name="dataNascimento"
            />
          </Box>
          <Box
            display="flex"
            my="1.5rem"
            flexWrap="wrap"
            alignItems="center"
            justifyContent="space-between"
          >
            <LightTextField
              fullWidth
              name="naturalidade"
              label="Naturalidade"
              value={values.naturalidade}
              onChange={handleChange}
            />
          </Box>
          <Box display="flex" my="1rem">
            <FormControl>
              <FormLabel>{"Estado Civil"}</FormLabel>
              <RadioGroup row name="estadoCivil" onChange={handleChange}>
                <FormControlLabel
                  value="Solteiro"
                  control={<Radio />}
                  label={"Solteiro (a)"}
                />
                <FormControlLabel
                  value="Casado"
                  control={<Radio />}
                  label={"Casado (a)"}
                />
                <FormControlLabel
                  value="Amasiado"
                  control={<Radio />}
                  label={"Amasiado (a)"}
                />
                <FormControlLabel
                  value="Viuvo"
                  control={<Radio />}
                  label={"Viúvo (a)"}
                />
                <FormControlLabel
                  value="Separado"
                  control={<Radio />}
                  label={"Separado (a)"}
                />
                <FormControlLabel
                  value="Desquitado"
                  control={<Radio />}
                  label={"Desquitado (a)"}
                />
                <FormControlLabel
                  value="Divorciado"
                  control={<Radio />}
                  label={"Divorciado (a)"}
                />
              </RadioGroup>
            </FormControl>
          </Box>
        </Card>
        <Box
          display="flex"
          my="1.5rem"
          flexWrap="wrap"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="h5">Esposo(a)</Typography>
        </Box>
        <Card sx={{ padding: 3, pb: 4 }}>
          <Box
            display="flex"
            my="1.5rem"
            flexWrap="wrap"
            alignItems="center"
            justifyContent="space-between"
          >
            <LightTextField
              fullWidth
              name="nomeEsposa"
              label="Nome da (o) esposa (o)"
              value={values.nomeEsposa}
              onChange={handleChange}
            />
          </Box>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6}>
              <LightTextField
                fullWidth
                name="tempoCasado"
                label="Tempo de Casado"
                value={values.tempoCasado}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <LightTextField
                fullWidth
                name="idadeEsposa"
                label="Idade do(a) esposo(a)"
                value={values.idadeEsposa}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
          <Box
            display="flex"
            my="1.5rem"
            flexWrap="wrap"
            alignItems="center"
            justifyContent="space-between"
          >
            <LightTextField
              fullWidth
              name="profissaoEsposa"
              label="Profissão do(a) Esposo(a)"
              value={values.profissaoEsposa}
              onChange={handleChange}
            />
          </Box>
          <Box display="flex" my="1rem">
            <FormControl>
              <FormLabel>Usuária (o)</FormLabel>
              <FormGroup row onChange={handleChange}>
                <FormControlLabel
                  control={<Checkbox />}
                  label="álcool"
                  value="UsuariaAlcool"
                  name="esposaUsuaria"
                />
                <FormControlLabel
                  control={<Checkbox />}
                  label="drogas"
                  value="UsuariaDrogas"
                  name="esposaUsuaria"
                />
                <FormControlLabel
                  control={<Checkbox />}
                  label="tabaco"
                  value="UsuariaTabaco"
                  name="esposaUsuaria"
                />
              </FormGroup>
            </FormControl>
          </Box>
        </Card>
        <Button type="submit">Enviar</Button>
      </form>
    </Card>
  );
};

export default teste;
