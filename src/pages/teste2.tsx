import {
  Box,
  Button,
  Card,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Radio,
  RadioGroup,
  Typography,
  Grid,
} from "@mui/material";
import { FastField, Field, Form, Formik, useFormik } from "formik";
import { FC, useEffect, useState } from "react";
import LightTextField from "../components/LightTextField";
import MaskCPFCNPJ from "../components/masks/maskCPFCNPJ";
import MaskDt from "../components/masks/maskDt";
import * as Yup from "yup";
import MoreOptions from "../components/MoreOptions";
import ListCard from "../components/itens/ListCard";
import AddIconButton from "../components/AddIconButton";
import ModalFilho from "../components/itens/ModalFilho";
import { Tiny } from "../components/Typography";

type filho = {
  idPessoa: Number;
  idRelacionamento: Number;
  nome: string;
  idade: Number;
};

const teste: FC = () => {
  const [openModalFilho, setOpenModalFilho] = useState(false);
  const [openModalIrmao, setOpenModalIrmao] = useState(false);

  const [filhos, setFilhos] = useState<filho[]>([]);
  var filho1: filho[];

  const [irmaos, setIrmaos] = useState<irmao[]>([]);
  var irmao1: irmao[];

  const [newFilhoDados, setNewFilhoDados] = useState<filho>();
  const [newIrmaoDados, setNewIrmaoDados] = useState<irmao>();

  useEffect(() => {
    filho1 = [];
    setFilhos(filho1);
    irmao1 = [];
    setIrmaos(irmao1);
  }, []);

  useEffect(() => {
    if (newFilhoDados !== undefined) {
      filho1 = filhos;
      filho1.push({
        idPessoa: 0,
        idRelacionamento: 3,
        nome: newFilhoDados.nome,
        idade: newFilhoDados.idade,
      });
      setFilhos(filho1);
      //filhos.push(filho1[0])
    }
  }, [newFilhoDados]);

  useEffect(() => {
    if (newIrmaoDados !== undefined) {
      irmao1 = irmaos;
      irmao1.push({
        idPessoa: 0,
        idRelacionamento: 3,
        nome: newIrmaoDados.nome,
        idade: newIrmaoDados.idade,
      });
      setIrmaos(irmao1);
      //filhos.push(irmao1[0])
    }
  }, [newIrmaoDados]);

  const [skillEl, setSkillEl] = useState<null | HTMLElement>(null);
  const handleSkillMoreOpen = (event: MouseEvent<HTMLButtonElement>) => {
    console.log("Clique!!", skillEl);
    setSkillEl(event.currentTarget);
  };
  const handleSkillMoreClose = () => setSkillEl(null);

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

  // const { values, touched, errors, handleChange, handleSubmit } = useFormik({
  //   initialValues,
  //   validationSchema: fieldValidationSchema,
  //   onSubmit: (values) => {
  //     const JSONdata = JSON.stringify(values);
  //     console.log(JSONdata);
  //   },
  // });

  return (
    <Card sx={{ padding: "1.5rem", pb: "4rem" }}>
      <Formik
        initialValues={initialValues}
        validationSchema={fieldValidationSchema}
        onSubmit={(values, actions) => {
          setTimeout(() => {
            const JSONdata = JSON.stringify(values);
            console.log(JSONdata);
            actions.setSubmitting(false);
          }, 1000);
        }}
      >
        {(formikMeta) => (
          <Form>
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
              <FastField name="cpf">
                {() => (
                  <Box
                    display="flex"
                    my="1.5rem"
                    flexWrap="wrap"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <MaskCPFCNPJ
                      value={formikMeta.values.cpf}
                      onChange={formikMeta.handleChange}
                      name="cpf"
                      label="cpf ou cnpj"
                      helperText={
                        formikMeta.touched.cpf && formikMeta.errors.cpf
                      }
                      error={Boolean(
                        formikMeta.touched.cpf && formikMeta.errors.cpf
                      )}
                    />
                  </Box>
                )}
              </FastField>
              <FastField name="nome">
                {() => (
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
                      value={formikMeta.values.nome}
                      onChange={formikMeta.handleChange}
                      helperText={
                        formikMeta.touched.nome && formikMeta.errors.nome
                      }
                      error={Boolean(
                        formikMeta.touched.nome && formikMeta.errors.nome
                      )}
                    />
                  </Box>
                )}
              </FastField>
              <FastField name="dataNascimento">
                {() => (
                  <Box
                    display="flex"
                    my="1.5rem"
                    flexWrap="wrap"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <MaskDt
                      value={formikMeta.values.dataNascimento}
                      onChange={formikMeta.handleChange}
                      label="Data de Nascimento"
                      name="dataNascimento"
                    />
                  </Box>
                )}
              </FastField>
              <FastField name="naturalidade">
                {() => (
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
                      value={formikMeta.values.naturalidade}
                      onChange={formikMeta.handleChange}
                    />
                  </Box>
                )}
              </FastField>
              <FastField name="estadoCivil">
                {() => (
                  <Box display="flex" my="1rem">
                    <FormControl>
                      <FormLabel>Estado Civil</FormLabel>
                      <RadioGroup
                        row
                        name="estadoCivil"
                        onChange={formikMeta.handleChange}
                      >
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
                )}
              </FastField>
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
              <FastField name="nomeEsposa">
                {() => (
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
                      value={formikMeta.values.nomeEsposa}
                      onChange={formikMeta.handleChange}
                    />
                  </Box>
                )}
              </FastField>
              <Grid container spacing={4}>
                <FastField name="tempoCasado">
                  {() => (
                    <Grid item xs={12} sm={6}>
                      <LightTextField
                        fullWidth
                        name="tempoCasado"
                        label="Tempo de Casado"
                        value={formikMeta.values.tempoCasado}
                        onChange={formikMeta.handleChange}
                      />
                    </Grid>
                  )}
                </FastField>
                <FastField name="idadeEsposa">
                  {() => (
                    <Grid item xs={12} sm={6}>
                      <LightTextField
                        fullWidth
                        name="idadeEsposa"
                        label="Idade do(a) esposo(a)"
                        value={formikMeta.values.idadeEsposa}
                        onChange={formikMeta.handleChange}
                      />
                    </Grid>
                  )}
                </FastField>
              </Grid>{" "}
              <FastField name="profissaoEsposa">
                {() => (
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
                      value={formikMeta.values.profissaoEsposa}
                      onChange={formikMeta.handleChange}
                    />
                  </Box>
                )}
              </FastField>
              <FastField name="esposaUsuaria">
                {() => (
                  <Box display="flex" my="1rem">
                    <FormControl>
                      <FormLabel>Usuária (o)</FormLabel>
                      <FormGroup row onChange={formikMeta.handleChange}>
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
                )}
              </FastField>
            </Card>
            <Box
              display="flex"
              my="1.5rem"
              flexWrap="wrap"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography variant="h5">Filho</Typography>
            </Box>
            <div>
              <Card sx={{ padding: 3, pb: 4 }}>
                <Grid container spacing={3} pt={3}>
                  {filhos.map((value, index) => (
                    <Grid item xs={12} sm={6} key={index}>
                      <ListCard item={value} handleMore={handleSkillMoreOpen} />
                    </Grid>
                  ))}

                  <MoreOptions
                    anchorEl={skillEl}
                    handleMoreClose={handleSkillMoreClose}
                    pessoa={filhos}
                  />

                  <Grid item xs={12} sm={6}>
                    <Box display={"flex"} alignItems="center">
                      <AddIconButton onClick={() => setOpenModalFilho(true)} />
                      <Box ml="1rem">
                        <Typography variant="h6">Adicionar</Typography>
                        <Tiny color="secondary.400">novo Filho(a)</Tiny>
                      </Box>
                      <ModalFilho
                        open={openModalFilho}
                        setOpen={setOpenModalFilho}
                        setDadosAtributos={setNewFilhoDados}
                        itemDados={newFilhoDados}
                      />
                    </Box>
                  </Grid>
                </Grid>
              </Card>
            </div>
            <Box
              display="flex"
              my="1.5rem"
              flexWrap="wrap"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography variant="h5">Endereço</Typography>
            </Box>
            <Card sx={{ padding: 3, pb: 4 }}>
              <FastField name="moraQuem">
                {() => (
                  <Box
                    display="flex"
                    my="1.5rem"
                    flexWrap="wrap"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <LightTextField
                      fullWidth
                      name="moraQuem"
                      label="Com quem mora atualmente?"
                      value={formikMeta.values.moraQuem}
                      onChange={formikMeta.handleChange}
                    />
                  </Box>
                )}
              </FastField>
              <Grid container spacing={4}>
                <FastField name="enderecoAtual">
                  {() => (
                    <Grid item xs={12} sm={6}>
                      <LightTextField
                        fullWidth
                        name="enderecoAtual"
                        label="Endereço atual"
                        value={formikMeta.values.enderecoAtual}
                        onChange={formikMeta.handleChange}
                      />
                    </Grid>
                  )}
                </FastField>
                <FastField name="bairroAtual">
                  {() => (
                    <Grid item xs={12} sm={6}>
                      <LightTextField
                        fullWidth
                        name="bairroAtual"
                        label="Bairro"
                        value={formikMeta.values.bairroAtual}
                        onChange={formikMeta.handleChange}
                      />
                    </Grid>
                  )}
                </FastField>
              </Grid>
              <FastField name="cidadeAtual">
                {() => (
                  <Box
                    display="flex"
                    my="1.5rem"
                    flexWrap="wrap"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <LightTextField
                      fullWidth
                      name="cidadeAtual"
                      label="Cidade"
                      value={formikMeta.values.cidadeAtual}
                      onChange={formikMeta.handleChange}
                    />
                  </Box>
                )}
              </FastField>
            </Card>
            <Button type="submit">Enviar</Button>
          </Form>
        )}
      </Formik>
    </Card>
  );
};

export default teste;
