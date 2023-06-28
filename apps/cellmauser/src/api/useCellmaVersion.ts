import { useQuery } from "react-query";

import useAxios from "../hooks/useAxios";
import { CELLMA_API_VERSION } from "../modules/authentication/config";

const useCellmaVersion = () => {
  const axiosInstance = useAxios();

  const getCellmaVersion = () => {
    return axiosInstance.get(CELLMA_API_VERSION);
  };

  const select = (response: any) => {
    return response?.data?.entity?.cellmaUserApiVersion;
  };

  return useQuery(CELLMA_API_VERSION, getCellmaVersion, {
    select,
    cacheTime: Infinity,
    staleTime: Infinity,
  });
};

export default useCellmaVersion;
