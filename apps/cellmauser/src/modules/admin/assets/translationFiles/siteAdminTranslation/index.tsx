import English from "./siteAdminTranslation_English.json";
import French from "./siteAdminTranslation_French.json";
import Marathi from "./siteAdminTranslation_Marathi.json";
import Spanish from "./siteAdminTranslation_Spanish.json";
import { getLanguageIndex } from "../../../../../utils/GeneralUtils";

const t = (key: string): any => {
  const translation = [English, Marathi, Spanish, French];
  const changeLanguage: any = translation[getLanguageIndex()];
  return changeLanguage[key];
};

export default t;
