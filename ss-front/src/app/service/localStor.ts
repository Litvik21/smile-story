import {Injectable} from "@angular/core";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class LocalStor {
  private readonly GENERAL_DATA_ID = 'general';
  private readonly MEDICATION_ID = 'med';
  private readonly PHOTO_ID = 'photo';
  private readonly SCAN_ID = 'scan';

  constructor(private router: Router) {
    this.checkAndRemoveTokenOnUnload();
  }

  private checkAndRemoveTokenOnUnload(): void {
    window.addEventListener('beforeunload', () => {
      this.removeToken();
    });
  }

  hasGeneralId(): boolean {
    return localStorage.getItem(this.GENERAL_DATA_ID) !== null;
  }

  hasMedId(): boolean {
    return localStorage.getItem(this.MEDICATION_ID) !== null;
  }

  getGeneralDataId(): string {
    const id = localStorage.getItem(this.GENERAL_DATA_ID);
    return JSON.parse(id!);
  }

  setGeneralDataId(id: string): void {
    localStorage.setItem(this.GENERAL_DATA_ID, id);
  }

  getMedId(): string {
    const id = localStorage.getItem(this.MEDICATION_ID);
    return JSON.parse(id!);
  }

  setMedId(id: string): void {
    localStorage.setItem(this.MEDICATION_ID, id);
  }

  getPhotoId(): string {
    const id = localStorage.getItem(this.PHOTO_ID);
    return JSON.parse(id!);
  }

  setPhotoId(id: string): void {
    localStorage.setItem(this.PHOTO_ID, id);
  }

  getScanId(): string {
    const id = localStorage.getItem(this.SCAN_ID);
    return JSON.parse(id!);
  }

  setScnaId(id: string): void {
    localStorage.setItem(this.SCAN_ID, id);
  }


  removeToken(): void {
    console.log("Ids removed!")
    localStorage.removeItem(this.GENERAL_DATA_ID);
    localStorage.removeItem(this.MEDICATION_ID);
    localStorage.removeItem(this.PHOTO_ID);
    localStorage.removeItem(this.SCAN_ID);
  }
}
