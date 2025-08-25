import { useCallback } from 'react';

import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';

import { LucideIcon } from 'src/components/lucide-icons';

// ----------------------------------------------------------------------

type Props = {
  numSelected: number;
  filterName: string;
  filterType: string;
  filterStatus: string;
  onFilterName: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFilterType: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFilterStatus: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClearFilters: VoidFunction;
};

export function CustomersTableToolbar({
  numSelected,
  filterName,
  filterType,
  filterStatus,
  onFilterName,
  onFilterType,
  onFilterStatus,
  onClearFilters,
}: Props) {
  const handleClearFilters = useCallback(() => {
    onClearFilters();
  }, [onClearFilters]);

  // Check if any filters are active
  const hasActiveFilters = filterName || filterType !== 'all' || filterStatus !== 'all';

  return (
    <Stack
      spacing={2}
      alignItems={{ xs: 'flex-end', md: 'center' }}
      direction={{
        xs: 'column',
        md: 'row',
      }}
      sx={{
        p: 2.5,
        pr: { xs: 2.5, md: 1 },
      }}
    >
      <Stack direction="row" alignItems="center" spacing={2} flexGrow={1} sx={{ width: 1 }}>
        <TextField
          value={filterName}
          onChange={onFilterName}
          placeholder="Search customers..."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LucideIcon icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
              </InputAdornment>
            ),
          }}
          sx={{ maxWidth: 320 }}
        />

        <TextField
          select
          label="Type"
          value={filterType}
          onChange={onFilterType}
          sx={{ minWidth: 200 }}
        >
          <MenuItem value="all">All Types</MenuItem>
          <MenuItem value="Individual">Individual</MenuItem>
          <MenuItem value="Business">Business</MenuItem>
          <MenuItem value="VIP">VIP</MenuItem>
        </TextField>

        <TextField
          select
          label="Status"
          value={filterStatus}
          onChange={onFilterStatus}
          sx={{ minWidth: 200 }}
        >
          <MenuItem value="all">All Status</MenuItem>
          <MenuItem value="Active">Active</MenuItem>
          <MenuItem value="Inactive">Inactive</MenuItem>
          <MenuItem value="Pending">Pending</MenuItem>
        </TextField>
      </Stack>

      {!!numSelected && (
        <Button
          color="error"
          variant="outlined"
          startIcon={<LucideIcon icon="eva:trash-2-fill" />}
          sx={{
            borderRadius: 2,
            px: 3,
            py: 1.5,
            fontWeight: 600,
            borderWidth: 2,
            whiteSpace: 'nowrap',
            '&:hover': {
              borderWidth: 2,
              backgroundColor: 'error.main',
              color: 'white',
            },
          }}
        >
          Delete ({numSelected})
        </Button>
      )}

      {hasActiveFilters && (
        <Button
          color="error"
          variant="outlined"
          startIcon={<LucideIcon icon="eva:close-fill" />}
          onClick={handleClearFilters}
          sx={{
            borderRadius: 2,
            px: 4,
            py: 1.5,
            minWidth: 160,
            fontWeight: 600,
            borderWidth: 2,
            whiteSpace: 'nowrap',
            '&:hover': {
              borderWidth: 2,
              backgroundColor: 'error.main',
              color: 'white',
            },
          }}
        >
          Clear Filters
        </Button>
      )}
    </Stack>
  );
}
