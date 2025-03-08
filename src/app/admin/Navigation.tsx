'use client';

import { ReactNode, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AppBar, IconButton, Toolbar } from '@mui/material';
import { styled } from '@mui/material/styles';
import Sidebar from './Sidebar';

const Main = styled('main')({
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  padding: '2rem',
});

export default function Navigation({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Sidebar open={open} onClose={() => setOpen(false)} />
      <AppBar position="static">
        <Toolbar>
          <IconButton onClick={() => setOpen(!open)}>
            <FontAwesomeIcon width="25" height="25" icon={['fas', 'bars']} />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Main>{children}</Main>
    </>
  );
}
