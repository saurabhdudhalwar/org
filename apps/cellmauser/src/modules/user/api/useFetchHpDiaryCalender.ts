import { useQuery } from "react-query";

import useAxios from "../../../hooks/useAxios";
import { HP_CLINIC_DIARY, USER_DIARY_CALENDER } from "../config";

type ParameterList = {
  espId: number;
  date: string;
};

export const useFetchHpDiaryCalender = (parameterList: ParameterList) => {
  const axiosInstance = useAxios();

  const getHpDiaryCalender = (parameters: ParameterList) => {
    return axiosInstance.get(USER_DIARY_CALENDER, {
      params: parameters,
    });
  };

  const select = (response: any) => {
    if (response.status === 200) {
      return { getHPCalenderDetails: response?.data?.entity };
    }
    return null;
  };

  const { data, refetch } = useQuery(
    USER_DIARY_CALENDER,
    () => getHpDiaryCalender(parameterList),
    {
      select,
      cacheTime: 0,
    }
  );

  const getHPCalenderDetails = data?.getHPCalenderDetails ?? [];
  return { getHPCalenderDetails, refetch };
};

type ClinicDiaryParameters = {
  espId: number;
  month: string;
  year: number;
};

export const useFetchClinicDairyCalender = (
  parameterList: ClinicDiaryParameters
) => {
  const axiosInstance = useAxios();

  const getClinicDiaryCalender = (parameters: ClinicDiaryParameters) => {
    return axiosInstance.get(HP_CLINIC_DIARY, {
      params: parameters,
    });
  };

  const select = (response: any) => {
    if (response.status === 200) {
      return { getClinicCalenderDetails: response?.data?.entity };
    }
    return null;
  };

  const { data, refetch } = useQuery(
    HP_CLINIC_DIARY,
    () => getClinicDiaryCalender(parameterList),
    {
      select,
      cacheTime: 0,
    }
  );

  const getClinicCalenderDetails = data?.getClinicCalenderDetails ?? [];
  return { getClinicCalenderDetails, refetch };
};
