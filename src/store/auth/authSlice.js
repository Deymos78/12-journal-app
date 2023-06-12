import { createSlice } from '@reduxjs/toolkit';


// Este es nuestro Reducer en el cual estan definidos nuestras propiedades y acciones
export const authSlice = createSlice({
    name: 'auth',
    // Propiedades del reducer
    initialState: {
        status: 'checking', // 'checking' 'not-authenticated', 'authenticated'  
        uid: null,
        email: null,
        displayName: null,
        photoURL: null,
        errorMessage: null,
    },
    // Acciones del reducer
    reducers: {
        login: ( state, {payload} ) => {
            state.status= 'authenticated'; // 'checking' 'not-authenticated', 'authenticated'  
            state.uid= payload.uid;
            state.email= payload.email;
            state.displayName= payload.displayName;
            state.photoURL= payload.photoURL;
            state.errorMessage= null; 

        },
        logout: (state, { payload } ) => {
            state.status= 'not-authenticated'; // 'checking' 'not-authenticated', 'authenticated'  
            state.uid= null;
            state.email= null;
            state.displayName= null;
            state.photoURL= null;
            state.errorMessage= payload?.errorMessage;

        },
        checkingCredentials: (state) => {
            state.status = 'checking';
            
        }   
    }
});


// Action creators are generated for each case reducer function
// Los creadores de acciones se generan por cada funcino de reducer
export const { login, logout, checkingCredentials } = authSlice.actions;