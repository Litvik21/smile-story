package stomat.ssback.model.medication;

import jakarta.persistence.*;
import lombok.*;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@Entity(name = "wishes_medications")
public class WishesMedication {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @EqualsAndHashCode.Include
    private Long id;

    @Column(name = "medication")
    @Enumerated(EnumType.STRING)
    private Medication medication;

    @Column(name = "alignment")
    @Enumerated(EnumType.STRING)
    private Alignment alignment;

    @Column(name = "extraction")
    @Enumerated(EnumType.STRING)
    private Extraction extraction;

    @Column(name = "microimplant")
    @Enumerated(EnumType.STRING)
    private Microimplant microimplant;

    @Enumerated(EnumType.STRING)
    @ElementCollection(targetClass = Correction.class)
    @JoinTable(name = "tbl_correction", joinColumns = @JoinColumn(name = "wishes_medications_id"))
    @Column(name = "correction", nullable = false)
    private Set<Correction> correction;

    @Column(name = "description")
    private String description;
}
