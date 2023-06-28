import axios, { AxiosInstance } from "axios";
import dayjs from "dayjs";
import jwt_decode from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

import translate from "../assets/translationFiles/commonTranslation";
import { BASE_URL } from "../config";
import { REFRESH } from "../modules/authentication/config";
import { setToken } from "../modules/authentication/store/UserAuthAction";
import { setSnackbar } from "../store/SnackbarAction";

export type Token = {
  userRoles: string;
  useCliId: string;
  useEstId: string;
  sub: string;
  iat: number;
  exp: number;
};

type RefreshToken = {
  sub: string;
  iat: number;
  exp: number;
};

type RefreshResponse = {
  jwtToken: string;
  refreshToken: string;
};

/**
 * Creates an instance of the axios object which is use for all api calls
 * @returns {AxiosInstance} axiosInstance
 */
const useAxios = (contentType?: any): AxiosInstance => {
  const navigate = useNavigate();
  const cookies = new Cookies();
  const controller = new AbortController();
  const dispatch = useDispatch();
  const { language } = useSelector((state: any) => state.language);
  const { token } = useSelector((state: any) => state.auth);

  // Create an instance of the axios object
  const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers:
      contentType === "multipart/form-data"
        ? {
            "content-type": "multipart/form-data",
          }
        : {
            "Content-Type": "application/json",
          },
  });

  // This interceptor will handle the logic concerning refreshing a token and
  // inserting the token in to the axios instance
  axiosInstance.interceptors.request.use(async (req: any) => {
    // 1st condition
    // the token is set to "" when the app first loads
    // the endpoints used on this page do not need authorization
    // so the request can be returned
    if (token === "") return req;
    // 2nd condition handles every other endpoint
    // Here we decode the token and check if it is expired
    // if not expired return the request with token in the Authorization header

    const tokenDetails: Token = jwt_decode(token);
    const isExpired = dayjs.unix(tokenDetails.exp).diff(dayjs()) < 5000;
    if (!isExpired)
      return {
        ...req,
        headers: { Authorization: `Bearer ${token}` },
      };

    // If the token is expired check for the refresh token in local storage
    // if for some reason the cookie is not there abort the request
    const refreshToken = cookies?.get("refreshToken");
    if (!refreshToken) {
      controller.abort();
      navigate("/cellmaUser/login");
      return {
        ...req,
        signal: controller.signal,
      };
    }

    // If there is a refresh token decode it and check if it is expired
    const refreshTokenDetails: RefreshToken = jwt_decode(refreshToken);
    const isRefreshExpired =
      dayjs.unix(refreshTokenDetails.exp).diff(dayjs()) < 5000;
    // if expired abort the request
    if (isRefreshExpired) {
      controller.abort();
      navigate("/cellmaUser/login");
      return {
        ...req,
        signal: controller.signal,
      };
    }

    // Call the endpoint for the refresh token
    let response;
    try {
      response = await axios.get(`${BASE_URL}${REFRESH}`, {
        headers: { Authorization: `Bearer ${token}`, refreshToken },
      });
    } catch (error) {
      controller.abort();
      return {
        ...req,
        signal: controller.signal,
      };
    }

    const { data, status } = response;
    // If something goes wrong in the request abort the request
    if (status !== 200) {
      controller.abort();
      return {
        ...req,
        signal: controller.signal,
      };
    }

    // if everything was sucessful store the new token in the redux store
    const refreshData: RefreshResponse = data;
    if (refreshData.refreshToken) {
      cookies?.remove("refreshToken", { path: "/" });
      cookies.set("refreshToken", refreshData.refreshToken, {
        sameSite: "strict",
        path: "/",
      });
    }
    dispatch(setToken(refreshData.jwtToken));
    cookies?.remove("token", { path: "/" });
    cookies.set("token", refreshData.jwtToken, {
      sameSite: "strict",
      path: "/",
    });

    // return request with new token in the headers
    return {
      ...req,
      headers: { Authorization: `Bearer ${refreshData.jwtToken}` },
    };
  });

  // This interceptor will mainly handle error checking and logic for when the request is cancelled
  axiosInstance.interceptors.response.use(
    (res) => {
      return res;
    },
    (error: any) => {
      if (error.message === "Network Error") {
        dispatch(
          setSnackbar(
            true,
            "warning",
            translate("internalServerError", language),
            4
          )
        );
      } else if (error.message === "Not Found") {
        dispatch(
          setSnackbar(true, "warning", translate("notFound", language), 4)
        );
      } else if (
        error.message === "Request failed with status code 403" ||
        error.message === "Invalid token specified"
      ) {
        const validationCode = error.response.data.validationCode || "";
        if (validationCode === "insufficient.privileges") {
          dispatch(
            setSnackbar(
              true,
              "warning",
              translate("insufficientPrivileges", language),
              4
            )
          );
          navigate("/cellmaUser/home");
          return error;
        }
        navigate("/cellmaUser/login");
      } else if (error?.response?.status === 500) {
        const errorCode = error.response.data.cexId;
        dispatch(
          setSnackbar(
            true,
            "warning",
            `Cellma User has encountered a problem. Please contact customer support with reference number ${errorCode}`,
            4
          )
        );
      }
      return error;
    }
  );

  return axiosInstance;
};

export default useAxios;
