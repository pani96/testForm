import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup , Validator, Validators, FormControl, AbstractControl} from '@angular/forms';
import { User } from '../user';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
 
  formGroup: FormGroup;
  @Output() change = new EventEmitter();
  constructor(
    private fb: FormBuilder
  ) { 

  }

  ngOnInit() {
    this.formGroup = this.fb.group({
      firstName: this.fb.control('',[Validators.required, Validators.minLength(2)]),
      lastName: ['',[Validators.required, Validators.minLength(2)]],
      email: ['',[this.emailValidator]],
      age: [22,[Validators.min(0),Validators.max(99)]]
    })
  }
  emailValidator(control: AbstractControl){
    const value: string = control.value;
    if(value && value.includes('@')){
      return null;
    }
    return {
      email: true
      /*email: {
        acturl: value,
        expect: 'email@example'
      }*/
    }
  }
  onSubmit(form: FormGroup){
    console.log(form);
    /*const value = form.value;
    console.log(value);*/
    /*const{firstName, lastName} = form.value;
    console.log(firstName,lastName);*/
   
    /*if(!(firstName && firstName.length >= 3)){
      alert("hello");
    }*/
    console.log(form.valid,form.invalid);
    console.log((<FormControl>form.get('firstName')).errors);
    if(form.valid)
    {const {
      firstName,
      lastName,
      email,
      age} = form.value;
    const user = new User(
      firstName,
      lastName,
      email,
      age);
      this.change.emit(user);
    console.log(user);}
    else{
      ['firstName',
      'lastName',
      'email',
      'age'
      ].forEach((key: string)=>{
        console.log(key);
        console.log(form.get(key).touched);
        form.get(key).markAsTouched();
        console.log(form.get(key).touched);
      })

    }
    
  }
}
