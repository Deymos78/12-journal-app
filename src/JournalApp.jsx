import { AppRouter } from "./router/AppRouter"
import { AppTheme } from "./theme"

// Este es el Componente mas alto de la aplicacion donde se colocara lla configuracion del tema
export const JournalApp = () => {
  return (
    <AppTheme>
        <AppRouter/>
    </AppTheme>
  )
}
