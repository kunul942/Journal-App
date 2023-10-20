//providers de autenticacion
import { 
    createUserWithEmailAndPassword, 
    GoogleAuthProvider, 
    signInWithEmailAndPassword, 
    signInWithPopup,
    updateProfile 
} from "firebase/auth";
    
import { FirebaseAuth } from "./config";

//provider
const googleProvider = new GoogleAuthProvider()

//google auth
export const signInWithGoogle = async () =>{
    
    try {

        const result = await signInWithPopup( FirebaseAuth, googleProvider )
        // const credentials = GoogleAuthProvider.credentialFromResult( result ) - credentials

        const { displayName, email, phoneURL, uid  } = result.user
        
        return {
            ok: true,
            //User info
            displayName, email, phoneURL, uid
        }
        

    } catch (error) {
    
        const errorCode = error.code
        const errorMessage = error.message

        return {
            ok: false,
            errorMessage
        }

    }



}

//create user
export const registerUserWithEmailPassword = async ({ email, password, displayName }) =>{

    try {

        const resp = await createUserWithEmailAndPassword(FirebaseAuth, email, password)
        const { uid, photoURL } = resp.user
        
        await updateProfile( FirebaseAuth.currentUser, { displayName })
        
        return {
            ok: true,
            uid, photoURL, email, displayName
        }


    } catch (error) {
        return { ok: false, errorMessage: error.message }
    }
}


//login user 
export const loginWithEmailPassword = async ({ email, password }) =>{

    try {
        const resp = await signInWithEmailAndPassword( FirebaseAuth, email, password )
        const { uid, photoURL, displayName } = resp.user

        return {
            ok: true,
            uid, photoURL, displayName
        }

    } catch (error) {
     
        return {
            ok: false,
            errorMessage: error.message
        }
    }
}


export const logoutFirebase = async () =>{
    return await FirebaseAuth.signOut()
}   
