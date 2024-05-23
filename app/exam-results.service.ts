import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExamResultsService {
  private httpClient = inject(HttpClient);
  private baseUrl = 'https://localhost:7116/api/ExamResult';

  //metodo para crear una historia clinica
  RegisterExamResults(ExamId: number, MedicalRecordId: number, ExamType: string, ExamDate: Date, Results: string, Observations: string ): Observable<any>{
    const body = 
    {
      ExamId,
      MedicalRecordId,
      ExamType,
      ExamDate,
      Results,
      Observations
    };
    return this.httpClient.post<any>(`${this.baseUrl}`, body)
  }

  //metodo para actualizar una Historia Clinica
  UpDateExamResults(ExamId: number, MedicalRecordId: number, ExamType: string, ExamDate: Date, Results: string, Observations: string ): Observable<any>{
    const body = 
    {
      ExamId,
      MedicalRecordId,
      ExamType,
      ExamDate,
      Results,
      Observations
    };
    return this.httpClient.put<any>(`${this.baseUrl}`, body)
  }
}
