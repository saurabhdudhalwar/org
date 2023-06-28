import English from "./loginTranslation_English.json";
import French from "./loginTranslation_French.json";
import Marathi from "./loginTranslation_Marathi.json";
import Spanish from "./loginTranslation_Spanish.json";
import { getLanguageIndex } from "../../../../../utils/GeneralUtils";

const t = (key: string): any => {
  const translation = [English, Marathi, Spanish, French];
  const changeLanguage: any = translation[getLanguageIndex()];
  return changeLanguage[key];
};

export default t;
