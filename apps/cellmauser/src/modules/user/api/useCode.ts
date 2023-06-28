import { useMutation, useQuery, useQueryClient } from "react-query";
import { useDispatch, useSelector } from "react-redux";

import useAxios from "../../../hooks/useAxios";
import dispatchSnackbar from "../../../utils/ResponseCodeHandler";
import {
  GET_LIST_ITEM_CODE,
  LIST_ITEM_CODE,
  UPDATE_LIST_ITEM_CODE,
} from "../config";

// To save the code
export const useAddCode = () => {
  const axiosInstance = useAxios();

  const addCodeDetails = (codeDetails: any) => {
    return axiosInstance.post(LIST_ITEM_CODE, codeDetails);
  };

  return useMutation(addCodeDetails);
};

// To get the code
export const useGetCodeDetails = (eliId: number) => {
  const axiosInstance = useAxios();
  const getCodeDetails = (id?: number) => {
    return axiosInstance.get(GET_LIST_ITEM_CODE, {
      params: { eliId: id },
    });
  };

  const select = (response: any) => {
    if (response.status === 200) {
      return response?.data?.entity;
    }
  };

  const { data, isLoading, refetch } = useQuery(
    [GET_LIST_ITEM_CODE, eliId],
    () => getCodeDetails(eliId),
    {
      select,
      enabled: !!eliId,
    }
  );

  const codeDetails = data ?? {};

  return { codeDetails, isLoading, refetch };
};

export const useUpdateCodeDetails = () => {
  const { language } = useSelector((state: any) => state.language);
  const axiosInstance = useAxios();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const updateCodeDetails = (codeDetails: any) => {
    return axiosInstance.put(UPDATE_LIST_ITEM_CODE, codeDetails);
  };

  const onSuccess = (response: any) => {
    dispatchSnackbar(response, dispatch, language);
    queryClient.invalidateQueries(UPDATE_LIST_ITEM_CODE);
  };

  return useMutation(updateCodeDetails, { onSuccess });
};
