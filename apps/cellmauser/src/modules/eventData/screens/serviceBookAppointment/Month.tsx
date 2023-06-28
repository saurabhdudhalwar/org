import { Fragment } from "react";

import { SkipNext, SkipPrevious } from "@mui/icons-material";
import * as Mui from "@mui/material";
import * as Fns from "date-fns";
import { useDispatch, useSelector } from "react-redux";

import styles from "./MonthCss";
import * as Common from "../../../../common/CommonComponentsIndex";
import { setSelectedDate } from "../../../user/store/HpDiaryAction";
import * as dummyData from "../../assets/dummyData/ServiceBookAppointmentDummyData";
import t from "../../assets/translationFiles/ServiceBookAppointmentTranslation";

interface Props {
  onSlotSelection?: any;
}

const Month: React.FC<Props> = (props) => {
  const { selectedDate } = useSelector((state: any) => state?.HpDiary);
  const { isUseSpecialtyAndRegionSetting, isEnableBlockingMode } = useSelector(
    (state: any) => state.eventDataReducer
  );
  const dispatch = useDispatch();
  let locale: Fns.Locale;

  const monthStart = Fns.startOfMonth(selectedDate);
  const monthEnd = Fns.endOfMonth(selectedDate);

  const DAY_SLOTS = isEnableBlockingMode
    ? dummyData.BLOCKED_SLOTS
    : dummyData.AVAILABLE_SLOTS;

  // Function for count slots booked
  const convert = (slot: any) => {
    const slotCount = {} as any;
    slot?.forEach((slots: any) => {
      const key = `${slots.date}`;
      if (!slotCount[key]) {
        slotCount[key] = { ...slots, count: 0 };
      }
      slotCount[key].count += 1;
    });

    return Object.values(slotCount);
  };

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

  // Function for get the month
  const getMonthName = () => {
    const date = new Date();
    date.setMonth(selectedDate.getMonth());
    return `${date.toLocaleString([], {
      month: "long",
    })}  ${selectedDate.getFullYear()}`;
  };

  // Function for Cells
  const renderCells = () => {
    const rows: JSX.Element[] = [];
    // eslint-disable-next-line no-restricted-syntax
    for (const startDay of eachWeekStart) {
      const cells = days.map((day: any) => {
        const today = Fns.addDays(startDay, day);
        const formatDate = Fns.format(today, "yyyy/MM/dd").toString();
        return (
          <Mui.Grid
            container
            xs={12 / 7}
            onClick={() => {
              dispatch(setSelectedDate(today));
              props.onSlotSelection();
            }}
            sx={styles.cellBox}
            key={day.toString()}
          >
            <Mui.Grid item>
              <Mui.Avatar
                sx={{
                  width: "30px",
                  height: "30px",
                  margin: "2px",
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
                >
                  {Fns.format(today, "dd")}
                </Mui.Typography>
              </Mui.Avatar>
            </Mui.Grid>
            <Mui.Grid item container sx={styles.slotGrid}>
              {/* Map to show slot details of single HP */}

              {!isUseSpecialtyAndRegionSetting &&
                DAY_SLOTS.map((daySchedule: any) => (
                  <Mui.Grid
                    container
                    item
                    key={daySchedule.slotTime}
                    sx={{
                      display:
                        daySchedule.date === formatDate ? "flex" : "none",
                    }}
                  >
                    {daySchedule.date === formatDate && (
                      <Mui.Grid
                        item
                        xs={12}
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          backgroundColor: isEnableBlockingMode
                            ? "warning.300"
                            : "secondary.dark",
                          marginY: "1px",
                          padding: "1px",
                        }}
                      >
                        {daySchedule?.slotTime &&
                          (isEnableBlockingMode ? (
                            <Mui.Typography
                              variant="h6"
                              sx={styles.blockTypography}
                            >
                              {t("blockedBy")} Kanchan
                            </Mui.Typography>
                          ) : (
                            <Mui.Typography sx={styles.typography}>
                              {daySchedule?.slotTime}
                            </Mui.Typography>
                          ))}
                      </Mui.Grid>
                    )}
                  </Mui.Grid>
                ))}

              {/* Map to show slot details of multiple HP */}
              {isUseSpecialtyAndRegionSetting &&
                dummyData?.AVAILABLE_HPS.map((hps: any) => (
                  <Mui.Grid
                    container
                    item
                    key={hps.np}
                    sx={{
                      display: hps.date === formatDate ? "flex" : "none",
                    }}
                  >
                    {hps.date === formatDate && (
                      <Mui.Grid item xs={12} sx={styles.slotTimeGrid}>
                        {hps?.hp && (
                          <Mui.Typography sx={styles.typography}>
                            {hps?.hp}
                          </Mui.Typography>
                        )}
                      </Mui.Grid>
                    )}
                  </Mui.Grid>
                ))}
            </Mui.Grid>
            <Mui.Grid item container sx={{ display: "flex", mt: "10px" }}>
              {/* Map to show more slots for single HP */}

              {!isUseSpecialtyAndRegionSetting &&
                convert(DAY_SLOTS).map((daySchedule: any) => (
                  <Mui.Grid
                    item
                    xs={12}
                    key={daySchedule.slotTime}
                    sx={{ display: "flex", justifyContent: "flex-start" }}
                  >
                    {daySchedule.date === formatDate && (
                      <Common.CellmaLink
                        underline="none"
                        label="Available Slots More"
                      >
                        {daySchedule.count > 2 && (
                          <Mui.Typography sx={styles.link}>
                            +{daySchedule.count - 2} {t("more")}
                          </Mui.Typography>
                        )}
                      </Common.CellmaLink>
                    )}
                  </Mui.Grid>
                ))}

              {/* Map to show more HP for multiple HP */}
              {isUseSpecialtyAndRegionSetting &&
                convert(dummyData?.AVAILABLE_HPS).map((hp: any) => (
                  <Mui.Grid
                    item
                    xs={12}
                    key={hp.slotTime}
                    sx={{ display: "flex", justifyContent: "flex-start" }}
                  >
                    {hp.date === formatDate && (
                      <Common.CellmaLink
                        underline="none"
                        label="Available HPs More"
                      >
                        {hp.count > 2 && (
                          <Mui.Typography sx={styles.link}>
                            +{hp.count - 2} {t("more")}
                          </Mui.Typography>
                        )}
                      </Common.CellmaLink>
                    )}
                  </Mui.Grid>
                ))}
            </Mui.Grid>
          </Mui.Grid>
        );
      });

      rows.push(<Fragment key={startDay.toString()}>{cells}</Fragment>);
    }
    return rows;
  };

  const renderTable = () => {
    return (
      <Mui.Grid container>
        <Mui.Grid item container sx={styles.monthBox}>
          <Mui.Grid
            item
            xs={11}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <Mui.Typography sx={{ color: "common.white" }}>
              {getMonthName()}
            </Mui.Typography>
          </Mui.Grid>

          <Mui.Grid item xs={1}>
            <Mui.IconButton size="small" aria-label="Previous">
              <Mui.Tooltip title={t("previous")} placement="left" arrow>
                <SkipPrevious sx={styles.headerIcon} />
              </Mui.Tooltip>
            </Mui.IconButton>
            <Mui.IconButton size="small" aria-label="Next">
              <Mui.Tooltip title={t("next")} placement="right" arrow>
                <SkipNext sx={styles.headerIcon} />
              </Mui.Tooltip>
            </Mui.IconButton>
          </Mui.Grid>
        </Mui.Grid>
        <Mui.Grid
          container
          item
          sx={{ maxWidth: "100%", display: "flex", flexDirection: "row" }}
        >
          {/*  Days Header  */}
          {daysList.map((date: any) => (
            <Mui.Grid item xs={12 / 7} key={date.toString()}>
              <Mui.Typography
                key={date.date}
                sx={styles.headerDays}
                variant="h4"
              >
                {Fns.format(date, "EE", { locale })}
              </Mui.Typography>
            </Mui.Grid>
          ))}

          {renderCells()}
        </Mui.Grid>
      </Mui.Grid>
    );
  };

  return renderTable();
};

export default Month;
