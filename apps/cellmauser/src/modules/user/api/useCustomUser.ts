import { useMutation, useQuery } from "react-query";

import useAxios from "../../../hooks/useAxios";
import { ADD_USER_CUSTOMIZABLE, USER_CUSTOMIZABLE_DETAILS } from "../config";

type ParameterList = {
  pageName: string;
  domainName: string;
  displayViewType: string;
};

/**
 * Hook for fetching Custom user details
 * @param {string} pageName - Page name
 * @param {string} domainName -Domain name
 * @param {string} displayViewType -View type
 * @returns {UseQueryResult}
 */
export const useGetCustomUserDetails = (parameterList: ParameterList) => {
  const axiosInstance = useAxios();

  const getCustomDetails = (parameterList: ParameterList) => {
    return axiosInstance.get(USER_CUSTOMIZABLE_DETAILS, {
      params: parameterList,
    });
  };
  const select = (response: any) => {
    if (
      response.status === 200 &&
      response?.data?.validationCode === "customizabledispalyfield.found"
    ) {
      return {
        entity: response?.data?.entity,
        cdfDisplayFieldJson: response?.data?.entity?.cdfDisplayFieldJson,
        cdfDisplayViewType: response?.data?.entity?.cdfDisplayViewType,
        cdfDomainName: response?.data?.entity?.cdfDomainName,
        cdfEstId: response?.data?.entity?.cdfEstId,
        cdfId: response?.data?.entity?.cdfId,
        cdfPageName: response?.data?.entity?.cdfPageName,
      };
    }
  };

  return useQuery(
    [USER_CUSTOMIZABLE_DETAILS, parameterList],
    () => getCustomDetails(parameterList),
    { select, cacheTime: 0 }
  );
};

type CustomView = {
  pageName: string;
  domainName: string;
  displayViewType: string;
  displayFieldJson: string;
};

/**
 * Hook for adding and updating user details which takes in props or user details
 * @returns {UseMutationResult}
 */
export const useAddCustomUserDetails = () => {
  const axiosInstance = useAxios();
  const addCustomDetails = (customView: CustomView) => {
    return axiosInstance.post(ADD_USER_CUSTOMIZABLE, customView);
  };
  return useMutation(addCustomDetails);
};
