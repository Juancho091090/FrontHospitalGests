import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MedicalNotesService {
  private httpClient = inject(HttpClient);
  private baseUrl = 'https://localhost:7116/api/MedicalNotes';

  //metodo para crear una historia clinica
  RegisterMedicalNotes(NoteId: number, DateNote: Date, NoteType: string, NoteName: string, MedicalRecordId: number, ): Observable<any>{
    const body = 
    {
      NoteId,
      DateNote,
      NoteType,
      NoteName,
      MedicalRecordId
    };
    return this.httpClient.post<any>(`${this.baseUrl}`, body)
  }

  //metodo para actualizar una Historia Clinica
  UpDateMedicalNotes(NoteId: number, DateNote: Date, NoteType: string, NoteName: string, MedicalRecordId: number,): Observable<any>{
    const body = 
    {
      NoteId,
      DateNote,
      NoteType,
      NoteName,
      MedicalRecordId
    };
    return this.httpClient.put<any>(`${this.baseUrl}`, body)
  }
}
