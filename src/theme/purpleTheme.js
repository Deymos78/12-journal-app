import { createTheme } from '@mui/material';
import { red  } from '@mui/material/colors';

// Tenemos acceso a difenrentes colores predefinidos de la biblioteca
// La funcion createTheme lo que hace es extender y reescribir el thema que le estamos pasando
export const purpleTheme = createTheme({
    palette:{
        primary:{
            main: '#262254'
        },
        secondary:{
            main: '#543884'
        },
        error:{
            main: red.A400
        }
    }
})
