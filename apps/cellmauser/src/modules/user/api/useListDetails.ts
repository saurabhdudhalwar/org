import { useMutation, useQuery, useQueryClient } from "react-query";
import { useDispatch, useSelector } from "react-redux";

import useAxios from "../../../hooks/useAxios";
import dispatchSnackbar from "../../../utils/ResponseCodeHandler";
import {
  ADD_ESTABLISHMENT_LIST_ITEMS,
  GET_ESTABLISHMENT_LIST,
  UPDATE_ESTABLISHMENT_LIST_ITEM,
} from "../config";

export const useAddListDetails = () => {
  const axiosInstance = useAxios();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const { language } = useSelector((state: any) => state.language);

  const addListDetails = (listDetails: object) => {
    return axiosInstance.post(ADD_ESTABLISHMENT_LIST_ITEMS, listDetails);
  };

  const onSuccess = (response: any) => {
    dispatchSnackbar(response, dispatch, language);
    queryClient.invalidateQueries(ADD_ESTABLISHMENT_LIST_ITEMS);
  };

  return useMutation(addListDetails, { onSuccess });
};

export const useUpdateListDetails = () => {
  const { language } = useSelector((state: any) => state.language);
  const axiosInstance = useAxios();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const updateListDetails = (listDetails: any) => {
    return axiosInstance.put(UPDATE_ESTABLISHMENT_LIST_ITEM, listDetails);
  };

  const onSuccess = (response: any) => {
    dispatchSnackbar(response, dispatch, language);
    queryClient.invalidateQueries(UPDATE_ESTABLISHMENT_LIST_ITEM);
  };

  return useMutation(updateListDetails, { onSuccess });
};

type ParameterList = {
  eliId?: number;
};

export const useGetListDetails = (parameterList: ParameterList) => {
  const axiosInstance = useAxios();
  const { language } = useSelector((state: any) => state.language);
  const dispatch = useDispatch();

  const getListDetails = (parameterList: ParameterList) => {
    return axiosInstance.get(GET_ESTABLISHMENT_LIST, {
      params: parameterList,
    });
  };

  const select = (response: any) => {
    if (response?.status === 200) {
      return {
        establishmentListItem: response?.data?.entity?.establishmentListItem,
        settings: response?.data?.entity?.settings,
        cliName: response?.data?.entity?.cliName,
        appName: response?.data?.entity?.appName,
      };
    }
    dispatchSnackbar(response, dispatch, language);
  };

  return useQuery(
    [GET_ESTABLISHMENT_LIST, parameterList],
    () => getListDetails(parameterList),
    {
      select,
      enabled: false,
      cacheTime: 0,
    }
  );
};
