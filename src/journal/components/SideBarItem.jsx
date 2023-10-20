import { useMemo } from "react"
import { useDispatch } from "react-redux"

import { Grid, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import { TurnedInNot } from "@mui/icons-material"

import { setActiveNote } from "../../store/journal/journalSlice"





export const SideBarItem = ({ title ='', body, id, date, imageUrls }) => {
    
    
    const dispatch = useDispatch()

    //activar al hacer click en la nota
    const onClickNote = () =>{
        dispatch( setActiveNote({ title, body, id, date, imageUrls }) )
    }
    

    // evitar el titulo de la nota que sea muy largo
    const newTitle = useMemo( ()=>{
        return title.length > 17
            ? title.substring(0,17) + '...'
            : title
    }, [ title ])

    
    return(
        //mostrar las notas en el menu lateral
        <ListItem disablePadding>
            <ListItemButton onClick={ onClickNote } >
                <ListItemIcon>
                    <TurnedInNot />
                </ListItemIcon>
                <Grid container>
                    <ListItemText primary={ newTitle } />
                    <ListItemText secondary={ body } />
                </Grid>
            </ListItemButton>
        </ListItem>
    )

}
