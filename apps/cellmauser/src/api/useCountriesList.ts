import { useQuery } from "react-query";

import useAxios from "../hooks/useAxios";
import { COUNTRY } from "../modules/patient/config";

const useCountriesLists = () => {
  const axiosInstance = useAxios();

  const getCountriesLists = () => {
    return axiosInstance.get(COUNTRY);
  };

  const select = (response: any) => {
    if (response.status === 200) {
      return response?.data?.entity?.coutryList;
    }
    return [];
  };

  const { data: countryData, isLoading } = useQuery(
    COUNTRY,
    getCountriesLists,
    {
      select,
      cacheTime: Infinity,
      staleTime: Infinity,
    }
  );

  const data = countryData || [];

  return { data, isLoading };
};

export default useCountriesLists;
