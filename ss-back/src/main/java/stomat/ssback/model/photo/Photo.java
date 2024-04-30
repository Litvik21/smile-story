package stomat.ssback.model.photo;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@Entity(name = "photos")
public class Photo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @EqualsAndHashCode.Include
    private Long id;

    @Column(name = "period")
    private int period;

    @Column(name = "frontal_path")
    private String frontalPath;

    @Column(name = "right_side_path")
    private String rightSidePath;

    @Column(name = "left_side_path")
    private String leftSidePath;

    @Column(name = "right_side_lateral_path")
    private String rightSideLateralPath;

    @Column(name = "left_side_lateral_path")
    private String leftSideLateralPath;

    @Column(name = "intraoral_frontal_path")
    private String intraoralFrontalPath;

    @Column(name = "upper_jaw_occlusal_path")
    private String upperJawOcclusalPath;

    @Column(name = "lower_jaw_occlusal_path")
    private String lowerJawOcclusalPath;

}
