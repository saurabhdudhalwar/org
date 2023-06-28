import { useQuery } from "react-query";

import useAxios from "../../../hooks/useAxios";
import { GET_CLINIC_LIST } from "../config";

const useGetClinicList = () => {
  const axiosInstance = useAxios();

  const getClinicList = () => {
    return axiosInstance.get(GET_CLINIC_LIST);
  };

  const select = (response: any) => {
    if (response.status === 200) {
      return response?.data?.entity?.establishmentServices;
    }
  };

  const { data: useClinicListData } = useQuery(GET_CLINIC_LIST, getClinicList, {
    select,
  });

  const data = useClinicListData || [];

  return { data };
};

export default useGetClinicList;
