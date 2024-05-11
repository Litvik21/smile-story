export interface GeneralInfo {
  id: number;
  firstName: string;
  surName: string;
  sex: Sex;
  phone: string;
  birthDate: string;
}

export enum Sex {
  MAN ='Мужчина',
  WOMAN = 'Женщина'
}

export const SexMapping = {
  [Sex.MAN]: "Мужчина",
  [Sex.WOMAN]: "Женщина"
}
