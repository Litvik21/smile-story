package stomat.ssback.service.photo;

import stomat.ssback.dto.PatientPhotosReqDto;
import stomat.ssback.model.photo.Photo;
import java.util.List;

public interface PhotoService {
    Photo save(Photo photo);

    Photo update(Photo photo,
                 Long id);

    Photo get(Long id);

    Photo getByPeriod(int period);

    List<Photo> getAll();

    List<Photo> addPhoto(Photo photo,
                         Long patientId);

    List<Photo> getAllByPatient(PatientPhotosReqDto dto);
}
