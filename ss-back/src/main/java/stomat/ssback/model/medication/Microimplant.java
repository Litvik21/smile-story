package stomat.ssback.model.medication;

public enum Microimplant {
    IF("Если необходимо"),
    NO("Нет"),
    YES("Да");
    private String value;

    Microimplant(String value) {
        this.value = value;
    }

    public static Microimplant fromValue(String value) {
        for (Microimplant microimplant : Microimplant.values()) {
            if (microimplant.value.equals(value)) {
                return microimplant;
            }
        }
        throw new IllegalArgumentException("No enum constant with value: " + value);
    }
}
