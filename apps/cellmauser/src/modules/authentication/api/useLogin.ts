import jwt_decode from "jwt-decode";
import qs from "qs";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

import responseCodeMessages from "../../../config/ResponseCodeMessages";
import useAxios, { Token } from "../../../hooks/useAxios";
import { setSnackbar } from "../../../store/SnackbarAction";
import { dynamicInformationMessage } from "../../../utils/GeneralUtils";
import dispatchSnackbar from "../../../utils/ResponseCodeHandler";
import t from "../assets/translationFiles/loginTranslation/index";
import { CHANGE_PASSWORD, LOGIN, LOGIN_DISPLAY } from "../config";
import {
  setAdministration,
  setCliID,
  setEstCodePreference,
  setEstID,
  setEstPatientPostCodeMandatory,
  setEstPatientPostCodeSearch,
  setIsResetPasswordOnNextLogin,
  setToken,
  setUsername,
  setUserRoles,
} from "../store/UserAuthAction";

export type ChangePassword = {
  userName: string;
  oldPassword: string;
  newPassword: string;
};
export const useLogin = () => {
  const queryClient = useQueryClient();
  const axiosInstance = useAxios();
  const { language } = useSelector((state: any) => state.language);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cookies = new Cookies();

  type Credentials = {
    username: string;
    password: string;
  };

  const login = (credentials: Credentials) => {
    return axiosInstance.post(LOGIN, credentials);
  };

  const onSuccess = (response: any) => {
    queryClient.clear();
    dispatch({ type: "RESET_APP" });
    if (response.status === 200) {
      if (response?.data?.informationMessages.length !== 0) {
        if (
          response?.data?.informationMessages[0].messageKey ===
          "messages.user.to.reset.password.on.nextlogin"
        ) {
          dispatch(setIsResetPasswordOnNextLogin(true));
        }
      } else {
        navigate("/cellmaUser/home");
        dispatch(setSnackbar(true, "success", t("loginSuccess"), 4));
        const refreshToken = response?.data?.refreshToken;
        const token = response?.data?.jwt;
        dispatch(setToken(token));
        dispatch(setAdministration(response?.data?.administrationLevel));
        const tokenDetails: Token = jwt_decode(token);
        cookies.set("refreshToken", refreshToken, {
          sameSite: "strict",
          path: "/",
        });
        cookies.set("token", token, {
          sameSite: "strict",
          path: "/",
        });
        const roles: string[] = tokenDetails.userRoles.split(",");
        dispatch(setUserRoles(roles));
        dispatch(setCliID(tokenDetails.useCliId));
        dispatch(setUsername(tokenDetails.sub));
        dispatch(setEstID(tokenDetails.useEstId));
        dispatch(setEstCodePreference(response?.data?.estCodePreference));
        dispatch(
          setEstPatientPostCodeSearch(response?.data?.estPatientPostcodeSearch)
        );
        dispatch(
          setEstPatientPostCodeMandatory(response?.data?.estPostcodeMandatory)
        );
      }
    } else if (response.response.status === 500) {
      dispatch(
        setSnackbar(
          true,
          "warning",
          dynamicInformationMessage(
            t(
              responseCodeMessages[
                response?.response?.data.validationCode?.messageKey
              ].messageTranslationKey
            ),
            response?.response?.data.validationCode?.parameters
          ),
          4
        )
      );
    }
  };

  return useMutation(login, {
    onSuccess,
  });
};

export const useGetLoginDisplay = () => {
  const axiosInstance = useAxios();

  const getLoginDisplay = () => {
    return axiosInstance.get(LOGIN_DISPLAY);
  };

  const select = (response: any) => {
    if (response.status === 200) {
      if (response?.data?.validationCode === "user.logindisplay.success") {
        return response?.data?.entity;
      }
    }
  };

  const { data: userLoginData, refetch } = useQuery(
    LOGIN_DISPLAY,
    getLoginDisplay,
    {
      select,
      refetchOnWindowFocus: true,
    }
  );

  const data = userLoginData || [];

  return { data, refetch };
};

export const useChangePassword = () => {
  const { language } = useSelector((state: any) => state.language);
  const axiosInstance = useAxios();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const changePassword = (parameterList: ChangePassword) => {
    return axiosInstance.post(CHANGE_PASSWORD, null, {
      params: parameterList,
      paramsSerializer: {
        serialize: (params) => {
          return qs.stringify(
            {
              userName: params?.userName,
              oldPassword: params?.oldPassword,
              newPassword: params?.newPassword,
            },

            { arrayFormat: "repeat" }
          );
        },
      },
    });
  };

  const onSuccess = (response: any) => {
    queryClient.invalidateQueries(CHANGE_PASSWORD);
    if (response.status === 200) {
      dispatchSnackbar(response, dispatch, language);
    }
  };

  return useMutation(changePassword, { onSuccess });
};
