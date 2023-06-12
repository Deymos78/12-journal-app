import { Navigate, Route, Routes } from 'react-router-dom'
import { LoginPage, RegisterPage } from '../pages'


export const AuthRoutes = () => {
  return (
    // Aqui creamos las rutas del apartado de Autenticacion
    <Routes>
        {/* Encapsulamos las rutas dentro de Routes y asignamos la ruta que va a tener cada componente  */}
        <Route path="login" element={<LoginPage/>}  />
        <Route path="register" element={<RegisterPage/>}  />

        {/* En el caso de que no estemos ni en login ni register queremos redireccionar al usuario al login */}
        <Route path='/*' element={<Navigate to="/auth/login" />} />
    </Routes>
  )
}
