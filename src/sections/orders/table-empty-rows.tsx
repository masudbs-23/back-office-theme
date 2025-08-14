import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

// ----------------------------------------------------------------------

type TableEmptyRowsProps = {
  height: number;
  emptyRows: number;
};

export function TableEmptyRows({ emptyRows, height }: TableEmptyRowsProps) {
  if (!emptyRows) {
    return null;
  }

  return (
    <TableRow
      sx={{
        height: height * emptyRows,
      }}
    >
      <TableCell colSpan={9} />
    </TableRow>
  );
}
