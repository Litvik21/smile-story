package stomat.ssback.service;

import stomat.ssback.model.GeneralInfo;
import stomat.ssback.model.Patient;
import java.util.List;

public interface PatientService {
    Patient save(Patient patient);

    void remove(Long patientId);

    Patient update(Patient patient, Long id);

    Patient get(Long patientId);

    List<Patient> getAll();

    Patient findByGeneralInfo(GeneralInfo generalInfo);

    Patient findByFirstName(String firstname);

    Patient findBySurName(String surName);

    Patient findByFirstNameAndSurName(String firstName, String surName);
}
