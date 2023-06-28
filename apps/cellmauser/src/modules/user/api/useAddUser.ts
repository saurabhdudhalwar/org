import { useMutation } from "react-query";

import useAxios from "../../../hooks/useAxios";
import { ADD_USER } from "../config";

/**
 * Hook for adding  user details which takes in props or user details
 * @returns {UseMutationResult}
 */
export const useAddUser = () => {
  const axiosInstance = useAxios();
  const addUserDetails = (paramList: any) => {
    return axiosInstance.post(ADD_USER, paramList);
  };
  return useMutation(addUserDetails);
};

export const useUpdateUserDetails = () => {
  const axiosInstance = useAxios();
  const updateUserDetails = (userDetails: any) => {
    return axiosInstance.put(ADD_USER, userDetails);
  };

  return useMutation(updateUserDetails);
};
