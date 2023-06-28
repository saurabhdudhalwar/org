import { useMutation } from "react-query";

import useAxios from "../../../hooks/useAxios";
import { PIP_ADDRESS } from "../config";

const useUpdatePIPAddress = () => {
  const axiosInstance = useAxios();

  const updatePIPAddress = (address: any) => {
    return axiosInstance.put(PIP_ADDRESS, address);
  };

  return useMutation(updatePIPAddress);
};

export default useUpdatePIPAddress;
