import { useEffect, useMemo, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"

import { DeleteOutline, SaveOutlined, UploadOutlined } from "@mui/icons-material"
import { Alert, AlertTitle, Button, Grid, IconButton, TextField, Typography } from "@mui/material"
import Swal from "sweetalert2"
import 'sweetalert2/dist/sweetalert2.css'

import { useForm } from "../../hooks/useForm"
import { ImageGallery } from "../components/ImageGallery"

import { setActiveNote } from "../../store/journal/journalSlice"

import {  startDeletingNote, startSaveNote, startUploadingFiles } from "../../store/journal/thunks"


export const NoteView = () => {


    const dispatch = useDispatch()

    //Activar una nota para su edicion
    const { active: note, messageSaved, isSaving } = useSelector( state=> state.journal )
    const { body, title, date, formState, onInputChange } = useForm( note )

    const dateString = useMemo(() =>{
        const newDate = new Date( date )
        return newDate.toUTCString()

    }, [date])

    //simular click para el icono de seleccionar archivos
    const fileInputRef = useRef()

    //actualizar nota actual
    useEffect(() => {
        dispatch( setActiveNote(formState) )
    }, [formState])

    //mandar mensaje de "Actualizado correctamente" - sweetalert2
    useEffect(() => {
        if( messageSaved.length > 0 ){
            Swal.fire('Note updated', messageSaved, 'success')
        }
    }, [messageSaved])
    

    //guardar la nota actual
    const onSaveNote = () =>{
        dispatch( startSaveNote() )
    }
    
    
    //seleccionar archivos
    const onFileInputChange = ({ target }) =>{
        if( target.files === 0 ) return
        
        console.log('subiendo archivos')
        dispatch( startUploadingFiles( target.files ) )
    }

    //borrar nota
    const onDelete = () =>{
        dispatch( startDeletingNote() )
    }

  return (
    <Grid 
        container 
        direction="row" 
        justifyContent="space-between"
        alignContent="center" 
        sc={{ mb: 1 }}
        className="animate__animated animate__fadeIn animate__faster"
    >
        <Grid item>
            <Typography fontSize={ 39 } fontWeight="light">{ dateString }</Typography>
        </Grid>
        <Grid item>

            {/* seleccionar archivos */}
            <input
                type="file"
                multiple
                ref={ fileInputRef }
                onChange={ onFileInputChange }
                style={{ display: 'none' }}
            />
            {/* icono para selecionar archivos */}
            <IconButton
                color="primary"
                disabled= { isSaving }
                onClick= { ()=> fileInputRef.current.click() 
                
                }
            >
                <UploadOutlined />
            </IconButton>

            <Button
                disabled={ isSaving }
                onClick = { onSaveNote } 
                color="primary" 
                sx={{ p: 2 }}
            >
                <SaveOutlined sx={{ fontSize: 30, mr: 1 }}/>
                Save
            </Button> 
        </Grid>

        <Grid container>
            <TextField 
                type="text"
                variant="filled"
                fullWidth
                placeholder="Add Title"
                label="Title"
                sx={{ border: "none", mb: 1 }}
                name="title"
                value={ title }
                onChange={ onInputChange }
            />
            
            <TextField 
                type="text"
                variant="filled"
                fullWidth
                multiline
                placeholder="What happened today?"
                minRows={ 5 }
                name="body"
                value={ body }
                onChange={ onInputChange }
            />
        </Grid>


        {/* borrar nota */}
        <Grid container justifyContent='end' >
            <Button
                onClick={ onDelete }
                sx={{ mt:2 }}
                color="error"
            >
                <DeleteOutline />
                Delete
            </Button>
        </Grid>
        
        <Grid
            container
            spacing={ 0 }
            direction="column"
            alignItems="center"
            justifyContent="center"
            display={ note.imageUrls?.length === 0 ? '': 'none' }
        >
            <Alert severity="error">
                    Error to upload <strong>try again!</strong>
            </Alert>
        </Grid>  

        {/* Image gallery */}
        <ImageGallery images={ note.imageUrls } />

    </Grid>
  )
}
