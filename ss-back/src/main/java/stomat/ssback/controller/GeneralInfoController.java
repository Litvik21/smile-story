package stomat.ssback.controller;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;
import stomat.ssback.dto.GeneralInfoReqDto;
import stomat.ssback.dto.GeneralInfoRespDto;
import stomat.ssback.mapper.GeneralInfoMapper;
import stomat.ssback.model.GeneralInfo;
import stomat.ssback.service.GeneralInfoService;
import java.util.List;

@RestController
@RequestMapping("/patient/general-info")
@AllArgsConstructor
public class GeneralInfoController {
    private final GeneralInfoMapper mapper;
    private final GeneralInfoService service;

    @PostMapping("/add")
    public GeneralInfoRespDto addGeneralInfo(@RequestBody GeneralInfoReqDto dto) {
        GeneralInfo generalInfo = mapper.toModel(dto);
        return mapper.toDto(service.save(generalInfo));
    }

    @GetMapping("/{id}")
    public  GeneralInfoRespDto get(@PathVariable Long id) {
        return mapper.toDto(service.get(id));
    }

    @GetMapping("/all")
    public List<GeneralInfoRespDto> getAll() {
        return service.getAll().stream().map(mapper::toDto).toList();
    }
}
