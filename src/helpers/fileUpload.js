

export const fileUpload = async( file ) => {
    // Comprobamos que recibimos los datos para subir algo dentro del storage
    if( !file ) throw new Error('No tenemos ninguna archivo a subir'); 

    // Tenemos que tener la referencia a donde vamos a realizar la solicitud
    const cloudUrl = 'https://api.cloudinary.com/v1_1/dkvz4m4wm/upload';

    // De esta forma construiremos el Body de la solicitud como hemos hecho en el postman
    const formData = new FormData();
    // Construimos el cuerpo de la solicitud
    formData.append('upload_preset', 'react-journal');
    formData.append('file', file);

    // AHORA MONTAREMOS LA SOLICITUD ASINCRONA
    try {       

        // Contruimos la solicitud a nuestra base de datos para introducir la imagen
        const resp = await fetch( cloudUrl,{
            method: 'POST',
            body: formData
        } );
        
        if( !resp.ok ) throw new Error('No se pudo subir imagen');
        
        // Imprimimos
        const cloudResp = await resp.json();

        return cloudResp.secure_url;

    } catch (error) {
        console.log(error);
        throw new Error( error.message );
        
    }
}