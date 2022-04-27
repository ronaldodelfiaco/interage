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
import { useFormik } from "formik";
import router from "next/router";
import * as React from "react";
import { FC, MouseEvent, useEffect, useState } from "react";
import * as Yup from "yup";
// import { IMaskInput } from 'react-imask';
import AddIconButton from "../../components/AddIconButton";
import ListCard from "../../components/itens/ListCard";
import ModalFilho from "../../components/itens/ModalFilho";
import ModalIrmao from "../../components/itens/ModalIrmao";
import LightTextField from "../../components/LightTextField";
import MaskCPFCNPJ from "../../components/masks/maskCPFCNPJ";
import MaskDt from "../../components/masks/maskDt";
import MoreOptions from "../../components/MoreOptions";
import { Tiny } from "../../components/Typography";
import useTitle from "../../hooks/useTitle";

type filho = {
  idPessoa: Number;
  idRelacionamento: Number;
  nome: string;
  idade: Number;
};

type irmao = {
  idPessoa: Number;
  idRelacionamento: Number;
  nome: string;
  idade: Number;
};

const anamnese: FC<{}> = () => {
  let title = "Anamnese";

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

  const { values, touched, errors, handleChange, handleSubmit } = useFormik({
    initialValues,
    validationSchema: fieldValidationSchema,
    onSubmit: (values) => {
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
    },
  });

  useEffect(() => {
    title = "Anamnese - " + values.nome;
  }, [values.nome]);
  useTitle(title);

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
              <FormLabel>Estado Civil</FormLabel>
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
          <Typography variant="h5">Pais</Typography>
        </Box>
        <Card sx={{ padding: 3, pb: 4 }}>
          <Box display="flex" my="1rem">
            <FormControl>
              <FormLabel>Estado Civil</FormLabel>
              <RadioGroup row name="estadoCivilPais" onChange={handleChange}>
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
          <Box display="flex" my="1rem">
            <FormControl>
              <FormLabel>Pais Vivos</FormLabel>
              <FormGroup onChange={handleChange} row>
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
                name="nomePai"
                label="Nome do pai"
                value={values.nomePai}
                onChange={handleChange}
              />
            </Box>
            <Grid container spacing={4}>
              <Grid item xs={12} sm={6}>
                <LightTextField
                  fullWidth
                  name="idadePai"
                  label="Idade"
                  value={values.idadePai}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <LightTextField
                  fullWidth
                  name="profissaoPai"
                  label="Profissão"
                  value={values.profissaoPai}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
          </Card>
          <br />
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
                name="nomeMae"
                label="Nome do mãe"
                value={values.nomeMae}
                onChange={handleChange}
              />
            </Box>
            <Grid container spacing={4}>
              <Grid item xs={12} sm={6}>
                <LightTextField
                  fullWidth
                  name="idadeMae"
                  label="Idade"
                  value={values.idadeMae}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <LightTextField
                  fullWidth
                  name="profissaoMae"
                  label="Profissão"
                  value={values.profissaoMae}
                  onChange={handleChange}
                />
              </Grid>
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
              value={values.moraQuem}
              onChange={handleChange}
            />
          </Box>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6}>
              <LightTextField
                fullWidth
                name="enderecoAtual"
                label="Endereço atual"
                value={values.enderecoAtual}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <LightTextField
                fullWidth
                name="bairroAtual"
                label="Bairro"
                value={values.bairroAtual}
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
              name="cidadeAtual"
              label="Cidade"
              value={values.cidadeAtual}
              onChange={handleChange}
            />
          </Box>
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
          <Box display="flex" my="1rem">
            <FormControl>
              <FormLabel>Trabalha atualmente?</FormLabel>
              <RadioGroup row name="profissao" onChange={handleChange}>
                <FormControlLabel value="N" control={<Radio />} label="Não" />
                <FormControlLabel value="Y" control={<Radio />} label="Sim" />
              </RadioGroup>
            </FormControl>
          </Box>
          {values.profissao === "Y" ? (
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
                value={values.localFuncao}
                onChange={handleChange}
              />
            </Box>
          ) : null}
          <Box display="flex" my="1rem">
            <FormControl>
              <FormLabel>Está afastado pela Previdência Social?</FormLabel>
              <RadioGroup row name="afastado" onChange={handleChange}>
                <FormControlLabel value="N" control={<Radio />} label="Não" />
                <FormControlLabel value="Y" control={<Radio />} label="Sim" />
              </RadioGroup>
            </FormControl>
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
              name="escolaridade"
              label="Escolaridade"
              value={values.escolaridade}
              onChange={handleChange}
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
              name="motivoAbandono"
              label="Motivo de abandono dos estudos"
              value={values.motivoAbandono}
              onChange={handleChange}
            />
          </Box>
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
          <Box display="flex" my="1rem">
            <FormControl>
              <RadioGroup row name="drogasAlcool" onChange={handleChange}>
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
          <Box display="flex" my="1rem">
            <FormControl>
              <FormLabel>Drogas e a idade que usou pela 1ª vez:</FormLabel>
              <FormGroup onChange={handleChange}>
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
                  value={values.idadeAlcool}
                  onChange={handleChange}
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
                  value={values.idadeMaconha}
                  onChange={handleChange}
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
                  value={values.idadeCocainaI}
                  onChange={handleChange}
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
                  value={values.idadeCocainaA}
                  onChange={handleChange}
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
                  value={values.idadeCrack}
                  onChange={handleChange}
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
                  value={values.idadeComprimido}
                  onChange={handleChange}
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
                  value={values.idadeLSD}
                  onChange={handleChange}
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
                  value={values.idadeInalantes}
                  onChange={handleChange}
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
                  value={values.idadeMesclado}
                  onChange={handleChange}
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
                  value={values.idadeTabaco}
                  onChange={handleChange}
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
                      value={values.idadeOutras}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <LightTextField
                      fullWidth
                      name="quaisOutras"
                      label="Quais?"
                      value={values.quaisOutras}
                      onChange={handleChange}
                    />
                  </Grid>
                </Grid>
              </FormGroup>
            </FormControl>
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
              name="motivoInicio"
              label="Motivo de ter iniciado"
              value={values.motivoInicio}
              onChange={handleChange}
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
              name="tipodroga"
              label="Tipo de droga usada no momento, Frequência e Quantidade"
              value={values.tipodroga}
              onChange={handleChange}
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
              name="observacoes"
              label="Observações"
              value={values.observacoes}
              onChange={handleChange}
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
              name="periodoAbstinencia"
              label="Período em abstinência na entrevista"
              value={values.periodoAbstinencia}
              onChange={handleChange}
            />
          </Box>
          <Box display="flex" my="1rem">
            <FormControl>
              <FormLabel>Situações em que faz uso</FormLabel>
              <FormGroup onChange={handleChange} row>
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
              value={values.observacoesB}
              onChange={handleChange}
            />
          </Box>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6}>
              <Box display="flex" my="1rem">
                <FormControl>
                  <FormLabel>Caso de álcool e/ ou drogas na família?</FormLabel>
                  <RadioGroup
                    row
                    name="familiaUsaDrogas"
                    onChange={handleChange}
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
            {values.familiaUsaDrogas === "Y" ? (
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
                    value={values.familiaGrauParentesco}
                    onChange={handleChange}
                  />
                </Box>
              </Grid>
            ) : null}
          </Grid>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6}>
              <Box display="flex" my="1rem">
                <FormControl>
                  <FormLabel>Namorada</FormLabel>
                  <RadioGroup row name="TemNamorada" onChange={handleChange}>
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
            {values.temNamorada === "Y" ? (
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
                    value={values.namoradaNome}
                    onChange={handleChange}
                  />
                </Box>
              </Grid>
            ) : null}
          </Grid>
          {values.temNamorada === "Y" ? (
            <div>
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
                  value={values.namoradaTempo}
                  onChange={handleChange}
                />
              </Box>
              <Grid container spacing={4}>
                <Grid item xs={12} sm={6}>
                  <Typography>Namorada usa droga/álcool?</Typography>
                  <Box display="flex" my="1rem">
                    <RadioGroup
                      row
                      name="namoradaUsaDrogas"
                      onChange={handleChange}
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
                  </Box>
                </Grid>
                {values.namoradaUsaDrogas === "Y" ? (
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
                        value={values.namoradaDrogaTipo}
                        onChange={handleChange}
                      />
                    </Box>
                  </Grid>
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
              value={values.comoSeSenteNoUso}
              onChange={handleChange}
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
              name="mudancasComportamento"
              label="Houve mudanças de comportamento com uso de substâncias? Quais?"
              value={values.mudancasComportamento}
              onChange={handleChange}
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
              name="prejuisoUso"
              label="Você percebe algum prejuízo com relação ao seu uso? (Físicos, psíquicos, sociais, ocupacionais etc.)"
              value={values.prejuisoUso}
              onChange={handleChange}
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
              name="comoFinanciaUso"
              label="Como você financia o seu consumo?"
              value={values.comoFinanciaUso}
              onChange={handleChange}
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
              name="lugaresUso"
              label="Em quais lugares faz o uso de substâncias?"
              value={values.lugaresUso}
              onChange={handleChange}
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
              name="percebeuProblemaUso"
              label="Quando começou a perceber que seu uso de substância estava lhe causando problemas?"
              value={values.percebeuProblemaUso}
              onChange={handleChange}
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
              name="tempoSemUso"
              label="Já ficou algum período sem fazer uso? Quanto tempo?"
              value={values.tempoSemUso}
              onChange={handleChange}
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
              name="comoEstaVida"
              label="Como está sua vida hoje?"
              value={values.comoEstaVida}
              onChange={handleChange}
            />
          </Box>
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
              value={values.relacionamentoFamiliar}
              onChange={handleChange}
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
              name="comQuemMora"
              label="Com quem mora?"
              value={values.comQuemMora}
              onChange={handleChange}
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
              name="apoioFamiliarTratamento"
              label="Conta com apoio familiar para fazer tratamento? Quem?"
              value={values.apoioFamiliarTratamento}
              onChange={handleChange}
            />
          </Box>
          <Typography>Relacionamento Familiar Atual</Typography>
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
              value={values.relacionamentoPai}
              onChange={handleChange}
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
              name="relacionamentoMae"
              label="Mãe"
              value={values.relacionamentoMae}
              onChange={handleChange}
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
              name="relacionamentoIrmao"
              label="Irmãos"
              value={values.relacionamentoIrmao}
              onChange={handleChange}
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
              name="relacionamentoEsposo"
              label="Esposa (o)"
              value={values.relacionamentoEsposo}
              onChange={handleChange}
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
              name="relacionamentoFilhos"
              label="Filhos (as)"
              value={values.relacionamentoFilhos}
              onChange={handleChange}
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
              name="relacionamentoSocial"
              label="Relacionamento Social Atual"
              value={values.relacionamentoSocial}
              onChange={handleChange}
            />
          </Box>
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
              value={values.periodoSono}
              onChange={handleChange}
            />
          </Box>
          <Box display="flex" my="1rem">
            <FormControl>
              <FormLabel>Possui Pesadelos</FormLabel>
              <RadioGroup row name="temPesadelos" onChange={handleChange}>
                <FormControlLabel value="N" control={<Radio />} label={"Não"} />
                <FormControlLabel value="Y" control={<Radio />} label={"Sim"} />
              </RadioGroup>
            </FormControl>
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
              name="observacaoGeral"
              label="Observações gerais"
              value={values.observacaoGeral}
              multiline
              minRows={5}
              maxRows={8}
              onChange={handleChange}
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
              name="alimentecao"
              label="Alimentação"
              value={values.alimentecao}
              onChange={handleChange}
            />
          </Box>
          <Box display="flex" my="1rem">
            <FormControl>
              <FormLabel>Alucinação – Com drogas</FormLabel>
              <RadioGroup row name="temAlucinacao" onChange={handleChange}>
                <FormControlLabel value="N" control={<Radio />} label={"Não"} />
                <FormControlLabel value="Y" control={<Radio />} label={"Sim"} />
              </RadioGroup>
            </FormControl>
          </Box>
          {values.temAlucinacao === "Y" ? (
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
                value={values.qtdTipoAlucinacaoDroga}
                onChange={handleChange}
              />
            </Box>
          ) : null}
          <Box display="flex" my="1rem">
            <FormControl>
              <FormLabel>Sem drogas</FormLabel>
              <RadioGroup
                row
                name="alucinacaoSemDrogas"
                onChange={handleChange}
              >
                <FormControlLabel value="N" control={<Radio />} label={"Não"} />
                <FormControlLabel value="Y" control={<Radio />} label={"Sim"} />
              </RadioGroup>
            </FormControl>
          </Box>
          {values.alucinacaoSemDrogas === "Y" ? (
            <div>
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
                  value={values.qtdTipoAlucinacao}
                  onChange={handleChange}
                />
              </Box>
              <Box display="flex" my="1rem">
                <FormControl>
                  <FormLabel>Tipo Alucinação</FormLabel>
                  <RadioGroup row name="tipoAlucinacao" onChange={handleChange}>
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
                  value={values.descricaoAlucinacao}
                  onChange={handleChange}
                />
              </Box>
            </div>
          ) : null}
          <Typography>Desmaio / Convulsão</Typography>
          <Box display="flex" my="1rem">
            <FormControl>
              <FormLabel>Com drogas</FormLabel>
              <RadioGroup row name="desmaioComDrogas" onChange={handleChange}>
                <FormControlLabel value="N" control={<Radio />} label="Não" />
                <FormControlLabel value="Y" control={<Radio />} label="Sim" />
              </RadioGroup>
            </FormControl>
          </Box>
          {values.desmaioComDrogas === "Y" ? (
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
                value={values.qndTipoDrogaDesmaio}
                onChange={handleChange}
              />
            </Box>
          ) : null}
          <Box display="flex" my="1rem">
            <FormControl>
              <FormLabel>Sem drogas</FormLabel>
              <RadioGroup row name="desmaioSemDrogas" onChange={handleChange}>
                <FormControlLabel value="N" control={<Radio />} label="Não" />
                <FormControlLabel value="Y" control={<Radio />} label="Sim" />
              </RadioGroup>
            </FormControl>
          </Box>
          {values.desmaioSemDrogas === "Y" ? (
            <div>
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
                  value={values.qndDesmaio}
                  onChange={handleChange}
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
                  name="desmaioDescricao"
                  label="Descrever quando (mês/ano) e como"
                  value={values.desmaioDescricao}
                  onChange={handleChange}
                />
              </Box>
            </div>
          ) : null}
          <Box display="flex" my="1rem">
            <FormControl>
              <FormLabel>Princípio de Overdose</FormLabel>
              <RadioGroup row name="temOverdose" onChange={handleChange}>
                <FormControlLabel value="N" control={<Radio />} label="Não" />
                <FormControlLabel value="Y" control={<Radio />} label="Sim" />
              </RadioGroup>
            </FormControl>
          </Box>
          {values.temOverdose === "Y" ? (
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
                value={values.qtdTipoDrogaOverdose}
                onChange={handleChange}
              />
            </Box>
          ) : null}
          <Box display="flex" my="1rem">
            <FormControl>
              <FormLabel>Toma medicação</FormLabel>
              <RadioGroup row name="tomaRemedio" onChange={handleChange}>
                <FormControlLabel value="N" control={<Radio />} label="Não" />
                <FormControlLabel value="Y" control={<Radio />} label="Sim" />
              </RadioGroup>
            </FormControl>
          </Box>
          {values.tomaRemedio === "Y" ? (
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
                value={values.sobreRemedio}
                onChange={handleChange}
              />
            </Box>
          ) : null}
          <Box display="flex" my="1rem">
            <FormControl>
              <FormLabel>
                Sintomas anteriores (doenças infantis, doenças mais sérias ou
                crônicas
              </FormLabel>
              <FormGroup onChange={handleChange} row>
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
              value={values.outroSintomasAnteriores}
              onChange={handleChange}
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
              name="acidentes"
              label="Acidentes"
              value={values.acidentes}
              onChange={handleChange}
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
              name="cirurgias"
              label="Cirurgias"
              value={values.cirurgias}
              onChange={handleChange}
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
              name="tratamentosAnteriores"
              label="Tratamentos anteriores (internações, onde, data, abordagem terapêutica, terapias etc.). Quantidade"
              value={values.tratamentosAnteriores}
              onChange={handleChange}
            />
          </Box>
          <Box display="flex" my="1rem">
            <FormControl>
              <FormLabel>Considera-se um (a) dependente?</FormLabel>
              <RadioGroup
                row
                name="consideraDependente"
                onChange={handleChange}
              >
                <FormControlLabel value="N" control={<Radio />} label="Não" />
                <FormControlLabel value="Y" control={<Radio />} label="Sim" />
                <FormControlLabel
                  value="NS"
                  control={<Radio />}
                  label={"Não sei"}
                />
              </RadioGroup>
            </FormControl>
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
              name="consideraDependenteJustificativa"
              label="Justificar"
              value={values.consideraDependenteJustificativa}
              onChange={handleChange}
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
              name="motivoProcuraInstituicao"
              label="Motivo que o (a) levou a procurar a Instituição"
              value={values.motivoProcuraInstituicao}
              onChange={handleChange}
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
              name="expectaviaTratamento"
              label="Expectativas sobre o tratamento"
              value={values.expectaviaTratamento}
              onChange={handleChange}
            />
          </Box>
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
          <Box display="flex" my="1rem">
            <FormControl>
              <FormLabel>Problemas com a justiça?</FormLabel>
              <RadioGroup row name="problemaJustica" onChange={handleChange}>
                <FormControlLabel value="N" control={<Radio />} label="Não" />
                <FormControlLabel value="Y" control={<Radio />} label="Sim" />
              </RadioGroup>
            </FormControl>
          </Box>
          <Box display="flex">
            <FormControl>
              <FormLabel>Tem processo?</FormLabel>
              <RadioGroup row name="temProcesso" onChange={handleChange}>
                <FormControlLabel value="N" control={<Radio />} label="Não" />
                <FormControlLabel value="Y" control={<Radio />} label="Sim" />
              </RadioGroup>
            </FormControl>
          </Box>
          {values.temProcesso === "Y" ? (
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
                value={values.porqueProblemaJustica}
                onChange={handleChange}
              />
            </Box>
          ) : null}
        </Card>
        <br />
        <br />
        <Box display="flex" justifyContent="space-between" alignItems="center">
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
      </form>
    </Card>
  );
};

export default anamnese;
