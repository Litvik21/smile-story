import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, of} from "rxjs";
import {GeneralInfo} from "../model/GeneralInfo";
import {Patient} from "../model/Patient";

@Injectable({providedIn: 'root'})
export class PatientService {
  private patientUrl = environment.urlPath + '/patient';
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };
  constructor(
    private http: HttpClient) {
  }

  addPatient(formData: FormData): Observable<any> {
    return this.http.post<any>(`${this.patientUrl}/add`, formData, this.httpOptions).pipe(
      catchError(this.handleError<any>('addPatient'))
    );
  }

  getPatients(): Observable<Patient[]> {
    const url = `${this.patientUrl}/all`;
    return this.http.get<Patient[]>(url, this.httpOptions).pipe(
      catchError(this.handleError<Patient[]>('getPatients', []))
    );
  }

  getPatient(id: number): Observable<Patient> {
    const url = `${this.patientUrl}/${id}`;
    return this.http.get<Patient>(url, this.httpOptions).pipe(
      catchError(this.handleError<Patient>(`getPatient id=${id}`))
    );
  }

  findByFirstName(firstName: string): Observable<Patient[]> {
    const url = `${this.patientUrl}/name?name=${firstName}`;
    return this.http.get<Patient[]>(url, this.httpOptions).pipe(
      catchError(this.handleError<Patient[]>('findByFirstName', []))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error);

      return of(result as T);
    };
  }
}
