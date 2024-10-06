package stomat.ssback.config;

import java.io.FileInputStream;
import java.io.IOException;
import java.util.Properties;

public class Config {
    public static void init() {
        String configFilePath = "/Users/litvik/Work/configs/smile.story.properties.txt";
        Properties properties = new Properties();
        try {
            FileInputStream fis = new FileInputStream(configFilePath);
            properties.load(fis);
            fis.close();

            properties.forEach((key, value) -> System.setProperty(key.toString(), value.toString()));

        } catch (IOException e) {
            e.printStackTrace();
        }

    }
}