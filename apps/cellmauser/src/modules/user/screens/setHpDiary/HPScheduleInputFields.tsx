import React, { useEffect, useState } from "react";

import { DeleteOutline } from "@mui/icons-material";
import * as Mui from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import * as Common from "../../../../common/CommonComponentsIndex";
import {
  getDateFromHours,
  getDatefromSqlDate,
} from "../../../../utils/GeneralUtils";
import { timeValidation } from "../../../../utils/Validations";
import { useGetHpDetails } from "../../api/useHpDiary";
import * as dummyData from "../../assets/dummyData/hPDiaryDummyData";
import translate from "../../assets/translationFiles/setHPDiaryTranslation";
import { setHpdId } from "../../store/UserAction";

interface Props {
  isEditMode: any;
  handleDeleteHPSchedule: any;
  setHpDiaryForm: any;
  resetFormik: any;
  hpdId?: any;
}

const HPScheduleInputFields: React.FC<Props> = (props: any) => {
  const [selectedHpWorkingDays, setSelectedHpWorkingDays] = useState([]) as any;
  const [selectedHpNonWorkingDays, setSelectedHpNonWorkingDays] = useState(
    []
  ) as any;
  const { language } = useSelector((state: any) => state.language);
  const [isAllWorkingSelected, setIsAllWorkingSelected] = useState(false);
  const [isAllNonWorkingSelected, setIsAllNonWorkingSelected] = useState(false);

  const handleReset = () => {
    props?.setHpDiaryForm?.setFieldValue(
      "hpClinicDiary",
      [
        {
          hcdId: [],
          workingDaysDisable: false,
          nonWorkingDaysDisable: false,
          clinicStartDate: null,
          clinicEndDate: null,
          clinicScheduleWorkingDays: [],
          clinicScheduleNonWorkingDays: [],
          clinicStartTime: null,
          clinicEndTime: null,
          clinicScheduleOccurrenceType: "",
          clinicScheduleOccurrence: "",
        },
      ],
      false
    );
    props?.setHpDiaryForm?.setFieldTouched("hpClinicDiary", false, false);
  };

  // Function for change HP working days
  const handleChangeHpWorkingDays = (event: any) => {
    const { value } = event.target;

    setSelectedHpWorkingDays(value);
    if (value.includes("All")) {
      props?.setHpDiaryForm?.setFieldValue("hpWorkingDays", ["All"]);
    } else {
      props?.setHpDiaryForm?.setFieldValue("hpWorkingDays", value);
    }

    if (value[value.length - 1] === "All") {
      setIsAllWorkingSelected(true);
    } else {
      setIsAllWorkingSelected(false);
    }
  };

  // Function for change HP non working days
  const handleChangeHpNonWorkingDays = (event: any) => {
    const { value } = event.target;
    if (value.includes("All")) {
      props?.setHpDiaryForm?.setFieldValue("hpNonWorkingDays", ["All"]);
    } else {
      props?.setHpDiaryForm?.setFieldValue("hpNonWorkingDays", value);
    }
    if (value[value.length - 1] === "All") {
      setIsAllNonWorkingSelected(true);
    } else {
      setIsAllNonWorkingSelected(false);
    }
    setSelectedHpNonWorkingDays(value);
  };

  const { data: getHpDetailsResponse, refetch: getHpDetails } = useGetHpDetails(
    props?.hpdId,
    undefined
  );

  const hpClinicArrayList =
    getHpDetailsResponse?.data?.entity?.hpClinicDiary ?? [];
  const hpDiarySchedule = getHpDetailsResponse?.data?.entity?.hpDiary ?? "";
  const dispatch = useDispatch();
  useEffect(() => {
    if (props?.resetFormik === true) {
      setIsAllNonWorkingSelected(false);
      setIsAllWorkingSelected(false);
      setSelectedHpWorkingDays([]);
      setSelectedHpNonWorkingDays([]);
    }
  }, [props?.resetFormik]);

  useEffect(() => {
    if (props?.hpdId !== undefined) {
      getHpDetails();
    }
  }, [getHpDetails, props?.hpdId]);
  const handleWorkingDays = (value: any) => {
    if (
      value?.hpdMonday === 1 &&
      value?.hpdTuesday === 1 &&
      value?.hpdWednesday === 1 &&
      value?.hpdThursday === 1 &&
      value?.hpdFriday === 1 &&
      value?.hpdSaturday === 1 &&
      value?.hpdSunday === 1
    ) {
      if (value?.hpdIndicator === 0) {
        props?.setHpDiaryForm?.setFieldValue("hpWorkingDays", ["All"]);
        setSelectedHpWorkingDays(["All"]);
        props?.setHpDiaryForm?.setFieldValue("hpNonWorkingDays", []);
        setSelectedHpNonWorkingDays([]);
      } else {
        props?.setHpDiaryForm?.setFieldValue("hpNonWorkingDays", ["All"]);
        setSelectedHpNonWorkingDays(["All"]);
        props?.setHpDiaryForm?.setFieldValue("hpWorkingDays", []);
        setSelectedHpNonWorkingDays([]);
      }
    }

    if (
      value?.hpdMonday === 1 &&
      value?.hpdTuesday === 1 &&
      value?.hpdWednesday === 1 &&
      value?.hpdThursday === 1 &&
      value?.hpdFriday === 1 &&
      value?.hpdSaturday !== 1 &&
      value?.hpdSunday !== 1
    ) {
      if (value?.hpdIndicator === 0) {
        props?.setHpDiaryForm?.setFieldValue("hpWorkingDays", [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
        ]);
        setSelectedHpWorkingDays([
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
        ]);
        props?.setHpDiaryForm?.setFieldValue("hpNonWorkingDays", []);
        setSelectedHpNonWorkingDays([]);
      } else {
        props?.setHpDiaryForm?.setFieldValue("hpNonWorkingDays", [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
        ]);
        setSelectedHpNonWorkingDays([
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
        ]);
        props?.setHpDiaryForm?.setFieldValue("hpWorkingDays", []);
        setSelectedHpNonWorkingDays([]);
      }
    }

    if (
      value?.hpdMonday === 1 &&
      value?.hpdTuesday !== 1 &&
      value?.hpdWednesday !== 1 &&
      value?.hpdThursday !== 1 &&
      value?.hpdFriday !== 1 &&
      value?.hpdSaturday !== 1 &&
      value?.hpdSunday !== 1
    ) {
      if (value?.hpdIndicator === 0) {
        props?.setHpDiaryForm?.setFieldValue("hpWorkingDays", ["Monday"]);
        setSelectedHpWorkingDays(["Monday"]);
        props?.setHpDiaryForm?.setFieldValue("hpNonWorkingDays", []);
        setSelectedHpNonWorkingDays([]);
      } else {
        props?.setHpDiaryForm?.setFieldValue("hpNonWorkingDays", ["Monday"]);
        setSelectedHpNonWorkingDays(["Monday"]);
        props?.setHpDiaryForm?.setFieldValue("hpWorkingDays", []);
        setSelectedHpNonWorkingDays([]);
      }
    }

    if (
      value?.hpdMonday !== 1 &&
      value?.hpdTuesday === 1 &&
      value?.hpdWednesday !== 1 &&
      value?.hpdThursday !== 1 &&
      value?.hpdFriday !== 1 &&
      value?.hpdSaturday !== 1 &&
      value?.hpdSunday !== 1
    ) {
      if (value?.hpdIndicator === 0) {
        props?.setHpDiaryForm?.setFieldValue("hpWorkingDays", ["Tuesday"]);
        setSelectedHpWorkingDays(["Tuesday"]);
        props?.setHpDiaryForm?.setFieldValue("hpNonWorkingDays", []);
        setSelectedHpNonWorkingDays([]);
      } else {
        props?.setHpDiaryForm?.setFieldValue("hpNonWorkingDays", ["Tuesday"]);
        setSelectedHpNonWorkingDays(["Tuesday"]);
        props?.setHpDiaryForm?.setFieldValue("hpWorkingDays", []);
        setSelectedHpNonWorkingDays([]);
      }
    }

    if (
      value?.hpdMonday !== 1 &&
      value?.hpdTuesday !== 1 &&
      value?.hpdWednesday === 1 &&
      value?.hpdThursday !== 1 &&
      value?.hpdFriday !== 1 &&
      value?.hpdSaturday !== 1 &&
      value?.hpdSunday !== 1
    ) {
      if (value?.hpdIndicator === 0) {
        props?.setHpDiaryForm?.setFieldValue("hpWorkingDays", ["Wednesday"]);
        setSelectedHpWorkingDays(["Wednesday"]);
        props?.setHpDiaryForm?.setFieldValue("hpNonWorkingDays", []);
        setSelectedHpNonWorkingDays([]);
      } else {
        props?.setHpDiaryForm?.setFieldValue("hpNonWorkingDays", ["Wednesday"]);
        setSelectedHpNonWorkingDays(["Wednesday"]);
        props?.setHpDiaryForm?.setFieldValue("hpWorkingDays", []);
        setSelectedHpNonWorkingDays([]);
      }
    }
    if (
      value?.hpdMonday !== 1 &&
      value?.hpdTuesday !== 1 &&
      value?.hpdWednesday !== 1 &&
      value?.hpdThursday === 1 &&
      value?.hpdFriday !== 1 &&
      value?.hpdSaturday !== 1 &&
      value?.hpdSunday !== 1
    ) {
      if (value?.hpdIndicator === 0) {
        props?.setHpDiaryForm?.setFieldValue("hpWorkingDays", ["Thursday"]);
        setSelectedHpWorkingDays(["Thursday"]);
        props?.setHpDiaryForm?.setFieldValue("hpNonWorkingDays", []);
        setSelectedHpNonWorkingDays([]);
      } else {
        props?.setHpDiaryForm?.setFieldValue("hpNonWorkingDays", ["Thursday"]);
        setSelectedHpNonWorkingDays(["Thursday"]);
        props?.setHpDiaryForm?.setFieldValue("hpWorkingDays", []);
        setSelectedHpNonWorkingDays([]);
      }
    }
    if (
      value?.hpdMonday !== 1 &&
      value?.hpdTuesday !== 1 &&
      value?.hpdWednesday !== 1 &&
      value?.hpdThursday !== 1 &&
      value?.hpdFriday === 1 &&
      value?.hpdSaturday !== 1 &&
      value?.hpdSunday !== 1
    ) {
      if (value?.hpdIndicator === 0) {
        props?.setHpDiaryForm?.setFieldValue("hpWorkingDays", ["Friday"]);
        setSelectedHpWorkingDays(["Friday"]);
        props?.setHpDiaryForm?.setFieldValue("hpNonWorkingDays", []);
        setSelectedHpNonWorkingDays([]);
      } else {
        props?.setHpDiaryForm?.setFieldValue("hpNonWorkingDays", ["Friday"]);
        setSelectedHpNonWorkingDays(["Friday"]);
        props?.setHpDiaryForm?.setFieldValue("hpWorkingDays", []);
        setSelectedHpNonWorkingDays([]);
      }
    }

    if (
      value?.hpdMonday !== 1 &&
      value?.hpdTuesday !== 1 &&
      value?.hpdWednesday !== 1 &&
      value?.hpdThursday !== 1 &&
      value?.hpdFriday !== 1 &&
      value?.hpdSaturday === 1 &&
      value?.hpdSunday !== 1
    ) {
      if (value?.hpdIndicator === 0) {
        props?.setHpDiaryForm?.setFieldValue("hpWorkingDays", ["Saturday"]);
        setSelectedHpWorkingDays(["Saturday"]);
        props?.setHpDiaryForm?.setFieldValue("hpNonWorkingDays", []);
        setSelectedHpNonWorkingDays([]);
      } else {
        props?.setHpDiaryForm?.setFieldValue("hpNonWorkingDays", ["Saturday"]);
        setSelectedHpNonWorkingDays(["Saturday"]);
        props?.setHpDiaryForm?.setFieldValue("hpWorkingDays", []);
        setSelectedHpNonWorkingDays([]);
      }
    }

    if (
      value?.hpdMonday !== 1 &&
      value?.hpdTuesday !== 1 &&
      value?.hpdWednesday !== 1 &&
      value?.hpdThursday !== 1 &&
      value?.hpdFriday !== 1 &&
      value?.hpdSaturday !== 1 &&
      value?.hpdSunday === 1
    ) {
      if (value?.hpdIndicator === 0) {
        props?.setHpDiaryForm?.setFieldValue("hpWorkingDays", ["Sunday"]);
        setSelectedHpWorkingDays(["Sunday"]);
        props?.setHpDiaryForm?.setFieldValue("hpNonWorkingDays", []);
        setSelectedHpNonWorkingDays([]);
      } else {
        props?.setHpDiaryForm?.setFieldValue("hpNonWorkingDays", ["Sunday"]);
        setSelectedHpNonWorkingDays(["Sunday"]);
        props?.setHpDiaryForm?.setFieldValue("hpWorkingDays", []);
        setSelectedHpNonWorkingDays([]);
      }
    }
  };

  useEffect(() => {
    if (hpDiarySchedule !== undefined && hpDiarySchedule !== "") {
      props?.setHpDiaryForm?.setFieldValue("hpdId", hpDiarySchedule?.hpdId);
      const hpdStartDate = getDatefromSqlDate(hpDiarySchedule?.hpdStartDate);
      const hpdEndDate = getDatefromSqlDate(hpDiarySchedule?.hpdEndDate);
      props?.setHpDiaryForm?.setFieldValue("hpStartDate", hpdStartDate);
      props?.setHpDiaryForm?.setFieldValue("hpEndDate", hpdEndDate);
      handleWorkingDays(hpDiarySchedule);
      props?.setHpDiaryForm?.setFieldValue(
        "hpStartTime",
        getDateFromHours(hpDiarySchedule?.hpdWorkingStartTime)
      );

      props?.setHpDiaryForm?.setFieldValue(
        "hpEndTime",
        getDateFromHours(hpDiarySchedule?.hpdWorkingEndTime)
      );

      if (hpDiarySchedule?.hpdOccuring === "month") {
        dummyData?.OCCURRENCE_TYPE.filter((element: any) => {
          if (element.label === "Week of The Month") {
            props?.setHpDiaryForm?.setFieldValue("hpOccurrenceType", element);
          }
        });
      } else if (hpDiarySchedule?.hpdOccuring === "monthlyOccurrence") {
        dummyData?.OCCURRENCE_TYPE.filter((element: any) => {
          if (element.label === "Day of The Month") {
            props?.setHpDiaryForm?.setFieldValue("hpOccurrenceType", element);
          }
        });
      }
      if (hpDiarySchedule?.hpdOccuring === null) {
        dummyData?.OCCURRENCE_TYPE.filter((element: any) => {
          if (element.label === "Please Select") {
            props?.setHpDiaryForm?.setFieldValue("hpOccurrenceType", []);
          }
        });
      }
      if (hpDiarySchedule?.hpdWeekOfMonth !== undefined) {
        dummyData?.WEEK_OCCURRENCE.filter((element: any) => {
          if (element.id === hpDiarySchedule?.hpdWeekOfMonth) {
            props?.setHpDiaryForm?.setFieldValue("hpOccurrence", element);
          }
        });
      }

      if (hpDiarySchedule?.hpdDayOfMonth !== undefined) {
        dummyData?.DAY_OCCURRENCE.filter((element: any) => {
          if (element.value === hpDiarySchedule?.hpdDayOfMonth) {
            props?.setHpDiaryForm?.setFieldValue("hpOccurrence", element);
          }
        });
      }
    }

    if (hpClinicArrayList !== undefined) {
      if (hpClinicArrayList?.length !== 0) {
        props?.setHpDiaryForm?.setFieldValue(`hpClinicDiary`, []);
      }
      hpClinicArrayList?.forEach((element: any, index: any) => {
        props?.setHpDiaryForm?.setFieldValue(
          `hpClinicDiary[${index}].clinicStartDate`,
          getDatefromSqlDate(element?.hcdStartDate)
        );
        props?.setHpDiaryForm?.setFieldValue(
          `hpClinicDiary[${index}].hcdId`,
          element?.hcdId
        );
        props?.setHpDiaryForm?.setFieldValue(
          `hpClinicDiary[${index}].clinicEndDate`,
          getDatefromSqlDate(element?.hcdEndDate)
        );

        if (
          element?.hcdMonday === 1 &&
          element?.hcdTuesday === 1 &&
          element?.hcdWednesday === 1 &&
          element?.hcdThursday === 1 &&
          element?.hcdFriday === 1 &&
          element?.hcdSaturday === 1 &&
          element?.hcdSunday === 1
        ) {
          if (element?.hcdIndicator === 0) {
            props?.setHpDiaryForm?.setFieldValue(
              `hpClinicDiary[${index}].clinicScheduleWorkingDays`,
              ["All"]
            );
            props?.setHpDiaryForm?.setFieldValue(
              `hpClinicDiary[${index}].nonWorkingDaysDisable`,
              false
            );
            props?.setHpDiaryForm?.setFieldValue(
              `hpClinicDiary[${index}].clinicScheduleNonWorkingDays`,
              []
            );
          } else {
            props?.setHpDiaryForm?.setFieldValue(
              `hpClinicDiary[${index}].clinicScheduleNonWorkingDays`,
              ["All"]
            );
            props?.setHpDiaryForm?.setFieldValue(
              `hpClinicDiary[${index}].workingDaysDisable`,
              false
            );
            props?.setHpDiaryForm?.setFieldValue(
              `hpClinicDiary[${index}].clinicScheduleWorkingDays`,
              []
            );
          }
        }

        if (
          element?.hcdMonday === 1 &&
          element?.hcdTuesday === 1 &&
          element?.hcdWednesday === 1 &&
          element?.hcdThursday === 1 &&
          element?.hcdFriday === 1 &&
          element?.hcdSaturday !== 1 &&
          element?.hcdSunday !== 1
        ) {
          if (element?.hcdIndicator === 0) {
            props?.setHpDiaryForm?.setFieldValue(
              `hpClinicDiary[${index}].clinicScheduleWorkingDays`,
              ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
            );
            props?.setHpDiaryForm?.setFieldValue(
              `hpClinicDiary[${index}].nonWorkingDaysDisable`,
              false
            );
            props?.setHpDiaryForm?.setFieldValue(
              `hpClinicDiary[${index}].clinicScheduleNonWorkingDays`,
              []
            );
          } else {
            props?.setHpDiaryForm?.setFieldValue(
              `hpClinicDiary[${index}].clinicScheduleNonWorkingDays`,
              ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
            );
            props?.setHpDiaryForm?.setFieldValue(
              `hpClinicDiary[${index}].workingDaysDisable`,
              false
            );
            props?.setHpDiaryForm?.setFieldValue(
              `hpClinicDiary[${index}].clinicScheduleWorkingDays`,
              []
            );
          }
        }

        if (
          element?.hcdMonday === 1 &&
          element?.hcdTuesday !== 1 &&
          element?.hcdWednesday !== 1 &&
          element?.hcdThursday !== 1 &&
          element?.hcdFriday !== 1 &&
          element?.hcdSaturday !== 1 &&
          element?.hcdSunday !== 1
        ) {
          if (element?.hcdIndicator === 0) {
            props?.setHpDiaryForm?.setFieldValue(
              `hpClinicDiary[${index}].clinicScheduleWorkingDays`,
              ["Monday"]
            );
            props?.setHpDiaryForm?.setFieldValue(
              `hpClinicDiary[${index}].nonWorkingDaysDisable`,
              false
            );
            props?.setHpDiaryForm?.setFieldValue(
              `hpClinicDiary[${index}].clinicScheduleNonWorkingDays`,
              []
            );
          } else {
            props?.setHpDiaryForm?.setFieldValue(
              `hpClinicDiary[${index}].clinicScheduleNonWorkingDays`,
              ["Monday"]
            );
            props?.setHpDiaryForm?.setFieldValue(
              `hpClinicDiary[${index}].workingDaysDisable`,
              false
            );
            props?.setHpDiaryForm?.setFieldValue(
              `hpClinicDiary[${index}].clinicScheduleWorkingDays`,
              []
            );
          }
        }

        if (
          element?.hcdMonday !== 1 &&
          element?.hcdTuesday === 1 &&
          element?.hcdWednesday !== 1 &&
          element?.hcdThursday !== 1 &&
          element?.hcdFriday !== 1 &&
          element?.hcdSaturday !== 1 &&
          element?.hcdSunday !== 1
        ) {
          if (element?.hcdIndicator === 0) {
            props?.setHpDiaryForm?.setFieldValue(
              `hpClinicDiary[${index}].clinicScheduleWorkingDays`,
              ["Tuesday"]
            );
            props?.setHpDiaryForm?.setFieldValue(
              `hpClinicDiary[${index}].nonWorkingDaysDisable`,
              false
            );
            props?.setHpDiaryForm?.setFieldValue(
              `hpClinicDiary[${index}].clinicScheduleNonWorkingDays`,
              []
            );
          } else {
            props?.setHpDiaryForm?.setFieldValue(
              `hpClinicDiary[${index}].clinicScheduleNonWorkingDays`,
              ["Tuesday"]
            );
            props?.setHpDiaryForm?.setFieldValue(
              `hpClinicDiary[${index}].workingDaysDisable`,
              false
            );
            props?.setHpDiaryForm?.setFieldValue(
              `hpClinicDiary[${index}].clinicScheduleWorkingDays`,
              []
            );
          }
        }

        if (
          element?.hcdMonday !== 1 &&
          element?.hcdTuesday !== 1 &&
          element?.hcdWednesday === 1 &&
          element?.hcdThursday !== 1 &&
          element?.hcdFriday !== 1 &&
          element?.hcdSaturday !== 1 &&
          element?.hcdSunday !== 1
        ) {
          if (element?.hcdIndicator === 0) {
            props?.setHpDiaryForm?.setFieldValue(
              `hpClinicDiary[${index}].clinicScheduleWorkingDays`,
              ["Wednesday"]
            );
            props?.setHpDiaryForm?.setFieldValue(
              `hpClinicDiary[${index}].nonWorkingDaysDisable`,
              false
            );
            props?.setHpDiaryForm?.setFieldValue(
              `hpClinicDiary[${index}].clinicScheduleNonWorkingDays`,
              []
            );
          } else {
            props?.setHpDiaryForm?.setFieldValue(
              `hpClinicDiary[${index}].clinicScheduleNonWorkingDays`,
              ["Wednesday"]
            );
            props?.setHpDiaryForm?.setFieldValue(
              `hpClinicDiary[${index}].workingDaysDisable`,
              false
            );
            props?.setHpDiaryForm?.setFieldValue(
              `hpClinicDiary[${index}].clinicScheduleWorkingDays`,
              []
            );
          }
        }
        if (
          element?.hcdMonday !== 1 &&
          element?.hcdTuesday !== 1 &&
          element?.hcdWednesday !== 1 &&
          element?.hcdThursday === 1 &&
          element?.hcdFriday !== 1 &&
          element?.hcdSaturday !== 1 &&
          element?.hcdSunday !== 1
        ) {
          if (element?.hcdIndicator === 0) {
            props?.setHpDiaryForm?.setFieldValue(
              `hpClinicDiary[${index}].clinicScheduleWorkingDays`,
              ["Thursday"]
            );
            props?.setHpDiaryForm?.setFieldValue(
              `hpClinicDiary[${index}].nonWorkingDaysDisable`,
              false
            );
            props?.setHpDiaryForm?.setFieldValue(
              `hpClinicDiary[${index}].clinicScheduleNonWorkingDays`,
              []
            );
          } else {
            props?.setHpDiaryForm?.setFieldValue(
              `hpClinicDiary[${index}].clinicScheduleNonWorkingDays`,
              ["Thursday"]
            );
            props?.setHpDiaryForm?.setFieldValue(
              `hpClinicDiary[${index}].workingDaysDisable`,
              false
            );
            props?.setHpDiaryForm?.setFieldValue(
              `hpClinicDiary[${index}].clinicScheduleWorkingDays`,
              []
            );
          }
        }
        if (
          element?.hcdMonday !== 1 &&
          element?.hcdTuesday !== 1 &&
          element?.hcdWednesday !== 1 &&
          element?.hcdThursday !== 1 &&
          element?.hcdFriday === 1 &&
          element?.hcdSaturday !== 1 &&
          element?.hcdSunday !== 1
        ) {
          if (element?.hcdIndicator === 0) {
            props?.setHpDiaryForm?.setFieldValue(
              `hpClinicDiary[${index}].clinicScheduleWorkingDays`,
              ["Friday"]
            );
            props?.setHpDiaryForm?.setFieldValue(
              `hpClinicDiary[${index}].nonWorkingDaysDisable`,
              false
            );
            props?.setHpDiaryForm?.setFieldValue(
              `hpClinicDiary[${index}].clinicScheduleNonWorkingDays`,
              []
            );
          } else {
            props?.setHpDiaryForm?.setFieldValue(
              `hpClinicDiary[${index}].clinicScheduleNonWorkingDays`,
              ["Friday"]
            );
            props?.setHpDiaryForm?.setFieldValue(
              `hpClinicDiary[${index}].workingDaysDisable`,
              false
            );
            props?.setHpDiaryForm?.setFieldValue(
              `hpClinicDiary[${index}].clinicScheduleWorkingDays`,
              []
            );
          }
        }

        if (
          element?.hcdMonday !== 1 &&
          element?.hcdTuesday !== 1 &&
          element?.hcdWednesday !== 1 &&
          element?.hcdThursday !== 1 &&
          element?.hcdFriday !== 1 &&
          element?.hcdSaturday === 1 &&
          element?.hcdSunday !== 1
        ) {
          if (element?.hcdIndicator === 0) {
            props?.setHpDiaryForm?.setFieldValue(
              `hpClinicDiary[${index}].clinicScheduleWorkingDays`,
              ["Saturday"]
            );
            props?.setHpDiaryForm?.setFieldValue(
              `hpClinicDiary[${index}].nonWorkingDaysDisable`,
              false
            );
            props?.setHpDiaryForm?.setFieldValue(
              `hpClinicDiary[${index}].clinicScheduleNonWorkingDays`,
              []
            );
          } else {
            props?.setHpDiaryForm?.setFieldValue(
              `hpClinicDiary[${index}].clinicScheduleNonWorkingDays`,
              ["Saturday"]
            );
            props?.setHpDiaryForm?.setFieldValue(
              `hpClinicDiary[${index}].workingDaysDisable`,
              false
            );
            props?.setHpDiaryForm?.setFieldValue(
              `hpClinicDiary[${index}].clinicScheduleWorkingDays`,
              []
            );
          }
        }

        if (
          element?.hcdMonday !== 1 &&
          element?.hcdTuesday !== 1 &&
          element?.hcdWednesday !== 1 &&
          element?.hcdThursday !== 1 &&
          element?.hcdFriday !== 1 &&
          element?.hcdSaturday !== 1 &&
          element?.hcdSunday === 1
        ) {
          if (element?.hcdIndicator === 0) {
            props?.setHpDiaryForm?.setFieldValue(
              `hpClinicDiary[${index}].clinicScheduleWorkingDays`,
              ["Sunday"]
            );
            props?.setHpDiaryForm?.setFieldValue(
              `hpClinicDiary[${index}].nonWorkingDaysDisable`,
              false
            );
            props?.setHpDiaryForm?.setFieldValue(
              `hpClinicDiary[${index}].clinicScheduleNonWorkingDays`,
              []
            );
          } else {
            props?.setHpDiaryForm?.setFieldValue(
              `hpClinicDiary[${index}].clinicScheduleWorkingDays`,
              ["Sunday"]
            );
            props?.setHpDiaryForm?.setFieldValue(
              `hpClinicDiary[${index}].workingDaysDisable`,
              false
            );
            props?.setHpDiaryForm?.setFieldValue(
              `hpClinicDiary[${index}].clinicScheduleWorkingDays`,
              []
            );
          }
        }

        props?.setHpDiaryForm?.setFieldValue(
          `hpClinicDiary[${index}].clinicStartTime`,
          getDateFromHours(element?.hcdClinicStartTime)
        );
        props?.setHpDiaryForm?.setFieldValue(
          `hpClinicDiary[${index}].clinicEndTime`,
          getDateFromHours(element?.hcdClinicEndTime)
        );

        if (element?.hcdOccuring === "month") {
          dummyData?.OCCURRENCE_TYPE.filter((element: any) => {
            if (element.label === "Week of The Month") {
              props?.setHpDiaryForm?.setFieldValue(
                `hpClinicDiary[${index}].clinicScheduleOccurrenceType`,
                element
              );
            }
          });
        } else if (element?.hcdOccuring === "monthlyOccurrence") {
          dummyData?.OCCURRENCE_TYPE.filter((element: any) => {
            if (element.label === "Day of The Month") {
              props?.setHpDiaryForm?.setFieldValue(
                `hpClinicDiary[${index}].clinicScheduleOccurrenceType`,
                element
              );
            }
          });

          if (element?.hcdOccuring === null) {
            dummyData?.OCCURRENCE_TYPE.filter((element: any) => {
              if (element.label === "Please Select") {
                props?.setHpDiaryForm?.setFieldValue(
                  `hpClinicDiary[${index}].clinicScheduleOccurrenceType`,
                  []
                );
              }
            });
          }
        }

        if (element?.hcdWeekOfMonth !== undefined) {
          dummyData?.WEEK_OCCURRENCE?.filter((week: any) => {
            if (week?.id === element?.hcdWeekOfMonth) {
              props?.setHpDiaryForm?.setFieldValue(
                `hpClinicDiary[${index}].clinicScheduleOccurrence`,
                week
              );
            }
          });
        }

        if (element?.hcdDayOfMonth !== undefined) {
          dummyData?.DAY_OCCURRENCE.filter((day: any) => {
            if (day?.value === element?.hcdDayOfMonth) {
              props?.setHpDiaryForm?.setFieldValue(
                `hpClinicDiary[${index}].clinicScheduleOccurrence`,
                day
              );
            }
          });
        }
      });
    }
    // eslint - disable - next - line;
  }, [hpDiarySchedule, getHpDetailsResponse, props?.hpdId]);

  return (
    <Mui.Grid container item spacing={2}>
      <Mui.Grid item xs={12}>
        <Mui.Grid container item>
          <Mui.Grid item xs={12} sx={styles.hpDiaryHeader}>
            <Mui.Typography variant="h2" sx={styles.hpDiaryText}>
              {translate("hpSchedule", language)}
            </Mui.Typography>
          </Mui.Grid>
        </Mui.Grid>
        <Mui.Grid
          container
          item
          xs={props?.isEditMode ? 11.5 : 12}
          spacing={2}
          sx={{ display: "flex", alignItems: "baseline" }}
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
                id="hpdId"
                name="hpdId"
                value={props?.setHpDiaryForm?.values?.hpdId ?? ""}
                onChange={props?.setHpDiaryForm?.handleChange}
                onBlur={props?.setHpDiaryForm?.handleBlur}
              />
              <Common.CellmaDatePicker
                label={translate("startDate", language)}
                name="hpStartDate"
                required
                maxDate={new Date("12/31/2050")}
                value={props?.setHpDiaryForm?.values?.hpStartDate}
                onChange={(newDate: Date | null) => {
                  props?.setHpDiaryForm?.setFieldValue("hpStartDate", newDate);
                  props?.setHpDiaryForm?.setFieldTouched(
                    "hpStartDate",
                    true,
                    false
                  );
                  handleReset();
                }}
                onBlur={props?.setHpDiaryForm?.handleBlur}
                error={
                  props?.setHpDiaryForm?.touched?.hpStartDate &&
                  props?.setHpDiaryForm?.errors?.hpStartDate
                }
              />
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
                name="hpEndDate"
                required
                maxDate={new Date("12/31/2050")}
                value={props?.setHpDiaryForm?.values?.hpEndDate}
                onChange={(newDate: Date | null) => {
                  props?.setHpDiaryForm?.setFieldValue("hpEndDate", newDate);
                  props?.setHpDiaryForm?.setFieldTouched(
                    "hpEndDate",
                    true,
                    false
                  );
                  handleReset();
                }}
                onBlur={props?.setHpDiaryForm?.handleBlur}
                error={
                  props?.setHpDiaryForm?.touched?.hpEndDate &&
                  props?.setHpDiaryForm?.errors?.hpEndDate
                }
              />
            </Mui.Grid>
          </Mui.Grid>
          <Mui.Grid container item xs={6} columnSpacing={2}>
            <Mui.Grid item xs={12} sx={styles.alignCenter}>
              <Mui.Typography variant="h2" sx={styles.headerText}>
                {translate("workingNonWorkingDays", language)}{" "}
              </Mui.Typography>
            </Mui.Grid>
            <Mui.Grid item xs={6}>
              <Common.CellmaSelectFieldWithCheckbox
                label={translate("workingDays", language)}
                ariaLabel="hpWorkingDays"
                value={props?.setHpDiaryForm?.values?.hpWorkingDays ?? ""}
                disabled={selectedHpNonWorkingDays.length > 0}
                onChange={(event: any) => {
                  handleChangeHpWorkingDays(event);
                  handleReset();
                }}
                list={dummyData.DAYS.map((option: any) => (
                  <Mui.MenuItem
                    key={option?.id}
                    value={option?.label}
                    disabled={
                      option?.label !== "All" ? isAllWorkingSelected : false
                    }
                  >
                    <Mui.ListItemIcon>
                      <Mui.Checkbox
                        checked={props?.setHpDiaryForm?.values?.hpWorkingDays?.includes(
                          option?.label as never
                        )}
                      />
                    </Mui.ListItemIcon>
                    <Mui.ListItemText primary={option.label} />
                  </Mui.MenuItem>
                ))}
              />
            </Mui.Grid>
            <Mui.Grid item xs={6}>
              <Common.CellmaSelectFieldWithCheckbox
                label={translate("nonWorkingDays", language)}
                name="hpNonWorkingDays"
                value={props?.setHpDiaryForm?.values?.hpNonWorkingDays}
                disabled={selectedHpWorkingDays.length > 0}
                onChange={(event: any) => {
                  handleChangeHpNonWorkingDays(event);
                  handleReset();
                }}
                list={dummyData.DAYS.map((option: any) => (
                  <Mui.MenuItem
                    key={option?.id}
                    value={option?.label}
                    disabled={
                      option?.label !== "All" ? isAllNonWorkingSelected : false
                    }
                  >
                    <Mui.ListItemIcon>
                      <Mui.Checkbox
                        checked={props?.setHpDiaryForm?.values?.hpNonWorkingDays?.includes(
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
                {translate("hPWorkingHours", language)}
              </Mui.Typography>
            </Mui.Grid>
            <Mui.Grid item xs={6}>
              <Common.CellmaTimePicker
                label={translate("startTime", language)}
                name="hpStartTime"
                required
                onChange={(newTime: Date | null) => {
                  props?.setHpDiaryForm?.setFieldValue("hpStartTime", newTime);
                  handleReset();
                }}
                value={props?.setHpDiaryForm?.values?.hpStartTime}
                onKeyPress={timeValidation}
                onBlur={props?.setHpDiaryForm?.handleBlur}
                error={
                  props?.setHpDiaryForm?.touched?.hpStartTime &&
                  props?.setHpDiaryForm?.errors?.hpStartTime
                }
              />
            </Mui.Grid>
            <Mui.Grid item xs={6}>
              <Common.CellmaTimePicker
                label={translate("endTime", language)}
                name="hpEndTime"
                required
                onChange={(newTime: Date | null) => {
                  props?.setHpDiaryForm?.setFieldValue("hpEndTime", newTime);
                  props?.setHpDiaryForm?.setFieldTouched(
                    "hpEndTime",
                    true,
                    false
                  );
                  handleReset();
                }}
                value={props?.setHpDiaryForm?.values?.hpEndTime}
                onKeyPress={timeValidation}
                onBlur={props?.setHpDiaryForm?.handleBlur}
                error={
                  props?.setHpDiaryForm?.touched?.hpEndTime &&
                  props?.setHpDiaryForm?.errors?.hpEndTime
                }
              />
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
                ariaLabel="hpOccurrenceType"
                name="hpOccurrenceType"
                options={dummyData.OCCURRENCE_TYPE}
                value={props?.setHpDiaryForm?.values?.hpOccurrenceType ?? ""}
                onChange={(event: any, value: any) => {
                  if (value?.label !== "Please Select value") {
                    props?.setHpDiaryForm.setFieldValue(
                      "hpOccurrenceType",
                      value
                    );
                  }
                  props?.setHpDiaryForm.setFieldValue("hpOccurrence", "");
                  handleReset();
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
                name="hpOccurrence"
                ariaLabel="hpOccurrence"
                options={
                  props?.setHpDiaryForm?.values?.hpOccurrenceType.label !==
                    "" &&
                  props?.setHpDiaryForm?.values?.hpOccurrenceType.label !==
                    "Please Select value" &&
                  props?.setHpDiaryForm?.values?.hpOccurrenceType.label ===
                    "Week of The Month"
                    ? dummyData.WEEK_OCCURRENCE
                    : props?.setHpDiaryForm?.values?.hpOccurrenceType.label ===
                      "Day of The Month"
                    ? dummyData.DAY_OCCURRENCE
                    : []
                }
                value={props?.setHpDiaryForm?.values?.hpOccurrence ?? ""}
                onChange={(event: any, value: any) => {
                  props?.setHpDiaryForm.setFieldValue("hpOccurrence", value);
                  handleReset();
                }}
                getOptionLabel={(occurrence: any) => occurrence.label ?? ""}
                renderOption={(props: any, occurrence: any) => (
                  <li {...props}>{occurrence.label}</li>
                )}
              />
            </Mui.Grid>
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
            <Mui.Tooltip title={translate("deleteRecord", language)}>
              <Mui.IconButton
                onClick={() => {
                  props?.handleDeleteHPSchedule();
                  if (props?.setHpDiaryForm?.values?.hpdId !== "") {
                    dispatch(setHpdId(props?.setHpDiaryForm?.values?.hpdId));
                  }
                }}
              >
                <DeleteOutline sx={{ color: "warning.dark" }} />
              </Mui.IconButton>
            </Mui.Tooltip>
          </Mui.Grid>
        </Mui.Grid>
      )}
    </Mui.Grid>
  );
};

export default HPScheduleInputFields;

const styles = {
  alignCenter: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  alignEnd: { display: "flex", justifyContent: "flex-end" },
  headerText: { my: "15px" },
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
