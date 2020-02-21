import { AbstractControl, ValidationErrors } from '@angular/forms';

export class PasswordValidators{
    static oldPasswordShouldMatch(control: AbstractControl) : Promise<ValidationErrors | null>{
        return new Promise((resolve)=>{
            
                if( control.value !== '1234' ){
                    resolve({ oldPasswordDoesNotMatch: true}) ;
                }
        });
    }

    static passwordsShouldMatch(control: AbstractControl){
        let newPassword = control.get('newPassword');
        let confirmPassword = control.get('confirmPassword');
        if(newPassword.value !== confirmPassword.value)
            return {passwordsDontMatch: true};
        return null;    
    }
}