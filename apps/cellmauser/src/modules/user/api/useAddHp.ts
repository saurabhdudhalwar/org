import { useMutation } from "react-query";

import useAxios from "../../../hooks/useAxios";
import { ADD_HP } from "../config";

/**
 * Hook for adding  user details which takes in props or user details
 * @returns {UseMutationResult}
 */
export const useAddHp = () => {
  const axiosInstance = useAxios();
  const addHpDetails = (paramList: any) => {
    return axiosInstance.post(ADD_HP, paramList);
  };
  return useMutation(addHpDetails);
};

export const useUpdateHpDetails = () => {
  const axiosInstance = useAxios();
  const updateHpDetails = (paramList: any) => {
    return axiosInstance.put(ADD_HP, paramList);
  };

  return useMutation(updateHpDetails);
};
