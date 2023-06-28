import { useEffect, useState } from "react";

import * as Mui from "@mui/material";
import { useFormik } from "formik";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";

import * as Common from "../../../../common/CommonComponentsIndex";
import { setSnackbar } from "../../../../store/SnackbarAction";
import { isError } from "../../../../utils/GeneralUtils";
import { timeValidation } from "../../../../utils/Validations";
import {
  useAppointmentDuration,
  useAppointmentRoom,
} from "../../api/useServiceBookAppointment";
import * as dummyData from "../../assets/dummyData/ServiceBookAppointmentDummyData";
import t from "../../assets/translationFiles/ServiceBookAppointmentTranslation";

const AppointmentDetails = (props: any) => {
  const [isAllowFreeAppointment, setIsAllowFreeAppointment] = useState(false);
  const [
    isHoursThresholdToShowReasonForDelay,
    setIsHoursThresholdToShowReasonForDelay,
  ] = useState(false);
  const [slotNumber, setSlotNumber] = useState(0);
  const { isUseSpecialtyAndRegionSetting, isAllowToBookOnlineMeeting } =
    useSelector((state: any) => state.eventDataReducer);
  const dispatch = useDispatch();
  const { language } = useSelector((state: any) => state.language);
  const { appointmentRoom } = useAppointmentRoom({
    hour: 8,
    minute: 0,
    duration: 20,
    date: "09/06/2023",
    clinicTypeLocationEliId: 862,
    clinicTypeEliId: 861,
    slot: slotNumber || 1,
  });

  const { appointmentDuration } = useAppointmentDuration({
    hour: 8,
    minute: 0,
    duration: 20,
    date: "09/06/2023",
    espId: 28,
    clinicTypeLocationEliId: 1141,
    appointmentType: "review",
    durationModifier: 2,
  });
  const appointmentDurations = appointmentDuration?.durations ?? [];
  const appointmentRooms = appointmentRoom?.appointmentRooms ?? [];
  const appointmentDurationList: any[] = [];
  useEffect(() => {
    appointmentDurations?.forEach((element: any, index: any) => {
      appointmentDurationList.push({
        durMod: index + 1,
        duration: `${element} minutes`,
      });
    });
  }, [appointmentDurations, appointmentDurationList]);

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsAllowFreeAppointment(true);
    setIsHoursThresholdToShowReasonForDelay(true);
  }, []);

  useEffect(() => {
    if (Object.values(appointmentDetailsForm?.errors).length !== 0) {
      window.scrollTo(0, 0);
      appointmentDetailsForm.validateForm(appointmentDetailsForm?.values);
    }
  }, [language]);

  const currentDate = moment();
  const endTime = moment(currentDate.format("HH:mm"), "HH:mm:ss")
    .add(5, "minutes")
    .format();
  console.log(endTime, "date");
  const appointmentDetailsForm = useFormik({
    initialValues: {
      appointmentDate: null,
      appointmentStartTime: null,
      durationOfAppointment: "",
      appointmentEndTime: null,
      location: "Archway Center",
      healthProfessional: "Dr.John",
      clinicType: "",
      consultant: "",
      addToPathway: "",
      appointmentType: "",
      zone: "",
      room: "",
      appointmentReason: "",
      sendAppointmentText: "",
      patientType: "",
      createOnlineMeeting: "",
      freeAppointment: "",
      reasonForAppointmentDelay: "",
      notes: "",
    },
    validationSchema: yup.object().shape({
      durationOfAppointment: yup
        .object()
        .nullable()
        .required(t("durationOfAppointmentRequired")),
      appointmentEndTime: yup.date().nullable().typeError(t("invalidTime")),
      appointmentType: yup
        .object()
        .nullable()
        .required(t("appointmentTypeRequired")),
      zone: yup.object().nullable().required(t("zoneRequired")),
      room: yup.object().nullable().required(t("roomRequired")),
    }),
    onSubmit: (values: any) => {
      props.handleStep(3);
    },
  });

  return (
    <form onSubmit={appointmentDetailsForm.handleSubmit} noValidate>
      <Mui.Grid container spacing={3}>
        <Mui.Grid item xs={12}>
          <Mui.Typography variant="h2">
            {t("appointmentDetails")}
          </Mui.Typography>
        </Mui.Grid>
        <Mui.Grid item xs={12}>
          <Mui.Divider />
        </Mui.Grid>
        <Mui.Grid item xs={4}>
          <Common.CellmaDatePicker
            label={t("appointmentDate")}
            disabled
            name="appointmentDate"
            value={appointmentDetailsForm.values.appointmentDate ?? currentDate}
            onChange={(newDate: any) =>
              appointmentDetailsForm.setFieldValue("appointmentDate", newDate)
            }
          />
        </Mui.Grid>
        <Mui.Grid item xs={4}>
          <Common.CellmaTimePicker
            label={t("appointmentStartTime")}
            disabled
            value={
              appointmentDetailsForm.values.appointmentStartTime ?? currentDate
            }
            onChange={(newTime: Date | null) => {
              appointmentDetailsForm.setFieldValue(
                "appointmentStartTime",
                newTime
              );
            }}
          />
        </Mui.Grid>
        <Mui.Grid item xs={4}>
          <Common.CellmaAutoSelectField
            label={t("durationOfAppointment")}
            required
            name="durationOfAppointment"
            ariaLabel="durationOfAppointment"
            value={appointmentDetailsForm.values.durationOfAppointment ?? ""}
            onChange={(event: any, value: any) => {
              appointmentDetailsForm.setFieldValue(
                "durationOfAppointment",
                value
              );
              setSlotNumber(value?.durMod);
              appointmentDetailsForm.setFieldValue(
                "appointmentEndTime",
                moment(currentDate.format("HH:mm"), "HH:mm:ss")
                  .add(value?.duration.replace(/[^0-9]/g, ""), "minutes")
                  .format()
              );
            }}
            options={appointmentDurationList}
            getOptionLabel={(durationOfAppointment: any) =>
              durationOfAppointment?.duration ?? ""
            }
            renderOption={(props: any, durationOfAppointment: any) => (
              <li {...props}>{durationOfAppointment?.duration} </li>
            )}
            onBlur={appointmentDetailsForm.handleBlur}
            error={isError(appointmentDetailsForm, "durationOfAppointment")}
          />
        </Mui.Grid>
        <Mui.Grid item xs={4}>
          <Common.CellmaTimePicker
            label={t("appointmentEndTime")}
            name="appointmentEndTime"
            disabled
            value={appointmentDetailsForm.values.appointmentEndTime}
            onChange={(newTime: Date | null) => {
              appointmentDetailsForm.setFieldValue(
                "appointmentEndTime",
                newTime
              );
            }}
            onKeyPress={timeValidation}
            onBlur={appointmentDetailsForm.handleBlur}
            error={isError(appointmentDetailsForm, "appointmentEndTime")}
          />
        </Mui.Grid>
        <Mui.Grid item xs={4}>
          <Common.CellmaInputField
            label={t("location")}
            disabled
            name="location"
            value={appointmentDetailsForm.values.location}
            onHandleChange={appointmentDetailsForm?.handleChange}
          />
        </Mui.Grid>
        <Mui.Grid item xs={4}>
          <Common.CellmaInputField
            label={t("healthProfessional")}
            disabled
            name="healthProfessional"
            value={appointmentDetailsForm.values.healthProfessional}
            onHandleChange={appointmentDetailsForm?.handleChange}
          />
        </Mui.Grid>
        <Mui.Grid item xs={4}>
          <Common.CellmaAutoSelectField
            label={t("clinicType")}
            ariaLabel="appointmentDetailClinicType"
            name="clinicType"
            value={appointmentDetailsForm.values.clinicType ?? ""}
            onChange={(event: any, value: any) => {
              appointmentDetailsForm.setFieldValue("clinicType", value);
            }}
            options={dummyData.CLINIC_TYPE}
            getOptionLabel={(clinicType: any) => clinicType.label ?? ""}
            renderOption={(props: any, clinicType: any) => (
              <li {...props}>{clinicType.label}</li>
            )}
          />
        </Mui.Grid>
        <Mui.Grid item xs={4}>
          <Common.CellmaAutoSelectField
            label={t("consultant")}
            name="consultant"
            value={appointmentDetailsForm.values.consultant ?? ""}
            onChange={(event: any, value: any) => {
              appointmentDetailsForm.setFieldValue("consultant", value);
            }}
            options={dummyData.CONSULTANT}
            getOptionLabel={(consultant: any) => consultant.label ?? ""}
            renderOption={(props: any, consultant: any) => (
              <li {...props}>{consultant.label}</li>
            )}
          />
        </Mui.Grid>
        <Mui.Grid item xs={4}>
          <Common.CellmaAutoSelectField
            label={t("addToPathway")}
            name="addToPathway"
            ariaLabel="addToPathway"
            value={appointmentDetailsForm.values.addToPathway ?? ""}
            onChange={(event: any, value: any) => {
              appointmentDetailsForm.setFieldValue("addToPathway", value);
            }}
            options={dummyData.ADD_TO_PATHWAY}
            getOptionLabel={(addToPathway: any) => addToPathway.label ?? ""}
            renderOption={(props: any, addToPathway: any) => (
              <li {...props}>{addToPathway.label}</li>
            )}
          />
        </Mui.Grid>
        <Mui.Grid item xs={4}>
          <Common.CellmaAutoSelectField
            label={t("appointmentType")}
            required
            name="appointmentType"
            ariaLabel="appointmentType"
            value={appointmentDetailsForm.values.appointmentType ?? ""}
            onChange={(event: any, value: any) => {
              appointmentDetailsForm.setFieldValue("appointmentType", value);
            }}
            options={dummyData.APPOINTMENT_TYPE}
            getOptionLabel={(appointmentType: any) =>
              appointmentType.label ?? ""
            }
            renderOption={(props: any, appointmentType: any) => (
              <li {...props}>{appointmentType.label}</li>
            )}
            onBlur={appointmentDetailsForm.handleBlur}
            error={isError(appointmentDetailsForm, "appointmentType")}
          />
        </Mui.Grid>
        <Mui.Grid item xs={4}>
          <Common.CellmaAutoSelectField
            label={t("zone")}
            required
            name="zone"
            value={appointmentDetailsForm.values.zone ?? ""}
            onChange={(event: any, value: any) => {
              appointmentDetailsForm.setFieldValue("zone", value);
            }}
            options={dummyData.ZONE}
            getOptionLabel={(zone: any) => zone.label ?? ""}
            renderOption={(props: any, zone: any) => (
              <li {...props}>{zone.label}</li>
            )}
            onBlur={appointmentDetailsForm.handleBlur}
            error={isError(appointmentDetailsForm, "zone")}
          />
        </Mui.Grid>
        <Mui.Grid item xs={4}>
          <Common.CellmaAutoSelectField
            label={t("room")}
            required
            name="room"
            value={appointmentDetailsForm.values.room ?? ""}
            onChange={(event: any, value: any) => {
              appointmentDetailsForm.setFieldValue("room", value);
            }}
            options={appointmentRooms}
            getOptionLabel={(room: any) => room.arsName ?? ""}
            renderOption={(props: any, room: any) => (
              <li {...props}>{room.arsName}</li>
            )}
            onBlur={appointmentDetailsForm.handleBlur}
            error={isError(appointmentDetailsForm, "room")}
          />
        </Mui.Grid>
        <Mui.Grid item xs={4}>
          <Common.CellmaAutoSelectField
            label={t("appointmentReason")}
            name="appointmentReason"
            ariaLabel="appointmentReason"
            value={appointmentDetailsForm.values.appointmentReason ?? ""}
            onChange={(event: any, value: any) => {
              appointmentDetailsForm.setFieldValue("appointmentReason", value);
            }}
            options={dummyData.APPOINTMENT_REASON}
            getOptionLabel={(appointmentReason: any) =>
              appointmentReason.label ?? ""
            }
            renderOption={(props: any, appointmentReason: any) => (
              <li {...props}>{appointmentReason.label}</li>
            )}
          />
        </Mui.Grid>
        <Mui.Grid item xs={4}>
          <Common.CellmaAutoSelectField
            label={t("sendAppointmentText")}
            name="sendAppointmentText"
            ariaLabel="sendAppointmentText"
            value={appointmentDetailsForm.values.sendAppointmentText ?? ""}
            onChange={(event: any, value: any) => {
              appointmentDetailsForm.setFieldValue(
                "sendAppointmentText",
                value
              );
            }}
            options={dummyData.SEND_APPOINTMENT_TO_PATIENT}
            getOptionLabel={(sendAppointment: any) =>
              sendAppointment.label ?? ""
            }
            renderOption={(props: any, sendAppointment: any) => (
              <li {...props}>{sendAppointment.label}</li>
            )}
          />
        </Mui.Grid>
        <Mui.Grid item xs={4}>
          <Common.CellmaAutoSelectField
            label={t("patientType")}
            name="patientType"
            ariaLabel="patientType"
            value={appointmentDetailsForm.values.patientType ?? ""}
            onChange={(event: any, value: any) => {
              appointmentDetailsForm.setFieldValue("patientType", value);
            }}
            options={dummyData.PATIENT_TYPE}
            getOptionLabel={(patientType: any) => patientType.label ?? ""}
            renderOption={(props: any, patientType: any) => (
              <li {...props}>{patientType.label}</li>
            )}
          />
        </Mui.Grid>
        {isAllowToBookOnlineMeeting && (
          <Mui.Grid item xs={4}>
            <Common.CellmaAutoSelectField
              label={t("createOnlineMeeting")}
              name="createOnlineMeeting"
              value={appointmentDetailsForm.values.createOnlineMeeting ?? ""}
              onChange={(event: any, value: any) => {
                appointmentDetailsForm.setFieldValue(
                  "createOnlineMeeting",
                  value
                );
              }}
              options={dummyData.CREATE_ONLINE_MEETING}
              getOptionLabel={(createOnlineMeeting: any) =>
                createOnlineMeeting.label ?? ""
              }
              renderOption={(props: any, createOnlineMeeting: any) => (
                <li {...props}>{createOnlineMeeting.label}</li>
              )}
            />
          </Mui.Grid>
        )}
        {isAllowFreeAppointment && (
          <Mui.Grid item xs={4}>
            <Common.CellmaAutoSelectField
              label={t("freeAppointment")}
              name="freeAppointment"
              ariaLabel="freeAppointment"
              value={appointmentDetailsForm.values.freeAppointment ?? ""}
              onChange={(event: any, value: any) => {
                appointmentDetailsForm.setFieldValue("freeAppointment", value);
              }}
              options={dummyData.FREE_APPOINTMENT}
              getOptionLabel={(freeAppointment: any) =>
                freeAppointment.label ?? ""
              }
              renderOption={(props: any, freeAppointment: any) => (
                <li {...props}>{freeAppointment.label}</li>
              )}
            />
          </Mui.Grid>
        )}
        {isHoursThresholdToShowReasonForDelay && (
          <Mui.Grid item xs={4}>
            <Common.CellmaAutoSelectField
              label={t("reasonForAppointmentDelay")}
              name="reasonForAppointmentDelay"
              ariaLabel="reasonForAppointmentDelay"
              value={
                appointmentDetailsForm.values.reasonForAppointmentDelay ?? ""
              }
              onChange={(event: any, value: any) => {
                appointmentDetailsForm.setFieldValue(
                  "reasonForAppointmentDelay",
                  value
                );
              }}
              options={dummyData.REASON_FOR_APPOINTMENT_DELAY}
              getOptionLabel={(reasonForAppointmentDelay: any) =>
                reasonForAppointmentDelay.label ?? ""
              }
              renderOption={(props: any, reasonForAppointmentDelay: any) => (
                <li {...props}>{reasonForAppointmentDelay.label}</li>
              )}
            />
          </Mui.Grid>
        )}
        <Mui.Grid item xs={4}>
          <Common.CellmaInputField label={t("triage")} />
        </Mui.Grid>
        <Mui.Grid item xs={8}>
          <Common.CellmaInputField
            rows="3"
            multiline
            label={t("notes")}
            name="notes"
            placeholder={t("followUp")}
            value={appointmentDetailsForm.values.notes}
            onHandleChange={appointmentDetailsForm.handleChange}
          />
        </Mui.Grid>
        <Mui.Grid
          item
          xs={12}
          sx={{ display: "flex", justifyContent: "flex-end" }}
          gap={2}
        >
          {/* Setting is OFF currently for visualization purpose */}
          {!isUseSpecialtyAndRegionSetting && (
            <>
              <Common.CellmaButton
                label={t("cancel")}
                onClick={() => props.handleStep(1)}
              />
              <Common.CellmaButton
                label={t("next")}
                type="submit"
                // onClick={() => props.handleStep(3)}
              />
            </>
          )}
          {isUseSpecialtyAndRegionSetting && (
            <>
              <Common.CellmaButton
                label={t("saveAndBookAppointment")}
                onClick={() => {
                  props.handleStep(0);
                  dispatch(
                    setSnackbar(
                      true,
                      "success",
                      t("appointmentBookedSuccessfully"),
                      2
                    )
                  );
                }}
              />
              <Common.CellmaButton
                label={t("saveAndBookToday")}
                onClick={() => props.handleStep(0)}
              />
            </>
          )}
        </Mui.Grid>
      </Mui.Grid>
    </form>
  );
};

export default AppointmentDetails;
