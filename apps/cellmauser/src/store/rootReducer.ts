import { combineReducers } from "redux";

import CommonReducer from "./CommonReducer";
import SnackbarReducer from "./SnackbarReducer";
import translationReducer from "./TranslationReducer";
import AdminReducer from "../modules/admin/store/AdminReducer";
import UserAuthReducer from "../modules/authentication/store/UserAuthReducer";
import EventDataReducer from "../modules/eventData/store/EventDataReducer";
import PatientReducer from "../modules/patient/store/PatientReducer";
import ReferralReducer from "../modules/referral/store/ReferralReducer";
import HpDiaryReducer from "../modules/user/store/HpDiaryReducer";
import UserReducer from "../modules/user/store/UserReducer";

const allReducers = combineReducers({
  language: translationReducer,
  patient: PatientReducer,
  user: UserReducer,
  eventDataReducer: EventDataReducer,
  snackbar: SnackbarReducer,
  common: CommonReducer,
  HpDiary: HpDiaryReducer,
  auth: UserAuthReducer,
  admin: AdminReducer,
  referral: ReferralReducer,
});

const rootReducer = (state: any, action: any) => {
  let newState = state;
  if (action.type === "RESET_APP") {
    newState = undefined;
  }

  return allReducers(newState, action);
};

export default rootReducer;
