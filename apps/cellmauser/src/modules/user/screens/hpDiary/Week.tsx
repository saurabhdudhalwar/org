import { useEffect, useState } from "react";

import { SkipNext, SkipPrevious } from "@mui/icons-material";
import * as Mui from "@mui/material";
import * as Fns from "date-fns";
import { eachMinuteOfInterval, format, setHours, setMinutes } from "date-fns";
import { useSelector } from "react-redux";

import styles from "./WeekCss";
import translate from "../../assets/translationFiles/hpDiaryTranslation";

interface Props {
  activeDiaryButton?: any;
  getHPCalenderDetails?: any;
  getClinicCalenderDetails?: any;
}

const Week: React.FC<Props> = (props) => {
  const [activeHpDiary, setActiveHpDiary] = useState() as any;
  const [activeClinicDiary, setActiveClinicDiary] = useState() as any;
  const { language } = useSelector((state: any) => state.language);
  const { selectedDate } = useSelector((state: any) => state?.HpDiary);

  useEffect(() => {
    setActiveHpDiary(props?.getHPCalenderDetails);
    setActiveClinicDiary(props?.getClinicCalenderDetails);
  }, [props?.getHPCalenderDetails, props?.getClinicCalenderDetails]);

  let locale: Fns.Locale;

  const selectedHPs = [{ name: "Dr.David" }];

  const weekStart = Fns.startOfWeek(selectedDate, { weekStartsOn: 0 });
  const weekEnd = Fns.endOfWeek(selectedDate, { weekStartsOn: 0 });

  // Function for the week start on index based
  const eachWeekStart = Fns.eachWeekOfInterval(
    {
      start: weekStart,
      end: weekEnd,
    },
    { weekStartsOn: 0 }
  );
  const days = [0, 1, 2, 3, 4, 5, 6];

  // Function for weekday list
  const daysList = days.map((day: any) => Fns.addDays(eachWeekStart[0], day));

  const START_TIME = setMinutes(setHours(selectedDate, 0), 0);
  const END_TIME = setMinutes(setHours(selectedDate, 24), 0);
  const hours = eachMinuteOfInterval(
    {
      start: START_TIME,
      end: END_TIME,
    },
    { step: 15 }
  );

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
                {weekStart.toString().slice(4, 15)} {" - "}
                {weekEnd.toString().slice(4, 15)}
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
          <Mui.Grid item xs={0.75} sx={styles.headerDays} />
          <Mui.Grid
            item
            xs={11.25}
            container
            sx={{ maxWidth: "100%", display: "flex", flexDirection: "row" }}
          >
            {/*  Days Header  */}
            {daysList.map((date: any) => (
              <Mui.Grid item xs={12 / 7} key={date.toString()}>
                <Mui.Typography sx={styles.headerDays} variant="h4">
                  {Fns.format(date, "EE", { locale })}
                  {" - "}
                  {Fns.format(date, "dd", { locale })}
                </Mui.Typography>
              </Mui.Grid>
            ))}
          </Mui.Grid>
        </Mui.Grid>
        <Mui.Grid item container sx={styles.mainGrid}>
          {selectedHPs.length === 1 &&
            hours.map((hour: any) => (
              <Mui.Grid item container key={hour} sx={styles.hourBox}>
                <Mui.Grid item xs={0.75} sx={styles.timeGrid}>
                  <Mui.Typography variant="h5">
                    {format(hour, hFormat, { locale }).slice(3, 5) === "00"
                      ? format(hour, hFormat, { locale }).slice(0, 5)
                      : format(hour, hFormat, { locale }).slice(3, 5)}
                  </Mui.Typography>
                </Mui.Grid>
                <Mui.Grid item container xs={11.25}>
                  {daysList.map((date: any) => (
                    <Mui.Grid item container xs={12 / 7} key={date}>
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
                          xs={12}
                          sx={{
                            ...styles.cellBox,
                            backgroundColor: checkSlotStatus(
                              format(hour, hFormat, { locale }),
                              format(date, "yyyy-MM-dd", { locale })
                            ),
                          }}
                        />
                      </Mui.Tooltip>
                    </Mui.Grid>
                  ))}
                </Mui.Grid>
              </Mui.Grid>
            ))}
        </Mui.Grid>
      </Mui.Grid>
    );
  };

  return renderTable();
};

export default Week;
