import English from "./ourPendingOnReferralTranslation_English.json";
import French from "./ourPendingOnReferralTranslation_French.json";
import Marathi from "./ourPendingOnReferralTranslation_Marathi.json";
import Spanish from "./ourPendingOnReferralTranslation_Spanish.json";
import { getLanguageIndex } from "../../../../../utils/GeneralUtils";

const t = (key: string): any => {
  const translation = [English, Marathi, Spanish, French];
  const changeLanguage: any = translation[getLanguageIndex()];
  return changeLanguage[key];
};

export default t;
