package stomat.ssback.controller;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;
import stomat.ssback.dto.GeneralInfoReqDto;
import stomat.ssback.dto.GeneralInfoRespDto;
import stomat.ssback.dto.WishesMedicationReqDto;
import stomat.ssback.dto.WishesMedicationRespDto;
import stomat.ssback.mapper.WishesMedicationMapper;
import stomat.ssback.model.GeneralInfo;
import stomat.ssback.model.medication.WishesMedication;
import stomat.ssback.service.medication.WishesMedicationService;
import java.util.List;

@RestController
@RequestMapping("/patient/medication")
@AllArgsConstructor
public class WishesMedicationController {
    private final WishesMedicationService service;
    private final WishesMedicationMapper mapper;

    @PostMapping("/add")
    public WishesMedicationRespDto addMedication(@RequestBody WishesMedicationReqDto dto) {
        WishesMedication model = mapper.toModel(dto);
        return mapper.toDto(service.save(model));
    }

    @PutMapping("/update/{id}")
    public WishesMedicationRespDto update(@PathVariable Long id,
                                     @RequestBody WishesMedicationReqDto dto) {
        WishesMedication model = mapper.toModel(dto);
        return mapper.toDto(service.update(model, id));
    }

    @GetMapping("/{id}")
    public WishesMedicationRespDto get(@PathVariable Long id) {
        return mapper.toDto(service.get(id));
    }

    @GetMapping("/all")
    public List<WishesMedicationRespDto> getAll() {
        return service.getAll().stream().map(mapper::toDto).toList();
    }
}
