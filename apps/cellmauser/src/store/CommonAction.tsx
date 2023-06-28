export const SET_ISDRAWEROPEN = "SET_ISDRAWEROPEN";

export const SET_PAGINATIONNUMBER = "SET_PAGINATIONNUMBER";
export const SET_ISUNDERCONSTRUCTION = "SET_ISUNDERCONSTRUCTION";

export const SET_ADDREFERRALMODE = "SET_ADDREFERRALMODE";

export const setIsDrawerOpen = (isDrawerOpen: any) => ({
  type: SET_ISDRAWEROPEN,
  isDrawerOpen,
});

export const setPaginationNumber = (paginationNumber: any) => ({
  type: SET_PAGINATIONNUMBER,
  paginationNumber,
});

export const setIsUnderConstruction = (isUnderConstruction: any) => ({
  type: SET_ISUNDERCONSTRUCTION,
  isUnderConstruction,
});

export const setAddReferralMode = (isAddReferralMode: any) => ({
  type: SET_ADDREFERRALMODE,
  isAddReferralMode,
});
