import { loginWithEmailPassword, logoutFirebase, registerUserWithEmailPassword, signInWithGoogle } from "../../firebase/providers";
import { clearNotesLogout } from "../journal";
import { checkingCredentials, login, logout } from "./authSlice";

// Los thunks son acciones que son por lo general para acciones asincronas, si son sincronas se pueden realizar con los reducers

// Esta Thunk nos sirve para cambiar el estado del checking, para cuando se este realizando algun evento se colocara en 'checking'
export const checkingAuthentication = ( email, password) => {
    return async( dispatch ) => {
        dispatch( checkingCredentials() );
    }
}

// Start suele ser la manera en la que se suele nombrar a las aplicaciones que son asincronas
export const startGoogleSignIn = () => {
    return async( dispatch ) => {

        dispatch( checkingCredentials() );
        const result = await signInWithGoogle();
        // Comprobamos que la respuesta sea buena
        // En el caso de que sea mala entonces se ejecutara el logout y le mandaremos como arguemnto el mensaje de error que hemos recibido
        if( !result.ok ) return dispatch( logout( result.errorMessage ) );

        // En caso de que la respuesta sea buena entonces lo que haremos sera ejecutar el login y mandarle los datos del resultado
        dispatch( login( result ) );
    }
}

export const startCreatingUserWithEmailPassword =  ({ email, password, displayName}) => {

    return async( dispatch ) => {
    
        dispatch( checkingCredentials());

        const { ok, uid, photoURL, errorMessage } = await registerUserWithEmailPassword({ email, password, displayName});
        
        if( !ok ) return dispatch( logout( {errorMessage} ) );

        dispatch( login({ uid, displayName, email, photoURL }) );

    }
}


// Crearemos un Thunk para poder logearnos con las credenciales 
export const startLoginWithEmailPassword = ({ email, password }) => {
    // La funcion sera asincrona ya que tendremos que verificar que el usuario se encuentra dentro de Firebase
    return async( dispatch ) => {
        // Primero cambiamos el estado a que estamos realizando una accion asincrona que requiere un tiempo
        dispatch( checkingCredentials() );
        

        const {ok, uid, displayName, photoURL, errorMessage } = await loginWithEmailPassword({email, password});
        if( !ok ) return dispatch( logout( { errorMessage } ) );

        dispatch( login( { uid, displayName, email, photoURL } ) );

        // dispatch( login( ) );
    }
}


export const startLogout = () => {
    return async( dispatch ) => {

        await logoutFirebase();

        dispatch(clearNotesLogout());

        dispatch( logout());

    }
}