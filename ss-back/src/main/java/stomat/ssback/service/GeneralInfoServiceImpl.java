package stomat.ssback.service;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import stomat.ssback.model.GeneralInfo;
import stomat.ssback.model.Patient;
import stomat.ssback.repository.GeneralInfoRepository;

import java.util.List;

@AllArgsConstructor
@Service
public class GeneralInfoServiceImpl implements GeneralInfoService {
    private final GeneralInfoRepository repository;

    @Override
    public GeneralInfo save(GeneralInfo generalInfo) {
        return repository.save(generalInfo);
    }

    @Override
    public GeneralInfo update(GeneralInfo generalInfo, Long id) {
        generalInfo.setId(id);
        return repository.save(generalInfo);
    }

    @Override
    public GeneralInfo get(Long id) {
        return repository.findById(id).orElseThrow(
                () -> new RuntimeException("Cannot find general info by id:" + id));
    }

    @Override
    public List<GeneralInfo> getAll() {
        return repository.findAll();
    }

    @Override
    public GeneralInfo findByFirstName(String firstname) {
        return repository.findByFirstName(firstname).orElseThrow(
                () -> new RuntimeException("Cannot find general info by firstName: " + firstname)
        );
    }

    @Override
    public GeneralInfo findBySurName(String surName) {
        return repository.findBySurName(surName).orElseThrow(
                () -> new RuntimeException("Cannot find general info by surName: " + surName)
        );
    }

    @Override
    public GeneralInfo findByFirstNameAndSurName(String firstName, String surName) {
        return repository.findByFirstNameAndSurName(firstName, surName).orElseThrow(
                () -> new RuntimeException("Cannot find general info by firstName and surName: " + firstName + " " + surName)
        );
    }

    @Transactional
    @Override
    public void remove(Long id) {
        repository.deleteById(id);
    }
}
