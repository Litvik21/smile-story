package stomat.ssback.service.scan;

import stomat.ssback.model.scan.Scan;
import java.util.List;

public interface ScanService {
    Scan save(Scan scan);

    Scan update(Scan scan, Long id);

    Scan get(Long id);

    List<Scan> getAll();
}
