import { useMutation, useQuery } from "react-query";

import useAxios from "../../../hooks/useAxios";
import {
  ADD_PATIENT_CUSTOMIZABLE,
  PATIENT_CUSTOMIZABLE_DETAILS,
} from "../config";

type ParameterList = {
  pageName: string;
  domainName: string;
  displayViewType: string;
};

/**
 * Hook for fetching Custom patient details
 * @param {string} pageName - Page name
 * @param {string} domainName -Domain name
 * @param {string} displayViewType -View type
 * @returns {UseQueryResult}
 */
export const useGetCustomPatientDetails = (parameterList: ParameterList) => {
  const axiosInstance = useAxios();

  const getCustomDetails = (parameterList: ParameterList) => {
    return axiosInstance.get(PATIENT_CUSTOMIZABLE_DETAILS, {
      params: parameterList,
    });
  };
  return useQuery(
    PATIENT_CUSTOMIZABLE_DETAILS,
    () => getCustomDetails(parameterList),
    { cacheTime: 0 }
  );
};

type CustomView = {
  pageName: string;
  domainName: string;
  displayViewType: string;
  displayFieldJson: string;
};

/**
 * Hook for updating patient details which takes in props or patient details
 * @returns {UseMutationResult}
 */
export const useAddCustomPatientDetails = () => {
  const axiosInstance = useAxios();
  const addCustomDetails = (customView: CustomView) => {
    return axiosInstance.post(ADD_PATIENT_CUSTOMIZABLE, customView);
  };
  return useMutation(addCustomDetails);
};
