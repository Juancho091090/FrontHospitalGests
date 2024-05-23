import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GetPersonsService {

  private httpClient = inject(HttpClient);
  private baseUrl = 'https://localhost:7116/api/Persons/';

  getPerson() {
    return this.httpClient.get<any>(`${this.baseUrl}`);
  }
}
