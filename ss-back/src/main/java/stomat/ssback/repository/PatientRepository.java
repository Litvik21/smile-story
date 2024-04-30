package stomat.ssback.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import stomat.ssback.model.GeneralInfo;
import stomat.ssback.model.Patient;

import java.util.Optional;

public interface PatientRepository extends JpaRepository<Patient, Long> {
    Optional<Patient> findByGeneralInfo(GeneralInfo generalInfo);
}
