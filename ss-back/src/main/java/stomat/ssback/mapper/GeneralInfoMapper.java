package stomat.ssback.mapper;

import org.springframework.stereotype.Component;
import stomat.ssback.dto.GeneralInfoReqDto;
import stomat.ssback.dto.GeneralInfoRespDto;
import stomat.ssback.model.GeneralInfo;
import stomat.ssback.model.Sex;
import java.time.LocalDate;
import java.time.Period;
import java.time.format.DateTimeFormatter;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Component
public class GeneralInfoMapper {
    public GeneralInfo toModel(GeneralInfoReqDto dto) {
        GeneralInfo generalInfo = new GeneralInfo();
        generalInfo.setFirstName(dto.firstName());
        generalInfo.setSurName(dto.surName());
        generalInfo.setPhone(formatPhone(dto.phone()));
        generalInfo.setSex(Sex.fromValue(dto.sex()));

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        LocalDate date = LocalDate.parse(dto.birthDate(), formatter);
        generalInfo.setBirthDate(date);

        return generalInfo;
    }

    public GeneralInfoRespDto toDto(GeneralInfo generalInfo) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        int years = Period.between(generalInfo.getBirthDate(), LocalDate.now()).getYears();

        return new GeneralInfoRespDto(generalInfo.getId(),
                generalInfo.getFirstName(),
                generalInfo.getSurName(),
                generalInfo.getSex().name(),
                generalInfo.getPhone(),
                generalInfo.getBirthDate().format(formatter));
    }

    private String formatPhone(String phone) {
        Pattern pattern = Pattern.compile("(\\d{3})(\\d{3})(\\d{2})(\\d{2})");
        Matcher matcher = pattern.matcher(phone);

        if (matcher.matches()) {
            String formattedPhoneNumber = String.format("+38(%s)%s-%s-%s", matcher.group(1), matcher.group(2), matcher.group(3), matcher.group(4));
            System.out.println("Форматированный номер телефона: " + formattedPhoneNumber);
            return formattedPhoneNumber;
        } else {
            System.out.println("Некорректный формат номера телефона");
            return phone;
        }
    }
}
