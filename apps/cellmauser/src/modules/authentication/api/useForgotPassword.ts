import { useMutation, useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";

import responseCodeMessages from "../../../config/ResponseCodeMessages";
import useAxios from "../../../hooks/useAxios";
import { setSnackbar } from "../../../store/SnackbarAction";
import dispatchSnackbar from "../../../utils/ResponseCodeHandler";
import t from "../assets/translationFiles/loginTranslation";
import {
  CONFIRM_PASSWORD,
  EMAIL_VERIFICATION,
  UNIQUEKEY_VERIFICATION,
} from "../config";

type KeyVerificationCredentials = {
  useEmail: string;
  useUsername: string;
  useLogonUniqueKey: string;
};

type ConfirmPassword = {
  usePassword: string;
  useUsername: string;
};

export const useEmailVerification = (email: string | undefined) => {
  const axiosInstance = useAxios();
  const dispatch = useDispatch();
  const { language } = useSelector((state: any) => state.language);

  const verifyEMail = (useEmail: string | undefined) => {
    return axiosInstance.get(EMAIL_VERIFICATION, {
      params: { useEmail },
    });
  };

  const onSuccess = (response: any) => {
    const responseCode = response?.data?.validationCode;
    if (responseCode === "user.email.sentsuccessfully") {
      dispatchSnackbar(response, dispatch, language);
    } else {
      dispatch(
        setSnackbar(
          true,
          "warning",
          t(responseCodeMessages[responseCode].messageTranslationKey),
          4
        )
      );
    }
  };

  return useQuery(EMAIL_VERIFICATION, () => verifyEMail(email), {
    enabled: false,
    onSuccess,
  });
};

export const useKeyVerification = () => {
  const axiosInstance = useAxios();
  const dispatch = useDispatch();
  const { language } = useSelector((state: any) => state.language);

  const verifyKey = (credentials: KeyVerificationCredentials) => {
    return axiosInstance.post(UNIQUEKEY_VERIFICATION, credentials);
  };
  const onSuccess = (response: any) => {
    const responseCode = response?.data?.validationCode;
    if (responseCode === "user.success") {
      dispatchSnackbar(response, dispatch, language);
    } else {
      dispatch(
        setSnackbar(
          true,
          "warning",
          t(responseCodeMessages[responseCode].messageTranslationKey),
          4
        )
      );
    }
  };

  return useMutation(verifyKey, { onSuccess });
};

export const useConfirmPassword = () => {
  const axiosInstance = useAxios();
  const dispatch = useDispatch();
  const { language } = useSelector((state: any) => state.language);

  const confirmPassword = (passwords: ConfirmPassword) => {
    return axiosInstance.post(CONFIRM_PASSWORD, passwords);
  };
  const onSuccess = (response: any) => {
    const responseCode = response?.data?.validationCode;
    if (responseCode === "user.password.forgotsuccess") {
      dispatchSnackbar(response, dispatch, language);
    } else {
      dispatch(
        setSnackbar(
          true,
          "warning",
          t(responseCodeMessages[responseCode].messageTranslationKey),
          4
        )
      );
    }
  };

  return useMutation(confirmPassword, { onSuccess });
};
