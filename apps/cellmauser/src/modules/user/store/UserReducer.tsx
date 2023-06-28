import {
  SET_ACTIVESCREENNAME,
  SET_APPID,
  SET_CLIID,
  SET_CODEID,
  SET_ELIID,
  SET_ESPDETAILS,
  SET_FIELDARRAY,
  SET_HCDID,
  SET_HCDINDEX,
  SET_HPDID,
  SET_ISCUSTOMIZEVIEW,
  SET_ISUSERSELECTED,
  SET_ISUSESPECIALITYANDREGION,
  SET_SELECTED_USERNAME,
  SET_USE_EXPORT,
} from "./UserAction";

const initialState = {
  isCustomizeView: false,
  isUserSelected: false,
  IsUseSpecialityAndRegion: 0,
  selectedUsername: "",
  eliID: "",
  cliID: "",
  appID: "",
  codeID: "",
  hpdID: "",
  espDetails: "",
  hcdId: "",
  fieldArray: "",
  index: "",
  activeScreenName: "",
  useExport: "no",
};

const UserReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_ISCUSTOMIZEVIEW:
      return {
        ...state,
        isCustomizeView: action.isCustomizeView,
      };

    case SET_ISUSERSELECTED:
      return {
        ...state,
        isUserSelected: action.isUserSelected,
      };

    case SET_ISUSESPECIALITYANDREGION:
      return {
        ...state,
        IsUseSpecialityAndRegion: action.IsUseSpecialityAndRegion,
      };
    case SET_SELECTED_USERNAME:
      return {
        ...state,
        selectedUsername: action.selectedUsername,
      };

    case SET_ELIID:
      return {
        ...state,
        eliID: action.eliID,
      };

    case SET_CLIID:
      return {
        ...state,
        cliID: action.cliID,
      };

    case SET_APPID:
      return {
        ...state,
        appID: action.appID,
      };

    case SET_CODEID:
      return {
        ...state,
        codeID: action.codeID,
      };

    case SET_HPDID:
      return {
        ...state,
        hpdID: action.hpdID,
      };
    case SET_ESPDETAILS:
      return {
        ...state,
        espDetails: action.espDetails,
      };

    case SET_FIELDARRAY:
      return {
        ...state,
        fieldArray: action.fieldArray,
        index: action.index,
      };

    case SET_HCDINDEX:
      return {
        ...state,
        index: action.index,
      };

    case SET_HCDID:
      return {
        ...state,
        hcdId: action.hcdId,
      };

    case SET_ACTIVESCREENNAME:
      return {
        ...state,
        activeScreenName: action.activeScreenName,
      };

    case SET_USE_EXPORT:
      return {
        ...state,
        useExport: action.useExport,
      };

    default:
      return state;
  }
};
export default UserReducer;
