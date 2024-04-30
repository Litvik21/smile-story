package stomat.ssback.model.medication;

public enum Medication {
    BOTH("Обе челюсти"),
    UPPER("Верхняя челюсть"),
    LOWER("Нижняя челюсть");
    private String value;

    Medication(String value) {
        this.value = value;
    }

    public static Medication fromValue(String value) {
        for (Medication medication : Medication.values()) {
            if (medication.value.equals(value)) {
                return medication;
            }
        }
        throw new IllegalArgumentException("No enum constant with value: " + value);
    }
}
