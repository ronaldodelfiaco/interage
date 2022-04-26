import { Button, Card } from "@mui/material";
import { useFormik } from "formik";
import { FC } from "react";
import LightTextField from "../components/LightTextField";

const teste: FC = () => {
  const initialValues = {
    nome: "",
    sobrenome: "",
    idade: "",
    cpf: "",
    teste: "",
  };

  const { values, handleChange, handleSubmit } = useFormik({
    initialValues,
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
        <LightTextField
          value={values.cpf}
          onChange={handleChange}
          name="cpf"
          label="CPF"
          fullWidth
        />
        <LightTextField
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
