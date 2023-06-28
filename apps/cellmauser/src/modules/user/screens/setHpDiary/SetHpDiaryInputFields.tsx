import { useEffect, useState } from "react";

import * as Mui from "@mui/material";
import { useFormik } from "formik";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";

import ClinicScheduleInputFields from "./ClinicScheduleInputFields";
import HPScheduleInputFields from "./HPScheduleInputFields";
import * as Common from "../../../../common/CommonComponentsIndex";
import { setSnackbar } from "../../../../store/SnackbarAction";
import { isError } from "../../../../utils/GeneralUtils";
import { useAddHp, useUpdateHpDetails } from "../../api/useAddHp";
import translate from "../../assets/translationFiles/setHPDiaryTranslation";
import { setEndDate, setStartDate } from "../../store/HpDiaryAction";

interface Props {
  handleSave: any;
  isEditMode: any;
  handleDeleteHPSchedule: any;
  handleDeleteClinicSchedule: any;
  searchForm: any;
  healthProfessionalsList: any;
  setEspIds?: any;
  hpdId?: any;
  sendFormDetails?: any;
  params?: any;
}

const SetHpDiaryInputFields: React.FC<Props> = (props) => {
  const [resetSchedule, setResetSchedule] = useState(false);
  const { language } = useSelector((state: any) => state.language);
  const { isUserSelected, espDetails } = useSelector(
    (state: any) => state.user
  );
  const { mutate: addHpDetails, data: addHpDetailsResponse } = useAddHp();
  const { mutate: updateHpDetails, data: updateHpDetailsResponse } =
    useUpdateHpDetails();

  const hpClinicDiaryFinalobject: any[] = [];
  const [showClinicDiary, setShowClinicDiary] = useState(false);

  const dispatch = useDispatch();
  const setHpDiaryForm = useFormik({
    enableReinitialize: true,
    initialValues: {
      hpdId: "",
      hpStartDate: "",
      hpEndDate: "",
      hpWorkingDays: [],
      hpNonWorkingDays: [],
      hpStartTime: "",
      hpEndTime: "",
      hpOccurrenceType: "",
      hpOccurrence: "",
      hpClinicDiary: [
        {
          hcdId: [],
          workingDaysDisable: false,
          nonWorkingDaysDisable: false,
          clinicStartDate: "",
          clinicEndDate: "",
          clinicScheduleWorkingDays: [],
          clinicScheduleNonWorkingDays: [],
          clinicStartTime: "",
          clinicEndTime: "",
          clinicScheduleOccurrenceType: "",
          clinicScheduleOccurrence: "",
        },
      ],
    },
    validationSchema: yup.object().shape({
      hpStartDate: yup
        .date()
        .nullable()
        .min(new Date("01/01/1900"), translate("invalidDate", language))
        .max(new Date("12/31/2050"), translate("invalidDate", language))
        .typeError(translate("invalidDate", language))
        .required(translate("startDateRequired", language)),
      hpEndDate: yup
        .date()
        .nullable()
        .required(translate("endDateRequired", language))
        .min(new Date("01/01/1900"), translate("invalidDate", language))
        .test(
          "validate end date",
          translate("invalidEndDate", language),
          (value, validationContext) => {
            const { parent } = validationContext;
            if (
              parent.hpStartDate &&
              parent.hpEndDate &&
              parent.hpStartDate > parent.hpEndDate
            )
              return false;

            return true;
          }
        )
        .max(new Date("12/31/2050"), translate("invalidDate", language))
        .typeError(translate("invalidDate", language)),

      hpStartTime: yup
        .date()
        .nullable()
        .typeError(translate("invalidTime", language))
        .required(translate("startTimeRequired", language)),
      hpEndTime: yup
        .date()
        .nullable()
        .typeError(translate("invalidTime", language))
        .required(translate("endTimeRequired", language))
        .test(
          "validate end time",
          translate("invalidEndTime", language),
          (values: any, validationContext: any) => {
            const { parent } = validationContext;
            if (
              parent.hpStartTime &&
              parent.hpEndTime &&
              parent.hpStartTime < parent.hpEndTime
            ) {
              return true;
            }
            return false;
          }
        ),
      hpClinicDiary: yup.array().of(
        yup.object().shape({
          clinicStartDate: yup
            .date()
            .nullable()
            .min(new Date("01/01/1900"), translate("invalidDate", language))
            .max(new Date("12/31/2050"), translate("invalidDate", language))
            .typeError(translate("invalidDate", language))
            .required(translate("startDateRequired", language)),
          clinicEndDate: yup
            .date()
            .nullable()
            .min(new Date("01/01/1900"), translate("invalidDate", language))
            .test(
              "validate end date",
              translate("invalidEndDate", language),
              (value, validationContext) => {
                const { parent } = validationContext;
                if (
                  parent.clinicStartDate &&
                  parent.clinicEndDate &&
                  parent.clinicStartDate > parent.clinicEndDate
                )
                  return false;

                return true;
              }
            )
            .max(new Date("12/31/2050"), translate("invalidDate", language))
            .typeError(translate("invalidDate", language))
            .required(translate("endDateRequired", language)),
          clinicStartTime: yup
            .date()
            .nullable()
            .typeError(translate("invalidTime", language))
            .required(translate("startTimeRequired", language)),
          clinicEndTime: yup
            .date()
            .nullable()
            .typeError(translate("invalidTime", language))
            .test(
              "validate end time",
              translate("invalidEndTime", language),
              (values: any, validationContext: any) => {
                const { parent } = validationContext;
                if (
                  parent.clinicStartTime &&
                  parent.clinicEndTime &&
                  parent.clinicStartTime < parent.clinicEndTime
                ) {
                  return true;
                }
                return false;
              }
            )
            .required(translate("endTimeRequired", language)),
        })
      ),
    }),
    onSubmit: (values: any) => {
      const paramList = {
        hpDiaryJson: {
          hpdEspId: espDetails?.establishmentProfessional?.espId
            ? espDetails?.establishmentProfessional?.espId
            : props?.params?.row?.hpdEspId,
          hpdId: values?.hpdId !== "" ? values?.hpdId : 0,
          hpdStartDate:
            values?.hpStartDate !== ""
              ? moment(values?.hpStartDate).format("DD/MM/YYYY")
              : null,
          hpdEndDate:
            values?.hpEndDate !== ""
              ? moment(values?.hpEndDate).format("DD/MM/YYYY")
              : null,
          hpdWorkingDays:
            values?.hpWorkingDays.length !== 0 ? values?.hpWorkingDays : null,
          hpdNonWorkingDays:
            values?.hpNonWorkingDays.length !== 0
              ? values?.hpNonWorkingDays
              : null,
          hpdWorkingStartTime:
            values?.hpStartTime !== "" && values?.hpStartTime?.$d !== undefined
              ? moment(values?.hpStartTime?.$d).format("HH:mm")
              : values?.hpStartTime !== undefined
              ? moment(values?.hpStartTime).format("HH:mm")
              : null,
          hpdWorkingEndTime:
            values?.hpEndTime !== "" && values?.hpEndTime?.$d !== undefined
              ? moment(values?.hpEndTime?.$d).format("HH:mm")
              : values?.hpEndTime !== undefined
              ? moment(values?.hpEndTime).format("HH:mm")
              : null,

          occurenceType:
            values?.hpOccurrenceType?.label === "Week of The Month"
              ? "weekOfMonth"
              : values?.hpOccurrenceType?.label !== "Please Select" &&
                values?.hpOccurrenceType !== ""
              ? "dayOfMonth"
              : null,
          monthWeekOccurence:
            values?.hpOccurrenceType?.label === "Week of The Month"
              ? values?.hpOccurrence?.value
              : null,
          monthlyOccurence:
            values?.hpOccurrenceType?.label !== "Week of The Month"
              ? values?.hpOccurrence?.value
              : null,
        },
        hpClinicDiaryJson: generateHpClinicDiaryObject(values?.hpClinicDiary),
      };

      if (values?.hpdId !== "") {
        updateHpDetails(paramList);
      } else {
        addHpDetails(paramList);
      }
    },
  });

  const generateHpClinicDiaryObject = (value: any) => {
    value.forEach((element: any) => {
      const newData = {
        hcdId:
          element?.hcdId !== "" &&
          element?.hcdId?.length !== 0 &&
          element?.hcdId !== undefined
            ? element?.hcdId
            : 0,
        hcdEspId: espDetails?.establishmentProfessional?.espId
          ? espDetails?.establishmentProfessional?.espId
          : props?.params?.row?.hpdEspId,
        hcdStartDate:
          element?.clinicStartDate !== ""
            ? moment(element?.clinicStartDate).format("DD/MM/YYYY")
            : null,
        hcdEndDate:
          element?.clinicEndDate !== ""
            ? moment(element?.clinicEndDate).format("DD/MM/YYYY")
            : null,
        hcdWorkingDays:
          element?.clinicScheduleWorkingDays.length !== 0
            ? element?.clinicScheduleWorkingDays
            : null,
        hcdNonWorkingDays:
          element?.clinicScheduleNonWorkingDays.length !== 0
            ? element?.clinicScheduleNonWorkingDays
            : null,
        hcdClinicStartTime:
          element?.clinicStartTime !== "" &&
          element?.clinicStartTime?.$d !== undefined
            ? moment(element?.clinicStartTime?.$d).format("HH:mm")
            : element?.clinicStartTime !== undefined
            ? moment(element?.clinicStartTime).format("HH:mm")
            : null,
        hcdClinicEndTime:
          element?.clinicEndTime !== "" &&
          element?.clinicEndTime?.$d !== undefined
            ? moment(element?.clinicEndTime?.$d).format("HH:mm")
            : element?.clinicEndTime !== undefined
            ? moment(element?.clinicEndTime).format("HH:mm")
            : null,
        occurenceType:
          element?.clinicScheduleOccurrenceType?.label === "Week of The Month"
            ? "weekOfMonth"
            : element?.clinicScheduleOccurrenceType?.label !==
                "Please Select" && element?.clinicScheduleOccurrenceType !== ""
            ? "dayOfMonth"
            : null,
        monthWeekOccurence:
          element?.clinicScheduleOccurrenceType?.label === "Week of The Month"
            ? element?.clinicScheduleOccurrence?.value
            : null,
        monthlyOccurence:
          element?.clinicScheduleOccurrenceType?.label !== "Week of The Month"
            ? element?.clinicScheduleOccurrence?.value
            : null,
      };

      hpClinicDiaryFinalobject.push(newData);
    });
    return hpClinicDiaryFinalobject;
  };

  useEffect(() => {
    if (
      setHpDiaryForm?.values?.hpStartDate !== "" &&
      setHpDiaryForm?.values?.hpStartDate !== null &&
      setHpDiaryForm?.values?.hpEndDate !== "" &&
      setHpDiaryForm?.values?.hpEndDate !== null &&
      setHpDiaryForm?.values?.hpStartTime !== "" &&
      setHpDiaryForm?.values?.hpStartTime !== null &&
      setHpDiaryForm?.values?.hpEndTime !== "" &&
      setHpDiaryForm?.values?.hpEndTime !== null &&
      (setHpDiaryForm?.values?.hpWorkingDays.length !== 0 ||
        setHpDiaryForm?.values?.hpNonWorkingDays.length !== 0)
    ) {
      setShowClinicDiary(true);
    } else {
      if (
        setHpDiaryForm?.values?.hpStartDate !== "" &&
        setHpDiaryForm?.values?.hpStartDate !== null &&
        setHpDiaryForm?.values?.hpEndDate !== "" &&
        setHpDiaryForm?.values?.hpEndDate !== null &&
        setHpDiaryForm?.values?.hpStartTime !== "" &&
        setHpDiaryForm?.values?.hpStartTime !== null &&
        setHpDiaryForm?.values?.hpEndTime !== "" &&
        setHpDiaryForm?.values?.hpEndTime !== null &&
        setHpDiaryForm?.values?.hpOccurrence !== "" &&
        setHpDiaryForm?.values?.hpOccurrenceType !== "" &&
        (setHpDiaryForm?.values?.hpWorkingDays.length === 0 ||
          setHpDiaryForm?.values?.hpNonWorkingDays.length === 0)
      ) {
        dispatch(
          setSnackbar(
            true,
            "warning",
            translate("workingNonworkingMessage", language),
            4
          )
        );
      }
      setShowClinicDiary(false);
    }
    props?.sendFormDetails(setHpDiaryForm);
    // eslint-disable-next-line
  }, [setHpDiaryForm?.values]);

  useEffect(() => {
    if (updateHpDetailsResponse?.status === 200) {
      if (
        updateHpDetailsResponse?.data?.validationCode ===
        "hp.diary.update.success"
      ) {
        props?.handleSave();

        dispatch(
          setSnackbar(
            true,
            "success",
            translate("recordUpdatedSuccessfully", language),
            4
          )
        );
        dispatch(setStartDate(setHpDiaryForm?.values?.hpStartDate));
        dispatch(setEndDate(setHpDiaryForm?.values?.hpEndDate));
        setHpDiaryForm.resetForm();
        setResetSchedule(true);
        setHpDiaryForm?.setFieldValue("hpStartDate", null);
        setHpDiaryForm?.setFieldValue("hpEndDate", null);
        setHpDiaryForm?.setFieldValue("hpStartTime", null);
        setHpDiaryForm?.setFieldValue("hpEndTime", null);
      }
    }
  }, [updateHpDetailsResponse]);

  useEffect(() => {
    if (addHpDetailsResponse?.status === 200) {
      if (
        addHpDetailsResponse?.data?.validationCode === "hp.diary.add.success"
      ) {
        props?.handleSave();
        dispatch(setStartDate(setHpDiaryForm?.values?.hpStartDate));
        dispatch(setEndDate(setHpDiaryForm?.values?.hpEndDate));
        dispatch(
          setSnackbar(
            true,
            "success",

            translate("scheduleSetSuccessfully", language),
            4
          )
        );

        setHpDiaryForm.resetForm();
        setResetSchedule(true);
        setHpDiaryForm?.setFieldValue("hpStartDate", null);
        setHpDiaryForm?.setFieldValue("hpEndDate", null);
        setHpDiaryForm?.setFieldValue("hpStartTime", null);
        setHpDiaryForm?.setFieldValue("hpEndTime", null);
      }
    }
  }, [addHpDetailsResponse]);
  return (
    <Mui.Grid container>
      <Mui.Grid item xs={12}>
        <form onSubmit={props?.searchForm?.handleSubmit} noValidate>
          <Mui.Grid
            container
            spacing={2}
            sx={{ display: "flex", alignItems: "baseline" }}
            marginBottom={2}
          >
            {isUserSelected && (
              <Mui.Grid item xs={12} sx={{ m: "10px" }}>
                <Mui.Typography variant="h2">
                  {espDetails?.user?.useTitle}&nbsp;
                  {espDetails?.user?.useFirstname}&nbsp;
                  {espDetails?.user?.useSurname}
                </Mui.Typography>
              </Mui.Grid>
            )}
            {!isUserSelected && (
              <Mui.Grid item xs={12} sm={5} md={2} sx={{ width: "350px" }}>
                <Common.CellmaSelectFieldWithCheckbox
                  label={translate("hpName", language)}
                  name="hpName"
                  required
                  value={props?.searchForm?.values?.hpName}
                  onBlur={props?.searchForm?.handleBlur}
                  onChange={(event) => {
                    const { value } = event.target;
                    props?.searchForm?.setFieldValue("hpName", value);
                    props?.setEspIds([]);
                  }}
                  list={props?.healthProfessionalsList?.map((option: any) => (
                    <Mui.MenuItem key={option?.espId} value={option?.fullName}>
                      <Mui.ListItemIcon>
                        <Mui.Checkbox
                          checked={props?.searchForm?.values?.hpName?.includes(
                            option?.fullName as never
                          )}
                        />
                      </Mui.ListItemIcon>
                      <Mui.ListItemText primary={option.fullName} />
                    </Mui.MenuItem>
                  ))}
                  error={isError(props?.searchForm, "hpName")}
                />
              </Mui.Grid>
            )}
            <Mui.Grid item xs={12} sm={5} md={2}>
              <Common.CellmaDatePicker
                label={translate("startDate", language)}
                name="startDate"
                required
                maxDate={new Date("12/31/2050")}
                value={props?.searchForm?.values?.startDate}
                onChange={(newDate: Date | null) => {
                  props?.searchForm?.setFieldValue("startDate", newDate);
                }}
                onBlur={props?.searchForm?.handleBlur}
                error={isError(props?.searchForm, "startDate")}
              />
            </Mui.Grid>
            <Mui.Grid item xs={12} sm={5} md={2}>
              <Common.CellmaDatePicker
                label={translate("endDate", language)}
                name="endDate"
                required
                maxDate={new Date("12/31/2050")}
                value={props?.searchForm?.values?.endDate}
                onChange={(newDate: Date | null) => {
                  props?.searchForm?.setFieldValue("endDate", newDate);
                }}
                onBlur={props?.searchForm?.handleBlur}
                error={isError(props?.searchForm, "endDate")}
              />
            </Mui.Grid>
            <Mui.Grid item xs={12} sm={2} md={2}>
              <Common.CellmaButton
                label={translate("search", language)}
                type="submit"
              />
            </Mui.Grid>
          </Mui.Grid>
        </form>
      </Mui.Grid>
      <Mui.Grid item xs={12}>
        <form onSubmit={setHpDiaryForm?.handleSubmit} noValidate>
          {(isUserSelected || props?.isEditMode) && (
            <Mui.Grid container spacing={2} xs={12}>
              <Mui.Grid item xs={12}>
                <HPScheduleInputFields
                  isEditMode={props?.isEditMode}
                  handleDeleteHPSchedule={props?.handleDeleteHPSchedule}
                  setHpDiaryForm={setHpDiaryForm}
                  resetFormik={resetSchedule}
                  hpdId={props?.hpdId}
                />
              </Mui.Grid>

              {showClinicDiary && (
                <Mui.Grid item xs={12}>
                  <ClinicScheduleInputFields
                    isEditMode={props?.isEditMode}
                    resetSchedule={resetSchedule}
                    resetScheduleState={() => setResetSchedule(false)}
                    handleDeleteClinicSchedule={
                      props?.handleDeleteClinicSchedule
                    }
                    setHpDiaryForm={setHpDiaryForm}
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
                  onClick={() => {
                    if (
                      setHpDiaryForm?.values?.hpWorkingDays.length === 0 &&
                      setHpDiaryForm?.values?.hpNonWorkingDays
                    ) {
                      dispatch(
                        setSnackbar(
                          true,
                          "warning",
                          translate("workingNonworkingMessage", language),
                          4
                        )
                      );
                    }
                    if (setHpDiaryForm?.errors) {
                      window.scrollTo(0, 0);
                    }
                  }}
                />
              </Mui.Grid>
            </Mui.Grid>
          )}
        </form>
      </Mui.Grid>
    </Mui.Grid>
  );
};

export default SetHpDiaryInputFields;

const styles = {
  alignCenter: {
    display: "flex",
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
};
