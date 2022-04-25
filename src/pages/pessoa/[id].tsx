import { Box, Button, Card, Grid, styled, useTheme } from '@mui/material';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import FlexBox from '../../components/FlexBox';
import Anexos from '../../components/pessoaInformation/Anexos';
import Enderecos from '../../components/pessoaInformation/Enderecos';
import Eventos from '../../components/pessoaInformation/Eventos';
import Grupos from '../../components/pessoaInformation/Grupos';
import InformacoesPrincipais from '../../components/pessoaInformation/InformacoesPrincipais';
import Networking from '../../components/pessoaInformation/Networking';
import Questionarios from '../../components/pessoaInformation/Questionarios';
import Telefones from '../../components/pessoaInformation/Telefones';
import useTitle from '../../hooks/useTitle';
import ContactPhoneIcon from '../../icons/ContactPhoneIcon';
import DiamondIcon from '../../icons/DiamondIcon';
import ProfileIcon from '../../icons/ProfileIcon';
import SettingIcon from '../../icons/SettingIcon';
import convertToSlug from '../../utils/convertSlug';

// styled component
const StyledButton = styled(Button)(() => ({
  fontSize: 12,
  borderRadius: 0,
  marginTop: '0.4rem',
  position: 'relative',
  justifyContent: 'flex-start',
}));

var idPessoa: string;

const Post = () => {
  const router = useRouter();
  const { id } = router.query;

  // change navbar title
  // var pessoa: string;
  // pessoa = nome !== "" ? nome : "...";
  useTitle('pessoa');

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
          {active === convertToSlug(tabList[4].name) && (
            <Eventos idPessoa={id} />
          )}
          {active === convertToSlug(tabList[5].name) && (
            <Networking idPessoa={id} />
          )}
          {active === convertToSlug(tabList[6].name) && (
            <Questionarios idPessoa={id} />
          )}
          {active === convertToSlug(tabList[7].name) && (
            <Anexos idPessoa={id} />
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
    Icon: ContactPhoneIcon,
  },
  {
    id: 3,
    name: 'Telefones',
    Icon: DiamondIcon,
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
];

export default Post;
