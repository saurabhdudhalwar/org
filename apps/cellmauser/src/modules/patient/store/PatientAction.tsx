export const SET_ISPATIENTSELECTED = "SET_ISPATIENTSELECTED";
export const SET_ISPINSELECTED = "SET_ISPINSELECTED";
export const SET_ISCUSTOMIZEVIEW = "SET_ISCUSTOMIZEVIEW";
export const SET_ISSINGLEPATIENTSELECTED = "SET_ISSINGLEPATIENTSELECTED";
export const SET_ISMULTIPLEPATIENTSELECTED = "SET_ISMULTIPLEPATIENTSELECTED";
export const SET_ISPATIENTDEATH = "SET_ISPATIENTDEATH";
export const SET_ISEXISITINGPATIENT = "SET_ISEXISITINGPATIENT";
export const SET_ISCONTACTTYPESELECTED = "SET_ISCONTACTTYPESELECTED";
export const SET_ISBANNEROPEN = "SET_ISBANNEROPEN";
export const SET_PATIENTID = "SET_PATIENTID";
export const SET_PIP_PATIENTID = "SET_PIP_PATIENTID";
export const SET_ISSHOWGPFULLNAME = "SET_ISSHOWGPFULLNAME";
export const SET_ISSHOWPATIENTIDENTIFIER = "SET_ISSHOWPATIENTIDENTIFIER";
export const SET_PAGENUMBER = "SET_PAGENUMBER";
export const SET_CREATE_PATIENT_ACTIVE_STEP = "SET_CREATE_PATIENT_ACTIVE_STEP";
export const SET_ACTIVESCREENNAME = "SET_ACTIVESCREENNAME";
export const SET_ISPATIENTCURRENTLOCATION = "SET_ISPATIENTCURRENTLOCATION";
export const SET_ISALLOWTOADDMULTIPLEREFERRAL =
  "SET_ISALLOWTOADDMULTIPLEREFERRAL";
export const SET_ADDRESSID = "SET_ADDRESSID";
// find patient page settings
export const SET_HIDEEXPORTBUTTON = "SET_HIDEEXPORTBUTTON";

export const SET_LARGEDATABASE = "SET_LARGEDATABASE";
export const SET_PATIENTINFORMATION = "SET_PATIENTINFORMATION";
export const SET_UNKNOWN_ADD_DROPDOWN = "SET_UNKNOWN_ADD_DROPDOWN";
export const SET_CLI_GEO_MAP_LINK_ON_ADDRESS_PAGE =
  "SET_CLI_GEO_MAP_LINK_ON_ADDRESS_PAGE";
export const SET_EST_PAT_SEARCH_IDENTIFIER_MANDATORY =
  "SET_EST_PAT_SEARCH_IDENTIFIER_MANDATORY";
export const SET_RENAME_PAT_IDENTIFIER_TO_PAYROLL_NO =
  "SET_RENAME_PAT_IDENTIFIER_TO_PAYROLL_NO";
export const SET_BYPASS_PAT_DETAILS = "SET_BYPASS_PAT_DETAILS";
export const SET_HIDE_PATIENT_REMINDERS_POPUP =
  "SET_HIDE_PATIENT_REMINDERS_POPUP";
export const SET_PATIENT_MOBILE_MANDATORY = "SET_PATIENT_MOBILE_MANDATORY";

export const SET_EST_USE_CELLMA_INTERFACE = "SET_EST_USE_CELLMA_INTERFACE";
export const SET_DISPLAY_PROCEDURE_DEVICE_LIST =
  "SET_DISPLAY_PROCEDURE_DEVICE_LIST";
export const SET_PREVENT_DEMOGRAPHICS_CHANGE =
  "SET_PREVENT_DEMOGRAPHICS_CHANGE";
export const SET_ALLOW_TO_OPEN_IN_HTML = "SET_ALLOW_TO_OPEN_IN_HTML";
export const SET_PATIENT_DOD = "SET_PATIENT_DOD";
export const SET_SGRID = "SET_SGRID";
export const SET_EST_HIDE_PIP_ON_EMAIL_MOBILE_PAGE =
  "SET_EST_HIDE_PIP_ON_EMAIL_MOBILE_PAGE";
export const SET_EST_SHOW_IN_SERVICE_PATIENT =
  "SET_EST_SHOW_IN_SERVICE_PATIENTS";
export const SET_EST_USE_ADDRESS_LOOKUP = "SET_EST_USE_ADDRESS_LOOKUP";
export const SET_EST_ETHNICITY_RELIGION_MANDATORY =
  "SET_EST_ETHNICITY_RELIGION_MANDATORY";
export const SET_EST_HIDE_PIP_SECTIONS_CONSENT_PHOTOGRAPH_TEXT_EMAIL =
  "SET_EST_HIDE_PIP_SECTIONS_CONSENT_PHOTOGRAPH_TEXT_EMAIL";
export const SET_RESET_FORMIK_FORM = "SET_RESET_FORMIK_FORM";

export const setIsPatientSelected = (isSelected: any) => ({
  type: SET_ISPATIENTSELECTED,
  isSelected,
});

export const setIsBannerOpen = (isBannerOpen: any) => ({
  type: SET_ISBANNEROPEN,
  isBannerOpen,
});

export const setIsSinglePatientSearched = (isSinglePatientSearched: any) => ({
  type: SET_ISSINGLEPATIENTSELECTED,
  isSinglePatientSearched,
});
export const setIsMultiplePatientSearched = (
  isMultiplePatientSearched: any
) => ({
  type: SET_ISMULTIPLEPATIENTSELECTED,
  isMultiplePatientSearched,
});
export const setIsPinSelected = (isSelected: any) => ({
  type: SET_ISPINSELECTED,
  isSelected,
});

