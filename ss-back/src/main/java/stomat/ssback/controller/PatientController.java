package stomat.ssback.controller;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import stomat.ssback.dto.PatientPhotoPeriodsRespDto;
import stomat.ssback.dto.PatientRespDto;
import stomat.ssback.dto.PatientSaveDto;
import stomat.ssback.mapper.PatientMapper;
import stomat.ssback.model.Patient;
import stomat.ssback.service.PatientService;
import java.util.List;

@RestController
@RequestMapping("/patient")
@AllArgsConstructor
public class PatientController {
    private final PatientService service;
    private final PatientMapper mapper;

    @PostMapping("/add")
    public PatientRespDto addPatient(@RequestBody PatientSaveDto dto) {
        Patient model = mapper.toModel(dto);
        return mapper.toDto(service.save(model));
    }

    @GetMapping("/{id}")
    public PatientRespDto get(@PathVariable Long id) {
        return mapper.toDto(service.get(id));
    }

    @GetMapping("/all")
    public List<PatientRespDto> getAll() {
        return service.getAll().stream().map(mapper::toDto).toList();
    }

    @GetMapping("/all-periods/{id}")
    public PatientPhotoPeriodsRespDto getAllPhotoPeriods(@PathVariable Long id) {
        return new PatientPhotoPeriodsRespDto(service.getAllPeriods(id));
    }

    @DeleteMapping("/delete/{id}")
    public PatientRespDto delete(@PathVariable Long id) {
        return mapper.toDto(service.remove(id));
    }
}
