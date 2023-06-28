export const SET_ACTIVESCREENNAME = "SET_ACTIVESCREENNAME";
export const SET_ISCUSTOMIZEVIEW = "SET_ISCUSTOMIZEVIEW";

export const setIsCustomizeView = (isCustomizeView: any) => ({
  type: SET_ISCUSTOMIZEVIEW,
  isCustomizeView,
});

export const setActiveScreenName = (activeScreenName: any) => ({
  type: SET_ACTIVESCREENNAME,
  activeScreenName,
});
