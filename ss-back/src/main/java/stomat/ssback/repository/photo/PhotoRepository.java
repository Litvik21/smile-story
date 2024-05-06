package stomat.ssback.repository.photo;

import org.springframework.data.jpa.repository.JpaRepository;
import stomat.ssback.model.photo.Photo;

import java.util.List;
import java.util.Optional;

public interface PhotoRepository extends JpaRepository<Photo, Long> {
    Optional<Photo> findByPeriod(int period);
}
