package stomat.ssback.dto;

import java.util.List;

public record WishesMedicationReqDto(String medication,
                                     String alignment,
                                     String extraction,
                                     String microimplant,
                                     List<String> correction,
                                     String description) {
}
