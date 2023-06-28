import { Fragment, useState } from "react";

import * as Mui from "@mui/material";
import * as Fns from "date-fns";
import { useSelector } from "react-redux";

import styles from "./MonthCss";
import SetLeavePopup from "./SetLeavePopup";
import * as Common from "../../../../common/CommonComponentsIndex";
import translate from "../../assets/translationFiles/hpDiaryTranslation";

interface Props {
  activeDiaryButton: string;
  getHPCalenderDetails?: any;
  hpCalenderRefetch?: any;
  getClinicCalenderDetails?: any;
  espId?: any;
}

const Month: React.FC<Props> = (props) => {
  const [setLeavePopup, setSetLeavePopup] = useState(false);
  const { selectedDate } = useSelector((state: any) => state?.HpDiary);
  const { language } = useSelector((state: any) => state.language);
  const [todayDate, setTodayDate] = useState<any>();
  const [hpdId, setHpdId] = useState<any>();
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

              {props.activeDiaryButton === "hpDiary" && (
                <Mui.Grid container sx={styles.cellBox}>
                  {props?.getHPCalenderDetails?.map((daySchedule: any) => (
                    <Mui.Grid container key={daySchedule?.hpdDate}>
                      <Common.CellmaLink
                        label="hpScheduled"
                        disabled={!Fns.isSameMonth(today, monthStart)}
                        onClick={() => {
                          setTodayDate(
                            Fns.format(today, "dd/MM/yyyy").toString()
                          );
                          setHpdId(daySchedule?.hpdId);
                          setSetLeavePopup(true);
                        }}
                      >
                        {daySchedule?.hpdDate ===
                          Fns.format(today, "yyyy-MM-dd").toString() && (
                          <Mui.Grid item sx={styles.linkGrid}>
                            {daySchedule?.isHpOnLeave === true && (
                              <Mui.Grid item container>
                                <Mui.Typography sx={styles.leaveTypography}>
                                  {translate("annualLeave", language)}
                                  <br />
                                  {daySchedule?.isHpOnLeave === true && (
                                    <Mui.Typography sx={styles.leaveTypography}>
                                      {translate("wholeDay", language)}
                                    </Mui.Typography>
                                  )}
                                </Mui.Typography>
                              </Mui.Grid>
                            )}
                            {daySchedule?.hpLeaveStartTime &&
                              daySchedule?.hpLeaveStartTime !== "" && (
                                <Mui.Grid item container>
                                  <Mui.Typography sx={styles.leaveTypography}>
                                    {translate("annualLeave", language)}
                                  </Mui.Typography>
                                  <Mui.Typography sx={styles.leaveTypography}>
                                    {translate("startTime", language)}
                                    :&nbsp;
                                    {daySchedule?.hpLeaveStartTime}
                                  </Mui.Typography>
                                  <Mui.Typography sx={styles.leaveTypography}>
                                    {translate("endTime", language)}:&nbsp;
                                    {daySchedule?.hpLeaveEndTime}
                                  </Mui.Typography>
                                </Mui.Grid>
                              )}
                          </Mui.Grid>
                        )}
                      </Common.CellmaLink>
                      <Common.CellmaLink
                        label={translate("workingHrs", language)}
                        disabled={!Fns.isSameMonth(today, monthStart)}
                        onClick={() => {
                          setTodayDate(
                            Fns.format(today, "dd/MM/yyyy").toString()
                          );
                          setHpdId(daySchedule?.hpdId);
                          setSetLeavePopup(true);
                        }}
                      >
                        {daySchedule?.hpdDate ===
                          Fns.format(today, "yyyy-MM-dd").toString() && (
                          <Mui.Grid item sx={styles.linkGrid}>
                            {daySchedule?.annualLeave?.startTime && (
                              <Mui.Divider sx={styles.divider} />
                            )}
                            <Mui.Grid item container>
                              {daySchedule?.hpdWorkingHours && (
                                <>
                                  <Mui.Typography sx={styles.typography}>
                                    {translate("workingHrs", language)} :&nbsp;
                                    {daySchedule?.hpdWorkingHours}
                                  </Mui.Typography>

                                  <Mui.Typography sx={styles.typography}>
                                    {translate("startTime", language)} :&nbsp;
                                    {daySchedule?.hpdStartTime}
                                  </Mui.Typography>

                                  <Mui.Typography sx={styles.typography}>
                                    {translate("endTime", language)} :&nbsp;
                                    {daySchedule?.hpdEndTime}
                                  </Mui.Typography>
                                </>
                              )}
                            </Mui.Grid>
                            {daySchedule?.hpdStartTime && (
                              <Mui.Divider sx={styles.divider} />
                            )}
                          </Mui.Grid>
                        )}
                      </Common.CellmaLink>
                      <Common.CellmaLink
                        label={translate("clinicHrs", language)}
                        disabled={!Fns.isSameMonth(today, monthStart)}
                        onClick={() => {
                          setTodayDate(
                            Fns.format(today, "dd/MM/yyyy").toString()
                          );
                          setHpdId(daySchedule?.hpdId);
                          setSetLeavePopup(true);
                        }}
                      >
                        {daySchedule?.hpdDate ===
                          Fns.format(today, "yyyy-MM-dd").toString() && (
                          <Mui.Grid item sx={styles.linkGrid}>
                            <Mui.Grid item container>
                              {daySchedule?.hpdClinicHours && (
                                <>
                                  <Mui.Typography sx={styles.typography}>
                                    {translate("clinicHrs", language)}:&nbsp;
                                    {daySchedule?.hpdClinicHours}
                                  </Mui.Typography>
                                  <Mui.Typography sx={styles.typography}>
                                    {translate("startTime", language)}:&nbsp;
                                    {daySchedule?.hpdClinicStartTime}
                                  </Mui.Typography>
                                  <Mui.Typography sx={styles.typography}>
                                    {translate("endTime", language)}:&nbsp;
                                    {daySchedule?.hpdClinicEndTime}
                                  </Mui.Typography>
                                </>
                              )}
                            </Mui.Grid>
                          </Mui.Grid>
                        )}
                      </Common.CellmaLink>
                    </Mui.Grid>
                  ))}
                </Mui.Grid>
              )}
              {props.activeDiaryButton === "clinicDiary" && (
                <Mui.Grid container sx={styles.cellBox}>
                  {Object?.keys(props?.getClinicCalenderDetails ?? {}).map(
                    (daySchedule: any) => (
                      <Mui.Grid container key={daySchedule}>
                        <Common.CellmaLink
                          label="clinicSchedule"
                          onClick={() => {
                            setTodayDate(
                              Fns.format(today, "dd/MM/yyyy").toString()
                            );
                            setHpdId(daySchedule?.hpdId);
                            setSetLeavePopup(true);
                          }}
                        >
                          {daySchedule ===
                            Fns.format(today, "yyyy-MM-dd").toString() && (
                            <Mui.Grid item>
                              <Mui.Grid item container>
                                {props?.getClinicCalenderDetails[
                                  daySchedule
                                ].map(
                                  (element: any) =>
                                    element?.hcdClinicHours && (
                                      <>
                                        <Mui.Typography sx={styles.typography}>
                                          {translate("clinicHrs", language)}
                                          :&nbsp;
                                          {element?.hcdClinicHours}
                                        </Mui.Typography>
                                        <Mui.Typography sx={styles.typography}>
                                          {translate("startTime", language)}
                                          :&nbsp;
                                          {element.hcdClinicStartTime}
                                        </Mui.Typography>
                                        <Mui.Typography sx={styles.typography}>
                                          {translate("endTime", language)}
                                          :&nbsp;
                                          {element.hcdClinicEndTime}
                                        </Mui.Typography>
                                      </>
                                    )
                                )}
                                {props?.getClinicCalenderDetails[
                                  daySchedule
                                ].map(
                                  (element: any) =>
                                    element?.isHpOnLeave === true && (
                                      <Mui.Grid
                                        item
                                        container
                                        key={
                                          props?.getClinicCalenderDetails[
                                            daySchedule
                                          ]
                                        }
                                      >
                                        <Mui.Typography
                                          sx={styles.leaveTypography}
                                        >
                                          {translate("annualLeave", language)}
                                          <br />
                                          <Mui.Typography
                                            sx={styles.leaveTypography}
                                          >
                                            {translate("wholeDay", language)}
                                          </Mui.Typography>
                                        </Mui.Typography>
                                      </Mui.Grid>
                                    )
                                )}
                              </Mui.Grid>
                              {props?.getClinicCalenderDetails[daySchedule]
                                ?.hcdClinicHours && (
                                <Mui.Divider sx={styles.divider} />
                              )}
                            </Mui.Grid>
                          )}
                        </Common.CellmaLink>
                      </Mui.Grid>
                    )
                  )}
                </Mui.Grid>
              )}
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
        {setLeavePopup && (
          <SetLeavePopup
            todayDate={todayDate}
            hpdId={hpdId}
            handleCancel={() => {
              setSetLeavePopup(false);
            }}
            activeDiary={props.activeDiaryButton}
            hpCalenderRefetch={props?.hpCalenderRefetch}
            espId={props?.espId}
          />
        )}
      </Mui.Box>
    );
  };

  return renderTable();
};

export default Month;
