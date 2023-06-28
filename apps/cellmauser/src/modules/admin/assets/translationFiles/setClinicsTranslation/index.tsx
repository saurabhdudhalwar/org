import English from "./setClinicsTranslation_English.json";
import French from "./setClinicsTranslation_French.json";
import Marathi from "./setClinicsTranslation_Marathi.json";
import Spanish from "./setClinicsTranslation_Spanish.json";
import { getLanguageIndex } from "../../../../../utils/GeneralUtils";

const t = (key: string): any => {
  const translation = [English, Marathi, Spanish, French];
  const changeLanguage: any = translation[getLanguageIndex()];
  return changeLanguage[key];
};

export default t;
