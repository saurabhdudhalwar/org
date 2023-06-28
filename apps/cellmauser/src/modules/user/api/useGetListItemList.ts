import { useQuery } from "react-query";

import useAxios from "../../../hooks/useAxios";
import { ESTABLISHMENT_LIST_ITEM_LIST } from "../config";

type ParameterList = {
  eliAppId: any;
  pageNo: any;
};

const useGetListItemList = (parameterList: ParameterList) => {
  const axiosInstance = useAxios();

  const getUserDetails = (parameterList: ParameterList) => {
    return axiosInstance.get(ESTABLISHMENT_LIST_ITEM_LIST, {
      params: parameterList,
    });
  };

  const select = (response: any) => {
    if (response.status === 200) {
      return {
        establishmentListItemList:
          response?.data?.entity?.establishmentListItemList,
        establishmentListItemsCount:
          response?.data?.entity?.establishmentListItemsCount,
      };
    }
  };
  return useQuery(
    ESTABLISHMENT_LIST_ITEM_LIST,
    () => getUserDetails(parameterList),
    {
      select,
    }
  );
};

export default useGetListItemList;
