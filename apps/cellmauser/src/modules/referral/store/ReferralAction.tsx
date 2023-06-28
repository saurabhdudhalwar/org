export const SET_ACTIVESCREENNAME = "SET_ACTIVESCREENNAME";
export const SET_ISCUSTOMIZEVIEW = "SET_ISCUSTOMIZEVIEW";
export const SET_SERVICEREFERRALSTATUS = "SET_SERVICEREFERRALSTATUS";

export const setIsCustomizeView = (isCustomizeView: any) => ({
  type: SET_ISCUSTOMIZEVIEW,
  isCustomizeView,
});

export const setActiveScreenName = (activeScreenName: any) => ({
  type: SET_ACTIVESCREENNAME,
  activeScreenName,
});

export const setServiceReferralStatus = (serviceReferralStatus: any) => ({
  type: SET_SERVICEREFERRALSTATUS,
  serviceReferralStatus,
});
