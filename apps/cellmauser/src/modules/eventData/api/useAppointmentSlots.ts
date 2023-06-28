import { useQuery } from "react-query";

import useAxios from "../../../hooks/useAxios";
import {
  APPOINTMENT_SLOT,
  APPOINTMENT_SLOT_DAY,
  APPOINTMENT_SLOT_MONTH,
  APPOINTMENT_SLOT_WEEK,
} from "../config";

type AppointmentSlot = {
  professionalId: number;
  date: string;
  clinicTypeEliId: number;
  clinicLocationEliId: number;
};

export const useAppointmentSlot = (parameterList: AppointmentSlot) => {
  const axiosInstance = useAxios();

  const getAppointmentSlot = (parameters: AppointmentSlot) => {
    return axiosInstance.get(APPOINTMENT_SLOT, {
      params: parameters,
    });
  };

  const select = (response: any) => {
    if (response.status === 200) {
      return { getAppointmentSlotList: response?.data?.entity };
    }
    return null;
  };

  const { data, refetch } = useQuery(
    APPOINTMENT_SLOT,
    () => getAppointmentSlot(parameterList),
    {
      select,
      cacheTime: 0,
    }
  );

  const getAppointmentSlotList = data?.getAppointmentSlotList ?? [];

  return { getAppointmentSlotList, refetch };
};

type AppointmentSlotDay = {
  espId: number;
  locationId: number;
  locationText: string;
  ctEliId: number;
  date: string;
};

export const useAppointmentSlotDay = (parameterList: AppointmentSlotDay) => {
  const axiosInstance = useAxios();

  const getAppointmentSlotDay = (parameters: AppointmentSlotDay) => {
    return axiosInstance.get(APPOINTMENT_SLOT_DAY, {
      params: parameters,
    });
  };

  const select = (response: any) => {
    if (response.status === 200) {
      return { appointmentSlotDayList: response?.data?.entity };
    }
    return null;
  };

  const { data, refetch } = useQuery(
    APPOINTMENT_SLOT_DAY,
    () => getAppointmentSlotDay(parameterList),
    {
      select,
      cacheTime: 0,
    }
  );

  const appointmentSlotDayList = data?.appointmentSlotDayList ?? [];

  return { appointmentSlotDayList, refetch };
};

type AppointmentSlotWeek = {
  professionalId: number;
  clinicLocationId: number;
  date: string;
  clinicTypeId: number;
};

export const useAppointmentSlotWeek = (parameterList: AppointmentSlotWeek) => {
  const axiosInstance = useAxios();

  const getAppointmentSlotWeek = (parameters: AppointmentSlotWeek) => {
    return axiosInstance.get(APPOINTMENT_SLOT_WEEK, {
      params: parameters,
    });
  };

  const select = (response: any) => {
    if (response.status === 200) {
      return { appointmentSlotWeekList: response?.data?.entity };
    }
    return null;
  };

  const { data, refetch } = useQuery(
    APPOINTMENT_SLOT_WEEK,
    () => getAppointmentSlotWeek(parameterList),
    {
      select,
      cacheTime: 0,
    }
  );

  const appointmentSlotWeekList = data?.appointmentSlotWeekList ?? [];

  return { appointmentSlotWeekList, refetch };
};

type AppointmentSlotMonth = {
  professionalId: number;
  date: string;
  clinicLocationId: number;
  clinicTypeId: number;
};

export const useAppointmentSlotMonth = (
  parameterList: AppointmentSlotMonth
) => {
  const axiosInstance = useAxios();

  const getAppointmentSlotWeek = (parameters: AppointmentSlotMonth) => {
    return axiosInstance.get(APPOINTMENT_SLOT_MONTH, {
      params: parameters,
    });
  };

  const select = (response: any) => {
    if (response.status === 200) {
      return { appointmentSlotMonthList: response?.data?.entity };
    }
    return null;
  };

  const { data, refetch } = useQuery(
    APPOINTMENT_SLOT_MONTH,
    () => getAppointmentSlotWeek(parameterList),
    {
      select,
      cacheTime: 0,
    }
  );

  const appointmentSlotMonthList = data?.appointmentSlotMonthList ?? [];

  return { appointmentSlotMonthList, refetch };
};
