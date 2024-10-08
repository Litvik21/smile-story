package stomat.ssback.utils;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Locale;

@Component
@AllArgsConstructor
public class DescriptionUtil {

    public String addNew(String description) {
        LocalDateTime dateTime = LocalDateTime.now();
        StringBuilder builder = new StringBuilder("\n");
        builder.append("[").append(formatDate(dateTime)).append("]\n")
                .append(description);

        return builder.toString();
    }

    public String update(String description, String newDesc) {
        LocalDateTime dateTime = LocalDateTime.now();
        StringBuilder builder = new StringBuilder(description);
        builder.append("\n")
                .append("-----------------------------------")
                .append("\n")
                .append("[")
                .append(formatDate(dateTime))
                .append("]\n")
                .append(newDesc);

        return builder.toString();
    }

    private String formatDate(LocalDateTime dateTime) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd MMMM yyyy", new Locale("ru"));
        return dateTime.format(formatter);
    }
}
