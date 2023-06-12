import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../store/auth";
import { FirebaseAuth } from "../firebase/config";
import { startLoadingNotes } from "../store/journal/thunks";

export const useCheckAuth = () => {
    // Recogemos el valor del stado de la aplicacion
    const { status } = useSelector( state =>  state.auth );
    
    // Con la instancia del dispatch 
    const dispatch = useDispatch()
      
    useEffect(() => {
        // Esta funcion sirve para  controlar el estado de autenticacion de un usuario en una aplicacion
        // recibe notificaciones cuando ocurren cambios en el estado de la autenticacion
        // Esta funcion devolvera un usuario si el usuario ha iniciado sesion correctamente o 
        // null si el usuario ha cerrado sesion
       onAuthStateChanged( FirebaseAuth, async( user ) => {
    
            // Si no hay usuario entonces cerramos la sesion
            if( !user ) return dispatch( logout() );
    
            // Si hay un usuario entonces desestructuraremos el usuario que hemos recuperado  
            const { uid, email, displayName, photoURL } = user;

            // Con los datos recuperados montaremos los datos y cambiaremos el estado de la aplicacion
            dispatch( login( { uid, email, displayName, photoURL } ) );
            dispatch( startLoadingNotes() );
  
       });

    //  Esta comprobacion solo se realizara cada vez que se renderize
    }, []);

    // Devolvemos el estado de la comprobacion
    // status = 'login'  --> El Enrutamiento nos reedijira a la parte de autenticado y nos dara acceso a cietas paginas
    // status = 'logout' --> El enrutamiento nos reedijira a la parte de login
    return status;

}
