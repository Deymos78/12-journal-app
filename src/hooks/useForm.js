import { useEffect, useMemo, useState } from 'react';

export const useForm = ( initialForm = {}, formValidations = {}  ) => {
  
    const [ formState, setFormState ] = useState( initialForm );
    const [formValidation, setformValidation] = useState({})

    useEffect(() => {
      
        createValidators();

    }, [formState]);

    // COLOCAR LOS VALORES CUANDO SELECCIONAMOS UNA NUEVA NOTA
    useEffect(() => {
        // Cuando cambie el initialForm entonces actualizamos los datos  y los sustituimos por los nuevos
        setFormState( initialForm );

    }, [ initialForm ])
    

    const isFormValid = useMemo( () =>  {

        for (const formValue of Object.keys( formValidation ) ) {
            
            if ( formValidation[formValue] !== null ) return false;
            
        }

        return true;
    }, [ formValidation ]);

    const onInputChange = ({ target }) => {
        const { name, value } = target;
        setFormState({
            ...formState,
            [ name ]: value
        });
    }

    const onResetForm = () => {
        setFormState( initialForm );
    }


    const createValidators = () => {

        const formCheckedValues = {};

        // El for of recorre las claves de un objeto

        for(const formField of Object.keys( formValidations )){

            // Ahora desestructuramos la clave del objeto en funcion del formFiel para obtener la funcion y el mensaje de error de cada clave
            // dentro del objeto
            const [ fn, errorMessage = 'Este campo es requerido'] = formValidations[formField];

            // En cada iteracion del objeto formValidations creamos otro objeto literal, que se creara con las propiedades mas el nombreValid
            // y con el resultado de la funcion pasandole como argumento el valor del formState y accediento a el a con la iteracion del
            // objeto formField

            formCheckedValues[`${ formField }Valid`] = fn( formState[ formField ] ) ? null : errorMessage ; 

        }
        setformValidation( formCheckedValues );

    }


    return {
        ...formState,
        formState,
        onInputChange,
        onResetForm,
        ...formValidation, 
        isFormValid
    }
}