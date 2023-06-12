import { collection, getDocs } from "firebase/firestore/lite";
import { FirebaseDB } from "../firebase/config";

// ESTA FUNCION NOS AYUDARA A TRAER TODOS LOS DATOS DE LA BASE DE DATOS
export const loadNotes = async( uid = '') => {
    if( !uid ) throw new Error('El UID del usuario no existe');

    // Para conseguir la referencia de la collecion nos pide la instancia de la base de datos y la referencia a la collecion
    const collectionRef = collection(FirebaseDB, `${ uid }/journal/notes`);

    const docs = await getDocs(collectionRef);

    const notes = [];

    docs.forEach( doc =>{
        // Instroduciremos el objeto con el id del doc y con el spread esparcimos los que vien dentro del objeto.data()
        notes.push({id: doc.id, ...doc.data() })
    })

    console.log(notes);
    return notes;

}