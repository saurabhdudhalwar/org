import qs from "qs";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useDispatch, useSelector } from "react-redux";

import useAxios from "../../../hooks/useAxios";
import dispatchSnackbar from "../../../utils/ResponseCodeHandler";
import {
  ADD_HP,
  DELETE_CLINIC_DIARY,
  DELETE_HP_DIARY,
  HP_DIARY,
  HP_DISPLAY,
  HP_LEAVE,
  REPEAT_SCHEDULE,
} from "../config";

const useGetHpDisplay = () => {
  const axiosInstance = useAxios(); // This will be there in all the hooks

  const getHpDisplay = () => {
    return axiosInstance.get(HP_DISPLAY);
  };
  const select = (response: any) => {
    if (response.status === 200) {
      if (response?.data?.validationCode === "health.professionallist.found") {
        return {
          clinicEstablishmentProfessionals:
            response?.data?.entity?.clinicEstablishmentProfessionals,
        };
      }
    }
    return null;
  };

  return useQuery(HP_DISPLAY, getHpDisplay, {
    select,
    cacheTime: 0,
  });
};

export const useSetHpLeave = () => {
  const axiosInstance = useAxios(); // This will be there in all the hooks
  const dispatch = useDispatch();
  const { language } = useSelector((state: any) => state.language);
  const queryClient = useQueryClient();
  const setHpLeave = (paramList: any) => {
    return axiosInstance.post(HP_LEAVE, paramList);
  };
  const onSuccess = (response: any) => {
    dispatchSnackbar(response, dispatch, language);
    queryClient.invalidateQueries(HP_LEAVE);
  };
  return useMutation(setHpLeave, { onSuccess });
};

export default useGetHpDisplay;

type ParameterList = {
  hpdId?: number[];
  endDate?: any;
};

// API call for repeat schedule
export const useRepeatSchedule = () => {
  const { language } = useSelector((state: any) => state.language);
  const axiosInstance = useAxios();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const updateRepeatScheduleDetails = (parameterList: ParameterList) => {
    return axiosInstance.put(REPEAT_SCHEDULE, null, {
      params: parameterList,
      paramsSerializer: {
        serialize: (params) => {
          return qs.stringify(
            {
              hpdId: params?.hpdId,

              endDate: params?.endDate,
            },

            { arrayFormat: "repeat" }
          );
        },
      },
    });
  };

  const onSuccess = (response: any) => {
    dispatchSnackbar(response, dispatch, language);
    queryClient.invalidateQueries(REPEAT_SCHEDULE);
  };

  return useMutation(updateRepeatScheduleDetails, { onSuccess });
};

// API call for delete HP diary details
export const useDeleteHpDiaryDetails = () => {
  const axiosInstance = useAxios();

  const deleteHpDiaryDetails = (hpdId: number) => {
    return axiosInstance.delete(DELETE_HP_DIARY, {
      params: { hpdId },
    });
  };

  return useMutation(deleteHpDiaryDetails);
};

export const useGetHpDetails = (
  hpdId: number | undefined,
  hcdId: number | undefined
) => {
  const parameterList = {
    hpdId,
    hcdId,
  };

  const axiosInstance = useAxios();

  const getHpDetails = (parameter: any) => {
    return axiosInstance.get(HP_DIARY, {
      params: parameter,
    });
  };
  return useQuery(HP_DIARY, () => getHpDetails(parameterList), {
    cacheTime: 0,
    refetchOnMount: false,
    enabled: !!hpdId || !!hcdId,
  });
};

export const useHpDetails = () => {
  const axiosInstance = useAxios();
  const updateHpDetails = (hpDetails: any) => {
    return axiosInstance.put(ADD_HP, hpDetails);
  };

  return useMutation(updateHpDetails);
};

// API call for delete clinic diary details
export const useDeleteClinicDiaryDetails = () => {
  const axiosInstance = useAxios();

  const deleteClinicDiaryDetails = (hcdId: number) => {
    return axiosInstance.delete(DELETE_CLINIC_DIARY, {
      params: { hcdId },
    });
  };

  return useMutation(deleteClinicDiaryDetails);
};
