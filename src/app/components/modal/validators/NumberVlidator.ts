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
}




