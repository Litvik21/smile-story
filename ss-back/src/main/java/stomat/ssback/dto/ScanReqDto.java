package stomat.ssback.dto;

import org.springframework.web.multipart.MultipartFile;

public record ScanReqDto(MultipartFile scan) {
}
