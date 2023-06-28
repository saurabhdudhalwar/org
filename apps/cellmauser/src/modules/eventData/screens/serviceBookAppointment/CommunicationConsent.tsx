import { useEffect } from "react";

import * as Mui from "@mui/material";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import * as Common from "../../../../common/CommonComponentsIndex";
import { setSnackbar } from "../../../../store/SnackbarAction";
import { isUndefinedOrNullOrEmpty } from "../../../../utils/GeneralUtils";
import {
  useAddConsentDetails,
  useGetConsentDetails,
  useUpdateConsentDetails,
} from "../../api/useCommunicationConsent";
import t from "../../assets/translationFiles/ServiceBookAppointmentTranslation";

const CommunicationConsent = (props: any) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { patientId } = useSelector((state: any) => state.patient);

  const { data: getConsentDetails } = useGetConsentDetails(patientId);

  const { mutate: addConsentDetails } = useAddConsentDetails();
  const { mutate: updateConsentDetails } = useUpdateConsentDetails();

  const patientConsentId: any = [];
  useEffect(() => {
    if (!isUndefinedOrNullOrEmpty(getConsentDetails))
      getConsentDetails?.patientConsent?.map((element: any) => {
        patientConsentId.push(element?.pacId);
      });
  }, [getConsentDetails, patientConsentId]);

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  const setAllRadioButtons = (event: any, value: any) => {
    communicationConsentForm?.setFieldValue("allRadioButtons", value);
    if (communicationConsentForm?.values?.allRadioButtons !== "1") {
      communicationConsentForm?.setFieldValue("contactGp", "1");
      communicationConsentForm?.setFieldValue("contactByMobile", "1");
      communicationConsentForm?.setFieldValue("contactBySms", "1");
      communicationConsentForm?.setFieldValue("contactBySmsClinical", "1");
      communicationConsentForm?.setFieldValue("contactByEmail", "1");
      communicationConsentForm?.setFieldValue("contactByLetter", "1");
      communicationConsentForm?.setFieldValue("notificationAndResult", "1");
    } else {
      communicationConsentForm?.setFieldValue("contactGp", "0");
      communicationConsentForm?.setFieldValue("contactByMobile", "0");
      communicationConsentForm?.setFieldValue("contactBySms", "0");
      communicationConsentForm?.setFieldValue("contactBySmsClinical", "0");
      communicationConsentForm?.setFieldValue("contactByEmail", "0");
      communicationConsentForm?.setFieldValue("contactByLetter", "0");
      communicationConsentForm?.setFieldValue("notificationAndResult", "0");
    }
  };

  const handleSave = (response: any) => {
    const responseCode = response?.data?.validationCode;
    if (responseCode === "patient.coumunication.consent.added") {
      navigate("/cellmaUser/eventData/scheduledPatientAppointments");
      dispatch(setSnackbar(true, "success", t("communicationConsentAdded"), 4));
    }
  };

  const handleUpdate = (response: any) => {
    const responseCode = response?.data?.validationCode;
    if (responseCode === "patient.consent.updated") {
      navigate("/cellmaUser/eventData/scheduledPatientAppointments");
      dispatch(setSnackbar(true, "success", t("communicationConsentAdded"), 4));
    }
  };

  const communicationConsentForm = useFormik({
    enableReinitialize: true,
    initialValues: {
      gpAddressNumberAndRoad: getConsentDetails?.gpAddressDetails ?? "",
      patientMobile: getConsentDetails?.patientAddressDetails?.addMobile ?? "",
      patientMobileSms:
        getConsentDetails?.patientAddressDetails?.addMobile ?? "",
      patientMobileSmsClinical:
        getConsentDetails?.patientAddressDetails?.addMobile ?? "",
      patientMobileEmail:
        getConsentDetails?.patientAddressDetails?.addEmail ?? "",
      patientMobileLetter:
        getConsentDetails?.patientAddressDetails?.addAddress1 ?? "",
      contactGp: "1",
      contactByMobile: "1",
      contactBySms: "1",
      contactBySmsClinical: "1",
      contactByEmail: "1",
      contactByLetter: "1",
      notificationAndResult: "1",
      allRadioButtons: "1",
    },
    onSubmit: (values: any) => {
      const obj = {
        patId: patientId,
        gpConsent: values?.contactGp ?? "",
        mobileConsent: values?.contactByMobile ?? "",
        txtConsent: values?.contactBySms ?? "",
        smsClinicalConsent: values?.contactBySmsClinical ?? "",
        emailConsent: values?.contactByEmail ?? "",
        letterConsent: values?.contactByLetter ?? "",
        patPortalConsent: values?.notificationAndResult ?? "",
      };
      if (patientConsentId?.length === 0) {
        addConsentDetails(obj, { onSuccess: handleSave });
      } else {
        updateConsentDetails(obj, { onSuccess: handleUpdate });
      }
    },
  });

  useEffect(() => {
    if (!isUndefinedOrNullOrEmpty(getConsentDetails?.patientConsent)) {
      getConsentDetails?.patientConsent?.filter((element: any) => {
        if (
          element?.PacConsentType === "Contact GP" &&
          element?.pacConsentStatus === "Not Given"
        ) {
          communicationConsentForm.setFieldValue("contactGp", "0");
        } else if (
          element?.PacConsentType === "Contact GP" &&
          element?.pacConsentStatus === "Given"
        ) {
          communicationConsentForm.setFieldValue("contactGp", "1");
        }
      });
      getConsentDetails?.patientConsent?.filter((element: any) => {
        if (
          element?.PacConsentType === "Contact By Mobile" &&
          element?.pacConsentStatus === "Not Given"
        ) {
          communicationConsentForm.setFieldValue("contactByMobile", "0");
        } else if (
          element?.PacConsentType === "Contact By Mobile" &&
          element?.pacConsentStatus === "Given"
        ) {
          communicationConsentForm.setFieldValue("contactByMobile", "1");
        }
      });
      getConsentDetails?.patientConsent?.filter((element: any) => {
        if (
          element?.PacConsentType === "Contact By SMS - Appointment Info" &&
          element?.pacConsentStatus === "Not Given"
        ) {
          communicationConsentForm.setFieldValue("contactBySms", "0");
        } else if (
          element?.PacConsentType === "Contact By SMS - Appointment Info" &&
          element?.pacConsentStatus === "Given"
        ) {
          communicationConsentForm.setFieldValue("contactBySms", "1");
        }
      });
      getConsentDetails?.patientConsent?.filter((element: any) => {
        if (
          element?.PacConsentType === "Contact By SMS - Clinical Info" &&
          element?.pacConsentStatus === "Not Given"
        ) {
          communicationConsentForm.setFieldValue("contactBySmsClinical", "0");
        } else if (
          element?.PacConsentType === "Contact By SMS - Clinical Info" &&
          element?.pacConsentStatus === "Given"
        ) {
          communicationConsentForm.setFieldValue("contactBySmsClinical", "1");
        }
      });
      getConsentDetails?.patientConsent?.filter((element: any) => {
        if (
          element?.PacConsentType === "Contact By Email" &&
          element?.pacConsentStatus === "Not Given"
        ) {
          communicationConsentForm.setFieldValue("contactByEmail", "0");
        } else if (
          element?.PacConsentType === "Contact By Email" &&
          element?.pacConsentStatus === "Given"
        ) {
          communicationConsentForm.setFieldValue("contactByEmail", "1");
        }
      });
      getConsentDetails?.patientConsent?.filter((element: any) => {
        if (
          element?.PacConsentType === "Contact By Letter" &&
          element?.pacConsentStatus === "Not Given"
        ) {
          communicationConsentForm.setFieldValue("contactByLetter", "0");
        } else if (
          element?.PacConsentType === "Contact By Letter" &&
          element?.pacConsentStatus === "Given"
        ) {
          communicationConsentForm.setFieldValue("contactByLetter", "1");
        }
      });
      getConsentDetails?.patientConsent?.filter((element: any) => {
        if (
          element?.PacConsentType ===
            "Notification and Result via Patient Portal" &&
          element?.pacConsentStatus === "Not Given"
        ) {
          communicationConsentForm.setFieldValue("notificationAndResult", "0");
        } else if (
          element?.PacConsentType ===
            "Notification and Result via Patient Portal" &&
          element?.pacConsentStatus === "Given"
        ) {
          communicationConsentForm.setFieldValue("notificationAndResult", "1");
        }
      });
    }
    if (patientConsentId?.length !== 0) {
      communicationConsentForm.setFieldValue("allRadioButtons", "");
    }
  }, [getConsentDetails?.patientConsent]);

  return (
    <form onSubmit={communicationConsentForm.handleSubmit} noValidate>
      <Mui.Grid container spacing={3}>
        <Mui.Grid item xs={12}>
          <Mui.Typography variant="h2">
            {t("communicationConsent")}
          </Mui.Typography>
        </Mui.Grid>
        <Mui.Grid item xs={12}>
          <Mui.Divider />
        </Mui.Grid>
        <Mui.Grid item container xs={12} spacing={3}>
          <Mui.Grid item xs={3}>
            <Common.CellmaInputField
              label={t("gpAddressNumberAndRoad")}
              name="gpAddressNumberAndRoad"
              onHandleChange={communicationConsentForm.handleChange}
              value={communicationConsentForm?.values?.gpAddressNumberAndRoad}
              disabled
            />
          </Mui.Grid>
          <Mui.Grid item xs={9}>
            <Common.CellmaRadioButtonGroup
              value={communicationConsentForm?.values?.contactGp}
              name="contactGp"
              onChange={communicationConsentForm.handleChange}
              formLabel={t("contactGp")}
              label1={t("yes")}
              formControlLabel1="1"
              label2={t("no")}
              formControlLabel2="0"
            />
          </Mui.Grid>
        </Mui.Grid>
        <Mui.Grid item container xs={12} spacing={3}>
          <Mui.Grid item xs={3}>
            <Common.CellmaInputField
              label={t("patientMobile")}
              name="patientMobile"
              ariaLabel="contactByMobile"
              onHandleChange={communicationConsentForm.handleChange}
              value={communicationConsentForm?.values?.patientMobile}
              disabled
            />
          </Mui.Grid>
          <Mui.Grid item xs={9}>
            <Common.CellmaRadioButtonGroup
              value={communicationConsentForm?.values?.contactByMobile}
              name="contactByMobile"
              onChange={communicationConsentForm.handleChange}
              formLabel={t("contactByMobile")}
              formControlLabel1="1"
              label1={t("yes")}
              formControlLabel2="0"
              label2={t("no")}
            />
          </Mui.Grid>
        </Mui.Grid>
        <Mui.Grid item container xs={12} spacing={3}>
          <Mui.Grid item xs={3}>
            <Common.CellmaInputField
              label={t("patientMobile")}
              name="patientMobileSms"
              ariaLabel="contactBySMSAppointment"
              onHandleChange={communicationConsentForm.handleChange}
              value={communicationConsentForm?.values?.patientMobileSms}
              disabled
            />
          </Mui.Grid>
          <Mui.Grid item xs={9}>
            <Common.CellmaRadioButtonGroup
              value={communicationConsentForm?.values?.contactBySms}
              name="contactBySms"
              onChange={communicationConsentForm.handleChange}
              formLabel={t("contactBySms")}
              formControlLabel1="1"
              label1={t("yes")}
              formControlLabel2="0"
              label2={t("no")}
            />
          </Mui.Grid>
        </Mui.Grid>
        <Mui.Grid item container xs={12} spacing={3}>
          <Mui.Grid item xs={3}>
            <Common.CellmaInputField
              label={t("patientMobile")}
              name="patientMobileSmsClinical"
              ariaLabel="contactBySMSClinical"
              onHandleChange={communicationConsentForm.handleChange}
              value={communicationConsentForm?.values?.patientMobileSmsClinical}
              disabled
            />
          </Mui.Grid>
          <Mui.Grid item xs={9}>
            <Common.CellmaRadioButtonGroup
              value={communicationConsentForm?.values?.contactBySmsClinical}
              name="contactBySmsClinical"
              onChange={communicationConsentForm.handleChange}
              formLabel={t("contactBySmsClinical")}
              formControlLabel1="1"
              label1={t("yes")}
              formControlLabel2="0"
              label2={t("no")}
            />
          </Mui.Grid>
        </Mui.Grid>
        <Mui.Grid item container xs={12} spacing={3}>
          <Mui.Grid item xs={3}>
            <Common.CellmaInputField
              label={t("patientEmail")}
              name="patientMobileEmail"
              onHandleChange={communicationConsentForm.handleChange}
              value={communicationConsentForm?.values?.patientMobileEmail}
              disabled
            />
          </Mui.Grid>
          <Mui.Grid item xs={9}>
            <Common.CellmaRadioButtonGroup
              value={communicationConsentForm?.values?.contactByEmail}
              name="contactByEmail"
              onChange={communicationConsentForm.handleChange}
              formLabel={t("contactByEmail")}
              formControlLabel1="1"
              label1={t("yes")}
              formControlLabel2="0"
              label2={t("no")}
            />
          </Mui.Grid>
        </Mui.Grid>
        <Mui.Grid item container xs={12} spacing={3}>
          <Mui.Grid item xs={3}>
            <Common.CellmaInputField
              label={t("patientAddressNumberAndRoad")}
              name="patientMobileLetter"
              onHandleChange={communicationConsentForm.handleChange}
              value={communicationConsentForm?.values?.patientMobileLetter}
              disabled
            />
          </Mui.Grid>
          <Mui.Grid item xs={9}>
            <Common.CellmaRadioButtonGroup
              value={communicationConsentForm?.values?.contactByLetter}
              name="contactByLetter"
              onChange={communicationConsentForm.handleChange}
              formLabel={t("contactByLetter")}
              formControlLabel1="1"
              label1={t("yes")}
              formControlLabel2="0"
              label2={t("no")}
            />
          </Mui.Grid>
        </Mui.Grid>
        <Mui.Grid item container xs={12} spacing={3}>
          <Mui.Grid item xs={3} />
          <Mui.Grid item xs={9}>
            <Common.CellmaRadioButtonGroup
              value={communicationConsentForm?.values?.notificationAndResult}
              name="notificationAndResult"
              onChange={communicationConsentForm.handleChange}
              formLabel={t("notificationAndResult")}
              formControlLabel1="1"
              label1={t("yes")}
              formControlLabel2="0"
              label2={t("no")}
            />
          </Mui.Grid>
        </Mui.Grid>
        <Mui.Grid item container xs={12} spacing={3}>
          <Mui.Grid item xs={3} />
          <Mui.Grid item xs={9}>
            <Common.CellmaRadioButtonGroup
              name="allRadioButtons"
              value={communicationConsentForm?.values?.allRadioButtons}
              formControlLabel1="1"
              label1={t("allYes")}
              formControlLabel2="0"
              label2={t("allNo")}
              onChange={(event: any, value: any) => {
                setAllRadioButtons(event, value);
              }}
              hideLabel
              formLabel="hideLabel"
            />
          </Mui.Grid>
        </Mui.Grid>
        <Mui.Grid
          item
          xs={12}
          sx={{ display: "flex", justifyContent: "flex-end" }}
        >
          <Common.CellmaButton label={t("save")} type="submit" />
        </Mui.Grid>
      </Mui.Grid>
    </form>
  );
};

export default CommunicationConsent;
