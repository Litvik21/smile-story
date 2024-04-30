import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, of} from "rxjs";
import {GeneralInfo} from "../model/GeneralInfo";
import {Patient} from "../model/Patient";
import {WishesMedication} from "../model/WishesMedication";

@Injectable({providedIn: 'root'})
export class WishesMedicationService {
  private medicationUrl = environment.urlPath + '/patient/medication';
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };
  constructor(
    private http: HttpClient) {
  }

  addWishesMedication(formData: FormData): Observable<any> {
    console.log(formData)
    return this.http.post<any>(`${this.medicationUrl}/add`, formData, this.httpOptions).pipe(
      catchError(this.handleError<any>('addPatient'))
    );
  }

  getMedications(): Observable<WishesMedication[]> {
    const url = `${this.medicationUrl}/all`;
    return this.http.get<WishesMedication[]>(url, this.httpOptions).pipe(
      catchError(this.handleError<WishesMedication[]>('getPatients', []))
    );
  }

  getWishesMedication(id: number): Observable<WishesMedication> {
    const url = `${this.medicationUrl}/${id}`;
    return this.http.get<WishesMedication>(url, this.httpOptions).pipe(
      catchError(this.handleError<WishesMedication>(`getWishesMedication id=${id}`))
    );
  }

  findByFirstName(firstName: string): Observable<Patient[]> {
    const url = `${this.medicationUrl}/name?name=${firstName}`;
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
