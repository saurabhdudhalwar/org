import English from "./homeTranslation_English.json";
import French from "./homeTranslation_French.json";
import Marathi from "./homeTranslation_Marathi.json";
import Spanish from "./homeTranslation_Spanish.json";
import { getLanguageIndex } from "../../../../../utils/GeneralUtils";

const t = (key: string): any => {
  const translation = [English, Marathi, Spanish, French];
  const changeLanguage: any = translation[getLanguageIndex()];
  return changeLanguage[key];
};

export default t;
