import { useState } from "react";

import { Visibility, VisibilityOff } from "@mui/icons-material";
import * as Mui from "@mui/material";
import { useFormik } from "formik";
import { useSelector } from "react-redux";
import * as yup from "yup";

import * as Common from "../../../common/CommonComponentsIndex";
import { useMultiFormContext } from "../../../hooks/MultiForm";
import * as validations from "../../../utils/Validations";
import {
  useEmailVerification,
  useKeyVerification,
} from "../api/useForgotPassword";
import t from "../assets/translationFiles/loginTranslation";
import styles from "../screens/LoginScreenCss";
import { IForgotPassword } from "../types";

interface Props {
  handleCancel: () => void;
}

const KeyVerificationForm: React.FC<Props> = (props) => {
  const [isShowPassword, setIsShowPassword] = useState(true);
  const { forward, data, setDataForNextForm } = useMultiFormContext();
  const { mutate: verifyKey } = useKeyVerification();
  const [isShowResetButton, setIsShowResetButton] = useState(false);

  const keyVerificationForm = useFormik({
    enableReinitialize: true,
    initialValues: {
      emailAddress: data?.emailAddress,
      username: "",
      uniqueKey: "",
    },
    validationSchema: yup.object().shape({
      username: yup.string().required(t("usernameRequired")),
      uniqueKey: yup.string().required(t("uniqueKeyRequired")),
    }),
    onSubmit: (values: IForgotPassword) => {
      verifyKey(
        {
          useEmail: values.emailAddress,
          useUsername: values.username,
          useLogonUniqueKey: values.uniqueKey,
        },
        {
          onSuccess: (response: any) => {
            if (response.status === 200) {
              const responseCode = response?.data?.validationCode;
              if (responseCode === "user.success") {
                forward();
                setDataForNextForm({ username: values.username });
              }
            }
          },
        }
      );
    },
  });

  const { refetch: verifyEmail } = useEmailVerification(data.emailAddress);

  const showResetButtonHandler = () => {
    setIsShowResetButton(false);
    setTimeout(() => setIsShowResetButton(true), 60000);
  };

  const resetButtonHandler = () => {
    setIsShowResetButton(false);
  };

  setTimeout(() => setIsShowResetButton(true), 60000);

  return (
    <Common.CellmaPopup
      title={t("forgotPassword")}
      handleCancel={props.handleCancel}
    >
      <form onSubmit={keyVerificationForm.handleSubmit}>
        <Mui.Grid container sx={{ display: "flex", justifyContent: "center" }}>
          <Mui.Grid item xs={10} sx={styles.popupContentGrid}>
            <Mui.Typography variant="h3">{t("submitMsg")}</Mui.Typography>
          </Mui.Grid>
          <Mui.Grid item xs={8} sx={styles.popupContentGrid}>
            <Common.CellmaInputField
              label={t("emailAddress")}
              name="emailAddress"
              value={keyVerificationForm.values.emailAddress}
              onKeyPress={validations.restrictSpaceAtStart}
              disabled
            />
          </Mui.Grid>
          <Mui.Grid item xs={8} sx={styles.popupContentGrid}>
            <Common.CellmaInputField
              label={t("username")}
              name="username"
              value={keyVerificationForm.values.username}
              onHandleChange={keyVerificationForm.handleChange}
              onBlur={keyVerificationForm.handleBlur}
              onKeyPress={validations.restrictSpaceAtStart}
              errorText={
                keyVerificationForm.touched.username &&
                keyVerificationForm.errors.username
              }
            />
          </Mui.Grid>
          <Mui.Grid item xs={8} sx={styles.popupContentGrid}>
            <Common.CellmaInputField
              type={isShowPassword ? "password" : "text"}
              label={t("uniqueKey")}
              name="uniqueKey"
              value={keyVerificationForm.values.uniqueKey}
              onHandleChange={keyVerificationForm.handleChange}
              onBlur={keyVerificationForm.handleBlur}
              onKeyPress={validations.restrictSpaceAtStart}
              onKeyDown={validations.restrictSpace}
              errorText={
                keyVerificationForm.touched.uniqueKey &&
                keyVerificationForm.errors.uniqueKey
              }
              endIcon={isShowPassword ? <VisibilityOff /> : <Visibility />}
              handleClick={() => setIsShowPassword(!isShowPassword)}
            />
          </Mui.Grid>
          <Mui.Grid item xs={8}>
            <Mui.Typography variant="h3">
              {t("keyExpiresMessage")}
            </Mui.Typography>
          </Mui.Grid>

          <Mui.Grid item xs={5} sx={styles.popupResendButtonGrid}>
            <Common.CellmaButton
              label="Resend Code"
              disabled={!isShowResetButton}
              onClick={() => {
                verifyEmail();
                showResetButtonHandler();
              }}
            />
          </Mui.Grid>

          <Mui.Grid item xs={5} sx={styles.popupButtonGrid}>
            <Common.CellmaButton
              onClick={() => {
                resetButtonHandler();
              }}
              type="submit"
              label={t("nextButton")}
              disabled={
                !(keyVerificationForm.dirty && keyVerificationForm.isValid)
              }
            />
          </Mui.Grid>
        </Mui.Grid>
      </form>
    </Common.CellmaPopup>
  );
};

export default KeyVerificationForm;
