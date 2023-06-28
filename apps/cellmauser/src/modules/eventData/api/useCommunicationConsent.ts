import { useMutation, useQuery, useQueryClient } from "react-query";
import { useDispatch, useSelector } from "react-redux";

import useAxios from "../../../hooks/useAxios";
import dispatchSnackbar from "../../../utils/ResponseCodeHandler";
import {
  ADD_COMMUNICATION_CONSENT,
  GET_COMMUNICATION_CONSENT,
  UPDATE_COMMUNICATION_CONSENT,
} from "../config";

export const useGetConsentDetails = (patientId: any) => {
  const axiosInstance = useAxios();

  const getConsentDetails = (patientId: any) => {
    return axiosInstance.get(GET_COMMUNICATION_CONSENT, {
      params: patientId,
    });
  };
  const select = (response: any) => {
    if (response?.status === 200) {
      return {
        patientAddressDetails: response?.data?.entity?.patientAddressDetails,
        patientConsent: response?.data?.entity?.patientConsent,
        gpAddressDetails: response?.data?.entity?.gpAddressDetails,
      };
    }
  };
  return useQuery(
    GET_COMMUNICATION_CONSENT,
    () => getConsentDetails({ patientId }),
    {
      select,
    }
  );
};

export const useAddConsentDetails = () => {
  const axiosInstance = useAxios();
  const dispatch = useDispatch();
  const { language } = useSelector((state: any) => state.language);

  const addConsentDetails = (consentDetails: object) => {
    return axiosInstance.post(ADD_COMMUNICATION_CONSENT, consentDetails);
  };

  const onSuccess = (response: any) => {
    dispatchSnackbar(response, dispatch, language);
  };

  return useMutation(addConsentDetails, { onSuccess });
};

export const useUpdateConsentDetails = () => {
  const { language } = useSelector((state: any) => state.language);
  const axiosInstance = useAxios();
  const dispatch = useDispatch();

  const updateConsentDetails = (consentDetails: any) => {
    return axiosInstance.put(UPDATE_COMMUNICATION_CONSENT, consentDetails);
  };

  const onSuccess = (response: any) => {
    dispatchSnackbar(response, dispatch, language);
  };

  return useMutation(updateConsentDetails, { onSuccess });
};
