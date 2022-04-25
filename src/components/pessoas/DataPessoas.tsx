import {
  alpha,
  Box,
  Button,
  Checkbox,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  useTheme,
} from '@mui/material';
import FlexBox from '../FlexBox';
import { H6 } from '../Typography';
import BlankCheckBoxIcon from '../../icons/BlankCheckBoxIcon';
import CheckBoxIcon from '../../icons/CheckBoxIcon';
import { FC, forwardRef, useEffect, useMemo, useRef, useState } from 'react';
import {
  useAsyncDebounce,
  useGlobalFilter,
  usePagination,
  useRowSelect,
  useSortBy,
  useTable,
} from 'react-table';
import ScrollBar from 'simplebar-react';
import columnShape from './columnShape';
import {
  StyledPagination,
  StyledSearchIcon,
  StyledSearchInput,
} from './styledComponents';

const SelectCheckBox = forwardRef(function SelectCheckBox(
  { indeterminate, ...rest }: any,
  ref: any,
) {
  const defaultRef = useRef();
  const resolvedRef = ref || defaultRef;

  useEffect(() => {
    if (resolvedRef) {
      resolvedRef.current.indeterminate = indeterminate;
    }
  }, [resolvedRef, indeterminate]);

  return (
    <Checkbox
      {...rest}
      disableRipple
      ref={resolvedRef}
      checkedIcon={<CheckBoxIcon fontSize="small" color="primary" />}
      icon={<BlankCheckBoxIcon fontSize="small" color="primary" />}
    />
  );
});

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
  const handleChange = (_event: any, currentPageNo: number) => {
    gotoPage(currentPageNo - 1);
  };

  const ids = selectedFlatRows.map((item: any) => item.original.id);

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
              <TableRow key={row.id} {...row.getRowProps()}>
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
            );
          })}
        </TableBody>
      </Table>
      {/* </ScrollBar> */}

      <Stack alignItems="center" marginY="2rem">
        <StyledPagination
          shape="rounded"
          onChange={handleChange}
          count={pageOptions.length}
        />
      </Stack>
    </Box>
  );
};

export default DataPessoas;
