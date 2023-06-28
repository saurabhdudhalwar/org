import { useMutation, useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";

import responseCodeMessages from "../../../config/ResponseCodeMessages";
import useAxios from "../../../hooks/useAxios";
import { setSnackbar } from "../../../store/SnackbarAction";
import dispatchSnackbar from "../../../utils/ResponseCodeHandler";
import { RESET_PASSWORD } from "../config";

export type ResetPassword = {
  useUsername: string;
  usePassword: string;
  useResetPasswordOnLogin: string;
};

const useResetPassword = () => {
  const axiosInstance = useAxios();
  const dispatch = useDispatch();
  const { language } = useSelector((state: any) => state.language);

  const confirmPassword = (passwords: ResetPassword) => {
    return axiosInstance.post(RESET_PASSWORD, passwords);
  };
  const onSuccess = (response: any) => {
    if (response.status === 200) {
      dispatchSnackbar(response, dispatch, language);
    }
  };

  return useMutation(confirmPassword, { onSuccess });
};

export default useResetPassword;
