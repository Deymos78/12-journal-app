import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";

import { purpleTheme  } from "./purpleTheme";
// HIgger orden component
// Aqui consfiguraresmo el APPTHEM con el que encapsularemos la aplicacion
// Recogeremmos el prop y lo desestructuraremos y recogeremos el children 
export const AppTheme = ({ children }) => {

  
  
  return (
    // El ThemeProvider se utiliza para establecer un tema global al que pueden acceder los componentes
    // En este caso establecemos el tema que hemos creado el cual usa una funcion para eso
    <ThemeProvider theme={ purpleTheme }>
        {/* Su propósito principal es normalizar los estilos predeterminados del navegador y proporcionar una base de estilos coherente para los 
        componentes de Material-UI. */}
        <CssBaseline/>
        
        {children}
    </ThemeProvider>
  )
}
