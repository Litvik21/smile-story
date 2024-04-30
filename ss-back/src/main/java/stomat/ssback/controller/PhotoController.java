package stomat.ssback.controller;

import lombok.AllArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import stomat.ssback.dto.PhotoReqDto;
import stomat.ssback.dto.PhotoRespDto;
import stomat.ssback.mapper.PhotoMapper;
import stomat.ssback.model.photo.Photo;
import stomat.ssback.service.photo.PhotoService;
import java.util.List;

@RestController
@RequestMapping("/patient/photo")
@AllArgsConstructor
public class PhotoController {
    private final PhotoService service;
    private final PhotoMapper mapper;

    @PostMapping(path = "/add", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public PhotoRespDto addPhoto(@RequestParam("period") String period,
                                 @RequestParam("userId") String userId,
                                 @RequestParam("frontalView") MultipartFile frontalView,
                                 @RequestParam("rightSideView") MultipartFile rightSideView,
                                 @RequestParam("leftSideView") MultipartFile leftSideView,
                                 @RequestParam("rightSideLateralView") MultipartFile rightSideLateralView,
                                 @RequestParam("leftSideLateralView") MultipartFile leftSideLateralView,
                                 @RequestParam("intraoralFrontalView") MultipartFile intraoralFrontalView,
                                 @RequestParam("upperJawOcclusalView") MultipartFile upperJawOcclusalView,
                                 @RequestParam("lowerJawOcclusalView") MultipartFile lowerJawOcclusalView) {
        PhotoReqDto reqDto = new PhotoReqDto(period, userId, frontalView, rightSideView, leftSideView,
                rightSideLateralView, leftSideLateralView,
                intraoralFrontalView, upperJawOcclusalView,
                lowerJawOcclusalView);
        Photo photo = mapper.toModel(reqDto);
        return mapper.toDto(service.save(photo));
    }

//    @PostMapping(path = "/add", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
//    public PhotoRespDto addPhoto(@RequestBody PhotoReqDto dto) {
//        Photo photo = mapper.toModel(dto);
//        return mapper.toDto(service.save(photo));
//    }

    @GetMapping("/{id}")
    public PhotoRespDto get(@PathVariable Long id) {
        return mapper.toDto(service.get(id));
    }

    @GetMapping("/all")
    public List<PhotoRespDto> getAll() {
        return service.getAll().stream().map(mapper::toDto).toList();
    }
}
