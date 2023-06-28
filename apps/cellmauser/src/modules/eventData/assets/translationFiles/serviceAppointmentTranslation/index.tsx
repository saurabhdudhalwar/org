import English from "./ServiceAppointmentTranslation_English.json";
import French from "./ServiceAppointmentTranslation_French.json";
import Marathi from "./ServiceAppointmentTranslation_Marathi.json";
import Spanish from "./ServiceAppointmentTranslation_Spanish.json";
import { getLanguageIndex } from "../../../../../utils/GeneralUtils";

const t = (key: string): any => {
  const translation = [English, Marathi, Spanish, French];
  const changeLanguage: any = translation[getLanguageIndex()];
  return changeLanguage[key];
};

export default t;
