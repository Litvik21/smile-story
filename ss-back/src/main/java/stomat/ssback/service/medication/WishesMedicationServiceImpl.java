package stomat.ssback.service.medication;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import stomat.ssback.model.medication.WishesMedication;
import stomat.ssback.repository.medication.WishesMedicationRepository;
import stomat.ssback.utils.DescriptionUtil;

import java.util.List;

@Service
@AllArgsConstructor
public class WishesMedicationServiceImpl implements WishesMedicationService {
    private final WishesMedicationRepository repository;
    private final DescriptionUtil descriptionUtil;

    @Override
    public WishesMedication save(WishesMedication wishesMedication) {
        String updated = descriptionUtil.addNew(wishesMedication.getDescription());
        wishesMedication.setDescription(updated);
        return repository.save(wishesMedication);
    }

    @Override
    public WishesMedication update(WishesMedication wishesMedication,
                                   Long id) {
        wishesMedication.setId(id);
        return repository.save(wishesMedication);
    }

    @Override
    public WishesMedication updateDescription(String description, Long id) {
        WishesMedication wishesMedication = get(id);
        String updated = descriptionUtil.update(wishesMedication.getDescription(), description);
        wishesMedication.setDescription(updated);
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

    @Transactional
    @Override
    public void remove(Long id) {
        repository.deleteById(id);
    }
}
