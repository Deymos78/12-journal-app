import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material"
import { AuthLayout } from "../layout/AuthLayout"
import { Link as RouterLink} from 'react-router-dom';
import { useForm } from "../../hooks/useForm";
import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startCreatingUserWithEmailPassword } from "../../store/auth/thunks";

const formData = {
  email: 'fernando@google.com',
  password: '123456',
  displayName: '',
}

const formValidations = {
  // Vamos a realizar una validacion de si el valor recibido cumple con las condiciones que queremos 
  email: [ ( value ) => value.includes('@')  , 'El correo debe de tener un @'],
  password: [ ( value ) => value.length >= 6   , 'El password debe de tener mas de 6 letras'],
  displayName: [ ( value ) => value.length >= 1   , 'El nombre es obligatorio']
}  
 

export const RegisterPage = () => {

  const [formSubmitted, setformSubmitted] = useState(false);
  const dispatch = useDispatch();

  // Recupera de la store los datos actuales del la apliacion status y errorMessage
  const { status , errorMessage } = useSelector(state => state.auth );

  // Almacena un booleano el cual es producto de la comprobacion del estado de la aplicacion
  // Lo usa para desabilitar el boton cuando se haga alguna peticion asincrona 
  const isCheckingAuthentication = useMemo( () => status === 'checking', [status]);

  const { 
    formState, displayName, email, password, onInputChange,
    isFormValid,  displayNameValid, emailValid, passwordValid 
  } = useForm(formData, formValidations);


  const onSubmit = (event) =>{
    event.preventDefault();
    setformSubmitted(true); 
    if( !isFormValid) return;

    dispatch(startCreatingUserWithEmailPassword( formState ));
  }

  return (
    <AuthLayout title="Register">
      <h1>FormValid {isFormValid ? 'Valido' : 'Incorrecto'} </h1>
        
        <form onSubmit={ onSubmit }     className="animate__animated animate__fadeIn animate__faster">
          <Grid container>
            <Grid item xs={ 12 } sx={{ mt: 2 }}>
              <TextField 
                label="Nombre Completo" 
                type="text" 
                placeholder="Rober Carlos" 
                fullWidth
                name="displayName"
                value={ displayName }
                onChange={ onInputChange }
                error={ !!displayNameValid && formSubmitted }
                helperText={ formSubmitted ? displayNameValid : ''}
                
              />

            </Grid>

            <Grid item xs={ 12 } sx={{ mt: 2 }}>
              <TextField 
                label="Correo" 
                type="email" 
                placeholder="correo@google.com" 
                fullWidth
                name="email"
                value={ email }
                onChange={ onInputChange }
                error={ !!emailValid && formSubmitted }
                helperText={ formSubmitted ? emailValid : '' }
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
                error={ !!passwordValid && formSubmitted }
                helperText={ formSubmitted ? passwordValid : '' }
              />

            </Grid> 

            <Grid container spacing={2} sx={{mb: 2, mt: 1}}>
              <Grid 
                item 
                xs={ 12 } 
                display={ !!errorMessage ? '' : 'none'}
              > 
                <Alert severity="error" >{ errorMessage }</Alert>  
              </Grid>

              <Grid item xs={ 12 } > 
                <Button
                  disabled = { isCheckingAuthentication }
                  type="submit" 
                  variant='contained' 
                  fullWidth>
                  Registrar
                </Button>

              </Grid>

              {/* <Grid item xs={ 12 } sm={ 6 }> 
                <Button variant='contained' fullWidth>
                  <Google/>
                  <Typography sx={{ ml: 1 }} >Google</Typography>
                </Button>

              </Grid> */}


            </Grid> 

            <Grid container direction='row' justifyContent='end'>
            <Typography sx={{ mr: 1}} >¿Ya tienes cuenta?</Typography>

              {/* En el componente es donde ponemos el Link con el nuevo alias  */}
              {/* El component se usa para especificar el tipo de elemento html que se va a rendereizar */}
              {/* Como el Link se comporta como un enlace tipo 'a' ese sera su comportamiento */}
              <Link component={ RouterLink } color='inherit' to='/auth/login'>
                Iniciar Sesion
              </Link>

            </Grid>
          
          </Grid>
        </form>

    </AuthLayout>
  )
}
