import {
  SET_ADDREFERRALMODE,
  SET_ISDRAWEROPEN,
  SET_ISUNDERCONSTRUCTION,
  SET_PAGINATIONNUMBER,
} from "./CommonAction";

const initialState = {
  isDrawerOpen: false,

  isUnderConstruction: false,
  isAddReferralMode: "addReferralMode",
};

// eslint-disable-next-line @typescript-eslint/default-param-last
const CommonReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_ISDRAWEROPEN:
      return {
        ...state,
        isDrawerOpen: action.isDrawerOpen,
      };

    case SET_PAGINATIONNUMBER:
      return {
        ...state,
        paginationNumber: action.paginationNumber,
      };

    case SET_ISUNDERCONSTRUCTION:
      return {
        ...state,
        isUnderConstruction: action.isUnderConstruction,
      };

    case SET_ADDREFERRALMODE:
      return {
        ...state,
        isAddReferralMode: action.isAddReferralMode,
      };
    default:
      return state;
  }
};
export default CommonReducer;
