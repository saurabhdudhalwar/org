import qs from "qs";
import { useQuery } from "react-query";

import useAxios from "../../../hooks/useAxios";
import {
  CLINIC_SCHEDULE_DETAILS,
  COMBINE_SCHEDULE_DETAILS,
  HEALTH_PROFESSIONAL_SCHEDULE_DETAILS,
} from "../config";

type ParameterList = {
  espId: number[];
  startDate: string;
  endDate: string;
  pageNumber: number;
};

export const useHealthProfessionalScheduleDetails = (
  parameterList: ParameterList
) => {
  const axiosInstance = useAxios();

  const getHealthProfessionalSchedule = (parameters: ParameterList) => {
    return axiosInstance.get(HEALTH_PROFESSIONAL_SCHEDULE_DETAILS, {
      params: parameters,
      paramsSerializer: {
        serialize: (params) => {
          return qs.stringify(
            {
              espId: params?.espId,
              startDate: params?.startDate,
              endDate: params?.endDate,
              pageNumber: params?.pageNumber,
            },
            { arrayFormat: "repeat" }
          );
        },
      },
    });
  };

  const select = (response: any) => {
    if (response.status === 200) {
      return response?.data?.entity;
    }
  };

  return useQuery(
    HEALTH_PROFESSIONAL_SCHEDULE_DETAILS,
    () => getHealthProfessionalSchedule(parameterList),
    {
      select,
      cacheTime: 0,
      enabled: false,
    }
  );
};

export const useClinicScheduleDetails = (parameterList: ParameterList) => {
  const axiosInstance = useAxios();

  const getClinicSchedule = (parameters: ParameterList) => {
    return axiosInstance.get(CLINIC_SCHEDULE_DETAILS, {
      params: parameters,
      paramsSerializer: {
        serialize: (params) => {
          return qs.stringify(
            {
              espId: params?.espId,
              startDate: params?.startDate,
              endDate: params?.endDate,
              pageNumber: params?.pageNumber,
            },
            { arrayFormat: "repeat" }
          );
        },
      },
    });
  };

  const select = (response: any) => {
    if (response.status === 200) {
      return response?.data?.entity;
    }
  };

  return useQuery(
    CLINIC_SCHEDULE_DETAILS,
    () => getClinicSchedule(parameterList),
    {
      select,
      cacheTime: 0,
      enabled: false,
    }
  );
};

export const useCombineScheduleDetails = (parameterList: ParameterList) => {
  const axiosInstance = useAxios();

  const getCombineSchedule = (parameters: ParameterList) => {
    return axiosInstance.get(COMBINE_SCHEDULE_DETAILS, {
      params: parameters,
      paramsSerializer: {
        serialize: (params) => {
          return qs.stringify(
            {
              espId: params?.espId,
              startDate: params?.startDate,
              endDate: params?.endDate,
              pageNumber: params?.pageNumber,
            },
            { arrayFormat: "repeat" }
          );
        },
      },
    });
  };

  const select = (response: any) => {
    if (response.status === 200) {
      return response?.data?.entity;
    }
  };

  return useQuery(
    COMBINE_SCHEDULE_DETAILS,
    () => getCombineSchedule(parameterList),
    {
      select,
      cacheTime: 0,
      enabled: false,
    }
  );
};
