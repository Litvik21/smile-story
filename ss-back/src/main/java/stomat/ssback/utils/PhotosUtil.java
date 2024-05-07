package stomat.ssback.utils;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;
import stomat.ssback.model.Patient;
import stomat.ssback.model.photo.Photo;
import stomat.ssback.service.PatientService;
import stomat.ssback.service.photo.PhotoService;

import java.io.File;
import java.util.Arrays;
import java.util.List;

@Component
@AllArgsConstructor
public class PhotosUtil {
    private final PatientService patientService;
    private final PhotoService photoService;

    public void removeOldPhoto(Photo photo) {
        deleteFile(photo.getFrontalPath());
        deleteFile(photo.getLeftSidePath());
        deleteFile(photo.getRightSidePath());
        deleteFile(photo.getLowerJawOcclusalPath());
        deleteFile(photo.getUpperJawOcclusalPath());
        deleteFile(photo.getIntraoralFrontalPath());
        deleteFile(photo.getRightSideLateralPath());
        deleteFile(photo.getLeftSideLateralPath());
        System.out.println("OLD FILES DELETED!");
    }

    private void deleteFile(String path) {
        File file = new File(path);
        file.delete();
    }

    public void renameFolder(Long patientId, String folderName) {
        Patient patient = patientService.get(patientId);
        List<Photo> photos = patient.getPhotos();

        photos.forEach(photo -> setNewName(photo, folderName));
    }

    private void setNewName(Photo photo, String folderName) {
        String newPathToFolder = renameFolderName(photo.getFrontalPath(), folderName);

        photo.setFrontalPath(getNewPath(photo.getFrontalPath(), newPathToFolder));
        photo.setLeftSidePath(getNewPath(photo.getLeftSidePath(), newPathToFolder));
        photo.setRightSidePath(getNewPath(photo.getRightSidePath(), newPathToFolder));
        photo.setIntraoralFrontalPath(getNewPath(photo.getIntraoralFrontalPath(), newPathToFolder));
        photo.setLeftSideLateralPath(getNewPath(photo.getLeftSideLateralPath(), newPathToFolder));
        photo.setRightSideLateralPath(getNewPath(photo.getRightSideLateralPath(), newPathToFolder));
        photo.setLowerJawOcclusalPath(getNewPath(photo.getLowerJawOcclusalPath(), newPathToFolder));
        photo.setUpperJawOcclusalPath(getNewPath(photo.getUpperJawOcclusalPath(), newPathToFolder));
        photoService.update(photo, photo.getId());
    }

    private String getNewPath(String path, String folderPath) {
        String[] parts = path.split("/");
        String pathAfterFolder = String.join("/", Arrays.copyOfRange(parts, 5, parts.length));
        return folderPath + "/" + pathAfterFolder;
    }

    private String renameFolderName(String path, String folderName) {
        String[] parts = path.split("/");
        String folderPath = String.join("/", Arrays.copyOfRange(parts, 0, 5));

        File currentFolder = new File(folderPath);

        StringBuilder newFolderPath = new StringBuilder(String.join("/", Arrays.copyOfRange(parts, 0, 4)));
        newFolderPath.append("/");
        newFolderPath.append(folderName);
        File newFolderName = new File(newFolderPath.toString());

        if (currentFolder.renameTo(newFolderName)) {
            System.out.println("Папка успешно переименована.");
            return newFolderName.getPath();
        } else {
            System.out.println("Ошибка при переименовании папки.");
        }
        return currentFolder.getPath();
    }

    public void remove(String frontalPath) {
        String[] parts = frontalPath.split("/");
        String folderPath = String.join("/", Arrays.copyOfRange(parts, 0, 5));
        File folder = new File(folderPath);

        deleteFolder(folder);
    }

    private void deleteFolder(File folder) {
        if (folder.isDirectory()) {
            File[] files = folder.listFiles();
            if (files != null) {
                for (File file : files) {
                    if (file.isDirectory()) {
                        deleteFolder(file);
                    } else {
                        file.delete();
                    }
                }
            }
        }
        folder.delete();
    }

}
