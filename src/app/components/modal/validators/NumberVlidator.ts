import {  FormControl } from '@angular/forms';

function check_if_is_integer ( value ) {
    return ((parseFloat ( value ) == parseInt ( value )) && !isNaN ( value ));
}

export class NumberValidator {
    
    
    static validInteger(fc: FormControl){
        if( !check_if_is_integer (fc.value )){
            return {
                validInteger: true
            };
        } else {
            return null;
        }
    }
    
    
    // static integer = (): ( control: AbstractControl ) => void => {
    //     return ( control: AbstractControl )=> {
    //         check_if_is_integer ( control.value );
    //     };
    // };
    //     const error: ValidationErrors = { integer: true };
    //
    //     if ( control.value && control.value !== `${parseInt ( control.value, 10 )}` ) {
    //         control.setErrors ( error );
    //         return error;
    //     }
    //
    //     control.setErrors ( null );
    //     return null;
    // };
}




