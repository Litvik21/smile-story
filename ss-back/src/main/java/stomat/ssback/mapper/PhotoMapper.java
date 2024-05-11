package stomat.ssback.mapper;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;
import stomat.ssback.dto.PhotoReqDto;
import stomat.ssback.dto.PhotoRespDto;
import stomat.ssback.dto.PhotoUpdateReqDto;
import stomat.ssback.model.GeneralInfo;
import stomat.ssback.model.photo.Photo;
import stomat.ssback.service.GeneralInfoService;

import java.util.Arrays;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import static stomat.ssback.utils.Constants.IMAGE_PREFIX;
import static stomat.ssback.utils.FileUtil.getMediaPath;
import static stomat.ssback.utils.FileUtil.getMediaPathFromPath;

@Component
@AllArgsConstructor
public class PhotoMapper {
    private final GeneralInfoService generalInfoService;
    private final static int ASSERTS_FOLDER_INDEX = 8;
    //private final static int ASSERTS_FOLDER_INDEX = 2;

    public Photo toModel(PhotoReqDto dto) {
        GeneralInfo generalInfo = generalInfoService.get(Long.parseLong(dto.userId()));
        StringBuilder prefixBuilder = new StringBuilder(IMAGE_PREFIX);
        prefixBuilder.append(generalInfo.getSurName());
        prefixBuilder.append("/");
        prefixBuilder.append(dto.period());
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

    public Photo toModelUpdate(PhotoUpdateReqDto dto) {
        GeneralInfo generalInfo = generalInfoService.get(dto.userId());
        StringBuilder prefixBuilder = new StringBuilder(IMAGE_PREFIX);
        prefixBuilder.append(generalInfo.getSurName());
        prefixBuilder.append("/");
        prefixBuilder.append(dto.period());
        prefixBuilder.append("/");
        String prefix = prefixBuilder.toString();

        Photo photo = new Photo();
        photo.setPeriod(dto.period());
        photo.setFrontalPath(getMediaPathFromPath(dto.frontalPath(), prefix));
        photo.setRightSidePath(getMediaPathFromPath(dto.rightSidePath(), prefix));
        photo.setLeftSidePath(getMediaPathFromPath(dto.leftSidePath(), prefix));
        photo.setRightSideLateralPath(getMediaPathFromPath(dto.rightSideLateralPath(), prefix));
        photo.setLeftSideLateralPath(getMediaPathFromPath(dto.leftSideLateralPath(), prefix));
        photo.setIntraoralFrontalPath(getMediaPathFromPath(dto.intraoralFrontalPath(), prefix));
        photo.setUpperJawOcclusalPath(getMediaPathFromPath(dto.upperJawOcclusalPath(), prefix));
        photo.setLowerJawOcclusalPath(getMediaPathFromPath(dto.lowerJawOcclusalPath(), prefix));

        return photo;
    }

    public PhotoRespDto toDto(Photo photo) {
        return new PhotoRespDto(
                photo.getId(),
                photo.getPeriod(),
                toFrontPath(photo.getFrontalPath()),
                toFrontPath(photo.getRightSidePath()),
                toFrontPath(photo.getLeftSidePath()),
                toFrontPath(photo.getRightSideLateralPath()),
                toFrontPath(photo.getLeftSideLateralPath()),
                toFrontPath(photo.getIntraoralFrontalPath()),
                toFrontPath(photo.getUpperJawOcclusalPath()),
                toFrontPath(photo.getLowerJawOcclusalPath())
        );
    }

    public PhotoRespDto toDtoForDelete(Photo photo) {
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

    private String toFrontPath(String path) {
        String[] parts = path.split("/");

        //ss-front/src/assets/photosBackground/Фамилия/0/default.png
        ///Users/elena/Desktop/smile-story (Project)/smile-story/ss-front/src/assets/photosBackground/Фамилия/0/default.png
        return String.join("/", Arrays.copyOfRange(parts, ASSERTS_FOLDER_INDEX, parts.length));
    }
}
