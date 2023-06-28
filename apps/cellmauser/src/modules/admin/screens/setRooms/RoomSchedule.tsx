import React, { useEffect, useState } from "react";

import * as Mui from "@mui/material";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";

import * as Common from "../../../../common/CommonComponentsIndex";
import { setSnackbar } from "../../../../store/SnackbarAction";
import { timeValidation } from "../../../../utils/Validations";
import * as dummyData from "../../assets/dummyData/setRoomsDummyData";
import t from "../../assets/translationFiles/setRoomsTranslation";

interface Props {
  mode: any;
  resetMode(): any;
  handleSetRoomTable(): any;
}
const RoomSchedule: React.FC<Props> = (props) => {
  const [roomSchedules, setRoomSchedules] = useState([{ schedule: 1 }]);
  const { language } = useSelector((state: any) => state.language);

  const setRoomScheduleForm = useFormik({
    initialValues: {
      location: "",
      zone: "",
      rooms: "",
      activityType: "",
      startDate: "",
      endDate: "",
      startTime: null,
      endTime: null,
      roomStatus: "",
      reason: "",
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
      startTime: yup.date().nullable().typeError(t("invalidTime")),
      endTime: yup
        .date()
        .nullable()
        .min(yup.ref("startTime"), t("invalidEndTime"))
        .typeError(t("invalidTime")),
    }),
    onSubmit: (values: any) => {
      props.resetMode();
      props.handleSetRoomTable();
      dispatch(
        setSnackbar(
          true,
          "success",
          props.mode === "add"
            ? t("roomScheduleSetSuccessfully")
            : t("roomScheduleUpdateSuccessfully"),
          4
        )
      );
    },
  });

  useEffect(() => {
    if (Object.values(setRoomScheduleForm?.errors).length !== 0) {
      window.scrollTo(0, 0);
      setRoomScheduleForm.validateForm(setRoomScheduleForm?.values);
    }
  }, [language]);

  const dispatch = useDispatch();
  const addRoomSchedule = () => {
    if (roomSchedules?.length < 5) {
      setRoomSchedules([
        ...roomSchedules,
        { schedule: roomSchedules?.length + 1 },
      ]);
    } else if (roomSchedules?.length >= 5) {
      dispatch(setSnackbar(true, "warning", t("canNotAddMoreRecord"), 4));
    }
  };
  return (
    <form onSubmit={setRoomScheduleForm.handleSubmit} noValidate>
      <Mui.Grid container spacing={2}>
        <Mui.Grid container item>
          <Mui.Grid item xs={12} sx={styles.hpDiaryHeader}>
            <Mui.Typography variant="h2" sx={styles.hpDiaryText}>
              {t("roomSchedule")}
            </Mui.Typography>
          </Mui.Grid>
        </Mui.Grid>

        {roomSchedules?.map((schedule: any) => (
          <Mui.Grid container item xs={12} spacing={4} key={schedule}>
            <Mui.Grid container item xs={12} key={schedule} spacing={2}>
              <Mui.Grid item xs={2.4}>
                <Common.CellmaAutoSelectField
                  dummyData
                  label={t("location")}
                  name="location"
                  ariaLabel="roomScheduleLocation"
                  options={dummyData.LOCATIONS}
                  getOptionLabel={(location: any) => location.label ?? ""}
                  renderOption={(props: any, location: any) => (
                    <li {...props}>{location.label}</li>
                  )}
                  value={setRoomScheduleForm.values.location ?? ""}
                  onChange={(event: any, value: any) => {
                    setRoomScheduleForm.setFieldValue("location", value);
                  }}
                />
              </Mui.Grid>
              <Mui.Grid item xs={2.4}>
                <Common.CellmaAutoSelectField
                  dummyData
                  label={t("zone")}
                  name="zone"
                  ariaLabel="roomScheduleZone"
                  options={dummyData.ZONE}
                  getOptionLabel={(zone: any) => zone.label ?? ""}
                  renderOption={(props: any, zone: any) => (
                    <li {...props}>{zone.label}</li>
                  )}
                  value={setRoomScheduleForm.values.zone ?? ""}
                  onChange={(event: any, value: any) => {
                    setRoomScheduleForm.setFieldValue("zone", value);
                  }}
                />
              </Mui.Grid>
              <Mui.Grid item xs={2.4}>
                <Common.CellmaAutoSelectField
                  dummyData
                  label={t("rooms")}
                  name="rooms"
                  ariaLabel="roomScheduleRoom"
                  options={dummyData.ROOM}
                  getOptionLabel={(rooms: any) => rooms.label ?? ""}
                  renderOption={(props: any, rooms: any) => (
                    <li {...props}>{rooms.label}</li>
                  )}
                  value={setRoomScheduleForm.values.rooms ?? ""}
                  onChange={(event: any, value: any) => {
                    setRoomScheduleForm.setFieldValue("rooms", value);
                  }}
                />
              </Mui.Grid>
              <Mui.Grid item xs={2.4}>
                <Common.CellmaAutoSelectField
                  dummyData
                  label={t("activityType")}
                  name="activityType"
                  ariaLabel="roomScheduleActivityType"
                  options={dummyData.ACTIVITY_TYPE}
                  getOptionLabel={(rooms: any) => rooms.label ?? ""}
                  renderOption={(props: any, activityType: any) => (
                    <li {...props}>{activityType.label}</li>
                  )}
                  value={setRoomScheduleForm.values.rooms ?? ""}
                  onChange={(event: any, value: any) => {
                    setRoomScheduleForm.setFieldValue("activityType", value);
                  }}
                />
              </Mui.Grid>
              <Mui.Grid item xs={2.4}>
                <Common.CellmaDatePicker
                  label={t("startDate")}
                  name="startDate"
                  ariaLabel="roomScheduleStartDAte"
                  minDate={new Date("01/01/1900")}
                  maxDate={new Date("12/31/2050")}
                  value={setRoomScheduleForm.values.startDate}
                  onChange={(newDate: any) =>
                    setRoomScheduleForm.setFieldValue("startDate", newDate)
                  }
                  onBlur={setRoomScheduleForm.handleBlur}
                  error={setRoomScheduleForm.errors.startDate}
                />
              </Mui.Grid>
              <Mui.Grid item xs={2.4}>
                <Common.CellmaDatePicker
                  label={t("endDate")}
                  name="endDate"
                  ariaLabel="roomScheduleEndDate"
                  minDate={new Date("01/01/1900")}
                  maxDate={new Date("12/31/2050")}
                  value={setRoomScheduleForm.values.endDate}
                  onChange={(newDate: any) =>
                    setRoomScheduleForm.setFieldValue("endDate", newDate)
                  }
                  onBlur={setRoomScheduleForm.handleBlur}
                  error={setRoomScheduleForm.errors.endDate}
                />
              </Mui.Grid>
              <Mui.Grid item xs={2.4}>
                <Common.CellmaTimePicker
                  label={t("startTime")}
                  name="startTime"
                  ariaLabel="roomScheduleStartTime"
                  value={setRoomScheduleForm.values.startTime}
                  onChange={(newTime: Date | null) => {
                    setRoomScheduleForm.setFieldValue("startTime", newTime);
                  }}
                  onKeyPress={timeValidation}
                  onBlur={setRoomScheduleForm.handleBlur}
                  error={setRoomScheduleForm.errors.startTime}
                />
              </Mui.Grid>
              <Mui.Grid item xs={2.4}>
                <Common.CellmaTimePicker
                  label={t("endTime")}
                  name="endTime"
                  ariaLabel="roomScheduleEndTime"
                  value={setRoomScheduleForm.values.endTime}
                  onChange={(newTime: Date | null) => {
                    setRoomScheduleForm.setFieldValue("endTime", newTime);
                  }}
                  onKeyPress={timeValidation}
                  onBlur={setRoomScheduleForm.handleBlur}
                  error={setRoomScheduleForm.errors.endTime}
                />
              </Mui.Grid>
              <Mui.Grid item xs={2.4}>
                <Common.CellmaAutoSelectField
                  dummyData
                  label={t("roomStatus")}
                  name="roomStatus"
                  ariaLabel="roomScheduleRoomStatus"
                  options={dummyData.ROOM_STATUS}
                  getOptionLabel={(roomStatus: any) => roomStatus.label ?? ""}
                  renderOption={(props: any, roomStatus: any) => (
                    <li {...props}>{roomStatus.label}</li>
                  )}
                  value={setRoomScheduleForm.values.roomStatus ?? ""}
                  onChange={(event: any, value: any) => {
                    setRoomScheduleForm.setFieldValue("roomStatus", value);
                  }}
                />
              </Mui.Grid>
              <Mui.Grid item xs={4.8}>
                <Common.CellmaInputField
                  label={t("reason")}
                  multiline
                  rows={3}
                />
              </Mui.Grid>
            </Mui.Grid>
            {roomSchedules?.length > 1 && (
              <Mui.Grid xs={12} item>
                <Mui.Divider sx={{ color: "grey.800", borderBottomWidth: 2 }} />
              </Mui.Grid>
            )}
          </Mui.Grid>
        ))}

        <Mui.Grid item xs={12} sx={styles.alignEnd}>
          <Common.CellmaLink
            label={t("addAdditionalRoomSchedule")}
            onClick={addRoomSchedule}
          >
            {t("addAdditionalRoomSchedule")}
          </Common.CellmaLink>
        </Mui.Grid>
        <Mui.Grid item xs={12} sx={styles.alignEnd}>
          <Common.CellmaButton label={t("save")} type="submit" />
        </Mui.Grid>
      </Mui.Grid>
    </form>
  );
};

export default RoomSchedule;

const styles = {
  alignEnd: {
    display: "flex",
    justifyContent: "flex-end",
  },
  hpDiaryHeader: {
    backgroundColor: "primary.light",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "5px",
  },
  hpDiaryText: {
    color: "primary.dark",
  },
};
