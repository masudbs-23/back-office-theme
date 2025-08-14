import { useState, useCallback, useEffect } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import { alpha } from '@mui/material/styles';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import IconButton from '@mui/material/IconButton';
import TableContainer from '@mui/material/TableContainer';

import { useBoolean } from 'src/hooks/use-boolean';

import { useTable, getComparator } from 'src/hooks/use-table';

import { useFoods } from 'src/hooks/useApi';

import { useSnackbar } from 'src/components/snackbar';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { TableHeadCustom } from 'src/components/table';
import { TableSelectedAction } from 'src/components/table';
import { TableEmptyRows, TableNoData, TableToolbar } from 'src/components/table';
import { Breadcrumb } from 'src/components/breadcrumb';

import { Iconify } from 'src/components/iconify';

import { useRouter } from 'src/routes/hooks';

import { FoodTableRow } from '../food-table-row';
import { FoodTableToolbar } from '../food-table-toolbar';
import { FoodTableFiltersResult } from '../food-table-filters-result';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Name' },
  { id: 'description', label: 'Description' },
  { id: 'price', label: 'Price' },
  { id: 'category', label: 'Category' },
  { id: 'available', label: 'Available' },
  { id: 'createdAt', label: 'Created At' },
  { id: '', width: 88 },
];

const defaultFilters = {
  name: '',
  category: 'all',
  available: 'all',
};

// ----------------------------------------------------------------------

export function FoodsView() {
  const router = useRouter();
  const table = useTable();

  const confirm = useBoolean();

  const snackbar = useSnackbar();

  const { data: foodsData, isLoading, error } = useFoods();

  const foods = foodsData?.data || [];

  const [tableData, setTableData] = useState(foods);

  const [filters, setFilters] = useState(defaultFilters);

  const dataFiltered = applyFilter({
    inputData: tableData,
    comparator: getComparator(table.order, table.orderBy),
    filters,
  });

  const dataInPage = dataFiltered.slice(
    table.page * table.rowsPerPage,
    table.page * table.rowsPerPage + table.rowsPerPage
  );

  const denseHeight = table.dense ? 52 : 72;

  const canReset = !Object.values(filters).every((value) => value === defaultFilters[value as keyof typeof defaultFilters]);

  const notFound = (!dataFiltered.length && canReset) || !dataFiltered.length;

  const handleNewFood = useCallback(() => {
    router.push('/dashboard/foods/new');
  }, [router]);

  const handleFilters = useCallback(
    (name: string, value: any) => {
      table.onResetPage();
      setFilters((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    },
    [table]
  );

  const handleResetFilters = useCallback(() => {
    setFilters(defaultFilters);
  }, []);

  const handleDeleteRow = useCallback(
    (id: string) => {
      const deleteRow = tableData.filter((row) => row.id !== id);
      setTableData(deleteRow);

      table.onUpdatePageDeleteRow(dataInPage.length);

      snackbar.enqueueSnackbar('Delete success!');
    },
    [dataInPage.length, table, tableData, snackbar]
  );

  const handleDeleteRows = useCallback(() => {
    const deleteRows = tableData.filter((row) => !table.selected.includes(row.id));
    setTableData(deleteRows);

    table.onUpdatePageDeleteRows({
      totalRows: tableData.length,
      totalRowsInPage: dataInPage.length,
      totalSelected: table.selected.length,
    });

    snackbar.enqueueSnackbar('Delete success!');

    confirm.onFalse();
  }, [confirm, dataInPage.length, snackbar, table, tableData]);

  const handleEditRow = useCallback(
    (id: string) => {
      // Handle edit row
      console.log('Edit row:', id);
    },
    []
  );

  const handleViewRow = useCallback(
    (id: string) => {
      // Handle view row
      console.log('View row:', id);
    },
    []
  );

  // Update table data when foods data changes
  useEffect(() => {
    if (foods.length > 0) {
      setTableData(foods);
    }
  }, [foods]);

  if (isLoading) {
    return (
      <Container maxWidth={false}>
        <div>Loading foods...</div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth={false}>
        <div>Error loading foods: {error.message}</div>
      </Container>
    );
  }

  return (
    <>
      <Container maxWidth={false}>
        <Breadcrumb 
          title="Foods" 
          items={[
            { title: 'Dashboard', href: '/dashboard' },
            { title: 'Foods' }
          ]} 
        />

        <Box
          sx={{
            mb: 5,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
          }}
        >
          <Button
            variant="contained"
            color="inherit"
            startIcon={<Iconify icon="mingcute:add-line" />}
            onClick={handleNewFood}
          >
            New Food
          </Button>
        </Box>

        <Card>
          <FoodTableToolbar
            filters={filters}
            onFilters={handleFilters}
            categoryOptions={Array.from(new Set(foods.map((food) => food.category || '')))}
          />

          <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
            <TableSelectedAction
              dense={table.dense}
              numSelected={table.selected.length}
              rowCount={tableData.length}
              onSelectAllRows={(checked) =>
                table.onSelectAllRows(
                  checked,
                  tableData.map((row) => row.id)
                )
              }
              action={
                <Tooltip title="Delete">
                  <IconButton color="primary" onClick={confirm.onTrue}>
                    <Iconify icon="solar:trash-bin-trash-bold" />
                  </IconButton>
                </Tooltip>
              }
            />

            <Table size={table.dense ? 'small' : 'medium'} sx={{ minWidth: 960 }}>
              <TableHeadCustom
                order={table.order}
                orderBy={table.orderBy}
                rowCount={tableData.length}
                numSelected={table.selected.length}
                onSort={table.onSort}
                onSelectAllRows={(checked) =>
                  table.onSelectAllRows(
                    checked,
                    tableData.map((row) => row.id)
                  )
                }
                headLabel={TABLE_HEAD}
              />

              <TableBody>
                {dataInPage.map((row) => (
                  <FoodTableRow
                    key={row.id}
                    row={row}
                    selected={table.selected.includes(row.id)}
                    onSelectRow={() => table.onSelectRow(row.id)}
                    onDeleteRow={() => handleDeleteRow(row.id)}
                    onEditRow={() => handleEditRow(row.id)}
                    onViewRow={() => handleViewRow(row.id)}
                  />
                ))}

                <TableEmptyRows
                  height={denseHeight}
                  emptyRows={emptyRows(table.page, table.rowsPerPage, tableData.length)}
                />

                <TableNoData notFound={notFound} />
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      </Container>

      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title="Delete"
        content={
          <>
            Are you sure want to delete <strong>{table.selected.length}</strong> items?
          </>
        }
        action={
          <Button variant="contained" color="error" onClick={handleDeleteRows}>
            Delete
          </Button>
        }
      />
    </>
  );
}

// ----------------------------------------------------------------------

function applyFilter({
  inputData,
  comparator,
  filters,
}: {
  inputData: any[];
  comparator: (a: any, b: any) => number;
  filters: any;
}) {
  const { name, category, available } = filters;

  const stabilizedThis = inputData.map((el, index) => [el, index] as const);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  inputData = stabilizedThis.map((el) => el[0]);

  if (name) {
    inputData = inputData.filter(
      (food) => food.name.toLowerCase().indexOf(name.toLowerCase()) !== -1
    );
  }

  if (category !== 'all') {
    inputData = inputData.filter((food) => food.category === category);
  }

  if (available !== 'all') {
    inputData = inputData.filter((food) => food.available === (available === 'true'));
  }

  return inputData;
}

function emptyRows(page: number, rowsPerPage: number, arrayLength: number) {
  return page > 0 ? Math.max(0, (1 + page) * rowsPerPage - arrayLength) : 0;
}
