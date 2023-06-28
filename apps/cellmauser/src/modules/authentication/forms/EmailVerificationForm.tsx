import React from "react";

import * as Mui from "@mui/material";
import { useFormik } from "formik";
import { useSelector } from "react-redux";
import * as yup from "yup";

import * as Common from "../../../common/CommonComponentsIndex";
import { useMultiFormContext } from "../../../hooks/MultiForm";
import * as validations from "../../../utils/Validations";
import { useEmailVerification } from "../api/useForgotPassword";
import t from "../assets/translationFiles/loginTranslation";
import styles from "../screens/LoginScreenCss";

interface Props {
  handleCancel: () => void;
}

const EmailVerificationForm: React.FC<Props> = (props) => {
  const { setDataForNextForm, forward } = useMultiFormContext();
  const EmailIdForm = useFormik({
    initialValues: {
      emailAddress: "",
    },
    validationSchema: yup.object().shape({
      emailAddress: yup
        .string()
        .email(t("validEmailAddressMsg"))
        .required(t("emailAddressRequired")),
    }),
    onSubmit: (values) => {
      if (values.emailAddress !== null && values.emailAddress !== "") {
        setDataForNextForm({
          emailAddress: values.emailAddress,
        });
        verifyEmail()
          .then((response) => {
            const responseCode = response?.data?.data?.validationCode;

            if (responseCode === "user.email.sentsuccessfully") forward();
          })
          .catch((err) => {
            return err;
          });
      }
    },
  });

  const { refetch: verifyEmail } = useEmailVerification(
    EmailIdForm.values.emailAddress
  );

  return (
    <Common.CellmaPopup
      title={t("forgotPassword")}
      handleCancel={props.handleCancel}
    >
      <form onSubmit={EmailIdForm.handleSubmit}>
        <Mui.Grid container sx={{ display: "flex", justifyContent: "center" }}>
          <Mui.Grid item xs={10} sx={styles.popupContentGrid}>
            <Mui.Typography variant="h3" sx={styles.popupContentTypography}>
              {t("uniqueKeyMsg")}
            </Mui.Typography>
          </Mui.Grid>
          <Mui.Grid item xs={8} sx={styles.popupContentGrid}>
            <Common.CellmaInputField
              label={t("emailAddress")}
              name="emailAddress"
              id="emailAddress"
              value={EmailIdForm.values.emailAddress}
              onHandleChange={EmailIdForm.handleChange}
              onBlur={EmailIdForm.handleBlur}
              onKeyPress={validations.restrictSpaceAtStart}
              errorText={
                EmailIdForm.touched.emailAddress &&
                EmailIdForm.errors.emailAddress
              }
            />
          </Mui.Grid>
          <Mui.Grid item xs={10} sx={styles.popupButtonGrid}>
            <Common.CellmaButton
              type="submit"
              label={t("nextButton")}
              disabled={!(EmailIdForm.dirty && EmailIdForm.isValid)}
            />
          </Mui.Grid>
        </Mui.Grid>
      </form>
    </Common.CellmaPopup>
  );
};

export default EmailVerificationForm;
