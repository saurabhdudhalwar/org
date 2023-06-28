import { useState } from "react";

import { SkipNext, SkipPrevious } from "@mui/icons-material";
import * as Mui from "@mui/material";
import * as Fns from "date-fns";
import { eachMinuteOfInterval, format, setHours, setMinutes } from "date-fns";
import { useSelector } from "react-redux";

import BookRoomPopup from "./BookRoomPopup";
import styles from "./WeeksCss";
import { SLOT_STATUS } from "../../assets/dummyData/ServiceAppointmentsDummyData";
import t from "../../assets/translationFiles/serviceAppointmentTranslation";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {}

const Weeks: React.FC<Props> = (props) => {
  const [isShowRoomBookPopup, setIsShowRoomBookPopup] = useState(false);
  const [isSaveBookedRoom, setIsSaveBookedRoom] = useState(false);
  const [selectedSlotDate, setSelectedSlotDate] = useState<any>();
  const [selectedSlot, setSelectedSlot] = useState<any>();
  const { selectedDate } = useSelector((state: any) => state?.HpDiary);

  let locale: Fns.Locale;

  const selectedHPs = [{ name: "Dr.David" }];

  const weekStart = Fns.startOfWeek(selectedDate, { weekStartsOn: 1 });
  const weekEnd = Fns.endOfWeek(selectedDate, { weekStartsOn: 1 });

  // Function for the week start on index based
  const eachWeekStart = Fns.eachWeekOfInterval(
    {
      start: weekStart,
      end: weekEnd,
    },
    { weekStartsOn: 1 }
  );
  const days = [0, 1, 2, 3, 4, 5, 6];

  // Function for weekday list
  const daysList = days.map((day: any) => Fns.addDays(eachWeekStart[0], day));

  const START_TIME = setMinutes(setHours(selectedDate, 8), 0);
  const END_TIME = setMinutes(setHours(selectedDate, 20), 0);
  const hours = eachMinuteOfInterval(
    {
      start: START_TIME,
      end: END_TIME,
    },
    { step: 15 }
  );

  const hFormat = "hh:mm a";

  const checkSlotStatus = (slot: any, date: any) => {
    let status = "common.white";
    SLOT_STATUS.forEach((element: any) => {
      if (element.time === slot && element.date === date) {
        switch (element.status) {
          case "can't book appointment":
            status = "error.light";
            break;
          case "appointment already booked":
            status = "warning.light";
            break;
          default:
            break;
        }
      } else if (
        isSaveBookedRoom &&
        selectedSlot === slot &&
        selectedSlotDate === date
      ) {
        status = "primary.light";
      }
    });
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
          {selectedHPs.length <= 1 && (
            <Mui.Grid item xs={0.75} sx={styles.headerDays} />
          )}
          <Mui.Grid
            item
            xs={selectedHPs.length <= 1 ? 11.25 : 12}
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
          {selectedHPs.length <= 1 &&
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
                          checkSlotStatus(
                            format(hour, hFormat, { locale }),
                            format(date, "dd/MM/yyyy", { locale })
                          ) === "common.white"
                            ? t("roomScheduleHrs")
                            : checkSlotStatus(
                                format(hour, hFormat, { locale }),
                                format(date, "dd/MM/yyyy", { locale })
                              ) === "error.light"
                            ? t("roomNotAvailable")
                            : t("roomAvailableHrs")
                        }
                        placement="top"
                        arrow
                      >
                        <Mui.Grid
                          item
                          xs={12}
                          sx={{
                            ...styles.cellBox,
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center",
                            backgroundColor: checkSlotStatus(
                              format(hour, hFormat, { locale }),
                              format(date, "dd/MM/yyyy", { locale })
                            ),
                          }}
                          onClick={() => {
                            if (
                              checkSlotStatus(
                                format(hour, hFormat, { locale }),
                                format(date, "dd/MM/yyyy", { locale })
                              ) === "common.white"
                            ) {
                              setIsShowRoomBookPopup(true);
                              setSelectedSlot(
                                format(hour, hFormat, { locale })
                              );
                              setSelectedSlotDate(
                                date
                                // format(date, "dd/MM/yyyy", { locale })
                              );
                            }
                          }}
                        >
                          {isSaveBookedRoom && (
                            <Mui.Typography
                              variant="h5"
                              sx={{
                                display:
                                  selectedSlot ===
                                    format(hour, hFormat, { locale }) &&
                                  selectedSlotDate ===
                                    format(date, "dd/MM/yyyy", { locale })
                                    ? "flex"
                                    : "none",
                                alignItems: "center",
                              }}
                            >
                              &nbsp;{t("roomIsBooked")} &nbsp;
                              {t("reason")}: Test
                            </Mui.Typography>
                          )}
                        </Mui.Grid>
                      </Mui.Tooltip>
                    </Mui.Grid>
                  ))}
                </Mui.Grid>
              </Mui.Grid>
            ))}
        </Mui.Grid>
        {isShowRoomBookPopup && (
          <BookRoomPopup
            selectedSlot={selectedSlot}
            selectedSlotDate={selectedSlotDate}
            handleClose={() => setIsShowRoomBookPopup(false)}
            handleSave={() => setIsSaveBookedRoom(true)}
            handleReset={() => setIsSaveBookedRoom(false)}
          />
        )}
      </Mui.Grid>
    );
  };

  return renderTable();
};

export default Weeks;
