package stomat.ssback.dto;

public record GeneralInfoReqDto(String firstName,
                                String surName,
                                String sex,
                                String birthDate,
                                Long patientId) {
}
