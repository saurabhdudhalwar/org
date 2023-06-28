import { useQuery } from "react-query";

import useAxios from "../../../hooks/useAxios";
import { ADDITIONAL_DETAILS } from "../config";

const useAdditionalDetails = (patientId: number) => {
  const axiosInstance = useAxios();

  const getAdditionalDetails = (patId: number) => {
    return axiosInstance.get(ADDITIONAL_DETAILS, { params: { patId } });
  };

  const select = (response: any) => {
    if (response.status === 200) {
      return {
        additionalDetails: response?.data?.entity?.additionalDetails,
        nextOfKin: response?.data?.entity?.nextOfKin,
      };
    }
    return null;
  };

  return useQuery(ADDITIONAL_DETAILS, () => getAdditionalDetails(patientId), {
    select,
  });
};

export default useAdditionalDetails;
