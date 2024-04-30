import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, of} from "rxjs";
import {GeneralInfo} from "../model/GeneralInfo";
import {Patient} from "../model/Patient";
import {Photo} from "../model/Photo";
import {Scan} from "../model/Scan";

@Injectable({providedIn: 'root'})
export class ScanSerivce {
  private scanUrl = environment.urlPath + '/patient/scan';
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };
  constructor(
    private http: HttpClient) {
  }

  addScan(formData: FormData): Observable<any> {
    return this.http.post<any>(`${this.scanUrl}/add`, formData, this.httpOptions).pipe(
      catchError(this.handleError<any>('addScan'))
    );
  }

  getScans(): Observable<Scan[]> {
    const url = `${this.scanUrl}/all`;
    return this.http.get<Scan[]>(url, this.httpOptions).pipe(
      catchError(this.handleError<Scan[]>('getScans', []))
    );
  }

  getScan(id: number): Observable<Scan> {
    const url = `${this.scanUrl}/${id}`;
    return this.http.get<Scan>(url, this.httpOptions).pipe(
      catchError(this.handleError<Scan>(`getScan id=${id}`))
    );
  }

  findByFirstName(firstName: string): Observable<Patient[]> {
    const url = `${this.scanUrl}/name?name=${firstName}`;
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
