import {Component, OnInit} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgForOf} from "@angular/common";
import {
  Alignment,
  AlignmentMapping, Correction, CorrectionMapping, Extraction,
  ExtractionMapping, Medication,
  MedicationMapping, Microimplant,
  MicroimplantMapping
} from "../../model/WishesMedication";
import {WishesMedicationService} from "../../service/wishesMedication.service";
import {ActivatedRoute, Router} from "@angular/router";
import {LocalStor} from "../../service/localStor";

@Component({
  selector: 'app-medication-update',
  standalone: true,
    imports: [
        FormsModule,
        NgForOf,
        ReactiveFormsModule
    ],
  templateUrl: './medication-update.component.html',
  styleUrl: './medication-update.component.scss'
})
export class MedicationUpdateComponent  implements OnInit  {
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

  medId: any;
  patientId: any;
  medToUpdate: any;

  constructor(private wishesMedicationService: WishesMedicationService,
              private route: ActivatedRoute,
              private router: Router,
              private localStor: LocalStor) { }

  ngOnInit(): void {
    this.getMedication();
  }

  getMedication(): void {
    this.route.params.subscribe(params => {
      this.medId = params['medId']!;
      console.log('MED ID: ', this.medId)
      this.patientId = params['patientId']!;

      this.wishesMedicationService.getWishesMedication(this.medId).subscribe(
        med => {
          this.med = med;
          this.selectedMedication = this.mapMedication(med.medication);
          this.selectedAlignment = this.mapAlignment(med.alignment);
          this.selectedExtraction = this.mapExtraction(med.extraction);
          this.selectedMicroimplant = this.mapMicroimplant(med.microimplant);
          this.initializeSelectedCorrection();
          this.description = med.description;
        }
      )
    });
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
      this.medToUpdate = {
        medication: this.selectedMedication,
        alignment: this.selectedAlignment,
        extraction: this.selectedExtraction,
        microimplant: this.selectedMicroimplant,
        correction: correctionsArray,
        description: this.description
      }

      console.log(this.medToUpdate);
      this.wishesMedicationService.updateWishesMedication(this.medToUpdate, this.medId).subscribe(
        med => {
          console.log(med)
          this.router.navigate(['/view', this.patientId]).then(() => window.location.reload());
        }
      );
    }
  }

  goToPreviousPage(): void {
    this.router.navigate(['/view', this.patientId]).then(() => window.location.reload());
  }
}
