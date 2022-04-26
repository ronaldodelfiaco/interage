import { Box, Button, Card } from "@mui/material";
import { useFormik } from "formik";
import { FC } from "react";
import LightTextField from "../components/LightTextField";
import MaskCPFCNPJ from "../components/masks/maskCPFCNPJ";
import MaskDt from "../components/masks/maskDt";
import * as Yup from "yup";

const teste: FC = () => {
  const initialValues = {
    nome: "",
    sobrenome: "",
    idade: "",
    cpf: "",
    teste: "",
  };

  const fieldValidationSchema = Yup.object().shape({
    nome: Yup.string()
      .min(3, "Nome muito curto")
      .required("Campo obrigatório!"),
    cpf: Yup.string().min(14, "CPF muito curto").required("Campo obrigatório!"),
  });

  const { values, handleChange, handleSubmit } = useFormik({
    initialValues,
    validationSchema: fieldValidationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <Card sx={{ padding: "1.5rem", pb: "4rem" }}>
      <form onSubmit={handleSubmit}>
        <LightTextField
          value={values.nome}
          onChange={handleChange}
          name="nome"
          label="Nome"
          fullWidth
        />
        <LightTextField
          value={values.sobrenome}
          onChange={handleChange}
          name="sobrenome"
          label="Sobrenome"
          fullWidth
        />

        <MaskCPFCNPJ
          value={values.cpf}
          onChange={handleChange}
          name="cpf"
          label="cpf ou cnpj"
        />

        <MaskDt
          value={values.teste}
          onChange={handleChange}
          name="teste"
          label="Teste"
          fullWidth
        />
        <LightTextField
          value={values.idade}
          onChange={handleChange}
          name="idade"
          label="Idade"
          fullWidth
        />
        <Button type="submit">Enviar</Button>
      </form>
    </Card>
  );
};

export default teste;
