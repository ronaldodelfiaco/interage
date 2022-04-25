import {
  Button,
  Card,
  Checkbox,
  styled,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import { H5, Small } from 'components/Typography';
import { FC } from 'react';
import ScrollBar from 'simplebar-react';

// styled components
const StyledTableCell = styled(TableCell)(() => ({
  fontSize: 12,
  fontWeight: 500,
  //   paddingTop: 0,
  '&:first-of-type': { paddingLeft: 0 },
  '&:last-of-type': { paddingRight: 0 },
}));

const StyledCheckBox = styled(Checkbox)(() => ({
  padding: 0,
}));

const Notifications: FC = () => {
  return (
    <Card sx={{ padding: 3 }}>
      <H5>Notifications</H5>
      <Small color="text.disabled">
        We need permission from your browser to show notifications. Request
        permission
      </Small>

      <ScrollBar>
        <Table
          sx={{
            mt: 3,
            minWidth: 700,
            '& th': { paddingBottom: 0, fontWeight: 600 },
          }}
        >
          <TableHead>
            <TableRow>
              <StyledTableCell>Type</StyledTableCell>
              <StyledTableCell>Email</StyledTableCell>
              <StyledTableCell>Browser</StyledTableCell>
              <StyledTableCell>App</StyledTableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {notificationSettings.map((item) => (
              <TableRow key={item.id}>
                <StyledTableCell sx={{ fontWeight: 600 }}>
                  {item.type}
                </StyledTableCell>
                <StyledTableCell>
                  <StyledCheckBox defaultChecked={item.email} />
                </StyledTableCell>
                <StyledTableCell>
                  <StyledCheckBox defaultChecked={item.browser} />
                </StyledTableCell>
                <StyledTableCell>
                  <StyledCheckBox defaultChecked={item.app} />
                </StyledTableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ScrollBar>

      <Button variant="contained" sx={{ mt: 4 }}>
        Save Changes
      </Button>
    </Card>
  );
};

const notificationSettings = [
  {
    id: 1,
    type: 'New for you',
    email: true,
    browser: false,
    app: false,
  },
  {
    id: 2,
    type: 'Account activity',
    email: true,
    browser: true,
    app: true,
  },
  {
    id: 3,
    type: 'A new browser used to sign in',
    email: true,
    browser: true,
    app: true,
  },
  {
    id: 4,
    type: 'A new device is linked',
    email: false,
    browser: true,
    app: false,
  },
  {
    id: 5,
    type: 'A new device connected',
    email: true,
    browser: false,
    app: false,
  },
];

export default Notifications;
