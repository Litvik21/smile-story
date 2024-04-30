package stomat.ssback.model;

public enum Sex {
    WOMAN("Женщина"),
    MAN("Мужчина");

    private String value;

    Sex(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }

    public static Sex fromValue(String value) {
        for (Sex sex : Sex.values()) {
            if (sex.value.equals(value)) {
                return sex;
            }
        }
        throw new IllegalArgumentException("No enum constant with value: " + value);
    }
}

