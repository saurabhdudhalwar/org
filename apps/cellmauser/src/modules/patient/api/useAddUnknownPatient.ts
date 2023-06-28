import { useMutation } from "react-query";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import useAxios from "../../../hooks/useAxios";
import useDispatchSnackbar from "../../../hooks/useDispatchSnackbar";
import { ADD_UNKNOWN_PATIENT } from "../config";
import { setIsPatientSelected, setPatientId } from "../store/PatientAction";

type Request = {
  age: number;
  birthMonth: number;
  sex: string;
};

const useAddUnknownPatient = () => {
  const axiosInstance = useAxios();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const dispatchSnackbar = useDispatchSnackbar();

  const addUnknownPatient = (request: Request) => {
    return axiosInstance.post(ADD_UNKNOWN_PATIENT, null, {
      params: { ...request },
    });
  };

  const onSuccess = (response: any) => {
    const responseCode = response?.data?.validationCode;
    if (response.status === 200) {
      if (responseCode === "unknown.patient.add.success") {
        navigate("/cellmaUser/patient/contactTypeScreen");
        dispatch(setIsPatientSelected(true));
        dispatch(setPatientId(response?.data?.entity?.patId));
      }
    }
    dispatchSnackbar(response);
  };

  return useMutation(addUnknownPatient, { onSuccess });
};

export default useAddUnknownPatient;
