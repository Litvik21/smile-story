import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, of} from "rxjs";
import {GeneralInfo} from "../model/GeneralInfo";
import {Patient} from "../model/Patient";
import {WishesMedication} from "../model/WishesMedication";

@Injectable({providedIn: 'root'})
export class WishesMedicationService {
  private url = environment.urlPath + '/patient/medication';
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };
  constructor(
    private http: HttpClient) {
  }

  addWishesMedication(formData: FormData): Observable<any> {
    console.log(formData)
    return this.http.post<any>(`${this.url}/add`, formData, this.httpOptions).pipe(
      catchError(this.handleError<any>('addPatient'))
    );
  }

  updateWishesMedication(data: any, id: number): Observable<any> {
    const url = `${this.url}/update/${id}`;
    return this.http.put<any>(url, data, this.httpOptions).pipe(
      catchError(this.handleError<any>('updateWishesMedication'))
    );
  }

  updateDescription(data: any, id: number): Observable<any> {
    console.log('Data: ' + data);
    const url = `${this.url}/update/desc/${id}`;
    console.log('URl: ' + url);
    return this.http.put<any>(url, data, this.httpOptions).pipe(
      catchError(this.handleError<any>('updateDescription'))
    );
  }

  getMedications(): Observable<WishesMedication[]> {
    const url = `${this.url}/all`;
    return this.http.get<WishesMedication[]>(url, this.httpOptions).pipe(
      catchError(this.handleError<WishesMedication[]>('getPatients', []))
    );
  }

  getWishesMedication(id: number): Observable<WishesMedication> {
    const url = `${this.url}/${id}`;
    return this.http.get<WishesMedication>(url, this.httpOptions).pipe(
      catchError(this.handleError<WishesMedication>(`getWishesMedication id=${id}`))
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
