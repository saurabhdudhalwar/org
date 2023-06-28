import { useQuery } from "react-query";

import { HOME_PAGE_SIDEBAR } from "../config";
import useAxios from "../hooks/useAxios";

const useHomePageSidebar = (Mode: string) => {
  const axiosInstance = useAxios();

  const getHomePageSidebar = (mode: string) => {
    return axiosInstance.post(HOME_PAGE_SIDEBAR, null, { params: { mode } });
  };

  const select = (response: any) => {
    const responseCode = response?.data?.validationCode;
    if (responseCode === "user.success") {
      return {
        count: response?.data?.entity?.count,
        settings: response?.data?.settings,
      };
    }
  };

  return useQuery(HOME_PAGE_SIDEBAR, () => getHomePageSidebar(Mode), {
    select,
  });
};

export default useHomePageSidebar;
