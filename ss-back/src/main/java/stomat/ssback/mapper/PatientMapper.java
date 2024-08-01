package stomat.ssback.mapper;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;
import stomat.ssback.dto.PatientReqDto;
import stomat.ssback.dto.PatientRespDto;
import stomat.ssback.dto.PatientSaveDto;
import stomat.ssback.model.Patient;
import stomat.ssback.model.photo.Photo;
import stomat.ssback.model.scan.Scan;
import stomat.ssback.service.GeneralInfoService;
import stomat.ssback.service.medication.WishesMedicationService;
import stomat.ssback.service.photo.PhotoService;
import stomat.ssback.service.scan.ScanService;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Component
@AllArgsConstructor
public class PatientMapper {
    private final GeneralInfoService generalInfoService;
    private final WishesMedicationService wishesMedicationService;
    private final PhotoService photoService;
    private final ScanService scanService;

    public Patient toModel(PatientReqDto dto) {
        Patient patient = new Patient();
        patient.setGeneralInfo(generalInfoService.get(dto.generalInfoId()));
        patient.setWishesMedication(wishesMedicationService.get(dto.wishesMedicationId()));
        patient.setPhotos(List.of(photoService.get(dto.photoId())));
        patient.setScans(List.of(scanService.get(dto.scanId())));
        //patient.setAddingDate(LocalDate.now());

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        LocalDate date = LocalDate.parse(LocalDate.now().toString(), formatter);
        patient.setAddingDate(date);

        return patient;
    }

    public Patient toModel(PatientSaveDto dto) {
        Patient patient = new Patient();
        patient.setGeneralInfo(generalInfoService.get(dto.generalInfoId()));
        patient.setWishesMedication(wishesMedicationService.get(dto.wishesMedicationId()));
        patient.setPhotos(List.of(photoService.get(dto.photoId())));
        //patient.setAddingDate(LocalDate.now());

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        LocalDate date = LocalDate.parse(LocalDate.now().toString(), formatter);
        patient.setAddingDate(date);

        return patient;
    }

    public PatientRespDto toDto(Patient patient) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

        return new PatientRespDto(
                patient.getId(),
                patient.getGeneralInfo().getId(),
                patient.getWishesMedication().getId(),
                patient.getPhotos().stream().map(Photo::getId).toList(),
                patient.getAddingDate().format(formatter)
                );
    }
}
