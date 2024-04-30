package stomat.ssback.repository.medication;

import org.springframework.data.jpa.repository.JpaRepository;
import stomat.ssback.model.medication.WishesMedication;

public interface WishesMedicationRepository extends JpaRepository<WishesMedication, Long> {
}
