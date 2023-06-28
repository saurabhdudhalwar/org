// Page Name : "addAndEditPatientAppointment"
// Page Id : "c4eve6"

import { useEffect, useState } from "react";

import * as Mui from "@mui/material";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useOutletContext } from "react-router-dom";
import * as yup from "yup";

import ServiceAppointmentsPopup from "./ServiceAppointmentsPopup";
import * as Common from "../../../../common/CommonComponentsIndex";
import { setSnackbar } from "../../../../store/SnackbarAction";
import { timeValidation } from "../../../../utils/Validations";
import * as dummyData from "../../assets/dummyData/ServiceBookAppointmentDummyData";
import t from "../../assets/translationFiles/ServiceBookAppointmentTranslation";

const AddAndEditPatientAppointment = () => {
  const [isServiceAppointmentsPopup, setIsServiceAppointmentsPopup] =
    useState(false);
  const dispatch = useDispatch();
  const { language } = useSelector((state: any) => state.language);

  const { setTitle, setSelectDateAndHp } = useOutletContext() as any;
  const navigate = useNavigate();
  useEffect(() => {
    setTitle(t("addAndEditPatientAppointment"));
    setSelectDateAndHp(false);
  });

  useEffect(() => {
    addAndEditPatientAppointmentForm.validateForm(
      addAndEditPatientAppointmentForm?.values
    );
  }, [language]);

  const addAndEditPatientAppointmentForm = useFormik({
    initialValues: {
      typeOfAppointment: "",
      service: "GUM/SRH Service",
      withHealthProfessional: "",
      consultant: "",
      appointmentDuration: "",
      date: "",
      time: null,
      reasonReviewAppointment: "",
      notes: "",
    },
    validationSchema: yup.object().shape({
      date: yup
        .date()
        .nullable()
        .required(t("dateRequired"))
        .min(new Date("01/01/1900"), t("invalidDate"))
        .max(new Date("12/31/2050"), t("invalidDate"))
        .typeError(t("invalidDate")),
      time: yup
        .date()
        .nullable()
        .required(t("timeRequired"))
        .typeError(t("invalidTime")),
    }),
    onSubmit: (values: any) => {
      dispatch(setSnackbar(true, "success", t("appointmentUpdated"), 2));
      navigate("/cellmaUser/eventData/scheduledPatientAppointments");
    },
  });

  return (
    <form onSubmit={addAndEditPatientAppointmentForm.handleSubmit} noValidate>
      <Mui.Grid container spacing={2}>
        <Mui.Grid item container>
          <Mui.Grid item xs={3} sx={styles.textGrid}>
            <Mui.Typography>{t("typeOfAppointment")}</Mui.Typography>
          </Mui.Grid>
          <Mui.Grid item xs={3}>
            <Common.CellmaAutoSelectField
              label={t("typeOfAppointment")}
              name="typeOfAppointment"
              ariaLabel="typeOfAppointment"
              options={dummyData.TYPE_OF_APPOINTMENT}
              value={
                addAndEditPatientAppointmentForm.values.typeOfAppointment ?? ""
              }
              onChange={(event: any, value: any) => {
                addAndEditPatientAppointmentForm.setFieldValue(
                  "typeOfAppointment",
                  value
                );
              }}
              getOptionLabel={(review: any) => review.label ?? ""}
              renderOption={(props: any, review: any) => (
                <li {...props}>{review.label}</li>
              )}
            />
          </Mui.Grid>
        </Mui.Grid>
        <Mui.Grid item container>
          <Mui.Grid item xs={3} sx={styles.textGrid}>
            <Mui.Typography>{t("service")}</Mui.Typography>
          </Mui.Grid>
          <Mui.Grid item xs={3} sx={{ width: "20px" }}>
            <Common.CellmaInputField
              label={t("service")}
              disabled
              name="service"
              value={addAndEditPatientAppointmentForm.values.service}
              onHandleChange={addAndEditPatientAppointmentForm?.handleChange}
            />
          </Mui.Grid>
        </Mui.Grid>
        <Mui.Grid item container>
          <Mui.Grid item xs={3} sx={styles.textGrid}>
            <Mui.Typography>{t("withHealthProfessional")}</Mui.Typography>
          </Mui.Grid>
          <Mui.Grid item xs={3}>
            <Common.CellmaAutoSelectField
              label={t("withHealthProfessional")}
              name="withHealthProfessional"
              ariaLabel="withHealthProfessional"
              options={dummyData.WITH_HEALTH_PROFESSIONAL}
              value={
                addAndEditPatientAppointmentForm.values
                  .withHealthProfessional ?? ""
              }
              onChange={(event: any, value: any) => {
                addAndEditPatientAppointmentForm.setFieldValue(
                  "withHealthProfessional",
                  value
                );
              }}
              getOptionLabel={(withHealthProfessional: any) =>
                withHealthProfessional.label ?? ""
              }
              renderOption={(props: any, withHealthProfessional: any) => (
                <li {...props}>{withHealthProfessional.label}</li>
              )}
            />
          </Mui.Grid>
        </Mui.Grid>
        <Mui.Grid item container>
          <Mui.Grid item xs={3} sx={styles.textGrid}>
            <Mui.Typography>{t("consultant")}</Mui.Typography>
          </Mui.Grid>
          <Mui.Grid item xs={3}>
            <Common.CellmaAutoSelectField
              label={t("consultant")}
              name="consultant"
              ariaLabel="consultant"
              options={dummyData.CONSULTANT}
              value={addAndEditPatientAppointmentForm.values.consultant ?? ""}
              onChange={(event: any, value: any) => {
                addAndEditPatientAppointmentForm.setFieldValue(
                  "consultant",
                  value
                );
              }}
              getOptionLabel={(consultant: any) => consultant.label ?? ""}
              renderOption={(props: any, consultant: any) => (
                <li {...props}>{consultant.label}</li>
              )}
            />
          </Mui.Grid>
        </Mui.Grid>
        <Mui.Grid item container>
          <Mui.Grid item xs={3} sx={styles.textGrid}>
            <Mui.Typography>{t("appointmentDuration")}</Mui.Typography>
          </Mui.Grid>
          <Mui.Grid item xs={3}>
            <Common.CellmaAutoSelectField
              label={t("appointmentDuration")}
              name="appointmentDuration"
              ariaLabel="appointmentDuration"
              options={dummyData.DURATION_OF_APPOINTMENT}
              value={
                addAndEditPatientAppointmentForm.values.appointmentDuration ??
                ""
              }
              onChange={(event: any, value: any) => {
                addAndEditPatientAppointmentForm.setFieldValue(
                  "appointmentDuration",
                  value
                );
              }}
              getOptionLabel={(duration: any) => duration.label ?? ""}
              renderOption={(props: any, duration: any) => (
                <li {...props}>{duration.label}</li>
              )}
            />
          </Mui.Grid>
        </Mui.Grid>
        <Mui.Grid item container>
          <Mui.Grid item xs={3} sx={styles.textGrid}>
            <Mui.Typography>{t("date")}</Mui.Typography>
            <Mui.Typography sx={{ color: "warning.dark" }}>*</Mui.Typography>
          </Mui.Grid>
          <Mui.Grid item xs={3}>
            <Common.CellmaDatePicker
              required
              label={t("date")}
              name="date"
              minDate={new Date("01/01/1900")}
              maxDate={new Date("12/31/2050")}
              value={addAndEditPatientAppointmentForm.values.date}
              onChange={(newDate: Date | null) => {
                addAndEditPatientAppointmentForm.setFieldValue("date", newDate);
                addAndEditPatientAppointmentForm.setFieldTouched(
                  "date",
                  true,
                  false
                );
              }}
              onBlur={addAndEditPatientAppointmentForm.handleBlur}
              error={
                addAndEditPatientAppointmentForm.touched.date &&
                addAndEditPatientAppointmentForm.errors.date
                  ? addAndEditPatientAppointmentForm.errors.date
                  : ""
              }
            />
          </Mui.Grid>
          <Mui.Grid item xs={3} sx={styles.checkAppointmentLink}>
            <Common.CellmaLink
              label={t("checkAppointment")}
              onClick={() => {
                setIsServiceAppointmentsPopup(true);
              }}
            >
              {t("checkAppointment")}
            </Common.CellmaLink>
          </Mui.Grid>
        </Mui.Grid>
        <Mui.Grid item container>
          <Mui.Grid item xs={3} sx={styles.textGrid}>
            <Mui.Typography>{t("time")}</Mui.Typography>
            <Mui.Typography sx={{ color: "warning.dark" }}>*</Mui.Typography>
          </Mui.Grid>
          <Mui.Grid item xs={3}>
            <Common.CellmaTimePicker
              required
              label={t("time")}
              name="time"
              value={addAndEditPatientAppointmentForm.values.time}
              onChange={(newTime: Date | null) => {
                addAndEditPatientAppointmentForm.setFieldValue("time", newTime);
                addAndEditPatientAppointmentForm.setFieldTouched(
                  "time",
                  true,
                  false
                );
              }}
              onKeyPress={timeValidation}
              onBlur={addAndEditPatientAppointmentForm.handleBlur}
              error={
                addAndEditPatientAppointmentForm.touched.time &&
                addAndEditPatientAppointmentForm.errors.time
                  ? addAndEditPatientAppointmentForm.errors.time
                  : ""
              }
            />
          </Mui.Grid>
        </Mui.Grid>
        <Mui.Grid item container>
          <Mui.Grid item xs={3} sx={styles.textGrid}>
            <Mui.Typography>{t("reasonReviewAppointment")}</Mui.Typography>
          </Mui.Grid>
          <Mui.Grid item xs={3}>
            <Common.CellmaAutoSelectField
              label={t("reasonReviewAppointment")}
              name="reasonReviewAppointment"
              ariaLabel="appointmentReview"
              options={dummyData.APPOINTMENT_REASON}
              value={
                addAndEditPatientAppointmentForm.values
                  .reasonReviewAppointment ?? ""
              }
              onChange={(event: any, value: any) => {
                addAndEditPatientAppointmentForm.setFieldValue(
                  "reasonReviewAppointment",
                  value
                );
              }}
              getOptionLabel={(reason: any) => reason.label ?? ""}
              renderOption={(props: any, reason: any) => (
                <li {...props}>{reason.label}</li>
              )}
            />
          </Mui.Grid>
        </Mui.Grid>
        <Mui.Grid item container>
          <Mui.Grid item xs={3}>
            <Mui.Typography>{t("notes")}</Mui.Typography>
          </Mui.Grid>
          <Mui.Grid item xs={3}>
            <Common.CellmaInputField
              label={t("notes")}
              rows="3"
              multiline
              name="notes"
              value={addAndEditPatientAppointmentForm.values.notes}
              onHandleChange={addAndEditPatientAppointmentForm?.handleChange}
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
        {isServiceAppointmentsPopup && (
          <ServiceAppointmentsPopup
            handleCancel={() => {
              setIsServiceAppointmentsPopup(false);
            }}
          />
        )}
      </Mui.Grid>
    </form>
  );
};

export default AddAndEditPatientAppointment;

const styles = {
  textGrid: { display: "flex", alignItems: "center" },
  checkAppointmentLink: {
    display: "flex",
    alignItems: "center",
    marginLeft: "20px",
  },
};
