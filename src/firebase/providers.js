import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, updateProfile } from 'firebase/auth';
import { FirebaseAuth } from './config';

// Se crea una instancia del objeto del proveedor de google
const googleProvider = new  GoogleAuthProvider();

// Esta funcion asincrona nos permite realizar acciones con nuestro proveedor que en este caso sera Firebase
// Sirve para poder autenticar los usuarios a traves de un proveedor externo 
export const signInWithGoogle = async() => {

    try {
        // Este metodo nos permite autenticar un usuario a traves de un proveedor externo usando una ventana emergente
        const result = await signInWithPopup(FirebaseAuth, googleProvider );
        // const creadentials = GoogleAuthProvider.credentialFromResult( result );
        // Recuperaremos los datos que nos interesan de la respuesta
        const { displayName, email, photoURL, uid } = result.user;   
        // Retornamos un objeto con los datos recibido y con una propiedad expresando el resultado de la funcion
        return{
            ok: true,
            // user info
            displayName, email, photoURL, uid,
        }

    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        return{
            ok: false,
            errorMessage,
        }
    }
}

// Creamos un nuevo proveedor para poder hacer registros en firebase y recuperaremos un objeto el cual sera el objeto que podamos 
// montar y desestructurar en las propiedades de email, password y displayName
export const registerUserWithEmailPassword = async({ email, password, displayName }) => {
    try {

        // La funcion se usa para crear una nueva cuenta de usuario, la cual necesita un email y una contraseña
        const resp = await createUserWithEmailAndPassword(FirebaseAuth, email, password);
        const { uid, photoURL } = resp.user;

        await updateProfile( FirebaseAuth.currentUser, { displayName } );

        return{
            ok: true,
            uid, photoURL, email, displayName
        }
        
    } catch (error) {

        console.log(error);
        
        return{ 
            ok: false,
            errorMessage: error.message
        }
    }
}


export const loginWithEmailPassword = async({ email, password }) => {
    
    // Ya que se trata de una funciona asincrona y puede fallar usaremos un try catch
    try {
        //! signWithEmailAndPassword 
        const resp = await signInWithEmailAndPassword(FirebaseAuth, email, password);

        const { uid, displayName, photoURL } = resp.user;

        return{
            ok: true,
            uid, displayName, photoURL
        }

    } catch (error) {
        // console.log(error);

        return{
            ok: false,
            errorMessage: error.message
        }   
    }
}


export const logoutFirebase = async() => {
    // Con esto cerramos la sesion de Firebase
    return await FirebaseAuth.signOut();
}