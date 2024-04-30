export interface WishesMedication {
  id: number;
  medication: Medication;
  alignment: Alignment;
  extraction: Extraction
  microimplant: Microimplant;
  correction: Correction[];
  description: string;
}

export enum Medication {
  BOTH = "Обе челюсти",
  UPPER = "Верхняя челюсть",
  LOWER = "Нижняя челюсть"
}

export const MedicationMapping = {
  [Medication.BOTH]: "Обе челюсти",
  [Medication.UPPER]: "Верхняя челюсть",
  [Medication.LOWER]: "Нижняя челюсть",
}

export enum Correction {
  Crowding = "Скученность",
  Spacing = "Расстояние",
  Class_II_div_1 = "Класс II, раздел 1",
  Class_II_div_2 = "Класс II, раздел 2",
  Class_III = "Класс III",
  Open_Bite = "Открытый прикус",
  Deep_Bite = "Глубокий прикус",
  Anterior_Crossbite = "Передний перекрестный прикус",
  Posterior_Crossbite = "Задний перекрестный прикус",
  Verified = "Оверджет",
  Upper_Midline = "Верхняя средняя линия",
  Lower_Midline = "Нижняя средняя линия",
  Uneven_Smile = "Неровная улыбка",
  Narrow_Arch = "Узкая арка",
  Flared_Teeth = "Расклешенные зубы",
  Extrusion_Tooth = "Экструзионный зуб",
  Intrusion_Tooth = "Интрузионный зуб",
  Rotated_Tooth = "Повернутый зуб"
}

export const CorrectionMapping = {
  [Correction.Crowding]: "Скученность",
  [Correction.Spacing]: "Расстояние",
  [Correction.Class_II_div_1]: "Класс II, раздел 1",
  [Correction.Class_II_div_2]: "Класс II, раздел 2",
  [Correction.Class_III]: "Класс III",
  [Correction.Open_Bite]: "Открытый прикус",
  [Correction.Deep_Bite]: "Глубокий прикус",
  [Correction.Anterior_Crossbite]: "Передний перекрестный прикус",
  [Correction.Posterior_Crossbite]: "Задний перекрестный прикус",
  [Correction.Verified]: "Оверджет",
  [Correction.Upper_Midline]: "Верхняя средняя линия",
  [Correction.Lower_Midline]: "Нижняя средняя линия",
  [Correction.Uneven_Smile]: "Неровная улыбка",
  [Correction.Narrow_Arch]: "Узкая арка",
  [Correction.Flared_Teeth]: "Расклешенные зубы",
  [Correction.Extrusion_Tooth]: "Экструзионный зуб",
  [Correction.Intrusion_Tooth]: "Интрузионный зуб",
  [Correction.Rotated_Tooth]: "Повернутый зуб",
}

export enum Microimplant {
  IF = "Если необходимо",
  NO = "Нет",
  YES = "Да"
}

export const MicroimplantMapping = {
  [Microimplant.IF]: "Если необходимо",
  [Microimplant.NO]: "Нет",
  [Microimplant.YES]: "Да",
}

export enum Extraction {
  IF = "Если необходимо",
  NO = "Нет",
  YES = "Да"
}

export const ExtractionMapping = {
  [Extraction.IF]: "Если необходимо",
  [Extraction.NO]: "Нет",
  [Extraction.YES]: "Да",
}

export enum Alignment {
  THREE = "3-3 зуба",
  FIVE = "5-5 зубов",
  SEVEN = "7-7 зубов"
}

export const AlignmentMapping = {
  [Alignment.THREE]: "3-3 зуба",
  [Alignment.FIVE]: "5-5 зубов",
  [Alignment.SEVEN]: "7-7 зубов",
}
