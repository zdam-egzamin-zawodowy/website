import {
  createMuiTheme,
  responsiveFontSizes,
  Theme,
} from '@material-ui/core/styles';
import { PaletteOptions } from '@material-ui/core/styles/createPalette';
import { blue, pink } from '@material-ui/core/colors';

const createTheme = (paletteType?: PaletteOptions['type']): Theme => {
  return responsiveFontSizes(
    createMuiTheme({
      typography: {
        h1: {
          fontSize: '4.5rem',
        },
      },
      palette: {
        type: paletteType,
        primary: {
          main: blue['A200'],
        },
        secondary: {
          main: pink['A200'],
        },
      },
      overrides: {
        MuiTableContainer: {
          root: {
            overflow: 'auto',
          },
        },
      },
      props: {
        MuiLink: {
          underline: 'none',
        },
      },
    })
  );
};

export default createTheme;
