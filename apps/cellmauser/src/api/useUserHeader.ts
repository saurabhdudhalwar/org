import { useQuery } from "react-query";
import { useSelector } from "react-redux";

import { USER_HEADER } from "../config";
import useAxios from "../hooks/useAxios";

type Header = {
  username: string;
  userSurname: string;
  userProfession: string;
};

const useUserHeader = () => {
  const axiosInstance = useAxios();
  const { token } = useSelector((state: any) => state.auth);
  const enabled = !(token === "");

  const getUserHeader = () => {
    return axiosInstance.get(USER_HEADER);
  };

  const select = (response: any) => {
    const responseCode = response?.data?.validationCode;
    if (responseCode === "user.success")
      return {
        username: response?.data?.entity?.useUsername,
        userSurname: response?.data?.entity?.userSurname,
        userProfession: response?.data?.entity?.useProfession,
      } as Header;

    return null;
  };

  return useQuery(USER_HEADER, getUserHeader, {
    cacheTime: Infinity,
    staleTime: Infinity,
    select,
    enabled,
  });
};

export default useUserHeader;
