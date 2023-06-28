import json from "./patientDetailsTranslation.json";

const translate = (key: string, language: string): string => {
  let langData: { [key: string]: string } = {};

  if (language === "EN") {
    langData = json.English;
  } else if (language === "MR") {
    langData = json.Marathi;
  } else if (language === "SP") {
    langData = json.Spanish;
  }
  return langData[key];
};

export default translate;
