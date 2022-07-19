import { MoreHoriz } from '@mui/icons-material';
import { Box, IconButton } from '@mui/material';
import { FC, MouseEvent } from 'react';
import FlexBox from '../FlexBox';
import { H6 } from '../Typography';

// component interface
interface ListCardProps {
  item: {
    nome: String;
    idade: Number;
  };
  handleMore: (event: MouseEvent<HTMLButtonElement>) => void;
  setID: (index: number) => void;
  index: number;
}

const ListCard: FC<ListCardProps> = ({ item, handleMore, setID, index }) => {
  return (
    <FlexBox justifyContent="space-between" alignItems="center">
      <FlexBox alignItems="center">
        <Box ml="1rem">
          <H6>{'Nome: ' + item.nome}</H6>
          <H6>{'Idade: ' + item.idade}</H6>
        </Box>
      </FlexBox>
      <IconButton
        onClick={(event) => {
          handleMore(event);
          setID(index);
        }}
      >
        <MoreHoriz sx={{ color: 'secondary.400' }} />
      </IconButton>
    </FlexBox>
  );
};

export default ListCard;
