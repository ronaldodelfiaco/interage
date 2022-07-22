import { MoreHoriz } from '@mui/icons-material';
import { Box, IconButton } from '@mui/material';
import { FC, MouseEvent } from 'react';
import FlexBox from './FlexBox';
import { H6, Tiny } from './Typography';

// component interface
interface ListCardProps {
  item: any;
  handleMore: (event: MouseEvent<HTMLButtonElement>) => void;
  setID: (index: number) => void;
  index: number;
}

const ListCard: FC<ListCardProps> = ({ item, handleMore, setID, index }) => {
  return (
    <FlexBox justifyContent="space-between" alignItems="center">
      <FlexBox alignItems="center">
        <Box ml="1rem">
          {JSON.stringify(item)
            .split(',')
            .map((element, index) =>
              index === 0 ? (
                <H6>
                  {element
                    .replaceAll('{', '')
                    .replaceAll('}', '')
                    .replaceAll('"', '')
                    .replaceAll(':', ': ')}
                </H6>
              ) : (
                <Tiny>
                  {element
                    .replaceAll('{', '')
                    .replaceAll('}', '')
                    .replaceAll('"', '')
                    .replaceAll(':', ': ') + ' '}
                </Tiny>
              ),
            )}
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
