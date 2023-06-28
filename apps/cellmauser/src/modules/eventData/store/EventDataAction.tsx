export const SET_ACTIVESCREENNAME = "SET_ACTIVESCREENNAME";
export const SET_ISCUSTOMIZEVIEW = "SET_ISCUSTOMIZEVIEW";
export const SET_USESPECIALITYANDREGIONSETTING =
  "SET_USESPECIALITYANDREGIONSETTING";
export const SET_SELECTEDSLOTDETAILS = "SET_SELECTEDSLOTDETAILS";
export const SET_ISALLOWTOBOOKONLINEMEETING = "SET_ISALLOWTOBOOKONLINEMEETING";
export const SET_ISENABLEBLOCKINGMODE = "SET_ISENABLEBLOCKINGMODE";
export const SET_ISNEXTAVAILABLEAPPOINTMENT = "SET_ISNEXTAVAILABLEAPPOINTMENT";
export const setIsCustomizeView = (isCustomizeView: any) => ({
  type: SET_ISCUSTOMIZEVIEW,
  isCustomizeView,
});

export const setIsUseSpecialtyAndRegionSetting = (
  isUseSpecialtyAndRegionSetting: any
) => ({
  type: SET_USESPECIALITYANDREGIONSETTING,
  isUseSpecialtyAndRegionSetting,
});

export const setSelectedSlotDetails = (selectedSlotDetails: any) => ({
  type: SET_SELECTEDSLOTDETAILS,
  selectedSlotDetails,
});

export const setIsAllowToBookOnlineMeeting = (
  isAllowToBookOnlineMeeting: any
) => ({
  type: SET_ISALLOWTOBOOKONLINEMEETING,
  isAllowToBookOnlineMeeting,
});

export const setIsEnableBlockingMode = (isEnableBlockingMode: any) => ({
  type: SET_ISENABLEBLOCKINGMODE,
  isEnableBlockingMode,
});

export const setIsNextAvailableAppointment = (
  isNextAvailableAppointment: any
) => ({
  type: SET_ISNEXTAVAILABLEAPPOINTMENT,
  isNextAvailableAppointment,
});

export const setActiveScreenName = (activeScreenName: any) => ({
  type: SET_ACTIVESCREENNAME,
  activeScreenName,
});
