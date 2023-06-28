// Page Name : "addUserWizard"
// Page Id : "c4user3"

import { useEffect, useState } from "react";

import { DeleteOutline, Edit } from "@mui/icons-material";
import * as Mui from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { useFormik } from "formik";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useOutletContext } from "react-router-dom";
import * as yup from "yup";

import DeleteSchedulePopup from "./DeleteSchedulePopup";
import RepeatSchedulePopup from "./RepeatSchedulePopup";
import SetHpDiaryInputFields from "./SetHpDiaryInputFields";
import CellmaTable from "../../../../common/CellmaTable";
import * as Common from "../../../../common/CommonComponentsIndex";
import {
  useClinicScheduleDetails,
  useCombineScheduleDetails,
  useHealthProfessionalScheduleDetails,
} from "../../api/useDiarySearch";
import useGetHpDisplay from "../../api/useHpDiary";
import translate from "../../assets/translationFiles/setHPDiaryTranslation";
import { setSelectedDate } from "../../store/HpDiaryAction";
import { setHcdId, setHpdId } from "../../store/UserAction";
import HpDiary from "../hpDiary/HpDiary";

const TabPanel = (props: any) => {
  const { children, value, index, ...other } = props;

  return (
    <Mui.Box
      role="tabpanel"
      hidden={value !== index}
      id={`setHpDiaryTab-${index}`}
      aria-labelledby={`setHpDiaryTab-${index}`}
      {...other}
    >
      {value === index && <Mui.Box marginTop={1}>{children}</Mui.Box>}
    </Mui.Box>
  );
};

