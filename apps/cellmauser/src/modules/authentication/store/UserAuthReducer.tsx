import {
  SET_ADMINISTRATION,
  SET_CLIID,
  SET_EST_CODE_PREFERENCE,
  SET_EST_PATIENT_POSTCODE_MANDATORY,
  SET_EST_PATIENT_POSTCODE_SEARCH,
  SET_ESTID,
  SET_ISRESETPASSWORDONNEXTLOGIN,
  SET_REGISTRATION,
  SET_TOKEN,
  SET_USER_ROLES,
  SET_USERNAME,
} from "./UserAuthAction";

const initialSatate = {
  userName: "",
  token: "",
  estID: "",
  cliID: "",
  userRoles: [],
  administration: 0,
  estPatientPostcodeSearch: "",
  isResetPasswordOnNextLogin: false,
  estPatientPostcodeMandatory: "",
};

const UserAuthReducer = (state = initialSatate, action: any) => {
  switch (action.type) {
    case SET_USERNAME:
      return {
        ...state,
        userName: action.userName,
      };
    case SET_TOKEN:
      return {
        ...state,
        token: action.token,
      };
    case SET_ESTID:
      return {
        ...state,
        estID: action.estID,
      };
    case SET_CLIID:
      return {
        ...state,
        cliID: action.cliID,
      };
    case SET_USER_ROLES:
      return {
        ...state,
        userRoles: action.userRoles,
      };
    case SET_ADMINISTRATION:
      return {
        ...state,
        administration: action.administration,
      };
    case SET_REGISTRATION:
      return {
        ...state,
        registration: action.registration,
      };
    case SET_EST_CODE_PREFERENCE:
      return {
        ...state,
        estCodePreference: action.estCodePreference,
      };
    case SET_EST_PATIENT_POSTCODE_SEARCH:
      return {
        ...state,
        estPatientPostcodeSearch: action.estPatientPostcodeSearch,
      };

    case SET_ISRESETPASSWORDONNEXTLOGIN:
      return {
        ...state,
        isResetPasswordOnNextLogin: action.isResetPasswordOnNextLogin,
      };
    case SET_EST_PATIENT_POSTCODE_MANDATORY:
      return {
        ...state,
        estPatientPostcodeMandatory: action.estPatientPostcodeMandatory,
      };

    default:
      return state;
  }
};

export default UserAuthReducer;
