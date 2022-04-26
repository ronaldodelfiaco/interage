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
import router from "next/router";
import * as React from "react";
import { FC } from "react";
import LightTextField from "../components/LightTextField";
import MaskCPFCNPJ from "../components/masks/maskCPFCNPJ";
import MaskDt from "../components/masks/maskDt";
import useTitle from "../hooks/useTitle";

const reavaliacao: FC<{}> = () => {
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
    QualidadeSono: "",
    comendo: "",
    ingestaoAgua: "",
    deficiencia: "",
    QualDeficiencia: "",
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
      console.log(reavaliacao);
      const JSONdata = JSON.stringify(reavaliacao);
      console.log(JSONdata);
    },
  });
  useTitle("Reavaliação" + " " + values.nome);

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
            />
          </Box>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6}>
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
            <RadioGroup row name="tratamentoMedico" onChange={handleChange}>
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
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <LightTextField
                  fullWidth
                  name="porQue"
                  label="Por quê?"
                  value={values.porQue}
                  onChange={handleChange}
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
              />
            </Box>
          ) : null}
          <Box display={"flex"} my="1rem">
            <Typography variant="h6">
              Costuma sentir tonturas ou ter desmaios?
            </Typography>
            <RadioGroup row name="temTontura" onChange={handleChange}>
              <FormControlLabel value="N" control={<Radio />} label="Não" />
              <FormControlLabel value="Y" control={<Radio />} label="Sim" />
            </RadioGroup>
          </Box>

          <Box display={"flex"} my="1rem">
            <Typography variant="h6">
              Pensamentos ou tentativas de suicídio?
            </Typography>
            <RadioGroup row name="tentativaSuicidio" onChange={handleChange}>
              <FormControlLabel value="N" control={<Radio />} label="Não" />
              <FormControlLabel value="Y" control={<Radio />} label="Sim" />
            </RadioGroup>
          </Box>
          <Box display={"flex"} my="1rem">
            <Typography variant="h6">Qualidade do sono:</Typography>
            <RadioGroup row name="QualidadeSono" onChange={handleChange}>
              <FormControlLabel value="Bem" control={<Radio />} label="Bem" />
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
          </Box>
          <Box display={"flex"} my="1rem">
            <Typography variant="h6">Se Alimenta:</Typography>
            <RadioGroup row name="comendo" onChange={handleChange}>
              <FormControlLabel value="Bem" control={<Radio />} label="Bem" />
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
              name="ingestaoAgua"
              label="Ingestão de água (copos/ dia)"
              value={values.ingestaoAgua}
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
                  name="QualDeficiencia"
                  label="Qual?"
                  value={values.QualDeficiencia}
                  onChange={handleChange}
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
                />
              </Box>
            ) : null}
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
