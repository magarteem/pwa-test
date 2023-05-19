import { InterfaceGlobalSelectType } from "../../../types/interfaseGlobal/interfaseGlobalSelect";
import { EnumTypeAccount } from "../../../types/PROFILE/enum/EnumTypeAccount";
import { EnumTypeGender } from "../../../types/PROFILE/enum/EnumTypeGender";
import { EnumSkillType } from "../../../types/PROFILE/enum/EnumSkillType";
import { EnumPrivateType } from "../../../types/PROFILE/enum/EnumPrivateType";

export const optionsTypeAccount: InterfaceGlobalSelectType[] = [
  { id: EnumTypeAccount.MUSICIAN, name: "Музыкант" },
  { id: EnumTypeAccount.TEAM, name: "Группа / Коллектив" },
  {
    id: EnumTypeAccount.INSTITUTION,
    name: "Заведение / Площадка для выступлений",
  },
  {
    id: EnumTypeAccount.MUSICIAN_SCHOOL,
    name: "Музыкальная школа",
  },
  {
    id: EnumTypeAccount.REHEARSAL_BASE,
    name: "Репетиционная точка",
  },
  {
    id: EnumTypeAccount.MUSIC_SHOP,
    name: "Музыкальный магазин",
  },
  {
    id: EnumTypeAccount.MUSICAL_WORKSHOP,
    name: "Мастерская музыкальных инструментов",
  },
  {
    id: EnumTypeAccount.SOUND_PRODUCER,
    name: "Звукорежиссёр",
  },
  {
    id: EnumTypeAccount.RECORDING_STUDIO,
    name: "Студия звукозаписи",
  },
];

export const genderBD: InterfaceGlobalSelectType[] = [
  { id: EnumTypeGender.MALE, name: "Мужской" },
  { id: EnumTypeGender.FEMALE, name: "Женский" },
  { id: EnumTypeGender.OTHER, name: "Другое" },
];


export const skillBD: InterfaceGlobalSelectType[] = [
  { id: EnumSkillType.NO_SKILL, name: "Диванный" },
  { id: EnumSkillType.NEWBIE, name: "Новичок" },
  { id: EnumSkillType.CONFIDENT, name: "Уверенный" },
  { id: EnumSkillType.MASTER, name: "Мастер" },
  { id: EnumSkillType.START, name: "Звезда" },
  { id: EnumSkillType.TEACHER, name: "Преподаватель" },
];

export const profilePrivacySettings: InterfaceGlobalSelectType[] = [
  {
    id: EnumPrivateType.SHOW_ALL,
    name: "Публичная анкета",
  },
  {
    id: EnumPrivateType.HIDE_CONTACTS,
    name: "Частично открытая анкета",
  },
  { id: EnumPrivateType.HIDE_ALL, name: "Закрытая анкета " },
];
