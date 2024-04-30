package stomat.ssback.service.photo;

import stomat.ssback.model.photo.Photo;
import java.util.List;

public interface PhotoService {
    Photo save(Photo photo);

    Photo update(Photo photo,
                 Long id);

    Photo get(Long id);

    List<Photo> getAll();
}
