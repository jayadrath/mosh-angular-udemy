import { Component } from '@angular/core';
import {FormGroup, FormControl, Validators } from '@angular/forms';
import { UsernameValidators } from './username.validators';

@Component({
  selector: 'signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css']
})
export class SignupFormComponent {
  form : FormGroup = new FormGroup({
    account: new FormGroup({
      username: new FormControl('',
    [
      Validators.required,
      Validators.minLength(3),
      UsernameValidators.cannotContainSpace
    ], 
    UsernameValidators.shouldBeUnique),
    password: new FormControl('',Validators.required)
    }),
    
  });
  login(){
    /* let isValid = authService.login(this.form.value);
    if(!isValid)
    {
      this.form.setErrors({
        invalidLogin : true
      })
    } */
    this.form.setErrors({
      invalidLogin : true
    });
  }

  get username(){
    return this.form.get('account.username');
  }
}
