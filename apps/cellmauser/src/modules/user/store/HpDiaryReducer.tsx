import {
  SET_HPENDDATE,
  SET_HPSTARTDATE,
  SET_SELECTEDDATES,
} from "./HpDiaryAction";

const initialState = {
  selectedDate: new Date(),
  startDate: "",
  endDate: "",
};

const HpDiaryReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_SELECTEDDATES:
      return {
        ...state,
        selectedDate: action.selectedDate,
      };
    case SET_HPSTARTDATE:
      return {
        ...state,
        startDate: action.startDate,
      };
    case SET_HPENDDATE:
      return {
        ...state,
        endDate: action.endDate,
      };
    default:
      return state;
  }
};
export default HpDiaryReducer;
