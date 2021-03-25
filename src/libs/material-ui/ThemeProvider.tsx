import { useMemo } from 'react';
import createTheme from './createTheme';

import { ThemeProvider as MuiThemeProvider } from '@material-ui/styles';
import { CssBaseline } from '@material-ui/core';
import { PaletteOptions } from '@material-ui/core/styles/createPalette';

interface ThemeProviderProps {
  children?: React.ReactNode;
  paletteType?: PaletteOptions['type'];
  cssBaseline?: boolean;
}

function ThemeProvider({
  children,
  paletteType,
  cssBaseline = true,
}: ThemeProviderProps) {
  const theme = useMemo(() => createTheme(paletteType), [paletteType]);
  return (
    <MuiThemeProvider theme={theme}>
      {cssBaseline ? (
        <>
          {children}
          <CssBaseline />
        </>
      ) : (
        children
      )}
    </MuiThemeProvider>
  );
}

export default ThemeProvider;
