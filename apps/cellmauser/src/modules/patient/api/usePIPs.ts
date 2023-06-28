import { useEffect, useState } from "react";

import { useQuery } from "react-query";

import useAxios from "../../../hooks/useAxios";
import { PATIENT_INTERESTED_PARTIES } from "../config";

const usePIPs = (patientId: number, page?: number) => {
  const axiosInstance = useAxios();
  const [listCount, setListCount] = useState(0);

  const getPIPs = (patId: number, pageNumber?: number) => {
    return axiosInstance.get(PATIENT_INTERESTED_PARTIES, {
      params: { patId, pageNumber },
    });
  };

  const select = (response: any) => {
    if (response.status === 200) {
      return {
        patientInteresPartyList:
          response?.data.entity?.patientInterestedPartyList,
        count: response?.data?.entity?.totalCount,
      };
    }
    return null;
  };

  const { data, refetch, isLoading } = useQuery(
    [PATIENT_INTERESTED_PARTIES, patientId, page],
    () => getPIPs(patientId, page),
    {
      select,
    }
  );

  useEffect(() => {
    if (data?.count) setListCount(data?.count);
  }, [data?.count]);

  const patientInterestedPartyList = data?.patientInteresPartyList || [];

  return { listCount, patientInterestedPartyList, refetch, isLoading };
};

export default usePIPs;
