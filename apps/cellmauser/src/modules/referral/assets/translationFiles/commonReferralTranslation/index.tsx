import English from "./commonReferralTranslation_English.json";
import French from "./commonReferralTranslation_French.json";
import Marathi from "./commonReferralTranslation_Marathi.json";
import Spanish from "./commonReferralTranslation_Spanish.json";
import { getLanguageIndex } from "../../../../../utils/GeneralUtils";

const t = (key: string): any => {
  const translation = [English, Marathi, Spanish, French];
  const changeLanguage: any = translation[getLanguageIndex()];
  return changeLanguage[key];
};

export default t;
