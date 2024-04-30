package stomat.ssback.service;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import stomat.ssback.model.GeneralInfo;
import stomat.ssback.model.Patient;
import stomat.ssback.repository.PatientRepository;

import java.util.List;

@Service
@AllArgsConstructor
public class PatientServiceImpl implements PatientService {
    private final PatientRepository repository;
    private final GeneralInfoService generalInfoService;

    @Override
    public Patient save(Patient patient) {
        return repository.save(patient);
    }

    @Transactional
    @Override
    public void remove(Long patientId) {
        Patient patient = get(patientId);
        repository.delete(patient);

//        try {
//            File image = new File(patient.getImageName());
//            image.delete();
//            Files.walk(Paths.get(video.getFileName()))
//                    .sorted(Comparator.reverseOrder())
//                    .map(Path::toFile)
//                    .forEach(File::delete);
//        } catch (IOException e) {
//            throw new RuntimeException(e);
//        }
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
