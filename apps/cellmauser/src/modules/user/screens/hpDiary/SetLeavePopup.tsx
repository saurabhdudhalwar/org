import React, { useEffect, useState } from "react";

import * as Mui from "@mui/material";
import { useFormik } from "formik";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";

import * as Common from "../../../../common/CommonComponentsIndex";
import { setSnackbar } from "../../../../store/SnackbarAction";
import { isError } from "../../../../utils/GeneralUtils";
import { timeValidation } from "../../../../utils/Validations";
import { useSetHpLeave } from "../../api/useHpDiary";
import * as dummyData from "../../assets/dummyData/hPDiaryDummyData";
import translate from "../../assets/translationFiles/hpDiaryTranslation";

interface Props {
  handleCancel(): unknown;
  activeDiary: any;
  todayDate: any;
  hpdId: any;
  hpCalenderRefetch?: any;
  espId?: any;
}

const SetLeavePopup: React.FC<Props> = (props) => {
  const [leaveType, setLeaveType] = useState(
    props.activeDiary === "clinicDiary" ? "cancelClinic" : "annualLeave"
  );
  const [radioButtonValue, setRadioButtonValue] = useState("");

  const dispatch = useDispatch();
  const { language } = useSelector((state: any) => state.language);

  const { mutate: setHpLeave } = useSetHpLeave();

  const handleSave = () => {
    props.handleCancel();
    props?.hpCalenderRefetch();
    dispatch(
      setSnackbar(
        true,
        "success",
        `${translate("leaveSetSuccessfully", language)}`,
        2
      )
    );
  };

  const LEAVE_TYPE =
    props.activeDiary === "clinicDiary"
      ? dummyData.CLINIC_LEAVE_TYPE
      : dummyData.HP_LEAVE_TYPE;

  const setLeaveForm = useFormik({
    initialValues: {
      leaveType: "",
      leaveTypeGroup: "",
      startTime: null,
      timeNotes: "",
      endTime: null,
      startDate: "",
      endDate: "",
      weekOccurrence: "",
    },
    validationSchema: yup.object().shape({
      startTime: yup
        .date()
        .nullable()
        .when([], {
          is: () => leaveType && radioButtonValue === "time",
          then: yup
            .date()
            .nullable()
            .required(translate("startTimeRequired", language))
            .typeError(translate("invalidTime", language)),
          otherwise: yup.date().nullable().notRequired(),
        }),
      endTime: yup
        .date()
        .nullable()
        .when([], {
          is: () => leaveType && radioButtonValue === "time",
          then: yup
            .date()
            .nullable()
            .required(translate("endTimeRequired", language))
            .min(yup.ref("startTime"), translate("invalidEndTime", language))
            .typeError(translate("invalidTime", language)),
          otherwise: yup.date().nullable().notRequired(),
        }),
      startDate: yup
        .date()
        .nullable()
        .when([], {
          is: () => leaveType && radioButtonValue === "day",
          then: yup
            .date()
            .nullable()
            .required(translate("startDateRequired", language))
            .min(new Date("01/01/1900"), translate("invalidDate", language))
            .max(new Date("12/31/2050"), translate("invalidDate", language))
            .typeError(translate("invalidDate", language)),
          otherwise: yup.date().nullable().notRequired(),
        }),
      endDate: yup
        .date()
        .nullable()
        .when([], {
          is: () => leaveType && radioButtonValue === "day",
          then: yup
            .date()
            .nullable()
            .required(translate("endDateRequired", language))
            .min(new Date("01/01/1900"), translate("invalidDate", language))
            .test(
              "test",
              translate("invalidEndDate", language),
              (value: any, validationContext) => {
                const { parent } = validationContext;
                if (
                  parent.startDate &&
                  parent.endDate &&
                  parent.startDate > parent.endDate
                )
                  return false;
                return true;
              }
            )
            .max(new Date("12/31/2050"), translate("invalidDate", language))
            .typeError(translate("invalidDate", language)),
          otherwise: yup.date().nullable().notRequired(),
        }),
      weekOccurrence: yup
        .object()
        .nullable()
        .when([], {
          is: () => leaveType && radioButtonValue === "week",
          then: yup
            .object()
            .nullable()
            .required(translate("weekOccurrenceRequired", language)),
          otherwise: yup.object().nullable().notRequired(),
        }),
    }),
    onSubmit: (values: any) => {
      let obj;
      if (leaveType && radioButtonValue === "day") {
        obj = {
          hpdId: props?.hpdId,
          hpdEspId: props?.espId,
          mode: "day",
          hpdLeaveStartDate: moment(values.startDate).format("DD/MM/YYYY"),
          hpdLeaveEndDate: moment(values.endDate).format("DD/MM/YYYY"),
          hpdLeaveDate: props?.todayDate,
          hpdLeaveNotes: values.timeNotes,
        };
      } else if (leaveType && radioButtonValue === "time") {
        obj = {
          hpdId: props?.hpdId,
          hpdEspId: props?.espId,
          mode: "time",
          hpdLeaveStartTime: values.startTime.format("HH:mm"),
          hpdLeaveEndTime: values.endTime.format("HH:mm"),
          hpdLeaveDate: props?.todayDate,
        };
      } else if (leaveType && radioButtonValue === "week") {
        obj = {
          hpdId: props?.hpdId,
          hpdEspId: props?.espId,
          mode: "week",
          hpdLeaveWeekOfMonth: values.weekOccurrence.value,
          hpdLeaveDate: props?.todayDate,
        };
      }
      setHpLeave(obj, { onSuccess: handleSave });
    },
  });

  return (
    <Common.CellmaPopup
      title={translate("setLeave", language)}
      handleCancel={props.handleCancel}
    >
      <form onSubmit={setLeaveForm.handleSubmit} noValidate>
        <Mui.Grid container spacing={3} sx={styles.mainGrid}>
          <Mui.Grid item xs={10}>
            <Common.CellmaAutoSelectField
              label={translate("leaveType", language)}
              name="leaveType"
              onBlur={setLeaveForm.handleBlur}
              value={setLeaveForm.values.leaveType}
              options={LEAVE_TYPE}
              getOptionLabel={(leaveType: any) => leaveType.label ?? ""}
              renderOption={(props: any, leaveType: any) => (
                <li {...props}>{leaveType.label}</li>
              )}
              onChange={(event: any, value: any) => {
                setLeaveForm.setFieldValue("leaveType", value);
              }}
            />
          </Mui.Grid>
          {leaveType && (
            <Mui.Grid
              item
              container
              xs={10}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <Mui.FormControl>
                <Mui.RadioGroup
                  aria-labelledby="leave-type-radio-buttons-group"
                  name="leaveTypeGroup"
                  value={setLeaveForm.values.leaveTypeGroup}
                  onChange={setLeaveForm.handleChange}
                  row
                >
                  <Mui.FormControlLabel
                    value="time"
                    control={
                      <Mui.Radio
                        checked={radioButtonValue === "time"}
                        value="time"
                        onClick={() => setRadioButtonValue("time")}
                      />
                    }
                    label={translate("time", language)}
                    labelPlacement="start"
                  />

                  <Mui.FormControlLabel
                    value="day"
                    control={
                      <Mui.Radio
                        checked={radioButtonValue === "day"}
                        value="day"
                        onClick={() => setRadioButtonValue("day")}
                      />
                    }
                    label={translate("days", language)}
                    labelPlacement="start"
                  />

                  <Mui.FormControlLabel
                    value="week"
                    control={
                      <Mui.Radio
                        checked={radioButtonValue === "week"}
                        value="week"
                        onClick={() => setRadioButtonValue("week")}
                      />
                    }
                    label={translate("weeks", language)}
                    labelPlacement="start"
                  />
                </Mui.RadioGroup>
              </Mui.FormControl>
            </Mui.Grid>
          )}
          {leaveType && radioButtonValue === "time" && (
            <Mui.Grid container item xs={8} spacing={2}>
              <Mui.Grid item xs={6}>
                <Common.CellmaTimePicker
                  label={translate("startTime", language)}
                  value={setLeaveForm.values.startTime}
                  name="startTime"
                  required
                  onChange={(newTime: Date | null) => {
                    setLeaveForm.setFieldValue("startTime", newTime);
                    setLeaveForm.setFieldTouched("startTime", true, false);
                  }}
                  onKeyPress={timeValidation}
                  onBlur={setLeaveForm.handleBlur}
                  error={
                    setLeaveForm.touched.startTime &&
                    setLeaveForm.errors.startTime
                      ? setLeaveForm.errors.startTime
                      : ""
                  }
                  zIndex={1400}
                />
              </Mui.Grid>
              <Mui.Grid item xs={6}>
                <Common.CellmaTimePicker
                  name="endTime"
                  required
                  value={setLeaveForm.values.endTime}
                  onChange={(newTime: Date | null) => {
                    setLeaveForm.setFieldValue("endTime", newTime);
                    setLeaveForm.setFieldTouched("endTime", true, false);
                  }}
                  label={translate("endTime", language)}
                  onKeyPress={timeValidation}
                  onBlur={setLeaveForm.handleBlur}
                  error={
                    setLeaveForm.touched.endTime && setLeaveForm.errors.endTime
                      ? setLeaveForm.errors.endTime
                      : ""
                  }
                  zIndex={1400}
                />
              </Mui.Grid>
              <Mui.Grid item xs={12}>
                <Common.CellmaInputField
                  rows="4"
                  multiline
                  label={translate("notes", language)}
                  name="timeNotes"
                  value={setLeaveForm.values.timeNotes}
                  onHandleChange={setLeaveForm.handleChange}
                />
              </Mui.Grid>
            </Mui.Grid>
          )}
          {leaveType && radioButtonValue === "day" && (
            <Mui.Grid container item xs={8} spacing={2}>
              <Mui.Grid item xs={6}>
                <Common.CellmaDatePicker
                  label={translate("startDate", language)}
                  name="startDate"
                  required
                  value={setLeaveForm.values.startDate}
                  maxDate={new Date("12/31/2050")}
                  onChange={(newDate: Date | null) => {
                    setLeaveForm.setFieldValue("startDate", newDate);
                    setLeaveForm.setFieldTouched("startDate", true, false);
                  }}
                  onBlur={setLeaveForm.handleBlur}
                  error={
                    setLeaveForm.touched.startDate &&
                    setLeaveForm.errors.startDate
                      ? setLeaveForm.errors.startDate
                      : ""
                  }
                  zIndex={1400}
                />
              </Mui.Grid>
              <Mui.Grid item xs={6}>
                <Common.CellmaDatePicker
                  label={translate("endDate", language)}
                  name="endDate"
                  required
                  value={setLeaveForm.values.endDate}
                  maxDate={new Date("12/31/2050")}
                  onChange={(newDate: Date | null) => {
                    setLeaveForm.setFieldValue("endDate", newDate);
                    setLeaveForm.setFieldTouched("endDate", true, false);
                  }}
                  onBlur={setLeaveForm.handleBlur}
                  error={
                    setLeaveForm.touched.endDate && setLeaveForm.errors.endDate
                      ? setLeaveForm.errors.endDate
                      : ""
                  }
                  zIndex={1400}
                />
              </Mui.Grid>
            </Mui.Grid>
          )}
          {leaveType && radioButtonValue === "week" && (
            <Mui.Grid item xs={8}>
              <Common.CellmaAutoSelectField
                name="weekOccurrence"
                required
                label={translate("weekOccurrence", language)}
                value={setLeaveForm.values.weekOccurrence}
                options={dummyData.WEEK_OCCURRENCE}
                getOptionLabel={(week: any) => week.label ?? ""}
                renderOption={(props: any, week: any) => (
                  <li {...props}>{week.label}</li>
                )}
                onChange={(event: any, value: any) => {
                  setLeaveForm.setFieldValue("weekOccurrence", value);
                }}
                onBlur={setLeaveForm?.handleBlur}
                error={isError(setLeaveForm, "weekOccurrence")}
              />
            </Mui.Grid>
          )}
          <Mui.Grid
            item
            xs={12}
            sx={{ display: "flex", justifyContent: "flex-end" }}
          >
            <Common.CellmaButton
              label={translate("save", language)}
              type="submit"
              disabled={
                !(
                  leaveType &&
                  setLeaveForm.values.leaveType &&
                  radioButtonValue
                )
              }
            />
          </Mui.Grid>
        </Mui.Grid>
      </form>
    </Common.CellmaPopup>
  );
};

export default SetLeavePopup;

export const styles = {
  mainGrid: {
    p: "10px",
    display: "flex",
    justifyContent: "center",
    width: "600px",
  },
};
