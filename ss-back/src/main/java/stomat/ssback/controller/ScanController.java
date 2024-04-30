package stomat.ssback.controller;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;
import stomat.ssback.dto.ScanReqDto;
import stomat.ssback.dto.ScanRespDto;
import stomat.ssback.mapper.ScanMapper;
import stomat.ssback.model.scan.Scan;
import stomat.ssback.service.scan.ScanService;
import java.util.List;

@RestController
@RequestMapping("/patient/scan")
@AllArgsConstructor
public class ScanController {
    private final ScanService service;
    private final ScanMapper mapper;

    @PostMapping("/add")
    public ScanRespDto addScan(@RequestBody ScanReqDto dto) {
        Scan scan = mapper.toModel(dto);
        return mapper.toDto(service.save(scan));
    }

    @GetMapping("/{id}")
    public ScanRespDto get(@PathVariable Long id) {
        return mapper.toDto(service.get(id));
    }

    @GetMapping("/all")
    public List<ScanRespDto> getAll() {
        return service.getAll().stream().map(mapper::toDto).toList();
    }
}
