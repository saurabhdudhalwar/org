import { useQuery } from "react-query";

import useAxios from "../../../hooks/useAxios";
import { PATIENT_BANNER } from "../config";

type Entity = {
  tasksCount: number;
  patientBannerJson: PatientBanner;
  patientAllergies: any[];
};

type PatientBanner = {
  patId: number;
  patHospitalRef?: string;
  patTitle?: string;
  patFirstname: string;
  patMiddlename?: string;
  patSurname: string;
  patSex?: string;
  patDob?: string;
  patDod?: string;
  patType?: string;
  patBarcode?: number;
  addAddress1?: string;
  addAddress2?: string;
  addAddress3?: string;
  addAddress4?: string;
  addAddress5?: string;
  addAddress6?: string;
  addPhone?: number;
  addWorkPhone?: number;
  addMobile?: number;
  addEmail?: string;
  previousAdmissions: string;
  patMrnNumber?: number | string;
  admissionTime?: string;
  admissionDate?: string;
  patMpiNumber?: number;
  patNhsRef?: string;
  patIdentifier?: string;
  consultantFullname?: string;
  gpFullname?: string;
  pregnancyEndDate?: string;
  cttNoOfDaysLeftThirdTarget?: number;
  cttNoOfDaysLeftFourthTarget?: number;
  clinicDate?: string;
  pregnancyWeek?: string;
  daysLeft: number;
  physicalSignsDetails?: any;
};

type Settings = {
  estBarcodeTopbarShow: number;
  estTopbarTargetDate: number;
};

type Response = {
  entity: Entity;
  informationMessage: string[];
  settings: Settings;
};

const usePatientBanner = (Id: number, enabled: boolean) => {
  const axiosInstance = useAxios();

  const getPatientBanner = (patId: number) => {
    if (patId) return axiosInstance.get(PATIENT_BANNER, { params: { patId } });
  };

  const select = (response: any) => {
    if (response.status !== 200) return null;

    return response.data as Response;
  };

  return useQuery([PATIENT_BANNER, Id], () => getPatientBanner(Id), {
    select,
    cacheTime: 0,
    enabled,
  });
};

export default usePatientBanner;
