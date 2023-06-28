import { useEffect, useState } from "react";

import { SkipNext, SkipPrevious } from "@mui/icons-material";
import * as Mui from "@mui/material";
import * as Fns from "date-fns";
import { eachMinuteOfInterval, format, setHours, setMinutes } from "date-fns";
import { useSelector } from "react-redux";

import styles from "./DayCss";
import translate from "../../assets/translationFiles/hpDiaryTranslation";

interface Props {
  activeDiaryButton: string;
  getHPCalenderDetails?: any;
  getClinicCalenderDetails?: any;
}

const Day: React.FC<Props> = (props) => {
  const [activeHpDiary, setActiveHpDiary] = useState() as any;
  const [activeClinicDiary, setActiveClinicDiary] = useState() as any;

  const { selectedDate } = useSelector((state: any) => state?.HpDiary);
  const { language } = useSelector((state: any) => state.language);
  let locale: Fns.Locale;

  useEffect(() => {
    setActiveHpDiary(props?.getHPCalenderDetails);
    setActiveClinicDiary(props?.getClinicCalenderDetails);
  }, [props?.getHPCalenderDetails, props?.getClinicCalenderDetails]);

  const START_TIME = setMinutes(setHours(selectedDate, 0), 0);
  const END_TIME = setMinutes(setHours(selectedDate, 24), 0);
  const hours = eachMinuteOfInterval(
    {
      start: START_TIME,
      end: END_TIME,
    },
    { step: 15 }
  );

  const weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const hFormat = "HH:mm";

  const checkSlotStatus = (slot: any, date: any) => {
    let status = "error.light";
    if (activeHpDiary !== undefined && activeClinicDiary !== undefined) {
      activeHpDiary?.forEach((element: any) => {
        if (
          slot >= element?.hpdStartTime &&
          slot < element?.hpdEndTime &&
          element?.hpdDate === date
        ) {
          status = "warning.light";
        }
        if (
          slot >= element?.hpdClinicStartTime &&
          slot < element?.hpdClinicEndTime &&
          element?.hpdDate === date
        ) {
          status = "common.white";
        }
      });
      activeClinicDiary[date]?.forEach((element: any) => {
        if (
          slot >= element?.hcdClinicStartTime &&
          slot < element?.hcdClinicEndTime
        ) {
          status = "common.white";
        }
      });
    }

    return status;
  };

  const renderTable = () => {
    return (
      <Mui.Grid item container xs={12} sx={{ boxShadow: 1 }}>
        <Mui.Grid item container xs={12}>
          <Mui.Grid item container xs={12} sx={styles.dayHeader}>
            <Mui.Grid item xs={1} />
            <Mui.Grid item xs={10}>
              <Mui.Typography variant="h5" sx={styles.dayHeaderText}>
                {selectedDate.toString().slice(4, 15)}
              </Mui.Typography>
            </Mui.Grid>

            <Mui.Grid item xs={1}>
              <Mui.IconButton size="small" aria-label="Previous">
                <Mui.Tooltip
                  title={translate("previous", language)}
                  placement="left"
                  arrow
                >
                  <SkipPrevious sx={styles.headerIcon} />
                </Mui.Tooltip>
              </Mui.IconButton>
              <Mui.IconButton size="small" aria-label="Next">
                <Mui.Tooltip
                  title={translate("next", language)}
                  placement="right"
                  arrow
                >
                  <SkipNext sx={styles.headerIcon} />
                </Mui.Tooltip>
              </Mui.IconButton>
            </Mui.Grid>
          </Mui.Grid>

          <Mui.Grid item xs={12} sx={{ backgroundColor: "primary.light" }}>
            <Mui.Typography
              variant="h5"
              sx={{ display: "flex", justifyContent: "center" }}
            >
              {weekDays[selectedDate.getDay()]}
            </Mui.Typography>
          </Mui.Grid>
        </Mui.Grid>
        <Mui.Grid item container>
          <Mui.Grid item container xs={12}>
            <Mui.Grid item container sx={styles.mainGrid}>
              {hours.map((hour) => (
                <Mui.Grid
                  item
                  container
                  xs={12}
                  key={hour.getTime()}
                  sx={styles.hourBox}
                >
                  <Mui.Grid item xs={0.75} sx={styles.timeGrid}>
                    <Mui.Typography variant="h5">
                      {format(hour, hFormat, { locale }).slice(3, 5) === "00"
                        ? format(hour, hFormat, { locale }).slice(0, 5)
                        : format(hour, hFormat, { locale }).slice(3, 5)}
                    </Mui.Typography>
                  </Mui.Grid>
                  <Mui.Tooltip
                    title={
                      props.activeDiaryButton === "clinicDiary"
                        ? translate("hpClinicHour", language)
                        : translate("hpWorkingHour", language)
                    }
                    placement="top"
                    arrow
                  >
                    <Mui.Grid
                      item
                      xs={11.25}
                      sx={{
                        ...styles.cellBox,
                        backgroundColor: checkSlotStatus(
                          format(hour, hFormat, { locale }),
                          format(hour, "yyyy-MM-dd", { locale })
                        ),
                      }}
                    />
                  </Mui.Tooltip>
                </Mui.Grid>
              ))}
            </Mui.Grid>
          </Mui.Grid>
        </Mui.Grid>
      </Mui.Grid>
    );
  };

  return renderTable();
};

export default Day;
