import {Router} from "@angular/router";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class LocalStorageMedAndGeneral {
  private readonly GENERAL_INFO_KEY = 'generalInfo';
  private readonly MEDICATION_KEY = 'medication';

  constructor(private router: Router) {
    this.checkAndRemoveDataOnUnload();
  }

  private checkAndRemoveDataOnUnload(): void {
    window.addEventListener('beforeunload', () => {
      this.removeData();
    });
  }

  hasGeneralInfo(): boolean {
    return localStorage.getItem(this.GENERAL_INFO_KEY) !== null;
  }

  getGeneralInfo(): any {
    const data = localStorage.getItem(this.GENERAL_INFO_KEY);
    return data ? JSON.parse(data) : null;
  }

  setGeneralInfo(generalInfo: any): void {
    localStorage.setItem(this.GENERAL_INFO_KEY, JSON.stringify(generalInfo));
  }

  hasMedication(): boolean {
    return localStorage.getItem(this.MEDICATION_KEY) !== null;
  }

  getMedication(): any {
    const data = localStorage.getItem(this.MEDICATION_KEY);
    return data ? JSON.parse(data) : null;
  }

  setMedication(medication: any): void {
    localStorage.setItem(this.MEDICATION_KEY, JSON.stringify(medication));
  }

  removeData(): void {
    console.log("GeneralInfo and Medication data removed!");
    localStorage.removeItem(this.GENERAL_INFO_KEY);
    localStorage.removeItem(this.MEDICATION_KEY);
  }
}
