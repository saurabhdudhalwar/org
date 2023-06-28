import English from "./addReferralTranslation_English.json";
import French from "./addReferralTranslation_French.json";
import Marathi from "./addReferralTranslation_Marathi.json";
import Spanish from "./addReferralTranslation_Spanish.json";
import { getLanguageIndex } from "../../../../../utils/GeneralUtils";

const t = (key: string): any => {
  const translation = [English, Marathi, Spanish, French];
  const changeLanguage: any = translation[getLanguageIndex()];
  return changeLanguage[key];
};

export default t;
