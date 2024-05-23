import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DiagnosisService {

  private httpClient = inject(HttpClient);
  private baseUrl = 'https://localhost:7116/api/DiagnosisSecondary';

  //metodo para crear una historia clinica
  RegisterDiagnosis(DiagnosisId: number, DiagnosisName: string, DiagnosisDescription: string, DiagnosisType: string, MedicalRecordId: string): Observable<any>{
    const body = 
    {
      DiagnosisId,
      DiagnosisName,
      DiagnosisDescription,
      DiagnosisType,
      MedicalRecordId
    };
    return this.httpClient.post<any>(`${this.baseUrl}`, body)
  }

  //metodo para actualizar una Historia Clinica
  UpDateDiagnosis(DiagnosisId: number, DiagnosisName: string, DiagnosisDescription: string, DiagnosisType: string, MedicalRecordId: string): Observable<any>{
    const body = 
    {
      DiagnosisId,
      DiagnosisName,
      DiagnosisDescription,
      DiagnosisType,
      MedicalRecordId
    };
    return this.httpClient.put<any>(`${this.baseUrl}`, body)
  }
  
}
