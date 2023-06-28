import { useQuery } from "react-query";
import { useDispatch } from "react-redux";

import useAxios from "../../../hooks/useAxios";
import { CONTACT_TYPE_DISPLAY } from "../config";
import {
  setIsAllowToAddMultipleReferral,
  setIsPatientCurrentLocation,
} from "../store/PatientAction";

const usePatientContactTypeDisplay = (patientId: number) => {
  const axiosInstance = useAxios();
  const dispatch = useDispatch();

  const getPatientContactTypeDisplay = (patId: number) => {
    return axiosInstance.get(CONTACT_TYPE_DISPLAY, { params: { patId } });
  };

  const onSuccess = (response: any) => {
    if (response?.status === 200) {
      if (response?.data?.validationCode === "contacttype.found") {
        if (response?.data?.settings?.estPatientCurrentLocation) {
          dispatch(setIsPatientCurrentLocation(true));
        }
        if (response?.data?.settings?.allowToAddMultipleReferrals) {
          dispatch(setIsAllowToAddMultipleReferral(true));
        }
      }
    }
  };

  const select = (response: any) => {
    if (response?.status === 200) {
      if (response?.data?.validationCode === "contacttype.found") {
        return {
          clinicLocations: response?.data?.entity?.clinicLocations,
          referrals: response?.data?.entity?.referrals,
          contactTypeImgNames: response?.data?.entity?.contactTypeImgNames,
        };
      }
    }
  };

  const { data } = useQuery(
    CONTACT_TYPE_DISPLAY,
    () => getPatientContactTypeDisplay(patientId),
    {
      select,
      onSuccess,
    }
  );

  const clinicLocations = data?.clinicLocations || [];
  const referrals = data?.referrals || [];
  const contactTypeImageNames = data?.contactTypeImgNames || [];
  const patientContactTypeDisplay = {
    clinicLocations,
    referrals,
    contactTypeImageNames,
  };

  return patientContactTypeDisplay;
};

export default usePatientContactTypeDisplay;
