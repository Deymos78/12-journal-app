## Configuracion de esta aplicacion

La creacion de la aplicacion sera la misma 
    npm create vite
    npm install

Ademas tambien se instalaran las dependencias de ract router dom

    npm install react-router-dom@6

Instalaremos las siguientes herramientas las cuales se pueden encontrar en el siguiente enlace https://mui.com/material-ui/getting-started/installation/

    npm install @mui/material @emotion/react @emotion/styled

en este caso usaremos la fuente de roboto para este proyecto 

~~~

 <link
    rel="stylesheet"
    href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
/>

~~~

Y los iconos los instalaremos como dependencia a traves de comando

    npm install @mui/icons-material


### Ahora continuaremos con la instalacion para usar el patron de diseño REDUX en este proyecto

**Empezaremos instalando Redux ToolKit y React-Redux**

    npm install @reduxjs/toolkit react-redux

**Tambien tendremos que crear el archivo store el cual sera el archivo donde se consumiran todos los reducers y sus acciones**


## El Backend de esta aplicacion sera el de FireBase

**Se tendra que configurar FireBase**

1. Primero se tendra que crear un nuevo proyecto.
2. En este caso no se activara la opcion de Google Analitycs.
3. Accedemos al apartado de WEb dentro del proyecto de FireBase que hemos creado
4. REgistramos nuestra aplicacion y no lo configuramos como hosting.
5. Procedemos a agregar el SDK de Firebase a nuestra aplicacion
6. Realizamos los cambios necesarios para nuestra aplicacion

**Tendremos instalar las dependencias de firebase**

    npm install firebase

## Se uso animate.css para darle animaciones a la carga del contenido css


## Configuracion de Base de Datos Firebase

1. Elegiremos como base de datos 'Firestore Database' en lugar de 'Realtime Database'
2. Damos en 'Crear base de datos'
3. Elegimos el modo de produccion
4. La ubicacion de la base de datos, seleccionaremos la que mas cerca este de nosotros
5. Hay que modificar las Reglas de Firebase Data Base para poder realizar cambios

## Para los mensajesde guardado exitoso usaremos sweetalert2

Instalaremos las dependencias de sweetalert2

    npm install sweetalert2