import English from "./setRoomsTranslation_English.json";
import French from "./setRoomsTranslation_French.json";
import Marathi from "./setRoomsTranslation_Marathi.json";
import Spanish from "./setRoomsTranslation_Spanish.json";
import { getLanguageIndex } from "../../../../../utils/GeneralUtils";

const t = (key: string): any => {
  const translation = [English, Marathi, Spanish, French];
  const changeLanguage: any = translation[getLanguageIndex()];
  return changeLanguage[key];
};

export default t;
