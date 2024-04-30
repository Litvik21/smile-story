import {Component, NgZone} from '@angular/core';
import {AlignmentMapping, CorrectionMapping, ExtractionMapping,
  MedicationMapping, MicroimplantMapping, WishesMedication} from "../../model/WishesMedication";
import {WishesMedicationService} from "../../service/wishesMedication.service";
import {Router} from "@angular/router";
import {NgForOf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {LocalStor} from "../../service/localStor";

@Component({
  selector: 'app-add-wishes-medication',
  standalone: true,
  imports: [
    NgForOf,
    FormsModule
  ],
  templateUrl: './add-wishes-medication.component.html',
  styleUrl: './add-wishes-medication.component.scss'
})
export class AddWishesMedicationComponent {
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
              private localStor: LocalStor) { }

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
          this.localStor.setMedId(med.id);
          console.log("Med ID: ")
          console.log(this.localStor.getMedId())
          this.router.navigate(['/photos/add']);
        }
      );
    }
  }

  goToPreviousPage(): void {
    this.router.navigate(['/general/add']);
  }
}
