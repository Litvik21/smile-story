package stomat.ssback.service.photo;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import stomat.ssback.dto.PatientPhotosReqDto;
import stomat.ssback.model.Patient;
import stomat.ssback.model.photo.Photo;
import stomat.ssback.repository.photo.PhotoRepository;
import stomat.ssback.service.PatientService;

import java.io.File;
import java.util.Arrays;
import java.util.List;

@Service
@AllArgsConstructor
public class PhotoServiceImpl implements PhotoService {
    private final PhotoRepository repository;
    private final PatientService patientService;

    @Override
    public Photo save(Photo photo) {
        return repository.save(photo);
    }

    @Override
    public Photo update(Photo photo, Long id) {
        photo.setId(id);
        return repository.save(photo);
    }

    @Override
    public Photo get(Long id) {
        return repository.findById(id).orElseThrow(
                () -> new RuntimeException("Cannot find photo by id: " + id));
    }

    @Override
    public Photo getByPeriod(int period) {
        return repository.findByPeriod(period).orElseThrow(
                () -> new RuntimeException("Cannot find photos by period: " + period)
        );
    }

    @Override
    public List<Photo> getAll() {
        return repository.findAll();
    }

    @Override
    public List<Photo> addPhoto(Photo photo, Long patientId) {
        Patient patient = patientService.get(patientId);
        List<Photo> photos = patient.getPhotos();
        photos.add(photo);
        patient.setPhotos(photos);

        save(photo);
        return photos;
    }

    @Override
    public List<Photo> getAllByPatient(PatientPhotosReqDto dto) {
        return dto.ids().stream().map(this::get).toList();
    }

    @Override
    public void remove(Photo photo) {
        repository.delete(photo);
    }
}
