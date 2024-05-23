import { Injectable, inject } from '@angular/core';
import { HttpClient, } from '@angular/common/http';
import {Observable, catchError, firstValueFrom, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private httpClient = inject(HttpClient);
  private baseUrl = 'https://localhost:7116/api/Persons/';

  register(firstName: string, secondName: string, firstLastName: string, secondLastName: string, documentType: string, document: number, role: string, password: string, passwordRepeat: string): Observable<any>{
    const body = 
    {
      firstName,
      secondName,
      firstLastName,
      secondLastName,
      documentType,
      document,
      role,
      password,
      passwordRepeat
    };
    return this.httpClient.post<any>(`${this.baseUrl}Register`, body);
  }
  login(document: number, password: any ): Observable<any>{
    const body=
    {
      document,
      password
    };
      return this.httpClient.post<any>(`${this.baseUrl}login`, body);
  }
}
