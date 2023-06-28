import { useMutation, useQuery, useQueryClient } from "react-query";
import { useDispatch } from "react-redux";

import useAxios from "../../../hooks/useAxios";
import useDispatchSnackbar from "../../../hooks/useDispatchSnackbar";
import { PATIENT_DETAILS } from "../config";
import {
  setIsShowPatientIdentifier,
  setPatientId,
  setPreventDemographicsChange,
  setSgrId,
} from "../store/PatientAction";

/**
 * Hook for fetching patient details
 * @param {string} patId - Patient ID
 * @returns {}
 */
export const useGetPatientDetails = (
  patId: string | null,
  enabled?: boolean
) => {
  const axiosInstance = useAxios();
  const dispatch = useDispatch();

  const getDetails = (Id: string | null) => {
    if (Id !== null)
      return axiosInstance.get(PATIENT_DETAILS, { params: { patId: Id } });
  };

  const onSuccess = (response: any) => {
    if (response?.status === 200) {
      if (response?.data?.validationCode === "patient.details.get.success") {
        dispatch(
          setIsShowPatientIdentifier(
            response?.data?.entity?.showPatientIdentifier
              ? response?.data?.entity?.showPatientIdentifier
              : false
          )
        );
        dispatch(
          setPreventDemographicsChange(
            response?.data?.settings?.preventDemographicsChange
              ? response?.data?.settings?.preventDemographicsChange
              : ""
          )
        );
      }
    }
  };

  const select = (response: any) => {
    if (response?.status === 200) {
      if (response?.data?.validationCode === "patient.details.get.success") {
        if (response?.data?.entity) {
          return {
            entity: response?.data?.entity,
            patientDetails: response?.data?.entity?.PatientDetails,
            patIdentifierList: response?.data?.entity?.patIdentifierList,
            estDisplayInterpreterType:
              response?.data?.entity?.estDisplayInterpreterType,
            settings: response?.data?.settings,
          };
        }
      }
    }
    return null;
  };

  return useQuery([PATIENT_DETAILS, patId], () => getDetails(patId), {
    onSuccess,
    select,
    refetchOnMount: true,
    cacheTime: 0,
    staleTime: 0,
    enabled: enabled || true,
  });
};

export const useAddPatientDetails = () => {
  const axiosInstance = useAxios();
  const dispatchSnackbar = useDispatchSnackbar();
  const dispatch = useDispatch();

  const addDetails = (patDetails: object) => {
    return axiosInstance.post(PATIENT_DETAILS, patDetails);
  };

  const onSuccess = (response: any) => {
    const responseCode = response?.data?.validationCode;
    if (responseCode === "patient.add.success") {
      dispatchSnackbar(response);
      dispatch(setPatientId(response?.data?.entity?.patId));
    }
  };

  return useMutation(addDetails, { onSuccess });
};

/**
 * Hook for updating patient details which takes in props or patient details
 * @returns {}
 */
export const useUpdatePatientDetails = () => {
  const axiosInstance = useAxios();
  const dispatch = useDispatch();
  const dispatchSnackbar = useDispatchSnackbar();
  const queryClient = useQueryClient();

  const updateDetails = (patDetails: any) => {
    return axiosInstance.put(PATIENT_DETAILS, patDetails);
  };

  const onSuccess = (response: any) => {
    const responseCode = response?.data?.validationCode;
    if (responseCode === "patient.update.success") dispatchSnackbar(response);
    dispatch(setSgrId(response?.data?.entity?.sgrId));
    const { patId } = response.data.entity;
    queryClient.invalidateQueries([PATIENT_DETAILS, patId]);
  };

  return useMutation(updateDetails, { onSuccess });
};
