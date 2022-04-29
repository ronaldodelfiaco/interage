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
  Typography,
} from "@mui/material";
import { format } from "date-fns";
import { FastField, Form, Formik } from "formik";
import router from "next/router";
import * as React from "react";
import { FC, MouseEvent, useEffect, useState } from "react";
import * as Yup from "yup";
// import { IMaskInput } from 'react-imask';
import AddIconButton from "../components/AddIconButton";
import ListCard from "../components/itens/ListCard";
import ModalFilho from "../components/itens/ModalFilho";
import ModalIrmao from "../components/itens/ModalIrmao";
import LightTextField from "../components/LightTextField";
import MoreOptions from "../components/MoreOptions";
import { Tiny } from "../components/Typography";
import useTitle from "../hooks/useTitle";
import MaskDt from "../components/masks/maskDt";
import MaskCPFCNPJ from "../components/masks/maskCPFCNPJ";

type filho = {
  idPessoa: Number;
  idRelacionamento: Number;
  nome: String;
  idade: Number;
};

type irmao = {
  idPessoa: Number;
  idRelacionamento: Number;
  nome: String;
  idade: Number;
};

interface Props {
  children?: React.ReactNode;
}

const anamnese: FC<Props> = () => {
  var title = "Anamnese";
  useTitle(title);

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
    dataNascimento: Yup.string().required("Campo obrigatório!"),
  });

  // const { values, formikMeta.touched, formikMeta.errors, formikMeta.handleChange, handleSubmit } = useFormik({
  //   initialValues,
  //   validationSchema: fieldValidationSchema,
  //   onSubmit: (values) => {
  //     const dia: number = +values.dataNascimento.split("/")[0];
  //     const mes: number = +values.dataNascimento.split("/")[1];
  //     const ano: number = +values.dataNascimento.split("/")[2];
  //     let data = new Date();
  //     data.setDate(dia);
  //     data.setMonth(mes);
  //     data.setFullYear(ano);
  //     data.setHours(0);
  //     data.setMinutes(0);
  //     data.setSeconds(0);
  //     const adicional = {
  //       cpf: values.cpf.replaceAll(".", "").replaceAll("-", ""),
  //       dtInsercao: format(new Date(), "dd-MM-yyyy HH:mm:ss"),
  //       dataNascimento: format(data, "dd-MM-yyyy HH:mm:ss"),
  //     };
  //     const reavaliacao = Object.assign(values, adicional);
  //     const JSONdata = JSON.stringify(reavaliacao);
  //     console.log(reavaliacao);
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
            const dia: number = +values.dataNascimento.split("/")[0];
            const mes: number = +values.dataNascimento.split("/")[1];
            const ano: number = +values.dataNascimento.split("/")[2];
            let data = new Date();
            data.setDate(dia);
            data.setMonth(mes);
            data.setFullYear(ano);
            data.setHours(0);
            data.setMinutes(0);
            data.setSeconds(0);
            const adicional = {
              cpf: values.cpf.replaceAll(".", "").replaceAll("-", ""),
              dtInsercao: format(new Date(), "dd-MM-yyyy HH:mm:ss"),
              dataNascimento: format(data, "dd-MM-yyyy HH:mm:ss"),
            };
            const reavaliacao = Object.assign(values, adicional);
            const JSONdata = JSON.stringify(reavaliacao);
            console.log(reavaliacao);
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
                    <LightTextField
                      fullWidth
                      name="cpf"
                      label="cpf ou cnpj"
                      value={formikMeta.values.cpf}
                      onChange={formikMeta.handleChange}
                      // helperText={touched.cpf && errors.cpf}
                      // error={Boolean(touched.cpf && errors.cpf)}
                      InputProps={{
                        inputComponent: MaskCPFCNPJ as any,
                      }}
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
                    <LightTextField
                      fullWidth
                      name="dataNascimento"
                      label="Data de Nascimento"
                      value={formikMeta.values.dataNascimento}
                      onChange={formikMeta.handleChange}
                      InputProps={{
                        inputComponent: MaskDt as any,
                      }}
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
            <Card sx={{ padding: 3, pb: 4 }}>
              <Grid container spacing={3} pt={3}>
                {filhos.map((value, index) => (
                  <Grid item xs={12} sm={6} key={index}>
                    <ListCard item={value} handleMore={handleSkillMoreOpen} />
                  </Grid>
                ))}

                <MoreOptions
                  pessoa={filhos}
                  anchorEl={skillEl}
                  handleMoreClose={handleSkillMoreClose}
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
            <Box
              display="flex"
              my="1.5rem"
              flexWrap="wrap"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography variant="h5">Pais</Typography>
            </Box>
            <Card sx={{ padding: 3, pb: 4 }}>
              <FastField name="estadoCivilPais">
                {() => (
                  <Box display="flex" my="1rem">
                    <FormControl>
                      <FormLabel>Estado Civil</FormLabel>
                      <RadioGroup
                        row
                        name="estadoCivilPais"
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
              <FastField name="paisVivos">
                {() => (
                  <Box display="flex" my="1rem">
                    <FormControl>
                      <FormLabel>Pais Vivos</FormLabel>
                      <FormGroup onChange={formikMeta.handleChange} row>
                        <FormControlLabel
                          control={<Checkbox />}
                          label="Pai"
                          value="paiVivo"
                          name="paisVivos"
                        />
                        <FormControlLabel
                          control={<Checkbox />}
                          label="Mãe"
                          value="maeVivo"
                          name="paisVivos"
                        />
                      </FormGroup>
                    </FormControl>
                  </Box>
                )}
              </FastField>

              <Card sx={{ padding: 3, pb: 4 }}>
                <FastField name="nomePai">
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
                        name="nomePai"
                        label="Nome do pai"
                        value={formikMeta.values.nomePai}
                        onChange={formikMeta.handleChange}
                      />
                    </Box>
                  )}
                </FastField>
                <Grid container spacing={4}>
                  <FastField name="idadePai">
                    {() => (
                      <Grid item xs={12} sm={6}>
                        <LightTextField
                          fullWidth
                          name="idadePai"
                          label="Idade"
                          value={formikMeta.values.idadePai}
                          onChange={formikMeta.handleChange}
                        />
                      </Grid>
                    )}
                  </FastField>
                  <FastField name="profissaoPai">
                    {() => (
                      <Grid item xs={12} sm={6}>
                        <LightTextField
                          fullWidth
                          name="profissaoPai"
                          label="Profissão"
                          value={formikMeta.values.profissaoPai}
                          onChange={formikMeta.handleChange}
                        />
                      </Grid>
                    )}
                  </FastField>
                </Grid>
              </Card>
              <br />
              <Card sx={{ padding: 3, pb: 4 }}>
                <FastField name="nomeMae">
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
                        name="nomeMae"
                        label="Nome do mãe"
                        value={formikMeta.values.nomeMae}
                        onChange={formikMeta.handleChange}
                      />
                    </Box>
                  )}
                </FastField>
                <Grid container spacing={4}>
                  <FastField name="idadeMae">
                    {() => (
                      <Grid item xs={12} sm={6}>
                        <LightTextField
                          fullWidth
                          name="idadeMae"
                          label="Idade"
                          value={formikMeta.values.idadeMae}
                          onChange={formikMeta.handleChange}
                        />
                      </Grid>
                    )}
                  </FastField>
                  <FastField name="idadeMae">
                    {() => (
                      <Grid item xs={12} sm={6}>
                        <LightTextField
                          fullWidth
                          name="profissaoMae"
                          label="Profissão"
                          value={formikMeta.values.profissaoMae}
                          onChange={formikMeta.handleChange}
                        />
                      </Grid>
                    )}
                  </FastField>
                </Grid>
              </Card>
              <br />
            </Card>
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
            <Box
              display="flex"
              my="1.5rem"
              flexWrap="wrap"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography variant="h5">Profissão</Typography>
            </Box>
            <Card sx={{ padding: 3, pb: 4 }}>
              <FastField name="profissao">
                {() => (
                  <Box display="flex" my="1rem">
                    <FormControl>
                      <FormLabel>Trabalha atualmente?</FormLabel>
                      <RadioGroup
                        row
                        name="profissao"
                        onChange={formikMeta.handleChange}
                      >
                        <FormControlLabel
                          value="N"
                          control={<Radio />}
                          label="Não"
                        />
                        <FormControlLabel
                          value="Y"
                          control={<Radio />}
                          label="Sim"
                        />
                      </RadioGroup>
                    </FormControl>
                  </Box>
                )}
              </FastField>
              {formikMeta.values.profissao === "Y" ? (
                <FastField name="localFuncao">
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
                        name="localFuncao"
                        label="Local e Função"
                        value={formikMeta.values.localFuncao}
                        onChange={formikMeta.handleChange}
                      />
                    </Box>
                  )}
                </FastField>
              ) : null}
              <FastField name="afastado">
                {() => (
                  <Box display="flex" my="1rem">
                    <FormControl>
                      <FormLabel>
                        Está afastado pela Previdência Social?
                      </FormLabel>
                      <RadioGroup
                        row
                        name="afastado"
                        onChange={formikMeta.handleChange}
                      >
                        <FormControlLabel
                          value="N"
                          control={<Radio />}
                          label="Não"
                        />
                        <FormControlLabel
                          value="Y"
                          control={<Radio />}
                          label="Sim"
                        />
                      </RadioGroup>
                    </FormControl>
                  </Box>
                )}
              </FastField>
              <FastField name="escolaridade">
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
                      name="escolaridade"
                      label="Escolaridade"
                      value={formikMeta.values.escolaridade}
                      onChange={formikMeta.handleChange}
                    />
                  </Box>
                )}
              </FastField>
              <FastField name="motivoAbandono">
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
                      name="motivoAbandono"
                      label="Motivo de abandono dos estudos"
                      value={formikMeta.values.motivoAbandono}
                      onChange={formikMeta.handleChange}
                    />
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
              <Typography variant="h5">Irmão</Typography>
            </Box>
            <div>
              <Card sx={{ padding: 3, pb: 4 }}>
                <Grid container spacing={3} pt={3}>
                  {irmaos.map((value, index) => (
                    <Grid item xs={12} sm={6} key={index}>
                      <ListCard item={value} handleMore={handleSkillMoreOpen} />
                    </Grid>
                  ))}
                  <MoreOptions
                    pessoa={irmaos}
                    anchorEl={skillEl}
                    handleMoreClose={handleSkillMoreClose}
                  />
                  <Grid item xs={12} sm={6}>
                    <Box display="flex" alignItems="center">
                      <AddIconButton onClick={() => setOpenModalIrmao(true)} />
                      <Box ml="1rem">
                        <Typography variant="h6">Adicionar</Typography>
                        <Tiny color="secondary.400">novo irmão(a)</Tiny>
                      </Box>
                      <ModalIrmao
                        open={openModalIrmao}
                        setOpen={setOpenModalIrmao}
                        setDadosAtributos={setNewIrmaoDados}
                        itemDados={newIrmaoDados}
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
              <Typography variant="h5">Problemática</Typography>
            </Box>
            <Card sx={{ padding: 3, pb: 4 }}>
              <FastField name="drogasAlcool">
                {() => (
                  <Box display="flex" my="1rem">
                    <FormControl>
                      <RadioGroup
                        row
                        name="drogasAlcool"
                        onChange={formikMeta.handleChange}
                      >
                        <FormControlLabel
                          value="Alcool"
                          control={<Radio />}
                          label={"Álcool"}
                        />
                        <FormControlLabel
                          value="Drogas"
                          control={<Radio />}
                          label={"Drogas"}
                        />
                        <FormControlLabel
                          value="Alcool e Drogas"
                          control={<Radio />}
                          label={"Álcool e Drogas"}
                        />
                      </RadioGroup>
                    </FormControl>
                  </Box>
                )}
              </FastField>
              <Box display="flex" my="1rem">
                <FormControl>
                  <FormLabel>Drogas e a idade que usou pela 1ª vez:</FormLabel>
                  <FormGroup onChange={formikMeta.handleChange}>
                    <FormControlLabel
                      control={<Checkbox />}
                      label="Álcool"
                      value="usaAlcool"
                      name="usaQuaisDrogas"
                    />
                    <LightTextField
                      fullWidth
                      name="idadeAlcool"
                      label="Idade"
                      value={formikMeta.values.idadeAlcool}
                      onChange={formikMeta.handleChange}
                    />
                    <FormControlLabel
                      control={<Checkbox />}
                      label="Maconha"
                      value="usaMaconha"
                      name="usaQuaisDrogas"
                    />
                    <LightTextField
                      fullWidth
                      name="idadeMaconha"
                      label="Idade"
                      value={formikMeta.values.idadeMaconha}
                      onChange={formikMeta.handleChange}
                    />
                    <FormControlLabel
                      control={<Checkbox />}
                      label="Cocaína (I)"
                      value="usaCocainaI"
                      name="usaQuaisDrogas"
                    />
                    <LightTextField
                      fullWidth
                      name="idadeCocainaI"
                      label="Idade"
                      value={formikMeta.values.idadeCocainaI}
                      onChange={formikMeta.handleChange}
                    />
                    <FormControlLabel
                      control={<Checkbox />}
                      label="Cocaína (A)"
                      value="usaCocainaA"
                      name="usaQuaisDrogas"
                    />
                    <LightTextField
                      fullWidth
                      name="idadeCocainaA"
                      label="Idade"
                      value={formikMeta.values.idadeCocainaA}
                      onChange={formikMeta.handleChange}
                    />
                    <FormControlLabel
                      control={<Checkbox />}
                      label="Crack"
                      value="usaCrack"
                      name="usaQuaisDrogas"
                    />
                    <LightTextField
                      fullWidth
                      name="idadeCrack"
                      label="Idade"
                      value={formikMeta.values.idadeCrack}
                      onChange={formikMeta.handleChange}
                    />
                    <FormControlLabel
                      control={<Checkbox />}
                      label="Comprimido"
                      value="usaComprimido"
                      name="usaQuaisDrogas"
                    />
                    <LightTextField
                      fullWidth
                      name="idadeComprimido"
                      label="Idade"
                      value={formikMeta.values.idadeComprimido}
                      onChange={formikMeta.handleChange}
                    />
                    <FormControlLabel
                      control={<Checkbox />}
                      label="LSD"
                      value="usaLSD"
                      name="usaQuaisDrogas"
                    />
                    <LightTextField
                      fullWidth
                      name="idadeLSD"
                      label="Idade"
                      value={formikMeta.values.idadeLSD}
                      onChange={formikMeta.handleChange}
                    />
                    <FormControlLabel
                      control={<Checkbox />}
                      label="Inalantes"
                      value="usaInalantes"
                      name="usaQuaisDrogas"
                    />
                    <LightTextField
                      fullWidth
                      name="idadeInalantes"
                      label="Idade"
                      value={formikMeta.values.idadeInalantes}
                      onChange={formikMeta.handleChange}
                    />
                    <FormControlLabel
                      control={<Checkbox />}
                      label="Mesclado"
                      value="usaMesclado"
                      name="usaQuaisDrogas"
                    />
                    <LightTextField
                      fullWidth
                      name="idadeMesclado"
                      label="Idade"
                      value={formikMeta.values.idadeMesclado}
                      onChange={formikMeta.handleChange}
                    />
                    <FormControlLabel
                      control={<Checkbox />}
                      label="Tabaco"
                      value="usaTabaco"
                      name="usaQuaisDrogas"
                    />
                    <LightTextField
                      fullWidth
                      name="idadeTabaco"
                      label="Idade"
                      value={formikMeta.values.idadeTabaco}
                      onChange={formikMeta.handleChange}
                    />
                    <FormControlLabel
                      control={<Checkbox />}
                      label="Outras"
                      value="usaOutras"
                      name="usaQuaisDrogas"
                    />
                    <Grid container spacing={4}>
                      <Grid item xs={12} sm={6}>
                        <LightTextField
                          fullWidth
                          name="idadeOutras"
                          label="Idade"
                          value={formikMeta.values.idadeOutras}
                          onChange={formikMeta.handleChange}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <LightTextField
                          fullWidth
                          name="quaisOutras"
                          label="Quais?"
                          value={formikMeta.values.quaisOutras}
                          onChange={formikMeta.handleChange}
                        />
                      </Grid>
                    </Grid>
                  </FormGroup>
                </FormControl>
              </Box>
              <FastField name="motivoInicio">
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
                      name="motivoInicio"
                      label="Motivo de ter iniciado"
                      value={formikMeta.values.motivoInicio}
                      onChange={formikMeta.handleChange}
                    />
                  </Box>
                )}
              </FastField>
              <FastField name="tipodroga">
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
                      name="tipodroga"
                      label="Tipo de droga usada no momento, Frequência e Quantidade"
                      value={formikMeta.values.tipodroga}
                      onChange={formikMeta.handleChange}
                    />
                  </Box>
                )}
              </FastField>
              <FastField name="observacoes">
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
                      name="observacoes"
                      label="Observações"
                      value={formikMeta.values.observacoes}
                      onChange={formikMeta.handleChange}
                    />
                  </Box>
                )}
              </FastField>
              <FastField name="periodoAbstinencia">
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
                      name="periodoAbstinencia"
                      label="Período em abstinência na entrevista"
                      value={formikMeta.values.periodoAbstinencia}
                      onChange={formikMeta.handleChange}
                    />
                  </Box>
                )}
              </FastField>
              <FastField name="situacoesUso">
                {() => (
                  <Box display="flex" my="1rem">
                    <FormControl>
                      <FormLabel>Situações em que faz uso</FormLabel>
                      <FormGroup onChange={formikMeta.handleChange} row>
                        <FormControlLabel
                          control={<Checkbox />}
                          label="Sozinho"
                          name="situacoesUso"
                          value={"Sozinho"}
                        />
                        <FormControlLabel
                          control={<Checkbox />}
                          label="Acompanhado"
                          name="situacoesUso"
                          value={"Acompanhado"}
                        />
                        <FormControlLabel
                          control={<Checkbox />}
                          label="Fora de casa"
                          name="situacoesUso"
                          value={"foraCasa"}
                        />
                        <FormControlLabel
                          control={<Checkbox />}
                          label="Dentro de casa"
                          name="situacoesUso"
                          value={"dentroCasa"}
                        />
                      </FormGroup>
                    </FormControl>
                  </Box>
                )}
              </FastField>
              <FastField name="observacoesB">
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
                      name="observacoesB"
                      label="Observações"
                      value={formikMeta.values.observacoesB}
                      onChange={formikMeta.handleChange}
                    />
                  </Box>
                )}
              </FastField>
              <Grid container spacing={4}>
                <FastField name="familiaUsaDrogas">
                  {() => (
                    <Grid item xs={12} sm={6}>
                      <Box display="flex" my="1rem">
                        <FormControl>
                          <FormLabel>
                            Caso de álcool e/ ou drogas na família?
                          </FormLabel>
                          <RadioGroup
                            row
                            name="familiaUsaDrogas"
                            onChange={formikMeta.handleChange}
                          >
                            <FormControlLabel
                              value="N"
                              control={<Radio />}
                              label={"Não"}
                            />
                            <FormControlLabel
                              value="Y"
                              control={<Radio />}
                              label={"Sim"}
                            />
                          </RadioGroup>
                        </FormControl>
                      </Box>
                    </Grid>
                  )}
                </FastField>
                {formikMeta.values.familiaUsaDrogas === "Y" ? (
                  <FastField name="familiaGrauParentesco">
                    {() => (
                      <Grid item xs={12} sm={6}>
                        <Box
                          display="flex"
                          my="1.5rem"
                          flexWrap="wrap"
                          alignItems="center"
                          justifyContent="space-between"
                        >
                          <LightTextField
                            fullWidth
                            name="familiaGrauParentesco"
                            label="Grau de Parentesco"
                            value={formikMeta.values.familiaGrauParentesco}
                            onChange={formikMeta.handleChange}
                          />
                        </Box>
                      </Grid>
                    )}
                  </FastField>
                ) : null}
              </Grid>
              <Grid container spacing={4}>
                <FastField name="TemNamorada">
                  {() => (
                    <Grid item xs={12} sm={6}>
                      <Box display="flex" my="1rem">
                        <FormControl>
                          <FormLabel>Namorada</FormLabel>
                          <RadioGroup
                            row
                            name="TemNamorada"
                            onChange={formikMeta.handleChange}
                          >
                            <FormControlLabel
                              value="N"
                              control={<Radio />}
                              label={"Não"}
                            />
                            <FormControlLabel
                              value="Y"
                              control={<Radio />}
                              label={"Sim"}
                            />
                          </RadioGroup>
                        </FormControl>
                      </Box>
                    </Grid>
                  )}
                </FastField>
                {formikMeta.values.temNamorada === "Y" ? (
                  <FastField name="namoradaNome">
                    {() => (
                      <Grid item xs={12} sm={6}>
                        <Box
                          display="flex"
                          my="1.5rem"
                          flexWrap="wrap"
                          alignItems="center"
                          justifyContent="space-between"
                        >
                          <LightTextField
                            fullWidth
                            name="namoradaNome"
                            label="Nome da namorada"
                            value={formikMeta.values.namoradaNome}
                            onChange={formikMeta.handleChange}
                          />
                        </Box>
                      </Grid>
                    )}
                  </FastField>
                ) : null}
              </Grid>
              {formikMeta.values.temNamorada === "Y" ? (
                <div>
                  <FastField name="namoradaTempo">
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
                          name="namoradaTempo"
                          label="Tempo de namoro"
                          value={formikMeta.values.namoradaTempo}
                          onChange={formikMeta.handleChange}
                        />
                      </Box>
                    )}
                  </FastField>
                  <Grid container spacing={4}>
                    <FastField name="namoradaUsaDrogas">
                      {() => (
                        <Grid item xs={12} sm={6}>
                          <Box display="flex" my="1rem">
                            <FormControl>
                              <FormLabel>Namorada usa droga/álcool?</FormLabel>
                              <RadioGroup
                                row
                                name="namoradaUsaDrogas"
                                onChange={formikMeta.handleChange}
                              >
                                <FormControlLabel
                                  value="N"
                                  control={<Radio />}
                                  label={"Não"}
                                />
                                <FormControlLabel
                                  value="Y"
                                  control={<Radio />}
                                  label={"Sim"}
                                />
                              </RadioGroup>
                            </FormControl>
                          </Box>
                        </Grid>
                      )}
                    </FastField>
                    {formikMeta.values.namoradaUsaDrogas === "Y" ? (
                      <FastField name="namoradaDrogaTipo">
                        {() => (
                          <Grid item xs={12} sm={6}>
                            <Box
                              display="flex"
                              my="1.5rem"
                              flexWrap="wrap"
                              alignItems="center"
                              justifyContent="space-between"
                            >
                              <LightTextField
                                fullWidth
                                name="namoradaDrogaTipo"
                                label="Tipo"
                                value={formikMeta.values.namoradaDrogaTipo}
                                onChange={formikMeta.handleChange}
                              />
                            </Box>
                          </Grid>
                        )}
                      </FastField>
                    ) : null}
                  </Grid>
                </div>
              ) : null}
            </Card>
            <Box
              display="flex"
              my="1.5rem"
              flexWrap="wrap"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography variant="h5">Histórico</Typography>
            </Box>
            <Card sx={{ padding: 3, pb: 4 }}>
              <FastField name="comoSeSenteNoUso">
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
                      name="comoSeSenteNoUso"
                      label="Como se sente quando usa?"
                      value={formikMeta.values.comoSeSenteNoUso}
                      onChange={formikMeta.handleChange}
                    />
                  </Box>
                )}
              </FastField>
              <FastField name="mudancasComportamento">
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
                      name="mudancasComportamento"
                      label="Houve mudanças de comportamento com uso de substâncias? Quais?"
                      value={formikMeta.values.mudancasComportamento}
                      onChange={formikMeta.handleChange}
                    />
                  </Box>
                )}
              </FastField>
              <FastField name="prejuisoUso">
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
                      name="prejuisoUso"
                      label="Você percebe algum prejuízo com relação ao seu uso? (Físicos, psíquicos, sociais, ocupacionais etc.)"
                      value={formikMeta.values.prejuisoUso}
                      onChange={formikMeta.handleChange}
                    />
                  </Box>
                )}
              </FastField>
              <FastField name="comoFinanciaUso">
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
                      name="comoFinanciaUso"
                      label="Como você financia o seu consumo?"
                      value={formikMeta.values.comoFinanciaUso}
                      onChange={formikMeta.handleChange}
                    />
                  </Box>
                )}
              </FastField>
              <FastField name="lugaresUso">
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
                      name="lugaresUso"
                      label="Em quais lugares faz o uso de substâncias?"
                      value={formikMeta.values.lugaresUso}
                      onChange={formikMeta.handleChange}
                    />
                  </Box>
                )}
              </FastField>
              <FastField name="percebeuProblemaUso">
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
                      name="percebeuProblemaUso"
                      label="Quando começou a perceber que seu uso de substância estava lhe causando problemas?"
                      value={formikMeta.values.percebeuProblemaUso}
                      onChange={formikMeta.handleChange}
                    />
                  </Box>
                )}
              </FastField>
              <FastField name="tempoSemUso">
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
                      name="tempoSemUso"
                      label="Já ficou algum período sem fazer uso? Quanto tempo?"
                      value={formikMeta.values.tempoSemUso}
                      onChange={formikMeta.handleChange}
                    />
                  </Box>
                )}
              </FastField>
              <FastField name="comoEstaVida">
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
                      name="comoEstaVida"
                      label="Como está sua vida hoje?"
                      value={formikMeta.values.comoEstaVida}
                      onChange={formikMeta.handleChange}
                    />
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
              <Typography variant="h5">Situação Familiar</Typography>
            </Box>
            <Card sx={{ padding: 3, pb: 4 }}>
              <FastField name="relacionamentoFamiliar">
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
                      name="relacionamentoFamiliar"
                      label="Como é o relacionamento familiar?"
                      value={formikMeta.values.relacionamentoFamiliar}
                      onChange={formikMeta.handleChange}
                    />
                  </Box>
                )}
              </FastField>
              <FastField name="comQuemMora">
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
                      name="comQuemMora"
                      label="Com quem mora?"
                      value={formikMeta.values.comQuemMora}
                      onChange={formikMeta.handleChange}
                    />
                  </Box>
                )}
              </FastField>
              <FastField name="apoioFamiliarTratamento">
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
                      name="apoioFamiliarTratamento"
                      label="Conta com apoio familiar para fazer tratamento? Quem?"
                      value={formikMeta.values.apoioFamiliarTratamento}
                      onChange={formikMeta.handleChange}
                    />
                  </Box>
                )}
              </FastField>
              <Typography>Relacionamento Familiar Atual</Typography>
              <FastField name="relacionamentoPai">
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
                      name="relacionamentoPai"
                      label="Pai"
                      value={formikMeta.values.relacionamentoPai}
                      onChange={formikMeta.handleChange}
                    />
                  </Box>
                )}
              </FastField>
              <FastField name="relacionamentoMae">
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
                      name="relacionamentoMae"
                      label="Mãe"
                      value={formikMeta.values.relacionamentoMae}
                      onChange={formikMeta.handleChange}
                    />
                  </Box>
                )}
              </FastField>
              <FastField name="relacionamentoIrmao">
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
                      name="relacionamentoIrmao"
                      label="Irmãos"
                      value={formikMeta.values.relacionamentoIrmao}
                      onChange={formikMeta.handleChange}
                    />
                  </Box>
                )}
              </FastField>
              <FastField name="relacionamentoEsposo">
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
                      name="relacionamentoEsposo"
                      label="Esposa (o)"
                      value={formikMeta.values.relacionamentoEsposo}
                      onChange={formikMeta.handleChange}
                    />
                  </Box>
                )}
              </FastField>
              <FastField name="relacionamentoFilhos">
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
                      name="relacionamentoFilhos"
                      label="Filhos (as)"
                      value={formikMeta.values.relacionamentoFilhos}
                      onChange={formikMeta.handleChange}
                    />
                  </Box>
                )}
              </FastField>
              <FastField name="relacionamentoSocial">
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
                      name="relacionamentoSocial"
                      label="Relacionamento Social Atual"
                      value={formikMeta.values.relacionamentoSocial}
                      onChange={formikMeta.handleChange}
                    />
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
              <Typography variant="h5">Saúde</Typography>
            </Box>
            <Card sx={{ padding: 3, pb: 4 }}>
              <FastField name="periodoSono">
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
                      name="periodoSono"
                      label="Período de Sono"
                      value={formikMeta.values.periodoSono}
                      onChange={formikMeta.handleChange}
                    />
                  </Box>
                )}
              </FastField>
              <FastField name="temPesadelos">
                {() => (
                  <Box display="flex" my="1rem">
                    <FormControl>
                      <FormLabel>Possui Pesadelos</FormLabel>
                      <RadioGroup
                        row
                        name="temPesadelos"
                        onChange={formikMeta.handleChange}
                      >
                        <FormControlLabel
                          value="N"
                          control={<Radio />}
                          label={"Não"}
                        />
                        <FormControlLabel
                          value="Y"
                          control={<Radio />}
                          label={"Sim"}
                        />
                      </RadioGroup>
                    </FormControl>
                  </Box>
                )}
              </FastField>
              <FastField name="observacaoGeral">
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
                      name="observacaoGeral"
                      label="Observações gerais"
                      value={formikMeta.values.observacaoGeral}
                      multiline
                      minRows={5}
                      maxRows={8}
                      onChange={formikMeta.handleChange}
                    />
                  </Box>
                )}
              </FastField>
              <FastField name="alimentecao">
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
                      name="alimentecao"
                      label="Alimentação"
                      value={formikMeta.values.alimentecao}
                      onChange={formikMeta.handleChange}
                    />
                  </Box>
                )}
              </FastField>
              <FastField name="temAlucinacao">
                {() => (
                  <Box display="flex" my="1rem">
                    <FormControl>
                      <FormLabel>Alucinação – Com drogas</FormLabel>
                      <RadioGroup
                        row
                        name="temAlucinacao"
                        onChange={formikMeta.handleChange}
                      >
                        <FormControlLabel
                          value="N"
                          control={<Radio />}
                          label={"Não"}
                        />
                        <FormControlLabel
                          value="Y"
                          control={<Radio />}
                          label={"Sim"}
                        />
                      </RadioGroup>
                    </FormControl>
                  </Box>
                )}
              </FastField>
              {formikMeta.values.temAlucinacao === "Y" ? (
                <FastField name="qtdTipoAlucinacaoDroga">
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
                        name="qtdTipoAlucinacaoDroga"
                        label="Quantidade e tipo de droga"
                        value={formikMeta.values.qtdTipoAlucinacaoDroga}
                        onChange={formikMeta.handleChange}
                      />
                    </Box>
                  )}
                </FastField>
              ) : null}
              <FastField name="alucinacaoSemDrogas">
                {() => (
                  <Box display="flex" my="1rem">
                    <FormControl>
                      <FormLabel>Sem drogas</FormLabel>
                      <RadioGroup
                        row
                        name="alucinacaoSemDrogas"
                        onChange={formikMeta.handleChange}
                      >
                        <FormControlLabel
                          value="N"
                          control={<Radio />}
                          label={"Não"}
                        />
                        <FormControlLabel
                          value="Y"
                          control={<Radio />}
                          label={"Sim"}
                        />
                      </RadioGroup>
                    </FormControl>
                  </Box>
                )}
              </FastField>
              {formikMeta.values.alucinacaoSemDrogas === "Y" ? (
                <div>
                  <FastField name="qtdTipoAlucinacao">
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
                          name="qtdTipoAlucinacao"
                          label="Quantidade e tipo de droga"
                          value={formikMeta.values.qtdTipoAlucinacao}
                          onChange={formikMeta.handleChange}
                        />
                      </Box>
                    )}
                  </FastField>
                  <FastField name="tipoAlucinacao">
                    {() => (
                      <Box display="flex" my="1rem">
                        <FormControl>
                          <FormLabel>Tipo Alucinação</FormLabel>
                          <RadioGroup
                            row
                            name="tipoAlucinacao"
                            onChange={formikMeta.handleChange}
                          >
                            <FormControlLabel
                              value="V"
                              control={<Radio />}
                              label={"Visual"}
                            />
                            <FormControlLabel
                              value="A"
                              control={<Radio />}
                              label={"Auditiva"}
                            />
                          </RadioGroup>
                        </FormControl>
                      </Box>
                    )}
                  </FastField>
                  <FastField name="descricaoAlucinacao">
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
                          name="descricaoAlucinacao"
                          label="Descrever quando (mês/ano) e como"
                          value={formikMeta.values.descricaoAlucinacao}
                          onChange={formikMeta.handleChange}
                        />
                      </Box>
                    )}
                  </FastField>
                </div>
              ) : null}
              <Typography>Desmaio / Convulsão</Typography>
              <FastField name="desmaioComDrogas">
                {() => (
                  <Box display="flex" my="1rem">
                    <FormControl>
                      <FormLabel>Com drogas</FormLabel>
                      <RadioGroup
                        row
                        name="desmaioComDrogas"
                        onChange={formikMeta.handleChange}
                      >
                        <FormControlLabel
                          value="N"
                          control={<Radio />}
                          label="Não"
                        />
                        <FormControlLabel
                          value="Y"
                          control={<Radio />}
                          label="Sim"
                        />
                      </RadioGroup>
                    </FormControl>
                  </Box>
                )}
              </FastField>
              {formikMeta.values.desmaioComDrogas === "Y" ? (
                <FastField name="qndTipoDrogaDesmaio">
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
                        name="qndTipoDrogaDesmaio"
                        label="Quantidade e tipo de droga"
                        value={formikMeta.values.qndTipoDrogaDesmaio}
                        onChange={formikMeta.handleChange}
                      />
                    </Box>
                  )}
                </FastField>
              ) : null}
              <FastField name="desmaioSemDrogas">
                {() => (
                  <Box display="flex" my="1rem">
                    <FormControl>
                      <FormLabel>Sem drogas</FormLabel>
                      <RadioGroup
                        row
                        name="desmaioSemDrogas"
                        onChange={formikMeta.handleChange}
                      >
                        <FormControlLabel
                          value="N"
                          control={<Radio />}
                          label="Não"
                        />
                        <FormControlLabel
                          value="Y"
                          control={<Radio />}
                          label="Sim"
                        />
                      </RadioGroup>
                    </FormControl>
                  </Box>
                )}
              </FastField>
              {formikMeta.values.desmaioSemDrogas === "Y" ? (
                <div>
                  <FastField name="qndDesmaio">
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
                          name="qndDesmaio"
                          label="Quantidade e tipo de droga"
                          value={formikMeta.values.qndDesmaio}
                          onChange={formikMeta.handleChange}
                        />
                      </Box>
                    )}
                  </FastField>
                  <FastField name="desmaioDescricao">
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
                          name="desmaioDescricao"
                          label="Descrever quando (mês/ano) e como"
                          value={formikMeta.values.desmaioDescricao}
                          onChange={formikMeta.handleChange}
                        />
                      </Box>
                    )}
                  </FastField>
                </div>
              ) : null}
              <FastField name="temOverdose">
                {() => (
                  <Box display="flex" my="1rem">
                    <FormControl>
                      <FormLabel>Princípio de Overdose</FormLabel>
                      <RadioGroup
                        row
                        name="temOverdose"
                        onChange={formikMeta.handleChange}
                      >
                        <FormControlLabel
                          value="N"
                          control={<Radio />}
                          label="Não"
                        />
                        <FormControlLabel
                          value="Y"
                          control={<Radio />}
                          label="Sim"
                        />
                      </RadioGroup>
                    </FormControl>
                  </Box>
                )}
              </FastField>
              {formikMeta.values.temOverdose === "Y" ? (
                <FastField name="qtdTipoDrogaOverdose">
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
                        name="qtdTipoDrogaOverdose"
                        label="Quantidade e tipo de droga"
                        value={formikMeta.values.qtdTipoDrogaOverdose}
                        onChange={formikMeta.handleChange}
                      />
                    </Box>
                  )}
                </FastField>
              ) : null}
              <FastField name="tomaRemedio">
                {() => (
                  <Box display="flex" my="1rem">
                    <FormControl>
                      <FormLabel>Toma medicação</FormLabel>
                      <RadioGroup
                        row
                        name="tomaRemedio"
                        onChange={formikMeta.handleChange}
                      >
                        <FormControlLabel
                          value="N"
                          control={<Radio />}
                          label="Não"
                        />
                        <FormControlLabel
                          value="Y"
                          control={<Radio />}
                          label="Sim"
                        />
                      </RadioGroup>
                    </FormControl>
                  </Box>
                )}
              </FastField>
              {formikMeta.values.tomaRemedio === "Y" ? (
                <FastField name="sobreRemedio">
                  <Box
                    display="flex"
                    my="1.5rem"
                    flexWrap="wrap"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <LightTextField
                      fullWidth
                      name="sobreRemedio"
                      label="Qual, desde quando, quantidade, frequência?"
                      value={formikMeta.values.sobreRemedio}
                      onChange={formikMeta.handleChange}
                    />
                  </Box>
                </FastField>
              ) : null}
              <FastField name="sintomasAnteriores">
                {() => (
                  <Box display="flex" my="1rem">
                    <FormControl>
                      <FormLabel>
                        Sintomas anteriores (doenças infantis, doenças mais
                        sérias ou crônicas
                      </FormLabel>
                      <FormGroup onChange={formikMeta.handleChange} row>
                        <FormControlLabel
                          control={<Checkbox />}
                          label="Caxumba"
                          value="sintomasAnterioresCaxumba"
                          name="sintomasAnteriores"
                        />
                        <FormControlLabel
                          control={<Checkbox />}
                          label="Catapora"
                          value="sintomasAnterioresCatapora"
                          name="sintomasAnteriores"
                        />
                        <FormControlLabel
                          control={<Checkbox />}
                          label="Meningite"
                          value="sintomasAnterioresMeningite"
                          name="sintomasAnteriores"
                        />
                        <FormControlLabel
                          control={<Checkbox />}
                          label="Sarampo"
                          value="sintomasAnterioresSarampo"
                          name="sintomasAnteriores"
                        />
                        <FormControlLabel
                          control={<Checkbox />}
                          label="Outros"
                          value="sintomasAnterioresOutros"
                          name="sintomasAnteriores"
                        />
                      </FormGroup>
                    </FormControl>
                  </Box>
                )}
              </FastField>
              <FastField name="outroSintomasAnteriores">
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
                      name="outroSintomasAnteriores"
                      label="Outros"
                      value={formikMeta.values.outroSintomasAnteriores}
                      onChange={formikMeta.handleChange}
                    />
                  </Box>
                )}
              </FastField>
              <FastField name="acidentes">
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
                      name="acidentes"
                      label="Acidentes"
                      value={formikMeta.values.acidentes}
                      onChange={formikMeta.handleChange}
                    />
                  </Box>
                )}
              </FastField>
              <FastField name="cirurgias">
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
                      name="cirurgias"
                      label="Cirurgias"
                      value={formikMeta.values.cirurgias}
                      onChange={formikMeta.handleChange}
                    />
                  </Box>
                )}
              </FastField>
              <FastField name="tratamentosAnteriores">
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
                      name="tratamentosAnteriores"
                      label="Tratamentos anteriores (internações, onde, data, abordagem terapêutica, terapias etc.). Quantidade"
                      value={formikMeta.values.tratamentosAnteriores}
                      onChange={formikMeta.handleChange}
                    />
                  </Box>
                )}
              </FastField>
              <FastField name="consideraDependente">
                {() => (
                  <Box display="flex" my="1rem">
                    <FormControl>
                      <FormLabel>Considera-se um (a) dependente?</FormLabel>
                      <RadioGroup
                        row
                        name="consideraDependente"
                        onChange={formikMeta.handleChange}
                      >
                        <FormControlLabel
                          value="N"
                          control={<Radio />}
                          label="Não"
                        />
                        <FormControlLabel
                          value="Y"
                          control={<Radio />}
                          label="Sim"
                        />
                        <FormControlLabel
                          value="NS"
                          control={<Radio />}
                          label={"Não sei"}
                        />
                      </RadioGroup>
                    </FormControl>
                  </Box>
                )}
              </FastField>
              <FastField name="consideraDependenteJustificativa">
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
                      name="consideraDependenteJustificativa"
                      label="Justificar"
                      value={formikMeta.values.consideraDependenteJustificativa}
                      onChange={formikMeta.handleChange}
                    />
                  </Box>
                )}
              </FastField>
              <FastField name="motivoProcuraInstituicao">
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
                      name="motivoProcuraInstituicao"
                      label="Motivo que o (a) levou a procurar a Instituição"
                      value={formikMeta.values.motivoProcuraInstituicao}
                      onChange={formikMeta.handleChange}
                    />
                  </Box>
                )}
              </FastField>
              <FastField name="expectaviaTratamento">
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
                      name="expectaviaTratamento"
                      label="Expectativas sobre o tratamento"
                      value={formikMeta.values.expectaviaTratamento}
                      onChange={formikMeta.handleChange}
                    />
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
              <Typography variant="h5">Problemas Legais</Typography>
            </Box>
            <Card sx={{ padding: 3, pb: 4 }}>
              <FastField name="problemaJustica">
                {() => (
                  <Box display="flex" my="1rem">
                    <FormControl>
                      <FormLabel>Problemas com a justiça?</FormLabel>
                      <RadioGroup
                        row
                        name="problemaJustica"
                        onChange={formikMeta.handleChange}
                      >
                        <FormControlLabel
                          value="N"
                          control={<Radio />}
                          label="Não"
                        />
                        <FormControlLabel
                          value="Y"
                          control={<Radio />}
                          label="Sim"
                        />
                      </RadioGroup>
                    </FormControl>
                  </Box>
                )}
              </FastField>
              <FastField name="temProcesso">
                {() => (
                  <Box display="flex">
                    <FormControl>
                      <FormLabel>Tem processo?</FormLabel>
                      <RadioGroup
                        row
                        name="temProcesso"
                        onChange={formikMeta.handleChange}
                      >
                        <FormControlLabel
                          value="N"
                          control={<Radio />}
                          label="Não"
                        />
                        <FormControlLabel
                          value="Y"
                          control={<Radio />}
                          label="Sim"
                        />
                      </RadioGroup>
                    </FormControl>
                  </Box>
                )}
              </FastField>
              {formikMeta.values.temProcesso === "Y" ? (
                <FastField name="porqueProblemaJustica">
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
                        name="porqueProblemaJustica"
                        label="Quantos, quando (mês/ano), motivo, artigo assinado?"
                        value={formikMeta.values.porqueProblemaJustica}
                        onChange={formikMeta.handleChange}
                      />
                    </Box>
                  )}
                </FastField>
              ) : null}
            </Card>
            <br />
            <br />
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Button
                variant="outlined"
                sx={{
                  width: 124,
                  color: "text.disabled",
                  borderColor: "text.disabled",
                }}
                fullWidth
                onClick={() => router.back()}
              >
                Cancelar
              </Button>
              <Button
                fullWidth
                type="submit"
                variant="contained"
                sx={{ width: 124 }}
              >
                Salvar
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Card>
  );
};

export default anamnese;
