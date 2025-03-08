'use client';
import { config, library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { createTheme } from '@mui/material/styles';

config.autoAddCss = false;

library.add(fas);

const theme = createTheme({
  cssVariables: true,
  palette: {
    mode: 'light',
  },
  typography: {
    fontFamily: 'var(--font-roboto)',
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          minWidth: 100,
        },
      },
    },
    MuiGrid: {
      defaultProps: {
        gap: 2,
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: 'var(--foreground)',
          color: 'var(--background)',
          borderRadius: 12,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: 'var(--green)',
        },
      },
    },
  },
});

export default theme;
