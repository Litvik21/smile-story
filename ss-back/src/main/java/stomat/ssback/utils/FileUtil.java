package stomat.ssback.utils;

import org.apache.commons.io.FileUtils;
import org.slf4j.LoggerFactory;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Objects;
import java.util.UUID;
import org.slf4j.Logger;

import static stomat.ssback.utils.Constants.*;

public class FileUtil {
    private static final Logger LOGGER = LoggerFactory.getLogger(FileUtil.class);

    public static String generateUniqueFileName(String originalFileName) {
        String fileExtension = getFileExtension(originalFileName);
        String uniqueFileName = UUID.randomUUID().toString();

        return uniqueFileName + fileExtension;
    }

    private static String getFileExtension(String fileName) {
        int dotIndex = fileName.lastIndexOf(".");
        if (dotIndex > 0 && dotIndex < fileName.length() - 1) {
            return fileName.substring(dotIndex);
        }
        return "";
    }

    public static File convertMultipartFileToFile(MultipartFile file) {
        File convertedFile = new File(Objects.requireNonNull(file.getOriginalFilename()));
        try {
            FileUtils.copyInputStreamToFile(file.getInputStream(), convertedFile);
        } catch (IOException e) {
            LOGGER.warn("Can't convert MultipartFile to File", e);
            throw new RuntimeException("Can't convert MultipartFile to File", e);
        }

        LOGGER.info("Successfully converted file, file name: {}", file.getOriginalFilename());
        return convertedFile;
    }

    public static String getMediaPath(MultipartFile file, String prefix) {
        try {
            String originalFilename = file.getOriginalFilename();
            if (originalFilename == null || originalFilename.trim().isEmpty()) {

                Path source = Paths.get("ss-front/src/assets/photosBackground/default.png");
                String fileName = generateUniqueFileName("default.png");

                String dir = MEDIA_PATH + prefix;
                Files.createDirectories(Paths.get(dir));

                Path destination = Paths.get(MEDIA_PATH + prefix + fileName);
                Files.copy(source, destination, StandardCopyOption.COPY_ATTRIBUTES);
                return destination.toString();
            } else {
                File converted = convertMultipartFileToFile(file);

                String fileName = generateUniqueFileName(file.getOriginalFilename());

                String dir = MEDIA_PATH + prefix;
                Files.createDirectories(Paths.get(dir));

                Path source = Paths.get(converted.getAbsolutePath());
                Path destination = Paths.get(MEDIA_PATH + prefix + fileName);
                Files.copy(source, destination, StandardCopyOption.REPLACE_EXISTING);

                converted.delete();
                return destination.toString();
            }
        } catch (IOException e) {
            throw new RuntimeException("Cannot copy media. Mes: " + e.getMessage());
        }
    }

    public static String getPhotoPath(MultipartFile file) {
        try {
            File fileImage = convertMultipartFileToFile(file);

            String imageName = generateUniqueFileName(file.getOriginalFilename());

            Path source = Paths.get(fileImage.getAbsolutePath());
            Path destination = Paths.get(MEDIA_PATH + IMAGE_PREFIX + imageName);
            Files.copy(source, destination, StandardCopyOption.REPLACE_EXISTING);

            fileImage.delete();
            return destination.toString();
        } catch (IOException e) {
            throw new RuntimeException("Cannot copy image. Mes: " + e.getMessage());
        }
    }
}
