import { useMutation } from "react-query";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import useAxios from "../../../hooks/useAxios";
import useDispatchSnackbar from "../../../hooks/useDispatchSnackbar";
import { CONFIRM_PATIENT_DETAILS } from "../config";
import { setIsContactTypeSelected, setSgrId } from "../store/PatientAction";

const useConfirmPatientDetails = () => {
  const axiosInstance = useAxios();
  const dispatch = useDispatch();
  const dispatchSnackbar = useDispatchSnackbar();
  const navigate = useNavigate();

  const confirmPatientDetails = (patientDetails: object) => {
    return axiosInstance.post(CONFIRM_PATIENT_DETAILS, patientDetails);
  };

  const onSuccess = (response: any) => {
    if (response?.status === 200) {
      if (
        response?.data?.validationCode === "patient.details.changed.success"
      ) {
        dispatch(setSgrId(response?.data?.entity?.sgrId));
        dispatch(setIsContactTypeSelected(true));
        navigate("/cellmaUser/patient/contactTypeScreen");
      }
    }
    dispatchSnackbar(response);
  };

  return useMutation(confirmPatientDetails, { onSuccess });
};

export default useConfirmPatientDetails;
