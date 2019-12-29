import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


export class EmpresaService {


  uri = 'http://localhost:8000/api';


  constructor(private http: HttpClient) {}

  addEmpresa(nome, codigo): Observable<any> {

    const objEmpresa = {
      nome,
      codigo
    };

    console.log(objEmpresa);
    return this.http.post(`${this.uri}/empresas`, objEmpresa);

  }


  getEmpresas(): Observable<any>  {
    return this.http.get(`${this.uri}/empresas`);
  }

  deleteEmpresa(id): Observable<any> {
   return this.http.delete(`${this.uri}/empresas/${id}`);
  }

  editEmpresa(id, newEmpresa): Observable<any> {
  return this.http.put(`${this.uri}/empresas/${id}`, newEmpresa);
  }




}
