import { InterfaceGlobalSelectType } from "../../../types/interfaseGlobal/interfaseGlobalSelect";
import { EnumNewsThemeType } from "../../../types/PROFILE/enum/EnumNewsThemeType";

export const optionСategoryBD: InterfaceGlobalSelectType[] = [
  { id: EnumNewsThemeType.MUSIC_NEWS, name: "В мире музыки" },
  { id: EnumNewsThemeType.MEME, name: "Мемология" },
  { id: EnumNewsThemeType.PLAYBILL, name: "Реклама" },
  {
    id: EnumNewsThemeType.TECHNICAL_QUESTION,
    name: "Технические вопросы",
  },
];

export const selectTypeNews: { [key: string]: string } = {
  Tritone: "Афиша",
  MusicNews: "В мире музыки",
  Meme: "Мемология",
  Playbill: "Реклама",
  TechnicalQuestion: "Технические вопросы",
};
