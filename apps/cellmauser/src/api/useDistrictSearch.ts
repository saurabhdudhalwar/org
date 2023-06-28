import { useQuery } from "react-query";

import { DISTRICT_SEARCH } from "../config";
import useAxios from "../hooks/useAxios";

const useDistrictSearch = (District: string, enabled: boolean) => {
  const axiosInstance = useAxios();

  const getDistricts = (district: string) => {
    return axiosInstance.get(DISTRICT_SEARCH, { params: { district } });
  };

  const select = (response: any) => {
    if (response.status === 200)
      if (response?.data?.validationCode === "user.district.found") {
        return response?.data?.entity;
      }
  };

  const { data, isLoading, refetch } = useQuery(
    [DISTRICT_SEARCH, District],
    () => getDistricts(District),
    {
      select,
      enabled,
    }
  );

  const districts = data || [];

  return { districts, isLoading, refetch };
};

export default useDistrictSearch;
