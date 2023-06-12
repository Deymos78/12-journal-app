import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { addNewEmptyNote, deleteNoteById, savingNewNote, setActiveNote, setNotes, setPhotosToActiveNote, setSaving, updateNote } from "./journalSlice";
import { loadNotes } from "../../helpers/loadNotes";
import { fileUpload } from "../../helpers/fileUpload";


// La nomenglatura del start es para indicar que inicia el proceso
export const startNewNote = () => {
    
    return async( dispatch, getState ) => {
        
        // Cuando empezemos a crea una nueva nota actualizamos el valor para poder dehabilitar el estado
        dispatch( savingNewNote() );

        // Recuperamos del estado el id del usuario
        const { uid } = getState().auth;

        // Crearemos  una nueva nota
        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime()
        } 
        // Ahora conseguiremos la referencia al documento que queremos del usuario que queremos
        // const newDoc = doc( collection( FirebaseDB, `/id-user-1/journal/notes` ) )
        const newDoc = doc( collection( FirebaseDB, `${ uid }/journal/notes` ) );
        // Realizamos la creacion de la nota, le pasaremos la referencia y la nota que qqueremos que se crea
        await setDoc( newDoc, newNote);

        // Insertamos una nueva propiedad el cual tendra el id y le pondremos el id de la nueva nota generada
        newNote.id = newDoc.id;

        // Introducimos la nueva nota dentro del array
        dispatch( addNewEmptyNote( newNote ) ); 
        // Introducimos la ultima nota creada como activa
        dispatch( setActiveNote( newNote ) );

    }
}

// RECUPERAREMOS TODAS LAS NOTAS DEL SERVIDOR
export const startLoadingNotes = () => {
    return async( dispatch, getState) =>{

        const { uid } = getState().auth;
        if( !uid ) throw new Error('El UID del usuario no existe');
 
        const notes = await loadNotes( uid );

        dispatch( setNotes( notes ) );
    }
}

const example ='/iioq9v7KT9RVdI29EIH0SqQ5nDq1/journal/notes/Shx0aSmZo6vL3Y78CB4m';

// CON ESTA PROPIEDAD
export const startSaveNote = () => {
    return async( dispatch, getState  ) =>{

        dispatch( setSaving() );

        const { uid } = getState().auth;
        // La nota active la referncia pasa a ser note, la recogemos del estado de la aplicacion 
        const { active:note } = getState().journal;

        // Desestructuramos los datos de la nota y lo almacenamos en una constante
        const noteToFireStore = { ...note };
        // eliminamos una de ssus sus propiedades para no vuelva a crear una nota con id duplicados
        delete noteToFireStore.id;

        // De esta forma conseguirmos apuntar a la referencia del documento
        const docRef = doc( FirebaseDB, `${ uid }/journal/notes/${ note.id }`);

        // La tercera opcin, es para cuando hay campos que ya exisitan y hay nuevos campos entonces mantenemos los de firebase y añadimos los nuevos
        await setDoc(docRef, noteToFireStore, {merge: true});

        dispatch( updateNote( note ) );

    }
}


export const startUploadingFiles = ( files = [] ) => {

    return async( dispatch ) => {

        dispatch( setSaving() );

        // await fileUpload( files[0] );

        const fileUploadPromises = [];

        for( const file of files ){
            fileUploadPromises.push( fileUpload( file ) );
        }

        const photoUrls = await Promise.all( fileUploadPromises );
        
        dispatch(setPhotosToActiveNote( photoUrls ));

    }
}

export const startDeletingNote = () => {
    return async( dispatch, getState ) =>{

        console.log('Vamos a borrar una nota nueva');

        const { uid } = getState().auth;
        const { active: note } = getState().journal;

        // Vamos a crear la referencia al documento de FireBase
        const refDoc = doc(FirebaseDB, `${ uid }/journal/notes/${note.id}`);

        await deleteDoc(refDoc);

        dispatch( deleteNoteById(note.id) );

    }
}