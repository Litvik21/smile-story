package stomat.ssback.service.medication;

import stomat.ssback.model.medication.WishesMedication;

import java.util.List;

public interface WishesMedicationService {
    WishesMedication save(WishesMedication wishesMedication);

    WishesMedication update(WishesMedication wishesMedication,
                            Long id);

    WishesMedication updateDescription(String description, Long id);

    WishesMedication get(Long id);

    List<WishesMedication> getAll();

    void remove(Long id);
}
