// Import the functions you need from the SDKs you need
// initializeApp --> Sirve para inicializar la aplicacion de Firebase en nuestro proyecto
import { initializeApp } from "firebase/app";
// getAuth --> Es una funcion que se utiliza para obtener una instancia del servicio de autenticacion de Firebase. 
import { getAuth } from 'firebase/auth';
// getFirestore --> Es una funcion que se utiliza para obtener una instancia del servicio de Firestore de Firebase
// Firestore es una base de datos en tiempo real y en la nube que nos permite almacenar y sincronizar datos en tiempo real en nuestras aplicaciones
import { getFirestore } from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Esta es la configuracion de firebase con la cual inicializaremos la aplicacion de firebase
const firebaseConfig = {
  apiKey: "AIzaSyAHroqmzAq92CuARuyg7h1K59dRpKnkRJQ",
  authDomain: "react-curso-9c52c.firebaseapp.com",
  projectId: "react-curso-9c52c",
  storageBucket: "react-curso-9c52c.appspot.com",
  messagingSenderId: "63222814478",
  appId: "1:63222814478:web:011195f74b311a494a695f"
};

// El siguiente metodo nos permitira inicializar firebase con la configuracion iniciada anteriormente
export const FirebaseApp = initializeApp(firebaseConfig);
// Con este metodo lo que conseguiremos es crear una instancia de autenticacion para la aplicacion de Firebase
export const FirebaseAuth = getAuth( FirebaseApp );
// Con el metodo de getFirestore podremos conseguir una instancia del almacenamiento de la store de firebase
export const FirebaseDB = getFirestore( FirebaseApp );