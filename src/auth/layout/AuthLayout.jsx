import { Grid, Typography } from "@mui/material"

// De esta manera conseguiremos tener una especie de plantilla que nos permita agilizar el trabajo 
// REcibiremos los children
export const AuthLayout = ({children, title=''}) => {
  return ( 

    <Grid  
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
      sx={{
        minHeight: '100vh', 
        backgroundColor: 'primary.main', 
        padding: 4}} 
    >
        {/* La propiedad item se usa para indicar que se comportara como elemento secundario dentro de otro GRID */}
        <Grid item
            className='box-shadow'  
            // Espacio que ocupara entre 12 
            xs={ 3 }
            sx={{
                width: { sm: 450}, 
                backgroundColor: 'white', 
                padding: 3, 
                borderRadius: 2 }}>
            <Typography variant='h5' sx={{ mb: 1}} >{ title }</Typography>

                {children}
 
        </Grid>
    </Grid>
    
  )
}
