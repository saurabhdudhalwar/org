import English from "./commonEventDataTranslation_English.json";
import French from "./commonEventDataTranslation_French.json";
import Marathi from "./commonEventDataTranslation_Marathi.json";
import Spanish from "./commonEventDataTranslation_Spanish.json";
import { getLanguageIndex } from "../../../../../utils/GeneralUtils";

const t = (key: string): any => {
  const translation = [English, Marathi, Spanish, French];
  const changeLanguage: any = translation[getLanguageIndex()];
  return changeLanguage[key];
};

export default t;
