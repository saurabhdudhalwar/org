import { useMutation, useQuery } from "react-query";

import useAxios from "../../../hooks/useAxios";
import { GP_DETAILS, UPDATE_GP_DETAILS } from "../config";

/**
 * Hook for fetching Gp details
 * @param {string} egpId - establishment gp id
 * @returns {UseQueryResult}
 */
export const useGetGpDetails = (paramList: any, mode: string | null) => {
  const axiosInstance = useAxios();
  const getGpDetails = (paramList: any) => {
    return axiosInstance.get(GP_DETAILS, { params: paramList });
  };

  const select = (response: any) => {
    if (response?.status === 200) {
      if (response?.data?.validationCode === "establishmentgp.get.success") {
        if (response?.data?.entity) {
          return {
            entity: response?.data?.entity,
            gpAddress: response?.data?.entity?.gpAddress,
            gpInformation: response?.data?.entity?.gpInformation,
          };
        }
      }
    }
    return null;
  };
  return useQuery(GP_DETAILS, () => getGpDetails(paramList), {
    select,
    cacheTime: 0,
    enabled: mode === "editPatient",
    refetchOnMount: mode === "editPatient",
  });
};

/**
 * Hook for updating Gp details
 * @returns {UseMutationResult}
 */
export const useUpdateGpDetails = () => {
  const axiosInstance = useAxios();
  const updateGpDetails = (params: any) => {
    return axiosInstance.put(UPDATE_GP_DETAILS, params);
  };
  return useMutation(updateGpDetails);
};

export const useAddGP = () => {
  const axiosInstance = useAxios();

  const addGP = (gpDetails: any) => {
    return axiosInstance.post(GP_DETAILS, gpDetails);
  };

  return useMutation(addGP);
};
