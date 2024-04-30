package stomat.ssback.service.photo;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import stomat.ssback.model.photo.Photo;
import stomat.ssback.repository.photo.PhotoRepository;
import java.util.List;

@Service
@AllArgsConstructor
public class PhotoServiceImpl implements PhotoService {
    private final PhotoRepository repository;

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
    public List<Photo> getAll() {
        return repository.findAll();
    }
}
