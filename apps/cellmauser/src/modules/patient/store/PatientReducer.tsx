import {
  SET_ACTIVESCREENNAME,
  SET_ADDRESSID,
  SET_ALLOW_TO_OPEN_IN_HTML,
  SET_BYPASS_PAT_DETAILS,
  SET_CLI_GEO_MAP_LINK_ON_ADDRESS_PAGE,
  SET_CREATE_PATIENT_ACTIVE_STEP,
  SET_DISPLAY_PROCEDURE_DEVICE_LIST,
  SET_EST_ETHNICITY_RELIGION_MANDATORY,
  SET_EST_HIDE_PIP_ON_EMAIL_MOBILE_PAGE,
  SET_EST_HIDE_PIP_SECTIONS_CONSENT_PHOTOGRAPH_TEXT_EMAIL,
  SET_EST_SHOW_IN_SERVICE_PATIENT,
  SET_EST_USE_ADDRESS_LOOKUP,
  SET_HIDE_PATIENT_REMINDERS_POPUP,
  SET_HIDEEXPORTBUTTON,
  SET_ISALLOWTOADDMULTIPLEREFERRAL,
  SET_ISBANNEROPEN,
  SET_ISCONTACTTYPESELECTED,
  SET_ISCUSTOMIZEVIEW,
  SET_ISEXISITINGPATIENT,
  SET_ISMULTIPLEPATIENTSELECTED,
  SET_ISPATIENTCURRENTLOCATION,
  SET_ISPATIENTDEATH,
  SET_ISPATIENTSELECTED,
  SET_ISPINSELECTED,
  SET_ISSHOWGPFULLNAME,
  SET_ISSHOWPATIENTIDENTIFIER,
  SET_ISSINGLEPATIENTSELECTED,
  SET_LARGEDATABASE,
  SET_PAGENUMBER,
  SET_PATIENT_DOD,
  SET_PATIENT_MOBILE_MANDATORY,
  SET_PATIENTID,
  SET_PATIENTINFORMATION,
  SET_PIP_PATIENTID,
  SET_PREVENT_DEMOGRAPHICS_CHANGE,
  SET_RESET_FORMIK_FORM,
  SET_SGRID,
  SET_UNKNOWN_ADD_DROPDOWN,
} from "./PatientAction";

const initialState = {
  isPatientSelected: false,
  isBannerOpen: false,
  isPinSelected: false,
  isCustomizeView: false,
  isSinglePatientSearched: false,
  isMultiplePatientSearched: false,
  isDeathPatientSelected: false,
  isExistingPatientSelected: false,
  isContactTypeSelected: false,
  patientId: null,
  pipPatientId: null,
  isShowGpFullName: false, // Set default Preference setting "Show GP full name".
  isShowPatientIdentification: true, // Show Patient Unique/Photographic Identifications" is set to YES.
  isPatientCurrentLocation: false, // Show "Patient Current Location" is set to YES.
  isAllowToAddMultipleReferral: false, // Show "Allow to Add multiple referrals" is set to YES.
  pageNumber: 1,
  hideExportButton: false,
  demoLinkPageLnull: false,
  largeDatabase: false,
  patientInformation: {},
  isScreenActive: "",
  estAddressWizardUnknownAddDropdown: 0,
  cliBypassPatDetails: 0,
  cliHidePatientRemindersPopup: 1,
  cliPatientMobileMandatory: 0,
  displayProcedureDeviceList: 0,
  activeStep: 0,
  cliShowGeomapLinkOnAddressPage: 0,
  preventDemographicsChange: "",
  allowToOpenInHtml: false,
  patientDod: "",
  sgrId: 0,
  estHidePipOnEmailMobilePage: false,
  estShowInServicePatient: false,
  estUseAddressLookup: "",
  estEthnicityReligionMandatory: "",
  estHidePipSectionsConsentPhotographTextemail: "",
  resetFormikForm: false,
};

const PatientReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_ISPATIENTSELECTED:
      return {
        ...state,
        isPatientSelected: action.isSelected,
      };

    case SET_ISBANNEROPEN:
      return {
        ...state,
        isBannerOpen: action.isBannerOpen,
      };

    case SET_ISPINSELECTED:
      return {
        ...state,
        isPinSelected: action.isSelected,
      };
    case SET_ISCUSTOMIZEVIEW:
      return {
        ...state,
        isCustomizeView: action.isCustomizeView,
      };
    case SET_ISSINGLEPATIENTSELECTED:
      return {
        ...state,
        isSinglePatientSearched: action.isSinglePatientSearched,
      };
    case SET_ISMULTIPLEPATIENTSELECTED:
      return {
        ...state,
        isMultiplePatientSearched: action.isMultiplePatientSearched,
      };
    case SET_ISPATIENTDEATH:
      return {
        ...state,
        isDeathPatientSelected: action.isPatientDeath,
      };
    case SET_ISEXISITINGPATIENT:
      return {
        ...state,
        isExistingPatientSelected: action.isExistingPatient,
      };
    case SET_ISCONTACTTYPESELECTED:
      return {
        ...state,
        isContactTypeSelected: action.isContactType,
      };
    case SET_PATIENTID:
      return {
        ...state,
        patientId: action.patientId,
      };
    case SET_PIP_PATIENTID:
      return {
        ...state,
        pipPatientId: action.pipPatientId,
      };
    case SET_ISSHOWGPFULLNAME:
      return {
        ...state,
        isShowGpFullName: action.isShowGpFullName,
      };
    case SET_ISSHOWPATIENTIDENTIFIER:
      return {
        ...state,
        isShowPatientIdentifier: action.isShowPatientIdentifier,
      };
    case SET_ACTIVESCREENNAME:
      return {
        ...state,
        activeScreenName: action.activeScreenName,
      };
    case SET_ISPATIENTCURRENTLOCATION:
      return {
        ...state,
        isPatientCurrentLocation: action.isPatientCurrentLocation,
      };
    case SET_ISALLOWTOADDMULTIPLEREFERRAL:
      return {
        ...state,
        isAllowToAddMultipleReferral: action.isAllowToAddMultipleReferral,
      };
    case SET_PAGENUMBER:
      return {
        ...state,
        pageNumber: action.pageNumber,
      };
    case SET_ADDRESSID:
      return {
        ...state,
        addressId: action.addressId,
      };
    case SET_HIDEEXPORTBUTTON:
      return {
        ...state,
        hideExportButton: action.hideExportButton,
      };
    case SET_LARGEDATABASE:
      return {
        ...state,
        largeDatabase: action.largeDatabase,
      };
    case SET_PATIENTINFORMATION:
      return {
        ...state,
        patientInformation: action.patientInformation,
      };
    case SET_UNKNOWN_ADD_DROPDOWN:
      return {
        ...state,
        estAddressWizardUnknownAddDropdown:
          action.estAddressWizardUnknownAddDropdown,
      };
    case SET_BYPASS_PAT_DETAILS:
      return {
        ...state,
        cliBypassPatDetails: action.cliBypassPatDetails,
      };
    case SET_CREATE_PATIENT_ACTIVE_STEP:
      return {
        ...state,
        activeStep: action.activeStep,
      };
    case SET_HIDE_PATIENT_REMINDERS_POPUP:
      return {
        ...state,
        cliHidePatientRemindersPopup: action.cliHidePatientRemindersPopup,
      };
    case SET_PATIENT_MOBILE_MANDATORY:
      return {
        ...state,
        cliPatientMobileMandatory: action.cliPatientMobileMandatory,
      };
    case SET_CLI_GEO_MAP_LINK_ON_ADDRESS_PAGE:
      return {
        ...state,
        cliShowGeomapLinkOnAddressPage: action.cliShowGeomapLinkOnAddressPage,
      };
    case SET_DISPLAY_PROCEDURE_DEVICE_LIST:
      return {
        ...state,
        displayProcedureDeviceList: action.displayProcedureDeviceList,
      };
    case SET_PREVENT_DEMOGRAPHICS_CHANGE:
      return {
        ...state,
        preventDemographicsChange: action.preventDemographicsChange,
      };
    case SET_ALLOW_TO_OPEN_IN_HTML:
      return {
        ...state,
        allowToOpenInHtml: action.allowToOpenInHTML,
      };
    case SET_PATIENT_DOD:
      return {
        ...state,
        patientDod: action.patientDod,
      };
    case SET_SGRID:
      return {
        ...state,
        sgrId: action.sgrId,
      };
    case SET_EST_HIDE_PIP_ON_EMAIL_MOBILE_PAGE:
      return {
        ...state,
        estHidePipOnEmailMobilePage: action.estHidePipOnEmailMobilePage,
      };
    case SET_EST_SHOW_IN_SERVICE_PATIENT:
      return {
        ...state,
        estShowInServicePatient: action.estShowInServicePatient,
      };
    case SET_EST_USE_ADDRESS_LOOKUP:
      return {
        ...state,
        estUseAddressLookup: action.estUseAddressLookup,
      };
    case SET_EST_ETHNICITY_RELIGION_MANDATORY:
      return {
        ...state,
        estEthnicityReligionMandatory: action.estEthnicityReligionMandatory,
      };
    case SET_EST_HIDE_PIP_SECTIONS_CONSENT_PHOTOGRAPH_TEXT_EMAIL:
      return {
        ...state,
        estHidePipSectionsConsentPhotographTextemail:
          action.estHidePipSectionsConsentPhotographTextemail,
      };

    case SET_RESET_FORMIK_FORM:
      return {
        ...state,
        resetFormikForm: action.resetFormikForm,
      };

    default:
      return state;
  }
};
export default PatientReducer;
