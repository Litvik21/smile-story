package stomat.ssback.model.medication;

import stomat.ssback.model.Sex;

public enum Alignment {
    THREE("3-3 зуба"),
    FIVE("5-5 зубов"),
    SEVEN("7-7 зубов");
    private String value;

    Alignment(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }

    public static Alignment fromValue(String value) {
        for (Alignment alignment : Alignment.values()) {
            if (alignment.value.equals(value)) {
                return alignment;
            }
        }
        throw new IllegalArgumentException("No enum constant with value: " + value);
    }
}
