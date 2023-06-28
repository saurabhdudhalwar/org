import React, { useEffect, useState } from "react";

import { DeleteOutline } from "@mui/icons-material";
import * as Mui from "@mui/material";
import { ErrorMessage, FieldArray, FormikProvider, getIn } from "formik";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";

import * as Common from "../../../../common/CommonComponentsIndex";
import { setSnackbar } from "../../../../store/SnackbarAction";
import { timeValidation } from "../../../../utils/Validations";
import * as dummyData from "../../assets/dummyData/hPDiaryDummyData";
import translate from "../../assets/translationFiles/setHPDiaryTranslation";
import {
  setFieldArray,
  setHcdId,
  setHcdIndex,
  setHpdId,
} from "../../store/UserAction";

interface Props {
  isEditMode: any;
  resetSchedule: any;
  resetScheduleState: any;
  handleDeleteClinicSchedule: any;
  setHpDiaryForm: any;
}
const ClinicScheduleInputFields: React.FC<Props> = (props: any) => {
  const { language } = useSelector((state: any) => state.language);
  const dispatch = useDispatch();

  const handleDateBetween = (value: any, index: any, inputName: any) => {
    if (
      moment(value).isSameOrAfter(
        moment(props?.setHpDiaryForm?.values?.hpStartDate)
      ) &&
      moment(value).isSameOrBefore(
        moment(props?.setHpDiaryForm?.values?.hpEndDate)
      )
    ) {
      props?.setHpDiaryForm?.setFieldValue(
        `hpClinicDiary[${index}].${inputName}`,
        value
      );
    } else {
      dispatch(
        setSnackbar(
          true,
          "warning",
          translate("clinicWorkingDates", language),
          4
        )
      );
      if (moment(value).isValid()) {
        props?.setHpDiaryForm?.setFieldValue(
          `hpClinicDiary[${index}].${inputName}`,
          null
        );
      } else {
        props?.setHpDiaryForm?.setFieldValue(
          `hpClinicDiary[${index}].${inputName}`,
          value
        );
      }
    }
  };

  const handleTimeBetween = (value: any, index: any, inputName: any) => {
    if (
      props?.setHpDiaryForm?.values?.hpStartTime?.$d !== undefined &&
      props?.setHpDiaryForm?.values?.hpEndTime?.$d !== undefined
    ) {
      if (
        moment(value?.$d).format("HH:mm") >=
          moment(props?.setHpDiaryForm?.values?.hpStartTime?.$d).format(
            "HH:mm"
          ) &&
        moment(value?.$d).format("HH:mm") <=
          moment(props?.setHpDiaryForm?.values?.hpEndTime?.$d).format("HH:mm")
      ) {
        props?.setHpDiaryForm?.setFieldValue(
          `hpClinicDiary[${index}].${inputName}`,
          value
        );
      } else {
        dispatch(
          setSnackbar(
            true,
            "warning",
            translate("clinicWorkingTimes", language),
            4
          )
        );
        if (moment(value?.$d).isValid()) {
          props?.setHpDiaryForm?.setFieldValue(
            `hpClinicDiary[${index}].${inputName}`,
            null
          );
        } else {
          props?.setHpDiaryForm?.setFieldValue(
            `hpClinicDiary[${index}].${inputName}`,
            value
          );
        }
      }
    }

    if (
      props?.setHpDiaryForm?.values?.hpStartTime !== undefined &&
      props?.setHpDiaryForm?.values?.hpStartTime !== "" &&
      props?.setHpDiaryForm?.values?.hpEndTime !== undefined &&
      props?.setHpDiaryForm?.values?.hpEndTime !== "" &&
      props?.setHpDiaryForm?.values?.hpStartTime?.$d === undefined &&
      props?.setHpDiaryForm?.values?.hpEndTime?.$d === undefined
    ) {
      if (
        moment(value?.$d).format("HH:mm") >=
          moment(props?.setHpDiaryForm?.values?.hpStartTime).format("HH:mm") &&
        moment(value?.$d).format("HH:mm") <=
          moment(props?.setHpDiaryForm?.values?.hpEndTime).format("HH:mm")
      ) {
        props?.setHpDiaryForm?.setFieldValue(
          `hpClinicDiary[${index}].${inputName}`,
          value
        );
      } else {
        dispatch(
          setSnackbar(
            true,
            "warning",
            translate("clinicWorkingTimes", language),
            4
          )
        );
        props?.setHpDiaryForm?.setFieldValue(
          `hpClinicDiary[${index}].clinicStartTime`,
          null
        );
        props?.setHpDiaryForm?.setFieldValue(
          `hpClinicDiary[${index}].clinicEndTime`,
          null
        );
      }
    }
  };
  // Function for change HP  working days
  const handleChangeHpWorkingDays = (event: any, index: any) => {
    const { value } = event.target;

    if (
      props?.setHpDiaryForm?.values?.hpWorkingDays[
        props?.setHpDiaryForm?.values?.hpWorkingDays.length - 1
      ] === "All"
    ) {
      if (value.includes("All")) {
        props?.setHpDiaryForm?.setFieldValue(
          `hpClinicDiary[${index}].clinicScheduleWorkingDays`,
          ["All"]
        );

        props?.setHpDiaryForm?.setFieldValue(
          `hpClinicDiary[${index}].workingDaysDisable`,
          true
        );
      } else {
        props?.setHpDiaryForm?.setFieldValue(
          `hpClinicDiary[${index}].clinicScheduleWorkingDays`,
          value
        );
        props?.setHpDiaryForm?.setFieldValue(
          `hpClinicDiary[${index}].workingDaysDisable`,
          false
        );
      }
    } else if (
      props?.setHpDiaryForm?.values?.hpWorkingDays?.includes(
        value[value?.length - 1]
      )
    ) {
      props?.setHpDiaryForm?.setFieldValue(
        `hpClinicDiary[${index}].clinicScheduleWorkingDays`,
        value
      );
      props?.setHpDiaryForm?.setFieldValue(
        `hpClinicDiary[${index}].workingDaysDisable`,
        false
      );
    } else if (
      props?.setHpDiaryForm?.values?.hpWorkingDays?.includes(
        value[value?.length - 1]
      ) === false
    ) {
      props?.setHpDiaryForm?.setFieldValue(
        `hpClinicDiary[${index}].clinicScheduleWorkingDays`,
        []
      );
      props?.setHpDiaryForm?.setFieldValue(
        `hpClinicDiary[${index}].workingDaysDisable`,
        false
      );
      dispatch(
        setSnackbar(
          true,
          "warning",
          translate("clinicWorkingDays", language),
          4
        )
      );
    }
  };

  // Function for change HP non working days
  const handleChangeHpNonWorkingDays = (event: any, index: any) => {
    const { value } = event.target;

    if (value.includes("All")) {
      props?.setHpDiaryForm?.setFieldValue(
        `hpClinicDiary[${index}].clinicScheduleNonWorkingDays`,
        ["All"]
      );
    } else {
      props?.setHpDiaryForm?.setFieldValue(
        `hpClinicDiary[${index}].clinicScheduleNonWorkingDays`,
        value
      );
    }
    if (value[value?.length - 1] === "All") {
      props?.setHpDiaryForm?.setFieldValue(
        `hpClinicDiary[${index}].nonWorkingDaysDisable`,
        true
      );
    } else {
      props?.setHpDiaryForm?.setFieldValue(
        `hpClinicDiary[${index}].nonWorkingDaysDisable`,
        false
      );
    }
  };

  const handleOccurrenceType = (value: any, index: any) => {
    if (
      props?.setHpDiaryForm?.values?.hpOccurrenceType.label !== value.label ||
      value.label === "Please Select"
    ) {
      dispatch(
        setSnackbar(
          true,
          "warning",
          translate("clinicOccurrenceType", language),
          4
        )
      );
      props?.setHpDiaryForm.setFieldValue(
        `hpClinicDiary[${index}].clinicScheduleOccurrenceType`,
        []
      );
    } else {
      props?.setHpDiaryForm.setFieldValue(
        `hpClinicDiary[${index}].clinicScheduleOccurrenceType`,
        value
      );
    }
    props?.setHpDiaryForm.setFieldValue(
      `hpClinicDiary[${index}].clinicScheduleOccurrence`,
      ""
    );
  };

  const handleOccurrence = (value: any, index: any) => {
    if (props?.setHpDiaryForm?.values?.hpOccurrence.label !== value.label) {
      dispatch(
        setSnackbar(true, "warning", translate("clinicOccurrence", language), 4)
      );
      props?.setHpDiaryForm.setFieldValue(
        `hpClinicDiary[${index}].clinicScheduleOccurrence`,
        []
      );
    } else {
      props?.setHpDiaryForm.setFieldValue(
        `hpClinicDiary[${index}].clinicScheduleOccurrence`,
        value
      );
    }
  };
  const isError = (value: any) => {
    const error =
      Boolean(getIn(props?.setHpDiaryForm?.touched, value)) &&
      Boolean(getIn(props?.setHpDiaryForm?.errors, value));
    return error;
  };
  return (
    <Mui.Grid container item>
      <Mui.Grid container item>
        <Mui.Grid item xs={12} sx={styles.hpDiaryHeader}>
          <Mui.Typography variant="h2" sx={styles.mainText}>
            {translate("clinicSchedule", language)}
          </Mui.Typography>
        </Mui.Grid>
      </Mui.Grid>
      <FormikProvider value={props?.setHpDiaryForm}>
        <FieldArray
          name="hpClinicDiary"
          render={(arrayHelpers: any) => (
            <Mui.Box sx={{ width: "100% !important" }}>
              {props?.setHpDiaryForm?.values?.hpClinicDiary?.map(
                (hpClinicDiary: any, index: any) => (
                  <Mui.Grid
                    container
                    item
                    xs={12}
                    spacing={2}
                    key={hpClinicDiary}
                  >
                    <Mui.Grid
                      container
                      item
                      xs={props?.isEditMode ? 11.5 : 12}
                      spacing={2}
                      key={hpClinicDiary}
                    >
                      <Mui.Grid container item xs={3}>
                        <Mui.Grid item xs={12} sx={styles.alignCenter}>
                          <Mui.Typography variant="h2" sx={styles.headerText}>
                            {translate("startDate", language)}
                          </Mui.Typography>
                        </Mui.Grid>
                        <Mui.Grid item xs={12}>
                          <input
                            type="hidden"
                            id={`hpClinicDiary[${index}].hcdId`}
                            name={`hpClinicDiary[${index}].hcdId`}
                            value={
                              props?.setHpDiaryForm?.values?.hpClinicDiary[
                                index
                              ].hcdId ?? ""
                            }
                            onChange={props?.setHpDiaryForm?.handleChange}
                            onBlur={props?.setHpDiaryForm?.handleBlur}
                          />
                          <Common.CellmaDatePicker
                            label={translate("startDate", language)}
                            name={`hpClinicDiary[${index}].clinicStartDate`}
                            required
                            maxDate={new Date("12/31/2050")}
                            value={
                              props?.setHpDiaryForm?.values?.hpClinicDiary[
                                index
                              ].clinicStartDate
                            }
                            onChange={(newDate: Date | null) => {
                              props?.setHpDiaryForm?.setFieldTouched(
                                `hpClinicDiary[${index}].clinicStartDate`,
                                true,
                                false
                              );
                              handleDateBetween(
                                newDate,
                                index,
                                "clinicStartDate"
                              );
                            }}
                            onBlur={props?.setHpDiaryForm?.handleBlur}
                            error={
                              getIn(
                                props?.setHpDiaryForm?.errors,
                                `hpClinicDiary[${index}].clinicStartDate`
                              ) &&
                              getIn(
                                props?.setHpDiaryForm?.touched,
                                `hpClinicDiary[${index}].clinicStartDate`
                              )
                            }
                          />
                          {isError(
                            `hpClinicDiary[${index}].clinicStartDate`
                          ) && (
                            <Mui.Typography sx={styles.errorMessage}>
                              <ErrorMessage
                                name={`hpClinicDiary[${index}].clinicStartDate`}
                              />
                            </Mui.Typography>
                          )}
                        </Mui.Grid>
                      </Mui.Grid>
                      <Mui.Grid container item xs={3}>
                        <Mui.Grid item xs={12} sx={styles.alignCenter}>
                          <Mui.Typography variant="h2" sx={styles.headerText}>
                            {translate("endDate", language)}
                          </Mui.Typography>
                        </Mui.Grid>

                        <Mui.Grid item xs={12}>
                          <Common.CellmaDatePicker
                            label={translate("endDate", language)}
                            name={`hpClinicDiary[${index}].clinicEndDate`}
                            required
                            maxDate={new Date("12/31/2050")}
                            value={
                              props?.setHpDiaryForm?.values?.hpClinicDiary[
                                index
                              ].clinicEndDate
                            }
                            onChange={(newDate: Date | null) => {
                              props?.setHpDiaryForm?.setFieldTouched(
                                `hpClinicDiary[${index}].clinicEndDate`,
                                true,
                                false
                              );
                              handleDateBetween(
                                newDate,
                                index,
                                "clinicEndDate"
                              );
                            }}
                            onBlur={props?.setHpDiaryForm?.handleBlur}
                            error={
                              getIn(
                                props?.setHpDiaryForm?.errors,
                                `hpClinicDiary[${index}].clinicEndDate`
                              ) &&
                              getIn(
                                props?.setHpDiaryForm?.touched,
                                `hpClinicDiary[${index}].clinicEndDate`
                              )
                            }
                          />
                          {isError(`hpClinicDiary[${index}].clinicEndDate`) && (
                            <Mui.Typography sx={styles.errorMessage}>
                              <ErrorMessage
                                name={`hpClinicDiary[${index}].clinicEndDate`}
                              />
                            </Mui.Typography>
                          )}
                        </Mui.Grid>
                      </Mui.Grid>
                      <Mui.Grid container item xs={6} columnSpacing={2}>
                        <input
                          type="hidden"
                          id={`hpClinicDiary[${index}].workingDaysDisable`}
                          name={`hpClinicDiary[${index}].workingDaysDisable`}
                          value={
                            props?.setHpDiaryForm?.values?.hpClinicDiary[index]
                              .workingDaysDisable ?? false
                          }
                          onChange={props?.setHpDiaryForm?.handleChange}
                          onBlur={props?.setHpDiaryForm?.handleBlur}
                        />
                        <Mui.Grid item xs={12} sx={styles.alignCenter}>
                          <Mui.Typography variant="h2" sx={styles.headerText}>
                            {translate("clinicWorkingNonWorkingDays", language)}{" "}
                          </Mui.Typography>
                        </Mui.Grid>
                        <Mui.Grid item xs={6}>
                          <Common.CellmaSelectFieldWithCheckbox
                            label={translate("workingDays", language)}
                            name={`hpClinicDiary[${index}].clinicScheduleWorkingDays`}
                            value={
                              props?.setHpDiaryForm?.values?.hpClinicDiary[
                                index
                              ].clinicScheduleWorkingDays
                            }
                            disabled={
                              props?.setHpDiaryForm?.values?.hpClinicDiary[
                                index
                              ].clinicScheduleNonWorkingDays?.length > 0
                            }
                            onChange={(event: any) => {
                              handleChangeHpWorkingDays(event, index);
                            }}
                            list={dummyData.DAYS.map((option: any) => (
                              <Mui.MenuItem
                                key={option?.id}
                                value={option?.label}
                                disabled={
                                  option?.label !== "All"
                                    ? props?.setHpDiaryForm?.values
                                        ?.hpClinicDiary[index]
                                        .workingDaysDisable
                                    : false
                                }
                              >
                                <Mui.ListItemIcon>
                                  <Mui.Checkbox
                                    checked={props?.setHpDiaryForm?.values?.hpClinicDiary[
                                      index
                                    ].clinicScheduleWorkingDays?.includes(
                                      option?.label
                                    )}
                                  />
                                </Mui.ListItemIcon>
                                <Mui.ListItemText primary={option.label} />
                              </Mui.MenuItem>
                            ))}
                          />
                        </Mui.Grid>
                        <Mui.Grid item xs={6}>
                          <input
                            type="hidden"
                            id={`hpClinicDiary[${index}].nonWorkingDaysDisable`}
                            name={`hpClinicDiary[${index}].nonWorkingDaysDisable`}
                            value={
                              props?.setHpDiaryForm?.values?.hpClinicDiary[
                                index
                              ].nonWorkingDaysDisable ?? false
                            }
                            onChange={props?.setHpDiaryForm?.handleChange}
                            onBlur={props?.setHpDiaryForm?.handleBlur}
                          />
                          <Common.CellmaSelectFieldWithCheckbox
                            label={translate("nonWorkingDays", language)}
                            name={`hpClinicDiary[${index}].clinicScheduleNonWorkingDays`}
                            value={
                              props?.setHpDiaryForm?.values?.hpClinicDiary[
                                index
                              ].clinicScheduleNonWorkingDays
                            }
                            disabled={
                              props?.setHpDiaryForm?.values?.hpClinicDiary[
                                index
                              ].clinicScheduleWorkingDays?.length > 0
                            }
                            onChange={(event: any) => {
                              handleChangeHpNonWorkingDays(event, index);
                            }}
                            list={dummyData.DAYS.map((option: any) => (
                              <Mui.MenuItem
                                key={option?.id}
                                value={option?.label}
                                disabled={
                                  option?.label !== "All"
                                    ? props?.setHpDiaryForm?.values
                                        ?.hpClinicDiary[index]
                                        .nonWorkingDaysDisable
                                    : false
                                }
                              >
                                <Mui.ListItemIcon>
                                  <Mui.Checkbox
                                    checked={props?.setHpDiaryForm?.values?.hpClinicDiary[
                                      index
                                    ].clinicScheduleNonWorkingDays?.includes(
                                      option?.label as never
                                    )}
                                  />
                                </Mui.ListItemIcon>
                                <Mui.ListItemText primary={option.label} />
                              </Mui.MenuItem>
                            ))}
                          />
                        </Mui.Grid>
                      </Mui.Grid>
                      <Mui.Grid container item xs={6} columnSpacing={2}>
                        <Mui.Grid item xs={12} sx={styles.alignCenter}>
                          <Mui.Typography variant="h2" sx={styles.headerText}>
                            {translate("hPClinicHours", language)}
                          </Mui.Typography>
                        </Mui.Grid>
                        <Mui.Grid item xs={6}>
                          <Common.CellmaTimePicker
                            label={translate("startTime", language)}
                            name={`hpClinicDiary[${index}].clinicStartTime`}
                            required
                            onChange={(newTime: Date | null) => {
                              props?.setHpDiaryForm?.setFieldTouched(
                                `hpClinicDiary[${index}].clinicStartTime`,
                                true,
                                false
                              );
                              handleTimeBetween(
                                newTime,
                                index,
                                "clinicStartTime"
                              );
                            }}
                            value={
                              props?.setHpDiaryForm?.values?.hpClinicDiary[
                                index
                              ].clinicStartTime
                            }
                            onKeyPress={timeValidation}
                            onBlur={props?.setHpDiaryForm?.handleBlur}
                            error={
                              getIn(
                                props?.setHpDiaryForm?.errors,
                                `hpClinicDiary[${index}].clinicStartTime`
                              ) &&
                              getIn(
                                props?.setHpDiaryForm?.touched,
                                `hpClinicDiary[${index}].clinicStartTime`
                              )
                            }
                          />
                          {isError(
                            `hpClinicDiary[${index}].clinicStartTime`
                          ) && (
                            <Mui.Typography sx={styles.errorMessage}>
                              <ErrorMessage
                                name={`hpClinicDiary[${index}].clinicStartTime`}
                              />
                            </Mui.Typography>
                          )}
                        </Mui.Grid>
                        <Mui.Grid item xs={6}>
                          <Common.CellmaTimePicker
                            label={translate("endTime", language)}
                            name={`hpClinicDiary[${index}].clinicEndTime`}
                            required
                            onChange={(newTime: Date | null) => {
                              props?.setHpDiaryForm?.setFieldTouched(
                                `hpClinicDiary[${index}].clinicEndTime`,
                                true,
                                false
                              );
                              handleTimeBetween(
                                newTime,
                                index,
                                "clinicEndTime"
                              );
                            }}
                            value={
                              props?.setHpDiaryForm?.values?.hpClinicDiary[
                                index
                              ].clinicEndTime
                            }
                            onKeyPress={timeValidation}
                            onBlur={props?.setHpDiaryForm?.handleBlur}
                            error={
                              getIn(
                                props?.setHpDiaryForm?.errors,
                                `hpClinicDiary[${index}].clinicEndTime`
                              ) &&
                              getIn(
                                props?.setHpDiaryForm?.touched,
                                `hpClinicDiary[${index}].clinicEndTime`
                              )
                            }
                          />
                          {isError(`hpClinicDiary[${index}].clinicEndTime`) && (
                            <Mui.Typography sx={styles.errorMessage}>
                              <ErrorMessage
                                name={`hpClinicDiary[${index}].clinicEndTime`}
                              />
                            </Mui.Typography>
                          )}
                        </Mui.Grid>
                      </Mui.Grid>

                      <Mui.Grid container item xs={6} columnSpacing={2}>
                        <Mui.Grid item xs={12} sx={styles.alignCenter}>
                          <Mui.Typography variant="h2" sx={styles.headerText}>
                            {translate("occurrence", language)}
                          </Mui.Typography>
                        </Mui.Grid>
                        <Mui.Grid item xs={6}>
                          <Common.CellmaAutoSelectField
                            label={translate("occurrenceType", language)}
                            name={`hpClinicDiary[${index}].clinicScheduleOccurrenceType`}
                            options={dummyData.OCCURRENCE_TYPE}
                            value={
                              props?.setHpDiaryForm?.values?.hpClinicDiary[
                                index
                              ].clinicScheduleOccurrenceType ?? ""
                            }
                            onChange={(event: any, value: any) => {
                              handleOccurrenceType(value, index);
                            }}
                            getOptionLabel={(occurrenceType: any) =>
                              occurrenceType.label ?? ""
                            }
                            renderOption={(props: any, occurrenceType: any) => (
                              <li {...props}>{occurrenceType.label}</li>
                            )}
                          />
                        </Mui.Grid>
                        <Mui.Grid item xs={6}>
                          <Common.CellmaAutoSelectField
                            label={translate("occurrence", language)}
                            name={`hpClinicDiary[${index}].clinicScheduleOccurrence`}
                            options={
                              props?.setHpDiaryForm?.values?.hpClinicDiary[
                                index
                              ].clinicScheduleOccurrenceType?.label !== "" &&
                              props?.setHpDiaryForm?.values?.hpClinicDiary[
                                index
                              ].clinicScheduleOccurrenceType?.label !==
                                "Please Select value" &&
                              props?.setHpDiaryForm?.values?.hpClinicDiary[
                                index
                              ].clinicScheduleOccurrenceType?.label ===
                                "Week of The Month"
                                ? dummyData.WEEK_OCCURRENCE
                                : props?.setHpDiaryForm?.values?.hpClinicDiary[
                                    index
                                  ].clinicScheduleOccurrenceType?.label ===
                                  "Day of The Month"
                                ? dummyData.DAY_OCCURRENCE
                                : []
                            }
                            value={
                              props?.setHpDiaryForm?.values?.hpClinicDiary[
                                index
                              ].clinicScheduleOccurrence ?? ""
                            }
                            onChange={(event: any, value: any) => {
                              handleOccurrence(value, index);
                            }}
                            getOptionLabel={(occurrence: any) =>
                              occurrence.label ?? ""
                            }
                            renderOption={(props: any, occurrence: any) => (
                              <li {...props}>{occurrence.label}</li>
                            )}
                          />
                        </Mui.Grid>
                      </Mui.Grid>
                    </Mui.Grid>

                    {props?.isEditMode && (
                      <Mui.Grid container item xs={0.5} spacing={2}>
                        <Mui.Grid
                          container
                          item
                          xs={1}
                          sx={{ display: "flex", alignItems: "center" }}
                        >
                          <Mui.Tooltip
                            title={translate("deleteRecord", language)}
                          >
                            <Mui.IconButton
                              onClick={() => {
                                dispatch(
                                  setHcdId(
                                    arrayHelpers.form.values.hpClinicDiary[
                                      index
                                    ]?.hcdId
                                  )
                                );
                                dispatch(setFieldArray(arrayHelpers));
                                dispatch(setHcdIndex(index));
                                props?.handleDeleteClinicSchedule();
                              }}
                            >
                              <DeleteOutline sx={{ color: "warning.dark" }} />
                            </Mui.IconButton>
                          </Mui.Tooltip>
                        </Mui.Grid>
                      </Mui.Grid>
                    )}
                    {arrayHelpers.form.values.hpClinicDiary?.length > 1 && (
                      <Mui.Grid xs={12} item>
                        <Mui.Divider
                          sx={{ color: "grey.800", borderBottomWidth: 5 }}
                        />
                      </Mui.Grid>
                    )}
                  </Mui.Grid>
                )
              )}
              <Mui.Grid
                item
                xs={12}
                sx={{ display: "flex", justifyContent: "flex-end", my: "5px" }}
              >
                <Common.CellmaLink
                  label={translate("addAdditionalClinicSchedule", language)}
                  onClick={() => {
                    if (arrayHelpers.form.values.hpClinicDiary?.length < 5) {
                      arrayHelpers.push({
                        clinicStartDate: "",
                        clinicEndDate: "",
                        clinicScheduleWorkingDays: [],
                        clinicScheduleNonWorkingDays: [],
                        clinicStartTime: "",
                        clinicEndTime: "",
                        clinicScheduleOccurrenceType: "",
                        clinicScheduleOccurrence: "",
                      });
                    } else if (
                      arrayHelpers.form.values.hpClinicDiary?.length >= 5
                    ) {
                      dispatch(
                        setSnackbar(
                          true,
                          "warning",
                          translate("canNotAddMoreRecords", language),
                          4
                        )
                      );
                    }
                  }}
                >
                  {translate("addAdditionalClinicSchedule", language)}
                </Common.CellmaLink>
              </Mui.Grid>
            </Mui.Box>
          )}
        />
      </FormikProvider>
    </Mui.Grid>
  );
};

export default ClinicScheduleInputFields;

const styles = {
  alignCenter: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: { my: "15px" },
  hpDiaryHeader: {
    backgroundColor: "primary.light",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "5px",
  },
  mainText: {
    color: "primary.dark",
  },
  errorMessage: {
    fontSize: "12px",
    color: "#d32f2f",
    padding: "5px",
  },
};
