import { Navigate, Route, Routes } from "react-router-dom"
import { AuthRotes } from "../auth/routes/AuthRotes";

import { JournalRoutes } from "../journal/routes/JournalRoutes";
import { CheckingAuth } from "../ui/components/CheckingAuth";
import { useCheckAuth } from "../hooks";

export const AppRouter = () => {

    //status-checking
    const status = useCheckAuth()
    
    if( status === 'checking' ){
        return <CheckingAuth />
    }
  
    return (

        <Routes>
                
        {/* proteccion de rutas */}
            {
                ( status === 'authenticated' )
                 ? <Route path="/*" element={ <JournalRoutes /> } />
                 : <Route path="/auth/*" element={ <AuthRotes /> } />
            }
            
        {/* ruta por defecto */}
            
            <Route path="/*" element={ <Navigate to="/auth/login" /> } />

        </Routes>
            

    )


}



{/* Login y Registro - anterior */}
            {/* <Route path="/auth/*" element={ <AuthRotes /> } /> */}

            {/* JournalApp - anterior */}
            {/* <Route path="/*" element={ <JournalRoutes /> } /> */}
