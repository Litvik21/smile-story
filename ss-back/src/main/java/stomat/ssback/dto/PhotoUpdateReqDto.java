package stomat.ssback.dto;

public record PhotoUpdateReqDto(int period,
                                Long userId,
                                String frontalPath,
                                String rightSidePath,
                                String leftSidePath,
                                String rightSideLateralPath,
                                String leftSideLateralPath,
                                String intraoralFrontalPath,
                                String upperJawOcclusalPath,
                                String lowerJawOcclusalPath) {
}