const SetHpDiary = () => {
  const [showSavedDetails, setShowSavedDetails] = useState(false);
  const [isScheduleSelected, setIsScheduleSelected] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState([] as any);

  const [isRepeatSchedulePopup, setIsRepeatSchedulePopup] = useState(false);
  const [isDeleteSchedulePopup, setIsDeleteSchedulePopup] = useState(false);
  const [selectedScheduleType, setSelectedScheduleType] = useState("hp");

  const [isShowHPDiary, setIsShowHPDiary] = useState(false);
  const [isEditDetails, setIsEditDetails] = useState(false);
  const [scheduleTabValue, setScheduleTabValue] = useState(0);
  const [espIds, setEspIds] = useState<number[]>([]);
  const [formData, setFormData] = useState<any>();
  const [hpListCount, setHpListCount] = useState<number>();
  const [clinicListCount, setClinicListCount] = useState<number>();
  const [combineListCount, setCombineListCount] = useState<number>();
  const [editHpdIds, setEditHpdId] = useState<any>();
  const [espId, setEspId] = useState<number>();
  const [hpName, setHpName] = useState<any>();
  const [params, setParams] = useState<any>();
  const [resetAll, setResetAll] = useState<any>();
  const { pageNumber } = useSelector((state: any) => state.patient);
  const { setTitle, setIsLink }: { setTitle: any; setIsLink: any } =
    useOutletContext(); // <-- access context value
  const { isUserSelected, espDetails } = useSelector(
    (state: any) => state.user
  );
  const { startDate, endDate } = useSelector((state: any) => state?.HpDiary);
  const { language } = useSelector((state: any) => state.language);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data: getHpDisplayResponse } = useGetHpDisplay();
  const healthProfessionalsList =
    getHpDisplayResponse?.clinicEstablishmentProfessionals ?? [];

  const getFormDetails = (values: any) => {
    setResetAll(values);
  };
  const getOccurrence = (params: any) => {
    let occurrence;
    switch (params) {
      case 1:
        occurrence = "Week 1";
        break;
      case 2:
        occurrence = "Week 2";
        break;
      case 3:
        occurrence = "Week 3";
        break;
      case 4:
        occurrence = "Week 4";
        break;
      case 5:
        occurrence = "Week 5";
        break;
      default:
        occurrence = "";
    }
    return occurrence;
  };

  const getHpDays = (params: any) => {
    const separator = `\n`;
    let days = "";

    if (params?.row?.hpdMonday != null && params?.row?.hpdMonday === 1) {
      days = "Monday";
    }
    if (params?.row?.hpdTuesday != null && params?.row?.hpdTuesday === 1) {
      if (days != null && days !== "") {
        days += separator;
      }
      days += "Tuesday";
    }
    if (params?.row?.hpdWednesday != null && params?.row?.hpdWednesday === 1) {
      if (days != null && days !== "") {
        days += separator;
      }
      days += "Wednesday";
    }
    if (params?.row?.hpdThursday != null && params?.row?.hpdThursday === 1) {
      if (days != null && days !== "") {
        days += separator;
      }
      days += "Thursday";
    }
    if (params?.row?.hpdFriday != null && params?.row?.hpdFriday === 1) {
      if (days != null && days !== "") {
        days += separator;
      }
      days += "Friday";
    }
    if (params?.row?.hpdSaturday != null && params?.row?.hpdSaturday === 1) {
      if (days != null && days !== "") {
        days += separator;
      }
      days += "Saturday";
    }
    if (params?.row?.hpdSunday != null && params?.row?.hpdSunday === 1) {
      if (days != null && days !== "") {
        days += separator;
      }
      days += "Sunday";
    }
    return days;
  };

  const getClinicDays = (params: any) => {
    const separator = `\n`;
    let days = "";

    if (params?.row?.hcdMonday != null && params?.row?.hcdMonday === 1) {
      days = "Monday";
    }
    if (params?.row?.hcdTuesday != null && params?.row?.hcdTuesday === 1) {
      if (days != null && days !== "") {
        days += separator;
      }
      days += "Tuesday";
    }
    if (params?.row?.hcdWednesday != null && params?.row?.hcdWednesday === 1) {
      if (days != null && days !== "") {
        days += separator;
      }
      days += "Wednesday";
    }
    if (params?.row?.hcdThursday != null && params?.row?.hcdThursday === 1) {
      if (days != null && days !== "") {
        days += separator;
      }
      days += "Thursday";
    }
    if (params?.row?.hcdFriday != null && params?.row?.hcdFriday === 1) {
      if (days != null && days !== "") {
        days += separator;
      }
      days += "Friday";
    }
    if (params?.row?.hcdSaturday != null && params?.row?.hcdSaturday === 1) {
      if (days != null && days !== "") {
        days += separator;
      }
      days += "Saturday";
    }
    if (params?.row?.hcdSunday != null && params?.row?.hcdSunday === 1) {
      if (days != null && days !== "") {
        days += separator;
      }
      days += "Sunday";
    }
    return days;
  };

  useEffect(() => {
    setTitle(translate("setHPDiary", language));
    setIsLink(true);
  }, [language]);

  // Function for change tab
  const handleChangeTab = (event: any, newValue: number) => {
    setScheduleTabValue(newValue);
    setSelectedSchedule([]);
  };

  const { refetch: hpScheduleDetailsRefetch, data: hpScheduleDetails } =
    useHealthProfessionalScheduleDetails({
      espId:
        espIds.length !== 0
          ? espIds
          : [espDetails?.establishmentProfessional?.espId],
      startDate:
        startDate !== undefined && startDate !== "" && startDate !== null
          ? moment(startDate).format("DD/MM/YYYY")
          : moment(formData?.startDate).format("DD/MM/YYYY"),
      endDate:
        endDate !== undefined && endDate !== "" && endDate !== null
          ? moment(endDate).format("DD/MM/YYYY")
          : moment(formData?.endDate).format("DD/MM/YYYY"),
      pageNumber,
    });

  const { refetch: clinicScheduleDetailsRefetch, data: clinicScheduleDetails } =
    useClinicScheduleDetails({
      espId:
        espIds.length !== 0
          ? espIds
          : [espDetails?.establishmentProfessional?.espId],
      startDate:
        startDate !== undefined && startDate !== "" && startDate !== null
          ? moment(startDate).format("DD/MM/YYYY")
          : moment(formData?.startDate).format("DD/MM/YYYY"),
      endDate:
        endDate !== undefined && endDate !== "" && endDate !== null
          ? moment(endDate).format("DD/MM/YYYY")
          : moment(formData?.endDate).format("DD/MM/YYYY"),
      pageNumber,
    });

  const {
    refetch: combineScheduleDetailsRefetch,
    data: combineScheduleDetails,
  } = useCombineScheduleDetails({
    espId:
      espIds.length !== 0
        ? espIds
        : [espDetails?.establishmentProfessional?.espId],
    startDate:
      startDate !== undefined && startDate !== "" && startDate !== null
        ? moment(startDate).format("DD/MM/YYYY")
        : moment(formData?.startDate).format("DD/MM/YYYY"),
    endDate:
      endDate !== undefined && endDate !== "" && endDate !== null
        ? moment(endDate).format("DD/MM/YYYY")
        : moment(formData?.endDate).format("DD/MM/YYYY"),
    pageNumber,
  });

  const hpDiarySchedule = hpScheduleDetails?.hpDiarySchedule ?? [];
  const hpClinicDiary = clinicScheduleDetails?.hpClinicDiary ?? [];
  const combineSchedule = combineScheduleDetails?.combineScheduleDetails ?? [];

  let combineDetailsArray: any[] = [];
  combineSchedule?.forEach((element: any) => {
    const clinic = {
      hcdId: element?.hcdId,
      hcdEspId: element?.hcdEspId,
      hcdHpdId: element?.hcdHpdId,
      hcdStartDate: element?.hcdStartDate,
      hcdEndDate: element?.hcdEndDate,
      hcdClinicStartTime: element?.hcdClinicStartTime,
      hcdClinicEndTime: element?.hcdClinicEndTime,
      hcdIndicator: element?.hcdIndicator,
      hcdMonday: element?.hcdMonday,
      hcdTuesday: element?.hcdTuesday,
      hcdWednesday: element?.hcdWednesday,
      hcdThursday: element?.hcdThursday,
      hcdFriday: element?.hcdFriday,
      hcdSaturday: element?.hcdSaturday,
      hcdSunday: element?.hcdSunday,
      hcdOccuring: element?.hcdOccuring,
      hcdWeekOfMonth: element?.hcdWeekOfMonth,
      hcdDayOfMonth: element?.hcdDayOfMonth,
      espId: element?.establishmentProfessional?.espId,
      espTitle: element?.establishmentProfessional?.espTitle,
      espFirstname: element?.establishmentProfessional?.espFirstname,
      espSurname: element?.establishmentProfessional?.espSurname,
    };
    const hp = {
      hpdId: element?.hpdId,
      hpdEspId: element?.hpdEspId,
      hpdStartDate: element?.hpdStartDate,
      hpdEndDate: element?.hpdEndDate,
      hpdWorkingStartTime: element?.hpdWorkingStartTime,
      hpdWorkingEndTime: element?.hpdWorkingEndTime,
      hpdClinicStartTime: element?.hpdClinicStartTime,
      hpdClinicEndTime: element?.hpdClinicEndTime,
      hpdIndicator: element?.hpdIndicator,
      hpdMonday: element?.hpdMonday,
      hpdTuesday: element?.hpdTuesday,
      hpdWednesday: element?.hpdWednesday,
      hpdThursday: element?.hpdThursday,
      hpdFriday: element?.hpdFriday,
      hpdSaturday: element?.hpdSaturday,
      hpdSunday: element?.hpdSunday,
      hpdOccuring: element?.hpdOccuring,
      hpdWeekOfMonth: element?.hpdWeekOfMonth,
      hpdDayOfMonth: element?.hpdDayOfMonth,
      espId: element?.establishmentProfessional?.espId,
      espTitle: element?.establishmentProfessional?.espTitle,
      espFirstname: element?.establishmentProfessional?.espFirstname,
      espSurname: element?.establishmentProfessional?.espSurname,
    };
    combineDetailsArray.push(hp);
    combineDetailsArray.push(clinic);
  });
  combineDetailsArray = combineDetailsArray?.map((item: any, index: any) => {
    item.id = index;
    return item;
  });

  useEffect(() => {
    if (Object.values(searchForm?.errors).length !== 0) {
      searchForm?.validateForm(searchForm?.values);
    }
  }, [language]);

  const searchForm = useFormik({
    initialValues: {
      hpName: [],
      startDate: "",
      endDate: "",
    },
    validationSchema: yup.object().shape({
      hpName: yup.array().when([], {
        is: () => isUserSelected === false,
        then: yup
          .array()
          .min(1, translate("hpNameRequired", language))
          .of(yup.string())
          .required(translate("hpNameRequired", language)),
        otherwise: yup.array().of(yup.string()).notRequired(),
      }),
      startDate: yup
        .date()
        .nullable()
        .min(new Date("01/01/1900"), translate("invalidDate", language))
        .max(new Date("12/31/2050"), translate("invalidDate", language))
        .typeError(translate("invalidDate", language))
        .required(translate("startDateRequired", language)),
      endDate: yup
        .date()
        .nullable()
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
        .typeError(translate("invalidDate", language))
        .required(translate("endDateRequired", language)),
    }),
    onSubmit: (values: any) => {
      if (values?.hpName?.length !== 0) {
        values?.hpName?.forEach((hpName: string) => {
          healthProfessionalsList?.forEach((element: any) => {
            if (hpName?.toUpperCase() === element?.fullName?.toUpperCase()) {
              setEspIds((prev: number[]) => [...prev, element?.espId]);
            }
          });
        });
      }
      setFormData(values);
      setShowSavedDetails(true);
    },
  });

  useEffect(() => {
    if (scheduleTabValue === 0) {
      setSelectedScheduleType("hp");
      if (formData !== undefined)
        hpScheduleDetailsRefetch().then((response) => {
          if (response?.data?.hpDiaryScheduleDetailsCount)
            setHpListCount(response?.data?.hpDiaryScheduleDetailsCount);
        });
    } else if (scheduleTabValue === 1) {
      setSelectedScheduleType("clinic");
      if (formData !== undefined)
        clinicScheduleDetailsRefetch().then((response) => {
          if (response?.data?.clinicScheduleDetailsCount)
            setClinicListCount(response?.data?.clinicScheduleDetailsCount);
        });
    } else if (scheduleTabValue === 2) {
      setSelectedScheduleType("");
      if (formData !== undefined)
        combineScheduleDetailsRefetch().then((response) => {
          if (response?.data?.combineScheduleDetailsCount)
            setCombineListCount(response?.data?.combineScheduleDetailsCount);
        });
    }
  }, [
    scheduleTabValue,
    formData,
    hpScheduleDetailsRefetch,
    clinicScheduleDetailsRefetch,
    combineScheduleDetailsRefetch,
    pageNumber,
  ]);

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "id",
      headerClassName: "tableHeader",
      flex: 1,
      minWidth: 70,
      hide: true,
    },
    {
      field: "col1",
      headerName: translate("hpName", language),
      headerClassName: "tableHeader",
      flex: 1,
      minWidth: 100,
      hide: isUserSelected,
      cellClassName: "cellBackgroundColor",
      renderCell: (params) => {
        return (
          <Common.CellmaLink
            label={translate("hpName", language)}
            onClick={() => {
              if (scheduleTabValue !== 2) {
                setEspId(params?.row?.establishmentProfessional?.espId);
                setHpName(
                  `${params?.row?.establishmentProfessional?.espTitle} ${params?.row?.establishmentProfessional?.espFirstname} ${params?.row?.establishmentProfessional?.espSurname}`
                );
              } else {
                setEspId(params?.row?.espId);
                setHpName(
                  `${params?.row?.espTitle} ${params?.row?.espFirstname} ${params?.row?.espSurname}`
                );
              }
              dispatch(setSelectedDate(new Date()));
              setIsShowHPDiary(true);
            }}
          >
            {scheduleTabValue !== 2 && (
              <Mui.Typography>
                {params?.row?.establishmentProfessional?.espTitle}{" "}
                {params?.row?.establishmentProfessional?.espFirstname}
              </Mui.Typography>
            )}
            {scheduleTabValue === 2 && (
              <Mui.Typography>
                {params?.row?.espTitle} {params?.row?.espFirstname}
              </Mui.Typography>
            )}
          </Common.CellmaLink>
        );
      },
    },
    {
      field: "col2",
      headerName: translate("schedule", language),
      headerClassName: "tableHeader",
      flex: 1,
      minWidth: 133,
      hide: scheduleTabValue !== 2,
      cellClassName: "cellBackgroundColor",
      renderCell: (params) => {
        return (
          <Mui.Typography>
            {params?.row?.hcdId ? "Clinic Scheduled" : "HP Scheduled"}
          </Mui.Typography>
        );
      },
    },

    {
      field: "col3",
      headerName: translate("startDate", language),
      headerClassName: "tableHeader",
      flex: 1,
      minWidth: 100,
      renderCell: (params: any) => {
        return (
          <Mui.Grid container>
            <Mui.Grid item xs={12}>
              {scheduleTabValue === 0 && (
                <Mui.Typography>
                  {params?.row?.hpdStartDate
                    ? moment(params?.row?.hpdStartDate).format("DD/MM/YYYY")
                    : "-"}
                </Mui.Typography>
              )}
              {scheduleTabValue === 1 && (
                <Mui.Typography>
                  {params?.row?.hcdStartDate
                    ? moment(params?.row?.hcdStartDate).format("DD/MM/YYYY")
                    : ""}
                </Mui.Typography>
              )}
              {scheduleTabValue === 2 && (
                <>
                  <Mui.Typography>
                    {params?.row?.hcdStartDate
                      ? moment(params?.row?.hcdStartDate).format("DD/MM/YYYY")
                      : ""}
                  </Mui.Typography>
                  <Mui.Typography>
                    {params?.row?.hpdStartDate
                      ? moment(params?.row?.hpdStartDate).format("DD/MM/YYYY")
                      : ""}
                  </Mui.Typography>
                </>
              )}
            </Mui.Grid>
          </Mui.Grid>
        );
      },
    },
    {
      field: "col4",
      headerName: translate("endDate", language),
      headerClassName: "tableHeader",
      flex: 1,
      minWidth: 100,
      renderCell: (params: any) => (
        <Mui.Typography>
          {scheduleTabValue === 0 && params?.row?.hpdEndDate
            ? moment(params?.row?.hpdEndDate).format("DD/MM/YYYY")
            : ""}
          {scheduleTabValue === 1 && params?.row?.hcdEndDate
            ? moment(params?.row?.hcdEndDate).format("DD/MM/YYYY")
            : ""}
          {scheduleTabValue === 2 && (
            <>
              <Mui.Typography>
                {params?.row?.hcdStartDate
                  ? moment(params?.row?.hcdEndDate).format("DD/MM/YYYY")
                  : ""}
              </Mui.Typography>
              <Mui.Typography>
                {params?.row?.hpdStartDate
                  ? moment(params?.row?.hpdEndDate).format("DD/MM/YYYY")
                  : ""}
              </Mui.Typography>
            </>
          )}
        </Mui.Typography>
      ),
    },
    {
      field: "col5",
      headerName: translate("workingDays", language),
      headerClassName: "tableHeader",
      flex: 1,
      maxWidth: 120,
      minWidth: 100,
      renderCell: (params: any) => {
        return (
          <Mui.Grid container>
            <Mui.Grid item xs={12}>
              {scheduleTabValue === 0 && (
                <Mui.Tooltip title={getHpDays(params)}>
                  <Mui.Typography sx={{ whiteSpace: "pre-wrap" }}>
                    {params?.row?.hpdIndicator === 0 ? getHpDays(params) : "-"}
                  </Mui.Typography>
                </Mui.Tooltip>
              )}
              {scheduleTabValue === 1 && (
                <Mui.Tooltip title={getClinicDays(params)}>
                  <Mui.Typography sx={{ whiteSpace: "pre-wrap" }}>
                    {params?.row?.hcdIndicator === 0
                      ? getClinicDays(params)
                      : "-"}
                  </Mui.Typography>
                </Mui.Tooltip>
              )}
              {scheduleTabValue === 2 && (
                <>
                  <Mui.Tooltip title={getClinicDays(params)}>
                    <Mui.Typography sx={{ whiteSpace: "pre-wrap" }}>
                      {params?.row?.hcdIndicator === 0
                        ? getClinicDays(params)
                        : ""}
                    </Mui.Typography>
                  </Mui.Tooltip>
                  <Mui.Tooltip title={getHpDays(params)}>
                    <Mui.Typography sx={{ whiteSpace: "pre-wrap" }}>
                      {params?.row?.hpdIndicator === 0 ? getHpDays(params) : ""}
                    </Mui.Typography>
                  </Mui.Tooltip>
                </>
              )}
            </Mui.Grid>
          </Mui.Grid>
        );
      },
    },
    {
      field: "col6",
      headerName: translate("nonWorkingDays", language),
      headerClassName: "tableHeader",
      flex: 1,
      maxWidth: 120,
      minWidth: 100,
      renderCell: (params: any) => {
        return (
          <Mui.Grid container>
            <Mui.Grid item xs={12}>
              {scheduleTabValue === 0 && (
                <Mui.Tooltip title={getHpDays(params)}>
                  <Mui.Typography sx={{ whiteSpace: "pre-wrap" }}>
                    {params?.row?.hpdIndicator === 1 ? getHpDays(params) : "-"}
                  </Mui.Typography>
                </Mui.Tooltip>
              )}
              {scheduleTabValue === 1 && (
                <Mui.Tooltip title={getClinicDays(params)}>
                  <Mui.Typography sx={{ whiteSpace: "pre-wrap" }}>
                    {params?.row?.hcdIndicator === 1
                      ? getClinicDays(params)
                      : "-"}
                  </Mui.Typography>
                </Mui.Tooltip>
              )}
              {scheduleTabValue === 2 && (
                <>
                  <Mui.Tooltip title={getClinicDays(params)}>
                    <Mui.Typography sx={{ whiteSpace: "pre-wrap" }}>
                      {params?.row?.hcdIndicator === 1
                        ? getClinicDays(params)
                        : ""}
                    </Mui.Typography>
                  </Mui.Tooltip>
                  <Mui.Tooltip title={getHpDays(params)}>
                    <Mui.Typography sx={{ whiteSpace: "pre-wrap" }}>
                      {params?.row?.hpdIndicator === 1 ? getHpDays(params) : ""}
                    </Mui.Typography>
                  </Mui.Tooltip>
                </>
              )}
            </Mui.Grid>
          </Mui.Grid>
        );
      },
    },
    {
      field: "col7",
      headerName: translate("hPWorkingHours", language),
      headerClassName: "tableHeader",
      flex: 1,
      minWidth: 130,
      hide: scheduleTabValue === 1 || scheduleTabValue === 2,
      renderCell: (params: any) => {
        return (
          <Mui.Grid container>
            <Mui.Grid item xs={12}>
              {translate("startTime", language)} -{" "}
              {params?.row?.hpdWorkingStartTime
                ? params?.row?.hpdWorkingStartTime.slice(0, -3)
                : ""}
            </Mui.Grid>
            <Mui.Grid item xs={12}>
              {translate("endTime", language)} -{" "}
              {params?.row?.hpdWorkingEndTime
                ? params?.row?.hpdWorkingEndTime.slice(0, -3)
                : ""}
            </Mui.Grid>
          </Mui.Grid>
        );
      },
    },
    {
      field: "col8",
      headerName: translate("hPClinicHours", language),
      headerClassName: "tableHeader",
      flex: 1,
      minWidth: 130,
      hide: scheduleTabValue === 0 || scheduleTabValue === 2,
      renderCell: (params: any) => {
        return (
          <Mui.Grid container>
            <Mui.Grid item xs={12}>
              {translate("startTime", language)} -{" "}
              {params?.row?.hcdClinicStartTime
                ? params?.row?.hcdClinicStartTime.slice(0, -3)
                : ""}
            </Mui.Grid>
            <Mui.Grid item xs={12}>
              {translate("endTime", language)} -{" "}
              {params?.row?.hcdClinicEndTime
                ? params?.row?.hcdClinicEndTime.slice(0, -3)
                : ""}
            </Mui.Grid>
          </Mui.Grid>
        );
      },
    },
    {
      field: "col9",
      headerName: translate("hpWorkingClinicHours", language),
      headerClassName: "tableHeader",
      flex: 1,
      minWidth: 140,
      hide: scheduleTabValue === 0 || scheduleTabValue === 1,
      renderCell: (params: any) => {
        return (
          <Mui.Grid container>
            {params?.row?.hcdClinicStartTime && (
              <Mui.Grid item xs={12}>
                {translate("startTime", language)} -{" "}
                {params?.row?.hcdClinicStartTime
                  ? params?.row?.hcdClinicStartTime.slice(0, -3)
                  : ""}
              </Mui.Grid>
            )}
            {params?.row?.hpdWorkingStartTime && (
              <Mui.Grid item xs={12}>
                {translate("startTime", language)} -{" "}
                {params?.row?.hpdWorkingStartTime
                  ? params?.row?.hpdWorkingStartTime.slice(0, -3)
                  : ""}
              </Mui.Grid>
            )}
            {params?.row?.hcdClinicEndTime && (
              <Mui.Grid item xs={12}>
                {translate("endTime", language)} -{" "}
                {params?.row?.hcdClinicEndTime
                  ? params?.row?.hcdClinicEndTime.slice(0, -3)
                  : ""}
              </Mui.Grid>
            )}
            {params?.row?.hpdWorkingEndTime && (
              <Mui.Grid item xs={12}>
                {translate("endTime", language)} -{" "}
                {params?.row?.hpdWorkingEndTime
                  ? params?.row?.hpdWorkingEndTime.slice(0, -3)
                  : ""}
              </Mui.Grid>
            )}
          </Mui.Grid>
        );
      },
    },
    {
      field: "col10",
      headerName: translate("occurrenceType", language),
      headerClassName: "tableHeader",
      flex: 1,
      minWidth: 150,
      renderCell: (params: any) => {
        return (
          <Mui.Grid container>
            <Mui.Grid item xs={12}>
              {scheduleTabValue === 0 && (
                <Mui.Typography>
                  {params?.row?.hpdOccuring
                    ? params?.row?.hpdOccuring === "month" &&
                      params?.row?.hpdWeekOfMonth > 0
                      ? "Week of the month"
                      : "Day of the month"
                    : "-"}
                </Mui.Typography>
              )}
              {scheduleTabValue === 1 && (
                <Mui.Typography>
                  {params?.row?.hcdOccuring
                    ? params?.row?.hcdOccuring === "month" &&
                      params?.row?.hcdWeekOfMonth > 0
                      ? "Week of the month"
                      : "Day of the month"
                    : ""}
                </Mui.Typography>
              )}
              {scheduleTabValue === 2 && (
                <>
                  {params?.row?.hcdOccuring && (
                    <Mui.Typography>
                      {params?.row?.hcdOccuring
                        ? params?.row?.hcdOccuring === "month" &&
                          params?.row?.hcdWeekOfMonth > 0
                          ? "Week of the month"
                          : "Day of the month"
                        : ""}
                    </Mui.Typography>
                  )}
                  {params?.row?.hpdOccuring && (
                    <Mui.Typography>
                      {params?.row?.hpdOccuring
                        ? params?.row?.hpdOccuring === "month" &&
                          params?.row?.hpdWeekOfMonth > 0
                          ? "Week of the month"
                          : "Day of the month"
                        : ""}
                    </Mui.Typography>
                  )}
                </>
              )}
            </Mui.Grid>
          </Mui.Grid>
        );
      },
    },
    {
      field: "col11",
      headerName: translate("occurrence", language),
      headerClassName: "tableHeader",
      flex: 1,
      minWidth: 100,
      maxWidth: 100,
      renderCell: (params: any) => {
        return (
          <Mui.Grid container>
            <Mui.Grid item xs={12} sx={{ textTransform: "capitalize" }}>
              {scheduleTabValue === 0 && (
                <Mui.Typography>
                  {params?.row?.hpdOccuring
                    ? params?.row?.hpdOccuring === "month"
                      ? getOccurrence(params?.row?.hpdWeekOfMonth)
                      : params?.row?.hpdDayOfMonth
                    : "-"}
                </Mui.Typography>
              )}
              {scheduleTabValue === 1 && (
                <Mui.Typography>
                  {params?.row?.hcdOccuring
                    ? params?.row?.hcdOccuring === "month"
                      ? getOccurrence(params?.row?.hcdWeekOfMonth)
                      : params?.row?.hcdDayOfMonth
                    : ""}
                </Mui.Typography>
              )}
              {scheduleTabValue === 2 && (
                <>
                  {params?.row?.hcdOccuring && (
                    <Mui.Typography>
                      {params?.row?.hcdOccuring
                        ? params?.row?.hcdOccuring === "month"
                          ? getOccurrence(params?.row?.hcdWeekOfMonth)
                          : params?.row?.hcdDayOfMonth
                        : ""}
                    </Mui.Typography>
                  )}
                  {params?.row?.hpdOccuring && (
                    <Mui.Typography>
                      {params?.row?.hpdOccuring
                        ? params?.row?.hpdOccuring === "month"
                          ? getOccurrence(params?.row?.hpdWeekOfMonth)
                          : params?.row?.hpdDayOfMonth
                        : ""}
                    </Mui.Typography>
                  )}
                </>
              )}
            </Mui.Grid>
          </Mui.Grid>
        );
      },
    },
    {
      field: "col12",
      headerName: "",
      headerClassName: "tableHeader",
      flex: 1,
      minWidth: 50,
      maxWidth: 50,
      sortable: false,
      renderCell: (params: any) => {
        return (
          <Mui.IconButton
            sx={{ display: "flex", justifyContent: "center", width: "100%" }}
            aria-label="delete"
            title={translate("delete", language)}
            onClick={(e: any) => {
              e.stopPropagation(); // don't select this row after clicking
              setIsDeleteSchedulePopup(true);
              if (scheduleTabValue === 0) {
                dispatch(setHpdId(params?.row?.hpdId));
              } else if (scheduleTabValue === 1) {
                dispatch(setHcdId(params?.row?.hcdHpdId));
              } else if (scheduleTabValue === 2) {
                if (params?.row?.hpdId !== undefined) {
                  dispatch(setHpdId(params?.row?.hpdId));
                }
                if (params?.row?.hcdHpdId !== undefined) {
                  dispatch(setHcdId(params?.row?.hcdHpdId));
                }
              }

              if (
                params?.row?.col2 === "HP Scheduled" &&
                scheduleTabValue === 2
              ) {
                setSelectedScheduleType("hp");
              } else if (
                params?.row?.col2 === "Clinic Scheduled" &&
                scheduleTabValue === 2
              ) {
                setSelectedScheduleType("clinic");
              }
            }}
          >
            <DeleteOutline sx={{ color: "warning.dark" }} />
          </Mui.IconButton>
        );
      },
    },

    {
      field: "col13",
      headerName: "",
      headerClassName: "tableHeader",
      flex: 1,
      minWidth: 40,
      maxWidth: 40,
      sortable: false,
      renderCell: (params: any) => {
        return (
          <Mui.IconButton
            sx={{ display: "flex", justifyContent: "center", width: "100%" }}
            aria-label="edit"
            title={translate("edit", language)}
            onClick={(e: any) => {
              e.stopPropagation(); // don't select this row after clicking
              setIsEditDetails(true);
              if (scheduleTabValue === 0) {
                setEditHpdId(params?.row?.hpdId);
                setParams(params);
              } else if (scheduleTabValue === 1) {
                setEditHpdId(params?.row?.hcdHpdId);
              } else if (scheduleTabValue === 2) {
                if (params?.row?.hpdId !== undefined) {
                  setEditHpdId(params?.row?.hpdId);
                  setParams(params);
                }
                if (params?.row?.hcdHpdId !== undefined) {
                  setEditHpdId(params?.row?.hcdHpdId);
                  setParams(params);
                }
              }
            }}
          >
            <Edit sx={{ color: "success.dark" }} />
          </Mui.IconButton>
        );
      },
    },
    {
      field: "col14",
      headerName: "",
      headerClassName: "tableHeader",
      flex: 1,
      minWidth: 60,
      maxWidth: 60,
      sortable: false,
      renderCell: (params) => {
        return (
          <Common.CellmaLink
            label="Checkbox"
            onClick={(e: any) => {
              e.stopPropagation(); // don't select this row after clicking
              setIsScheduleSelected(!isScheduleSelected);
              if (selectedSchedule?.includes(params?.id)) {
                selectedSchedule?.pop(params?.id);
              } else selectedSchedule?.push(params?.id);
            }}
          >
            <Mui.Checkbox />
          </Common.CellmaLink>
        );
      },
    },
  ];

  useEffect(() => {
    if (
      startDate !== undefined &&
      startDate !== "" &&
      startDate !== null &&
      endDate !== undefined &&
      endDate !== "" &&
      endDate !== null
    ) {
      hpScheduleDetailsRefetch();
      clinicScheduleDetailsRefetch();
      combineScheduleDetailsRefetch();
    }
  }, [showSavedDetails, startDate, endDate]);

  return (
    <Mui.Grid container>
      <SetHpDiaryInputFields
        handleDeleteHPSchedule={() => {
          setIsDeleteSchedulePopup(true);
          setSelectedScheduleType("hp");
        }}
        handleDeleteClinicSchedule={() => {
          setSelectedScheduleType("clinic");
          setIsDeleteSchedulePopup(true);
          hpScheduleDetailsRefetch();
          clinicScheduleDetailsRefetch();
          combineScheduleDetailsRefetch();
        }}
        isEditMode={isEditDetails}
        handleSave={() => {
          setShowSavedDetails(true);
          setIsEditDetails(false);
        }}
        searchForm={searchForm}
        healthProfessionalsList={healthProfessionalsList}
        hpdId={editHpdIds}
        setEspIds={setEspIds}
        sendFormDetails={getFormDetails}
        params={params}
      />
      {showSavedDetails && (
        <Mui.Grid container item xs={12}>
          <Mui.Box sx={styles.tabsBox}>
            <Mui.Box sx={styles.tabs}>
              <Mui.Tabs value={scheduleTabValue} onChange={handleChangeTab}>
                <Mui.Tab label={translate("hpSchedule", language)} />
                <Mui.Tab label={translate("clinicSchedule", language)} />
                <Mui.Tab label={translate("combinedSchedule", language)} />
              </Mui.Tabs>
            </Mui.Box>
            <TabPanel value={scheduleTabValue} index={0}>
              <CellmaTable
                searchField
                rows={hpDiarySchedule}
                columns={columns}
                getRowId={(row: any) => row?.hpdId}
                noRecordsMessage={translate("noRecordFound", language)}
                listCount={hpListCount}
              />
            </TabPanel>
            <TabPanel value={scheduleTabValue} index={1}>
              <CellmaTable
                searchField
                rows={hpClinicDiary}
                columns={columns}
                getRowId={(row: any) => row?.hcdId}
                noRecordsMessage={translate("noRecordFound", language)}
                listCount={clinicListCount}
              />
            </TabPanel>
            <TabPanel value={scheduleTabValue} index={2}>
              <Mui.Box sx={styles.cellColor}>
                {" "}
                <CellmaTable
                  searchField
                  rows={combineDetailsArray}
                  columns={columns}
                  getRowId={(row: any) => row?.id}
                  noRecordsMessage={translate("noRecordFound", language)}
                  listCount={combineListCount}
                />
              </Mui.Box>
            </TabPanel>
          </Mui.Box>
          <Mui.Grid item xs={12} sx={styles.alignEnd}>
            <Common.CellmaButton
              disabled={selectedSchedule?.length === 0}
              onClick={() => {
                setIsRepeatSchedulePopup(true);
              }}
              label={translate("repeatSchedule", language)}
            />
          </Mui.Grid>
          {isUserSelected && (
            <Mui.Grid item xs={12} sx={styles.alignEnd}>
              <Common.CellmaButton
                onClick={() => {
                  dispatch(setSelectedDate(new Date()));
                  navigate("/cellmaUser/user/hpDiary");
                }}
                label={translate("next", language)}
              />
            </Mui.Grid>
          )}
        </Mui.Grid>
      )}
      <Mui.Grid container item xs={12}>
        {isRepeatSchedulePopup && (
          <RepeatSchedulePopup
            handleCancel={() => {
              setIsRepeatSchedulePopup(false);
            }}
            handleSave={() => setIsRepeatSchedulePopup(false)}
            selectedSchedule={selectedSchedule}
            hpScheduleDetailsRefetch={hpScheduleDetailsRefetch}
          />
        )}
      </Mui.Grid>
      <Mui.Grid container item xs={12}>
        {isDeleteSchedulePopup && (
          <DeleteSchedulePopup
            handleCancel={() => setIsDeleteSchedulePopup(false)}
            handleDelete={() => setIsDeleteSchedulePopup(false)}
            selectedScheduleType={selectedScheduleType}
            hpScheduleDetailsRefetch={hpScheduleDetailsRefetch}
            clinicScheduleDetailsRefetch={clinicScheduleDetailsRefetch}
            combineScheduleDetailsRefetch={combineScheduleDetailsRefetch}
            resetAll={resetAll}
            removeDelete={() => setIsEditDetails(false)}
          />
        )}
      </Mui.Grid>
      {isShowHPDiary && (
        <Mui.Backdrop open>
          <Common.CellmaPopup
            title={translate("hpDiary", language)}
            fullScreen
            handleCancel={() => {
              setIsShowHPDiary(false);
            }}
          >
            <Mui.Grid container padding={2}>
              <Mui.Grid item>
                <HpDiary espId={espId} hpName={hpName} />
              </Mui.Grid>
            </Mui.Grid>
          </Common.CellmaPopup>
        </Mui.Backdrop>
      )}
    </Mui.Grid>
  );
};

const styles = {
  alignCenter: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  alignEnd: { display: "flex", justifyContent: "flex-end" },
  headerText: { my: "15px" },
  tabs: { borderBottom: 1, borderColor: "divider" },
  tabsBox: { width: "100%" },
  cellColor: {
    "& .cellBackgroundColor": {
      backgroundColor: "secondary.light",
      color: "common.black",
      fontWeight: "600",
    },
  },
};

export default SetHpDiary;
