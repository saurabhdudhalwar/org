import { useQuery } from "react-query";

import useAxios from "../../../hooks/useAxios";
import {
  APPOINTMENT_NEXT_AVAILABLE_SLOT,
  APPOINTMENT_NEXT_AVAILABLE_SLOT_DAY,
  APPOINTMENT_NEXT_AVAILABLE_SLOT_MONTH,
  APPOINTMENT_NEXT_AVAILABLE_SLOT_WEEK,
} from "../config";

type AppointmentNextAvailableSlot = {
  professionalId: number;
  date: string;
  clinicTypeEliId: number;
  clinicLocationEliId: number;
};

export const useAppointmentNextAvailableSlot = (
  parameterList: AppointmentNextAvailableSlot
) => {
  const axiosInstance = useAxios();

  const getAppointmentNextAvailableSlot = (
    parameters: AppointmentNextAvailableSlot
  ) => {
    return axiosInstance.get(APPOINTMENT_NEXT_AVAILABLE_SLOT, {
      params: parameters,
    });
  };

  const select = (response: any) => {
    if (response.status === 200) {
      return { getAppointmentNextAvailableSlotList: response?.data?.entity };
    }
    return null;
  };

  const { data, refetch } = useQuery(
    APPOINTMENT_NEXT_AVAILABLE_SLOT,
    () => getAppointmentNextAvailableSlot(parameterList),
    {
      select,
      cacheTime: 0,
    }
  );

  const getAppointmentNextAvailableSlotList =
    data?.getAppointmentNextAvailableSlotList ?? [];

  return { getAppointmentNextAvailableSlotList, refetch };
};

type AppointmentNextAvailableSlotDay = {
  espId: number;
  locationId: number;
  locationText: string;
  ctEliId: number;
  date: string;
};

export const useAppointmentNextAvailableSlotDay = (
  parameterList: AppointmentNextAvailableSlotDay
) => {
  const axiosInstance = useAxios();

  const getAppointmentNextAvailableSlotDay = (
    parameters: AppointmentNextAvailableSlotDay
  ) => {
    return axiosInstance.get(APPOINTMENT_NEXT_AVAILABLE_SLOT_DAY, {
      params: parameters,
    });
  };

  const select = (response: any) => {
    if (response.status === 200) {
      return { appointmentNextAvailableSlotDayList: response?.data?.entity };
    }
    return null;
  };

  const { data, refetch } = useQuery(
    APPOINTMENT_NEXT_AVAILABLE_SLOT_DAY,
    () => getAppointmentNextAvailableSlotDay(parameterList),
    {
      select,
      cacheTime: 0,
    }
  );

  const appointmentNextAvailableSlotDayList =
    data?.appointmentNextAvailableSlotDayList ?? [];

  return { appointmentNextAvailableSlotDayList, refetch };
};

type AppointmentNextAvailableSlotWeek = {
  professionalId: number;
  clinicLocationId: number;
  date: string;
  clinicTypeId: number;
};

export const useAppointmentNextAvailableSlotWeek = (
  parameterList: AppointmentNextAvailableSlotWeek
) => {
  const axiosInstance = useAxios();

  const getAppointmentNextAvailableSlotWeek = (
    parameters: AppointmentNextAvailableSlotWeek
  ) => {
    return axiosInstance.get(APPOINTMENT_NEXT_AVAILABLE_SLOT_WEEK, {
      params: parameters,
    });
  };

  const select = (response: any) => {
    if (response.status === 200) {
      return { appointmentNextAvailableSlotWeekList: response?.data?.entity };
    }
    return null;
  };

  const { data, refetch } = useQuery(
    APPOINTMENT_NEXT_AVAILABLE_SLOT_WEEK,
    () => getAppointmentNextAvailableSlotWeek(parameterList),
    {
      select,
      cacheTime: 0,
    }
  );

  const appointmentNextAvailableSlotWeekList =
    data?.appointmentNextAvailableSlotWeekList ?? [];

  return { appointmentNextAvailableSlotWeekList, refetch };
};

type AppointmentNextAvailableSlotMonth = {
  professionalId: number;
  date: string;
  clinicLocationId: number;
  clinicTypeId: number;
};

export const useAppointmentNextAvailableSlotMonth = (
  parameterList: AppointmentNextAvailableSlotMonth
) => {
  const axiosInstance = useAxios();

  const getAppointmentNextAvailableSlotWeek = (
    parameters: AppointmentNextAvailableSlotMonth
  ) => {
    return axiosInstance.get(APPOINTMENT_NEXT_AVAILABLE_SLOT_MONTH, {
      params: parameters,
    });
  };

  const select = (response: any) => {
    if (response.status === 200) {
      return { appointmentNextAvailableSlotMonthList: response?.data?.entity };
    }
    return null;
  };

  const { data, refetch } = useQuery(
    APPOINTMENT_NEXT_AVAILABLE_SLOT_MONTH,
    () => getAppointmentNextAvailableSlotWeek(parameterList),
    {
      select,
      cacheTime: 0,
    }
  );

  const appointmentNextAvailableSlotMonthList =
    data?.appointmentNextAvailableSlotMonthList ?? [];

  return { appointmentNextAvailableSlotMonthList, refetch };
};
