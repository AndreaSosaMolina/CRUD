import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../interfaces/interfaces';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CrudService{

  private baseUrl: string = environment.baseUrl

  constructor( private http: HttpClient) { }


  //CREATE
  addUser( user: User): Observable<User>{
    return this.http.post<User>(`${this.baseUrl}/crud`, user)
  }

  //READ
  getUsers(): Observable<User[]>{
    return this.http.get<User[]>(`${this.baseUrl}/crud`)
  }

  //DELETE
  deleteUser( user: User): Observable<User>{
    return this.http.delete<User>(`${this.baseUrl}/crud/${user.id}`)

  }

  getUserId(id: string): Observable<User>{
    return this.http.get<User>(`${this.baseUrl}/crud/${id}`)
  }

  //UPDATE
  updateUser( user: User): Observable<User>{
    return this.http.put<User>(`${this.baseUrl}/crud/${user.id}`, user)
  }

  
}
