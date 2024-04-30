import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, of} from "rxjs";
import {GeneralInfo} from "../model/GeneralInfo";
import {Patient} from "../model/Patient";
import {Photo} from "../model/Photo";

@Injectable({providedIn: 'root'})
export class PhotoService {
  private photoUrl = environment.urlPath + '/patient/photo';
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };
  constructor(
    private http: HttpClient) {
  }

  addPhoto(formData: FormData): Observable<any> {
    const headers = new HttpHeaders();
    return this.http.post<any>(`${this.photoUrl}/add`, formData, { headers }).pipe(
      catchError(this.handleError<any>('addPhoto'))
    );
  }

  getPhotos(): Observable<Photo[]> {
    const url = `${this.photoUrl}/all`;
    return this.http.get<Photo[]>(url, this.httpOptions).pipe(
      catchError(this.handleError<Photo[]>('getPhotos', []))
    );
  }

  getPhoto(id: number): Observable<Photo> {
    const url = `${this.photoUrl}/${id}`;
    return this.http.get<Photo>(url, this.httpOptions).pipe(
      catchError(this.handleError<Photo>(`getPhoto id=${id}`))
    );
  }

  findByFirstName(firstName: string): Observable<Patient[]> {
    const url = `${this.photoUrl}/name?name=${firstName}`;
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
