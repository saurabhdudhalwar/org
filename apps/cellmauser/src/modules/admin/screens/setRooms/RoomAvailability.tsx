import React, { useEffect, useState } from "react";

import * as Mui from "@mui/material";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";

import RoomSchedule from "./RoomSchedule";
import * as Common from "../../../../common/CommonComponentsIndex";
import { setSnackbar } from "../../../../store/SnackbarAction";
import { isError } from "../../../../utils/GeneralUtils";
import { timeValidation } from "../../../../utils/Validations";
import * as dummyData from "../../assets/dummyData/setRoomsDummyData";
import t from "../../assets/translationFiles/setRoomsTranslation";

interface Props {
  mode: any;
  handleResetMode: any;
  handleSetRoomTable(): any;
}

const RoomAvailability: React.FC<Props> = (props) => {
  const [startDate, setStartDate] = useState<any>("");
  const [endDate, setEndDate] = useState<any>("");
  const [startTime, setStartTime] = useState<any>("");
  const [endTime, setEndTime] = useState<any>("");
  const [isRoomSchedule, setIsRoomSchedule] = useState(false);
  const dispatch = useDispatch();
  const { language } = useSelector((state: any) => state.language);

  const setRoomForm = useFormik({
    initialValues: {
      location: "",
      zone: "",
      rooms: "",
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
      props.handleSetRoomTable();
      dispatch(
        setSnackbar(
          true,
          "success",
          props.mode === "edit"
            ? t("roomAvailabilityUpdatedSuccessfully")
            : t("roomAvailabilitySetSuccessfully"),
          4
        )
      );
    },
  });

  useEffect(() => {
    if (Object.values(setRoomForm?.errors).length !== 0) {
      window.scrollTo(0, 0);
      setRoomForm.validateForm(setRoomForm?.values);
    }
  }, [language]);

  return (
    <Mui.Grid item>
      <form onSubmit={setRoomForm.handleSubmit} noValidate>
        <Mui.Grid container spacing={2}>
          <Mui.Grid container item>
            <Mui.Grid item xs={12} sx={styles.hpDiaryHeader}>
              <Mui.Typography variant="h2" sx={styles.hpDiaryText}>
                {t("roomAvailability")}
              </Mui.Typography>
            </Mui.Grid>
          </Mui.Grid>
          <Mui.Grid item xs={2.4}>
            <Common.CellmaAutoSelectField
              dummyData
              label={t("location")}
              name="location"
              ariaLabel="roomAvailabilityLocation"
              options={dummyData.LOCATIONS}
              getOptionLabel={(location: any) => location.label ?? ""}
              renderOption={(props: any, location: any) => (
                <li {...props}>{location.label}</li>
              )}
              value={setRoomForm.values.location ?? ""}
              onChange={(event: any, value: any) => {
                setRoomForm.setFieldValue("location", value);
              }}
            />
          </Mui.Grid>
          <Mui.Grid item xs={2.4}>
            <Common.CellmaAutoSelectField
              dummyData
              label={t("zone")}
              ariaLabel="roomAvailabilityZone"
              options={dummyData.ZONE}
              getOptionLabel={(zone: any) => zone.label ?? ""}
              renderOption={(props: any, zone: any) => (
                <li {...props}>{zone.label}</li>
              )}
              value={setRoomForm.values.zone ?? ""}
              onChange={(event: any, value: any) => {
                setRoomForm.setFieldValue("zone", value);
              }}
            />
          </Mui.Grid>
          <Mui.Grid item xs={2.4}>
            <Common.CellmaAutoSelectField
              dummyData
              label={t("rooms")}
              ariaLabel="roomAvailabilityRoom"
              options={dummyData.ROOM}
              getOptionLabel={(rooms: any) => rooms.label ?? ""}
              renderOption={(props: any, rooms: any) => (
                <li {...props}>{rooms.label}</li>
              )}
              value={setRoomForm.values.rooms ?? ""}
              onChange={(event: any, value: any) => {
                setRoomForm.setFieldValue("rooms", value);
              }}
            />
          </Mui.Grid>
          <Mui.Grid item xs={2.4}>
            <Common.CellmaDatePicker
              label={t("startDate")}
              name="startDate"
              ariaLabel="roomAvailabilityStartDate"
              minDate={new Date("01/01/1900")}
              maxDate={new Date("12/31/2050")}
              value={setRoomForm.values.startDate}
              onChange={(newDate: any) =>
                setRoomForm.setFieldValue("startDate", newDate)
              }
              onBlur={setRoomForm.handleBlur}
              error={setRoomForm.errors.startDate}
            />
          </Mui.Grid>
          <Mui.Grid item xs={2.4}>
            <Common.CellmaDatePicker
              label={t("endDate")}
              name="endDate"
              ariaLabel="roomAvailabilityEndDate"
              minDate={new Date("01/01/1900")}
              maxDate={new Date("12/31/2050")}
              value={setRoomForm.values.endDate}
              onChange={(newDate: any) =>
                setRoomForm.setFieldValue("endDate", newDate)
              }
              onBlur={setRoomForm.handleBlur}
              error={setRoomForm.errors.endDate}
            />
          </Mui.Grid>
          <Mui.Grid item xs={2.4}>
            <Common.CellmaTimePicker
              label={t("startTime")}
              name="startTime"
              ariaLabel="roomAvailabilityStartTime"
              value={setRoomForm.values.startTime}
              onChange={(newTime: Date | null) => {
                setRoomForm.setFieldValue("startTime", newTime);
              }}
              onKeyPress={timeValidation}
              onBlur={setRoomForm.handleBlur}
              error={setRoomForm.errors.startTime}
            />
          </Mui.Grid>
          <Mui.Grid item xs={2.4}>
            <Common.CellmaTimePicker
              label={t("endTime")}
              name="endTime"
              ariaLabel="roomAvailabilityEndTime"
              value={setRoomForm.values.endTime}
              onChange={(newTime: Date | null) => {
                setRoomForm.setFieldValue("endTime", newTime);
              }}
              onKeyPress={timeValidation}
              onBlur={setRoomForm.handleBlur}
              error={setRoomForm.errors.endTime}
            />
          </Mui.Grid>
          <Mui.Grid item xs={2.4}>
            <Common.CellmaAutoSelectField
              dummyData
              label={t("roomStatus")}
              ariaLabel="roomAvailabilityRoomStatus"
              options={dummyData.ROOM_STATUS}
              getOptionLabel={(roomStatus: any) => roomStatus.label ?? ""}
              renderOption={(props: any, roomStatus: any) => (
                <li {...props}>{roomStatus.label}</li>
              )}
              value={setRoomForm.values.roomStatus ?? ""}
              onChange={(event: any, value: any) => {
                setRoomForm.setFieldValue("roomStatus", value);
              }}
            />
          </Mui.Grid>
          <Mui.Grid item xs={4.8}>
            <Common.CellmaInputField
              label={t("reason")}
              multiline
              rows={3}
              value={setRoomForm.values.reason}
              onHandleChange={setRoomForm.handleChange}
              onBlur={setRoomForm.handleBlur}
            />
          </Mui.Grid>
          <Mui.Grid item xs={12} sx={styles.alignEnd}>
            <Common.CellmaButton label={t("save")} type="submit" />
          </Mui.Grid>
        </Mui.Grid>
      </form>
      <Mui.Grid item>
        {" "}
        {!isRoomSchedule && (
          <Mui.Grid item xs={12} sx={styles.alignEnd}>
            <Common.CellmaLink
              label={t("setRoomSchedule")}
              onClick={() => setIsRoomSchedule(true)}
            >
              {t("setRoomSchedule")}
            </Common.CellmaLink>
          </Mui.Grid>
        )}
        {isRoomSchedule && (
          <Mui.Grid item xs={12}>
            <RoomSchedule
              mode={props?.mode}
              resetMode={props?.handleResetMode}
              handleSetRoomTable={props.handleSetRoomTable}
            />
          </Mui.Grid>
        )}
      </Mui.Grid>
    </Mui.Grid>
  );
};

export default RoomAvailability;

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
