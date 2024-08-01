package stomat.ssback.dto;

import java.util.List;

public record PatientRespDto(Long id,
                             Long generalInfoId,
                             Long  wishesMedicationId,
                             List<Long> photoIds,
                             String addingDate) {
}
