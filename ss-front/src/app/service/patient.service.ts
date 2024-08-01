import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, of} from "rxjs";
import {Patient} from "../model/Patient";

@Injectable({providedIn: 'root'})
export class PatientService {
  private url = environment.urlPath + '/patient';
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };
  constructor(
    private http: HttpClient) {
  }

  addPatient(formData: FormData): Observable<any> {
    return this.http.post<any>(`${this.url}/add`, formData, this.httpOptions).pipe(
      catchError(this.handleError<any>('addPatient'))
    );
  }

  getPatients(): Observable<Patient[]> {
    const url = `${this.url}/all`;
    return this.http.get<Patient[]>(url, this.httpOptions).pipe(
      catchError(this.handleError<Patient[]>('getPatients', []))
    );
  }

  getPatient(id: number): Observable<Patient> {
    const url = `${this.url}/${id}`;
    console.log('URL:', url)
    return this.http.get<Patient>(url, this.httpOptions).pipe(
      catchError(this.handleError<Patient>(`getPatient id=${id}`))
    );
  }

  removePatient(id: number): Observable<Patient> {
    const url = `${this.url}/delete/${id}`;
    console.log('Patient URL:', url)
    return this.http.delete<Patient>(url, this.httpOptions).pipe(
      catchError(this.handleError<Patient>(`removePatient id=${id}`))
    );
  }

  getPatientPhotoPeriods(id: number): Observable<any> {
    const url = `${this.url}/all-periods/${id}`;
    return this.http.get<any>(url, this.httpOptions).pipe(
      catchError(this.handleError<any>(`getPatientPhotoPeriods id=${id}`))
    );
  }

  findByFirstName(firstName: string): Observable<Patient[]> {
    const url = `${this.url}/name?name=${firstName}`;
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
