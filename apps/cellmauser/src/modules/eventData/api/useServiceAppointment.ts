import { useQuery } from "react-query";

import useAxios from "../../../hooks/useAxios";
import {
  SERVICE_APPOINTMENT_DISPLAY,
  SERVICE_APPOINTMENT_LIST,
} from "../config";

type IServiceAppointmentList = {
  apptStartDate: string;
  apptEndDate: string;
  locationId?: number;
  clinicTypeId?: number;
  rooms?: number;
  establishmentProfessionals?: number;
  patBarcode?: number;
  patRefTxt?: string;
  patientSurname?: string;
  appStatus?: string;
  startTime?: string;
  endTime?: string;
  defaultSetting?: string;
};

export const useServiceAppointmentList = (
  parameterList: IServiceAppointmentList
) => {
  const axiosInstance = useAxios();

  const getServiceAppointmentList = (parameters: IServiceAppointmentList) => {
    return axiosInstance.get(SERVICE_APPOINTMENT_LIST, {
      params: parameters,
    });
  };

  const select = (response: any) => {
    if (response.status === 200) {
      return { serviceAppointmentList: response?.data?.entity };
    }
    return null;
  };

  const { data, refetch } = useQuery(
    SERVICE_APPOINTMENT_LIST,
    () => getServiceAppointmentList(parameterList),
    {
      select,
    }
  );

  const serviceAppointmentList = data?.serviceAppointmentList ?? [];

  return { serviceAppointmentList, refetch };
};

export const useServiceAppointmentDisplay = () => {
  const axiosInstance = useAxios();

  const getServiceAppointmentDisplay = () => {
    return axiosInstance.get(SERVICE_APPOINTMENT_DISPLAY);
  };

  const select = (response: any) => {
    if (response.status === 200) {
      return { serviceAppointmentDisplay: response?.data?.entity };
    }
    return null;
  };

  const { data, refetch } = useQuery(
    SERVICE_APPOINTMENT_DISPLAY,
    () => getServiceAppointmentDisplay(),
    {
      select,
    }
  );

  const serviceAppointmentDisplay = data?.serviceAppointmentDisplay ?? [];

  return { serviceAppointmentDisplay, refetch };
};
