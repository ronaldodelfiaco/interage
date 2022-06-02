import { Box, Button, Card, FormControl, MenuItem, Modal } from '@mui/material';
import axios from 'axios';
import { format } from 'date-fns';
import { Form, Formik } from 'formik';
import Router from 'next/router';
import * as React from 'react';
import { Dispatch, FC } from 'react';
import { IMaskInput } from 'react-imask';
import * as Yup from 'yup';
import { herokuConfig } from '../../../config';
import FlexBox from '../../FlexBox';
import LightTextField from '../../LightTextField';

// Remover quando acontecer o merge

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

const MaskDt = React.forwardRef<HTMLElement, CustomProps>(function maskDt(
  props,
  ref,
) {
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
});

// Remova até aqui

type Grupos = {
  id: number;
  nome: string;
  state: boolean;
};

interface ModalFilhoProps {
  open: boolean;
  setOpen: Dispatch<React.SetStateAction<boolean>>;
  setDadosAtributos: Dispatch<React.SetStateAction<any>>;
  setItemDados: Dispatch<React.SetStateAction<any>>;
  // openDados: Array<any>;
  // setDadosProps: Dispatch<React.SetStateAction<Array<any> >>;
  itemDados: any;
  editar: boolean;
}
// Adicionar YUP
const modalTelefone: FC<ModalFilhoProps> = ({
  open,
  setOpen,
  setDadosAtributos,
  setItemDados,
  itemDados,
  editar,
}) => {
  let user = localStorage.getItem('user');
  user = user === null ? '...' : user;
  const _user = JSON.parse(user);
  let itemDataInicio;
  let itemDataFim;

  const { id } = Router.query;
  const idPessoa = typeof id === 'string' ? parseInt(id) : null;

  try {
    const DataItem = new Date();
    const itemDataDia: number = +itemDados?.dt_inicial
      .split('-')[2]
      .split('T')[0];
    const itemDataMes: number = +itemDados?.dt_inicial.split('-')[1] - 1;
    const itemDataAno: number = +itemDados?.dt_inicial.split('-')[0];
    DataItem.setFullYear(itemDataAno, itemDataMes, itemDataDia);
    itemDataInicio = format(DataItem, 'dd/MM/yyyy');
  } catch (error) {
    itemDataInicio = '';
  }
  try {
    const DataItem = new Date();
    const itemDataDia: number = +itemDados?.dt_final
      .split('-')[2]
      .split('T')[0];
    const itemDataMes: number = +itemDados?.dt_final.split('-')[1] - 1;
    const itemDataAno: number = +itemDados?.dt_final.split('-')[0];
    DataItem.setFullYear(itemDataAno, itemDataMes, itemDataDia);
    itemDataFim = format(DataItem, 'dd/MM/yyyy');
  } catch (error) {
    itemDataFim = '';
  }

  const initialValues = editar
    ? {
        id: itemDados.id,
        id_grupo: itemDados?.id_grupo,
        dt_final: itemDataFim,
        dt_inicial: itemDataInicio,
      }
    : {
        id_pessoa: idPessoa,
        id_grupo: '',
        dt_final: '',
        dt_inicial: '',
      };

  const heroku = `${herokuConfig}genericCRUD?id_usuario=${_user?.id}&token=${_user?.token}&table=grupos`;

  const [grupoPertence, setGrupoPertence] = React.useState<Grupos[]>([]);

  React.useEffect(() => {
    axios
      .get(heroku)
      .then(({ data }: any) => {
        console.log(heroku);
        setGrupoPertence(data.body.rows);
      })
      .catch((error) => {
        console.log(2, error);
        setGrupoPertence([]);
      });
  }, [heroku]);

  const fieldValidationSchema = Yup.object().shape({
    dt_inicial: Yup.string().required('Campo obrigatório!'),
    id_grupo: Yup.string().required('Campo obrigatório!'),
  });

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <Formik
        initialValues={initialValues}
        validationSchema={fieldValidationSchema}
        onSubmit={(values, actions) => {
          setTimeout(() => {
            let dataInicial = new Date();
            const diaInicial: number = +values.dt_inicial.split('/')[0];
            const mesInicial: number = +values.dt_inicial.split('/')[1];
            const anoInicial: number = +values.dt_inicial.split('/')[2];
            dataInicial.setDate(diaInicial);
            dataInicial.setMonth(mesInicial - 1);
            dataInicial.setFullYear(anoInicial);
            values.dt_inicial = format(dataInicial, 'dd-MM-yyyy');

            try {
              let dataFinal = new Date();
              const diaFinal: number = +values.dt_final.split('/')[0];
              const mesFinal: number = +values.dt_final.split('/')[1];
              const anoFinal: number = +values.dt_final.split('/')[2];
              dataFinal.setDate(diaFinal);
              dataFinal.setMonth(mesFinal - 1);
              dataFinal.setFullYear(anoFinal);
              values.dt_final = format(dataFinal, 'dd-MM-yyyy');
            } catch (error) {
              values.dt_final = '';
            }

            setDadosAtributos(values), setOpen(false);
            actions.setSubmitting(false);
          }, 1000);
        }}
      >
        {(formikMeta) => (
          <Form>
            <Card
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 400,
                boxShadow: 1,
                p: 4,
              }}
            >
              <FlexBox
                my="1.5rem"
                flexWrap="wrap"
                alignItems="center"
                justifyContent="space-between"
              >
                <FormControl fullWidth>
                  <LightTextField
                    select
                    value={formikMeta.values.id_grupo}
                    id="id_grupo"
                    onChange={formikMeta.handleChange}
                    name="id_grupo"
                    label="grupo"
                    helperText={
                      formikMeta.touched.id_grupo && formikMeta.errors.id_grupo
                    }
                    error={Boolean(
                      formikMeta.touched.id_grupo && formikMeta.errors.id_grupo,
                    )}
                  >
                    {grupoPertence.map((option) => (
                      <MenuItem value={option.id} key={option.id}>
                        {option.nome}
                      </MenuItem>
                    ))}
                  </LightTextField>
                </FormControl>
              </FlexBox>
              <FlexBox
                my="1.5rem"
                flexWrap="wrap"
                alignItems="center"
                justifyContent="space-between"
              >
                <LightTextField
                  label="Data Inicial"
                  fullWidth
                  value={formikMeta.values.dt_inicial}
                  onChange={formikMeta.handleChange}
                  name="dt_inicial"
                  helperText={
                    formikMeta.touched.dt_inicial &&
                    formikMeta.errors.dt_inicial
                  }
                  error={Boolean(
                    formikMeta.touched.dt_inicial &&
                      formikMeta.errors.dt_inicial,
                  )}
                  InputProps={{
                    inputComponent: MaskDt as any,
                  }}
                />
              </FlexBox>
              <FlexBox
                my="1.5rem"
                flexWrap="wrap"
                alignItems="center"
                justifyContent="space-between"
              >
                <LightTextField
                  label="Data Final"
                  fullWidth
                  value={formikMeta.values.dt_final}
                  onChange={formikMeta.handleChange}
                  name="dt_final"
                  InputProps={{
                    inputComponent: MaskDt as any,
                  }}
                />
              </FlexBox>

              <FlexBox justifyContent="space-between" alignItems="center">
                <Button fullWidth type="submit" variant="contained">
                  Enviar
                </Button>
                <Box width={40} />
                <Button
                  variant="contained"
                  fullWidth
                  onClick={() => {
                    setOpen(false);
                    setItemDados({
                      id: -1,
                      id_pessoa: '',
                      id_grupo_pertence: 0,
                      dt_inicial: '',
                      dt_final: '',
                    });
                  }}
                >
                  Cancelar
                </Button>
              </FlexBox>
            </Card>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default modalTelefone;
