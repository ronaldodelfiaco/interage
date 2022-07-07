import { Box, Button, Card, Grid, styled, useTheme } from '@mui/material';
import { useRouter } from 'next/router';
import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import FlexBox from '../components/FlexBox';
import Anexos from '../components/pessoaInformation/Anexos';
import Enderecos from '../components/pessoaInformation/Enderecos';
import Eventos from '../components/pessoaInformation/Eventos';
import Grupos from '../components/pessoaInformation/Grupos';
import InformacoesPrincipais from '../components/pessoaInformation/InformacoesPrincipais';
import Networking from '../components/pessoaInformation/Networking';
import Questionarios from '../components/pessoaInformation/Questionarios';
import Telefones from '../components/pessoaInformation/Telefones';
import ContactPhoneIcon from '../icons/ContactPhoneIcon';
import DiamondIcon from '../icons/DiamondIcon';
import PeopleIcon from '../icons/PeopleIcon';
import ProfileIcon from '../icons/ProfileIcon';
import SettingIcon from '../icons/SettingIcon';
import convertToSlug from '../utils/convertSlug';

// styled component
const StyledButton = styled(Button)(() => ({
  fontSize: 12,
  borderRadius: 0,
  marginTop: '0.4rem',
  position: 'relative',
  justifyContent: 'flex-start',
}));

var idPessoa: string;

const PessoaInformation: FC = () => {
  const router = useRouter();
  const { id } = router.query;

  const theme = useTheme();
  const { t } = useTranslation();
  const opcaoInicial = convertToSlug('Informações Principais');
  const [active, setActive] = useState(opcaoInicial);

  const style = {
    backgroundColor:
      theme.palette.mode === 'light'
        ? theme.palette.secondary.light
        : theme.palette.divider,
    color: theme.palette.primary.main,
    '&::before': {
      width: 4,
      right: 0,
      content: '""',
      height: '100%',
      position: 'absolute',
      backgroundColor: theme.palette.primary.main,
    },
  };

  return (
    <Box pt={2} pb={4}>
      <Grid container spacing={3}>
        <Grid item md={3} xs={12}>
          <Card sx={{ padding: '1.5rem 0' }}>
            <FlexBox
              flexDirection="column"
              sx={{
                [theme.breakpoints.between('sm', 960)]: {
                  flexWrap: 'wrap',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                },
              }}
            >
              {tabList.map(({ id, name, Icon }) => (
                <StyledButton
                  key={id}
                  startIcon={<Icon sx={{ color: 'text.disabled' }} />}
                  onClick={() => setActive(convertToSlug(name))}
                  sx={
                    active === convertToSlug(name)
                      ? style
                      : { '&:hover': style }
                  }
                >
                  {t(name)}
                </StyledButton>
              ))}
            </FlexBox>
          </Card>
          <br />
          <br />
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
            Voltar
          </Button>
        </Grid>
        <Grid item md={9} xs={12}>
          {active === convertToSlug(tabList[0].name) && (
            <InformacoesPrincipais idPessoa={id} />
          )}
          {active === convertToSlug(tabList[1].name) && (
            <Grupos idPessoa={id} />
          )}
          {active === convertToSlug(tabList[2].name) && (
            <Telefones idPessoa={id} />
          )}
          {active === convertToSlug(tabList[3].name) && (
            <Enderecos idPessoa={id} />
          )}
          {active === convertToSlug(tabList[4].name) && <Eventos />}
          {active === convertToSlug(tabList[5].name) && <Networking />}
          {active === convertToSlug(tabList[6].name) && <Questionarios />}
          {active === convertToSlug(tabList[7].name) && <Anexos />}
          {active === convertToSlug(tabList[8].name) && (
            <Anamnese idPessoa={id} />
          )}
          {active === convertToSlug(tabList[9].name) && (
            <Reavaliacao idPessoa={id} />
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

const tabList = [
  {
    id: 1,
    name: 'Informações Principais',
    Icon: ProfileIcon,
  },
  {
    id: 2,
    name: 'Grupos de Interação',
    Icon: PeopleIcon,
  },
  {
    id: 3,
    name: 'Telefones',
    Icon: ContactPhoneIcon,
  },
  {
    id: 4,
    name: 'Endereços',
    Icon: DiamondIcon,
  },
  {
    id: 5,
    name: 'Eventos',
    Icon: DiamondIcon,
  },
  {
    id: 6,
    name: 'Networking',
    Icon: SettingIcon,
  },
  {
    id: 7,
    name: 'Questionários',
    Icon: DiamondIcon,
  },
  {
    id: 8,
    name: 'Anexos',
    Icon: DiamondIcon,
  },
  {
    id: 9,
    name: 'Ficha de Anamenese',
    Icon: DiamondIcon,
  },
  {
    id: 10,
    name: 'Ficha de Reavaliação',
    Icon: DiamondIcon,
  },
];

export default PessoaInformation;
