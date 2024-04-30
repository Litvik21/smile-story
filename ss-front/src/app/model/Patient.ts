import {GeneralInfo} from "./GeneralInfo";
import {WishesMedication} from "./WishesMedication";
import {Photo} from "./Photo";
import {Scan} from "./Scan";

export interface Patient {
  id: number;
  generalInfoId: number;
  wishesMedicationId: number;
  photoIds: number[];
  scanIds: number[];
  generalInfo: GeneralInfo;
  wishesMedication: WishesMedication;
  photos: Photo[];
  scans: Scan[];
  addingDate: Date;
}
