import { useEffect, useState } from "react";

import { SkipNext, SkipPrevious } from "@mui/icons-material";
import * as Mui from "@mui/material";
import * as Fns from "date-fns";
import { eachMinuteOfInterval, format, setHours, setMinutes } from "date-fns";
import { useSelector } from "react-redux";

import BookRoomPopup from "./BookRoomPopup";
import styles from "./DaysCss";
import CellmaPagination from "../../../../common/CellmaPagination";
import { SLOT_STATUS } from "../../assets/dummyData/ServiceAppointmentsDummyData";
import t from "../../assets/translationFiles/serviceAppointmentTranslation";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {}

const Days: React.FC<Props> = () => {
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(5);
  const [isSaveBookedRoom, setIsSaveBookedRoom] = useState(false);
  const [isShowRoomBookPopup, setIsShowRoomBookPopup] = useState(false);
  const [selectedHP, setSelectedHP] = useState<any>();
  const [selectedSlot, setSelectedSlot] = useState<any>();
  const { paginationNumber } = useSelector((state: any) => state.common);
  const { selectedDate } = useSelector((state: any) => state?.HpDiary);

  let locale: Fns.Locale;

  useEffect(() => {
    // Pagination for if record found more than 5
    if (paginationNumber === 1 || paginationNumber === undefined) {
      setStartIndex(0);
      setEndIndex(5);
    } else {
      setStartIndex(5);
      setEndIndex(10);
    }
    // eslint-disable-next-line
  }, [paginationNumber]);

  const START_TIME = setMinutes(setHours(selectedDate, 8), 0);
  const END_TIME = setMinutes(setHours(selectedDate, 20), 0);
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

  const selectedHPs = [{ name: "Dr.David", slots: SLOT_STATUS }];

  // useEffect(() => {

  // }, []);

  const checkSlotStatus = (slot: any, name: any) => {
    let status = "common.white";
    SLOT_STATUS.forEach((element: any) => {
      if (element.time === slot) {
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
        selectedHP === name
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
                {selectedDate.toString().slice(4, 15)}
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
          {selectedHPs.length === 1 && (
            <Mui.Grid item xs={12} sx={{ backgroundColor: "primary.light" }}>
              <Mui.Typography
                variant="h5"
                sx={{ display: "flex", justifyContent: "center" }}
              >
                {weekDays[selectedDate.getDay()]}
              </Mui.Typography>
            </Mui.Grid>
          )}
        </Mui.Grid>
        <Mui.Grid item container>
          {selectedHPs.slice(startIndex, endIndex).map((hp: any) => (
            <Mui.Grid
              item
              container
              key={hp}
              xs={selectedHPs.length > 5 ? 12 / 5 : 12 / selectedHPs.length}
            >
              {selectedHPs.length > 1 && (
                <Mui.Grid item xs={12} sx={styles.hpText}>
                  <Mui.Typography
                    variant="h5"
                    sx={{ display: "flex", justifyContent: "center" }}
                  >
                    {hp.name}
                  </Mui.Typography>
                </Mui.Grid>
              )}
              <Mui.Grid item container sx={styles.mainGrid}>
                {hours.map((hour) => (
                  <Mui.Grid
                    item
                    container
                    xs={12}
                    key={hour.getTime()}
                    sx={styles.hourBox}
                  >
                    <Mui.Grid
                      item
                      xs={selectedHPs.length > 1 ? 3 : 0.75}
                      sx={styles.timeGrid}
                    >
                      <Mui.Typography variant="h5">
                        {format(hour, hFormat, { locale }).slice(3, 5) === "00"
                          ? format(hour, hFormat, { locale }).slice(0, 5)
                          : format(hour, hFormat, { locale }).slice(3, 5)}
                      </Mui.Typography>
                    </Mui.Grid>

                    <Mui.Tooltip
                      title={
                        checkSlotStatus(
                          format(hour, hFormat, { locale }),
                          hp.name
                        ) === "common.white"
                          ? t("roomScheduleHrs")
                          : checkSlotStatus(
                              format(hour, hFormat, { locale }),
                              hp.name
                            ) === "error.light"
                          ? t("roomNotAvailable")
                          : t("roomAvailableHrs")
                      }
                      placement="top"
                      arrow
                    >
                      <Mui.Grid
                        item
                        xs={selectedHPs.length > 1 ? 9 : 11.25}
                        sx={{
                          ...styles.cellBox,
                          display: "flex",
                          justifyContent: "flex-start",
                          paddingLeft: "20px",
                          backgroundColor: checkSlotStatus(
                            format(hour, hFormat, { locale }),
                            hp.name
                          ),
                        }}
                        onClick={() => {
                          if (
                            checkSlotStatus(
                              format(hour, hFormat, { locale }),
                              hp.name
                            ) === "common.white"
                          ) {
                            setIsShowRoomBookPopup(true);
                            setSelectedSlot(format(hour, hFormat, { locale }));
                            setSelectedHP(hp.name);
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
                                selectedHP === hp.name
                                  ? "flex"
                                  : "none",
                              alignItems: "center",
                              justifyContent: "flex-start",
                            }}
                          >
                            {t("roomIsBooked")}
                            <Mui.Typography
                              variant="h5"
                              sx={{ marginLeft: "200px" }}
                            >
                              {t("reason")}: Test
                            </Mui.Typography>
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
        <Mui.Grid container item>
          <Mui.Grid
            item
            xs={12}
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              paddingY: "10px",
            }}
          >
            {/* Pagination if hp founds more than 5  */}
            <CellmaPagination listCount={selectedHPs.length} maxLength={5} />
          </Mui.Grid>
        </Mui.Grid>
        {isShowRoomBookPopup && (
          <BookRoomPopup
            selectedSlot={selectedSlot}
            selectedSlotDate={selectedDate}
            handleClose={() => {
              setIsShowRoomBookPopup(false);
            }}
            handleSave={() => setIsSaveBookedRoom(true)}
            handleReset={() => setIsSaveBookedRoom(false)}
          />
        )}
      </Mui.Grid>
    );
  };

  return renderTable();
};

export default Days;
