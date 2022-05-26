import FeedIcon from '@mui/icons-material/Feed';
import { IconButton } from '@mui/material';
import { useRouter } from 'next/router';

const columnShape = [
  {
    maxWidth: 0,
    minWidth: 0,
    Header: 'ID',
    accessor: 'id',
  },
  {
    minWidth: 180,
    Header: 'Nome',
    accessor: 'nome',
  },
  {
    minWidth: 230,
    Header: 'Idade',
    accessor: 'idade',
  },
  {
    Header: 'Natural',
    accessor: 'natural',
  },
  // {
  //   Header: 'Informações',
  //   accessor: 'informações',
  //   Cell: (props: any) => {
  //     const { state, row } = props;
  //     const selectedRow = Object.keys(state.selectedRowIds).includes(row.id);
  //     const navigate = useRouter();

  //     const toPessoaInformation = () => {
  //       // navigate.push("/pessoaInformation",{state:{id:row.id,nome: row.values.nome }});
  //       navigate.push({
  //         pathname: `/pessoa/${row.values.id}`,
  //         // query: { id: row.values.id, nome: row.values.nome },
  //       });
  //     };

  //     return (
  //       <>
  //         <IconButton
  //           component="span"
  //           disableRipple
  //           onClick={() => {
  //             toPessoaInformation();
  //           }}
  //         >
  //           <FeedIcon
  //             sx={{ color: selectedRow ? 'primary.main' : 'text.disabled' }}
  //           />
  //         </IconButton>
  //       </>
  //     );
  //   },
  // },
];

export default columnShape;
