export const SET_SELECTEDDATES = "SET_SELECTEDDATES";
export const SET_HPSTARTDATE = "SET_HPSTARTDATE";
export const SET_HPENDDATE = "SET_HPENDDATE";

export const setSelectedDate = (selectedDate: any) => ({
  type: SET_SELECTEDDATES,
  selectedDate,
});

export const setStartDate = (startDate: any) => ({
  type: SET_HPSTARTDATE,
  startDate,
});

export const setEndDate = (endDate: any) => ({
  type: SET_HPENDDATE,
  endDate,
});
