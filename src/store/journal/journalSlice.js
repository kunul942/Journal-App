import { createSlice } from '@reduxjs/toolkit';

export const journalSlice = createSlice({
    name: 'journal',
    initialState: {
        isSaving: false,
        messageSaved: '',
        notes: [],
        active: null,
    },
    reducers: {
        savingNewNote: ( state ) => {
            state.isSaving = true
    },
        addNewEmptyNote: ( state, action ) =>{
            state.notes.push( action.payload )
            state.isSaving = false
        },
        setActiveNote: ( state, action ) =>{
            state.active = action.payload
            state.messageSaved = ''
        },
        setNotes: ( state, action ) =>{
            state.notes = action.payload
        },
        setSaving: ( state ) =>{
            state.isSaving = true
            state.messageSaved = ''
        },
        updatedNote: ( state, { payload } ) =>{ //payload: note
            //actualizar la nota guardada
            state.isSaving = false
            state.notes = state.notes.map( note => {

                if( note.id === payload.id ){
                    return payload
                }

                return note
            })

            state.messageSaved = `${ payload.title }, updated correctly`
        },
        // Multiples peticiones de forma simultanea
        setPhotosToActiveNote: ( state, action ) =>{
            state.active.imageUrls = (state.active.imageUrls )? [ ...state.active.imageUrls, ...action.payload ]: []
            // state.active.imageUrls = [...state.active.imageUrls, ...action.payload]
            state.isSaving = false
        },
        clearNotesLogout: ( state ) => {
            state.isSaving = false
            state.messageSaved = ''
            state.notes = []
            state.active = null
        },
        deleteNoteById: ( state, action ) =>{
            state.active = null
            state.notes = state.notes.filter( note => note.id !== action.payload )
        }
    }
});


// Action creators are generated for each case reducer function
export const { 
    addNewEmptyNote,
    clearNotesLogout,
    deleteNoteById,
    savingNewNote, 
    setActiveNote,
    setNotes,
    setPhotosToActiveNote,
    setSaving,
    updatedNote,
} = journalSlice.actions;