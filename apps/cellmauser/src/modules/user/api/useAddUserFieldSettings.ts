import { useQuery } from "react-query";

import useAxios from "../../../hooks/useAxios";
import { USER_ADD_EDIT_DISPLAY } from "../config";

const useAddUserFieldSettings = (userName: any) => {
  const axiosInstance = useAxios();

  const getAddUserFieldSettings = (userName: any) => {
    return axiosInstance.get(USER_ADD_EDIT_DISPLAY, {
      params: { userName },
    });
  };

  const select = (response: any) => {
    if (response?.status === 200) {
      return {
        settings: response?.data?.settings,
        services: response?.data?.entity?.services,
        response: response?.data?.entity,
      };
    }
  };

  return useQuery(
    [USER_ADD_EDIT_DISPLAY, userName],
    () => getAddUserFieldSettings(userName),
    {
      select,
      cacheTime: 0,
    }
  );
};

export default useAddUserFieldSettings;
