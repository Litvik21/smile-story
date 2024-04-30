package stomat.ssback.service.medication;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import stomat.ssback.model.medication.WishesMedication;
import stomat.ssback.repository.medication.WishesMedicationRepository;
import java.util.List;

@Service
@AllArgsConstructor
public class WishesMedicationServiceImpl implements WishesMedicationService {
    private final WishesMedicationRepository repository;

    @Override
    public WishesMedication save(WishesMedication wishesMedication) {
        return repository.save(wishesMedication);
    }

    @Override
    public WishesMedication update(WishesMedication wishesMedication,
                                   Long id) {
        wishesMedication.setId(id);
        return repository.save(wishesMedication);
    }

    @Override
    public WishesMedication get(Long id) {
        return repository.findById(id).orElseThrow(
                () -> new RuntimeException("Cannot get wishes medication by id: " + id));
    }

    @Override
    public List<WishesMedication> getAll() {
        return repository.findAll();
    }
}
