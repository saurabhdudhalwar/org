export const SET_ISCUSTOMIZEVIEW = "SET_ISCUSTOMIZEVIEW";
export const SET_ISUSERSELECTED = "SET_ISUSERSELECTED";
export const SET_ISUSESPECIALITYANDREGION = "SET_ISUSESPECIALITYANDREGION";
export const SET_ELIID = "SET_ELIID";
export const SET_SELECTED_USERNAME = "SET_SELECTED_USERNAME";
export const SET_CLIID = "SET_CLIID";
export const SET_APPID = "SET_APPID";
export const SET_CODEID = "SET_CODEID";
export const SET_HPDID = "SET_HPDID";
export const SET_ESPDETAILS = "SET_ESPID";

export const SET_FIELDARRAY = "SET_FIELDARRAY";

export const SET_HCDID = "SET_HCDID";
export const SET_HCDINDEX = "SET_HCDINDEX";
export const SET_ACTIVESCREENNAME = "SET_ACTIVESCREENNAME";
export const SET_USE_EXPORT = "SET_USE_EXPORT";

export const setIsCustomizeView = (isCustomizeView: any) => ({
  type: SET_ISCUSTOMIZEVIEW,
  isCustomizeView,
});

export const setIsUserSelected = (isUserSelected: any) => ({
  type: SET_ISUSERSELECTED,
  isUserSelected,
});

export const setIsUseSpecialityAndRegion = (IsUseSpecialityAndRegion: any) => ({
  type: SET_ISUSESPECIALITYANDREGION,
  IsUseSpecialityAndRegion,
});

export const setEliID = (eliID: any) => ({
  type: SET_ELIID,
  eliID,
});

export const setSelectedUsername = (selectedUsername: string) => ({
  type: SET_SELECTED_USERNAME,
  selectedUsername,
});

export const setCliId = (cliID: any) => ({
  type: SET_CLIID,
  cliID,
});

export const setAppId = (appID: any) => ({
  type: SET_APPID,
  appID,
});

export const setCodeId = (codeID: any) => ({
  type: SET_CODEID,
  codeID,
});

export const setHpdId = (hpdID: any) => ({
  type: SET_HPDID,
  hpdID,
});

export const setEspDetails = (espDetails: any) => ({
  type: SET_ESPDETAILS,
  espDetails,
});

export const setFieldArray = (fieldArray: any) => ({
  type: SET_FIELDARRAY,
  fieldArray,
});

export const setHcdIndex = (index: any) => ({
  type: SET_HCDINDEX,
  index,
});

export const setHcdId = (hcdId: any) => ({
  type: SET_HCDID,
  hcdId,
});
export const setActiveScreenName = (activeScreenName: any) => ({
  type: SET_ACTIVESCREENNAME,
  activeScreenName,
});

export const setUseExport = (useExport: any) => ({
  type: SET_USE_EXPORT,
  useExport,
});
