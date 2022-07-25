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
  MenuItem,
  Radio,
  RadioGroup,
  Typography,
} from '@mui/material';
import axios from 'axios';
import { format } from 'date-fns';
import { FastField, Form, Formik } from 'formik';
import router from 'next/router';
import { FC, MouseEvent, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import * as Yup from 'yup';
// import { IMaskInput } from 'react-imask';
import AddIconButton from '../components/AddIconButton';
import FlexBox from '../components/FlexBox';
import VectorUI from '../components/VectorUI';
import ListCard from '../components/itens/ListCard';
import ModalFilho from '../components/itens/ModalFilho';
import ModalIrmao from '../components/itens/ModalIrmao';
import LightTextField from '../components/LightTextField';
import MaskCPFCNPJ from '../components/masks/maskCPFCNPJ';
import MaskDt from '../components/masks/maskDt';
import MoreOptions from '../components/MoreOptions';
import { adicionarPessoa } from '../components/pessoaInformation/LerDados';
import { Tiny } from '../components/Typography';
import { herokuConfig } from '../config';
import useTitle from '../hooks/useTitle';

type infoPessoa = {
  id_pronome_tratamento: number;
  natural_id_cidade: number;
  idade: number;
  dt_expedicao_rg: string;
  id_pessoas_grupos: number;
  datanascimento: string;
  grupo_principal: boolean;
  id_escolaridade: number;
  id_atividade: number;
  id_pessoas_enderecos: number;
  cnh_validade: string;
  status: boolean;
  id: number;
  cep: string;
  dtinclusao: string;
  dtalteracao: string;
  ddd: number;
  telefone: number;
  grupo: string;
  pronome: string;
  atividade: string;
  logradouro: string;
  bairro: string;
  cidade: string;
  uf_cidade: string;
  complemento: string;
  tipo: string;
  nome: string;
  apelido_fantasia: string;
  email: string;
  website: string;
  cpf_cnpj: string;
  rg_ie: string;
  orgaoemissor: string;
  rg_uf: string;
  rg_via: string;
  observacoes: string;
  sexo: string;
  nacionalidade: string;
  estado_civil: string;
  cnh: string;
  cnh_categoria: string;
  natural: string;
};

type filho = {
  nome: String;
  idade: number;
  idPessoa: number;
  idRelacionamento: number;
};

type irmao = {
  nome: String;
  idade: number;
  idPessoa: number;
  idRelacionamento: number;
};

type escolariedade = {
  id: number;
  nome: string;
};

interface AnamneseProps {
  idPessoa: string;
}

const Anamnese: FC<AnamneseProps> = ({ idPessoa }) => {
  var title = 'Anamnese';
  useTitle(title);

  let user = localStorage.getItem('user');
  user = user === null ? '...' : user;
  const _user = JSON.parse(user);

  const [infoPessoa, setInfoPessoa] = useState<infoPessoa>();
  const [itemDados, setItem] = useState<number>(0);

  const [openModalFilho, setOpenModalFilho] = useState(false);
  const [openModalIrmao, setOpenModalIrmao] = useState(false);

  const [filhos, setFilhos] = useState<filho[]>([]);
  var filho1: filho[];

  const [irmaos, setIrmaos] = useState<irmao[]>([]);
  var irmao1: irmao[];

  const [newFilhoDados, setNewFilhoDados] = useState<filho>();
  const [newIrmaoDados, setNewIrmaoDados] = useState<irmao>();

  const [editarFilho, setEditarFilho] = useState(false);
  const [editarIrmao, setEditarIrmao] = useState(false);

  const [postgresJson, setPostgres] = useState();

  const [escolaridadeInfo, setEscolariedadeInfo] = useState<escolariedade[]>(
    [],
  );

  const [cpfPessoa, setCPFPessoa] = useState('');

  const heroku = `${herokuConfig}genericCRUD?id_usuario=${_user?.id}&token=${_user?.token}`;
  const herokuSQL = `${herokuConfig}executaSQL?id_usuario=${_user?.id}&token=${_user?.token}`;
  const herokuEscolariedade = `sql=select DISTINCT e.id, e.nome from public.escolaridade e`;

  useEffect(() => {
    axios
      .get(heroku + `&table=ficha_anamnese`, {
        params: {
          filter: `id_pessoa=${idPessoa}`,
        },
      })
      .then(({ data }: any) => {
        setPostgres(data.body.rows[0].anamnese);
        console.log(data);
      })
      .catch((error) => {
        setPostgres(undefined);
      });
    axios
      .get(heroku + `&table=pessoas`, {
        params: {
          filter: `id=${idPessoa}`,
        },
      })
      .then(({ data }: any) => {
        setCPFPessoa(data.body.rows[0].cpf_cnpj);
      })
      .catch((error) => {
        console.log(2, error);
      });
  }, [heroku]);

  useEffect(() => {
    axios
      .post(herokuSQL, herokuEscolariedade)
      .then((response) => {
        setEscolariedadeInfo(response.data.body.table);
      })
      .catch((error) => {
        console.error(error);
        setEscolariedadeInfo([]);
      });
  }, [herokuSQL]);

  useEffect(() => {
    if (!openModalFilho && editarFilho) {
      setEditarFilho(false);
    }
  }, [openModalFilho]);

  useEffect(() => {
    if (!openModalIrmao && editarIrmao) {
      setEditarIrmao(false);
    }
  }, [openModalIrmao]);

  useEffect(() => {
    filho1 = [];
    setFilhos(filho1);
    irmao1 = [];
    setIrmaos(irmao1);
  }, []);

  useEffect(() => {
    if (newFilhoDados !== undefined) {
      if (!editarFilho) {
        setFilhos((prevFilhos) => [
          ...prevFilhos,
          {
            nome: newFilhoDados.nome,
            idade: newFilhoDados.idade,
            idPessoa: 0,
            idRelacionamento: 3,
          },
        ]);
      } else {
        filhos.forEach((Element) => {
          const index = filhos.indexOf(Element);
          filhos.splice(index, 1, newFilhoDados);
          filhos.splice(newFilhoDados.idRelacionamento, 1, newFilhoDados);
          setEditarFilho(false);
        });
      }
    }
  }, [newFilhoDados]);

  useEffect(() => {
    if (newIrmaoDados !== undefined) {
      if (!editarFilho) {
        setIrmaos((prevIrmaos) => [
          ...prevIrmaos,
          {
            nome: newIrmaoDados.nome,
            idade: newIrmaoDados.idade,
            idPessoa: 0,
            idRelacionamento: 3,
          },
        ]);
      } else {
        irmaos.forEach((Element) => {
          const index = irmaos.indexOf(Element);
          irmaos.splice(index, 1, newIrmaoDados);
          irmaos.splice(newIrmaoDados.idRelacionamento, 1, newIrmaoDados);
          setEditarFilho(false);
          setItem(0);
        });
      }
    }
  }, [newIrmaoDados]);

  const [idEdit, setIdEdit] = useState(0);
  const [filhoEl, setfilhoEl] = useState<null | HTMLElement>(null);
  const handlefilhoMoreOpen = (event: MouseEvent<HTMLButtonElement>) => {
    setfilhoEl(event.currentTarget);
  };
  const handlefilhoMoreClose = () => setfilhoEl(null);

  const [irmaoEl, setirmaoEl] = useState<null | HTMLElement>(null);
  const handleirmaoMoreOpen = (event: MouseEvent<HTMLButtonElement>) => {
    setirmaoEl(event.currentTarget);
  };
  const handleirmaoMoreClose = () => setirmaoEl(null);

  const initialValues = {
    cpf: '',
    nome: '',
    dataNascimento: '',
    estadoCivil: '',
    naturalidade: '',
    nomeEsposa: '',
    tempoCasado: '',
    idadeEsposa: '',
    profissaoEsposa: '',
    esposaUsuaria: [],
    estadoCivilPais: '',
    paisVivos: [],
    nomePai: '',
    idadePai: '',
    profissaoPai: '',
    nomeMae: '',
    idadeMae: '',
    profissaoMae: '',
    moraQuem: '',
    enderecoAtual: '',
    bairroAtual: '',
    cidadeAtual: '',
    profissao: '',
    localFuncao: '',
    afastado: '',
    escolaridade: -1,
    motivoAbandono: '',
    drogasAlcool: '',
    usaQuaisDrogas: [],
    idadeAlcool: '',
    idadeMaconha: '',
    idadeCocainaI: '',
    idadeCocainaA: '',
    idadeCrack: '',
    idadeComprimido: '',
    idadeLSD: '',
    idadeInalantes: '',
    idadeMesclado: '',
    idadeTabaco: '',
    idadeOutras: '',
    quaisOutras: '',
    motivoInicio: '',
    tipodroga: '',
    observacoes: '',
    periodoAbstinencia: '',
    situacoesUso: [],
    observacoesB: '',
    familiaUsaDrogas: '',
    familiaGrauParentesco: '',
    temNamorada: '',
    namoradaNome: '',
    namoradaTempo: '',
    namoradaUsaDrogas: '',
    namoradaDrogaTipo: '',
    comoSeSenteNoUso: '',
    mudancasComportamento: '',
    prejuisoUso: '',
    comoFinanciaUso: '',
    lugaresUso: '',
    percebeuProblemaUso: '',
    tempoSemUso: '',
    comoEstaVida: '',
    relacionamentoFamiliar: '',
    comQuemMora: '',
    apoioFamiliarTratamento: '',
    relacionamentoPai: '',
    relacionamentoMae: '',
    relacionamentoIrmao: '',
    relacionamentoEsposo: '',
    relacionamentoFilhos: '',
    relacionamentoSocial: '',
    periodoSono: '',
    temPesadelos: '',
    observacaoGeral: '',
    alimentecao: '',
    temAlucinacao: '',
    qtdTipoAlucinacaoDroga: '',
    alucinacaoSemDrogas: '',
    qtdTipoAlucinacao: '',
    tipoAlucinacao: '',
    descricaoAlucinacao: '',
    desmaioComDrogas: '',
    qndTipoDrogaDesmaio: '',
    desmaioSemDrogas: '',
    qndDesmaio: '',
    desmaioDescricao: '',
    temOverdose: '',
    qtdTipoDrogaOverdose: '',
    tomaRemedio: '',
    sobreRemedio: '',
    sintomasAnteriores: [],
    outroSintomasAnteriores: '',
    acidentes: '',
    cirurgias: '',
    tratamentosAnteriores: '',
    consideraDependente: '',
    consideraDependenteJustificativa: '',
    motivoProcuraInstituicao: '',
    expectaviaTratamento: '',
    problemaJustica: '',
    temProcesso: '',
    porqueProblemaJustica: '',
  };

  const fieldValidationSchema = Yup.object().shape({
    nome: Yup.string()
      .min(3, 'Nome muito curto')
      .required('Campo obrigatório!'),
    cpf: Yup.string().min(14, 'CPF muito curto').required('Campo obrigatório!'),
    dataNascimento: Yup.string().required('Campo obrigatório!'),
    naturalidade: Yup.string().required('Campo obrigatório!'),
    estadoCivil: Yup.string().optional(),
    escolaridade: Yup.string().optional(),
    enderecoAtual: Yup.string().optional(),
    bairroAtual: Yup.string().optional(),
    cidadeAtual: Yup.string().optional(),
  });

  const editarFilhoInfo = () => {
    setItem(idEdit);
    setEditarFilho(true), setOpenModalFilho(true);
    handlefilhoMoreClose();
  };

  const editarIrmaoInfo = () => {
    setItem(idEdit);
    setEditarIrmao(true), setOpenModalIrmao(true);
    handleirmaoMoreClose();
  };

  const apagarFilhoInfo = () => {
    filhos.splice(idEdit, 1);
    handlefilhoMoreClose();
  };

  const apagarIrmaoInfo = () => {
    irmaos.splice(idEdit, 1);
    handleirmaoMoreClose();
  };

  const testeIgual = (cpf: string) => {
    const cpfTratada = cpf
      .replaceAll('.', '')
      .replaceAll('-', '')
      .replaceAll('/', '');
    axios
      .get(heroku + `&table=view_pessoas`, {
        params: {
          filter: `cpf_cnpj='${cpfTratada}'`,
        },
      })
      .then(({ data }: any) => {
        if (typeof data !== 'undefined') {
          setInfoPessoa(data.body.rows[0]);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Card sx={{ padding: '1.5rem', pb: '4rem' }}>
      <Formik
        initialValues={initialValues}
        validationSchema={fieldValidationSchema}
        onSubmit={(values, actions) => {
          const hoje = format(new Date(), 'dd-MM-yyyy HH:mm:ss');
          if (idPessoa) {
            setTimeout(() => {
              const dia: number = +values.dataNascimento.split('/')[0];
              const mes: number = +values.dataNascimento.split('/')[1];
              const ano: number = +values.dataNascimento.split('/')[2];
              let data = new Date();
              data.setDate(dia);
              data.setMonth(mes);
              data.setFullYear(ano);
              data.setHours(0);
              data.setMinutes(0);
              data.setSeconds(0);
              const adicional = {
                cpf: values.cpf
                  .replaceAll('.', '')
                  .replaceAll('-', '')
                  .replaceAll('/', ''),
                dtInsercao: hoje,
                dataNascimento: format(data, 'dd/MM/yyyy HH:mm:ss'),
              };
              const reavaliacao = Object.assign(values, adicional);
              const JSONdata = JSON.stringify(reavaliacao);
              console.log(1, reavaliacao);
              console.log(2, JSONdata);
              actions.setSubmitting(false);

              // Enviar para o banco de dados

              axios
                .post(heroku + `&table=ficha_anamnese`, {
                  id_pessoa: idPessoa,
                  status: true,
                  anamnese: JSONdata,
                })
                .then((Response) => {
                  toast.success('Enviado com Sucesso');
                })
                .catch((error) => {
                  console.log('Heroku', heroku + '&id=' + idPessoa);
                  console.log(error);
                  toast.error('Não foi possivel Enviar');
                });
            }, 1000);
          } else {
            // Criar Pessoa
            const newPessoa = {
              cpf: values.cpf,
              nome: values.nome,
              datanascimento: values.dataNascimento,
              dtinclusao: hoje,
              dtalteracao: hoje,
            };
            adicionarPessoa(newPessoa);
          }
          window.scrollTo(0, 0);
        }}
      >
        {(formikMeta) => {
          useEffect(() => {
            infoPessoa ? (formikMeta.values.nome = infoPessoa.nome) : null;
            infoPessoa
              ? (formikMeta.values.dataNascimento = format(
                  new Date(infoPessoa?.datanascimento),
                  'dd/MM/yyyy',
                ))
              : null;
            infoPessoa
              ? formikMeta.setFieldValue('estadoCivil', infoPessoa.estado_civil)
              : null;
            infoPessoa
              ? formikMeta.setFieldValue('naturalidade', infoPessoa.natural)
              : null;
            infoPessoa
              ? formikMeta.setFieldValue(
                  'escolaridade',
                  infoPessoa.id_escolaridade,
                )
              : null;
            infoPessoa
              ? formikMeta.setFieldValue('enderecoAtual', infoPessoa.logradouro)
              : null;
            infoPessoa
              ? formikMeta.setFieldValue('bairroAtual', infoPessoa.bairro)
              : null;
            infoPessoa
              ? formikMeta.setFieldValue('cidadeAtual', infoPessoa.cidade)
              : null;
          }, [infoPessoa]);

          useEffect(
            function () {
              if (typeof postgresJson !== 'undefined') {
                postgresJson ? formikMeta.setValues(postgresJson) : null;
              } else if (
                typeof postgresJson === 'undefined' &&
                typeof idPessoa !== 'undefined' &&
                cpfPessoa !== ''
              ) {
                formikMeta.setFieldValue('cpf', cpfPessoa, true);
                testeIgual(formikMeta.values.cpf);
              }
            },
            [cpfPessoa, postgresJson],
          );

          return (
            <Form>
              <FlexBox
                display="flex"
                my="1.5rem"
                flexWrap="wrap"
                alignItems="center"
                justifyContent="space-between"
              >
                <Typography variant="h5">Identificação</Typography>
              </FlexBox>
              <Card sx={{ padding: 3, pb: 4 }}>
                <FastField name="cpf">
                  {() => (
                    <FlexBox
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
                        onBlur={
                          (testeIgual(formikMeta.values.cpf),
                          formikMeta.handleBlur)
                        }
                        helperText={
                          formikMeta.touched.cpf && formikMeta.errors.cpf
                        }
                        error={Boolean(
                          formikMeta.touched.cpf && formikMeta.errors.cpf,
                        )}
                        InputProps={{
                          inputComponent: MaskCPFCNPJ as any,
                        }}
                      />
                    </FlexBox>
                  )}
                </FastField>
                <FastField name="nome">
                  {() => (
                    <FlexBox
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
                        onBlur={formikMeta.handleBlur}
                        error={Boolean(
                          formikMeta.touched.nome && formikMeta.errors.nome,
                        )}
                        helperText={
                          formikMeta.touched.nome && formikMeta.errors.nome
                        }
                      />
                    </FlexBox>
                  )}
                </FastField>
                <FastField name="dataNascimento">
                  {() => (
                    <FlexBox
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
                        helperText={
                          formikMeta.touched.dataNascimento &&
                          formikMeta.errors.dataNascimento
                        }
                        error={Boolean(
                          formikMeta.touched.dataNascimento &&
                            formikMeta.errors.dataNascimento,
                        )}
                        InputProps={{
                          inputComponent: MaskDt as any,
                        }}
                      />
                    </FlexBox>
                  )}
                </FastField>
                <FastField name="naturalidade">
                  {() => (
                    <FlexBox
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
                        // helperText={
                        //   formikMeta.touched.naturalidade &&
                        //   formikMeta.errors.naturalidade
                        // }
                        // error={Boolean(
                        //   formikMeta.touched.naturalidade &&
                        //     formikMeta.errors.naturalidade,
                        // )}
                      />
                    </FlexBox>
                  )}
                </FastField>
                <FastField name="estadoCivil">
                  {() => (
                    <FlexBox my="1rem">
                      <FormControl>
                        <FormLabel>Estado Civil</FormLabel>
                        <RadioGroup
                          row
                          name="estadoCivil"
                          onChange={formikMeta.handleChange}
                          value={formikMeta.values.estadoCivil}
                        >
                          <FormControlLabel
                            value="S"
                            control={<Radio />}
                            label={'Solteiro (a)'}
                          />
                          <FormControlLabel
                            value="C"
                            control={<Radio />}
                            label={'Casado (a)'}
                          />
                          <FormControlLabel
                            value="A"
                            control={<Radio />}
                            label={'Amasiado (a)'}
                          />
                          <FormControlLabel
                            value="V"
                            control={<Radio />}
                            label={'Viúvo (a)'}
                          />
                          <FormControlLabel
                            value="s"
                            control={<Radio />}
                            label={'Separado (a)'}
                          />
                          <FormControlLabel
                            value="D"
                            control={<Radio />}
                            label={'Desquitado (a)'}
                          />
                          <FormControlLabel
                            value="d"
                            control={<Radio />}
                            label={'Divorciado (a)'}
                          />
                        </RadioGroup>
                      </FormControl>
                    </FlexBox>
                  )}
                </FastField>
              </Card>
              <FlexBox
                display="flex"
                my="1.5rem"
                flexWrap="wrap"
                alignItems="center"
                justifyContent="space-between"
              >
                <Typography variant="h5">Esposo(a)</Typography>
              </FlexBox>
              <Card sx={{ padding: 3, pb: 4 }}>
                <FastField name="nomeEsposa">
                  {() => (
                    <FlexBox
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
                    </FlexBox>
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
                </Grid>{' '}
                <FastField name="profissaoEsposa">
                  {() => (
                    <FlexBox
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
                    </FlexBox>
                  )}
                </FastField>
                <FastField name="esposaUsuaria">
                  {() => (
                    <FlexBox my="1rem">
                      <FormControl>
                        <FormLabel>Usuária (o)</FormLabel>
                        <FormGroup row onChange={formikMeta.handleChange}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={
                                  formikMeta.values.esposaUsuaria.find(
                                    (element) => element === 'UsuariaAlcool',
                                  ) !== undefined
                                }
                              />
                            }
                            label="álcool"
                            value="UsuariaAlcool"
                            name="esposaUsuaria"
                          />
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={
                                  formikMeta.values.esposaUsuaria.find(
                                    (element) => element === 'UsuariaDrogas',
                                  ) !== undefined
                                }
                              />
                            }
                            label="drogas"
                            value="UsuariaDrogas"
                            name="esposaUsuaria"
                          />
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={
                                  formikMeta.values.esposaUsuaria.find(
                                    (element) => element === 'UsuariaTabaco',
                                  ) !== undefined
                                }
                              />
                            }
                            label="tabaco"
                            value="UsuariaTabaco"
                            name="esposaUsuaria"
                          />
                        </FormGroup>
                      </FormControl>
                    </FlexBox>
                  )}
                </FastField>
              </Card>
              <FlexBox
                display="flex"
                my="1.5rem"
                flexWrap="wrap"
                alignItems="center"
                justifyContent="space-between"
              >
                <Typography variant="h5">Filho</Typography>
              </FlexBox>
              {/* <Card sx={{ padding: 3, pb: 4 }}>
                 <Grid container spacing={3} pt={3}>
                  {filhos.map((value, index) => (
                    <Grid item xs={12} sm={6} key={value.idRelacionamento}>
                      <ListCard
                        setID={setIdEdit}
                        index={index}
                        item={value}
                        handleMore={handlefilhoMoreOpen}
                      />
                    </Grid>
                  ))}
                  <MoreOptions
                    id={idEdit}
                    anchorEl={filhoEl}
                    handleMoreClose={handlefilhoMoreClose}
                    editar={editarFilhoInfo}
                    apagar={apagarFilhoInfo}
                  />
*/}
              <Card sx={{ padding: 3, pb: 4 }}>
                <VectorUI
                  Array={filhos}
                  setItem={setItem}
                  setEdit={setEditarFilho}
                  setOpenModal={setOpenModalFilho}
                  ListCard={ListCard}
                />

                <Grid item xs={12} sm={6}>
                  <FlexBox alignItems="center">
                    <AddIconButton onClick={() => setOpenModalFilho(true)} />
                    <Box ml="1rem">
                      <Typography variant="h6">Adicionar</Typography>
                      <Tiny color="secondary.400">novo Filho(a)</Tiny>
                    </Box>

                    <ModalFilho
                      open={openModalFilho}
                      setOpen={setOpenModalFilho}
                      setDadosAtributos={setNewFilhoDados}
                      itemDados={filhos[itemDados]}
                      editar={editarFilho}
                    />
                  </FlexBox>
                </Grid>
              </Card>
              {/*</Grid> 
                </Grid> 
                </Card> */}
              <FlexBox
                display="flex"
                my="1.5rem"
                flexWrap="wrap"
                alignItems="center"
                justifyContent="space-between"
              >
                <Typography variant="h5">Pais</Typography>
              </FlexBox>
              <Card sx={{ padding: 3, pb: 4 }}>
                <FastField name="estadoCivilPais">
                  {() => (
                    <FlexBox my="1rem">
                      <FormControl>
                        <FormLabel>Estado Civil</FormLabel>
                        <RadioGroup
                          row
                          name="estadoCivilPais"
                          onChange={formikMeta.handleChange}
                          value={formikMeta.values.estadoCivilPais}
                        >
                          <FormControlLabel
                            value="S"
                            control={<Radio />}
                            label={'Solteiro (a)'}
                          />
                          <FormControlLabel
                            value="C"
                            control={<Radio />}
                            label={'Casado (a)'}
                          />
                          <FormControlLabel
                            value="A"
                            control={<Radio />}
                            label={'Amasiado (a)'}
                          />
                          <FormControlLabel
                            value="V"
                            control={<Radio />}
                            label={'Viúvo (a)'}
                          />
                          <FormControlLabel
                            value="s"
                            control={<Radio />}
                            label={'Separado (a)'}
                          />
                          <FormControlLabel
                            value="D"
                            control={<Radio />}
                            label={'Desquitado (a)'}
                          />
                          <FormControlLabel
                            value="d"
                            control={<Radio />}
                            label={'Divorciado (a)'}
                          />
                        </RadioGroup>
                      </FormControl>
                    </FlexBox>
                  )}
                </FastField>
                <FastField name="paisVivos">
                  {() => (
                    <FlexBox my="1rem">
                      <FormControl>
                        <FormLabel>Pais Vivos</FormLabel>
                        <FormGroup onChange={formikMeta.handleChange} row>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={
                                  formikMeta.values.paisVivos.find(
                                    (element) => element === 'paiVivo',
                                  ) !== undefined
                                }
                              />
                            }
                            label="Pai"
                            value="paiVivo"
                            name="paisVivos"
                          />
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={
                                  formikMeta.values.paisVivos.find(
                                    (element) => element === 'maeVivo',
                                  ) !== undefined
                                }
                              />
                            }
                            label="Mãe"
                            value="maeVivo"
                            name="paisVivos"
                          />
                        </FormGroup>
                      </FormControl>
                    </FlexBox>
                  )}
                </FastField>

                <Card sx={{ padding: 3, pb: 4 }}>
                  <FastField name="nomePai">
                    {() => (
                      <FlexBox
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
                      </FlexBox>
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
                      <FlexBox
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
                      </FlexBox>
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
              <FlexBox
                display="flex"
                my="1.5rem"
                flexWrap="wrap"
                alignItems="center"
                justifyContent="space-between"
              >
                <Typography variant="h5">Endereço</Typography>
              </FlexBox>
              <Card sx={{ padding: 3, pb: 4 }}>
                <FastField name="moraQuem">
                  {() => (
                    <FlexBox
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
                    </FlexBox>
                  )}
                </FastField>
                <Grid container spacing={4}>
                  <Grid item xs={12} sm={6}>
                    <LightTextField
                      fullWidth
                      name="enderecoAtual"
                      label="Endereço atual"
                      value={formikMeta.values.enderecoAtual}
                      onChange={formikMeta.handleChange}
                      error={Boolean(
                        formikMeta.touched.enderecoAtual &&
                          formikMeta.errors.enderecoAtual,
                      )}
                      helperText={
                        formikMeta.touched.enderecoAtual &&
                        formikMeta.errors.enderecoAtual
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <LightTextField
                      fullWidth
                      name="bairroAtual"
                      label="Bairro"
                      value={formikMeta.values.bairroAtual}
                      onChange={formikMeta.handleChange}
                      error={Boolean(
                        formikMeta.touched.bairroAtual &&
                          formikMeta.errors.bairroAtual,
                      )}
                      helperText={
                        formikMeta.touched.bairroAtual &&
                        formikMeta.errors.bairroAtual
                      }
                    />
                  </Grid>
                </Grid>
                <FlexBox
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
                    onBlur={formikMeta.handleBlur}
                    error={Boolean(
                      formikMeta.touched.cidadeAtual &&
                        formikMeta.errors.cidadeAtual,
                    )}
                    helperText={
                      formikMeta.touched.cidadeAtual &&
                      formikMeta.errors.cidadeAtual
                    }
                  />
                </FlexBox>
              </Card>
              <FlexBox
                display="flex"
                my="1.5rem"
                flexWrap="wrap"
                alignItems="center"
                justifyContent="space-between"
              >
                <Typography variant="h5">Profissão</Typography>
              </FlexBox>
              <Card sx={{ padding: 3, pb: 4 }}>
                <FastField name="profissao">
                  {() => (
                    <FlexBox my="1rem">
                      <FormControl>
                        <FormLabel>Trabalha atualmente?</FormLabel>
                        <RadioGroup
                          row
                          name="profissao"
                          onChange={formikMeta.handleChange}
                          value={formikMeta.values.profissao}
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
                    </FlexBox>
                  )}
                </FastField>
                {formikMeta.values.profissao === 'Y' ? (
                  <FastField name="localFuncao">
                    {() => (
                      <FlexBox
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
                      </FlexBox>
                    )}
                  </FastField>
                ) : null}
                <FastField name="afastado">
                  {() => (
                    <FlexBox my="1rem">
                      <FormControl>
                        <FormLabel>
                          Está afastado pela Previdência Social?
                        </FormLabel>
                        <RadioGroup
                          row
                          name="afastado"
                          onChange={formikMeta.handleChange}
                          value={formikMeta.values.afastado}
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
                    </FlexBox>
                  )}
                </FastField>
                <FlexBox
                  my="1.5rem"
                  flexWrap="wrap"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <FormControl fullWidth>
                    <LightTextField
                      select
                      value={formikMeta.values.escolaridade}
                      id="escolaridade"
                      onChange={formikMeta.handleChange}
                      name="escolaridade"
                      label="Escolaridade"
                      error={Boolean(
                        formikMeta.touched.escolaridade &&
                          formikMeta.errors.escolaridade,
                      )}
                    >
                      {escolaridadeInfo.map((option) => (
                        <MenuItem value={option.id} key={option.id}>
                          {option.nome}
                        </MenuItem>
                      ))}
                    </LightTextField>
                  </FormControl>
                </FlexBox>
                <FastField name="motivoAbandono">
                  {() => (
                    <FlexBox
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
                    </FlexBox>
                  )}
                </FastField>
              </Card>
              <FlexBox
                display="flex"
                my="1.5rem"
                flexWrap="wrap"
                alignItems="center"
                justifyContent="space-between"
              >
                <Typography variant="h5">Irmão</Typography>
              </FlexBox>
              {/* <Card sx={{ padding: 3, pb: 4 }}>
                <Grid container spacing={3} pt={3}>
                  {irmaos.map((value, index) => (
                    <Grid item xs={12} sm={6} key={index}>
                      <ListCard
                        setID={setIdEdit}
                        index={index}
                        item={value}
                        handleMore={handleirmaoMoreOpen}
                      />
                    </Grid>
                  ))}
                  <MoreOptions
                    id={idEdit}
                    anchorEl={irmaoEl}
                    handleMoreClose={handleirmaoMoreClose}
                    editar={editarIrmaoInfo}
                    apagar={apagarIrmaoInfo}
                  />
*/}
              <Card sx={{ padding: 3, pb: 4 }}>
                <Grid container spacing={3} pt={3}>
                  <VectorUI
                    Array={irmaos}
                    setEdit={setEditarIrmao}
                    setItem={setItem}
                    setOpenModal={setOpenModalIrmao}
                    ListCard={ListCard}
                  />
                  <Grid item xs={12} sm={6}>
                    <FlexBox alignItems="center">
                      <AddIconButton onClick={() => setOpenModalIrmao(true)} />
                      <FlexBox ml="1rem">
                        <Typography variant="h6">Adicionar</Typography>
                        <Tiny color="secondary.400">novo irmão(a)</Tiny>
                      </FlexBox>
                      <ModalIrmao
                        open={openModalIrmao}
                        setOpen={setOpenModalIrmao}
                        setDadosAtributos={setNewIrmaoDados}
                        itemDados={irmaos[itemDados]}
                        editar={editarIrmao}
                      />
                    </FlexBox>
                  </Grid>
                </Grid>
              </Card>
              {/*</Grid>
                </Grid>
              </Card> */}
              <FlexBox
                display="flex"
                my="1.5rem"
                flexWrap="wrap"
                alignItems="center"
                justifyContent="space-between"
              >
                <Typography variant="h5">Problemática</Typography>
              </FlexBox>
              <Card sx={{ padding: 3, pb: 4 }}>
                <FastField name="drogasAlcool">
                  {() => (
                    <FlexBox my="1rem">
                      <FormControl>
                        <RadioGroup
                          row
                          name="drogasAlcool"
                          onChange={formikMeta.handleChange}
                          value={formikMeta.values.drogasAlcool}
                        >
                          <FormControlLabel
                            value="Alcool"
                            control={<Radio />}
                            label={'Álcool'}
                          />
                          <FormControlLabel
                            value="Drogas"
                            control={<Radio />}
                            label={'Drogas'}
                          />
                          <FormControlLabel
                            value="Alcool e Drogas"
                            control={<Radio />}
                            label={'Álcool e Drogas'}
                          />
                        </RadioGroup>
                      </FormControl>
                    </FlexBox>
                  )}
                </FastField>
                <FlexBox my="1rem">
                  <FormControl>
                    <FormLabel>
                      Drogas e a idade que usou pela 1ª vez:
                    </FormLabel>
                    <FormGroup onChange={formikMeta.handleChange}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={
                              formikMeta.values.usaQuaisDrogas.find(
                                (element) => element === 'usaAlcool',
                              ) !== undefined
                            }
                          />
                        }
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
                        control={
                          <Checkbox
                            checked={
                              formikMeta.values.usaQuaisDrogas.find(
                                (element) => element === 'usaMaconha',
                              ) !== undefined
                            }
                          />
                        }
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
                        control={
                          <Checkbox
                            checked={
                              formikMeta.values.usaQuaisDrogas.find(
                                (element) => element === 'usaCocainaI',
                              ) !== undefined
                            }
                          />
                        }
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
                        control={
                          <Checkbox
                            checked={
                              formikMeta.values.usaQuaisDrogas.find(
                                (element) => element === 'usaCocainaA',
                              ) !== undefined
                            }
                          />
                        }
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
                        control={
                          <Checkbox
                            checked={
                              formikMeta.values.usaQuaisDrogas.find(
                                (element) => element === 'usaCrack',
                              ) !== undefined
                            }
                          />
                        }
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
                        control={
                          <Checkbox
                            checked={
                              formikMeta.values.usaQuaisDrogas.find(
                                (element) => element === 'usaComprimido',
                              ) !== undefined
                            }
                          />
                        }
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
                        control={
                          <Checkbox
                            checked={
                              formikMeta.values.usaQuaisDrogas.find(
                                (element) => element === 'usaLSD',
                              ) !== undefined
                            }
                          />
                        }
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
                        control={
                          <Checkbox
                            checked={
                              formikMeta.values.usaQuaisDrogas.find(
                                (element) => element === 'usaInalantes',
                              ) !== undefined
                            }
                          />
                        }
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
                        control={
                          <Checkbox
                            checked={
                              formikMeta.values.usaQuaisDrogas.find(
                                (element) => element === 'usaMesclado',
                              ) !== undefined
                            }
                          />
                        }
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
                        control={
                          <Checkbox
                            checked={
                              formikMeta.values.usaQuaisDrogas.find(
                                (element) => element === 'usaTabaco',
                              ) !== undefined
                            }
                          />
                        }
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
                        control={
                          <Checkbox
                            checked={
                              formikMeta.values.usaQuaisDrogas.find(
                                (element) => element === 'usaOutras',
                              ) !== undefined
                            }
                          />
                        }
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
                </FlexBox>
                <FastField name="motivoInicio">
                  {() => (
                    <FlexBox
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
                    </FlexBox>
                  )}
                </FastField>
                <FastField name="tipodroga">
                  {() => (
                    <FlexBox
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
                    </FlexBox>
                  )}
                </FastField>
                <FastField name="observacoes">
                  {() => (
                    <FlexBox
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
                    </FlexBox>
                  )}
                </FastField>
                <FastField name="periodoAbstinencia">
                  {() => (
                    <FlexBox
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
                    </FlexBox>
                  )}
                </FastField>
                <FastField name="situacoesUso">
                  {() => (
                    <FlexBox my="1rem">
                      <FormControl>
                        <FormLabel>Situações em que faz uso</FormLabel>
                        <FormGroup onChange={formikMeta.handleChange} row>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={
                                  formikMeta.values.situacoesUso.find(
                                    (element) => element === 'Sozinho',
                                  ) !== undefined
                                }
                              />
                            }
                            label="Sozinho"
                            name="situacoesUso"
                            value={'Sozinho'}
                          />
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={
                                  formikMeta.values.situacoesUso.find(
                                    (element) => element === 'Acompanhado',
                                  ) !== undefined
                                }
                              />
                            }
                            label="Acompanhado"
                            name="situacoesUso"
                            value={'Acompanhado'}
                          />
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={
                                  formikMeta.values.situacoesUso.find(
                                    (element) => element === 'foraCasa',
                                  ) !== undefined
                                }
                              />
                            }
                            label="Fora de casa"
                            name="situacoesUso"
                            value={'foraCasa'}
                          />
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={
                                  formikMeta.values.situacoesUso.find(
                                    (element) => element === 'dentroCasa',
                                  ) !== undefined
                                }
                              />
                            }
                            label="Dentro de casa"
                            name="situacoesUso"
                            value={'dentroCasa'}
                          />
                        </FormGroup>
                      </FormControl>
                    </FlexBox>
                  )}
                </FastField>
                <FastField name="observacoesB">
                  {() => (
                    <FlexBox
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
                    </FlexBox>
                  )}
                </FastField>
                <Grid container spacing={4}>
                  <FastField name="familiaUsaDrogas">
                    {() => (
                      <Grid item xs={12} sm={6}>
                        <FlexBox my="1rem">
                          <FormControl>
                            <FormLabel>
                              Caso de álcool e/ ou drogas na família?
                            </FormLabel>
                            <RadioGroup
                              row
                              name="familiaUsaDrogas"
                              onChange={formikMeta.handleChange}
                              value={formikMeta.values.familiaUsaDrogas}
                            >
                              <FormControlLabel
                                value="N"
                                control={<Radio />}
                                label={'Não'}
                              />
                              <FormControlLabel
                                value="Y"
                                control={<Radio />}
                                label={'Sim'}
                              />
                            </RadioGroup>
                          </FormControl>
                        </FlexBox>
                      </Grid>
                    )}
                  </FastField>
                  {formikMeta.values.familiaUsaDrogas === 'Y' ? (
                    <FastField name="familiaGrauParentesco">
                      {() => (
                        <Grid item xs={12} sm={6}>
                          <FlexBox
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
                          </FlexBox>
                        </Grid>
                      )}
                    </FastField>
                  ) : null}
                </Grid>
                <Grid container spacing={4}>
                  <FastField name="TemNamorada">
                    {() => (
                      <Grid item xs={12} sm={6}>
                        <FlexBox my="1rem">
                          <FormControl>
                            <FormLabel>Namorada</FormLabel>
                            <RadioGroup
                              row
                              name="temNamorada"
                              onChange={formikMeta.handleChange}
                              value={formikMeta.values.temNamorada}
                            >
                              <FormControlLabel
                                value="N"
                                control={<Radio />}
                                label={'Não'}
                              />
                              <FormControlLabel
                                value="Y"
                                control={<Radio />}
                                label={'Sim'}
                              />
                            </RadioGroup>
                          </FormControl>
                        </FlexBox>
                      </Grid>
                    )}
                  </FastField>
                  {formikMeta.values.temNamorada === 'Y' ? (
                    <FastField name="namoradaNome">
                      {() => (
                        <Grid item xs={12} sm={6}>
                          <FlexBox
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
                          </FlexBox>
                        </Grid>
                      )}
                    </FastField>
                  ) : null}
                </Grid>
                {formikMeta.values.temNamorada === 'Y' ? (
                  <div>
                    <FastField name="namoradaTempo">
                      {() => (
                        <FlexBox
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
                        </FlexBox>
                      )}
                    </FastField>
                    <Grid container spacing={4}>
                      <FastField name="namoradaUsaDrogas">
                        {() => (
                          <Grid item xs={12} sm={6}>
                            <FlexBox my="1rem">
                              <FormControl>
                                <FormLabel>
                                  Namorada usa droga/álcool?
                                </FormLabel>
                                <RadioGroup
                                  row
                                  name="namoradaUsaDrogas"
                                  onChange={formikMeta.handleChange}
                                  value={formikMeta.values.namoradaUsaDrogas}
                                >
                                  <FormControlLabel
                                    value="N"
                                    control={<Radio />}
                                    label={'Não'}
                                  />
                                  <FormControlLabel
                                    value="Y"
                                    control={<Radio />}
                                    label={'Sim'}
                                  />
                                </RadioGroup>
                              </FormControl>
                            </FlexBox>
                          </Grid>
                        )}
                      </FastField>
                      {formikMeta.values.namoradaUsaDrogas === 'Y' ? (
                        <FastField name="namoradaDrogaTipo">
                          {() => (
                            <Grid item xs={12} sm={6}>
                              <FlexBox
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
                              </FlexBox>
                            </Grid>
                          )}
                        </FastField>
                      ) : null}
                    </Grid>
                  </div>
                ) : null}
              </Card>
              <FlexBox
                display="flex"
                my="1.5rem"
                flexWrap="wrap"
                alignItems="center"
                justifyContent="space-between"
              >
                <Typography variant="h5">Histórico</Typography>
              </FlexBox>
              <Card sx={{ padding: 3, pb: 4 }}>
                <FastField name="comoSeSenteNoUso">
                  {() => (
                    <FlexBox
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
                    </FlexBox>
                  )}
                </FastField>
                <FastField name="mudancasComportamento">
                  {() => (
                    <FlexBox
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
                    </FlexBox>
                  )}
                </FastField>
                <FastField name="prejuisoUso">
                  {() => (
                    <FlexBox
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
                    </FlexBox>
                  )}
                </FastField>
                <FastField name="comoFinanciaUso">
                  {() => (
                    <FlexBox
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
                    </FlexBox>
                  )}
                </FastField>
                <FastField name="lugaresUso">
                  {() => (
                    <FlexBox
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
                    </FlexBox>
                  )}
                </FastField>
                <FastField name="percebeuProblemaUso">
                  {() => (
                    <FlexBox
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
                    </FlexBox>
                  )}
                </FastField>
                <FastField name="tempoSemUso">
                  {() => (
                    <FlexBox
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
                    </FlexBox>
                  )}
                </FastField>
                <FastField name="comoEstaVida">
                  {() => (
                    <FlexBox
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
                    </FlexBox>
                  )}
                </FastField>
              </Card>
              <FlexBox
                display="flex"
                my="1.5rem"
                flexWrap="wrap"
                alignItems="center"
                justifyContent="space-between"
              >
                <Typography variant="h5">Situação Familiar</Typography>
              </FlexBox>
              <Card sx={{ padding: 3, pb: 4 }}>
                <FastField name="relacionamentoFamiliar">
                  {() => (
                    <FlexBox
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
                    </FlexBox>
                  )}
                </FastField>
                <FastField name="comQuemMora">
                  {() => (
                    <FlexBox
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
                    </FlexBox>
                  )}
                </FastField>
                <FastField name="apoioFamiliarTratamento">
                  {() => (
                    <FlexBox
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
                    </FlexBox>
                  )}
                </FastField>
                <Typography>Relacionamento Familiar Atual</Typography>
                <FastField name="relacionamentoPai">
                  {() => (
                    <FlexBox
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
                    </FlexBox>
                  )}
                </FastField>
                <FastField name="relacionamentoMae">
                  {() => (
                    <FlexBox
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
                    </FlexBox>
                  )}
                </FastField>
                <FastField name="relacionamentoIrmao">
                  {() => (
                    <FlexBox
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
                    </FlexBox>
                  )}
                </FastField>
                <FastField name="relacionamentoEsposo">
                  {() => (
                    <FlexBox
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
                    </FlexBox>
                  )}
                </FastField>
                <FastField name="relacionamentoFilhos">
                  {() => (
                    <FlexBox
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
                    </FlexBox>
                  )}
                </FastField>
                <FastField name="relacionamentoSocial">
                  {() => (
                    <FlexBox
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
                    </FlexBox>
                  )}
                </FastField>
              </Card>
              <FlexBox
                display="flex"
                my="1.5rem"
                flexWrap="wrap"
                alignItems="center"
                justifyContent="space-between"
              >
                <Typography variant="h5">Saúde</Typography>
              </FlexBox>
              <Card sx={{ padding: 3, pb: 4 }}>
                <FastField name="periodoSono">
                  {() => (
                    <FlexBox
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
                    </FlexBox>
                  )}
                </FastField>
                <FastField name="temPesadelos">
                  {() => (
                    <FlexBox my="1rem">
                      <FormControl>
                        <FormLabel>Possui Pesadelos</FormLabel>
                        <RadioGroup
                          row
                          name="temPesadelos"
                          onChange={formikMeta.handleChange}
                          value={formikMeta.values.temPesadelos}
                        >
                          <FormControlLabel
                            value="N"
                            control={<Radio />}
                            label={'Não'}
                          />
                          <FormControlLabel
                            value="Y"
                            control={<Radio />}
                            label={'Sim'}
                          />
                        </RadioGroup>
                      </FormControl>
                    </FlexBox>
                  )}
                </FastField>
                <FastField name="observacaoGeral">
                  {() => (
                    <FlexBox
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
                    </FlexBox>
                  )}
                </FastField>
                <FastField name="alimentecao">
                  {() => (
                    <FlexBox
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
                    </FlexBox>
                  )}
                </FastField>
                <FastField name="temAlucinacao">
                  {() => (
                    <FlexBox my="1rem">
                      <FormControl>
                        <FormLabel>Alucinação – Com drogas</FormLabel>
                        <RadioGroup
                          row
                          name="temAlucinacao"
                          onChange={formikMeta.handleChange}
                          value={formikMeta.values.temAlucinacao}
                        >
                          <FormControlLabel
                            value="N"
                            control={<Radio />}
                            label={'Não'}
                          />
                          <FormControlLabel
                            value="Y"
                            control={<Radio />}
                            label={'Sim'}
                          />
                        </RadioGroup>
                      </FormControl>
                    </FlexBox>
                  )}
                </FastField>
                {formikMeta.values.temAlucinacao === 'Y' ? (
                  <FastField name="qtdTipoAlucinacaoDroga">
                    {() => (
                      <FlexBox
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
                      </FlexBox>
                    )}
                  </FastField>
                ) : null}
                <FastField name="alucinacaoSemDrogas">
                  {() => (
                    <FlexBox my="1rem">
                      <FormControl>
                        <FormLabel>Sem drogas</FormLabel>
                        <RadioGroup
                          row
                          name="alucinacaoSemDrogas"
                          onChange={formikMeta.handleChange}
                          value={formikMeta.values.alucinacaoSemDrogas}
                        >
                          <FormControlLabel
                            value="N"
                            control={<Radio />}
                            label={'Não'}
                          />
                          <FormControlLabel
                            value="Y"
                            control={<Radio />}
                            label={'Sim'}
                          />
                        </RadioGroup>
                      </FormControl>
                    </FlexBox>
                  )}
                </FastField>
                {formikMeta.values.alucinacaoSemDrogas === 'Y' ? (
                  <div>
                    <FastField name="qtdTipoAlucinacao">
                      {() => (
                        <FlexBox
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
                        </FlexBox>
                      )}
                    </FastField>
                    <FastField name="tipoAlucinacao">
                      {() => (
                        <FlexBox my="1rem">
                          <FormControl>
                            <FormLabel>Tipo Alucinação</FormLabel>
                            <RadioGroup
                              row
                              name="tipoAlucinacao"
                              onChange={formikMeta.handleChange}
                              value={formikMeta.values.tipoAlucinacao}
                            >
                              <FormControlLabel
                                value="V"
                                control={<Radio />}
                                label={'Visual'}
                              />
                              <FormControlLabel
                                value="A"
                                control={<Radio />}
                                label={'Auditiva'}
                              />
                            </RadioGroup>
                          </FormControl>
                        </FlexBox>
                      )}
                    </FastField>
                    <FastField name="descricaoAlucinacao">
                      {() => (
                        <FlexBox
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
                        </FlexBox>
                      )}
                    </FastField>
                  </div>
                ) : null}
                <Typography>Desmaio / Convulsão</Typography>
                <FastField name="desmaioComDrogas">
                  {() => (
                    <FlexBox my="1rem">
                      <FormControl>
                        <FormLabel>Com drogas</FormLabel>
                        <RadioGroup
                          row
                          name="desmaioComDrogas"
                          onChange={formikMeta.handleChange}
                          value={formikMeta.values.desmaioComDrogas}
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
                    </FlexBox>
                  )}
                </FastField>
                {formikMeta.values.desmaioComDrogas === 'Y' ? (
                  <FastField name="qndTipoDrogaDesmaio">
                    {() => (
                      <FlexBox
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
                      </FlexBox>
                    )}
                  </FastField>
                ) : null}
                <FastField name="desmaioSemDrogas">
                  {() => (
                    <FlexBox my="1rem">
                      <FormControl>
                        <FormLabel>Sem drogas</FormLabel>
                        <RadioGroup
                          row
                          name="desmaioSemDrogas"
                          onChange={formikMeta.handleChange}
                          value={formikMeta.values.desmaioSemDrogas}
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
                    </FlexBox>
                  )}
                </FastField>
                {formikMeta.values.desmaioSemDrogas === 'Y' ? (
                  <div>
                    <FastField name="qndDesmaio">
                      {() => (
                        <FlexBox
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
                        </FlexBox>
                      )}
                    </FastField>
                    <FastField name="desmaioDescricao">
                      {() => (
                        <FlexBox
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
                        </FlexBox>
                      )}
                    </FastField>
                  </div>
                ) : null}
                <FastField name="temOverdose">
                  {() => (
                    <FlexBox my="1rem">
                      <FormControl>
                        <FormLabel>Princípio de Overdose</FormLabel>
                        <RadioGroup
                          row
                          name="temOverdose"
                          onChange={formikMeta.handleChange}
                          value={formikMeta.values.temOverdose}
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
                    </FlexBox>
                  )}
                </FastField>
                {formikMeta.values.temOverdose === 'Y' ? (
                  <FastField name="qtdTipoDrogaOverdose">
                    {() => (
                      <FlexBox
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
                      </FlexBox>
                    )}
                  </FastField>
                ) : null}
                <FastField name="tomaRemedio">
                  {() => (
                    <FlexBox my="1rem">
                      <FormControl>
                        <FormLabel>Toma medicação</FormLabel>
                        <RadioGroup
                          row
                          name="tomaRemedio"
                          onChange={formikMeta.handleChange}
                          value={formikMeta.values.tomaRemedio}
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
                    </FlexBox>
                  )}
                </FastField>
                {formikMeta.values.tomaRemedio === 'Y' ? (
                  <FastField name="sobreRemedio">
                    {() => (
                      <FlexBox
                        display="flex"
                        my="1.5rem"
                        flexWrap="wrap"
                        alignItems="center"
                        justifyContent="space-between"
                      >
                        <LightTextField
                          fullWidth
                          name="sobreRemedio"
                          // label="Qual, desde quando, quantidade, frequência?"
                          label="Qual, desde quando, quantidade, frequência?"
                          value={formikMeta.values.sobreRemedio}
                          onChange={formikMeta.handleChange}
                        />
                      </FlexBox>
                    )}
                  </FastField>
                ) : null}
                <FastField name="sintomasAnteriores">
                  {() => (
                    <FlexBox my="1rem">
                      <FormControl>
                        <FormLabel>
                          Sintomas anteriores (doenças infantis, doenças mais
                          sérias ou crônicas
                        </FormLabel>
                        <FormGroup onChange={formikMeta.handleChange} row>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={
                                  formikMeta.values.sintomasAnteriores.find(
                                    (element) =>
                                      element === 'sintomasAnterioresCaxumba',
                                  ) !== undefined
                                }
                              />
                            }
                            label="Caxumba"
                            value="sintomasAnterioresCaxumba"
                            name="sintomasAnteriores"
                          />
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={
                                  formikMeta.values.sintomasAnteriores.find(
                                    (element) =>
                                      element === 'sintomasAnterioresCatapora',
                                  ) !== undefined
                                }
                              />
                            }
                            label="Catapora"
                            value="sintomasAnterioresCatapora"
                            name="sintomasAnteriores"
                          />
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={
                                  formikMeta.values.sintomasAnteriores.find(
                                    (element) =>
                                      element === 'sintomasAnterioresMeningite',
                                  ) !== undefined
                                }
                              />
                            }
                            label="Meningite"
                            value="sintomasAnterioresMeningite"
                            name="sintomasAnteriores"
                          />
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={
                                  formikMeta.values.sintomasAnteriores.find(
                                    (element) =>
                                      element === 'sintomasAnterioresSarampo',
                                  ) !== undefined
                                }
                              />
                            }
                            label="Sarampo"
                            value="sintomasAnterioresSarampo"
                            name="sintomasAnteriores"
                          />
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={
                                  formikMeta.values.sintomasAnteriores.find(
                                    (element) =>
                                      element === 'sintomasAnterioresOutros',
                                  ) !== undefined
                                }
                              />
                            }
                            label="Outros"
                            value="sintomasAnterioresOutros"
                            name="sintomasAnteriores"
                          />
                        </FormGroup>
                      </FormControl>
                    </FlexBox>
                  )}
                </FastField>
                <FastField name="outroSintomasAnteriores">
                  {() => (
                    <FlexBox
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
                    </FlexBox>
                  )}
                </FastField>
                <FastField name="acidentes">
                  {() => (
                    <FlexBox
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
                    </FlexBox>
                  )}
                </FastField>
                <FastField name="cirurgias">
                  {() => (
                    <FlexBox
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
                    </FlexBox>
                  )}
                </FastField>
                <FastField name="tratamentosAnteriores">
                  {() => (
                    <FlexBox
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
                    </FlexBox>
                  )}
                </FastField>
                <FastField name="consideraDependente">
                  {() => (
                    <FlexBox my="1rem">
                      <FormControl>
                        <FormLabel>Considera-se um (a) dependente?</FormLabel>
                        <RadioGroup
                          row
                          name="consideraDependente"
                          onChange={formikMeta.handleChange}
                          value={formikMeta.values.consideraDependente}
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
                            label={'Não sei'}
                          />
                        </RadioGroup>
                      </FormControl>
                    </FlexBox>
                  )}
                </FastField>
                <FastField name="consideraDependenteJustificativa">
                  {() => (
                    <FlexBox
                      my="1.5rem"
                      flexWrap="wrap"
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <LightTextField
                        fullWidth
                        name="consideraDependenteJustificativa"
                        label="Justificar"
                        value={
                          formikMeta.values.consideraDependenteJustificativa
                        }
                        onChange={formikMeta.handleChange}
                      />
                    </FlexBox>
                  )}
                </FastField>
                <FastField name="motivoProcuraInstituicao">
                  {() => (
                    <FlexBox
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
                    </FlexBox>
                  )}
                </FastField>
                <FastField name="expectaviaTratamento">
                  {() => (
                    <FlexBox
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
                    </FlexBox>
                  )}
                </FastField>
              </Card>
              <FlexBox
                display="flex"
                my="1.5rem"
                flexWrap="wrap"
                alignItems="center"
                justifyContent="space-between"
              >
                <Typography variant="h5">Problemas Legais</Typography>
              </FlexBox>
              <Card sx={{ padding: 3, pb: 4 }}>
                <FastField name="problemaJustica">
                  {() => (
                    <FlexBox my="1rem">
                      <FormControl>
                        <FormLabel>Problemas com a justiça?</FormLabel>
                        <RadioGroup
                          row
                          name="problemaJustica"
                          onChange={formikMeta.handleChange}
                          value={formikMeta.values.problemaJustica}
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
                    </FlexBox>
                  )}
                </FastField>
                <FastField name="temProcesso">
                  {() => (
                    <FlexBox>
                      <FormControl>
                        <FormLabel>Tem processo?</FormLabel>
                        <RadioGroup
                          row
                          name="temProcesso"
                          onChange={formikMeta.handleChange}
                          value={formikMeta.values.temProcesso}
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
                    </FlexBox>
                  )}
                </FastField>
                {formikMeta.values.temProcesso === 'Y' ? (
                  <FastField name="porqueProblemaJustica">
                    {() => (
                      <FlexBox
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
                      </FlexBox>
                    )}
                  </FastField>
                ) : null}
              </Card>
              <br />
              <br />
              <FlexBox
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Button
                  variant="outlined"
                  sx={{
                    width: 124,
                    color: 'text.disabled',
                    borderColor: 'text.disabled',
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
              </FlexBox>
            </Form>
          );
        }}
      </Formik>
    </Card>
  );
};

export default Anamnese;
