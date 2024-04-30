package stomat.ssback.mapper;

import org.springframework.stereotype.Component;
import stomat.ssback.dto.ScanReqDto;
import stomat.ssback.dto.ScanRespDto;
import stomat.ssback.model.scan.Scan;
import static stomat.ssback.utils.Constants.SCAN_PREFIX;
import static stomat.ssback.utils.FileUtil.getMediaPath;

@Component
public class ScanMapper {
    public Scan toModel(ScanReqDto dto) {
        Scan scan = new Scan();
        scan.setScanPath(getMediaPath(dto.scan(), SCAN_PREFIX));

        return scan;
    }

    public ScanRespDto toDto(Scan scan) {
        return new ScanRespDto(
                scan.getId(),
                scan.getScanPath()
        );
    }
}
