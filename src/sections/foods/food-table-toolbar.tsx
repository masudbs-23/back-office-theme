import { useCallback } from 'react';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

type Props = {
  filters: {
    name: string;
    category: string;
    available: string;
  };
  onFilters: (name: string, value: string) => void;
  categoryOptions: string[];
};

export function FoodTableToolbar({ filters, onFilters, categoryOptions }: Props) {
  const handleCategoryChange = useCallback(
    (event: SelectChangeEvent<string>) => {
      onFilters('category', event.target.value);
    },
    [onFilters]
  );

  const handleAvailableChange = useCallback(
    (event: SelectChangeEvent<string>) => {
      onFilters('available', event.target.value);
    },
    [onFilters]
  );

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
          fullWidth
          value={filters.name}
          onChange={(event) => onFilters('name', event.target.value)}
          placeholder="Search..."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
              </InputAdornment>
            ),
          }}
        />

        <FormControl
          sx={{
            minWidth: 240,
          }}
        >
          <InputLabel>Category</InputLabel>

          <Select
            value={filters.category}
            onChange={handleCategoryChange}
            input={<OutlinedInput label="Category" />}
          >
            <MenuItem value="all">All</MenuItem>

            {categoryOptions.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl
          sx={{
            minWidth: 240,
          }}
        >
          <InputLabel>Available</InputLabel>

          <Select
            value={filters.available}
            onChange={handleAvailableChange}
            input={<OutlinedInput label="Available" />}
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="true">Available</MenuItem>
            <MenuItem value="false">Unavailable</MenuItem>
          </Select>
        </FormControl>
      </Stack>
    </Stack>
  );
}
