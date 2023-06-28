export const SET_USERNAME = "SET_USERNAME";
export const SET_TOKEN = "SET_TOKEN";
export const SET_ESTID = "SET_ESTID";
export const SET_CLIID = "SET_CLIID";
export const SET_USER_ROLES = "SET_USER_ROLES";
export const SET_ADMINISTRATION = "SET_ADMINISTRATION";
export const SET_REGISTRATION = "SET_REGISTRATION";
export const SET_EST_CODE_PREFERENCE = "EST_CODE_PREFERENCE";
export const SET_EST_PATIENT_POSTCODE_SEARCH = "EST_PATIENT_POSTCODE_SEARCH";
export const SET_ISRESETPASSWORDONNEXTLOGIN = "SET_ISRESETPASSWORDONNEXTLOGIN";
export const SET_EST_PATIENT_POSTCODE_MANDATORY =
  "EST_PATIENT_POSTCODE_MANDATORY";

export const setUsername = (userName: string) => ({
  type: SET_USERNAME,
  userName,
});

export const setToken = (token: string) => ({
  type: SET_TOKEN,
  token,
});

export const setEstID = (estID: string) => ({
  type: SET_ESTID,
  estID,
});

export const setCliID = (cliID: string) => ({
  type: SET_CLIID,
  cliID,
});

export const setUserRoles = (userRoles: string[]) => ({
  type: SET_USER_ROLES,
  userRoles,
});

export const setAdministration = (administration: string) => ({
  type: SET_ADMINISTRATION,
  administration,
});

export const setRegistration = (registration: string) => ({
  type: SET_REGISTRATION,
  registration,
});

export const setEstCodePreference = (estCodePreference: any) => ({
  type: SET_EST_CODE_PREFERENCE,
  estCodePreference,
});

export const setEstPatientPostCodeSearch = (estPatientPostcodeSearch: any) => ({
  type: SET_EST_PATIENT_POSTCODE_SEARCH,
  estPatientPostcodeSearch,
});

export const setIsResetPasswordOnNextLogin = (
  isResetPasswordOnNextLogin: any
) => ({
  type: SET_ISRESETPASSWORDONNEXTLOGIN,
  isResetPasswordOnNextLogin,
});

export const setEstPatientPostCodeMandatory = (
  estPatientPostcodeMandatory: any
) => ({
  type: SET_EST_PATIENT_POSTCODE_MANDATORY,
  estPatientPostcodeMandatory,
});
