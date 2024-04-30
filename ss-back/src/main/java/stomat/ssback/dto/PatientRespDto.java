package stomat.ssback.dto;

import java.time.LocalDate;
import java.util.List;

public record PatientRespDto(Long id,
                             Long generalInfoId,
                             Long  wishesMedicationId,
                             List<Long> photoIds,
                             List<Long> scanIds,
                             LocalDate addingDate) {
}
