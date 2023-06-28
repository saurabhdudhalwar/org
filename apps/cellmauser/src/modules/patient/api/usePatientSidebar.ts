import { useQuery } from "react-query";

import useAxios from "../../../hooks/useAxios";
import {
  SINGLE_PATIENT_SIDEBAR_DISPLAY,
  SINGLE_PATIENT_SIDEBAR_INFO,
  SINGLE_PATIENT_SIDEBAR_PIP,
} from "../config";

export const usePatientSideBarInfo = (patientId: number) => {
  const axiosInstance = useAxios();

  const getPatientSidebarInfo = (patId: number) => {
    return axiosInstance.get(SINGLE_PATIENT_SIDEBAR_INFO, {
      params: { patId },
    });
  };

  const select = (response: any) => {
    if (response.status === 200) {
      if (
        response?.data?.validationCode === "patient.sidebar.information.success"
      )
        return response.data.entity;
    }
  };

  return useQuery(
    [SINGLE_PATIENT_SIDEBAR_INFO, patientId],
    () => getPatientSidebarInfo(patientId),
    { select }
  );
};

export const usePatientSidebarPIP = (patientId: number) => {
  const axiosInstance = useAxios();

  const getSidebarPIP = (patId: number) => {
    return axiosInstance.get(SINGLE_PATIENT_SIDEBAR_PIP, {
      params: { patId },
    });
  };

  const select = (response: any) => {
    if (response.status === 200) {
      if (
        response?.data?.validationCode ===
        "patient.singlePatientInterestedParty.show.success"
      )
        return response.data.entity;
    }
  };

  return useQuery(SINGLE_PATIENT_SIDEBAR_INFO, () => getSidebarPIP(patientId), {
    select,
  });
};

export const usePatientSidebarDisplay = (patientId: number) => {
  const axiosInstance = useAxios();

  const getSidebarDisplay = (patId: number) => {
    return axiosInstance.get(SINGLE_PATIENT_SIDEBAR_DISPLAY, {
      params: { patId },
    });
  };

  const select = (response: any) => {
    if (response.status === 200) {
      if (response?.data?.validationCode === "single.patient.sidebar.success")
        return response.data.entity;
    }
  };

  return useQuery(
    SINGLE_PATIENT_SIDEBAR_DISPLAY,
    () => getSidebarDisplay(patientId),
    { select }
  );
};
