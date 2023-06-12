import { createSlice } from '@reduxjs/toolkit';


export const journalSlice = createSlice({
    name: 'journal',
    initialState: {
        isSaving: false,
        messageSaved: '',
        notes: [],
        active: null,
        // active: {
        //     id: 'ABC123',
        //     title: '',
        //     body: '',
        //     date: 123456,
        //     imageUrls: {}, // https://foto1.jpg
        // }
    },
    // TODO LAS FUNCIONES DE LOS REDUCER TIENE QUE SER SINCRONO NO ASINCRONO
    reducers: {
        savingNewNote: ( state ) =>{
            state.isSaving = true
        },
        addNewEmptyNote: ( state, action ) => {
            state.notes.push( action.payload );
            state.isSaving= false
        },  
        setActiveNote: ( state, action) => {
            state.active = action.payload;
            state.messageSaved = ''; 

        },
        setNotes: ( state, action ) =>{
            state.notes = action.payload;

        },
        setSaving: ( state ) => {
            state.isSaving = true;
            state.messageSaved = '';

        },
        updateNote: ( state, action) => { //payload: note
            state.isSaving =false;
            state.notes = state.notes.map( note => {

                // Comprobamos si nuestro id de la nota es la misma que se nos ha enviado
                // Si encontramos una nota dentro del Array que coincida con el id de la nueva nota devolvemos la nota que 
                // recibimos del payload en lugar de la nota del Array
                if( note.id === action.payload.id ){
                    return action.payload;
                }   

                // Vamos devolviendo cada nota asi formando un nuevo array 
                return note;
            });

            state.messageSaved = `${ action.payload.title }, Actualizada correctamente`;


        },
        setPhotosToActiveNote: (state, action) => {
            state.active.imageUrls = [ ...state.active.imageUrls, ...action.payload ];
            state.isSaving =false;

        },
        clearNotesLogout: ( state ) => {
            state.isSaving = false;
            state.messageSaved = '';
            state.notes = [];
            state.active = null;
        },

        deleteNoteById: ( state, action ) => {
            state.active = null;
            // Filtramos entre los IDS y devolvemos el array de notas expecto por el cual cumpla con la condicion
            state.notes = state.notes.filter( note => note.id !== action.payload );

        },

    }
});


// Action creators are generated for each case reducer function
export const { 
    addNewEmptyNote,
    setActiveNote,
    setNotes,
    setSaving,
    updateNote,
    deleteNoteById,
    savingNewNote,
    setPhotosToActiveNote,
    clearNotesLogout,
} = journalSlice.actions;