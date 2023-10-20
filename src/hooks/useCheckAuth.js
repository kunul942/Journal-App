import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { onAuthStateChanged } from "firebase/auth"

import { FirebaseAuth } from "../firebase/config"
import { login, logout } from "../store/auth/authSlice"
import { startLoadingNotes } from "../store/journal/thunks"

export const useCheckAuth = () => {

    //Mantener estado de la autenticacion al recargar
    const { status } = useSelector( state => state.auth )
    const dispatch = useDispatch()
    
    useEffect(() => {
        
        //observable
        onAuthStateChanged( FirebaseAuth, async ( user )=>{
            if( !user ) return dispatch( logout() )
            
            const { uid, email, displayName, photoURL } = user
            dispatch( login({ uid, email, displayName, photoURL }) )
            dispatch( startLoadingNotes() )
        })

    }, [])


    return status

}
