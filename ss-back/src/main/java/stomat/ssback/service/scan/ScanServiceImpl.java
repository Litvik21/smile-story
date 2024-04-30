package stomat.ssback.service.scan;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import stomat.ssback.model.scan.Scan;
import stomat.ssback.repository.scan.ScanRepository;
import java.util.List;

@Service
@AllArgsConstructor
public class ScanServiceImpl implements ScanService {
    private final ScanRepository repository;

    @Override
    public Scan save(Scan scan) {
        return repository.save(scan);
    }

    @Override
    public Scan update(Scan scan, Long id) {
        scan.setId(id);
        return repository.save(scan);
    }

    @Override
    public Scan get(Long id) {
        return repository.findById(id).orElseThrow(
                () -> new RuntimeException("Cannot find scan by  id: " + id)
        );
    }

    @Override
    public List<Scan> getAll() {
        return repository.findAll();
    }
}
