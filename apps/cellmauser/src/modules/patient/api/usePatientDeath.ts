import { useEffect } from "react";

import { useMutation, useQuery } from "react-query";

import useAxios from "../../../hooks/useAxios";
import { CAUSE_OF_DEATH, PATIENT_DEATH } from "../config";

type CauseOfDeath = {
  podId: number;
  deathType: string | null;
  causeOfDeathTypeEliId: number | null;
  causeOfDeathTypeEliText: number | null;
  cause: string;
  causeCode: string;
  causeCodeType: string;
};

type CauseOfDeathT = {
  podId: number;
  deathType: string | null;
  causeOfDeathTypeEliId: number | null;
  causeOfDeathTypeEliText: number | null;
  cause: string;
  causeCode: string;
  causeCodeType: string;
  code: string | null;
  fullySpecifiedName: string | null;
  prifix: string | null;
};

export const useGetPatientDeath = (patId: any) => {
  const axiosInstance = useAxios();

  const getPatientDeathDetails = (patId: any) => {
    return axiosInstance.get(PATIENT_DEATH, { params: { patId } });
  };

  const select = (response: any) => {
    if (response.status === 200) {
      const data = response?.data?.entity?.patDeathDeatils;
      const { causeOfDeath, ...otherData } = data;
      causeOfDeath.map((death: CauseOfDeath) => ({
        code: death.causeCode,
        fullySpecifiedName: death.cause,
        prifix: death.causeCodeType,
      }));

      const mainDeath: any = causeOfDeath
        ?.filter(
          (death: CauseOfDeathT) =>
            death.cause !== "null" &&
            death.cause !== null &&
            death.causeOfDeathTypeEliId === null &&
            death.causeOfDeathTypeEliText === null
        )
        .map((item: any) => ({
          podId: item.podId,
          code: item.causeCode,
          description: null,
          modifierFour: null,
          modifierFive: null,
          prifix: item.causeCodeType,
          fullySpecifiedName: item.cause,
        }));

      const otherDeaths = causeOfDeath?.filter(
        (death: CauseOfDeathT) =>
          death.cause !== "null" &&
          death.cause !== null &&
          death.causeOfDeathTypeEliId !== null &&
          death.causeOfDeathTypeEliText !== null
      );

      return { otherData, mainDeath, otherDeaths };
    }
  };

  return useQuery(PATIENT_DEATH, () => getPatientDeathDetails(patId), {
    select,
  });
};

export const usePostPatientDeathDetails = () => {
  const axiosInstance = useAxios();
  const postPatientDeathDetails = (patientDeathDetails: object) => {
    return axiosInstance.post(PATIENT_DEATH, patientDeathDetails);
  };

  return useMutation(postPatientDeathDetails);
};

export const usePutPatientDeathDetails = () => {
  const axiosInstance = useAxios();
  const putPatientDeathDetails = (patientDeathDetails: object) => {
    return axiosInstance.put(PATIENT_DEATH, patientDeathDetails);
  };

  return useMutation(putPatientDeathDetails);
};

export const useCauseOfDeath = (
  type: string,
  description: string,
  code: string
) => {
  const axiosInstance = useAxios();

  const getCauseOfDeath = (
    searchType: string,
    searchString: string,
    searchCode: string
  ) => {
    return axiosInstance.get(CAUSE_OF_DEATH, {
      params: { searchType, searchString, searchCode },
    });
  };

  const select = (response: any) => {
    if (response.status === 200) {
      if (
        response?.data?.validationCode === "patient.causeofdeath.get.success"
      ) {
        return response?.data?.entity?.patientCauseOfDeath as string[];
      }
    }
  };

  const { data, isLoading, refetch } = useQuery(
    CAUSE_OF_DEATH,
    () => getCauseOfDeath(type, description, code),
    { select, enabled: false }
  );

  useEffect(() => {
    refetch();
  }, [type, description, code]);
  const patientCauseOfDeath = data || [];

  return { patientCauseOfDeath, isLoading };
};
