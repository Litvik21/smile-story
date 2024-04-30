package stomat.ssback.mapper;

import org.springframework.stereotype.Component;
import stomat.ssback.dto.WishesMedicationReqDto;
import stomat.ssback.dto.WishesMedicationRespDto;
import stomat.ssback.model.medication.*;
import java.util.stream.Collectors;

@Component
public class WishesMedicationMapper {
    public WishesMedication toModel(WishesMedicationReqDto dto) {
        WishesMedication wishesMedication = new WishesMedication();
        wishesMedication.setMedication(Medication.fromValue(dto.medication()));
        wishesMedication.setAlignment(Alignment.fromValue(dto.alignment()));
        wishesMedication.setExtraction(Extraction.fromValue(dto.extraction()));
        wishesMedication.setMicroimplant(Microimplant.fromValue(dto.microimplant()));
        wishesMedication.setCorrection(dto.correction().stream()
                .map(Correction::fromValue)
                .collect(Collectors.toSet()));
        wishesMedication.setDescription(dto.description());

        return wishesMedication;
    }

    public WishesMedicationRespDto toDto(WishesMedication wishesMedication) {
        return new WishesMedicationRespDto(
                wishesMedication.getId(),
                wishesMedication.getMedication().name(),
                wishesMedication.getAlignment().name(),
                wishesMedication.getExtraction().name(),
                wishesMedication.getMicroimplant().name(),
                wishesMedication.getCorrection().stream().map(Correction::name).toList(),
                wishesMedication.getDescription());
    }
}
