export const SET_LANGUAGE = "SET_LANGUAGE";

export interface LangState {
  language: string;
}

export interface LangAction {
  type: typeof SET_LANGUAGE;
  payload: string;
}

export const setLanguage = (lang: string): LangAction => {
  localStorage.setItem("language", lang);
  return {
    type: SET_LANGUAGE,
    payload: lang,
  };
};
