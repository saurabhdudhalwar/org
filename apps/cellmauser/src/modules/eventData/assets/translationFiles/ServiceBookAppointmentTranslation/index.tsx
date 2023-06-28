import English from "./ServiceBookAppointmentTranslation_English.json";
import French from "./ServiceBookAppointmentTranslation_French.json";
import Marathi from "./ServiceBookAppointmentTranslation_Marathi.json";
import Spanish from "./ServiceBookAppointmentTranslation_Spanish.json";
import { getLanguageIndex } from "../../../../../utils/GeneralUtils";

const t = (key: string): any => {
  const translation = [English, Marathi, Spanish, French];
  const changeLanguage: any = translation[getLanguageIndex()];
  return changeLanguage[key];
};

export default t;
