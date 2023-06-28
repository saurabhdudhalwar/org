import English from "./accessibilityTranslation_English.json";
import French from "./accessibilityTranslation_French.json";
import Marathi from "./accessibilityTranslation_Marathi.json";
import Spanish from "./accessibilityTranslation_Spanish.json";
import { getLanguageIndex } from "../../../../../utils/GeneralUtils";

const t = (key: string): any => {
  const translation = [English, Marathi, Spanish, French];
  const changeLanguage: any = translation[getLanguageIndex()];
  return changeLanguage[key];
};

export default t;
