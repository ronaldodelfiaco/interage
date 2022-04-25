import { ControlPoint } from '@mui/icons-material';
import { TabContext, TabList } from '@mui/lab';
import { Box, Button, Card, Grid, styled, Tab } from '@mui/material';
import { useRouter } from 'next/router';
import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import FlexBox from '../components/FlexBox';
import DataPessoas from '../components/pessoas/DataPessoas';
import { H5 } from '../components/Typography';
import { herokuConfig } from '../config';
import useTitle from '../hooks/useTitle';
import PeopleIcon from '../icons/PeopleIcon';
import axios from '../utils/axios';

// styled components
const Wrapper = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  flexWrap: 'wrap',
  padding: '0 1.5rem',
  paddingTop: '1rem',
}));

const IconWrapper = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.light,
  width: 40,
  height: 40,
  borderRadius: '5px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginRight: '0.5rem',
}));

const TabListWrapper = styled(TabList)(({ theme }) => ({
  [theme.breakpoints.down(700)]: {
    order: 3,
    marginTop: 1,
  },
}));

const Pessoas: FC = () => {
  // change navbar title
  useTitle('Pessoas');
  const { t } = useTranslation();

  const navigate = useRouter();

  const toPessoaInformation = () => {
    // navigate.push("/pessoaInformation",{state:{id:0,nome:'Cadastrar Pessoa'}});
    navigate.push({
      pathname: '/PessoaInformation',
      query: { id: 0, nome: 'Cadastrar Pessoa' },
    });
  };

  const [value, setValue] = useState('');
  const [tableData, setTableData] = useState([]);

  const handleChange = (_: SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const heroku =
    herokuConfig +
    'genericCRUD?id_usuario=1&token=116mx2wthgh5yvhqcsugyygo&table=view_pessoas';

  useEffect(() => {
    axios
      .get(heroku)
      .then(({ data }: any) => {
        setTableData(data.body.rows);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [heroku]);

  const filterTable = tableData.filter((item: any) =>
    value !== ''
      ? item.grupo.toLowerCase() === value.toLocaleLowerCase()
      : item.grupo,
  );

  return (
    <Box pt={2} pb={4}>
      <Card sx={{ boxShadow: 4 }}>
        <Grid container>
          <Grid item xs={12}>
            <Wrapper>
              <FlexBox alignItems="center">
                <IconWrapper>
                  <PeopleIcon sx={{ color: 'primary.main' }} />
                </IconWrapper>
                <H5>{t('Pessoas')}</H5>
              </FlexBox>

              <TabContext value={value}>
                <TabListWrapper variant="scrollable" onChange={handleChange}>
                  <Tab disableRipple label={t('Todas Pessoas')} value="" />
                  <Tab disableRipple label={t('Pacientes')} value="Pacientes" />
                  <Tab
                    disableRipple
                    label={t('Colaboradores')}
                    value="Colaboradores"
                  />
                  <Tab
                    disableRipple
                    label={t('Fornecedores')}
                    value="Fornecedores"
                  />
                </TabListWrapper>
              </TabContext>
              <Button
                variant="contained"
                onClick={() => toPessoaInformation()}
                startIcon={<ControlPoint sx={{ color: 'text.secondary' }} />}
                sx={{ fontSize: 12, boxShadow: 3 }}
              >
                {t('Incluir Pessoa')}
              </Button>
            </Wrapper>

            {/*  Data Table */}
            <DataPessoas data={filterTable} />
          </Grid>
        </Grid>
      </Card>
    </Box>
  );
};

export default Pessoas;
