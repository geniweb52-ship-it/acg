import { createTheme, MantineColorsTuple } from '@mantine/core'

const navyBlue: MantineColorsTuple = [
  '#e8edf5',
  '#c5cfe3',
  '#9eb0d0',
  '#7790bc',
  '#5675ad',
  '#3a5da0',
  '#2a4d8f',
  '#1c3d7f',
  '#132F52',
  '#0B1F3A',
]

const mustard: MantineColorsTuple = [
  '#fdf8e7',
  '#faefc5',
  '#f5e09f',
  '#f0d077',
  '#eac254',
  '#E8C65A',
  '#e0b43a',
  '#D4A72C',
  '#c09420',
  '#a67d10',
]

export const theme = createTheme({
  colors: {
    navy: navyBlue,
    mustard: mustard,
  },
  primaryColor: 'navy',
  fontFamily: 'Manrope, sans-serif',
  headings: {
    fontFamily: 'Manrope, sans-serif',
    fontWeight: '800',
  },
  defaultRadius: 'md',
  spacing: {
    xs: '8px',
    sm: '12px',
    md: '16px',
    lg: '24px',
    xl: '32px',
  },
  breakpoints: {
    xs: '480px',
    sm: '768px',
    md: '1024px',
    lg: '1200px',
    xl: '1440px',
  },
  components: {
    Button: {
      defaultProps: {
        radius: 'md',
      },
      styles: {
        root: {
          fontWeight: 700,
          fontFamily: 'Manrope, sans-serif',
        },
      },
    },
    Card: {
      defaultProps: {
        radius: 'lg',
        shadow: 'sm',
      },
    },
  },
})
