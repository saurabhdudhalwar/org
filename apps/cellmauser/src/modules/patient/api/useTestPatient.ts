import { useMutation } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import useAxios from "../../../hooks/useAxios";
import dispatchSnackbar from "../../../utils/ResponseCodeHandler";
import { TEST_PATIENT } from "../config";

const useUpdateTestPatient = () => {
  const { language } = useSelector((state: any) => state.language);
  const axiosInstance = useAxios();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const updateTestPatient = (patId: any) => {
    return axiosInstance.put(TEST_PATIENT, null, { params: { patId } });
  };

  const onSuccess = (response: any) => {
    const responseCode = response?.data?.validationCode;
    if (response?.status === 200) {
      if (responseCode === "test.patient.success") {
        navigate("/cellmaUser/patient/contactTypeScreen");
      }
      dispatchSnackbar(response, dispatch, language);
    }
  };

  return useMutation(updateTestPatient, { onSuccess });
};

export default useUpdateTestPatient;
