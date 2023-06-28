import { useMutation, useQueryClient } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

import useAxios from "../../../hooks/useAxios";
import { setLanguage } from "../../../store/TranslationAction";
import { LOGOUT } from "../config";
import { setToken } from "../store/UserAuthAction";

const useLogout = () => {
  const axiosInstance = useAxios();
  const { userName } = useSelector((state: any) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cookies = new Cookies();
  const queryClient = useQueryClient();
  const localStorageLang = localStorage.getItem("language");

  const logout = () => {
    return axiosInstance.delete(LOGOUT, { params: { username: userName } });
  };

  const onSuccess = (response: any) => {
    if (response.status === 200) {
      cookies?.remove("token", { path: "/" });
      dispatch(setToken(""));
      navigate("/cellmaUser/login");
      dispatch({ type: "RESET_APP" });
      queryClient.clear();
      dispatch(setLanguage(localStorageLang || "EN"));
    }
  };

  return useMutation(logout, { onSuccess });
};

export default useLogout;
