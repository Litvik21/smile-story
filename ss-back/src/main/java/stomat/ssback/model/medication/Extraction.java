package stomat.ssback.model.medication;

public enum Extraction {
    IF("Если необходимо"),
    NO("Нет"),
    YES("Да");
    private String value;

    Extraction(String value) {
        this.value = value;
    }

    public static Extraction fromValue(String value) {
        for (Extraction extraction : Extraction.values()) {
            if (extraction.value.equals(value)) {
                return extraction;
            }
        }
        throw new IllegalArgumentException("No enum constant with value: " + value);
    }
}
