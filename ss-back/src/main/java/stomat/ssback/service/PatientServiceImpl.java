package stomat.ssback.service;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import stomat.ssback.model.GeneralInfo;
import stomat.ssback.model.Patient;
import stomat.ssback.model.photo.Photo;
import stomat.ssback.repository.PatientRepository;
import stomat.ssback.service.medication.WishesMedicationService;
import stomat.ssback.utils.PhotosUtil;

import java.util.List;

@Service
@AllArgsConstructor
public class PatientServiceImpl implements PatientService {
    private final PatientRepository repository;
    private final GeneralInfoService generalInfoService;
//    private final PhotosUtil photosUtil;
    private final WishesMedicationService wishesMedicationService;

    @Override
    public Patient save(Patient patient) {
        return repository.save(patient);
    }

    @Transactional
    @Override
    public Patient remove(Long patientId) {
        Patient patient = get(patientId);
        generalInfoService.remove(patient.getGeneralInfo().getId());
//        photosUtil.remove(patient.getPhotos().get(0).getFrontalPath());
        wishesMedicationService.remove(patient.getWishesMedication().getId());
        repository.delete(patient);
        return patient;
    }

    @Override
    public Patient update(Patient patient, Long id) {
        patient.setId(id);
        return repository.save(patient);
    }

    @Override
    public Patient get(Long patientId) {
        return repository.findById(patientId).orElseThrow(
                () -> new RuntimeException("Cannot find patient by id:" + patientId)
        );
    }

    @Override
    public List<Integer> getAllPeriods(Long patientId) {
        Patient patient = get(patientId);
        return patient.getPhotos().stream()
                .map(Photo::getPeriod)
                .toList();
    }

    @Override
    public List<Patient> getAll() {
        return repository.findAll();
    }

    @Override
    public Patient findByGeneralInfo(GeneralInfo generalInfo) {
        return repository.findByGeneralInfo(generalInfo).orElseThrow(
                () -> new RuntimeException("Cannot find patient by general info: " + generalInfo.toString())
        );
    }

    @Override
    public Patient findByFirstName(String firstname) {
        GeneralInfo generalInfo = generalInfoService.findByFirstName(firstname);
        return findByGeneralInfo(generalInfo);
    }

    @Override
    public Patient findBySurName(String surName) {
        GeneralInfo generalInfo = generalInfoService.findBySurName(surName);
        return findByGeneralInfo(generalInfo);
    }

    @Override
    public Patient findByFirstNameAndSurName(String firstName, String surName) {
        GeneralInfo generalInfo = generalInfoService.findByFirstNameAndSurName(firstName, surName);
        return findByGeneralInfo(generalInfo);
    }
}
