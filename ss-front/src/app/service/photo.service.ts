import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, of} from "rxjs";
import {GeneralInfo} from "../model/GeneralInfo";
import {Patient} from "../model/Patient";
import {Photo} from "../model/Photo";

@Injectable({providedIn: 'root'})
export class PhotoService {
  private url = environment.urlPath + '/patient/photo';
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };
  constructor(
    private http: HttpClient) {
  }

  addPhoto(formData: FormData): Observable<any> {
    const headers = new HttpHeaders();
    return this.http.post<any>(`${this.url}/add`, formData, { headers }).pipe(
      catchError(this.handleError<any>('addPhoto'))
    );
  }

  addPhotoToList(formData: FormData): Observable<any> {
    const headers = new HttpHeaders();
    return this.http.post<any>(`${this.url}/add/to-list`, formData, { headers }).pipe(
      catchError(this.handleError<any>('addPhoto'))
    );
  }

  remove(id: number): Observable<Photo> {
    const url = `${this.url}/delete/${id}`;
    return this.http.delete<Photo>(url, this.httpOptions).pipe(
      catchError(this.handleError<Photo>(`remove photos id=${id}`))
    );
  }

  deleteOldPhotos(formData: FormData): Observable<any> {
    const url = `${this.url}/delete/old`;
    return this.http.post<any>(url, formData, this.httpOptions).pipe(
      catchError(this.handleError<any>('deleteOldPhotos', []))
    );
  }

  updatePhoto(data: any, id: number): Observable<any> {
    const headers = new HttpHeaders();
    const url = `${this.url}/update/${id}`;
    return this.http.put<any>(url, data, { headers }).pipe(
      catchError(this.handleError<any>('updatePhoto'))
    );
  }

  getPhotos(): Observable<Photo[]> {
    const url = `${this.url}/all`;
    return this.http.get<Photo[]>(url, this.httpOptions).pipe(
      catchError(this.handleError<Photo[]>('getPhotos', []))
    );
  }

  // getPhotosOfPatient(formData: FormData): Observable<Photo[]> {
  //   const url = `${this.photoUrl}/all/by-patient`;
  //   return this.http.get<Photo[]>(url, formData, this.httpOptions).pipe(
  //     catchError(this.handleError<Photo[]>('getPhotosOfPatient', []))
  //   );
  // }

  getPhoto(id: number): Observable<Photo> {
    const url = `${this.url}/${id}`;
    return this.http.get<Photo>(url, this.httpOptions).pipe(
      catchError(this.handleError<Photo>(`getPhoto id=${id}`))
    );
  }

  getPhotoForDelete(id: number): Observable<Photo> {
    const url = `${this.url}/get/for-delete/${id}`;
    return this.http.get<Photo>(url, this.httpOptions).pipe(
      catchError(this.handleError<Photo>(`getPhoto id=${id}`))
    );
  }

  getPhotosOfPatient(ids: number[]): Observable<Photo[]> {
    const url = `${this.url}/all/by-patient?ids=${ids}`;
    return this.http.get<Photo[]>(url, this.httpOptions).pipe(
      catchError(this.handleError<Photo[]>('getPhotosOfPatient', []))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error);

      return of(result as T);
    };
  }
}
