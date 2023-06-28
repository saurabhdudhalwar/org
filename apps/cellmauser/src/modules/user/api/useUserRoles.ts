import { useQuery } from "react-query";

import useAxios from "../../../hooks/useAxios";
import { GET_USER_ROLES } from "../config";

const useGetUserRoles = () => {
  const axiosInstance = useAxios();

  const getUserRoles = () => {
    return axiosInstance.get(GET_USER_ROLES);
  };

  const select = (response: any) => {
    if (response.status === 200) {
      return response?.data?.entity?.userRoles;
    }
  };

  const { data: userRolesData } = useQuery(GET_USER_ROLES, getUserRoles, {
    select,
  });

  const data = userRolesData || [];

  return { data };
};

export default useGetUserRoles;
