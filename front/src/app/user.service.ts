import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import User from './User';

@Injectable({
  providedIn: 'root'
})


export class UserService {


  uri = 'http://localhost:8000/api';


  constructor(private http: HttpClient) {}

    addUser(nome, cargo, codigo, senha): Observable<any> {

      const objUser = {
        nome,
        cargo,
        codigo,
        senha
      };

      console.log(objUser);
      return this.http.post(`${this.uri}/users`, objUser);
    }

    getUsers(): Observable<any> {
      return this.http.get(`${this.uri}/users`);
    }

    deleteUser(id): Observable<any> {
      return this.http.delete(`${this.uri}/users/${id}`);
    }

    editUser(id, newUser): Observable<any> {
     return this.http.put(`${this.uri}/users/${id}`, newUser);
    }



}

