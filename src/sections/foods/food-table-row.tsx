import { useState, useCallback } from 'react';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';
import LinearProgress from '@mui/material/LinearProgress';

import { usePopover } from 'src/hooks/use-popover';

import { ConfirmDialog } from 'src/components/custom-dialog';
import { Label, labelClasses } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import { CustomPopover, usePopover as usePopoverCustom } from 'src/components/custom-popover';

import type { Food } from 'src/api/types';

// ----------------------------------------------------------------------

type Props = {
  selected: boolean;
  onEditRow: VoidFunction;
  row: Food;
  onSelectRow: VoidFunction;
  onDeleteRow: VoidFunction;
  onViewRow: VoidFunction;
};

export function FoodTableRow({
  row,
  selected,
  onEditRow,
  onSelectRow,
  onDeleteRow,
  onViewRow,
}: Props) {
  const { name, description, price, category, available, image, createdAt } = row;

  const confirm = usePopover();

  const quickEdit = usePopoverCustom();

  const [availableStatus, setAvailableStatus] = useState(available);

  const handleChangeAvailable = useCallback(
    (event: any) => {
      setAvailableStatus(event.target.value);
    },
    []
  );

  return (
    <>
      <TableRow hover selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox checked={selected} onClick={onSelectRow} />
        </TableCell>

        <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar alt={name} src={image} sx={{ mr: 2 }}>
            {name.charAt(0)}
          </Avatar>

          <ListItemText
            primary={name}
            secondary={description}
            primaryTypographyProps={{ typography: 'body2' }}
            secondaryTypographyProps={{ component: 'span', color: 'text.disabled' }}
          />
        </TableCell>

        <TableCell>${price}</TableCell>

        <TableCell>
          <Label
            variant="soft"
            color={
              (category === 'breakfast' && 'info') ||
              (category === 'lunch' && 'warning') ||
              (category === 'dinner' && 'error') ||
              'default'
            }
          >
            {category}
          </Label>
        </TableCell>

        <TableCell>
          <Label
            variant="soft"
            color={availableStatus ? 'success' : 'error'}
            sx={{
              [`& .${labelClasses.label}`]: {
                textTransform: 'capitalize',
              },
            }}
          >
            {availableStatus ? 'Available' : 'Unavailable'}
          </Label>
        </TableCell>

        <TableCell>{new Date(createdAt).toLocaleDateString()}</TableCell>

        <TableCell align="right">
          <IconButton color={quickEdit.open ? 'inherit' : 'default'} onClick={quickEdit.onOpen}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <CustomPopover
        open={quickEdit.open}
        onClose={quickEdit.onClose}
        arrow="right-top"
        sx={{ width: 140 }}
      >
        <MenuItem
          onClick={() => {
            onViewRow();
            quickEdit.onClose();
          }}
        >
          <Iconify icon="solar:eye-bold" />
          View
        </MenuItem>

        <MenuItem
          onClick={() => {
            onEditRow();
            quickEdit.onClose();
          }}
        >
          <Iconify icon="solar:pen-bold" />
          Edit
        </MenuItem>

        <MenuItem
          onClick={() => {
            confirm.onTrue();
            quickEdit.onClose();
          }}
          sx={{ color: 'error.main' }}
        >
          <Iconify icon="solar:trash-bin-trash-bold" />
          Delete
        </MenuItem>
      </CustomPopover>

      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title="Delete"
        content="Are you sure want to delete?"
        action={
          <Button variant="contained" color="error" onClick={onDeleteRow}>
            Delete
          </Button>
        }
      />
    </>
  );
}
