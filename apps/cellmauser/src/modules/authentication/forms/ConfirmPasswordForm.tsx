import { useState } from "react";

import { Visibility, VisibilityOff } from "@mui/icons-material";
import * as Mui from "@mui/material";
import { useFormik } from "formik";
import { useSelector } from "react-redux";
import * as yup from "yup";

import * as Common from "../../../common/CommonComponentsIndex";
import { useMultiFormContext } from "../../../hooks/MultiForm";
import PASSWORD_REGEX from "../../../utils/RegExpressions";
import * as validations from "../../../utils/Validations";
import { useConfirmPassword } from "../api/useForgotPassword";
import t from "../assets/translationFiles/loginTranslation";
import styles from "../screens/LoginScreenCss";
import { IResetPassword } from "../types";

interface Props {
  handleCancel: () => void;
}

const ConfirmPasswordForm: React.FC<Props> = (props) => {
  const { data } = useMultiFormContext();
  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(true);
  const [isShowPassword, setIsShowPassword] = useState(true);
  const { mutate: confirmPassword } = useConfirmPassword();
  const confirmPasswordForm = useFormik({
    initialValues: { newPassword: "", confirmPassword: "" },
    validationSchema: yup.object().shape({
      newPassword: yup
        .string()
        .required(t("newPasswordRequired"))
        .min(8, t("minCharacterPassword"))
        .matches(PASSWORD_REGEX, {
          message: t("validatePassword"),
        }),
      confirmPassword: yup
        .string()
        .min(8, t("minCharacterConfirmPassword"))
        .oneOf([yup.ref("newPassword"), null], t("confirmPasswordValMsg"))
        .required(t("confirmPasswordRequired"))
        .matches(PASSWORD_REGEX, {
          message: t("validateConfirmPassword"),
        }),
    }),
    onSubmit: (values: IResetPassword) => {
      if (values.confirmPassword !== null && values.confirmPassword !== "") {
        confirmPassword(
          {
            usePassword: values.confirmPassword,
            useUsername: data.username,
          },
          {
            onSuccess: (response: any) => {
              const responseCode = response?.data?.validationCode;
              if (responseCode === "user.password.forgotsuccess")
                props.handleCancel();
            },
          }
        );
      }
    },
  });

  return (
    <Common.CellmaPopup
      title={t("resetPassword")}
      handleCancel={props.handleCancel}
    >
      <form onSubmit={confirmPasswordForm.handleSubmit}>
        <Mui.Grid container sx={{ display: "flex", justifyContent: "center" }}>
          <Mui.Grid item xs={10} sx={styles.popupContentGrid}>
            <Mui.Typography variant="h3">
              {t("resetPasswordValMsg")}
            </Mui.Typography>
          </Mui.Grid>

          <Mui.Grid item xs={8} sx={styles.popupContentGrid}>
            <Common.CellmaInputField
              type={isShowPassword ? "password" : "text"}
              label={t("newPassword")}
              name="newPassword"
              autoComplete="off"
              maxLength="64"
              value={confirmPasswordForm.values.newPassword}
              onHandleChange={confirmPasswordForm.handleChange}
              onBlur={confirmPasswordForm.handleBlur}
              onKeyPress={validations.restrictSpaceAtStart}
              errorText={
                confirmPasswordForm.touched.newPassword &&
                confirmPasswordForm.errors.newPassword
              }
              endIcon={isShowPassword ? <VisibilityOff /> : <Visibility />}
              handleClick={() => setIsShowPassword(!isShowPassword)}
            />
          </Mui.Grid>
          <Mui.Grid item xs={8} sx={styles.popupContentGrid}>
            <Common.CellmaInputField
              type={isShowConfirmPassword ? "password" : "text"}
              label={t("confirmPassword")}
              name="confirmPassword"
              autoComplete="off"
              maxLength="64"
              value={confirmPasswordForm.values.confirmPassword}
              onHandleChange={confirmPasswordForm.handleChange}
              onBlur={confirmPasswordForm.handleBlur}
              onKeyPress={validations.restrictSpaceAtStart}
              errorText={
                confirmPasswordForm.touched.confirmPassword &&
                confirmPasswordForm.errors.confirmPassword
              }
              endIcon={
                isShowConfirmPassword ? <VisibilityOff /> : <Visibility />
              }
              handleClick={() =>
                setIsShowConfirmPassword(!isShowConfirmPassword)
              }
            />
          </Mui.Grid>
          <Mui.Grid item xs={10} sx={styles.popupButtonGrid}>
            <Common.CellmaButton
              type="submit"
              label={t("saveButton")}
              disabled={
                !(confirmPasswordForm.dirty && confirmPasswordForm.isValid)
              }
            />
          </Mui.Grid>
        </Mui.Grid>
      </form>
    </Common.CellmaPopup>
  );
};

export default ConfirmPasswordForm;
