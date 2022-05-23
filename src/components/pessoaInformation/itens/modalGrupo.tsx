import {
  Box,
  Button,
  Card, FormControl, InputLabel,
  MenuItem,
  Modal,
  Select
} from '@mui/material';
import axios from 'axios';
import { format } from 'date-fns';
import { Form, Formik } from 'formik';
import * as React from 'react';
import { Dispatch, FC } from 'react';
import { herokuConfig } from '../../../config';
import FlexBox from '../../FlexBox';

type Grupos = {
  id: number;
  nome: string;
  state: boolean;
}

interface ModalFilhoProps {
  open: boolean;
  setOpen: Dispatch<React.SetStateAction<boolean>>;
  setDadosAtributos: Dispatch<React.SetStateAction<any>>;
  setItemDados: Dispatch<React.SetStateAction<any>>;
  // openDados: Array<any>;
  // setDadosProps: Dispatch<React.SetStateAction<Array<any> >>;
  itemDados: any;
}

const modalTelefone: FC<ModalFilhoProps> = ({
  open,
  setOpen,
  setDadosAtributos,
  setItemDados,
  itemDados,
}) => {
  let user = localStorage.getItem('user');
  user = user === null ? '...' : user;
  const _user = JSON.parse(user);

  const initialValues = {
    id: 0 || itemDados?.id,
    id_pessoa: '' || itemDados?.id_pessoa,
    id_grupo_pertence: '' || itemDados?.id_grupo_pertence,
    dtalteracao: '' || itemDados?.dtalteracao,
    dtinclusao: '' || itemDados?.dtinclusao,
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

  // falta colocar o id, e o id_pessoa
  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, actions) => {
          setTimeout(() => {
            if (values.dtinclusao !== '') {
              values.dtalteracao = format(new Date(), 'dd-MM-yyyy HH:mm:ss');
            } else {
              values.dtinclusao = format(new Date(), 'dd-MM-yyyy HH:mm:ss');
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
              <FormControl fullWidth>
                <InputLabel defaultValue={0} id="id_grupo_pertence">
                  tipo de telefone
                </InputLabel>
                <Select
                  value={formikMeta.values.id_grupo_pertence}
                  fullWidth
                  id="id_grupo_pertence"
                  onChange={formikMeta.handleChange}
                  name="id_grupo_pertence"
                  label="tipo de telefone"
                >
                  {grupoPertence.map((option) => (
                    <MenuItem value={option.id} key={option.id}>
                      {option.nome}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <br />
              <br />
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
                      dtalteracao: '',
                      dtinclusao: '',
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
