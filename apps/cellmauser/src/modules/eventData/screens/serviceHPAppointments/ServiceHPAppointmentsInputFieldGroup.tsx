import { useEffect } from "react";

import * as Mui from "@mui/material";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";

import * as Common from "../../../../common/CommonComponentsIndex";
import { setSnackbar } from "../../../../store/SnackbarAction";
import { isError } from "../../../../utils/GeneralUtils";
import { timeValidation } from "../../../../utils/Validations";
import * as dummyData from "../../assets/dummyData/ServiceHPAppointmentsDummyData";
import t from "../../assets/translationFiles/serviceHPAppointmentTranslation";

const GridItem = (props: any) => {
  return (
    <Mui.Grid item xs={12 / 5}>
      <Mui.Grid item xs={12}>
        {props.children}
      </Mui.Grid>
    </Mui.Grid>
  );
};

const ServiceHPAppointmentsInputFieldGroup = (prop: any) => {
  const { language } = useSelector((state: any) => state.language);
  const dispatch = useDispatch();

  const useSpecialtyAndRegion = true;

  useEffect(() => {
    if (Object.values(serviceHpAppointmentForm?.errors).length !== 0) {
      serviceHpAppointmentForm.validateForm(serviceHpAppointmentForm?.values);
    }
  }, [language]);

  const serviceHpAppointmentForm = useFormik({
    initialValues: {
      service: "",
      team: "",
      specialty: "",
      clinicType: "",
      clinicLocation: "",
      zone: "",
      appointmentType: "",
      bookAppointmentPriorInDay: "",
      roomType: "",
      duration: "",
      maxAppointment: "",
      startDate: "",
      endDate: "",
      occurrenceType: "",
      occurrence: "",
      startTime: null,
      endTime: null,
      patientWeb: "",
      bookingInWorkingHours: "",
    },
    validationSchema: yup.object().shape({
      team: yup.object().nullable().required(t("teamRequired")),
      specialty: yup.object().nullable().required(t("specialtyRequired")),
      clinicType: yup.object().nullable().required(t("clinicTypeRequired")),
      clinicLocation: yup
        .object()
        .nullable()
        .required(t("clinicLocationRequired")),
      duration: yup.object().nullable().required(t("durationRequired")),
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
      startTime: yup.date().nullable().typeError(t("invalidTime")),
      endTime: yup
        .date()
        .nullable()
        .min(yup.ref("startTime"), t("invalidEndTime"))
        .typeError(t("invalidTime")),
    }),
    onSubmit: (values: any) => {
      if (prop?.hpClinicScheduledMode === "add") {
        dispatch(
          setSnackbar(true, "success", t("hpClinicScheduleSetSuccessfully"), 4)
        );
        prop?.handleAdd();
      } else {
        dispatch(
          setSnackbar(
            true,
            "success",
            t("hpClinicScheduleUpdatedSuccessfully"),
            4
          )
        );
        prop?.handleSave();
      }
    },
  });

  return (
    <form onSubmit={serviceHpAppointmentForm.handleSubmit} noValidate>
      <Mui.Grid container spacing={3}>
        <Mui.Grid item container spacing={3}>
          <GridItem>
            <Common.CellmaAutoSelectField
              label={t("service")}
              ariaLabel="Service"
              name="service"
              value={serviceHpAppointmentForm.values.service ?? ""}
              options={dummyData.SERVICE}
              onChange={(event: any, value: any) => {
                serviceHpAppointmentForm.setFieldValue("service", value);
              }}
              getOptionLabel={(service: any) => service.label ?? ""}
              renderOption={(props: any, service: any) => (
                <li {...props}>{service.label}</li>
              )}
            />
          </GridItem>
          <GridItem>
            <Common.CellmaAutoSelectField
              required
              label={t("team")}
              ariaLabel="Team"
              name="team"
              options={dummyData.TEAM}
              value={serviceHpAppointmentForm.values.team ?? ""}
              onChange={(event: any, value: any) => {
                serviceHpAppointmentForm.setFieldValue("team", value);
              }}
              getOptionLabel={(team: any) => team.label ?? ""}
              renderOption={(props: any, team: any) => (
                <li {...props}>{team.label}</li>
              )}
              onBlur={serviceHpAppointmentForm.handleBlur}
              error={isError(serviceHpAppointmentForm, "team")}
            />
          </GridItem>
          {/* This specialty field will be hidden if use Specialty And Region setting is Off */}
          {useSpecialtyAndRegion && (
            <GridItem>
              <Common.CellmaAutoSelectField
                required
                label={t("specialty")}
                ariaLabel="Specialty"
                name="specialty"
                options={dummyData.SPECIALTY}
                value={serviceHpAppointmentForm.values.specialty ?? ""}
                onChange={(event: any, value: any) => {
                  serviceHpAppointmentForm.setFieldValue("specialty", value);
                }}
                getOptionLabel={(specialty: any) => specialty.label ?? ""}
                renderOption={(props: any, specialty: any) => (
                  <li {...props}>{specialty.label}</li>
                )}
                onBlur={serviceHpAppointmentForm.handleBlur}
                error={isError(serviceHpAppointmentForm, "specialty")}
              />
            </GridItem>
          )}
          <GridItem>
            <Common.CellmaAutoSelectField
              required
              label={t("clinicType")}
              ariaLabel="clinicType"
              name="clinicType"
              options={dummyData.CLINIC_TYPE}
              value={serviceHpAppointmentForm.values.clinicType ?? ""}
              onChange={(event: any, value: any) => {
                serviceHpAppointmentForm.setFieldValue("clinicType", value);
              }}
              getOptionLabel={(clinicType: any) => clinicType.label ?? ""}
              renderOption={(props: any, clinicType: any) => (
                <li {...props}>{clinicType.label}</li>
              )}
              onBlur={serviceHpAppointmentForm.handleBlur}
              error={isError(serviceHpAppointmentForm, "clinicType")}
            />
          </GridItem>
          <GridItem>
            <Common.CellmaAutoSelectField
              required
              label={t("clinicLocation")}
              ariaLabel="clinicLocation"
              name="clinicLocation"
              options={dummyData.CLINIC_LOCATION}
              value={serviceHpAppointmentForm.values.clinicLocation ?? ""}
              onChange={(event: any, value: any) => {
                serviceHpAppointmentForm.setFieldValue("clinicLocation", value);
              }}
              getOptionLabel={(clinicLocation: any) =>
                clinicLocation.label ?? ""
              }
              renderOption={(props: any, clinicLocation: any) => (
                <li {...props}>{clinicLocation.label}</li>
              )}
              onBlur={serviceHpAppointmentForm.handleBlur}
              error={isError(serviceHpAppointmentForm, "clinicLocation")}
            />
          </GridItem>
          <GridItem>
            <Common.CellmaAutoSelectField
              label={t("zone")}
              ariaLabel="Zone"
              name="zone"
              options={dummyData.ZONE}
              value={serviceHpAppointmentForm.values.zone ?? ""}
              onChange={(event: any, value: any) => {
                serviceHpAppointmentForm.setFieldValue("zone", value);
              }}
              getOptionLabel={(zone: any) => zone.label ?? ""}
              renderOption={(props: any, zone: any) => (
                <li {...props}>{zone.label}</li>
              )}
            />
          </GridItem>
          <GridItem>
            <Common.CellmaAutoSelectField
              label={t("appointmentType")}
              ariaLabel="appointmentType"
              name="appointmentType"
              options={dummyData.APPOINTMENT_TYPE}
              value={serviceHpAppointmentForm.values.appointmentType ?? ""}
              onChange={(event: any, value: any) => {
                serviceHpAppointmentForm.setFieldValue(
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
          </GridItem>
          <GridItem>
            <Common.CellmaAutoSelectField
              label={t("bookAppointmentPriorInDay")}
              ariaLabel="bookAppointmentPriorInDay"
              name="bookAppointmentPriorInDay"
              options={dummyData.APPOINTMENT_PRIOR_IN_DAY}
              value={
                serviceHpAppointmentForm.values.bookAppointmentPriorInDay ?? ""
              }
              onChange={(event: any, value: any) => {
                serviceHpAppointmentForm.setFieldValue(
                  "bookAppointmentPriorInDay",
                  value
                );
              }}
              getOptionLabel={(day: any) => day.label ?? ""}
              renderOption={(props: any, day: any) => (
                <li {...props}>{day.label}</li>
              )}
            />
          </GridItem>
          <GridItem>
            <Common.CellmaAutoSelectField
              label={t("roomType")}
              ariaLabel="roomType"
              name="roomType"
              options={dummyData.ROOM_TYPE}
              value={serviceHpAppointmentForm.values.roomType ?? ""}
              onChange={(event: any, value: any) => {
                serviceHpAppointmentForm.setFieldValue("roomType", value);
              }}
              getOptionLabel={(roomType: any) => roomType.label ?? ""}
              renderOption={(props: any, roomType: any) => (
                <li {...props}>{roomType.label}</li>
              )}
            />
          </GridItem>
          <GridItem>
            <Common.CellmaAutoSelectField
              required
              label={t("duration")}
              ariaLabel="Duration"
              name="duration"
              options={dummyData.DURATION}
              value={serviceHpAppointmentForm.values.duration ?? ""}
              onChange={(event: any, value: any) => {
                serviceHpAppointmentForm.setFieldValue("duration", value);
              }}
              getOptionLabel={(duration: any) => duration.label ?? ""}
              renderOption={(props: any, duration: any) => (
                <li {...props}>{duration.label}</li>
              )}
              onBlur={serviceHpAppointmentForm.handleBlur}
              error={isError(serviceHpAppointmentForm, "duration")}
            />

            <Common.CellmaLink
              label="Set Default Duration Modifier"
              onClick={prop?.openDurationPopup}
              fontSize="14px"
            >
              {t("setDefaultDurationModifier")}
            </Common.CellmaLink>
          </GridItem>
          <GridItem>
            <Common.CellmaAutoSelectField
              label={t("maxAppointment")}
              ariaLabel="maxAppointment"
              name="maxAppointment"
              options={dummyData.MAX_APPOINTMENT}
              value={serviceHpAppointmentForm.values.maxAppointment ?? ""}
              onChange={(event: any, value: any) => {
                serviceHpAppointmentForm.setFieldValue("maxAppointment", value);
              }}
              getOptionLabel={(maxAppointment: any) =>
                maxAppointment.label ?? ""
              }
              renderOption={(props: any, maxAppointment: any) => (
                <li {...props}>{maxAppointment.label}</li>
              )}
            />
          </GridItem>
          <GridItem>
            <Common.CellmaDatePicker
              label={t("startDate")}
              name="startDate"
              minDate={new Date("01/01/1900")}
              maxDate={new Date("12/31/2050")}
              value={serviceHpAppointmentForm.values.startDate}
              onChange={(newDate: Date | null) => {
                serviceHpAppointmentForm.setFieldValue("startDate", newDate);
                serviceHpAppointmentForm.setFieldTouched(
                  "startDate",
                  true,
                  false
                );
              }}
              onBlur={serviceHpAppointmentForm.handleBlur}
              error={
                serviceHpAppointmentForm.touched.startDate &&
                serviceHpAppointmentForm.errors.startDate
                  ? serviceHpAppointmentForm.errors.startDate
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
              value={serviceHpAppointmentForm.values.endDate}
              onChange={(newDate: Date | null) => {
                serviceHpAppointmentForm.setFieldValue("endDate", newDate);
                serviceHpAppointmentForm.setFieldTouched(
                  "endDate",
                  true,
                  false
                );
              }}
              onBlur={serviceHpAppointmentForm.handleBlur}
              error={
                serviceHpAppointmentForm.touched.endDate &&
                serviceHpAppointmentForm.errors.endDate
                  ? serviceHpAppointmentForm.errors.endDate
                  : ""
              }
            />
          </GridItem>
          <GridItem>
            <Common.CellmaAutoSelectField
              label={t("occurrenceType")}
              ariaLabel="occurrenceType"
              name="occurrenceType"
              options={dummyData.OCCURRENCE_TYPE}
              value={serviceHpAppointmentForm.values.occurrenceType ?? ""}
              onChange={(event: any, value: any) => {
                serviceHpAppointmentForm.setFieldValue("occurrenceType", value);
              }}
              getOptionLabel={(occurrenceType: any) =>
                occurrenceType.label ?? ""
              }
              renderOption={(props: any, occurrenceType: any) => (
                <li {...props}>{occurrenceType.label}</li>
              )}
            />
          </GridItem>
          <GridItem>
            <Common.CellmaAutoSelectField
              label={t("occurrence")}
              ariaLabel="Occurrence"
              name="occurrence"
              options={dummyData.OCCURRENCE}
              value={serviceHpAppointmentForm.values.occurrence ?? ""}
              onChange={(event: any, value: any) => {
                serviceHpAppointmentForm.setFieldValue("occurrence", value);
              }}
              getOptionLabel={(occurrence: any) => occurrence.label ?? ""}
              renderOption={(props: any, occurrence: any) => (
                <li {...props}>{occurrence.label}</li>
              )}
            />
          </GridItem>
          <GridItem>
            <Common.CellmaTimePicker
              label={t("startTime")}
              name="startTime"
              value={serviceHpAppointmentForm.values.startTime}
              onChange={(newTime: Date | null) => {
                serviceHpAppointmentForm.setFieldValue("startTime", newTime);
                serviceHpAppointmentForm.setFieldTouched(
                  "startTime",
                  true,
                  false
                );
              }}
              onKeyPress={timeValidation}
              onBlur={serviceHpAppointmentForm.handleBlur}
              error={
                serviceHpAppointmentForm?.touched?.startTime &&
                serviceHpAppointmentForm?.errors?.startTime
                  ? serviceHpAppointmentForm?.errors?.startTime
                  : ""
              }
            />
          </GridItem>
          <GridItem>
            <Common.CellmaTimePicker
              label={t("endTime")}
              name="endTime"
              value={serviceHpAppointmentForm.values.endTime}
              onChange={(newTime: Date | null) => {
                serviceHpAppointmentForm.setFieldValue("endTime", newTime);
                serviceHpAppointmentForm.setFieldTouched(
                  "endTime",
                  true,
                  false
                );
              }}
              onKeyPress={timeValidation}
              onBlur={serviceHpAppointmentForm.handleBlur}
              error={
                serviceHpAppointmentForm?.touched?.endTime &&
                serviceHpAppointmentForm?.errors?.endTime
                  ? serviceHpAppointmentForm?.errors?.endTime
                  : ""
              }
            />
          </GridItem>
          <GridItem>
            <Common.CellmaAutoSelectField
              label={t("patientWeb")}
              ariaLabel="patientWeb"
              name="patientWeb"
              value={serviceHpAppointmentForm.values.patientWeb ?? ""}
              onChange={(event: any, value: any) => {
                serviceHpAppointmentForm.setFieldValue("patientWeb", value);
              }}
              options={dummyData.STATUS}
              getOptionLabel={(patientWeb: any) => patientWeb.label ?? "No"}
              renderOption={(props: any, patientWeb: any) => (
                <li {...props}>{patientWeb.label}</li>
              )}
            />
          </GridItem>
          <GridItem>
            <Common.CellmaAutoSelectField
              label={t("bookingInWorkingHours")}
              ariaLabel="bookingInWorkingHours"
              name="bookingInWorkingHours"
              value={
                serviceHpAppointmentForm.values.bookingInWorkingHours ?? ""
              }
              onChange={(event: any, value: any) => {
                serviceHpAppointmentForm.setFieldValue(
                  "bookingInWorkingHours",
                  value
                );
              }}
              options={dummyData.STATUS}
              getOptionLabel={(status: any) => status.label ?? "No"}
              renderOption={(props: any, status: any) => (
                <li {...props}>{status.label}</li>
              )}
            />
          </GridItem>
          <Mui.Grid
            item
            xs={12 / 5}
            sx={{ display: "flex", alignItems: "center" }}
          >
            {prop?.hpClinicScheduledMode === "add" ? (
              <Common.CellmaButton
                label={t("add")}
                marginY="0px"
                type="submit"
              />
            ) : (
              <Common.CellmaButton
                label={t("save")}
                marginY="0px"
                type="submit"
              />
            )}
          </Mui.Grid>
        </Mui.Grid>
      </Mui.Grid>
    </form>
  );
};

export default ServiceHPAppointmentsInputFieldGroup;
