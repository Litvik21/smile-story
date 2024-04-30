package stomat.ssback.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import stomat.ssback.model.GeneralInfo;
import stomat.ssback.model.Patient;

import java.util.Optional;

public interface GeneralInfoRepository extends JpaRepository<GeneralInfo, Long> {
    Optional<GeneralInfo> findByFirstName(String firstName);

    Optional<GeneralInfo> findBySurName(String surName);

    Optional<GeneralInfo> findByFirstNameAndSurName(String firstName, String surName);
}
