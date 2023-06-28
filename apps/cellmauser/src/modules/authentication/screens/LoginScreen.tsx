// Page Name : "login"
// Page Id : "c4user1"

import { useEffect, useState } from "react";

import { Visibility, VisibilityOff } from "@mui/icons-material";
import LockSharpIcon from "@mui/icons-material/LockSharp";
import * as Mui from "@mui/material";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import * as yup from "yup";

import styles from "./LoginScreenCss";
import * as Common from "../../../common/CommonComponentsIndex";
import MultiForm from "../../../hooks/MultiForm";
import { setLanguage } from "../../../store/TranslationAction";
import PASSWORD_REGEX from "../../../utils/RegExpressions";
import {
  useChangePassword,
  useGetLoginDisplay,
  useLogin,
} from "../api/useLogin";
import ClientLogo from "../assets/logos/ClientLogo.png";
import t from "../assets/translationFiles/loginTranslation";
import ConfirmPasswordForm from "../forms/ConfirmPasswordForm";
import EmailVerificationForm from "../forms/EmailVerificationForm";
import KeyVerificationForm from "../forms/KeyVerificationForm";
import { setIsResetPasswordOnNextLogin } from "../store/UserAuthAction";
import { ILogin } from "../types";

interface LoginProps {
  // eslint-disable-next-line react/no-unused-prop-types, react/require-default-props
  onSuccess?: () => void;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const LoginScreen = (props: LoginProps) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [showPopUp, setShowPopup] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState(true);
  const [isShowCurrentPassword, setIsShowCurrentPassword] = useState(true);
  const [isShowNewPassword, setIsShowNewPassword] = useState(true);
  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(true);

  const [isShowResetPasswordPopup, setIsShowResetPasswordPopup] =
    useState(false);

  const { isResetPasswordOnNextLogin } = useSelector(
    (state: any) => state.auth
  );
  const { language } = useSelector((state: any) => state.language);

  const { mutate: login } = useLogin();
  const { mutate: changePassword } = useChangePassword();
  const localStorageLang = localStorage.getItem("language");

  // Api call get login display
  const { data: getloginDisplayResponse } = useGetLoginDisplay();
  const showForgotPasswordLink =
    getloginDisplayResponse?.showForgotPasswordLink === "true";

  useEffect(() => {
    dispatch(setLanguage(localStorageLang || "EN"));
  }, [language]);

  useEffect(() => {
    if (Object.values(loginForm?.errors).length !== 0) {
      loginForm?.validateForm(loginForm?.values);
    }
  }, [language]);

  // Login Form
  const loginForm = useFormik({
    initialValues: { username: "", password: "" },
    validationSchema: yup.object().shape({
      username: yup.string().required(t("usernameRequired")),
      password: yup
        .string()
        .required(t("passwordRequired"))
        .min(8, t("minCharacterPassword"))
        .matches(PASSWORD_REGEX, t("validatePassword")),
    }),
    onSubmit: (values: ILogin) => {
      if (
        values.username !== "" &&
        values.username !== null &&
        values.password !== "" &&
        values.password !== null
      ) {
        login(values);
        setUsername(values?.username);
      }
    },
  });
  useEffect(() => {
    if (isResetPasswordOnNextLogin === true) {
      setIsShowResetPasswordPopup(true);
    }
  }, [isResetPasswordOnNextLogin]);

  useEffect(() => {
    // handle reseting the tokens
    const cookies = new Cookies();
    cookies?.remove("refreshToken", { path: "/" });
    cookies?.remove("token", { path: "/" });
  }, []);

  const handleSave = () => {
    setIsShowCurrentPassword(true);
    setIsShowNewPassword(true);
    setIsShowConfirmPassword(true);
    setIsShowResetPasswordPopup(false);
    dispatch(setIsResetPasswordOnNextLogin(false));
    changePasswordForm.resetForm();
    loginForm.resetForm();
    navigate("/cellmaUser/login");
  };

