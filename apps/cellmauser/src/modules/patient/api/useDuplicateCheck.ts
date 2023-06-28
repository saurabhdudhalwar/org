import { useEffect, useState } from "react";

import { useQuery } from "react-query";

import useAxios from "../../../hooks/useAxios";
import useDispatchSnackbar from "../../../hooks/useDispatchSnackbar";
import {
  PATIENT_DUPLICATE_CHECK,
  PATIENT_DUPLICATE_CHECK_DISPLAY,
} from "../config";

export const useDuplicateCheckDisplay = () => {
  const axiosInstance = useAxios();

  const duplicateCheckDisplaySettings = () => {
    return axiosInstance.get(PATIENT_DUPLICATE_CHECK_DISPLAY);
  };

  const select = (response: any) => {
    if (response.status === 200) {
      return response?.data?.settings;
    }
    return null;
  };

  return useQuery(
    PATIENT_DUPLICATE_CHECK_DISPLAY,
    duplicateCheckDisplaySettings,
    {
      select,
      cacheTime: 0,
      staleTime: 0,
    }
  );
};

interface DuplicateCheckType {
  patNhsRef?: string;
  patHospitalRef?: string;
  patSex: string;
  patDob: string;
  patFirstname: string;
  patSurname: string;
  patMiddlename: string;
  patMaidenname: string;
  patTitle: string;
  patMobile: string;
  patEmail: string;
}

export const useDuplicateCheck = (
  data: DuplicateCheckType,
  pageNumber: number
) => {
  const axiosInstance = useAxios();
  const dispathcSnackbar = useDispatchSnackbar();
  const [listCount, setListCount] = useState(0);

  const getDuplicateCheck = (duplicateCheck: DuplicateCheckType) => {
    return axiosInstance.get(PATIENT_DUPLICATE_CHECK, {
      params: { ...duplicateCheck, pageNumber },
    });
  };
  const select = (response: any) => {
    if (response.status === 200) {
      return {
        settings: response?.data?.settings,
        count: response?.data?.entity?.patientListCount,
        patientList: response?.data?.entity?.patientsList,
        response,
      };
    }
  };

  const onSuccess = (response: any) => {
    dispathcSnackbar(response.response);
  };

  const {
    data: duplicateCheckResponse,
    refetch,
    isLoading,
    isFetchedAfterMount,
  } = useQuery(PATIENT_DUPLICATE_CHECK, () => getDuplicateCheck(data), {
    select,
    onSuccess,
    enabled: pageNumber > 1,
  });

  useEffect(() => {
    if (duplicateCheckResponse?.count)
      setListCount(duplicateCheckResponse?.count);
  }, [duplicateCheckResponse?.count]);

  const patientList = duplicateCheckResponse?.patientList || [];
  const settings = duplicateCheckResponse?.settings;
  return {
    patientList,
    settings,
    listCount,
    refetch,
    isLoading,
    isFetchedAfterMount,
  };
};
