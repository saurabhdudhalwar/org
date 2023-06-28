import { useQuery } from "react-query";

import useAxios from "../../../hooks/useAxios";
import { GET_USER_SIGNATURE } from "../config";

const useGetUserSignature = (useUsername: any) => {
  const axiosInstance = useAxios();

  const getUserSignature = (useUsername: any) => {
    return axiosInstance.get(GET_USER_SIGNATURE, {
      params: useUsername,
    });
  };

  const select = (response: any) => {
    const responseCode = response?.data?.validationCode;
    if (response.status === 200) {
      if (responseCode === "user.signature.found")
        return {
          fileName: response?.data?.entity?.fileName,
        };
      return { fileName: "" };
    }
  };
  return useQuery(GET_USER_SIGNATURE, () => getUserSignature(useUsername), {
    select,
  });
};

export default useGetUserSignature;
