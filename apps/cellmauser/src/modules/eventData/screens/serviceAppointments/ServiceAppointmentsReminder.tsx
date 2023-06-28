// Page Name : "serviceAppointmentsReminder"
// Page Id : "c4eve11"

import { useEffect, useState } from "react";

import * as Mui from "@mui/material";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useOutletContext } from "react-router-dom";
import * as yup from "yup";

import ServiceAppointmentsReminderTable from "./ServiceAppointmentsReminderTable";
import * as Common from "../../../../common/CommonComponentsIndex";
import { setIsDrawerOpen } from "../../../../store/CommonAction";
import { isError } from "../../../../utils/GeneralUtils";
import * as validations from "../../../../utils/Validations";
import { formatNHSNumber } from "../../../../utils/Validations";
import * as dummyData from "../../assets/dummyData/ServiceAppointmentsDummyData";
import t from "../../assets/translationFiles/serviceAppointmentTranslation";
import { setActiveScreenName } from "../../store/EventDataAction";

const GridItem = (props: any) => {
  return (
    <Mui.Grid item xs={3}>
      {props.children}
    </Mui.Grid>
  );
};

const ServiceAppointmentsReminder = () => {
  const [
    isServiceAppointmentReminderTable,
    setIsServiceAppointmentReminderTable,
  ] = useState(false);
  const { language } = useSelector((state: any) => state.language);
  const dispatch = useDispatch();
  const { setTitle, setSelectDateAndHp, setDrawerName } =
    useOutletContext() as any;

  useEffect(() => {
    dispatch(setIsDrawerOpen(true));
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    setTitle(t("serviceAppointmentReminder"));
    setDrawerName("serviceAppointmentsReminder");
    setSelectDateAndHp(false);
    dispatch(setActiveScreenName("serviceAppointmentsReminder"));
  });

  useEffect(() => {
    if (Object.values(serviceAppointmentsReminderForm?.errors).length !== 0) {
      serviceAppointmentsReminderForm.validateForm(
        serviceAppointmentsReminderForm?.values
      );
    }
  }, [language]);

  const serviceAppointmentsReminderForm = useFormik({
    initialValues: {
      startDate: "",
      endDate: "",
      location: "",
      appointmentsFor: "",
      nhsRef: "",
      patientFamilyName: "",
    },
    validationSchema: yup.object().shape({
      startDate: yup
        .date()
        .nullable()
        .min(new Date("01/01/1900"), t("invalidDate"))
        .max(new Date("12/31/2050"), t("invalidDate"))
        .typeError(t("invalidDate")),
      endDate: yup
        .date()
        .nullable()
        .min(new Date("01/01/1900"), t("invalidDate"))
        .test("test", t("invalidEndDate"), (value: any, validationContext) => {
          const { parent } = validationContext;
          if (
            parent.startDate &&
            parent.endDate &&
            parent.startDate > parent.endDate
          )
            return false;
          return true;
        })
        .max(new Date("12/31/2050"), t("invalidDate"))
        .typeError(t("invalidDate")),
    }),
    onSubmit: (values: any) => {
      setIsServiceAppointmentReminderTable(true);
    },
  });

  return (
    <form onSubmit={serviceAppointmentsReminderForm.handleSubmit} noValidate>
      <Mui.Grid container spacing={3}>
        <Mui.Grid item container spacing={3}>
          <GridItem>
            <Common.CellmaDatePicker
              label={t("startDate")}
              name="startDate"
              minDate={new Date("01/01/1900")}
              maxDate={new Date("12/31/2050")}
              value={serviceAppointmentsReminderForm.values.startDate}
              onChange={(newDate: Date | null) => {
                serviceAppointmentsReminderForm.setFieldValue(
                  "startDate",
                  newDate
                );
                serviceAppointmentsReminderForm.setFieldTouched(
                  "startDate",
                  true,
                  false
                );
              }}
              onBlur={serviceAppointmentsReminderForm.handleBlur}
              error={
                serviceAppointmentsReminderForm.touched.startDate &&
                serviceAppointmentsReminderForm.errors.startDate
                  ? serviceAppointmentsReminderForm.errors.startDate
                  : ""
              }
            />
          </GridItem>
          <GridItem>
            <Common.CellmaDatePicker
              label={t("endDate")}
              name="endDate"
              minDate={new Date("01/01/1900")}
              maxDate={new Date("12/31/2050")}
              value={serviceAppointmentsReminderForm.values.endDate}
              onChange={(newDate: Date | null) => {
                serviceAppointmentsReminderForm.setFieldValue(
                  "endDate",
                  newDate
                );
                serviceAppointmentsReminderForm.setFieldTouched(
                  "endDate",
                  true,
                  false
                );
              }}
              onBlur={serviceAppointmentsReminderForm.handleBlur}
              error={
                serviceAppointmentsReminderForm.touched.endDate &&
                serviceAppointmentsReminderForm.errors.endDate
                  ? serviceAppointmentsReminderForm.errors.endDate
                  : ""
              }
            />
          </GridItem>
          <GridItem>
            <Common.CellmaAutoSelectField
              label={t("location")}
              name="location"
              options={dummyData.LOCATIONS}
              value={serviceAppointmentsReminderForm.values.location ?? ""}
              onChange={(event: any, value: any) => {
                serviceAppointmentsReminderForm.setFieldValue(
                  "location",
                  value
                );
              }}
              getOptionLabel={(location: any) => location.label ?? ""}
              renderOption={(props: any, location: any) => (
                <li {...props}>{location.label}</li>
              )}
            />
          </GridItem>
          <GridItem>
            <Common.CellmaAutoSelectField
              label={t("appointmentsFor")}
              name="appointmentsFor"
              ariaLabel="appointmentsFor"
              options={dummyData.APPOINTMENT_FOR}
              value={
                serviceAppointmentsReminderForm.values.appointmentsFor ?? ""
              }
              onChange={(event: any, value: any) => {
                serviceAppointmentsReminderForm.setFieldValue(
                  "appointmentsFor",
                  value
                );
              }}
              getOptionLabel={(appointmentFor: any) =>
                appointmentFor.label ?? ""
              }
              renderOption={(props: any, appointmentFor: any) => (
                <li {...props}>{appointmentFor.label}</li>
              )}
            />
          </GridItem>
          <GridItem>
            <Common.CellmaInputField
              label={t("nhsRef")}
              name="nhsRef"
              maxLength="20"
              value={serviceAppointmentsReminderForm.values.nhsRef ?? ""}
              onCopy={validations.restrictCutCopyPaste}
              onCut={validations.restrictCutCopyPaste}
              onPaste={validations.restrictCutCopyPaste}
              onKeyPress={validations.nhsNoValidation}
              onHandleChange={serviceAppointmentsReminderForm.handleChange}
              onBlur={(event: any) => {
                serviceAppointmentsReminderForm.setFieldValue(
                  "nhsRef",
                  formatNHSNumber(event.target.value)
                );
              }}
              errorText={isError(serviceAppointmentsReminderForm, "nhsRef")}
            />
          </GridItem>
          <GridItem>
            <Common.CellmaInputField
              label={t("patientFamilyName")}
              name="patientFamilyName"
              style={{ textTransform: "capitalize" }}
              value={
                serviceAppointmentsReminderForm.values.patientFamilyName ?? ""
              }
              onKeyPress={validations.allowCharHyphenApostropheSpace}
              onPaste={
                validations.restrictPasteEventForSpecialCharactersAndNumbers
              }
              onHandleChange={serviceAppointmentsReminderForm.handleChange}
            />
          </GridItem>
          <Mui.Grid item xs={3} sx={{ display: "flex", alignItems: "center" }}>
            <Common.CellmaButton
              label={t("search")}
              type="submit"
              marginY="opx"
            />
          </Mui.Grid>
        </Mui.Grid>
        {isServiceAppointmentReminderTable && (
          <Mui.Grid item xs={12}>
            <ServiceAppointmentsReminderTable
              appointmentReminderRows={
                dummyData.SERVICE_APPOINTMENTS_REMINDER_ROWS
              }
            />
          </Mui.Grid>
        )}
      </Mui.Grid>
    </form>
  );
};

export default ServiceAppointmentsReminder;
