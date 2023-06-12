import { DeleteOutline, SaveOutlined, UploadOutlined } from "@mui/icons-material"
import { Button, Grid, IconButton, TextField, Typography } from "@mui/material" 
import { ImageGallery } from "../components"
import { useDispatch, useSelector } from "react-redux"
import { useForm } from "../../hooks";
import { useEffect, useMemo, useRef } from "react";
import { setActiveNote, startDeletingNote, startSaveNote, startUploadingFiles } from "../../store/journal/";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";


export const NoteView = () => {

    const dispatch = useDispatch()
    // Recuperamos la nota activa del estado del journal y le cambiaos la referencia a 'note' para que sea mas descriptiva
    const {active:note, messageSaved, isSaving } = useSelector(state => state.journal);

    const { formState, title, body, date, onInputChange } = useForm( note );

    const dateString = useMemo( () => {
        const newDate = new Date(date);
        return newDate.toUTCString();
    }, [ date ]);

    const fileInputReft = useRef()


    // Cada vez que hay un cambio en el formulario vamos a actualizar la nota activa con los nuevos cambios en el formulario
    useEffect(() => {
        
        dispatch( setActiveNote( formState ) );

    }, [ formState  ]);

    // El useEffect nos permitirar mostrar el aler solo cuando se haya modificado el mensaje de guardado
    useEffect(() => {
        if( messageSaved.length > 0 ){

            Swal.fire( 'Nota Actualizada', messageSaved, 'success' );
        }
    }, [ messageSaved ]);
    

    const onSaveNote = () =>{
        dispatch( startSaveNote() );
    }

    const onFileInputChange = ({ target }) => {

        if( target.files === 0 ) return;

        dispatch( startUploadingFiles( target.files ) );
    }

    const onDelete = () => {
        dispatch( startDeletingNote() );
    }




  return (
    <Grid
        className="animate__animated animate__fadeIn animate__faster"
        container direction='row' justifyContent='space-between' alignItems='center' sx={{ mb: 1}}>
        <Grid item>
            <Typography fontSize={ 39 } fontWeight='light'>{ dateString }</Typography>
        </Grid>

        <Grid item>

            <input
                type="file"
                multiple
                ref={ fileInputReft }
                onChange={ onFileInputChange }
                style={{ display: 'none' }}
            />
            <IconButton
                color="primary"
                disabled={ isSaving }
                onClick={ () => fileInputReft.current.click() }
            >
                <UploadOutlined/>
            </IconButton>

            <Button 
                onClick={ onSaveNote }
                disabled={ isSaving }
                color="primary" 
                sx={{ padding: 2}}
            >
                <SaveOutlined sx={{ fontSize: 38, mr:1}} />
                Guardar
            </Button>
        </Grid>
        <Grid container>
            <TextField
                type="text"
                variant="filled"
                fullWidth
                placeholder="Ingrese un Titulo"
                label="Titulo"
                sx={{ border: 'none', mb: 1}}
                name="title"
                value={ title }
                onChange={ onInputChange }
            />

            <TextField
                type="text"
                variant="filled"
                fullWidth
                multiline
                placeholder="¿Que sucedio en el dia de hoy?"
                minRows={5}
                name="body"
                value={ body }
                onChange={ onInputChange }
            />

        </Grid>

        <Grid container
            justifyContent='end'
        >
            <Button
                onClick={ onDelete }
                sx={{ mt: 2 }}
                color="error"

            >
                <DeleteOutline/>
                Borrar
            </Button>

        </Grid>

        {/* Image Gallery */}
        <ImageGallery images={ note.imageUrls } />

    </Grid>
  )
}
