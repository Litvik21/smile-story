import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, of} from "rxjs";
import {GeneralInfo} from "../model/GeneralInfo";

@Injectable({providedIn: 'root'})
export class GeneralInfoService {
  private url = environment.urlPath + '/patient/general-info';
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };
  constructor(
    private http: HttpClient) {
  }

  addGeneralInfo(formData: FormData): Observable<any> {
    return this.http.post<any>(`${this.url}/add`, formData, this.httpOptions).pipe(
      catchError(this.handleError<any>('addGeneralInfo'))
    );
  }

  updateGeneralInfo(data: any, id: number): Observable<any> {
    const url = `${this.url}/update/${id}`;
    return this.http.put<any>(url, data, this.httpOptions).pipe(
      catchError(this.handleError<any>('updateGeneralInfo'))
    );
  }

  getGeneralInfo(id: number): Observable<GeneralInfo> {
    const url = `${this.url}/${id}`;
    return this.http.get<GeneralInfo>(url, this.httpOptions).pipe(
      catchError(this.handleError<GeneralInfo>(`getGeneralInfo id=${id}`))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error);

      return of(result as T);
    };
  }
}
