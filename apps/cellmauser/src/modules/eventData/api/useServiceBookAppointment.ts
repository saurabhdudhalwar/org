import { useMutation, useQuery } from "react-query";

import useAxios from "../../../hooks/useAxios";
import {
  APPOINTMENT_DURATION,
  APPOINTMENT_ROOM,
  BLOCK_CALENDAR_SLOT,
  RESERVE_CALENDAR_SLOT,
} from "../config";

type BlockSlotParams = {
  hour?: number;
  minute?: number;
  duration?: number;
  date?: string;
  espId?: number;
  clinicTypeEliId?: number;
  clinicTypeLocationEliId?: number;
  durationModifier?: number;
  clinicLocationEliText?: string;
  clinicTypeEliText?: string;
};

// Block calendar slot in week view
export const useBlockCalendarSlot = () => {
  const axiosInstance = useAxios();

  const blockCalendarSlot = (parameterList: BlockSlotParams) => {
    return axiosInstance.post(BLOCK_CALENDAR_SLOT, parameterList);
  };

  return useMutation(blockCalendarSlot);
};

// Delete blocked calendar slot in week view
export const useDeleteBlockCalendarSlot = () => {
  const axiosInstance = useAxios();

  const deleteBlockCalendarSlot = (resId: number) => {
    return axiosInstance.delete(BLOCK_CALENDAR_SLOT, {
      params: { reservedAppointmentId: resId },
    });
  };

  return useMutation(deleteBlockCalendarSlot);
};

type ReserveSlotParams = {
  hour?: number;
  minute?: number;
  duration?: number;
  date?: string;
  espId?: number;
  clinicTypeEliId?: number;
  clinicTypeLocationEliId?: number;
  resBlocking: string;
};

// // Reserve calendar slot
export const useReserveCalendarSlot = () => {
  const axiosInstance = useAxios();

  const reserveCalendarSlot = (parameterList: ReserveSlotParams) => {
    return axiosInstance.post(RESERVE_CALENDAR_SLOT, parameterList);
  };

  return useMutation(reserveCalendarSlot);
};

// Delete reserved calendar slot
export const useDeleteReserveCalendarSlot = () => {
  const axiosInstance = useAxios();

  const deleteReserveCalendarSlot = (resId: any) => {
    return axiosInstance.delete(RESERVE_CALENDAR_SLOT, {
      params: { resId: parseInt(resId, 10) },
    });
  };

  return useMutation(deleteReserveCalendarSlot);
};

type DurationParams = {
  hour?: number;
  minute?: number;
  duration?: number;
  date?: string;
  espId?: number;
  clinicTypeLocationEliId?: number;
  appointmentType?: string;
  durationModifier?: number;
};
// Hook for duration dropdown
export const useAppointmentDuration = (paramList: DurationParams) => {
  const axiosInstance = useAxios();

  const getAppointmentDuration = (paramList: DurationParams) => {
    return axiosInstance.get(APPOINTMENT_DURATION, {
      params: {
        hour: paramList?.hour,
        minute: paramList?.minute,
        duration: paramList?.duration,
        date: paramList?.date,
        espId: paramList?.espId,
        clinicTypeLocationEliId: paramList?.clinicTypeLocationEliId,
        appointmentType: paramList?.appointmentType,
        durationModifier: paramList?.durationModifier,
      },
    });
  };
  const select = (response: any) => {
    if (response?.status === 200) {
      if (
        response?.data?.validationCode ===
        "booked.appointment.slot.duration.found"
      ) {
        return {
          appointmentDuration: response?.data?.entity,
          settings: response?.data?.settings,
        };
      }
    }
  };

  const { data, refetch } = useQuery(
    [APPOINTMENT_DURATION, paramList],
    () => getAppointmentDuration(paramList),
    {
      select,
      cacheTime: 0,
    }
  );

  const appointmentDuration = data?.appointmentDuration;
  const settings = data?.settings;

  return { appointmentDuration, settings, refetch };
};

type RoomParams = {
  hour: number;
  minute: number;
  duration: number;
  date: string;
  clinicTypeLocationEliId?: number;
  clinicTypeEliId?: number;
  slot: number;
};

// Hook for room dropdown
export const useAppointmentRoom = (paramList: RoomParams) => {
  const axiosInstance = useAxios();

  const getAppointmentRoom = (paramList: RoomParams) => {
    return axiosInstance.get(APPOINTMENT_ROOM, {
      params: {
        hour: paramList?.hour,
        minute: paramList?.minute,
        duration: paramList?.duration,
        date: paramList?.date,
        clinicTypeLocationEliId: paramList?.clinicTypeLocationEliId,
        clinicTypeEliId: paramList?.clinicTypeEliId,
        slot: paramList?.slot,
      },
    });
  };
  const select = (response: any) => {
    if (response?.status === 200) {
      if (response?.data?.validationCode === "appointment.room.found") {
        return {
          appointmentRoom: response?.data?.entity,
          settings: response?.data?.settings,
        };
      }
    }
  };

  const { data, refetch } = useQuery(
    [APPOINTMENT_ROOM, paramList],
    () => getAppointmentRoom(paramList),
    {
      select,
      cacheTime: 0,
    }
  );

  const appointmentRoom = data?.appointmentRoom;
  const settings = data?.settings;

  return { appointmentRoom, settings, refetch };
};
