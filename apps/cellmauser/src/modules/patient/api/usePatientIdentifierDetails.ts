import { useMutation, useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";

import useAxios from "../../../hooks/useAxios";
import dispatchSnackbar from "../../../utils/ResponseCodeHandler";
import {
  DELETE_PATIENT_IDENTIFIER_DETAILS,
  PATIENT_IDENTIFIER,
  PATIENT_IDENTIFIER_DETAILS,
} from "../config";

export const useGetPatientIdentifierDetails = (patId: string | null) => {
  const axiosInstance = useAxios();

  const getPatientIdentifierDetails = (Id: string | null) => {
    if (Id)
      return axiosInstance.get(PATIENT_IDENTIFIER_DETAILS, {
        params: { patId: Id },
      });
  };

  const select = (response: any) => {
    if (response?.status === 200) {
      if (response?.data?.validationCode === "identifier.details.get.success") {
        if (response?.data?.entity) {
          return {
            patIdentifierList: response?.data?.entity?.patIdentifierList,
          };
        }
      }
    }
    return null;
  };

  return useQuery(
    ["patientIdentifierDetails", patId],
    () => getPatientIdentifierDetails(patId),
    {
      select,
      refetchOnMount: true,
    }
  );
};

export const useDeletePatientIdentifierDetails = () => {
  const axiosInstance = useAxios();
  const dispatch = useDispatch();
  const { language } = useSelector((state: any) => state.language);

  const deletePatientIdentifierDetails = (Id: string) => {
    return axiosInstance.delete(DELETE_PATIENT_IDENTIFIER_DETAILS, {
      params: { pidId: Id },
    });
  };

  const onSuccess = (response: any) => {
    if (response.status === 200) {
      dispatchSnackbar(response, dispatch, language);
    }
  };

  return useMutation(deletePatientIdentifierDetails, { onSuccess });
};

export const usePatientIdentifiers = (patientId: number) => {
  const axiosInstance = useAxios();

  const getPateintIdentifiers = (patId: number) => {
    return axiosInstance.get(PATIENT_IDENTIFIER, { params: { patId } });
  };

  const select = (response: any) => {
    if (response.status === 200) {
      if (response?.data?.validationCode === "patient.identifier.get.success") {
        return response?.data?.entity;
      }
    }
  };

  return useQuery(
    [PATIENT_IDENTIFIER, patientId],
    () => getPateintIdentifiers(patientId),
    { select }
  );
};

type PatientIdentifier = {
  pidTypeEliId: string;
  pidPatId: number;
  pidValue: string;
  pidIssuingCountryCode: string;
};

export const useAddPatientIdentifier = () => {
  const axiosInstance = useAxios();

  const addPatientIdentifier = (patientIdentifier: PatientIdentifier) => {
    return axiosInstance.post(PATIENT_IDENTIFIER, patientIdentifier);
  };

  return useMutation(addPatientIdentifier);
};
