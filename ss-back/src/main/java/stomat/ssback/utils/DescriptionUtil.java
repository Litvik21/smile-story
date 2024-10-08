package stomat.ssback.utils;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Locale;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Component
@AllArgsConstructor
public class DescriptionUtil {

    public String addNew(String description) {
        String regex = "\\n\\[\\d{2} [а-яА-Я]+ \\d{4}\\]";
        Pattern pattern = Pattern.compile(regex);
        Matcher matcher = pattern.matcher(description);
        if (description == null || description.isEmpty()) {
            return "";
        } else if (matcher.find()) {
            return description;
        }
        LocalDateTime dateTime = LocalDateTime.now();
        StringBuilder builder = new StringBuilder("\n");
        builder.append("[").append(formatDate(dateTime)).append("]\n")
                .append(description);

        return builder.toString();
    }

    public String update(String description, String newDesc) {
        LocalDateTime dateTime = LocalDateTime.now();
        if (description == null || description.isEmpty()) {
            StringBuilder builder = new StringBuilder("\n");
            builder.append("[").append(formatDate(dateTime)).append("]\n")
                    .append(newDesc);

            return builder.toString();
        }
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
