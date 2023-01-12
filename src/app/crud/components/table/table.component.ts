import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../../interfaces/interfaces';
import { CrudService } from '../../services/crud-services.service';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  
})
export class TableComponent   {

  

  @Input() users: User[] = []

  @Output() updateUser: EventEmitter<User> = new EventEmitter();

  constructor( private crudService: CrudService){
  }

  getUsers() {
    this.crudService.getUsers()
    .subscribe( users => this.users = users)
  }

  editarUser(user: User){
    
    this.updateUser.emit(user)
    
  }

  deleteUser(user: User){
    this.crudService.deleteUser(user)
      .subscribe( user => {
        this.getUsers()
      })
  }

}
