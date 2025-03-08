'use client';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import useDebounce from '@/lib/components/useDebounce';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { InputAdornment, MenuItem, Stack, TextField, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { DataGrid, GridColDef, GridSortDirection } from '@mui/x-data-grid';
import { Lead } from '@prisma/client';

const statuses = [
  'Pending',
  'Reached Out',
  'Not Interested',
  'Not qualified',
  'Converted',
];

const DataGridContainer = styled('div')({
  ['.status-cell']: {
    textTransform: 'capitalize',
  },
});

const columns: GridColDef[] = [
  { field: 'name', headerName: 'Name', width: 200 },
  { field: 'submitted', headerName: 'Submitted', width: 200 },
  {
    field: 'status',
    headerName: 'Status',
    width: 200,
    cellClassName: 'status-cell',
  },
  { field: 'country', headerName: 'Country', width: 200 },
];

interface DataRow {
  id: number;
  name: string;
  submitted: string;
  status: string;
  country: string;
}

export default function Leads() {
  const [searchValue, setSearchValue] = useState('');
  const [status, setStatus] = useState('All');
  const [leads, setLeads] = useState<DataRow[]>([]);
  const [count, setCount] = useState(0);
  const [orderBy, setOrderBy] = useState('submitted');
  const [order, setOrder] = useState<GridSortDirection>('desc');
  const [page, setPage] = useState(0);
  const search = useDebounce(searchValue, 500);

  useEffect(() => {
    let abort = false;

    (async () => {
      let orderByField = orderBy;
      if (orderBy === 'submitted') {
        orderByField = 'createdAt';
      }

      const resp = await fetch(
        `/api/leads?search=${searchValue}&status=${
          status === 'All' ? '' : status.toLowerCase()
        }&page=${page}&orderBy=${orderByField}&order=${order}`
      );
      const { leads, count } = (await resp.json()) as {
        leads: Lead[];
        count: number;
      };

      if (abort) {
        return;
      }

      setCount(count);
      setLeads(
        leads.map((l) => ({
          id: l.id,
          name: `${l.firstName} ${l.lastName}`,
          submitted: format(l.createdAt, 'MM/dd/yyyy h:mm a'),
          status: l.status,
          country: l.country,
        }))
      );
    })();

    return () => {
      abort = true;
    };
  }, [search, status, orderBy, order, page]);

  return (
    <Stack spacing={2}>
      <Typography component="h1" variant="h5">
        Leads
      </Typography>
      <Stack direction="row" spacing={2}>
        <TextField
          label="Search"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <FontAwesomeIcon
                    width="25"
                    height="25"
                    icon={['fas', 'magnifying-glass']}
                  />
                </InputAdornment>
              ),
            },
          }}
        />
        <TextField
          label="Status"
          select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <MenuItem value="All">All</MenuItem>
          {statuses.map((s) => (
            <MenuItem
              key={`status-menu-item-${s.replace(/\s/g, '_')}`}
              value={s}
            >
              {s}
            </MenuItem>
          ))}
        </TextField>
      </Stack>
      <DataGridContainer>
        <DataGrid
          columns={columns}
          initialState={{ pagination: { paginationModel: { pageSize: 5 } } }}
          rows={leads}
          rowCount={count}
          pageSizeOptions={[5]}
          paginationMode="server"
          filterMode="server"
          sortingMode="server"
          disableRowSelectionOnClick
          disableColumnFilter
          disableColumnSelector
          onPaginationModelChange={(paginationModel) => {
            setPage(paginationModel.page);
          }}
          onSortModelChange={(sortModel) => {
            if (sortModel.length) {
              setOrderBy(sortModel[0].field);
              setOrder(sortModel[0].sort);
            } else {
              setOrder(order === 'asc' ? 'desc' : 'asc');
            }
          }}
          sortModel={[{ field: orderBy, sort: order }]}
        />
      </DataGridContainer>
    </Stack>
  );
}
