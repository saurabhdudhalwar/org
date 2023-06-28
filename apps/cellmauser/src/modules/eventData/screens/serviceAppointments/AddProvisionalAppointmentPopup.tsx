import React, { useEffect } from "react";

import * as Mui from "@mui/material";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";

import * as Common from "../../../../common/CommonComponentsIndex";
import { setSnackbar } from "../../../../store/SnackbarAction";
import * as dummyData from "../../assets/dummyData/ServiceAppointmentsDummyData";
import t from "../../assets/translationFiles/serviceAppointmentTranslation";

interface Props {
  handleClose: any;
}
const AddProvisionalAppointmentPopup: React.FC<Props> = (props: any) => {
  const { language } = useSelector((state: any) => state.language);
  const dispatch = useDispatch();

  useEffect(() => {
    if (Object.values(provisionalAppointmentPopupForm?.errors).length !== 0) {
      provisionalAppointmentPopupForm.validateForm(
        provisionalAppointmentPopupForm?.values
      );
    }
  }, [language]);

  const provisionalAppointmentPopupForm = useFormik({
    initialValues: {
      appointmentType: "",
      service: "",
      clinicType: "",
      clinicLocation: "",
      appointmentDate: "",
      appointmentConfirmationStartDate: "",
      appointmentConfirmationEndDate: "",
      reasonForAppointment: "",
      notes: "",
    },
    validationSchema: yup.object().shape({
      appointmentDate: yup
        .date()
        .nullable()
        .min(new Date("01/01/1900"), t("invalidDate"))
        .max(new Date("12/31/2050"), t("invalidDate"))
        .typeError(t("invalidDate")),
      appointmentConfirmationStartDate: yup
        .date()
        .nullable()
        .min(new Date("01/01/1900"), t("invalidDate"))
        .max(new Date("12/31/2050"), t("invalidDate"))
        .typeError(t("invalidDate")),
      appointmentConfirmationEndDate: yup
        .date()
        .nullable()
        .min(new Date("01/01/1900"), t("invalidDate"))
        .test("test", t("invalidEndDate"), (value: any, validationContext) => {
          const { parent } = validationContext;
          if (
            parent.appointmentConfirmationStartDate &&
            parent.appointmentConfirmationEndDate &&
            parent.appointmentConfirmationStartDate >
              parent.appointmentConfirmationEndDate
          )
            return false;
          return true;
        })
        .max(new Date("12/31/2050"), t("invalidDate"))
        .typeError(t("invalidDate")),
    }),
    onSubmit: (values: any) => {
      dispatch(
        setSnackbar(true, "success", t("provisionalAppointmentBooked"), 2)
      );
      props.handleClose();
    },
  });

  return (
    <Common.CellmaPopup
      title={t("addProvisionalAppointment")}
      fullScreen
      handleCancel={() => props.handleClose()}
    >
      <form onSubmit={provisionalAppointmentPopupForm.handleSubmit} noValidate>
        <Mui.Grid container spacing={2} sx={styles.popupGridContainer}>
          <Mui.Grid item container>
            <Mui.Grid item xs={4} sx={styles.textGrid}>
              <Mui.Typography>{t("appointmentType")}</Mui.Typography>
            </Mui.Grid>
            <Mui.Grid item xs={3.5}>
              <Common.CellmaAutoSelectField
                dummyData
                label={t("appointmentType")}
                ariaLabel="appointmentTypePopup"
                name="appointmentType"
                options={dummyData.PROVISIONAL_APPOINTMENTS_TYPE}
                value={
                  provisionalAppointmentPopupForm.values.appointmentType ?? ""
                }
                onChange={(event: any, value: any) => {
                  provisionalAppointmentPopupForm.setFieldValue(
                    "appointmentType",
                    value
                  );
                }}
                getOptionLabel={(appointmentType: any) =>
                  appointmentType.label ?? ""
                }
                renderOption={(props: any, appointmentType: any) => (
                  <li {...props}>{appointmentType.label}</li>
                )}
              />
            </Mui.Grid>
          </Mui.Grid>
          <Mui.Grid item container>
            <Mui.Grid item xs={4} sx={styles.textGrid}>
              <Mui.Typography>{t("service")}</Mui.Typography>
            </Mui.Grid>
            <Mui.Grid item xs={3.5} sx={{ width: "20px" }}>
              <Common.CellmaAutoSelectField
                dummyData
                label={t("service")}
                name="service"
                options={dummyData.SERVICE}
                value={provisionalAppointmentPopupForm.values.service ?? ""}
                onChange={(event: any, value: any) => {
                  provisionalAppointmentPopupForm.setFieldValue(
                    "service",
                    value
                  );
                }}
                getOptionLabel={(service: any) => service.label ?? ""}
                renderOption={(props: any, service: any) => (
                  <li {...props}>{service.label}</li>
                )}
              />
            </Mui.Grid>
          </Mui.Grid>
          <Mui.Grid item container>
            <Mui.Grid item xs={4} sx={styles.textGrid}>
              <Mui.Typography>{t("clinicType")}</Mui.Typography>
            </Mui.Grid>
            <Mui.Grid item xs={3.5}>
              <Common.CellmaAutoSelectField
                dummyData
                label={t("clinicType")}
                ariaLabel="clinicTypePopup"
                name="clinicType"
                options={dummyData.CLINIC_TYPE}
                value={provisionalAppointmentPopupForm.values.clinicType ?? ""}
                onChange={(event: any, value: any) => {
                  provisionalAppointmentPopupForm.setFieldValue(
                    "clinicType",
                    value
                  );
                }}
                getOptionLabel={(clinicType: any) => clinicType.label ?? ""}
                renderOption={(props: any, clinicType: any) => (
                  <li {...props}>{clinicType.label}</li>
                )}
              />
            </Mui.Grid>
          </Mui.Grid>
          <Mui.Grid item container>
            <Mui.Grid item xs={4} sx={styles.textGrid}>
              <Mui.Typography>{t("clinicLocation")}</Mui.Typography>
            </Mui.Grid>
            <Mui.Grid item xs={3.5}>
              <Common.CellmaAutoSelectField
                dummyData
                label={t("clinicLocation")}
                name="clinicLocation"
                options={dummyData.CLINIC_LOCATION}
                value={
                  provisionalAppointmentPopupForm.values.clinicLocation ?? ""
                }
                onChange={(event: any, value: any) => {
                  provisionalAppointmentPopupForm.setFieldValue(
                    "clinicLocation",
                    value
                  );
                }}
                getOptionLabel={(clinicLocation: any) =>
                  clinicLocation.label ?? ""
                }
                renderOption={(props: any, clinicLocation: any) => (
                  <li {...props}>{clinicLocation.label}</li>
                )}
              />
            </Mui.Grid>
          </Mui.Grid>
          <Mui.Grid item container>
            <Mui.Grid item xs={4} sx={styles.textGrid}>
              <Mui.Typography>{t("appointmentDate")}</Mui.Typography>
            </Mui.Grid>
            <Mui.Grid item xs={3.5}>
              <Common.CellmaDatePicker
                label={t("appointmentDate")}
                zIndex={1400}
                name="appointmentDate"
                minDate={new Date("01/01/1900")}
                maxDate={new Date("12/31/2050")}
                value={provisionalAppointmentPopupForm.values.appointmentDate}
                onChange={(newDate: Date | null) => {
                  provisionalAppointmentPopupForm.setFieldValue(
                    "appointmentDate",
                    newDate
                  );
                  provisionalAppointmentPopupForm.setFieldTouched(
                    "appointmentDate",
                    true,
                    false
                  );
                }}
                onBlur={provisionalAppointmentPopupForm.handleBlur}
                error={
                  provisionalAppointmentPopupForm.touched.appointmentDate &&
                  provisionalAppointmentPopupForm.errors.appointmentDate
                    ? provisionalAppointmentPopupForm.errors.appointmentDate
                    : ""
                }
              />
            </Mui.Grid>
          </Mui.Grid>
          <Mui.Grid item container>
            <Mui.Grid item xs={4} sx={styles.textGrid}>
              <Mui.Typography>
                {t("appointmentConfirmationStartDate")}
              </Mui.Typography>
            </Mui.Grid>
            <Mui.Grid item xs={3.5}>
              <Common.CellmaDatePicker
                label={t("appointmentConfirmationStartDate")}
                zIndex={1400}
                name="appointmentConfirmationStartDate"
                minDate={new Date("01/01/1900")}
                maxDate={new Date("12/31/2050")}
                value={
                  provisionalAppointmentPopupForm.values
                    .appointmentConfirmationStartDate
                }
                onChange={(newDate: Date | null) => {
                  provisionalAppointmentPopupForm.setFieldValue(
                    "appointmentConfirmationStartDate",
                    newDate
                  );
                  provisionalAppointmentPopupForm.setFieldTouched(
                    "appointmentConfirmationStartDate",
                    true,
                    false
                  );
                }}
                onBlur={provisionalAppointmentPopupForm.handleBlur}
                error={
                  provisionalAppointmentPopupForm.touched
                    .appointmentConfirmationStartDate &&
                  provisionalAppointmentPopupForm.errors
                    .appointmentConfirmationStartDate
                    ? provisionalAppointmentPopupForm.errors
                        .appointmentConfirmationStartDate
                    : ""
                }
              />
            </Mui.Grid>
          </Mui.Grid>
          <Mui.Grid item container>
            <Mui.Grid item xs={4} sx={styles.textGrid}>
              <Mui.Typography>
                {t("appointmentConfirmationEndDate")}
              </Mui.Typography>
            </Mui.Grid>
            <Mui.Grid item xs={3.5}>
              <Common.CellmaDatePicker
                label={t("appointmentConfirmationEndDate")}
                zIndex={1400}
                name="appointmentConfirmationEndDate"
                minDate={new Date("01/01/1900")}
                maxDate={new Date("12/31/2050")}
                value={
                  provisionalAppointmentPopupForm.values
                    .appointmentConfirmationEndDate
                }
                onChange={(newDate: Date | null) => {
                  provisionalAppointmentPopupForm.setFieldValue(
                    "appointmentConfirmationEndDate",
                    newDate
                  );
                  provisionalAppointmentPopupForm.setFieldTouched(
                    "appointmentConfirmationEndDate",
                    true,
                    false
                  );
                }}
                onBlur={provisionalAppointmentPopupForm.handleBlur}
                error={
                  provisionalAppointmentPopupForm.touched
                    .appointmentConfirmationEndDate &&
                  provisionalAppointmentPopupForm.errors
                    .appointmentConfirmationEndDate
                    ? provisionalAppointmentPopupForm.errors
                        .appointmentConfirmationEndDate
                    : ""
                }
              />
            </Mui.Grid>
          </Mui.Grid>
          <Mui.Grid item container>
            <Mui.Grid item xs={4} sx={styles.textGrid}>
              <Mui.Typography>{t("reasonForAppointment")}</Mui.Typography>
            </Mui.Grid>
            <Mui.Grid item xs={4}>
              <Common.CellmaAutoSelectField
                dummyData
                label={t("reasonForAppointment")}
                name="reasonForAppointment"
                options={dummyData.REASON_FOR_APPOINTMENT}
                value={
                  provisionalAppointmentPopupForm.values.reasonForAppointment ??
                  ""
                }
                onChange={(event: any, value: any) => {
                  provisionalAppointmentPopupForm.setFieldValue(
                    "reasonForAppointment",
                    value
                  );
                }}
                getOptionLabel={(reasonForAppointment: any) =>
                  reasonForAppointment.label ?? ""
                }
                renderOption={(props: any, reasonForAppointment: any) => (
                  <li {...props}>{reasonForAppointment.label}</li>
                )}
              />
            </Mui.Grid>
          </Mui.Grid>
          <Mui.Grid item container>
            <Mui.Grid item xs={4}>
              <Mui.Typography>{t("notes")}</Mui.Typography>
            </Mui.Grid>
            <Mui.Grid item xs={5}>
              <Common.CellmaInputField
                label={t("notes")}
                name="notes"
                rows="3"
                multiline
                value={provisionalAppointmentPopupForm.values.notes ?? ""}
                onHandleChange={provisionalAppointmentPopupForm.handleChange}
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
    </Common.CellmaPopup>
  );
};

export default AddProvisionalAppointmentPopup;

const styles = {
  textGrid: { display: "flex", alignItems: "center" },
  checkAppointmentLink: {
    display: "flex",
    alignItems: "center",
    marginLeft: "20px",
  },
  popupGridContainer: {
    paddingY: "15px",
    paddingX: "35px",
  },
};
