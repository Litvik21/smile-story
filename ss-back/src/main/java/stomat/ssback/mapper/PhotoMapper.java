package stomat.ssback.mapper;

import org.springframework.stereotype.Component;
import stomat.ssback.dto.PhotoReqDto;
import stomat.ssback.dto.PhotoRespDto;
import stomat.ssback.model.photo.Photo;

import static stomat.ssback.utils.Constants.IMAGE_PREFIX;
import static stomat.ssback.utils.FileUtil.getMediaPath;

@Component
public class PhotoMapper {
    public Photo toModel(PhotoReqDto dto) {
        Photo photo = new Photo();
        photo.setPeriod(Integer.parseInt(dto.period()));
        photo.setFrontalPath(getMediaPath(dto.frontalView(), IMAGE_PREFIX));
        photo.setRightSidePath(getMediaPath(dto.rightSideView(), IMAGE_PREFIX));
        photo.setLeftSidePath(getMediaPath(dto.leftSideView(), IMAGE_PREFIX));
        photo.setRightSideLateralPath(getMediaPath(dto.rightSideLateralView(), IMAGE_PREFIX));
        photo.setLeftSideLateralPath(getMediaPath(dto.leftSideLateralView(), IMAGE_PREFIX));
        photo.setIntraoralFrontalPath(getMediaPath(dto.intraoralFrontalView(), IMAGE_PREFIX));
        photo.setUpperJawOcclusalPath(getMediaPath(dto.upperJawOcclusalView(), IMAGE_PREFIX));
        photo.setLowerJawOcclusalPath(getMediaPath(dto.lowerJawOcclusalView(), IMAGE_PREFIX));

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
