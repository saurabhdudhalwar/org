import { useMutation, useQuery } from "react-query";

import useAxios from "../../../hooks/useAxios";
import {
  ADD_REFERRAL,
  ADD_REFERRAL_DOCUMENT,
  PATIENT_REFERRAL_DISPLAY,
  REFERRING_PROFESSIONAL,
} from "../config";

export const usePatientReferralDisplay = (patId: number) => {
  const axiosInstance = useAxios();

  const getPatientReferralDisplay = (id: number) => {
    return axiosInstance.get(PATIENT_REFERRAL_DISPLAY, {
      params: { patId: id },
    });
  };

  const select = (response: any) => {
    if (response.status === 200) {
      return {
        entity: response?.data?.entity,
        settings: response?.data?.settings,
      };
    }
    return null;
  };
  return useQuery(
    PATIENT_REFERRAL_DISPLAY,
    () => getPatientReferralDisplay(patId),
    {
      select,
      enabled: !!patId,
    }
  );
};

/**
 * Hook for adding referral details which takes in props or referral details
 * @returns {UseMutationResult}
 */
export const useAddReferral = () => {
  const axiosInstance = useAxios();
  const addReferralDetails = (paramList: any) => {
    return axiosInstance.post(ADD_REFERRAL, paramList);
  };
  return useMutation(addReferralDetails);
};

export const useReferringProfessionalDetails = (
  searchText: string,
  enabled: boolean
) => {
  const axiosInstance = useAxios();

  const getReferringProfessionalDetails = (searchText: string) => {
    return axiosInstance.get(REFERRING_PROFESSIONAL, {
      params: { searchText },
    });
  };

  const select = (response: any) => {
    if (response.status === 200) return response?.data?.entity?.hpList;
  };

  const { data, isLoading, refetch } = useQuery(
    [REFERRING_PROFESSIONAL, searchText],
    () => getReferringProfessionalDetails(searchText),
    {
      select,
      enabled,
    }
  );

  const hpList = data || [];

  return { hpList, isLoading, refetch };
};

/**
 * Hook for adding referral documents
 * @returns {UseMutationResult}
 */
export const useAddReferralDocuments = () => {
  const axiosInstance = useAxios("multipart/form-data");
  const addReferralDocuments = (paramList: FormData) => {
    return axiosInstance.post(ADD_REFERRAL_DOCUMENT, paramList);
  };
  return useMutation(addReferralDocuments);
};