  // Change Password Form
  const changePasswordForm = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: yup.object().shape({
      currentPassword: yup.string().required(t("currentPasswordRequired")),
      newPassword: yup
        .string()
        .required(t("newPasswordRequired"))
        .matches(PASSWORD_REGEX, t("validPasswordMsg")),
      confirmPassword: yup
        .string()
        .oneOf([yup.ref("newPassword"), null], t("confirmPasswordValMsg"))
        .required(t("confirmPasswordRequired"))
        .matches(PASSWORD_REGEX, t("validPasswordMsg")),
    }),
    onSubmit: (values: any) => {
      const obj = {
        userName: username,
        oldPassword: values?.currentPassword,
        newPassword: values?.confirmPassword,
      };
      changePassword(obj, { onSuccess: handleSave });
    },
  });

  return (
    <Common.CellmaHeaderFooterLayout type="Authentication">
      <Mui.Box
        sx={{ ...styles.alignCenter, minHeight: "100vh", maxWidth: "80%" }}
      >
        <Common.CellmaCard>
          <form onSubmit={loginForm.handleSubmit} data-testid="LoginForm">
            <Mui.Grid container sx={styles.alignCenter}>
              <Mui.Grid item xs={12} sm={6}>
                <Mui.Box sx={styles.imageCard}>
                  <Mui.Avatar
                    sx={styles.imageBox}
                    variant="square"
                    src={ClientLogo}
                    alt="Client Image Box"
                  />
                  <Mui.Typography variant="subtitle1">
                    {t("clientImage")}
                  </Mui.Typography>
                </Mui.Box>
              </Mui.Grid>

              <Mui.Grid item xs={12} sm={6}>
                <Mui.Grid container spacing={3} sx={styles.alignCenter}>
                  <Mui.Grid item xs={12} sx={styles.alignCenter}>
                    <Mui.Avatar sx={{ backgroundColor: "primary.main" }}>
                      <LockSharpIcon />
                    </Mui.Avatar>
                  </Mui.Grid>

                  <Mui.Grid item xs={12} sx={styles.alignCenter}>
                    <Mui.Typography
                      // variant="subtitle1"
                      sx={styles.loginHeaderText}
                    >
                      {t("loginHeader")}
                    </Mui.Typography>
                  </Mui.Grid>
                  <Mui.Grid item xs={11} md={8} sx={styles.alignCenter}>
                    <Common.CellmaInputField
                      label={t("username")}
                      type="text"
                      name="username"
                      autoComplete="off"
                      value={loginForm.values.username}
                      onHandleChange={loginForm.handleChange}
                      onBlur={loginForm.handleBlur}
                      errorText={
                        loginForm.touched.username && loginForm.errors.username
                      }
                    />
                  </Mui.Grid>
                  <Mui.Grid item xs={11} md={8} sx={styles.alignCenter}>
                    <Common.CellmaInputField
                      type={isShowPassword ? "password" : "text"}
                      label={t("password")}
                      name="password"
                      autoComplete="off"
                      maxLength="64"
                      value={loginForm.values.password}
                      onHandleChange={loginForm.handleChange}
                      onBlur={loginForm.handleBlur}
                      errorText={
                        loginForm.touched.password && loginForm.errors.password
                      }
                      endIcon={
                        isShowPassword ? <VisibilityOff /> : <Visibility />
                      }
                      handleClick={() => setIsShowPassword(!isShowPassword)}
                    />
                  </Mui.Grid>
                  <Mui.Grid item xs={11} md={8} sx={styles.forgotPasswordGrid}>
                    <Mui.Grid>
                      {showForgotPasswordLink && (
                        <Common.CellmaLink
                          label={t("forgotPassword")}
                          variant="h3"
                          type="button"
                          data-testid="ForgotPasswordBtn"
                          onClick={() => {
                            setShowPopup(true);
                          }}
                        >
                          {t("forgotPassword")}?
                        </Common.CellmaLink>
                      )}
                    </Mui.Grid>

                    <Mui.Grid>
                      <Common.CellmaButton
                        type="submit"
                        label={t("loginButton")}
                        disabled={!(loginForm.dirty && loginForm.isValid)}
                      />
                    </Mui.Grid>
                  </Mui.Grid>
                </Mui.Grid>
              </Mui.Grid>
            </Mui.Grid>

            {/* This popup open when the user will be reset on password */}
            {isShowResetPasswordPopup && isResetPasswordOnNextLogin && (
              <Mui.Backdrop open>
                <Common.CellmaPopup
                  title={t("resetPassword")}
                  handleCancel={() => {
                    setIsShowCurrentPassword(true);
                    setIsShowNewPassword(true);
                    setIsShowConfirmPassword(true);
                    setIsShowResetPasswordPopup(false);
                  }}
                >
                  <form onSubmit={changePasswordForm.handleSubmit} noValidate>
                    <Mui.Box>
                      <Mui.Grid
                        container
                        spacing={3}
                        sx={styles.popupGridContainer}
                      >
                        <Mui.Grid item xs={12}>
                          <Mui.Typography
                            variant="h2"
                            sx={{ display: "flex", justifyContent: "center" }}
                          >
                            {t("resetPasswordValMsg")}
                          </Mui.Typography>
                        </Mui.Grid>
                        <Mui.Grid item xs={12} sm={7}>
                          <Common.CellmaInputField
                            type={isShowCurrentPassword ? "password" : "text"}
                            label={t("currentPassword")}
                            name="currentPassword"
                            endIcon={
                              isShowCurrentPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )
                            }
                            handleClick={() =>
                              setIsShowCurrentPassword(!isShowCurrentPassword)
                            }
                            value={changePasswordForm?.values?.currentPassword}
                            onHandleChange={changePasswordForm?.handleChange}
                            onBlur={changePasswordForm?.handleBlur}
                            errorText={
                              changePasswordForm?.touched?.currentPassword &&
                              changePasswordForm?.errors?.currentPassword
                            }
                          />
                        </Mui.Grid>
                        <Mui.Grid item xs={12} sm={7}>
                          <Common.CellmaInputField
                            type={isShowNewPassword ? "password" : "text"}
                            label={t("newPassword")}
                            name="newPassword"
                            endIcon={
                              isShowNewPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )
                            }
                            handleClick={() =>
                              setIsShowNewPassword(!isShowNewPassword)
                            }
                            value={changePasswordForm?.values?.newPassword}
                            onHandleChange={changePasswordForm?.handleChange}
                            onBlur={changePasswordForm?.handleBlur}
                            errorText={
                              changePasswordForm?.touched.newPassword &&
                              changePasswordForm?.errors.newPassword
                            }
                          />
                        </Mui.Grid>
                        <Mui.Grid item xs={12} sm={7}>
                          <Common.CellmaInputField
                            type={isShowConfirmPassword ? "password" : "text"}
                            label={t("confirmPassword")}
                            name="confirmPassword"
                            endIcon={
                              isShowConfirmPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )
                            }
                            handleClick={() =>
                              setIsShowConfirmPassword(!isShowConfirmPassword)
                            }
                            value={changePasswordForm?.values?.confirmPassword}
                            onHandleChange={changePasswordForm?.handleChange}
                            onBlur={changePasswordForm?.handleBlur}
                            errorText={
                              changePasswordForm?.touched?.confirmPassword &&
                              changePasswordForm?.errors?.confirmPassword
                            }
                          />
                        </Mui.Grid>
                      </Mui.Grid>
                      <Mui.Grid container item xs={12}>
                        <Mui.Grid item xs={12} sx={styles.popupButton}>
                          <Common.CellmaButton
                            label={t("save")}
                            type="submit"
                          />
                        </Mui.Grid>
                      </Mui.Grid>
                    </Mui.Box>
                  </form>
                </Common.CellmaPopup>
              </Mui.Backdrop>
            )}
            {/* Forgot Password start */}
            {showPopUp && (
              <Mui.Backdrop open>
                <MultiForm
                  forms={[
                    <EmailVerificationForm
                      key={1}
                      handleCancel={() => {
                        setShowPopup(false);
                      }}
                    />,
                    <KeyVerificationForm
                      key={2}
                      handleCancel={() => {
                        setShowPopup(false);
                      }}
                    />,
                    <ConfirmPasswordForm
                      key={3}
                      handleCancel={() => {
                        setShowPopup(false);
                      }}
                    />,
                  ]}
                />
              </Mui.Backdrop>
            )}
            {/* Forgot Password end */}
          </form>
        </Common.CellmaCard>
      </Mui.Box>
    </Common.CellmaHeaderFooterLayout>
  );
};

export default LoginScreen;
