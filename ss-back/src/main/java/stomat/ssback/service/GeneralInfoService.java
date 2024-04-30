package stomat.ssback.service;

import stomat.ssback.model.GeneralInfo;
import java.util.List;

public interface GeneralInfoService {
    GeneralInfo save(GeneralInfo generalInfo);

    GeneralInfo update(GeneralInfo generalInfo,
                       Long id);

    GeneralInfo get(Long id);

    List<GeneralInfo> getAll();

    GeneralInfo findByFirstName(String firstname);

    GeneralInfo findBySurName(String surName);

    GeneralInfo findByFirstNameAndSurName(String firstName, String surName);

}
