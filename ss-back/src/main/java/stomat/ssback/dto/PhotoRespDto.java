package stomat.ssback.dto;

public record PhotoRespDto(Long  id,
                           int period,
                           String frontalPath,
                           String rightSidePath,
                           String leftSidePath,
                           String rightSideLateralPath,
                           String leftSideLateralPath,
                           String intraoralFrontalPath,
                           String upperJawOcclusalPath,
                           String lowerJawOcclusalPath) {
}
