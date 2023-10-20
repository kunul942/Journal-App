//thunks son acciones que pueden hacer dispatch que tienen una tarea asincrona

import { 
    loginWithEmailPassword, 
    registerUserWithEmailPassword, 
    signInWithGoogle, 
    logoutFirebase
 } from "../../firebase/providers"
 
import { clearNotesLogout } from "../journal/journalSlice"

import { checkingCredentials, login, logout } from "./authSlice"

//auth checking
export const checkingAuth = () =>{
    return async( dispatch ) =>{

        dispatch( checkingCredentials() )

    }
}

//google signIn
export const startGoogleSignIn = () =>{
    return async( dispatch ) =>{

        dispatch( checkingCredentials() )

        const result = await signInWithGoogle()
        //cerrar el popup
        if ( !result.ok ) return dispatch( logout( result.errorMessage ) )

        dispatch( login( result ) )


    }
    
}


//create user 
export const startCreatingUserWithEmailPassword = ({ email, password, displayName }) =>{
    return async ( dispatch ) =>{

        dispatch( checkingCredentials() )

        const result = await registerUserWithEmailPassword({ email, password, displayName })

        //logout
        if( !result.ok ) return dispatch( logout(result) )

        //login
        dispatch( login( result ))

    }

}


export const startLoginWithEmailPassword = ({ email, password }) =>{
    return async ( dispatch ) =>{

        dispatch( checkingCredentials() )

        const result = await loginWithEmailPassword({ email, password })

         //logout
        if( !result.ok ) return dispatch( logout( result ) )

        //login
        dispatch( login( result ) )

    }

}



export const startLogout = () =>{
    return async( dispatch ) =>{

        await logoutFirebase()

        //limpiar notas al cerrar sesion
        dispatch( clearNotesLogout() )
        //hacer el logout
        dispatch( logout() )

    }


}

