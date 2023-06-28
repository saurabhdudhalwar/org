import { useQuery } from "react-query";

import useAxios from "../../../hooks/useAxios";
import { USER_GROUP_GROUPINGS } from "../config";

const useGetUserGroupGroupings = () => {
  const axiosInstance = useAxios();

  const getUserGroupGroupings = () => {
    return axiosInstance.get(USER_GROUP_GROUPINGS);
  };

  const select = (response: any) => {
    if (response.status === 200) {
      return response?.data?.entity?.userGroupsGroupings;
    }
  };

  const { data: userGroupingsData } = useQuery(
    USER_GROUP_GROUPINGS,
    getUserGroupGroupings,
    {
      select,
    }
  );

  const data = userGroupingsData || [];

  return { data };
};

export default useGetUserGroupGroupings;
