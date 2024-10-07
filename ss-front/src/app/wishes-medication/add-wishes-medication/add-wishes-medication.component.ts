import {Component, NgZone, OnInit} from '@angular/core';
import {
  Alignment,
  AlignmentMapping, Correction, CorrectionMapping, Extraction, ExtractionMapping, Medication,
  MedicationMapping, Microimplant, MicroimplantMapping, WishesMedication
} from "../../model/WishesMedication";
import {WishesMedicationService} from "../../service/wishesMedication.service";
import {Router} from "@angular/router";
import {NgForOf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {LocalStor} from "../../service/localStor";
import {AutosizeModule} from "ngx-autosize";
import {LocalStorageMedAndGeneral} from "../../service/local.storage.med.and.general";

@Component({
  selector: 'app-add-wishes-medication',
  standalone: true,
  imports: [
    NgForOf,
    FormsModule,
    AutosizeModule
  ],
  templateUrl: './add-wishes-medication.component.html',
  styleUrl: './add-wishes-medication.component.scss'
})
export class AddWishesMedicationComponent implements OnInit{
  medications: string[] = Object.values(MedicationMapping);
  selectedMedication: string = '';

  alignments: string[] = Object.values(AlignmentMapping);
  selectedAlignment: string = '';

  extractions: string[] = Object.values(ExtractionMapping);
  selectedExtraction: string = '';

  microimplants: string[] = Object.values(MicroimplantMapping);
  selectedMicroimplant: string = '';

  correctionOptions: string[] = Object.keys(CorrectionMapping);
  selectedCorrections: { [key: string]: boolean } = {};
  canEditCorrections = true;

  description: string = '';

  med: any;

  constructor(private wishesMedicationService: WishesMedicationService,
              private router: Router,
              private localStor: LocalStor,
              private storage: LocalStorageMedAndGeneral) { }

  ngOnInit(): void {
    if (this.storage.hasMedication()) {
      const med = this.storage.getMedication();
      console.log('Данные профиля:', med);

      this.med = med;
      this.selectedMedication = this.mapMedication(med.medication);
      this.selectedAlignment = this.mapAlignment(med.alignment);
      this.selectedExtraction = this.mapExtraction(med.extraction);
      this.selectedMicroimplant = this.mapMicroimplant(med.microimplant);
      this.initializeSelectedCorrection();
      this.description = med.description;
    } else {
      console.log('Данных профиля нет в localStorage.');
    }
  }

  isSelected(correction: string): boolean {
    return this.selectedCorrections[correction] || false;
  }

  toggleCategory(correction: string): void {
    this.selectedCorrections[correction] = !this.selectedCorrections[correction];
  }

  submit() {
    let form:HTMLFormElement | null = document.forms.namedItem('uploadForm');
    if (form) {
      let fd = new FormData(form);
      fd.append('medication', this.selectedMedication);
      fd.append('alignment', this.selectedAlignment);
      fd.append('extraction', this.selectedExtraction);
      fd.append('microimplant', this.selectedMicroimplant);

      for (const correction of Object.keys(this.selectedCorrections)) {
        if (this.selectedCorrections[correction]) {
          fd.append('correction', correction);
        }
      }

      fd.append('description', this.description);

      this.canEditCorrections = false;

      let correctionsArray = [];
      for (const correction in this.selectedCorrections) {
        if (this.selectedCorrections[correction]) {
          correctionsArray.push(correction);
        }
      }
      this.med = {
        medication: this.selectedMedication,
        alignment: this.selectedAlignment,
        extraction: this.selectedExtraction,
        microimplant: this.selectedMicroimplant,
        correction: correctionsArray,
        description: this.description
      }

      this.wishesMedicationService.addWishesMedication(this.med).subscribe(
        med => {
          console.log(med)
          this.storage.setMedication(med);
          this.localStor.setMedId(med.id);
          console.log("Med ID: ")
          console.log(this.localStor.getMedId())
          this.router.navigate(['/photos/add']);
        }
      );
    }
  }

  initializeSelectedCorrection(): void {
    console.log(this.med.correction);
    for (const correction of this.med.correction) {
      this.selectedCorrections[this.mapCorrection(correction)] = true;
    }
  }

  mapCorrection(correction: Correction): string {
    return Correction[correction as unknown as keyof typeof Correction];
  }

  mapMedication(medication: Medication): string {
    return Medication[medication as unknown as keyof typeof Medication];
  }

  mapAlignment(alignment: Alignment): string {
    return Alignment[alignment as unknown as keyof typeof Alignment];
  }

  mapExtraction(extraction: Extraction): string {
    return Extraction[extraction as unknown as keyof typeof Extraction];
  }

  mapMicroimplant(microimplant: Microimplant): string {
    return Microimplant[microimplant as unknown as keyof typeof Microimplant];
  }

  goToPreviousPage(): void {
    this.router.navigate(['/general/add']);
  }
}
