import { SET_ACTIVESCREENNAME, SET_ISCUSTOMIZEVIEW } from "./AdminAction";

const initialState = {
  isCustomizeView: false,

  activeScreenName: "",
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
    default:
      return state;
  }
};
export default EventDataReducer;
