package stomat.ssback.model;

import jakarta.persistence.*;
import lombok.*;
import stomat.ssback.model.medication.WishesMedication;
import stomat.ssback.model.photo.Photo;
import stomat.ssback.model.scan.Scan;
import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@Entity(name = "patients")
public class Patient {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @EqualsAndHashCode.Include
    private Long id;

    @OneToOne
    private GeneralInfo generalInfo;

    @OneToOne
    private WishesMedication wishesMedication;

    @Column(name = "photos")
    @OneToMany(cascade = CascadeType.REMOVE)
    private List<Photo> photos;

    @Column(name = "scans")
    @OneToMany
    private List<Scan> scans;

    @Column(name = "adding_date")
    private LocalDate addingDate;
}
