import {
  alpha,
  Box,
  CircularProgress,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  useTheme,
} from '@mui/material';
import Link from 'next/link';
import { FC, useEffect, useMemo, useState } from 'react';
import {
  useAsyncDebounce,
  useGlobalFilter,
  usePagination,
  useRowSelect,
  useSortBy,
  useTable,
} from 'react-table';
import FlexBox from '../FlexBox';
import columnShape from './columnShape';
import {
  StyledPagination,
  StyledSearchIcon,
  StyledSearchInput,
} from './styledComponents';

// const SelectCheckBox = forwardRef(function SelectCheckBox(
//   { indeterminate, ...rest }: any,
//   ref: any,
// ) {
//   const defaultRef = useRef();
//   const resolvedRef = ref || defaultRef;

//   useEffect(() => {
//     if (resolvedRef) {
//       resolvedRef.current.indeterminate = indeterminate;
//     }
//   }, [resolvedRef, indeterminate]);

//   return (
//     <Checkbox
//       {...rest}
//       disableRipple
//       ref={resolvedRef}
//       checkedIcon={<CheckBoxIcon fontSize="small" color="primary" />}
//       icon={<BlankCheckBoxIcon fontSize="small" color="primary" />}
//     />
//   );
// });

function SearchFilter({ globalFilter, setGlobalFilter }: any) {
  const [value, setValue] = useState(globalFilter);
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 200);

  return (
    <StyledSearchInput
      placeholder="Pesquisar..."
      startAdornment={<StyledSearchIcon />}
      value={value || ''}
      onChange={(e) => {
        setValue(e.target.value);
        onChange(e.target.value);
      }}
    />
  );
}

interface DataTableProps {
  data: [] | unknown;
}

const DataPessoas: FC<DataTableProps> = ({ data = [] }) => {
  const theme = useTheme();
  const columns: any = useMemo(() => columnShape, []);
  const tableData: any = useMemo(() => data, [data]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    pageOptions,
    gotoPage,
    state,
    setGlobalFilter,
    selectedFlatRows,
    setPageSize,
  }: any = useTable(
    {
      columns,
      data: tableData,
    },
    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => [...columns]);
    },
  );


  // handle pagination
  const handleChangePage = (event: unknown, newPage: number) => {
    gotoPage(newPage);
    console.log(pageOptions);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setPageSize(parseInt(event.target.value, 10));
    gotoPage(0);
  };

  const ids = selectedFlatRows.map((item: any) => item.original.id);

  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    if (headerGroups.length != 0) {
      setLoading(false);
    }
  }, [headerGroups]);

  return (
    <Box>
      <FlexBox
        py="2rem"
        px="1.5rem"
        flexWrap="wrap"
        alignItems="center"
        justifyContent="space-between"
      >
        <SearchFilter
          globalFilter={state.globalFilter}
          setGlobalFilter={setGlobalFilter}
        />
      </FlexBox>

      {/* <ScrollBar> */}
      {isLoading ? (
        <Stack
          justifyContent="center"
          sx={{ color: 'grey.500' }}
          spacing={2}
          direction="row"
          alignContent="center"
        >
          <CircularProgress />
        </Stack>
      ) : (
        <Table {...getTableProps()}>
          <TableHead>
            {headerGroups.map((headerGroup: any) => (
              <TableRow
                key={headerGroups.id}
                {...headerGroup.getHeaderGroupProps()}
                sx={{
                  backgroundColor:
                    theme.palette.mode === 'light'
                      ? alpha('#E5F3FD', 0.5)
                      : alpha('#E5F3FD', 0.05),
                }}
              >
                {headerGroup.headers.map((column: any) => (
                  <TableCell
                    key={headerGroup.id}
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    sx={{
                      fontSize: 12,
                      fontWeight: 600,
                      minWidth: column.minWidth,
                    }}
                  >
                    {column.render('Header')}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>

          <TableBody {...getTableBodyProps()}>
            {page.map((row: any) => {
              prepareRow(row);
              return (
                <Link href={`/pessoa/${row.values.id}`} passHref>
                  <TableRow hover key={row.id} {...row.getRowProps()}>
                    {row.cells.map((cell: any) => (
                      <TableCell
                        key={row.cells.id}
                        {...cell.getCellProps()}
                        sx={{
                          fontSize: 12,
                          fontWeight: 600,
                          borderBottom: '1px solid',
                          borderColor:
                            theme.palette.mode === 'light'
                              ? 'secondary.light'
                              : 'divider',
                        }}
                      >
                        {cell.render('Cell')}
                      </TableCell>
                    ))}
                  </TableRow>
                </Link>
              );
            })}
          </TableBody>
        </Table>
      )}
      {/* </ScrollBar> */}
      <Stack alignItems="center" marginY="2rem">
        <TablePagination
          count={tableData.length}
          rowsPerPage={state.pageSize}
          page={state.pageIndex}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage={'N° de celulas'}
          labelDisplayedRows={() => {
            return `Total: ${tableData.length} | Pagina: ${state.pageIndex + 1} de ${pageOptions.length}`;
          }}
        />
      </Stack>
    </Box>
  );
};

export default DataPessoas;
