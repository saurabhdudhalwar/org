import { useEffect, useState } from "react";

import { useQuery } from "react-query";

import useAxios from "../../../hooks/useAxios";
import { PATIENT_LIST } from "../config";

type PatientSearchQuery = {
  patMpiNumber?: string;
  patBarcode?: string;
  patCard?: string;
  patNhsRef?: string;
  patHospitalRef?: string;
  patFirstname?: string;
  patSurname?: string;
  patSex?: string;
  patDob?: string | null;
  patMobile?: string;
  patPostcode?: string;
  patMrnNumber?: string;
  patSoundx?: string;
  patIdentifier?: string;
  patNameOtherLang?: string;
  patInService?: string;
  patLastSeenDays?: string;
  patDeseased?: string;
  pageNumber?: number;
  patExport?: string;
};

const usePatientList = (
  searchQuery: PatientSearchQuery,
  pageNumber: number,
  enabled: boolean
) => {
  const axiosInstance = useAxios();
  const [patientListCount, setListCount] = useState(0);

  const getPatientList = (query: PatientSearchQuery) => {
    return axiosInstance.get(PATIENT_LIST, {
      params: { ...query, pageNumber },
    });
  };

  const select = (response: any) => {
    const responseCode = response?.data?.validationCode;
    if (responseCode === "patientList.found") {
      return {
        patientList: response?.data?.entity?.patientsList,
        count: response?.data?.entity?.patientListCount,
        settings: response?.data?.settings,
      };
    }
  };

  const { data, refetch, isLoading } = useQuery(
    [PATIENT_LIST, searchQuery, pageNumber],
    () => getPatientList(searchQuery),
    { enabled, cacheTime: 0, select }
  );

  useEffect(() => {
    if (data?.count) setListCount(data?.count);
  }, [data?.count]);

  const patientList = data?.patientList ?? [];
  const settings = data?.settings;

  return { patientListCount, settings, patientList, refetch, isLoading };
};

export default usePatientList;
