import { StarBorder, StarOutline, StartOutlined } from "@mui/icons-material"
import { Grid, Typography } from "@mui/material"

export const NothingSelectedView = () => {
  return (
    <Grid  
    className="animate__animated animate__fadeIn animate__faster"
    // La propiedad container se usa para indicar que se usara el grid como contenedor para los elementos secundarios
      container
      // Establece el espacio dentro de los elementos del grid
      spacing={ 0 }
      direction="column"  
      alignItems="center"
      // Alinear horizontalmente los elementos dentro del grid
      justifyContent="center"
      // Para especificar el numero de columnas que ocupara el elemento, en un sistema de cuadriculas basado en 12 columnas
      // En el fondo de color usamos el color del tema en el que pusimos en el createTheme
      sx={{minHeight: 'calc(100vh - 110px)',  backgroundColor: 'primary.main', borderRadius: 5 }} 
    >
        <Grid item xs={12}>
            <StarOutline sx={{ fontSize: 100, color: 'white' }} />

        </Grid>
        <Grid item xs={12}>
            <Typography color="white" variant='h5' >Selecciona o crea una entrada</Typography>
        </Grid>

    </Grid>

  )
}
