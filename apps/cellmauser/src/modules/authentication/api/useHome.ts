import { useQuery } from "react-query";
import { useDispatch } from "react-redux";

import useAxios from "../../../hooks/useAxios";
import { setIsUseSpecialtyAndRegionSetting } from "../../eventData/store/EventDataAction";
import { USER_HOME } from "../config";

const useHome = () => {
  const axiosInstance = useAxios(); // This will be there in all the hooks
  const dispatch = useDispatch();

  const getUserHomeIcons = () => {
    return axiosInstance.get(USER_HOME);
  };

  const select = (response: any) => {
    if (response.status === 200) {
      if (response?.data?.validationCode === "homePageIcon.found")
        dispatch(
          setIsUseSpecialtyAndRegionSetting(
            response.data.settings?.estUseSpecialityAndRegion === 1
          )
        );
      return {
        entity: response.data.entity,
        settings: response.data.settings,
      };
    }
    return null;
  };

  return useQuery(USER_HOME, getUserHomeIcons, {
    select,
    cacheTime: 0,
    refetchOnWindowFocus: true,
  });
};

export default useHome;
