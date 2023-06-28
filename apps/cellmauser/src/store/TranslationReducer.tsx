import { LangAction, LangState, SET_LANGUAGE } from "./TranslationAction";

const localStorageLang = localStorage.getItem("language");

const initialState: LangState = {
  language: localStorageLang || "EN",
};

const translationReducer = (state = initialState, action: LangAction) => {
  switch (action.type) {
    case SET_LANGUAGE:
      return {
        ...state,
        language: action.payload,
      };

    default:
      return state;
  }
};

export default translationReducer;
