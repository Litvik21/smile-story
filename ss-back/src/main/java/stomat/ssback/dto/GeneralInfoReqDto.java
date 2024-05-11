package stomat.ssback.dto;

public record GeneralInfoReqDto(String firstName,
                                String surName,
                                String sex,
                                String phone,
                                String birthDate,
                                Long patientId) {
}
