import English from "./commonAuthenticationTranslation_English.json";
import French from "./commonAuthenticationTranslation_French.json";
import Marathi from "./commonAuthenticationTranslation_Marathi.json";
import Spanish from "./commonAuthenticationTranslation_Spanish.json";
import { getLanguageIndex } from "../../../../../utils/GeneralUtils";

const t = (key: string): any => {
  const translation = [English, Marathi, Spanish, French];
  const changeLanguage: any = translation[getLanguageIndex()];
  return changeLanguage[key];
};

export default t;
