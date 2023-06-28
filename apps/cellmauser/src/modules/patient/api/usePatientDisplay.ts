import { useQuery } from "react-query";

import useAxios from "../../../hooks/useAxios";
import { PATIENT_DISPLAY } from "../config";

type Settings = {
  estPatientSearchBarcodeNotFocus?: boolean | null;
  estPatientSearchIdentifierMandatory?: boolean | null;
  renamePatIdentifierToPayrollNo?: boolean | null;
  estPasPreference?: string | null;
  estUseCellmaInterface: boolean | null;
  estShowInServicePatient: string | null;
};

type Entity = {
  demoLinkPage?: boolean;
  showUnkownPatient?: boolean;
  showSeenBy?: boolean;
  showlegitimateRelationshippouup?: boolean;
  nonCAAService?: boolean;
  documentManagementQuickAccess?: boolean;
};

type Response = {
  setting: Settings;
  entity: Entity;
  informationMessages: string[];
};

const useGetPatientDisplay = () => {
  const axiosInstance = useAxios();
  const getPatientDisplay = () => {
    return axiosInstance.get(PATIENT_DISPLAY);
  };

  const select = (response: any) => {
    if (response?.status === 200) {
      if (response?.data?.validationCode === "patient.display") {
        const entity: Entity = {
          demoLinkPage: response?.data?.entity?.demoLinkPage === 1,
          showUnkownPatient: response?.data?.entity?.showUnkownPatient === 1,
          showSeenBy: response?.data?.entity?.showSeenBy === 1,
          showlegitimateRelationshippouup:
            response?.data?.entity?.showlegitimateRelationshippouup === 1,
          nonCAAService: response?.data?.entity?.nonCAAService === "true",
          documentManagementQuickAccess:
            response?.data?.entity?.documentManagementQuickAccess === 1,
        };

        const setting: Settings = {
          estPatientSearchBarcodeNotFocus:
            response?.data?.settings?.estPatientSearchBarcodeNotFocus === 1,
          estPatientSearchIdentifierMandatory:
            response?.data?.settings?.estPatientSearchIdentifierMandatory === 1,
          renamePatIdentifierToPayrollNo:
            response?.data?.settings?.renamePatIdentifierToPayrollNo === 1,
          estPasPreference: response?.data?.settings?.estPasPreference,
          estUseCellmaInterface:
            response?.data?.settings?.estUseCellmaInterface === 1,
          estShowInServicePatient:
            response?.data?.settings?.estShowInServicePatient,
        };

        const responseObject: Response = {
          setting,
          entity,
          informationMessages: response?.data?.informationMessages,
        };

        return responseObject;
      }
    }
    return null;
  };

  return useQuery(PATIENT_DISPLAY, getPatientDisplay, {
    select,
    refetchOnMount: true,
  });
};

export default useGetPatientDisplay;
