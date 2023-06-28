import { useMutation, useQuery } from "react-query";

import { PIP_IS_PATIENT } from "../../../config";
import useAxios from "../../../hooks/useAxios";
import useDispatchSnackbar from "../../../hooks/useDispatchSnackbar";
import { PIP_DETAILS } from "../config";

type PipAddress = {
  addId?: number;
  patId?: number;
  addAddress1?: string;
  addAddress2?: string;
  addAddress3?: string;
  addAddress4?: string;
  addAddress5?: string;
  addAddress6?: string;
  addFax?: string;
  addLocale?: string;
  addEmail?: string;
  addMobile?: string;
  addPhone?: string;
};

type PatientInterestedParty = {
  patId: number;
  pipId?: number;
  pipPatId: number;
  pipAddId?: number;
  pipFirstname: string;
  pipSurname: string;
  pipRelationship: string;
  pipDob: string;
  pipGender: string;
  pipFamilyAwareIllness: number;
  pipTitle: string;
  pipMiddlename: string;
  pipSendTxtEmail: string;
  pipPartnerPrint: number;
  pipIdentifierNumber: string;
  pipIdentifierType: string;
  pipAddress: PipAddress;
  pipReceivePatApptLetter: number;
  pipEthnicityId: number;
  pipOccupationId: number;
  pipEhpId?: number;
  pipNextOfKin: number;
  pipReceivePatientLetter: number;
  pipProfessionalTitle: string;
  pipIsReferrer: string;
  panId?: number;
  pipNotes: string;
  pipType?: string;
  pipTreatmentConsentGivenDate?: string;
  pipImplantProcessConsentGivenDate?: string;
  pipGeneralPublicityConsentGivenDate?: string;
  pipTrainingConsentGivenDate?: string;
  pipIsPatientAddress: string;
};

export const useUpdatePIPDetails = () => {
  const axiosInstance = useAxios();
  const dispatchSnackbar = useDispatchSnackbar();

  const updatePIPDetails = (pipDetails: PatientInterestedParty) => {
    return axiosInstance.put(PIP_DETAILS, pipDetails);
  };

  const onSuccess = (response: any) => {
    dispatchSnackbar(response);
  };

  return useMutation(updatePIPDetails, { onSuccess });
};

export const useAddPIPDetails = () => {
  const axiosInstance = useAxios();
  const dispatchSnackbar = useDispatchSnackbar();

  const addPIPDetails = (pipDetails: any) => {
    return axiosInstance.post(PIP_DETAILS, pipDetails);
  };

  const onSuccess = (response: any) => {
    dispatchSnackbar(response);
  };

  return useMutation(addPIPDetails, { onSuccess });
};

export const useGetPIPDetails = (pipID: number) => {
  const axiosInstance = useAxios();
  const getPIPDetails = (Id: number) => {
    return axiosInstance.get(PIP_DETAILS, { params: { pipId: Id } });
  };

  const select = (response: any) => {
    if (response.status === 200) {
      return {
        address: response.data.entity.pipAddress,
        pipDetails: response.data.entity.PatientInterestedParty,
        informationMessages: response.data.entity.informationMessages,
        settings: response.data.entity.settings,
      };
    }
  };

  return useQuery(PIP_DETAILS, () => getPIPDetails(pipID), {
    select,
    cacheTime: 1000 * 15,
  });
};

type Details = {
  pipId: number;
  patId: number;
};
export const useUpdatePipIsPatient = (handler?: any) => {
  const axiosInstance = useAxios();

  const updatePipIdPatient = (details: Details) => {
    return axiosInstance.put(PIP_IS_PATIENT, {}, { params: details });
  };

  const onSuccess = (response: any) => {
    if (response.status === 200) {
      handler();
    }
  };

  return useMutation(updatePipIdPatient, { onSuccess });
};
