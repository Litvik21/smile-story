package stomat.ssback.model.medication;

public enum Correction {
    Crowding("Скученность"),
    Spacing("Расстояние"),
    Class_II_div_1("Класс II, раздел 1"),
    Class_II_div_2("Класс II, раздел 2"),
    Class_III("Класс III"),
    Open_Bite("Открытый прикус"),
    Deep_Bite("Глубокий прикус"),
    Anterior_Crossbite("Передний перекрестный прикус"),
    Posterior_Crossbite("Задний перекрестный прикус"),
    Verified("Оверджет"),
    Upper_Midline("Верхняя средняя линия"),
    Lower_Midline("Нижняя средняя линия"),
    Uneven_Smile("Неровная улыбка"),
    Narrow_Arch("Узкая арка"),
    Flared_Teeth("Расклешенные зубы"),
    Extrusion_Tooth("Экструзионный зуб"),
    Intrusion_Tooth("Интрузионный зуб"),
    Rotated_Tooth("Повернутый зуб");

    private String value;

    Correction(String value) {
        this.value = value;
    }

    public static Correction fromValue(String value) {
        for (Correction correction : Correction.values()) {
            if (correction.value.equals(value)) {
                return correction;
            }
        }
        throw new IllegalArgumentException("No enum constant with value: " + value);
    }
}
