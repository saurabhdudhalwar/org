import { useQuery } from "react-query";

import useAxios from "../../../hooks/useAxios";
import { PATIENT_REMINDER_DETAILS } from "../config";

/**
 * Hook for fetching patient reminder details
 * @param {string} patId - Patient ID
 * @returns {UseQueryResult}
 */

const useGetPatientReminderDetails = (patId: string | null) => {
  const axiosInstance = useAxios();

  const getPatientReminderDetails = (Id: string | null) => {
    if (Id)
      return axiosInstance.get(PATIENT_REMINDER_DETAILS, {
        params: { patId: Id },
      });
  };

  const select = (response: any) => {
    if (response?.status === 200) {
      if (response?.data?.validationCode === "patient.reminder.details.found") {
        if (response?.data?.entity) {
          return {
            referralAppointmentDetails:
              response?.data?.entity?.referralAppointmentDetails,
            alertDetails: response?.data?.entity?.alertDetails,
          };
        }
      }
    }
    return null;
  };

  const { data, refetch } = useQuery(
    ["patientReminderDetails", patId],
    () => getPatientReminderDetails(patId),
    {
      select,
      refetchOnMount: true,
    }
  );
  const patientReminderData = data || {
    referralAppointmentDetails: [],
    alertDetails: [],
  };

  return { patientReminderData, refetch };
};

export default useGetPatientReminderDetails;
