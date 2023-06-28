import json from "./singlePatientDrawerTranslation.json";

const translate = (key: string, language: string): string => {
  let langData: { [key: string]: string } = {};

  if (language === "EN") {
    langData = json.English;
  } else if (language === "MR") {
    langData = json.Marathi;
  }
  return langData[key];
};

export default translate;
