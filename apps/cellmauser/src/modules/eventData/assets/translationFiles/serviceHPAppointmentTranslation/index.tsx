import English from "./ServiceHPAppointmentTranslation_English.json";
import French from "./ServiceHPAppointmentTranslation_French.json";
import Marathi from "./ServiceHPAppointmentTranslation_Marathi.json";
import Spanish from "./ServiceHPAppointmentTranslation_Spanish.json";
import { getLanguageIndex } from "../../../../../utils/GeneralUtils";

const t = (key: string): any => {
  const translation = [English, Marathi, Spanish, French];
  const changeLanguage: any = translation[getLanguageIndex()];
  return changeLanguage[key];
};

export default t;
