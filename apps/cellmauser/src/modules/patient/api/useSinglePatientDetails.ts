import { useMutation, useQuery } from "react-query";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux/es/hooks/useDispatch";
import { useNavigate } from "react-router-dom";

import useAxios from "../../../hooks/useAxios";
import dispatchSnackbar from "../../../utils/ResponseCodeHandler";
import {
  SINGLE_PATIENT_APPOINTMENT_DETAILS,
  SINGLE_PATIENT_AWAITING_ACCEPTANCE_DETAILS,
  SINGLE_PATIENT_CONTACT_TYPE,
  SINGLE_PATIENT_CURRENT_SERVICE_DETAILS,
  SINGLE_PATIENT_DETAILS,
  SINGLE_PATIENT_DEVICES,
  SINGLE_PATIENT_DISCHARGE_SERVICE_DETAILS,
  SINGLE_PATIENT_PROCEDURES,
} from "../config";
import { setIsPatientSelected, setPatientId } from "../store/PatientAction";

/**
 * Hook for fetching single patient details
 *  @param {number} patId - Page name
 * @returns {UseQueryResult}
 */
export const useGetSinglePatientDetails = (patId: number) => {
  const axiosInstance = useAxios();

  const getSinglePatientDetails = (patId: number) => {
    return axiosInstance.get(SINGLE_PATIENT_DETAILS, {
      params: { patId },
    });
  };
  const select = (response: any) => {
    if (response?.status === 200) {
      return {
        clinic: response?.data?.entity?.clinic,
        establishmentProfessionals:
          response?.data?.entity?.establishmentProfessionals,
        establishmentProfessionalList:
          response?.data?.entity?.establishmentProfessionalList,
        externalClinicList: response?.data?.entity?.externalClinicList,

        settings: response?.data?.settings,
      };
    }
  };

  return useQuery(
    [SINGLE_PATIENT_DETAILS, patId],
    () => getSinglePatientDetails(patId),
    {
      select,
      enabled: true,
      cacheTime: 0,
    }
  );
};

export const useSinglePatientProcedures = (patId: number) => {
  const axiosInstance = useAxios();

  const getSinglePatientProcedures = (patId: number) => {
    return axiosInstance.get(SINGLE_PATIENT_PROCEDURES, {
      params: { patId },
    });
  };

  const select = (response: any) => {
    if (response?.status === 200) {
      return {
        procedureDetail: response?.data?.entity?.procedureDetail,
      };
    }
  };

  return useQuery(
    [SINGLE_PATIENT_PROCEDURES, patId],
    () => getSinglePatientProcedures(patId),
    {
      select,
    }
  );
};

export const useSinglePatientCurrentServiceDetails = (patId: number) => {
  const axiosInstance = useAxios();

  const getSinglePatientCurrentServiceDetails = (patId: number) => {
    return axiosInstance.get(SINGLE_PATIENT_CURRENT_SERVICE_DETAILS, {
      params: { patId },
    });
  };

  const select = (response: any) => {
    if (response?.status === 200) {
      return {
        CurrentServicedeatils: response?.data?.entity?.CurrentServicedeatils,
      };
    }
  };

  return useQuery(
    [SINGLE_PATIENT_CURRENT_SERVICE_DETAILS, patId],
    () => getSinglePatientCurrentServiceDetails(patId),
    {
      select,
    }
  );
};

export const useSinglePatientAwaitingAcceptanceDetails = (patId: number) => {
  const axiosInstance = useAxios();

  const getSinglePatientAwaitingAcceptanceDetails = (patId: number) => {
    return axiosInstance.get(SINGLE_PATIENT_AWAITING_ACCEPTANCE_DETAILS, {
      params: { patId },
    });
  };

  const select = (response: any) => {
    if (response?.status === 200) {
      return {
        AwaitingAcceptanceDetails:
          response?.data?.entity?.AwaitingAcceptanceDetails,
      };
    }
  };

  return useQuery(
    [SINGLE_PATIENT_AWAITING_ACCEPTANCE_DETAILS, patId],
    () => getSinglePatientAwaitingAcceptanceDetails(patId),
    {
      select,
    }
  );
};

export const useSinglePatientAppointmentDetails = (patId: number) => {
  const axiosInstance = useAxios();

  const getSinglePatientAppointmentDetails = (patId: number) => {
    return axiosInstance.get(SINGLE_PATIENT_APPOINTMENT_DETAILS, {
      params: { patId },
    });
  };

  const select = (response: any) => {
    if (response?.status === 200) {
      return {
        patientAppointments: response?.data?.entity?.patientAppointments,
      };
    }
  };

  return useQuery(
    [SINGLE_PATIENT_APPOINTMENT_DETAILS, patId],
    () => getSinglePatientAppointmentDetails(patId),
    {
      select,
    }
  );
};

export const useSinglePatientDischargeServiceDetails = (patId: number) => {
  const axiosInstance = useAxios();

  const getSinglePatientDischargeServiceDetails = (patId: number) => {
    return axiosInstance.get(SINGLE_PATIENT_DISCHARGE_SERVICE_DETAILS, {
      params: { patId },
    });
  };

  const select = (response: any) => {
    if (response?.status === 200) {
      return {
        DischargedFromServiceDetails:
          response?.data?.entity?.DischargedFromServiceDetails,
      };
    }
  };

  return useQuery(
    [SINGLE_PATIENT_DISCHARGE_SERVICE_DETAILS, patId],
    () => getSinglePatientDischargeServiceDetails(patId),
    {
      select,
    }
  );
};

export const useSinglePatientContactType = (patId: number) => {
  const axiosInstance = useAxios();

  const getSinglePatientContactType = (patId: number) => {
    return axiosInstance.get(SINGLE_PATIENT_CONTACT_TYPE, {
      params: { patId },
    });
  };

  const select = (response: any) => {
    if (response?.status === 200) {
      return {
        summaryGroupList: response?.data?.entity?.summaryGroupList,
      };
    }
  };

  return useQuery(
    [SINGLE_PATIENT_CONTACT_TYPE, patId],
    () => getSinglePatientContactType(patId),
    {
      select,
    }
  );
};

export const useSinglePatientDevicesDetails = (patId: number) => {
  const axiosInstance = useAxios();

  const getSinglePatientDevicesDetails = (patId: number) => {
    return axiosInstance.get(SINGLE_PATIENT_DEVICES, {
      params: { patId },
    });
  };

  const select = (response: any) => {
    if (response?.status === 200) {
      return {
        patientDeviceList: response?.data?.entity,
      };
    }
  };

  return useQuery(
    [SINGLE_PATIENT_DEVICES, patId],
    () => getSinglePatientDevicesDetails(patId),
    {
      select,
    }
  );
};

/**
 * Hook for add single patient details
 * @param {string} patId - Patient ID
 * @returns {UseQueryResult}
 */
export const useAddSinglePatientDetails = () => {
  const axiosInstance = useAxios();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { language } = useSelector((state: any) => state.language);

  const addSinglePatientDetails = (singlePatientDetails: object) => {
    return axiosInstance.post(SINGLE_PATIENT_DETAILS, singlePatientDetails);
  };

  const onSuccess = (response: any) => {
    const responseCode = response?.data?.validationCode;
    if (responseCode === "single.patient.details.save.success") {
      dispatchSnackbar(response, dispatch, language);
      dispatch(setIsPatientSelected(true));
      navigate("/cellmaUser/patient/editPatient");
    }
  };

  return useMutation(addSinglePatientDetails, { onSuccess });
};
