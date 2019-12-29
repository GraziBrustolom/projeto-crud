import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


export class WorkLogService {


  uri = 'http://localhost:8000/api';


  constructor(private http: HttpClient) {}

  addWorkLog(nome, codigo, empresa, tempo): Observable<any> {

    const objWorkLog = {
      nome,
      codigo,
      empresa,
      tempo
    };

    return this.http.post(`${this.uri}/worklogs`, objWorkLog);

  }


  getWorkLogs(): Observable<any> {
    return this.http.get(`${this.uri}/worklogs`);
  }

  deleteWorkLog(id): Observable<any> {
    return this.http.delete(`${this.uri}/worklogs/${id}`);
  }

  editWorkLog(id, newWorkLog): Observable<any> {
    return this.http.put(`${this.uri}/worklogs/${id}`, newWorkLog);
  }



}

