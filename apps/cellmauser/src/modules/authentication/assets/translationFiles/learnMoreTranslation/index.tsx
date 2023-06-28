import English from "./learnMoreTranslation_English.json";
import French from "./learnMoreTranslation_French.json";
import Marathi from "./learnMoreTranslation_Marathi.json";
import Spanish from "./learnMoreTranslation_Spanish.json";
import { getLanguageIndex } from "../../../../../utils/GeneralUtils";

const t = (key: string): any => {
  const translation = [English, Marathi, Spanish, French];
  const changeLanguage: any = translation[getLanguageIndex()];
  return changeLanguage[key];
};

export default t;
