import { useMutation, useQuery, useQueryClient } from "react-query";
import { useDispatch, useSelector } from "react-redux";

import useAxios from "../../../hooks/useAxios";
import dispatchSnackbar from "../../../utils/ResponseCodeHandler";
import {
  ADD_APPOINTMENT,
  BOOK_APPOINTMENT_DISPLAY,
  DELETE_APPOINTMENT,
  UPDATE_APPOINTMENT,
} from "../config";

export const useGetBookAppointmentDisplay = () => {
  const axiosInstance = useAxios();

  const getBookAppointmentDisplay = () => {
    return axiosInstance.get(BOOK_APPOINTMENT_DISPLAY);
  };

  const select = (response: any) => {
    if (response.status === 200) {
      return response?.data?.entity?.establishmentServices;
    }
  };

  const { data: useBookAppointmentDisplay } = useQuery(
    BOOK_APPOINTMENT_DISPLAY,
    getBookAppointmentDisplay,
    {
      select,
    }
  );

  const data = useBookAppointmentDisplay || [];

  return { data };
};

export const useAddAppointmentDetails = () => {
  const axiosInstance = useAxios();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const { language } = useSelector((state: any) => state.language);

  const addAppointmentDetails = (appointmentDetails: object) => {
    return axiosInstance.post(ADD_APPOINTMENT, appointmentDetails);
  };

  const onSuccess = (response: any) => {
    dispatchSnackbar(response, dispatch, language);
    queryClient.invalidateQueries(ADD_APPOINTMENT);
  };

  return useMutation(addAppointmentDetails, { onSuccess });
};

export const useUpdateAppointmentDetails = () => {
  const { language } = useSelector((state: any) => state.language);
  const axiosInstance = useAxios();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const updateAppointmentDetails = (appointmentDetails: any) => {
    return axiosInstance.put(UPDATE_APPOINTMENT, appointmentDetails);
  };

  const onSuccess = (response: any) => {
    dispatchSnackbar(response, dispatch, language);
    queryClient.invalidateQueries(UPDATE_APPOINTMENT);
  };

  return useMutation(updateAppointmentDetails, { onSuccess });
};

export const useDeleteAppointment = () => {
  const axiosInstance = useAxios();

  const deleteAppointment = (reaId: number) => {
    return axiosInstance.delete(DELETE_APPOINTMENT, {
      params: { reaId },
    });
  };

  return useMutation(deleteAppointment);
};
