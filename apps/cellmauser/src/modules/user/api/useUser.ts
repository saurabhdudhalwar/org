import { useQuery } from "react-query";
import { useDispatch } from "react-redux";

import useAxios from "../../../hooks/useAxios";
import { USER_DISPLAY, USER_USERS } from "../config";

type ParameterList = {
  useUsername?: string;
  useFirstname?: string;
  useSurname: string;
  useActive?: string;
  useCliId?: string;
  pageNumber?: number;
  useExport?: string;
};

export const useGetUserDisplay = () => {
  const axiosInstance = useAxios(); // This will be there in all the hooks
  const dispatch = useDispatch();

  const getUserDisplay = () => {
    return axiosInstance.get(USER_DISPLAY);
  };
  const select = (response: any) => {
    if (response.status === 200) {
      return {
        clinicList: response?.data?.entity?.clinicList,
        currentActiveUsersCount:
          response?.data?.entity?.currentActiveUsersCount,
        settings: response?.data?.settings,
      };
    }
    return null;
  };

  return useQuery(USER_DISPLAY, getUserDisplay, {
    select,
  });
};

export const useGetUserDetails = (parameterList: ParameterList) => {
  const axiosInstance = useAxios(); // This will be there in all the hooks

  const getUserDetails = (parameterList: ParameterList) => {
    return axiosInstance.get(USER_USERS, {
      params: parameterList,
    });
  };

  const select = (response: any) => {
    if (response.status === 200) {
      if (response?.data?.validationCode === "userlist.found")
        return {
          userFound: response?.data?.entity?.userFound,
          userCount: response?.data?.entity?.userCount,
          usersList: response?.data?.entity?.users,
        };
    }
  };
  return useQuery(USER_USERS, () => getUserDetails(parameterList), {
    select,
    enabled: false,
  });
};
