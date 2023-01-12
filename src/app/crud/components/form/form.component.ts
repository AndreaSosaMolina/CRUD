import { Component, Output } from '@angular/core';
import { User} from '../../interfaces/interfaces';
import { CrudService } from '../../services/crud-services.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


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
  user!: User 
  

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

   private emailPattern =/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/


  myForm: FormGroup = this.fb.group({
    id:           [''],
    name:         ['', [Validators.required, Validators.minLength(3)]],
    password:     ['', [Validators.required, Validators.minLength(6)]],
    passwordConfirm: ['', [Validators.required, Validators.minLength(6)]],
    email:        ['', [Validators.required, Validators.pattern(this.emailPattern)]],
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
     return this.myForm.controls[campo].errors && this.myForm.controls[campo].touched
  }

  
  addOrEdit(){
    const userForm = this.myForm.value
    const userID = this.myForm.value.id

    if(userID){
      this.crudService.updateUser(userForm)
        .subscribe( resp => {
          this.getUsers()
          this.myForm.reset()
        })
     
      
      
    } else {
      this.crudService.addUser(userForm)
        .subscribe( rep => {
          this.getUsers()
          this.myForm.reset()
        })
    }
  }

  editUser( user: User){      
     this.myForm.patchValue(user)
     
  }

  passConfirm(){
    const originPass = this.myForm.get('password')?.value
    const copyPass   = this.myForm.get('passwordConfirm')?.value

    if(originPass !== copyPass){
      return false

    } else {
      return true
    }
  }

}


