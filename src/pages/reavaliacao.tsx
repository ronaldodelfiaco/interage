import {
  Box,
  Button,
  Card,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { format } from "date-fns";
import { useFormik } from "formik";
import { t } from "i18next";
import router from "next/router";
import * as React from "react";
import { FC } from "react";
import LightTextField from "../components/LightTextField";
import useTitle from "../hooks/useTitle";
import MaskCPFCNPJ from "../components/masks/maskCPFCNPJ";
import MaskDt from "../components/masks/maskDt";

const reavaliacao: FC = () => {
  var title = "Reavaliação";
  useTitle(title);

  const initialValues = {
    cpf: "",
    nome: "",
    dataInternacao: "",
    responsavelInternacao: "",
    tratamentoMedico: "",
    especialidade: "",
    porQue: "",
    medicamentos: "",
    medicamentosTipo: "",
    tontura: "",
    tentativaSuicidio: "",
    QualidadeSono: "",
    comendo: "",
    agua: "",
    deficiencia: "",
    deficienciaQuem: "",
    agressividade: "",
    agressividadeQuem: "",
    alcoolismo: "",
    alcoolismoQuem: "",
    drogas: "",
    drogasQuem: "",
    suicidio: "",
    suicidioQuem: "",
    drogasUsos: "",
    idadeinicioUso: "",
    circunstancias: "",
    quantidade: "",
    quantidadeAntesInternar: "",
    respostaPrejuisoDrogas: "",
    quaisPrejuisos: "",
    drogasPreferencia: "",
    substanciasAssociadaUso: "",
    efeitoEsperado: "",
    efeitoInesperado: "",
    sintomasAbstinecia: "",
    internacaoAtual: "",
    internacaoAnterior: "",
    numeroInternacoes: "",
    lembrancaMarcante: "",
    arrependimento: "",
    cometeuCrime: "",
    motivoCrime: "",
    motivoDrogas: "",
    disponibilidadeTratamento: "",
    nivelAbstinencia: "",
    esperaInternacao: "",
    expectativaSocial: "",
    breveRelato: "",
  };

  const { values, handleChange, handleSubmit } = useFormik({
    initialValues,
    // validationSchema: fieldValidationSchema,
    onSubmit: (values) => {
      const dia: number = +values.dataInternacao.split("/")[0];
      const mes: number = +values.dataInternacao.split("/")[1];
      const ano: number = +values.dataInternacao.split("/")[2];
      console.log("%d/%d/%d", dia, mes, ano);
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
        dataInternacao: format(data, "dd-MM-yyyy HH:mm:ss"),
      };
      const reavaliacao = Object.assign(values, adicional);
      const JSONdata = JSON.stringify(reavaliacao);
      console.log(reavaliacao);
      console.log(JSONdata);
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
          <Typography variant="h5">1 - Dados Pessoais</Typography>
        </Box>
        <Card sx={{ padding: 3, pb: 4 }}>
          <Box
            display={"flex"}
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
            />
            {/* <LightTextField
            fullWidth
            name="cpf"
            label="cpf ou cnpj"
            value={values.cpf}
            onChange={handleChange}
            // helperText={touched.cpf && errors.cpf}
            // error={Boolean(touched.cpf && errors.cpf)}
          /> */}
          </Box>
          <Box
            display={"flex"}
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
              // helperText={touched.nome && errors.nome}
              // error={Boolean(touched.nome && errors.nome)}
            />
          </Box>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6}>
              {/* <LightTextField
              fullWidth
              name="dataInternacao"
              label="Data de Internacao"
              // value={values.dataInternacao}
              // onChange={handleChange}
            /> */}
              <MaskDt
                value={values.dataInternacao}
                onChange={handleChange}
                label={"Data de Internacao"}
                name="dataInternacao"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <LightTextField
                fullWidth
                name="responsavelInternacao"
                label="Responsável pela internação"
                value={values.responsavelInternacao}
                onChange={handleChange}
                // helperText={
                // touched.responsavelInternacao && errors.responsavelInternacao
                // }
                // error={Boolean(
                // touched.responsavelInternacao && errors.responsavelInternacao,
                // )}
              />
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
          <Typography variant="h5">2 - Saúde Geral</Typography>
        </Box>
        <Card sx={{ padding: 3, pb: 4 }}>
          <Box display={"flex"} my="1rem">
            <Typography variant="h6">
              Durante os últimos 2 anos recebeu algum tratamento médico?
            </Typography>
            <RadioGroup
              row
              name="tratamentoMedico"
              //  onChange{handleChange}
            >
              <FormControlLabel value="N" control={<Radio />} label="Não" />
              <FormControlLabel value="Y" control={<Radio />} label="Sim" />
            </RadioGroup>
          </Box>
          {values.tratamentoMedico === "Y" ? (
            <Grid container spacing={4}>
              <Grid item xs={12} sm={6}>
                <LightTextField
                  fullWidth
                  name="especialidade"
                  label="Em que especialidade?"
                  value={values.especialidade}
                  onChange={handleChange}
                  // helperText={touched.especialidade && errors.especialidade}
                  // error={Boolean(touched.especialidade && errors.especialidade)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <LightTextField
                  fullWidth
                  name="porQue"
                  label="Por quê?"
                  value={values.porQue}
                  onChange={handleChange}
                  // helperText={touched.porQue && errors.porQue}
                  // error={Boolean(touched.porQue && errors.porQue)}
                />
              </Grid>
            </Grid>
          ) : null}

          <Box display={"flex"} my="1rem">
            <Typography variant="h6">Você toma algum Medicamento?</Typography>
            <RadioGroup row name="medicamentos" onChange={handleChange}>
              <FormControlLabel value="N" control={<Radio />} label="Não" />
              <FormControlLabel value="Y" control={<Radio />} label="Sim" />
            </RadioGroup>
          </Box>
          {values.medicamentos === "Y" ? (
            <Box
              display={"flex"}
              my="1.5rem"
              flexWrap="wrap"
              alignItems="center"
              justifyContent="space-between"
            >
              <LightTextField
                fullWidth
                name="medicamentosTipo"
                label="Quais?"
                value={values.medicamentosTipo}
                onChange={handleChange}
                // helperText={touched.medicamentosTipo && errors.medicamentosTipo}
                // error={Boolean(
                // touched.medicamentosTipo && errors.medicamentosTipo,
                // )}
              />
            </Box>
          ) : null}
          <Box display={"flex"} my="1rem">
            <Typography variant="h6">
              Costuma sentir tonturas ou ter desmaios?
            </Typography>
            <RadioGroup row name="tontura" onChange={handleChange}>
              <FormControlLabel value="N" control={<Radio />} label="Não" />
              <FormControlLabel value="Y" control={<Radio />} label="Sim" />
            </RadioGroup>
          </Box>

          <Box display={"flex"} my="1rem">
            <Typography variant="h6">
              Pensamentos ou tentativas de suicídio?
            </Typography>
            <RadioGroup
              row
              name="tentativaSuicidio"
              //
              onChange={handleChange}
            >
              <FormControlLabel value="N" control={<Radio />} label="Não" />
              <FormControlLabel value="Y" control={<Radio />} label="Sim" />
            </RadioGroup>
          </Box>
          <Box display={"flex"} my="1rem">
            <Typography variant="h6">Qualidade do sono:</Typography>
            <RadioGroup
              row
              name="QualidadeSono"
              //
              onChange={handleChange}
            >
              <FormControlLabel value="W" control={<Radio />} label="Bem" />
              <FormControlLabel value="R" control={<Radio />} label="Regular" />
              <FormControlLabel value="B" control={<Radio />} label="Péssima" />
            </RadioGroup>
          </Box>
          <Box display={"flex"} my="1rem">
            <Typography variant="h6">Se Alimenta:</Typography>
            <RadioGroup row name="comendo" onChange={handleChange}>
              <FormControlLabel value="W" control={<Radio />} label="Bem" />
              <FormControlLabel value="R" control={<Radio />} label="Regular" />
              <FormControlLabel value="B" control={<Radio />} label="Péssima" />
            </RadioGroup>
          </Box>
          <Box
            display={"flex"}
            my="1.5rem"
            flexWrap="wrap"
            alignItems="center"
            justifyContent="space-between"
          >
            <LightTextField
              fullWidth
              name="agua"
              label="Ingestão de água (copos/ dia)"
              value={values.agua}
              onChange={handleChange}
              // helperText={touched.agua && errors.agua}
              // error={Boolean(touched.agua && errors.agua)}
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
          <Typography variant="h5">
            3 - Antecedentes Familiares (em primeiro grau):
          </Typography>
        </Box>
        <Card sx={{ padding: 3, pb: 4 }}>
          <div>
            <Box display={"flex"} my="1rem">
              <Typography variant="h6">Deficiência Física/ mental:</Typography>
              <RadioGroup row name="deficiencia" onChange={handleChange}>
                <FormControlLabel value="N" control={<Radio />} label="Não" />
                <FormControlLabel value="Y" control={<Radio />} label="Sim" />
              </RadioGroup>
            </Box>
            {values.deficiencia === "Y" ? (
              <Box
                display={"flex"}
                my="1.5rem"
                flexWrap="wrap"
                alignItems="center"
                justifyContent="space-between"
              >
                <LightTextField
                  fullWidth
                  name="deficienciaQuem"
                  label="Quem?"
                  value={values.deficienciaQuem}
                  onChange={handleChange}
                  // helperText={touched.deficienciaQuem && errors.deficienciaQuem}
                  // error={Boolean(
                  // touched.deficienciaQuem && errors.deficienciaQuem,
                  // )}
                />
              </Box>
            ) : null}
          </div>
          <div>
            <Box display={"flex"} my="1rem">
              <Typography variant="h6">Agressividade?</Typography>
              <RadioGroup row name="agressividade" onChange={handleChange}>
                <FormControlLabel value="N" control={<Radio />} label="Não" />
                <FormControlLabel value="Y" control={<Radio />} label="Sim" />
              </RadioGroup>
            </Box>
            {values.agressividade === "Y" ? (
              <Box
                display={"flex"}
                my="1.5rem"
                flexWrap="wrap"
                alignItems="center"
                justifyContent="space-between"
              >
                <LightTextField
                  fullWidth
                  name="agressividadeQuem"
                  label="Quem?"
                  value={values.agressividadeQuem}
                  onChange={handleChange}
                  // helperText={
                  // touched.agressividadeQuem && errors.agressividadeQuem
                  // }
                  // error={Boolean(
                  // touched.agressividadeQuem && errors.agressividadeQuem,
                  // )}
                />
              </Box>
            ) : null}
          </div>
          <div>
            <Box display={"flex"} my="1rem">
              <Typography variant="h6">Alcoolismo?</Typography>
              <RadioGroup row name="alcoolismo" onChange={handleChange}>
                <FormControlLabel value="N" control={<Radio />} label="Não" />
                <FormControlLabel value="Y" control={<Radio />} label="Sim" />
              </RadioGroup>
            </Box>
            {values.alcoolismo === "Y" ? (
              <Box
                display={"flex"}
                my="1.5rem"
                flexWrap="wrap"
                alignItems="center"
                justifyContent="space-between"
              >
                <LightTextField
                  fullWidth
                  name="alcoolismoQuem"
                  label="Quem?"
                  value={values.alcoolismoQuem}
                  onChange={handleChange}
                  // helperText={touched.alcoolismoQuem && errors.alcoolismoQuem}
                  // error={Boolean(touched.alcoolismoQuem && errors.alcoolismoQuem)}
                />
              </Box>
            ) : null}
          </div>
          <div>
            <Box display={"flex"} my="1rem">
              <Typography variant="h6">Drogas?</Typography>
              <RadioGroup row name="drogas" onChange={handleChange}>
                <FormControlLabel value="N" control={<Radio />} label="Não" />
                <FormControlLabel value="Y" control={<Radio />} label="Sim" />
              </RadioGroup>
            </Box>
            {values.drogas == "Y" ? (
              <Box
                display={"flex"}
                my="1.5rem"
                flexWrap="wrap"
                alignItems="center"
                justifyContent="space-between"
              >
                <LightTextField
                  fullWidth
                  name="drogasQuem"
                  label="Quem?"
                  value={values.drogasQuem}
                  onChange={handleChange}
                  // helperText={touched.drogasQuem && errors.drogasQuem}
                  // error={Boolean(touched.drogasQuem && errors.drogasQuem)}
                />
              </Box>
            ) : null}{" "}
          </div>
          <div>
            <Box display={"flex"} my="1rem">
              <Typography variant="h6">Suicídio?</Typography>
              <RadioGroup row name="suicidio" onChange={handleChange}>
                <FormControlLabel value="N" control={<Radio />} label="Não" />
                <FormControlLabel value="Y" control={<Radio />} label="Sim" />
              </RadioGroup>
            </Box>
            {values.suicidio === "Y" ? (
              <Box
                display={"flex"}
                my="1.5rem"
                flexWrap="wrap"
                alignItems="center"
                justifyContent="space-between"
              >
                <LightTextField
                  fullWidth
                  name="suicidioQuem"
                  label="Quem?"
                  value={values.suicidioQuem}
                  onChange={handleChange}
                  // helperText={touched.suicidioQuem && errors.suicidioQuem}
                  // error={Boolean(touched.suicidioQuem && errors.suicidioQuem)}
                />
              </Box>
            ) : null}
          </div>
        </Card>
        <Box
          display="flex"
          my="1.5rem"
          flexWrap="wrap"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="h5">
            4 - Histórico de uso de substância psicoativa
          </Typography>
        </Box>
        <Card sx={{ padding: 3, pb: 4 }}>
          <Box
            display={"flex"}
            my="1.5rem"
            flexWrap="wrap"
            alignItems="center"
            justifyContent="space-between"
          >
            <LightTextField
              fullWidth
              name="drogasUsos"
              label={"Quais substâncias psicoativas já fez uso?"}
              value={values.drogasUsos}
              onChange={handleChange}
              // helperText={touched.drogasUsos && errors.drogasUsos}
              // error={Boolean(touched.drogasUsos && errors.drogasUsos)}
            />
          </Box>

          <Box
            display={"flex"}
            my="1.5rem"
            flexWrap="wrap"
            alignItems="center"
            justifyContent="space-between"
          >
            <LightTextField
              fullWidth
              name="idadeinicioUso"
              label={"Com que idade iniciou o uso?"}
              value={values.idadeinicioUso}
              onChange={handleChange}
              // helperText={touched.idadeinicioUso && errors.idadeinicioUso}
              // error={Boolean(touched.idadeinicioUso && errors.idadeinicioUso)}
            />
          </Box>

          <Box
            display={"flex"}
            my="1.5rem"
            flexWrap="wrap"
            alignItems="center"
            justifyContent="space-between"
          >
            <LightTextField
              fullWidth
              name="circunstancias"
              label={"Em que circunstancias?"}
              value={values.circunstancias}
              onChange={handleChange}
              // helperText={touched.circunstancias && errors.circunstancias}
              // error={Boolean(touched.circunstancias && errors.circunstancias)}
            />
          </Box>

          <Box
            display={"flex"}
            my="1.5rem"
            flexWrap="wrap"
            alignItems="center"
            justifyContent="space-between"
          >
            <LightTextField
              fullWidth
              name="quantidade"
              label={"Em que quantidade?"}
              value={values.quantidade}
              onChange={handleChange}
              // helperText={touched.quantidade && errors.quantidade}
              // error={Boolean(touched.quantidade && errors.quantidade)}
            />
          </Box>
          <Box
            display={"flex"}
            my="1.5rem"
            flexWrap="wrap"
            alignItems="center"
            justifyContent="space-between"
          >
            <LightTextField
              fullWidth
              name="quantidadeAntesInternar"
              label={"Em quantidade usava antes da internação?"}
              value={values.quantidadeAntesInternar}
              onChange={handleChange}
              // helperText={
              // touched.quantidadeAntesInternar && errors.quantidadeAntesInternar
              // }
              // error={Boolean(
              // touched.quantidadeAntesInternar && errors.quantidadeAntesInternar,
              // )}
            />
          </Box>

          <div>
            <Box display={"flex"} my="1rem">
              <Typography variant="h6">
                Você acredita que o uso de drogas e/ou álcool trouxe prejuízos a
                sua vida?
              </Typography>
              <RadioGroup
                row
                name="respostaPrejuisoDrogas"
                onChange={handleChange}
              >
                <FormControlLabel value="N" control={<Radio />} label="Não" />
                <FormControlLabel value="Y" control={<Radio />} label="Sim" />
              </RadioGroup>
            </Box>
            {values.respostaPrejuisoDrogas === "Y" ? (
              <Box
                display={"flex"}
                my="1.5rem"
                flexWrap="wrap"
                alignItems="center"
                justifyContent="space-between"
              >
                <LightTextField
                  fullWidth
                  name="quaisPrejuisos"
                  label="Quais Prejuisos?"
                  value={values.quaisPrejuisos}
                  onChange={handleChange}
                  // helperText={touched.quaisPrejuisos && errors.quaisPrejuisos}
                  // error={Boolean(touched.quaisPrejuisos && errors.quaisPrejuisos)}
                />
              </Box>
            ) : null}
          </div>
          <Box
            display={"flex"}
            my="1.5rem"
            flexWrap="wrap"
            alignItems="center"
            justifyContent="space-between"
          >
            <LightTextField
              fullWidth
              name="drogasPreferencia"
              label="Drogas de preferência"
              value={values.drogasPreferencia}
              onChange={handleChange}
              // helperText={touched.drogasPreferencia && errors.drogasPreferencia}
              // error={Boolean(
              // touched.drogasPreferencia && errors.drogasPreferencia,
              // )}
            />
          </Box>
          <Box
            display={"flex"}
            my="1.5rem"
            flexWrap="wrap"
            alignItems="center"
            justifyContent="space-between"
          >
            <LightTextField
              fullWidth
              name="substanciasAssociadaUso"
              label="Substâncias associadas ao uso"
              value={values.substanciasAssociadaUso}
              onChange={handleChange}
              // helperText={
              // touched.substanciasAssociadaUso && errors.substanciasAssociadaUso
              // }
              // error={Boolean(
              // touched.substanciasAssociadaUso && errors.substanciasAssociadaUso,
              // )}
            />
          </Box>
          <Box
            display={"flex"}
            my="1.5rem"
            flexWrap="wrap"
            alignItems="center"
            justifyContent="space-between"
          >
            <LightTextField
              fullWidth
              name="efeitoEsperado"
              label="Efeito esperado"
              value={values.efeitoEsperado}
              onChange={handleChange}
              // helperText={touched.efeitoEsperado && errors.efeitoEsperado}
              // error={Boolean(touched.efeitoEsperado && errors.efeitoEsperado)}
            />
          </Box>
          <Box
            display={"flex"}
            my="1.5rem"
            flexWrap="wrap"
            alignItems="center"
            justifyContent="space-between"
          >
            <LightTextField
              fullWidth
              name="efeitoInesperado"
              label="Efeito indesejado"
              value={values.efeitoInesperado}
              onChange={handleChange}
              // helperText={touched.efeitoInesperado && errors.efeitoInesperado}
              // error={Boolean(touched.efeitoInesperado && errors.efeitoInesperado)}
            />
          </Box>
          <Box
            display={"flex"}
            my="1.5rem"
            flexWrap="wrap"
            alignItems="center"
            justifyContent="space-between"
          >
            <LightTextField
              fullWidth
              name="sintomasAbstinecia"
              label="Sintomas da abstinência"
              value={values.sintomasAbstinecia}
              onChange={handleChange}
              // helperText={touched.sintomasAbstinecia && errors.sintomasAbstinecia}
              // error={Boolean(
              // touched.sintomasAbstinecia && errors.sintomasAbstinecia,
              // )}
            />
          </Box>
          <Box display={"flex"} my="1rem">
            <Typography variant="h6">Atual internação:</Typography>
            <RadioGroup row name="internacaoAtual" onChange={handleChange}>
              <FormControlLabel
                value="V"
                control={<Radio />}
                label="Voluntária"
              />
              <FormControlLabel
                value="I"
                control={<Radio />}
                label="Involuntária"
              />
            </RadioGroup>
          </Box>
          <Box display={"flex"} my="1rem">
            <Typography variant="h6">Internações anteriores:</Typography>
            <RadioGroup row name="internacaoAnterior" onChange={handleChange}>
              <FormControlLabel value="N" control={<Radio />} label="Não" />
              <FormControlLabel value="Y" control={<Radio />} label="Sim" />
            </RadioGroup>
          </Box>
          {values.internacaoAnterior === "Y" ? (
            <Box
              display={"flex"}
              my="1.5rem"
              flexWrap="wrap"
              alignItems="center"
              justifyContent="space-between"
            >
              <LightTextField
                fullWidth
                name="numeroInternacoes"
                label="Por quantas internações passou"
                value={values.numeroInternacoes}
                onChange={handleChange}
                // helperText={touched.numeroInternacoes && errors.numeroInternacoes}
                // error={Boolean(
                // touched.numeroInternacoes && errors.numeroInternacoes,
                // )}
              />
            </Box>
          ) : null}
          <Box
            display={"flex"}
            my="1.5rem"
            flexWrap="wrap"
            alignItems="center"
            justifyContent="space-between"
          >
            <LightTextField
              fullWidth
              name="lembrancaMarcante"
              label="Quem a lembrança mais marcante em sua vida"
              value={values.lembrancaMarcante}
              onChange={handleChange}
              // helperText={touched.lembrancaMarcante && errors.lembrancaMarcante}
              // error={Boolean(
              // touched.lembrancaMarcante && errors.lembrancaMarcante,
              // )}
            />
          </Box>
          <Box
            display={"flex"}
            my="1.5rem"
            flexWrap="wrap"
            alignItems="center"
            justifyContent="space-between"
          >
            <LightTextField
              fullWidth
              name="arrependimento"
              label="Tem algum arrependimento ou frustração"
              value={values.arrependimento}
              onChange={handleChange}
              // helperText={touched.arrependimento && errors.arrependimento}
              // error={Boolean(touched.arrependimento && errors.arrependimento)}
            />
          </Box>
          <Box display={"flex"} my="1rem">
            <Typography variant="h6">Já cometeu algum crime ?</Typography>
            <RadioGroup row name="cometeuCrime" onChange={handleChange}>
              <FormControlLabel value="N" control={<Radio />} label="Não" />
              <FormControlLabel value="Y" control={<Radio />} label="Sim" />
            </RadioGroup>
          </Box>
          {values.cometeuCrime === "Y" ? (
            <Box
              display={"flex"}
              my="1.5rem"
              flexWrap="wrap"
              alignItems="center"
              justifyContent="space-between"
            >
              <LightTextField
                fullWidth
                name="motivoCrime"
                label="Motivado por:"
                value={values.motivoCrime}
                onChange={handleChange}
                // helperText={touched.motivoCrime && errors.motivoCrime}
                // error={Boolean(touched.motivoCrime && errors.motivoCrime)}
              />
            </Box>
          ) : null}
          <Box
            display={"flex"}
            my="1.5rem"
            flexWrap="wrap"
            alignItems="center"
            justifyContent="space-between"
          >
            <LightTextField
              fullWidth
              name="motivoDrogas"
              label="O que você considera ter te levado ao uso de substâncias
            psicoativas?"
              value={values.motivoDrogas}
              onChange={handleChange}
              // helperText={touched.motivoDrogas && errors.motivoDrogas}
              // error={Boolean(touched.motivoDrogas && errors.motivoDrogas)}
            />
          </Box>
          <Box display={"flex"} my="1rem">
            <Typography variant="h6">
              Disponibilidade Para Tratamento:
            </Typography>
            <RadioGroup
              row
              name="disponibilidadeTratamento"
              onChange={handleChange}
            >
              <FormControlLabel value="N" control={<Radio />} label="Não" />
              <FormControlLabel value="Y" control={<Radio />} label="Sim" />
            </RadioGroup>
          </Box>
          <Box display={"flex"} my="1rem">
            <Typography variant="h6">Nível de abstinência:</Typography>
            <RadioGroup row name="nivelAbstinencia" onChange={handleChange}>
              <FormControlLabel value="L" control={<Radio />} label={"Baixo"} />
              <FormControlLabel value="M" control={<Radio />} label={"Médio"} />
              <FormControlLabel value="H" control={<Radio />} label={"Alto"} />
            </RadioGroup>
          </Box>
          <Box
            display={"flex"}
            my="1.5rem"
            flexWrap="wrap"
            alignItems="center"
            justifyContent="space-between"
          >
            <LightTextField
              fullWidth
              name="esperaInternacao"
              label="O que espera da internação?"
              value={values.esperaInternacao}
              onChange={handleChange}
              // helperText={touched.esperaInternacao && errors.esperaInternacao}
              // error={Boolean(touched.esperaInternacao && errors.esperaInternacao)}
            />
          </Box>
          <Box
            display={"flex"}
            my="1.5rem"
            flexWrap="wrap"
            alignItems="center"
            justifyContent="space-between"
          >
            <LightTextField
              fullWidth
              name="expectativaSocial"
              label="Quem a expectativa da reinserção familiar e social?"
              value={values.expectativaSocial}
              onChange={handleChange}
              // helperText={touched.expectativaSocial && errors.expectativaSocial}
              // error={Boolean(
              // touched.expectativaSocial && errors.expectativaSocial,
              // )}
            />
          </Box>
          <Box
            display={"flex"}
            my="1.5rem"
            flexWrap="wrap"
            alignItems="center"
            justifyContent="space-between"
          >
            <LightTextField
              fullWidth
              name="breveRelato"
              label="Breve relato sobre fatores agravantes, atenuantes e manifestações
            mais relevantes que foram observadas durante a entrevista."
              value={values.breveRelato}
              onChange={handleChange}
              // helperText={touched.breveRelato && errors.breveRelato}
              // error={Boolean(touched.breveRelato && errors.breveRelato)}
            />
          </Box>
        </Card>
        <br />
        <br />
        <Box
          display={"flex"}
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
      </form>
    </Card>
  );
};

export default reavaliacao;
