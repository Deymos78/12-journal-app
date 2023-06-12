import { useDispatch, useSelector } from "react-redux"
import { Google } from "@mui/icons-material"
import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material"
// El Link que importamos desde material UI es solo para los estilo y no para la funcionalidad por lo que importamos tambien el link de react router dom
// pero no podemos tener dos referencias con el mismo nombre por lo que le asignaremos un alias
import {Link as RouterLink } from 'react-router-dom'
import { AuthLayout } from "../layout/AuthLayout"
import { useForm } from "../../hooks/useForm"
import { checkingAuthentication, startGoogleSignIn, startLoginWithEmailPassword } from "../../store/auth/thunks"
import { useMemo } from "react"

const formData = {  
  email: '',
  password: ''
}

// Esta es la pagina de Login para iniciar Sesion en nuestra aplicacion
export const LoginPage = () => {

  // Este hook se usa para seleccionar datos especificos del estado global  
  const { status, errorMessage } = useSelector( state => state.auth );  

  // El useDispatch nos permitira eviar acciones al store de Redux
  const dispatch = useDispatch();

  // Creamos una instancia de un customHook en este caso de formulario, el cual le pasamos datos  
  const { formState ,email, password, onInputChange} = useForm(formData);

  // Creamos una variable donde almacenaremos el estado del status 
  const isAuthenticating = useMemo( () => status === 'checking', [status]);

  // Creamos una funcion para cuando se haga click sobre el boton de inicio de sesion, para ingresar con correo electronico normal
  const onSubmit = ( event ) => {
    event.preventDefault();

    // console.log({email, password});
    // Al tratarse de una tarea asincrona lo llamaremos desde nuestro thunk personalizado
    //! No es esta la aacion a despachar
    // dispatch( checkingAuthentication() )
    dispatch( startLoginWithEmailPassword(formState) );
    
  }

  // Cuando queramos iniciar sesion con una cuenta de google entonces usaremos nuestro otro metodo el cual nos permitira 
  // registrarnos con una cuenta de google
  const onGoogleSignIn = () => {
    // console.log('onGoogleSignIn');

    dispatch( startGoogleSignIn() );

  }

  return (

    // En este caso importamos el componente que hemos creado en el Layout y le pasamos el parametro title para que lo pinte 
    <AuthLayout title="Login">
      
      <form onSubmit={ onSubmit }     className="animate__animated animate__fadeIn animate__faster">
          <Grid container>
            <Grid item xs={ 12 } sx={{ mt: 2 }}>
              <TextField 
                label="Correo" 
                type="email" 
                placeholder="correo@google.com" 
                fullWidth
                name="email"
                value={ email }
                onChange={ onInputChange }
              />

            </Grid>


            <Grid item xs={ 12 } sx={{ mt: 2 }}>
              <TextField 
                label="Contraseña" 
                type="password" 
                placeholder="Contraseña" 
                fullWidth
                name="password"
                value={ password }
                onChange={ onInputChange }
              />

            </Grid>

            <Grid 
                item 
                xs={ 12 } 
                sx={{ mt: 2}}
                display={ !!errorMessage ? '' : 'none' }
              > 
                <Alert severity="error" >{errorMessage}</Alert>

            </Grid>

            <Grid container spacing={2} sx={{mb: 2, mt: 1}}>
              
              <Grid item xs={ 12 } sm={ 6 }> 
                <Button
                  disabled={ isAuthenticating } 
                  type="submit" 
                  variant='contained' 
                  fullWidth
                >
                  Login 
                </Button>

              </Grid>

              <Grid item xs={ 12 } sm={ 6 }> 
                <Button 
                  disabled= { isAuthenticating }
                  variant='contained' 
                  fullWidth
                  onClick={ onGoogleSignIn }
                >
                  <Google/>
                  <Typography sx={{ ml: 1 }} >Google</Typography>
                </Button>

              </Grid>


            </Grid>

            <Grid container direction='row' justifyContent='end'>

              {/* En el componente es donde ponemos el Link con el nuevo alias  */}
              {/* El component se usa para especificar el tipo de elemento html que se va a rendereizar */}
              {/* Como el Link se comporta como un enlace tipo 'a' ese sera su comportamiento */}
              <Link component={ RouterLink } color='inherit' to='/auth/register'>
                Crear una cuenta
              </Link>

            </Grid>
            

          </Grid>
        </form>


    </AuthLayout>
    
  )
}


//  // El compoentne grid sirve para controlar y crear un sistema de diseño de cuadricula  flexible y receptivo
//     //  Permite organizar y alinear los elementos de la interfaz de usuario en filas y columnas.
//     <Grid  
//     // La propiedad container se usa para indicar que se usara el grid como contenedor para los elementos secundarios
//       container
//       // Establece el espacio dentro de los elementos del grid
//       spacing={ 0 }
//       direction="column"
//       alignItems="center"
//       // Alinear horizontalmente los elementos dentro del grid
//       justifyContent="center"
//       // Para especificar el numero de columnas que ocupara el elemento, en un sistema de cuadriculas basado en 12 columnas
//       // En el fondo de color usamos el color del tema en el que pusimos en el createTheme
//       sx={{minHeight: '100vh', backgroundColor: 'primary.main', padding: 4}} 
//     >
//       {/* La propiedad item se usa para indicar que se comportara como elemento secundario dentro de otro GRID */}
//       <Grid item
//       className='box-shadow'  
//       // Espacio que ocupara entre 12 
//       xs={ 3 }
//       sx={{ backgroundColor: 'white', padding: 3, borderRadius: 2 }}>
//         <Typography variant='h5' sx={{ mb: 1}} >Login</Typography>

//         <form>
//           <Grid container>
//             <Grid item xs={ 12 } sx={{ mt: 2 }}>
//               <TextField 
//                 label="Correo" 
//                 type="email" 
//                 placeholder="correo@google.com" 
//                 fullWidth
//               />

//             </Grid>


//             <Grid item xs={ 12 } sx={{ mt: 2 }}>
//               <TextField 
//                 label="Contraseña" 
//                 type="password" 
//                 placeholder="Contraseña" 
//                 fullWidth
//               />

//             </Grid>

//             <Grid container spacing={2} sx={{mb: 2, mt: 1}}>
//               <Grid item xs={ 12 } sm={ 6 }> 
//                 <Button variant='contained' fullWidth>
//                   Login 
//                 </Button>

//               </Grid>

//               <Grid item xs={ 12 } sm={ 6 }> 
//                 <Button variant='contained' fullWidth>
//                   <Google/>
//                   <Typography sx={{ ml: 1 }} >Google</Typography>
//                 </Button>

//               </Grid>


//             </Grid>

//             <Grid container direction='row' justifyContent='end'>

//               {/* En el componente es donde ponemos el Link con el nuevo alias  */}
//               {/* El component se usa para especificar el tipo de elemento html que se va a rendereizar */}
//               {/* Como el Link se comporta como un enlace tipo 'a' ese sera su comportamiento */}
//               <Link component={ RouterLink } color='inherit' to='/auth/register'>
//                 Crear una cuenta
//               </Link>

//             </Grid>
            

//           </Grid>
//         </form>
//       </Grid>

//     </Grid>