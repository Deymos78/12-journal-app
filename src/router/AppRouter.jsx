import { Navigate, Route, Routes } from "react-router-dom"
import { AuthRoutes } from "../auth/routes/AuthRoutes"
import { JournalRoutes } from "../journal/routes/JournalRoutes"
import { CheckingAuth } from "../ui"
import { useCheckAuth } from "../hooks/useCheckAuth"

// El AppRouter es la configuracion del Router para poder hacer las correspondientes configuraciones de rutas
export const AppRouter = () => {


  const status  = useCheckAuth();

  // Comprobamos el estado y si cumple con la condicion entonces iremos al componente correspondiente
  if( status === 'checking' ){
    return <CheckingAuth/>
  }

  return ( 
    // Aqui estaran las rutas Principales de nuestra aplicacion 
    <Routes>

      {
        (status === 'authenticated')
        ? <Route path="/*" element={<JournalRoutes/>}/>
        : <Route path="/auth/*" element={ <AuthRoutes/>}  />
      }

      <Route path='/*' element={ <Navigate to='/auth/login' /> } />

        {/* Login y Registro */}
        {/* <Route path="/auth/*" element={ <AuthRoutes/>}  /> */}

        {/* JournalApp */}
        {/* // <Route path="/*" element={<JournalRoutes/>}/> */}

    </Routes>

  )
}
