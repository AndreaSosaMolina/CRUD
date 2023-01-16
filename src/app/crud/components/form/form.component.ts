import { Component } from '@angular/core';
import { User} from '../../interfaces/interfaces';
import { CrudService } from '../../services/crud-services.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { emailPattern, namePatter } from '../../validators/validator';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styles:[
    ` form{
      padding: 20px;
      background-color: #cfe2ff
    }
    `
  ]
  
})
export class FormComponent {

  users: User[]= [];
  buttonAction: boolean = false;
  
  

  getUsers(){
    this.crudService.getUsers()
      .subscribe( users => this.users = users)
  }

  countries: string[] = ['India', 'Bahamas','Mexico', 'Australia', 'Portugal', 'Chile', 'Guatemala'	]

  constructor(  private crudService: CrudService,
                private fb: FormBuilder){}


  ngOnInit(): void {
    this.getUsers();
  }


  myForm: FormGroup = this.fb.group({
    id:           [''],
    name:         ['', [Validators.required,Validators.pattern(namePatter), Validators.minLength(3)]],
    password:     ['', [Validators.required, Validators.minLength(6)]],
    passwordConfirm: ['', [Validators.required, Validators.minLength(6)]],
    email:        ['', [Validators.required, Validators.pattern(emailPattern)]],
    subscribed:   [false],
    country:      ['', Validators.required],
    city:         ['', [Validators.required]]
    
  })

  userUpdate(user: User){
    this.myForm.setValue({
      id: user.id,
      name: user.name,
      password: user.password,
      passwordConfirm: user.passwordConfirm,
      email: user.email,
      subscribed: user.subscribed,
      country: user.country,
      city: user.city,
      
    })
    this.buttonAction = true;
  }

  inputValid( campo: string){
     return this.myForm.controls[campo].errors && 
            this.myForm.controls[campo].touched
  }

  
  addOrEdit(){
    const userForm = this.myForm.value
    const userID = this.myForm.value.id

    //Si viene con ID, se edita el usuario
    if(userID){
      this.crudService.updateUser(userForm)
        .subscribe( resp => {
          this.getUsers()
          this.myForm.reset()
        })
     
      
    // Se crea uno nuevo
    } else {
      this.crudService.addUser(userForm)
        .subscribe( rep => {
          this.getUsers()
          this.myForm.reset()
        })
    }
  }


  passConfirm(){
    const originalPass = this.myForm.get('password')?.value
    const copyPass   = this.myForm.get('passwordConfirm')?.value

    if(originalPass !== copyPass){
      return false

    } else {
      return true
    }
  }

}


