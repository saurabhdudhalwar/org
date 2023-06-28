import { useMutation, useQuery } from "react-query";

import useAxios from "../../../hooks/useAxios";
import useDispatchSnackbar from "../../../hooks/useDispatchSnackbar";
import { EXISTING_PATIENT_ADDRESS, PATIENT_ADDRESS } from "../config";

/**
 * Hook for fetching patient address
 * @param {string} patId - Patient ID
 * @returns {UseQueryResult}
 */
export const useGetPatientExistingAddress = (
  patId: number,
  enabled?: boolean
) => {
  const axiosInstance = useAxios();

  const getPatientExistingAddress = (Id: number) => {
    if (Id !== null) {
      return axiosInstance.get(EXISTING_PATIENT_ADDRESS, {
        params: { patId: Id },
      });
    }
  };

  const select = (response: any) => {
    if (response.status === 200)
      return {
        entity: response?.data?.entity,
        permanentAddress: response?.data?.entity?.permanentAddress,
        temporaryAddress: response?.data?.entity?.temporaryAddress,
        settings: response?.data?.settings,
      };
  };

  return useQuery(
    [EXISTING_PATIENT_ADDRESS, patId],
    () => getPatientExistingAddress(patId),
    { select, enabled }
  );
};

export const useUpdatePatientAddress = () => {
  const axiosInstance = useAxios();
  const dispatchSnackbar = useDispatchSnackbar();
  const putPatientAddress = (patientAddress: object) => {
    return axiosInstance.put(PATIENT_ADDRESS, patientAddress);
  };

  const onSuccess = (response: any) => {
    dispatchSnackbar(response);
  };

  return useMutation(putPatientAddress, { onSuccess });
};

interface Address {
  patId: number;
  addId?: number | null;
  addEstId: number | null;
  addAddress1: string | null;
  addAddress3?: string | null;
  addAddress2: string | null;
  addAddress4?: string | null;
  addAddress5?: string | null;
  addAddress6?: string | null;
  addPhone?: number | null;
  addEmail?: string | null;
  addFax?: string | null;
  addWorkPhone?: number | null;
  addBillingAddress?: number | null;
  addReportingRegion?: string | null;
  addLsao?: string | null;
  addPostcodeNospaces?: string | null;
  addIsoCountryCode?: string | null;
  addIcaoCountryCode?: string | null;
  addMobile?: number | null;
  addLocale?: string | null;
  addReportingDistrict?: string | null;
  addLocalityCode?: string | null;
  addCompanyName?: string | null;
  addHealthRegionEliId?: number | null;
  addLatitude?: number | null;
  addLongitude?: number | null;
  addRadius?: number | null;
  addPatId?: number | null;
  addTempPermanent?: string | null;
  addLocationZoneEliId?: string | null;
  addAddress35?: string | null;
  addNotes?: string | null;
}

interface TemporaryAddress extends Address {
  addTempPermanentStartDate: string;
  addTempPermanentEndDate: string;
}

type Addresses = {
  permanentAddress: Address;
  temporaryAddress?: TemporaryAddress;
};

export const useAddPatientAddress = () => {
  const axiosInstance = useAxios();

  const addPatientAddress = (address: object) => {
    return axiosInstance.post(PATIENT_ADDRESS, address);
  };

  return useMutation(addPatientAddress);
};
