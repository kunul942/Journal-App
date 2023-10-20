import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite"
import { FirebaseDB } from "../../firebase/config"


import { 
    addNewEmptyNote, 
    deleteNoteById, 
    savingNewNote, 
    setActiveNote, 
    setNotes, 
    setPhotosToActiveNote, 
    setSaving, 
    updatedNote 
} from "./journalSlice"

import { fileUpload, loadNotes } from "../../helpers"

//Crear una nueva nota
export const startNewNote = () =>{
    return async( dispatch, getState ) =>{
        
        //bloquear el botton de agregar cuando isSaving es true
        dispatch( savingNewNote() )

        // uid para grabar en firebase
        const { uid } = getState().auth
        
        //nueva nota
        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime(),
        }

        //referencia al DOCUMENTO de firebase
        const newDoc = doc( collection( FirebaseDB, `${ uid }/journal/notes`) )
        //grabar una nueva nota en firebase
        await setDoc( newDoc, newNote )

        //crear propiedad id a la nota
        newNote.id = newDoc.id
        
    

        // dispatch
        dispatch( addNewEmptyNote( newNote ) )
        dispatch( setActiveNote( newNote ) )
        

    }
}

//Cargar notas de Firestore
export const startLoadingNotes = () =>{
    return async( dispatch, getState ) =>{

        const { uid } = getState().auth
        if( !uid ) throw new Error('user uid does not exist')
        
        const setLoadNotes = await loadNotes( uid )
        
        dispatch( setNotes( setLoadNotes ) )
    }



}


//guardar nota
export const startSaveNote = () =>{
    return async( dispatch, getState ) =>{

        dispatch( setSaving() )

        const { uid } = getState().auth
        const { active:note } = getState().journal

        //remover id de la nota activa para no crearla de nuevo
        const noteToFireStore = { ...note }
        delete noteToFireStore.id

        //referencia al documento que quiero actualizar
        const docRef = doc( FirebaseDB, `${ uid }/journal/notes/${ note.id }` )
        //forma de agregarlo a la base de datos
        await setDoc( docRef, noteToFireStore, { merge: true } )

        //actualizar la nota guardada
        dispatch( updatedNote( note ) )

    }
}

//subir imagenes a cloudinary
export const startUploadingFiles = ( files = [] ) =>{
    return async( dispatch ) =>{

        dispatch( setSaving() )

        // await fileUpload( files[0] )

        // Multiples peticiones de forma simultanea
        const fileUploadPromises = []
        for (const file of files ) {
            fileUploadPromises.push( fileUpload( file ) )
        }

        const photosUrls = await Promise.all( fileUploadPromises )
        
        dispatch( setPhotosToActiveNote( photosUrls ) )
    }   
}


//eliminar una nota
export const startDeletingNote = () =>{
    return async( dispatch, getState ) =>{

        const { uid } = getState().auth
        const { active:note } = getState().journal

        const docRef = doc( FirebaseDB, `${ uid }/journal/notes/${ note.id }`)
        //eliminar
        await deleteDoc( docRef )

        //limpiar de store
        dispatch( deleteNoteById(note.id) )
    }
}