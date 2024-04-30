package stomat.ssback.repository.scan;

import org.springframework.data.jpa.repository.JpaRepository;
import stomat.ssback.model.scan.Scan;

public interface ScanRepository extends JpaRepository<Scan, Long> {
}
