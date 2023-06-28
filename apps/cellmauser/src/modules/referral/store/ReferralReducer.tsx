import {
  SET_ACTIVESCREENNAME,
  SET_ISCUSTOMIZEVIEW,
  SET_SERVICEREFERRALSTATUS,
} from "./ReferralAction";

const initialState = {
  isCustomizeView: false,
  activeScreenName: "",
  serviceReferralStatus: "",
};

const EventDataReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_ISCUSTOMIZEVIEW:
      return {
        ...state,
        isCustomizeView: action.isCustomizeView,
      };

    case SET_ACTIVESCREENNAME:
      return {
        ...state,
        activeScreenName: action.activeScreenName,
      };
    case SET_SERVICEREFERRALSTATUS:
      return {
        ...state,
        serviceReferralStatus: action.serviceReferralStatus,
      };
    default:
      return state;
  }
};
export default EventDataReducer;
