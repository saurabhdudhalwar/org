import { useQuery } from "react-query";

import useAxios from "../../../hooks/useAxios";
import {
  HEALTH_PROFESSIONAL,
  SIDEBAR_APPOINTMENT_COUNT,
  SIDEBAR_APPOINTMENT_DETAILS,
  SIDEBAR_SPECIALTY,
  TEAM,
} from "../config";

type TeamListParameter = {
  clinicTypeEliId: number;
  serviceLocationId: number;
  specialityEliId: number;
};

export const useGetTeamList = (parameterList: TeamListParameter) => {
  const axiosInstance = useAxios();

  const getTeamList = (parameters: TeamListParameter) => {
    return axiosInstance.get(TEAM, {
      params: parameters,
    });
  };

  const select = (response: any) => {
    if (response.status === 200) {
      return {
        clinicTypesLocationList:
          response?.data?.entity?.clinicTypesLocationList,
      };
    }
    return null;
  };

  const { data, refetch } = useQuery(TEAM, () => getTeamList(parameterList), {
    select,
    enabled: false,
    cacheTime: 0,
  });

  const clinicTypesLocationList = data?.clinicTypesLocationList ?? [];

  return { clinicTypesLocationList, refetch };
};

type HealthProfessionalListParameter = {
  clinicType: number;
  speciality?: number;
  team?: number;
  serviceLocation: number;
};

export const useHealthProfessionalList = (
  parameterList: HealthProfessionalListParameter
) => {
  const axiosInstance = useAxios();

  const getHealthProfessionalList = (
    parameters: HealthProfessionalListParameter
  ) => {
    return axiosInstance.get(HEALTH_PROFESSIONAL, {
      params: parameters,
    });
  };

  const select = (response: any) => {
    if (response.status === 200) {
      return { healthProfessionalList: response?.data?.entity };
    }
    return null;
  };

  const { data, refetch } = useQuery(
    HEALTH_PROFESSIONAL,
    () => getHealthProfessionalList(parameterList),
    {
      select,
      enabled: false,
      cacheTime: 0,
    }
  );

  const healthProfessionalList = data?.healthProfessionalList ?? [];

  return { healthProfessionalList, refetch };
};

type AppointmentCountParameter = {
  espId: number;
  clinicLocationEliId: number;
  date: string;
};
export const useSidebarAppointmentCount = (
  parameterList: AppointmentCountParameter
) => {
  const axiosInstance = useAxios();

  const getSidebarAppointmentCount = (
    parameterList: AppointmentCountParameter
  ) => {
    return axiosInstance.get(SIDEBAR_APPOINTMENT_COUNT, {
      params: {
        espId: parameterList?.espId,
        clinicLocationEliId: parameterList?.clinicLocationEliId,
        date: parameterList?.date,
      },
    });
  };
  const select = (response: any) => {
    if (response?.status === 200) {
      if (response?.data?.validationCode === "appointmentcount.found") {
        return {
          appointmentCount: response?.data?.entity,
        };
      }
    }
  };

  const { data, refetch } = useQuery(
    [SIDEBAR_APPOINTMENT_COUNT, parameterList],
    () => getSidebarAppointmentCount(parameterList),
    {
      select,
      enabled: false,
    }
  );

  const appointmentCount = data?.appointmentCount;

  return { appointmentCount, refetch };
};

export const useSidebarAppointmentDetails = (patId: number) => {
  const axiosInstance = useAxios();

  const getSidebarAppointmentDetails = (patId: number) => {
    return axiosInstance.get(SIDEBAR_APPOINTMENT_DETAILS, {
      params: {
        patId,
      },
    });
  };
  const select = (response: any) => {
    if (response?.status === 200) {
      if (
        response?.data?.validationCode ===
        "appointment.sidebar.information.found"
      ) {
        return {
          appointmentDetails: response?.data?.entity,
          settings: response?.data?.settings,
        };
      }
    }
  };

  const { data, refetch } = useQuery(
    [SIDEBAR_APPOINTMENT_DETAILS, patId],
    () => getSidebarAppointmentDetails(patId),
    {
      select,
      enabled: true,
      cacheTime: 0,
    }
  );

  const appointmentDetails = data?.appointmentDetails;
  const settings = data?.settings;

  return { appointmentDetails, settings, refetch };
};

export const useSidebarSpecialtyList = (cliId: number) => {
  const axiosInstance = useAxios();

  const getSidebarSpecialtyList = (ctlCliId: number) => {
    return axiosInstance.get(SIDEBAR_SPECIALTY, {
      params: {
        ctlCliId,
      },
    });
  };
  const select = (response: any) => {
    if (response?.status === 200) {
      if (
        response?.data?.validationCode === "appointment.speciality.list.found"
      ) {
        return {
          clinicName: response?.data?.entity?.clinicName,
          specialtyList: response?.data?.entity?.foundAptSpeciality,
        };
      }
    }
    return null;
  };

  const { data, refetch } = useQuery(
    [SIDEBAR_SPECIALTY, cliId],
    () => getSidebarSpecialtyList(cliId),
    {
      select,
      enabled: !!cliId,
      cacheTime: 0,
    }
  );

  const specialtyList = data?.specialtyList ?? [];

  return { specialtyList, refetch };
};