export const setIsCustomizeView = (isCustomizeView: any) => ({
  type: SET_ISCUSTOMIZEVIEW,
  isCustomizeView,
});

export const setIsPatientDeath = (isPatientDeath: any) => ({
  type: SET_ISPATIENTDEATH,
  isPatientDeath,
});

export const setIsExistingPatient = (isExistingPatient: any) => ({
  type: SET_ISEXISITINGPATIENT,
  isExistingPatient,
});

export const setIsContactTypeSelected = (isContactType: any) => ({
  type: SET_ISCONTACTTYPESELECTED,
  isContactType,
});

export const setPatientId = (patientId: any) => ({
  type: SET_PATIENTID,
  patientId,
});

export const setPipPatientId = (pipPatientId: any) => ({
  type: SET_PIP_PATIENTID,
  pipPatientId,
});

export const setIsShowGpFullName = (isShowGpFullName: any) => ({
  type: SET_ISSHOWGPFULLNAME,
  isShowGpFullName,
});

export const setIsShowPatientIdentifier = (isShowPatientIdentifier: any) => ({
  type: SET_ISSHOWPATIENTIDENTIFIER,
  isShowPatientIdentifier,
});

export const setIsPatientCurrentLocation = (isPatientCurrentLocation: any) => ({
  type: SET_ISPATIENTCURRENTLOCATION,
  isPatientCurrentLocation,
});

export const setActiveScreenName = (activeScreenName: any) => ({
  type: SET_ACTIVESCREENNAME,
  activeScreenName,
});
export const setIsAllowToAddMultipleReferral = (
  isAllowToAddMultipleReferral: any
) => ({
  type: SET_ISALLOWTOADDMULTIPLEREFERRAL,
  isAllowToAddMultipleReferral,
});

export const setPageNumber = (pageNumber: any) => ({
  type: SET_PAGENUMBER,
  pageNumber,
});

export const setAddressId = (addressId: any) => ({
  type: SET_ADDRESSID,
  addressId,
});

export const setHideExportButton = (hideExportButton: any) => ({
  type: SET_HIDEEXPORTBUTTON,
  hideExportButton,
});

export const setLargeDatabase = (largeDatabase: any) => ({
  type: SET_LARGEDATABASE,
  largeDatabase,
});
export const setPatientInformation = (patientInformation: any) => ({
  type: SET_PATIENTINFORMATION,
  patientInformation,
});
export const setEstAddressWizardUnknownAddDropdown = (
  estAddressWizardUnknownAddDropdown: any
) => ({
  type: SET_UNKNOWN_ADD_DROPDOWN,
  estAddressWizardUnknownAddDropdown,
});

export const setCreatePatientActiveStep = (activeStep: any) => ({
  type: SET_CREATE_PATIENT_ACTIVE_STEP,
  activeStep,
});

export const setCliShowGeomapLinkOnAddressPage = (
  cliShowGeomapLinkOnAddressPage: any
) => ({
  type: SET_CLI_GEO_MAP_LINK_ON_ADDRESS_PAGE,
  cliShowGeomapLinkOnAddressPage,
});

export const setCliBypassPatDetails = (cliBypassPatDetails: any) => ({
  type: SET_BYPASS_PAT_DETAILS,
  cliBypassPatDetails,
});

export const setCliHidePatientRemindersPopup = (
  cliHidePatientRemindersPopup: any
) => ({
  type: SET_HIDE_PATIENT_REMINDERS_POPUP,
  cliHidePatientRemindersPopup,
});

export const setCliPatientMobileMandatory = (
  cliPatientMobileMandatory: any
) => ({
  type: SET_PATIENT_MOBILE_MANDATORY,
  cliPatientMobileMandatory,
});

export const setPreventDemographicsChange = (
  preventDemographicsChange: any
) => ({
  type: SET_PREVENT_DEMOGRAPHICS_CHANGE,
  preventDemographicsChange,
});
export const setAllowToOpenInHtml = (allowToOpenInHtml: any) => ({
  type: SET_ALLOW_TO_OPEN_IN_HTML,
  allowToOpenInHtml,
});
export const setPatientDod = (patientDod: any) => ({
  type: SET_PATIENT_DOD,
  patientDod,
});

export const setSgrId = (sgrId: any) => ({
  type: SET_SGRID,
  sgrId,
});

export const setEstHidePipOnEmailMobilePage = (
  estHidePipOnEmailMobilePage: any
) => ({
  type: SET_EST_HIDE_PIP_ON_EMAIL_MOBILE_PAGE,
  estHidePipOnEmailMobilePage,
});

export const setEstShowInServicePatient = (estShowInServicePatient: any) => ({
  type: SET_EST_SHOW_IN_SERVICE_PATIENT,
  estShowInServicePatient,
});

export const setEstUseAddressLookup = (estUseAddressLookup: any) => ({
  type: SET_EST_USE_ADDRESS_LOOKUP,
  estUseAddressLookup,
});

export const setEstEthnicityReligionMandatory = (
  estEthnicityReligionMandatory: any
) => ({
  type: SET_EST_ETHNICITY_RELIGION_MANDATORY,
  estEthnicityReligionMandatory,
});

export const setEstHidePipSectionsConsentPhotographTextemail = (
  estHidePipSectionsConsentPhotographTextemail: any
) => ({
  type: SET_EST_HIDE_PIP_SECTIONS_CONSENT_PHOTOGRAPH_TEXT_EMAIL,
  estHidePipSectionsConsentPhotographTextemail,
});

export const setResetFormikForm = (resetFormikForm: any) => ({
  type: SET_RESET_FORMIK_FORM,
  resetFormikForm,
});
