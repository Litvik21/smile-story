package stomat.ssback;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import stomat.ssback.config.Config;

@SpringBootApplication
public class SsBackApplication {

    public static void main(String[] args) {
        Config.initConfig();
        SpringApplication.run(SsBackApplication.class, args);
    }

}
