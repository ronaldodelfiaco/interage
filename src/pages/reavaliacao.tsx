import {
  Box,
  Button,
  Card,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { format } from "date-fns";
import { FastField, Formik, Form } from "formik";
import router from "next/router";
import * as React from "react";
import { FC } from "react";
import LightTextField from "../components/LightTextField";
import MaskCPFCNPJ from "../components/masks/maskCPFCNPJ";
import MaskDt from "../components/masks/maskDt";
import useTitle from "../hooks/useTitle";
import * as Yup from "yup";

const reavaliacao: FC<{}> = () => {
  useTitle("Reavaliacao");
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
    temTontura: "",
    tentativaSuicidio: "",
    qualidadeSono: "",
    comendo: "",
    ingestaoAgua: "",
    deficiencia: "",
    qualDeficiencia: "",
    agressividade: "",
    agressividadeQuem: "",
    alcoolismo: "",
    alcoolismoQuem: "",
    drogas: "",
    drogasQuem: "",
    suicidio: "",
    suicidioQuem: "",
    drogasUsos: "",
    idadeInicioUso: "",
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

  const fieldValidationSchema = Yup.object().shape({
    nome: Yup.string()
      .min(3, "Nome muito curto")
      .required("Campo obrigatório!"),
    cpf: Yup.string().min(14, "CPF muito curto").required("Campo obrigatório!"),
    dataInternacao: Yup.string().required("Campo obrigatório!"),
  });

  // const { values, handleChange, handleSubmit } = useFormik({
  //   initialValues,
  //   onSubmit: (values) => {
  //     const dia: number = +values.dataInternacao.split("/")[0];
  //     const mes: number = +values.dataInternacao.split("/")[1];
  //     const ano: number = +values.dataInternacao.split("/")[2];
  //     console.log("%d/%d/%d", dia, mes, ano);
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
  //       dataInternacao: format(data, "dd-MM-yyyy HH:mm:ss"),
  //     };
  //     const reavaliacao = Object.assign(values, adicional);
  //     console.log(reavaliacao);
  //     const JSONdata = JSON.stringify(reavaliacao);
  //     console.log(JSONdata);
  //   },
  // });
  // useTitle("Reavaliação" + " " + values.nome);

  return (
    <Card sx={{ padding: "1.5rem", pb: "4rem" }}>
      <Formik
        initialValues={initialValues}
        validationSchema={fieldValidationSchema}
        onSubmit={(values, actions) => {
          setTimeout(() => {
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
            console.log(reavaliacao);
            const JSONdata = JSON.stringify(reavaliacao);
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
              <Typography variant="h5">1 - Dados Pessoais</Typography>
            </Box>
            <Card sx={{ padding: 3, pb: 4 }}>
              <FastField name="cpf">
                {() => (
                  <Box
                    display={"flex"}
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
                      value={formikMeta.values.nome}
                      onChange={formikMeta.handleChange}
                    />
                  </Box>
                )}
              </FastField>
              <Grid container spacing={4}>
                <FastField name="dataInternacao">
                  {() => (
                    <Grid item xs={12} sm={6}>
                      <LightTextField
                      fullWidth
                      name="dataInternacao"
                      label="Data de Internação"
                      value={formikMeta.values.dataInternacao}
                      onChange={formikMeta.handleChange}
                      InputProps={{
                        inputComponent: MaskDt as any,
                      }}
                    />
                    </Grid>
                  )}
                </FastField>
                <FastField name="responsavelInternacao">
                  {() => (
                    <Grid item xs={12} sm={6}>
                      <LightTextField
                        fullWidth
                        name="responsavelInternacao"
                        label="Responsável pela internação"
                        value={formikMeta.values.responsavelInternacao}
                        onChange={formikMeta.handleChange}
                      />
                    </Grid>
                  )}
                </FastField>
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
              <FastField name="tratamentoMedico">
                {() => (
                  <Box display={"flex"} my="1rem">
                    <FormControl>
                      <FormLabel>
                        Durante os últimos 2 anos recebeu algum tratamento
                        médico?
                      </FormLabel>
                      <RadioGroup
                        row
                        name="tratamentoMedico"
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
              {formikMeta.values.tratamentoMedico === "Y" ? (
                <Grid container spacing={4}>
                  <FastField name="especialidade">
                    {() => (
                      <Grid item xs={12} sm={6}>
                        <LightTextField
                          fullWidth
                          name="especialidade"
                          label="Em que especialidade?"
                          value={formikMeta.values.especialidade}
                          onChange={formikMeta.handleChange}
                        />
                      </Grid>
                    )}
                  </FastField>
                  <FastField name="porQue">
                    {() => (
                      <Grid item xs={12} sm={6}>
                        <LightTextField
                          fullWidth
                          name="porQue"
                          label="Por quê?"
                          value={formikMeta.values.porQue}
                          onChange={formikMeta.handleChange}
                        />
                      </Grid>
                    )}
                  </FastField>
                </Grid>
              ) : null}
              <FastField name="medicamentos">
                {() => (
                  <Box display={"flex"} my="1rem">
                    <FormControl>
                      <FormLabel>Você toma algum Medicamento?</FormLabel>
                      <RadioGroup
                        row
                        name="medicamentos"
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
              {formikMeta.values.medicamentos === "Y" ? (
                <FastField name="medicamentosTipo">
                  {() => (
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
                        value={formikMeta.values.medicamentosTipo}
                        onChange={formikMeta.handleChange}
                      />
                    </Box>
                  )}
                </FastField>
              ) : null}
              <FastField name="temTontura">
                {() => (
                  <Box display={"flex"} my="1rem">
                    <FormControl>
                      <FormLabel>
                        Costuma sentir tonturas ou ter desmaios?
                      </FormLabel>
                      <RadioGroup
                        row
                        name="temTontura"
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
              <FastField name="tentativaSuicidio">
                {() => (
                  <Box display={"flex"} my="1rem">
                    <FormControl>
                      <FormLabel>
                        Pensamentos ou tentativas de suicídio?
                      </FormLabel>
                      <RadioGroup
                        row
                        name="tentativaSuicidio"
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
              <FastField name="qualidadeSono">
                {() => (
                  <Box display={"flex"} my="1rem">
                    <FormControl>
                      <FormLabel>Qualidade do sono:</FormLabel>
                      <RadioGroup
                        row
                        name="qualidadeSono"
                        onChange={formikMeta.handleChange}
                      >
                        <FormControlLabel
                          value="Bem"
                          control={<Radio />}
                          label="Bem"
                        />
                        <FormControlLabel
                          value="Regular"
                          control={<Radio />}
                          label="Regular"
                        />
                        <FormControlLabel
                          value="Pessimo"
                          control={<Radio />}
                          label="Péssima"
                        />
                      </RadioGroup>
                    </FormControl>
                  </Box>
                )}
              </FastField>
              <FastField name="comendo">
                {() => (
                  <Box display={"flex"} my="1rem">
                    <FormControl>
                      <FormLabel>Se Alimenta:</FormLabel>
                      <RadioGroup
                        row
                        name="comendo"
                        onChange={formikMeta.handleChange}
                      >
                        <FormControlLabel
                          value="Bem"
                          control={<Radio />}
                          label="Bem"
                        />
                        <FormControlLabel
                          value="Regular"
                          control={<Radio />}
                          label="Regular"
                        />
                        <FormControlLabel
                          value="Pessimo"
                          control={<Radio />}
                          label="Péssima"
                        />
                      </RadioGroup>
                    </FormControl>
                  </Box>
                )}
              </FastField>
              <FastField name="ingestaoAgua">
                {() => (
                  <Box
                    display={"flex"}
                    my="1.5rem"
                    flexWrap="wrap"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <LightTextField
                      fullWidth
                      name="ingestaoAgua"
                      label="Ingestão de água (copos/ dia)"
                      value={formikMeta.values.ingestaoAgua}
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
              <Typography variant="h5">
                3 - Antecedentes Familiares (em primeiro grau):
              </Typography>
            </Box>
            <Card sx={{ padding: 3, pb: 4 }}>
              <FastField name="deficiencia">
                {() => (
                  <Box display={"flex"} my="1rem">
                    <FormControl>
                      <FormLabel>Deficiência Física/ mental:</FormLabel>
                      <RadioGroup
                        row
                        name="deficiencia"
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
              {formikMeta.values.deficiencia === "Y" ? (
                <FastField name="qualDeficiencia">
                  <Box
                    display={"flex"}
                    my="1.5rem"
                    flexWrap="wrap"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <LightTextField
                      fullWidth
                      name="qualDeficiencia"
                      label="Qual?"
                      value={formikMeta.values.qualDeficiencia}
                      onChange={formikMeta.handleChange}
                    />
                  </Box>
                </FastField>
              ) : null}
              <FastField name="agressividade">
                {() => (
                  <Box display={"flex"} my="1rem">
                    <FormControl>
                      <FormLabel>Agressividade?</FormLabel>
                      <RadioGroup
                        row
                        name="agressividade"
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
              {formikMeta.values.agressividade === "Y" ? (
                <FastField name="agressividadeQuem">
                  {() => (
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
                        value={formikMeta.values.agressividadeQuem}
                        onChange={formikMeta.handleChange}
                      />
                    </Box>
                  )}
                </FastField>
              ) : null}
              <FastField name="alcoolismo">
                {() => (
                  <Box display={"flex"} my="1rem">
                    <FormControl>
                      <FormLabel>Alcoolismo?</FormLabel>
                      <RadioGroup
                        row
                        name="alcoolismo"
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
              {formikMeta.values.alcoolismo === "Y" ? (
                <FastField name="alcoolismoQuem">
                  {() => (
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
                        value={formikMeta.values.alcoolismoQuem}
                        onChange={formikMeta.handleChange}
                      />
                    </Box>
                  )}
                </FastField>
              ) : null}
              <FastField name="drogas">
                {() => (
                  <Box display={"flex"} my="1rem">
                    <FormControl>
                      <FormLabel>Drogas?</FormLabel>
                      <RadioGroup
                        row
                        name="drogas"
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
              {formikMeta.values.drogas == "Y" ? (
                <FastField name="drogasQuem">
                  {() => (
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
                        value={formikMeta.values.drogasQuem}
                        onChange={formikMeta.handleChange}
                      />
                    </Box>
                  )}
                </FastField>
              ) : null}
              <FastField name="suicidio">
                {() => (
                  <Box display={"flex"} my="1rem">
                    <FormControl>
                      <FormLabel>Suicídio?</FormLabel>
                      <RadioGroup
                        row
                        name="suicidio"
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
              {formikMeta.values.suicidio === "Y" ? (
                <FastField name="suicidioQuem">
                  {() => (
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
                        value={formikMeta.values.suicidioQuem}
                        onChange={formikMeta.handleChange}
                      />
                    </Box>
                  )}
                </FastField>
              ) : null}
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
              <FastField name="drogasUsos">
                {() => (
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
                      value={formikMeta.values.drogasUsos}
                      onChange={formikMeta.handleChange}
                    />
                  </Box>
                )}
              </FastField>
              <FastField name="idadeInicioUso">
                {() => (
                  <Box
                    display={"flex"}
                    my="1.5rem"
                    flexWrap="wrap"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <LightTextField
                      fullWidth
                      name="idadeInicioUso"
                      label={"Com que idade iniciou o uso?"}
                      value={formikMeta.values.idadeInicioUso}
                      onChange={formikMeta.handleChange}
                    />
                  </Box>
                )}
              </FastField>
              <FastField name="circunstancias">
                {() => (
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
                      value={formikMeta.values.circunstancias}
                      onChange={formikMeta.handleChange}
                    />
                  </Box>
                )}
              </FastField>
              <FastField name="quantidade">
                {() => (
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
                      value={formikMeta.values.quantidade}
                      onChange={formikMeta.handleChange}
                    />
                  </Box>
                )}
              </FastField>
              <FastField name="quantidadeAntesInternar">
                {() => (
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
                      value={formikMeta.values.quantidadeAntesInternar}
                      onChange={formikMeta.handleChange}
                    />
                  </Box>
                )}
              </FastField>
              <FastField name="respostaPrejuisoDrogas">
                {() => (
                  <Box display={"flex"} my="1rem">
                    <FormControl>
                      <FormLabel>
                        Você acredita que o uso de drogas e/ou álcool trouxe
                        prejuízos a sua vida?
                      </FormLabel>
                      <RadioGroup
                        row
                        name="respostaPrejuisoDrogas"
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
              {formikMeta.values.respostaPrejuisoDrogas === "Y" ? (
                <FastField name="quaisPrejuisos">
                  {() => (
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
                        value={formikMeta.values.quaisPrejuisos}
                        onChange={formikMeta.handleChange}
                      />
                    </Box>
                  )}
                </FastField>
              ) : null}
              <FastField name="drogasPreferencia">
                {() => (
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
                      value={formikMeta.values.drogasPreferencia}
                      onChange={formikMeta.handleChange}
                    />
                  </Box>
                )}
              </FastField>
              <FastField name="substanciasAssociadaUso">
                {() => (
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
                      value={formikMeta.values.substanciasAssociadaUso}
                      onChange={formikMeta.handleChange}
                    />
                  </Box>
                )}
              </FastField>
              <FastField name="efeitoEsperado">
                {() => (
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
                      value={formikMeta.values.efeitoEsperado}
                      onChange={formikMeta.handleChange}
                    />
                  </Box>
                )}
              </FastField>
              <FastField name="efeitoInesperado">
                {() => (
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
                      value={formikMeta.values.efeitoInesperado}
                      onChange={formikMeta.handleChange}
                    />
                  </Box>
                )}
              </FastField>
              <FastField name="sintomasAbstinecia">
                {() => (
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
                      value={formikMeta.values.sintomasAbstinecia}
                      onChange={formikMeta.handleChange}
                    />
                  </Box>
                )}
              </FastField>
              <FastField name="internacaoAtual">
                {() => (
                  <Box display={"flex"} my="1rem">
                    <FormControl>
                      <FormLabel>Atual internação:</FormLabel>
                      <RadioGroup
                        row
                        name="internacaoAtual"
                        onChange={formikMeta.handleChange}
                      >
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
                    </FormControl>
                  </Box>
                )}
              </FastField>
              <FastField name="internacaoAnterior">
                {() => (
                  <Box display={"flex"} my="1rem">
                    <FormControl>
                      <FormLabel>Internações anteriores:</FormLabel>
                      <RadioGroup
                        row
                        name="internacaoAnterior"
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
              {formikMeta.values.internacaoAnterior === "Y" ? (
                <FastField name="numeroInternacoes">
                  {() => (
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
                        value={formikMeta.values.numeroInternacoes}
                        onChange={formikMeta.handleChange}
                      />
                    </Box>
                  )}
                </FastField>
              ) : null}
              <FastField name="lembrancaMarcante">
                {() => (
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
                      value={formikMeta.values.lembrancaMarcante}
                      onChange={formikMeta.handleChange}
                    />
                  </Box>
                )}
              </FastField>
              <FastField name="arrependimento">
                {() => (
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
                      value={formikMeta.values.arrependimento}
                      onChange={formikMeta.handleChange}
                    />
                  </Box>
                )}
              </FastField>
              <FastField name="cometeuCrime">
                {() => (
                  <Box display={"flex"} my="1rem">
                    <FormControl>
                      <FormLabel>Já cometeu algum crime ?</FormLabel>
                      <RadioGroup
                        row
                        name="cometeuCrime"
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
              {formikMeta.values.cometeuCrime === "Y" ? (
                <FastField name="motivoCrime">
                  {() => (
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
                        value={formikMeta.values.motivoCrime}
                        onChange={formikMeta.handleChange}
                      />
                    </Box>
                  )}
                </FastField>
              ) : null}
              <FastField name="motivoDrogas">
                {() => (
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
                      value={formikMeta.values.motivoDrogas}
                      onChange={formikMeta.handleChange}
                    />
                  </Box>
                )}
              </FastField>
              <FastField name="disponibilidadeTratamento">
                {() => (
                  <Box display={"flex"} my="1rem">
                    <FormControl>
                      <FormLabel>Disponibilidade Para Tratamento:</FormLabel>
                      <RadioGroup
                        row
                        name="disponibilidadeTratamento"
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
              <FastField name="nivelAbstinencia">
                {() => (
                  <Box display={"flex"} my="1rem">
                    <FormControl>
                      <FormLabel>Nível de abstinência:</FormLabel>
                      <RadioGroup
                        row
                        name="nivelAbstinencia"
                        onChange={formikMeta.handleChange}
                      >
                        <FormControlLabel
                          value="L"
                          control={<Radio />}
                          label={"Baixo"}
                        />
                        <FormControlLabel
                          value="M"
                          control={<Radio />}
                          label={"Médio"}
                        />
                        <FormControlLabel
                          value="H"
                          control={<Radio />}
                          label={"Alto"}
                        />
                      </RadioGroup>
                    </FormControl>
                  </Box>
                )}
              </FastField>
              <FastField name="esperaInternacao">
                {() => (
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
                      value={formikMeta.values.esperaInternacao}
                      onChange={formikMeta.handleChange}
                    />
                  </Box>
                )}
              </FastField>
              <FastField name="expectativaSocial">
                {() => (
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
                      value={formikMeta.values.expectativaSocial}
                      onChange={formikMeta.handleChange}
                    />
                  </Box>
                )}
              </FastField>
              <FastField name="breveRelato">
                {() => (
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
                      value={formikMeta.values.breveRelato}
                      onChange={formikMeta.handleChange}
                    />
                  </Box>
                )}
              </FastField>
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
          </Form>
        )}
      </Formik>
    </Card>
  );
};

export default reavaliacao;
