package stomat.ssback.mapper;

import org.springframework.stereotype.Component;
import stomat.ssback.dto.GeneralInfoReqDto;
import stomat.ssback.dto.GeneralInfoRespDto;
import stomat.ssback.model.GeneralInfo;
import stomat.ssback.model.Sex;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

@Component
public class GeneralInfoMapper {
    public GeneralInfo toModel(GeneralInfoReqDto dto) {
        GeneralInfo generalInfo = new GeneralInfo();
        generalInfo.setFirstName(dto.firstName());
        generalInfo.setSurName(dto.surName());
        generalInfo.setSex(Sex.fromValue(dto.sex()));

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        LocalDate date = LocalDate.parse(dto.birthDate(), formatter);
        generalInfo.setBirthDate(date);

        return generalInfo;
    }

    public GeneralInfoRespDto toDto(GeneralInfo generalInfo) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

        return new GeneralInfoRespDto(generalInfo.getId(),
                generalInfo.getFirstName(),
                generalInfo.getSurName(),
                generalInfo.getSex().name(),
                generalInfo.getBirthDate().format(formatter));
    }
}
