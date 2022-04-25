import { Avatar, Box, Card, Switch } from '@mui/material';
import FlexBox from '../FlexBox';
import { H5, H6, Small, Tiny } from '../Typography';
import { FC } from 'react';

const accountList = [
  {
    id: 1,
    title: 'Google',
    body: 'Calendar and Contact',
    image: '/static/connect-accounts/google.svg',
  },
  {
    id: 2,
    title: 'GitHub',
    body: 'Project Management',
    image: '/static/connect-accounts/github.svg',
  },
  {
    id: 3,
    title: 'Slack',
    body: 'Communication with Team',
    image: '/static/connect-accounts/slack.svg',
  },
  {
    id: 4,
    title: 'Stack Overflow',
    body: 'Tools for Web Developers',
    image: '/static/connect-accounts/stack-overflow.svg',
  },
];

const ConnectAccounts: FC = () => {
  return (
    <Card sx={{ padding: 3 }}>
      <H5>Connected accounts</H5>
      <Small color="text.disabled">
        Integrated features from these accounts make it easier to collaborate
        with people.
      </Small>

      <Box maxWidth={500} mt={3} mb={2}>
        {accountList.map(({ id, title, body, image }) => (
          <SingleItem key={id} title={title} body={body} logo={image} />
        ))}
      </Box>
    </Card>
  );
};

// props types
type singleItemProps = { title: string; body: string; logo: string };

function SingleItem({ title, body, logo }: singleItemProps) {
  return (
    <FlexBox alignItems="center" justifyContent="space-between" mb={2}>
      <FlexBox alignItems="center">
        <Avatar src={logo} sx={{ width: 30, height: 30 }} />
        <Box ml={1}>
          <H6>{title}</H6>
          <Tiny fontWeight={500} display="block" color="text.disabled">
            {body}
          </Tiny>
        </Box>
      </FlexBox>

      <Switch defaultChecked />
    </FlexBox>
  );
}

export default ConnectAccounts;
