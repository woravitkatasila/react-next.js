import { createTheme } from '@mui/material/styles'
//import RalewayWoff2 from '../../public/fonts/PSL-Text-Regular.ttf'

// Palette
declare module '@mui/material/styles' {
  interface Palette {
    body: Palette['primary']
    secondary: Palette['primary']
  }
  // allow configuration using `createTheme`
  interface PaletteOptions {
    body?: PaletteOptions['primary']
    secondary?: PaletteOptions['primary']
  }

  interface TypographyVariants {
    content: React.CSSProperties
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    content?: React.CSSProperties
  }
}
// Button
declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    btnDefault: true
  }
  interface ButtonPropsColorOverrides {
    body: true
  }
}

// Update the Typography's variant prop options
declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    content: true
  }
}

// Create a theme instance.
const theme = createTheme({
  typography: {
    fontFamily: ['Kanit', 'sans-serif'].join(','),
    fontSize: 16,
    content: {
      fontFamily: ['Bai Jamjuree', 'sans-serif'].join(',')
    }
  },

  palette: {
    primary: {
      main: '#01AA8D'
    },

    error: {
      main: '#EE3741'
    },
    warning: {
      main: '#faba20'
    },
    info: {
      main: '#D9D9D9'
    },
    success: {
      main: '#00af43'
    },
    body: {
      main: '#393535',
      light: '#9E9E9E',
      contrastText: '#636363'
    },
    secondary: {
      main: '#0B5D99',
      dark: '#0B2559'
    }
  },

  components: {
    MuiButton: {
      variants: [
        {
          props: { variant: 'btnDefault' },
          style: {
            backgroundColor: '#01AA8D',
            color: '#fff',
            borderRadius: `5px`,
            fontWeight: 400
          }
        }
      ]
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-input': {
            '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
              '-webkit-appearance': 'none'
            },
            fontSize: '1rem',
            placeHolder: 16,
            backgroundColor: 'white',
            width: '100%'
          },
          '& .MuiFormHelperText-root': {
            ml: '5px'
          },
          '& .MuiTextField-root': {
            width: '100%'
          }
        }
      }
    }

    // MuiCssBaseline: {
    //   styleOverrides: `
    //     @font-face {
    //       font-family: 'PslTextRegular';
    //       font-style: normal;
    //       font-display: swap;
    //       font-weight: 400;
    //       src: local('PslTextRegular'), local('PSL-Text-Regular'), url(../../public/fonts/PSL-Text-Regular.ttf) format('ttf');
    //       unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
    //     }
    //   `
    // }
  }
})
theme.typography.h4 = {
  fontSize: '2.4285714285714284rem',
  [theme.breakpoints.down('sm')]: {
    fontSize: 26
  }
}
theme.typography.h5 = {
  fontSize: '1.7142857142857142rem',
  [theme.breakpoints.down('sm')]: {
    fontSize: 23
  }
}
theme.typography.h6 = {
  fontSize: '1.1428571428571428rem',
  [theme.breakpoints.down('sm')]: {
    fontSize: 19
  }
}
theme.typography.body1 = {
  fontSize: '1.1428571428571428rem',
  [theme.breakpoints.down('sm')]: {
    fontSize: 15
  }
}
theme.typography.body2 = {
  fontSize: 16,
  [theme.breakpoints.down('sm')]: {
    fontSize: 14
  }
}
theme.typography.subtitle1 = {
  fontSize: 16,
  [theme.breakpoints.down('sm')]: {
    fontSize: 14
  }
}
theme.typography.content = {
  fontSize: 17,
  lineHeight: 1.7,
  fontFamily: ['Bai Jamjuree', 'sans-serif'].join(','),
  [theme.breakpoints.down('sm')]: {
    fontSize: 14,
    lineHeight: 1.5
  }
}
export default theme
