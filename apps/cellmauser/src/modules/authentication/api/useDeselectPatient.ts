import { useEffect, useState } from "react";

import { useMutation, useQuery, useQueryClient } from "react-query";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import useAxios from "../../../hooks/useAxios";
import { DESELECT_PATIENT, SELECT_PATIENT } from "../../patient/config";
import {
  setIsContactTypeSelected,
  setPatientDod,
  setPatientId,
  setSgrId,
} from "../../patient/store/PatientAction";

type Entity = {
  mergedPatIds: string;
  patId: number;
};
type Settings = {
  cliHidePatientRemindersPopup: number;
  estPatientIdentifierTopbar: number;
  hidePipOnEmailMobilePage: number;
  estUseAddressLookup: number;
  estPreventDemographicsChange: number;
};

type SelectPatient = {
  validationCode: string[];
  entity: Entity;
  informationMessages: string[];
  settings: Settings;
};

export const useDeselectPatient = (
  patientID: number,
  sgrId: number,
  isCloseContact: boolean
) => {
  const axiosInstance = useAxios();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const deselectPatient = (
    patId: number,
    sgrId: number,
    isCloseContact: boolean
  ) => {
    return axiosInstance.get(DESELECT_PATIENT, {
      params: { patId, sgrId, isCloseContact },
    });
  };

  const onSuccess = (response: any) => {
    const responseCode = response?.data?.validationCode;
    if (responseCode === "patient.deselected.success") {
      dispatch(setPatientId(null));
      dispatch(setSgrId(0));
      dispatch(setIsContactTypeSelected(false));
      dispatch(setPatientDod(""));
    }
    return null;
  };
  return useQuery(
    DESELECT_PATIENT,
    () => deselectPatient(patientID, sgrId, isCloseContact),
    {
      enabled: false,
      onSuccess,
      cacheTime: 0,
    }
  );
};

export const useSelectPatient = (customOnSuccess?: any) => {
  const axiosInstance = useAxios();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [patientID, setPatientID] = useState<number>();

  const selectPatientID = (id: number) => {
    setPatientID(id);
  };

  const selectPatient = (patId: number) => {
    return axiosInstance.get(SELECT_PATIENT, { params: { patId } });
  };

  const onSuccess =
    customOnSuccess ||
    ((response: any) => {
      if (response.status === 200) {
        const responseCode = response?.data?.validationCode;
        if (responseCode === "patient.selected.success") {
          const patId = response?.data?.entity.patId;
          dispatch(setPatientId(patId));
          navigate("/cellmaUser/patient/confirmPatientDetails", {
            state:
              response?.data?.informationMessages?.length > 0 &&
              response?.data?.informationMessages,
          });
        }
      }
    });

  const { refetch, isLoading } = useQuery(
    SELECT_PATIENT,
    () => selectPatient(patientID as number),
    {
      onSuccess,
      enabled: false,
    }
  );

  useEffect(() => {
    if (patientID) {
      refetch();
    }
  }, [patientID]);

  return { selectPatientID, isLoading };
};

export const usePatientID = () => {
  const queryClient = useQueryClient();
  const data = queryClient.getQueryData(SELECT_PATIENT);
  if (data) return data;
  throw new Error("can not use patientId as patient not selected");
};

export const useMutationSelectPatient = () => {
  const axiosInstance = useAxios();

  const selectPatient = (patId: number) => {
    return axiosInstance.get(SELECT_PATIENT, { params: { patId } });
  };

  return useMutation(selectPatient);
};
