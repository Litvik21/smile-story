package stomat.ssback.mapper;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;
import stomat.ssback.dto.PhotoReqDto;
import stomat.ssback.dto.PhotoRespDto;
import stomat.ssback.model.GeneralInfo;
import stomat.ssback.model.photo.Photo;
import stomat.ssback.service.GeneralInfoService;

import static stomat.ssback.utils.Constants.IMAGE_PREFIX;
import static stomat.ssback.utils.FileUtil.getMediaPath;

@Component
@AllArgsConstructor
public class PhotoMapper {
    private final GeneralInfoService generalInfoService;

    public Photo toModel(PhotoReqDto dto) {
        GeneralInfo generalInfo = generalInfoService.get(Long.parseLong(dto.userId()));
        StringBuilder prefixBuilder = new StringBuilder(IMAGE_PREFIX);
        prefixBuilder.append(generalInfo.getSurName());
        prefixBuilder.append("/");
        String prefix = prefixBuilder.toString();

        Photo photo = new Photo();
        photo.setPeriod(Integer.parseInt(dto.period()));
        photo.setFrontalPath(getMediaPath(dto.frontalView(), prefix));
        photo.setRightSidePath(getMediaPath(dto.rightSideView(), prefix));
        photo.setLeftSidePath(getMediaPath(dto.leftSideView(), prefix));
        photo.setRightSideLateralPath(getMediaPath(dto.rightSideLateralView(), prefix));
        photo.setLeftSideLateralPath(getMediaPath(dto.leftSideLateralView(), prefix));
        photo.setIntraoralFrontalPath(getMediaPath(dto.intraoralFrontalView(), prefix));
        photo.setUpperJawOcclusalPath(getMediaPath(dto.upperJawOcclusalView(), prefix));
        photo.setLowerJawOcclusalPath(getMediaPath(dto.lowerJawOcclusalView(), prefix));

        return photo;
    }

    public PhotoRespDto toDto(Photo photo) {
        return new PhotoRespDto(
                photo.getId(),
                photo.getPeriod(),
                photo.getFrontalPath(),
                photo.getRightSidePath(),
                photo.getLeftSidePath(),
                photo.getRightSideLateralPath(),
                photo.getLeftSideLateralPath(),
                photo.getIntraoralFrontalPath(),
                photo.getUpperJawOcclusalPath(),
                photo.getLowerJawOcclusalPath()
        );
    }
}
