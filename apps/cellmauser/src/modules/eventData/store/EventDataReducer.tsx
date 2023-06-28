import {
  SET_ACTIVESCREENNAME,
  SET_ISALLOWTOBOOKONLINEMEETING,
  SET_ISCUSTOMIZEVIEW,
  SET_ISENABLEBLOCKINGMODE,
  SET_ISNEXTAVAILABLEAPPOINTMENT,
  SET_SELECTEDSLOTDETAILS,
  SET_USESPECIALITYANDREGIONSETTING,
} from "./EventDataAction";

const initialState = {
  isCustomizeView: false,
  isUseSpecialtyAndRegionSetting: false,
  selectedSlotDetails: {},
  isAllowToBookOnlineMeeting: false,
  isEnableBlockingMode: false,
  isNextAvailableAppointment: false,
  activeScreenName: "",
};

const EventDataReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_ISCUSTOMIZEVIEW:
      return {
        ...state,
        isCustomizeView: action.isCustomizeView,
      };
    case SET_USESPECIALITYANDREGIONSETTING:
      return {
        ...state,
        isUseSpecialtyAndRegionSetting: action.isUseSpecialtyAndRegionSetting,
      };
    case SET_SELECTEDSLOTDETAILS:
      return {
        ...state,
        selectedSlotDetails: action.selectedSlotDetails,
      };
    case SET_ISALLOWTOBOOKONLINEMEETING:
      return {
        ...state,
        isAllowToBookOnlineMeeting: action.isAllowToBookOnlineMeeting,
      };
    case SET_ISENABLEBLOCKINGMODE:
      return {
        ...state,
        isEnableBlockingMode: action.isEnableBlockingMode,
      };
    case SET_ISNEXTAVAILABLEAPPOINTMENT:
      return {
        ...state,
        isNextAvailableAppointment: action.isNextAvailableAppointment,
      };
    case SET_ACTIVESCREENNAME:
      return {
        ...state,
        activeScreenName: action.activeScreenName,
      };
    default:
      return state;
  }
};
export default EventDataReducer;
