package stomat.ssback.controller;

import lombok.AllArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import stomat.ssback.dto.*;
import stomat.ssback.mapper.PhotoMapper;
import stomat.ssback.model.photo.Photo;
import stomat.ssback.utils.PhotosUtil;
import stomat.ssback.service.photo.PhotoService;
import java.util.List;

@RestController
@RequestMapping("/patient/photo")
@AllArgsConstructor
public class PhotoController {
    private final PhotoService service;
    private final PhotoMapper mapper;
    private final PhotosUtil photosUtil;

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

    @PostMapping(path = "/add/to-list", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public List<PhotoRespDto> addPhotoToList(@RequestParam("period") String period,
                                 @RequestParam("userId") String userId,
                                 @RequestParam("patientId") String patientId,
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
        return service.addPhoto(photo, Long.parseLong(patientId)).stream().map(mapper::toDto).toList();
    }

    @PutMapping("/update/{id}")
    public PhotoRespDto updatePhoto(@PathVariable Long id,
                                    @RequestBody PhotoUpdateReqDto dto) {
        Photo photo = mapper.toModelUpdate(dto);
        photosUtil.removeOldPhoto(service.get(id));
        return mapper.toDto(service.update(photo, id));
    }

    @PostMapping("/delete/old")
    public ResponseEntity deleteOldPhotos(@RequestBody PhotoDeleteReqDto dto) {
        photosUtil.remove(dto.path());
        return ResponseEntity.status(200).build();
    }

    @GetMapping("/period{period}")
    public PhotoRespDto getByPeriod(@PathVariable int period) {
        return mapper.toDto(service.getByPeriod(period));
    }

    @GetMapping("/{id}")
    public PhotoRespDto get(@PathVariable Long id) {
        return mapper.toDto(service.get(id));
    }

    @GetMapping("/get/for-delete/{id}")
    public PhotoRespDto getForDelete(@PathVariable Long id) {
        return mapper.toDtoForDelete(service.get(id));
    }

    @GetMapping("/all")
    public List<PhotoRespDto> getAll() {
        return service.getAll().stream().map(mapper::toDto).toList();
    }

    @GetMapping("/all/by-patient")
    public List<PhotoRespDto> getAllByPatient(@RequestParam(name = "ids") List<Long> ids) {
        List<Photo> photos = ids.stream().map(service::get).toList();
        return photos.stream().map(mapper::toDto).toList();
    }
}
