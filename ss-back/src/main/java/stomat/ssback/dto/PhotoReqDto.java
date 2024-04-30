package stomat.ssback.dto;

import org.springframework.web.multipart.MultipartFile;

public record PhotoReqDto(String period,
                          String userId,
                          MultipartFile frontalView,
                          MultipartFile rightSideView,
                          MultipartFile leftSideView,
                          MultipartFile rightSideLateralView,
                          MultipartFile leftSideLateralView,
                          MultipartFile intraoralFrontalView,
                          MultipartFile upperJawOcclusalView,
                          MultipartFile lowerJawOcclusalView) {
}
