import { Fragment } from "react";

import * as Mui from "@mui/material";
import * as Fns from "date-fns";
import { useSelector } from "react-redux";

import styles from "./MonthCss";
import * as dummyData from "../../assets/dummyData/ServiceAppointmentsDummyData";
import t from "../../assets/translationFiles/serviceAppointmentTranslation";

interface Props {}

const Month: React.FC<Props> = (props) => {
  const { selectedDate } = useSelector((state: any) => state?.HpDiary);
  let locale: Fns.Locale;

  const monthStart = Fns.startOfMonth(selectedDate);
  const monthEnd = Fns.endOfMonth(selectedDate);

  // Function for the week start on index based
  const eachWeekStart = Fns.eachWeekOfInterval(
    {
      start: monthStart,
      end: monthEnd,
    },
    { weekStartsOn: 0 }
  );
  const days = [0, 1, 2, 3, 4, 5, 6];

  // Function for weekday list
  const daysList = days.map((day: any) => Fns.addDays(eachWeekStart[0], day));

  // Function for Cells
  const renderCells = () => {
    const rows: JSX.Element[] = [];

    // eslint-disable-next-line no-restricted-syntax
    for (const startDay of eachWeekStart) {
      const cells = days.map((d: any) => {
        const today = Fns.addDays(startDay, d);

        return (
          <Mui.Grid item xs={12 / 7} key={d.toString()}>
            <Mui.Box sx={styles.box}>
              <Mui.Avatar
                sx={{
                  width: "30px",
                  height: "30px",
                  backgroundColor: Fns.isToday(today)
                    ? "primary.light"
                    : "transparent",
                  color: Fns.isToday(today)
                    ? "primary.contrastText"
                    : "transparent",
                }}
              >
                <Mui.Typography
                  sx={{
                    color: !Fns.isSameMonth(today, monthStart)
                      ? "grey.500"
                      : "common.black",
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  {Fns.format(today, "dd")}
                </Mui.Typography>
              </Mui.Avatar>
              <Mui.Grid container sx={styles.cellBox}>
                {dummyData?.HP_SCHEDULED.map((daySchedule: any) => (
                  <Mui.Grid container key={daySchedule?.date}>
                    {daySchedule.date ===
                      Fns.format(today, "yyyy/MM/dd").toString() && (
                      <Mui.Grid item sx={styles.linkGrid}>
                        <Mui.Grid item container>
                          {daySchedule?.availableHrs?.total && (
                            <>
                              <Mui.Typography sx={styles.typography}>
                                {t("availableHrs")}:&nbsp;
                                {daySchedule?.availableHrs?.total}
                              </Mui.Typography>

                              <Mui.Typography sx={styles.typography}>
                                {t("startTime")} :&nbsp;
                                {daySchedule?.availableHrs?.startTime}
                              </Mui.Typography>

                              <Mui.Typography sx={styles.typography}>
                                {t("endTime")} :&nbsp;
                                {daySchedule?.availableHrs?.endTime}
                              </Mui.Typography>
                            </>
                          )}
                        </Mui.Grid>
                        {daySchedule?.availableHrs?.startTime && (
                          <Mui.Divider sx={styles.divider} />
                        )}
                      </Mui.Grid>
                    )}
                    {daySchedule.date ===
                      Fns.format(today, "yyyy/MM/dd").toString() && (
                      <Mui.Grid item sx={styles.linkGrid}>
                        <Mui.Grid item container>
                          {daySchedule?.scheduledHrs?.total && (
                            <>
                              <Mui.Typography sx={styles.typography}>
                                {t("scheduledHrs")}:&nbsp;
                                {daySchedule?.scheduledHrs?.total}
                              </Mui.Typography>
                              <Mui.Typography sx={styles.typography}>
                                {t("startTime")}:&nbsp;
                                {daySchedule?.scheduledHrs?.startTime}
                              </Mui.Typography>
                              <Mui.Typography sx={styles.typography}>
                                {t("endTime")}:&nbsp;
                                {daySchedule?.scheduledHrs?.endTime}
                              </Mui.Typography>
                            </>
                          )}
                        </Mui.Grid>
                      </Mui.Grid>
                    )}
                  </Mui.Grid>
                ))}
              </Mui.Grid>
            </Mui.Box>
          </Mui.Grid>
        );
      });

      rows.push(<Fragment key={startDay.toString()}>{cells}</Fragment>);
    }
    return rows;
  };

  // Function for get the month
  const getMonthName = (monthNumber: any) => {
    const date = new Date();
    date.setMonth(monthNumber - 1);
    return date.toLocaleString([], { month: "long" });
  };

  // Function for get month and year
  const selectedMonth = `${getMonthName(
    selectedDate.getMonth() + 1
  )} ${selectedDate.getFullYear()}`;

  const renderTable = () => {
    return (
      <Mui.Box>
        <Mui.Box sx={styles.monthBox}>
          <Mui.Typography sx={{ color: "common.white" }}>
            {selectedMonth}
          </Mui.Typography>
        </Mui.Box>
        <Mui.Grid
          container
          sx={{ maxWidth: "100%", display: "flex", flexDirection: "row" }}
        >
          {/*  Days Header  */}
          {daysList.map((date: any) => (
            <Mui.Grid item xs={12 / 7} key={date.toString()}>
              <Mui.Typography key={date} sx={styles.headerDays} variant="h4">
                {Fns.format(date, "EE", { locale })}
              </Mui.Typography>
            </Mui.Grid>
          ))}

          {renderCells()}
        </Mui.Grid>
      </Mui.Box>
    );
  };

  return renderTable();
};

export default Month;
