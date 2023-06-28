import English from "./commonAdminTranslation_English.json";
import French from "./commonAdminTranslation_French .json";
import Marathi from "./commonAdminTranslation_Marathi.json";
import Spanish from "./commonAdminTranslation_Spanish.json";
import { getLanguageIndex } from "../../../../../utils/GeneralUtils";

const t = (key: string): any => {
  const translation = [English, Marathi, Spanish, French];
  const changeLanguage: any = translation[getLanguageIndex()];
  return changeLanguage[key];
};

export default t;
