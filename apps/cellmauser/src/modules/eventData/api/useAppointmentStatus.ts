import { useMutation } from "react-query";

import useAxios from "../../../hooks/useAxios";
import {
  ADD_RESCHEDULED_APPOINTMENT,
  DELETE_RESCHEDULED_APPOINTMENT,
  UPDATE_RESCHEDULED_APPOINTMENT,
} from "../config";

interface RescheduledAppointmentParams {
  reaHpSeenDiffAppt: string;
  reaActuallySeenByEspId: number;
  cancelledReasons?: string;
  reaDuration: string;
  reaReviewReason?: string;
  reaNotes?: string;
}

// Add rescheduled appointment
export const useAddRescheduledAppointment = () => {
  const axiosInstance = useAxios();

  const addRescheduledAppointment = (
    parameterList: RescheduledAppointmentParams
  ) => {
    return axiosInstance.post(ADD_RESCHEDULED_APPOINTMENT, parameterList);
  };

  return useMutation(addRescheduledAppointment);
};

interface RescheduledUpdateAppointmentParams
  extends RescheduledAppointmentParams {
  reaId: number;
}

// Update rescheduled appointment
export const useUpdateRescheduledAppointment = () => {
  const axiosInstance = useAxios();

  const updateRescheduledAppointment = (
    parameterList: RescheduledUpdateAppointmentParams
  ) => {
    return axiosInstance.put(UPDATE_RESCHEDULED_APPOINTMENT, parameterList);
  };

  return useMutation(updateRescheduledAppointment);
};

// Delete rescheduled appointment
export const useDeleteRescheduledAppointment = () => {
  const axiosInstance = useAxios();

  const deleteRescheduledAppointment = (reaId: number) => {
    return axiosInstance.delete(DELETE_RESCHEDULED_APPOINTMENT, {
      params: { reservedAppointmentId: reaId },
    });
  };

  return useMutation(deleteRescheduledAppointment);
};
