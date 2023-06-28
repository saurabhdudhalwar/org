import English from "./rejectedServiceOnReferralTranslation_English.json";
import French from "./rejectedServiceOnReferralTranslation_French.json";
import Marathi from "./rejectedServiceOnReferralTranslation_Marathi.json";
import Spanish from "./rejectedServiceOnReferralTranslation_Spanish.json";
import { getLanguageIndex } from "../../../../../utils/GeneralUtils";

const t = (key: string): any => {
  const translation = [English, Marathi, Spanish, French];
  const changeLanguage: any = translation[getLanguageIndex()];
  return changeLanguage[key];
};

export default t;
