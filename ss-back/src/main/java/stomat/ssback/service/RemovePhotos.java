package stomat.ssback.service;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import stomat.ssback.model.photo.Photo;

import java.io.File;
import java.util.Arrays;

@Service
@AllArgsConstructor
public class RemovePhotos {
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
