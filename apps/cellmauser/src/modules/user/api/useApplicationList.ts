import { useQuery } from "react-query";

import useAxios from "../../../hooks/useAxios";
import { GET_APPLICATION_LIST } from "../config";

const useGetApplicationList = () => {
  const axiosInstance = useAxios();

  const getApplicationList = () => {
    return axiosInstance.get(GET_APPLICATION_LIST);
  };

  const select = (response: any) => {
    if (response.status === 200) {
      return response?.data?.entity?.applicationList;
    }
  };

  const { data: useApplicationListData } = useQuery(
    GET_APPLICATION_LIST,
    getApplicationList,
    {
      select,
    }
  );

  const data = useApplicationListData || [];

  return { data };
};

export default useGetApplicationList;
