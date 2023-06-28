import { useEffect, useState } from "react";

import { SkipNext, SkipPrevious } from "@mui/icons-material";
import * as Mui from "@mui/material";
import * as Fns from "date-fns";
import { eachMinuteOfInterval, format, setHours, setMinutes } from "date-fns";
import { useDispatch, useSelector } from "react-redux";

import ReservedSlotDeletePopup from "./ReservedSlotDeletePopup";
import { SelectPatientPopup } from "./SelectPatientPopup";
import styles from "./WeeksCss";
import CellmaButton from "../../../../common/CellmaButton";
import { setSnackbar } from "../../../../store/SnackbarAction";
import dispatchSnackbar from "../../../../utils/ResponseCodeHandler";
import { setSelectedDate } from "../../../user/store/HpDiaryAction";
import {
  useBlockCalendarSlot,
  useDeleteBlockCalendarSlot,
  useReserveCalendarSlot,
} from "../../api/useServiceBookAppointment";
import { SLOT_STATUS } from "../../assets/dummyData/ServiceBookAppointmentDummyData";
import t from "../../assets/translationFiles/ServiceBookAppointmentTranslation";
import { setActiveScreenName } from "../../store/EventDataAction";

interface Props {
  onSlotSelection?: any;
  hpDetails?: any;
}

const Weeks: React.FC<Props> = (props) => {
  const [selectedSlot, setSelectedSlot] = useState<any>();
  const [selectedSlotDate, setSelectedSlotDate] = useState<any>();
  const [isSlotBlocked, setIsSlotBlocked] = useState(false);
  const [isPatientSelectPopup, setIsPatientSelectPopup] = useState(false);
  const [isReserveSlot, setIsReserveSlot] = useState(false);
  const [isReserveSlotBlock, setIsReserveSlotBlock] = useState(false);
  const [isReservedSlotDeletePopup, setIsReservedSlotDeletePopup] =
    useState(false);
  const { isPatientSelected } = useSelector((state: any) => state.patient);
  const { selectedDate } = useSelector((state: any) => state?.HpDiary);
  const { isUseSpecialtyAndRegionSetting, isEnableBlockingMode } = useSelector(
    (state: any) => state.eventDataReducer
  );
  const { language } = useSelector((state: any) => state.language);
  const { userName } = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();
  const hpDetails = props?.hpDetails;
  const resId = 51;
  // Api call block calendar slot in week view
  const { mutate: blockCalendarSlot } = useBlockCalendarSlot();

  // Api call delete blocked calendar slot in week view
  const { mutate: deleteBlockCalendarSlot } = useDeleteBlockCalendarSlot();

  // Api call reserve calendar slot
  const { mutate: reserveCalendarSlot } = useReserveCalendarSlot();

  let locale: Fns.Locale;

  useEffect(() => {
    dispatch(setActiveScreenName("weekCalender"));
  }, []);

  const selectedHPs = isUseSpecialtyAndRegionSetting
    ? [
        { name: "Dr.David" },
        { name: "Dr.John" },
        { name: "Dr.Henry" },
        { name: "Dr.Smith" },
        { name: "Dr.Jyo" },
        { name: "Dr.Veer" },
      ]
    : [{ name: "Dr.David" }];

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
          case "slot already blocked":
            status = isEnableBlockingMode && "warning.300";
            break;
          default:
            break;
        }
      } else if (selectedSlot === slot && selectedSlotDate === date) {
        status = isEnableBlockingMode
          ? isSlotBlocked
            ? "warning.300"
            : "common.white"
          : "primary.light";
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
          {selectedHPs.length > 1 &&
            daysList.map((date: any) => (
              <Mui.Grid
                item
                container
                xs={12 / 7}
                onClick={() => {
                  dispatch(setSelectedDate(date));
                  props.onSlotSelection();
                }}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  border: 1,
                  borderColor: "grey.200",
                  "&:hover": {
                    border: 1,
                    borderColor: "grey.400",
                    boxShadow: 5,
                    cursor: "pointer",
                  },
                }}
                key={date}
              >
                {selectedHPs.map((hp: any) => (
                  <Mui.Grid
                    item
                    xs={12}
                    key={hp}
                    sx={{
                      border: 1,
                      borderColor: "grey.200",
                      borderRadius: "5px",
                      backgroundColor: "primary.light",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      m: "5px",
                      "&:hover": {
                        cursor: "pointer",
                      },
                    }}
                  >
                    {hp.name}
                  </Mui.Grid>
                ))}
              </Mui.Grid>
            ))}
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
                            if (
                              !isEnableBlockingMode &&
                              !isReserveSlot &&
                              isPatientSelected
                            ) {
                              dispatch(
                                setSnackbar(
                                  true,
                                  "success",
                                  `${t("appointmentSlotFor")} ${format(
                                    hour,
                                    hFormat,
                                    {
                                      locale,
                                    }
                                  )} ${t("isSelected")}`,
                                  2
                                )
                              );
                            }
                            if (!isEnableBlockingMode && !isPatientSelected) {
                              setIsPatientSelectPopup(true);
                              reserveCalendarSlot(
                                {
                                  hour: parseInt(
                                    format(hour, "H", { locale }),
                                    10
                                  ),
                                  minute: parseInt(
                                    format(hour, "mm", { locale }),
                                    10
                                  ),
                                  duration: 1,
                                  date: format(selectedDate, "dd/MM/yyyy", {
                                    locale,
                                  }),
                                  espId: hpDetails?.espId ?? "",
                                  clinicTypeEliId: parseInt(
                                    hpDetails?.clinicTypeEliId,
                                    10
                                  ),
                                  clinicTypeLocationEliId: parseInt(
                                    hpDetails?.clinicTypeLocationEliId,
                                    10
                                  ),
                                  resBlocking: "0",
                                },
                                {
                                  onSuccess: (response: any) => {
                                    if (response.status === 200) {
                                      const responseCode =
                                        response?.data?.validationCode;

                                      if (
                                        responseCode ===
                                        "appointment.slot.reserve.success"
                                      ) {
                                        setIsReserveSlot(true);
                                        setIsReserveSlotBlock(true);
                                      }
                                    }
                                  },
                                }
                              );

                              setSelectedSlotDate(
                                format(date, "dd/MM/yyyy", { locale })
                              );
                              setSelectedSlot(
                                format(hour, hFormat, { locale })
                              );
                            }
                            if (isEnableBlockingMode) {
                              blockCalendarSlot(
                                {
                                  hour: parseInt(
                                    format(hour, "H", { locale }),
                                    10
                                  ),
                                  minute: parseInt(
                                    format(hour, "mm", { locale }),
                                    10
                                  ),
                                  duration: 1,
                                  date: format(date, "dd/MM/yyyy", {
                                    locale,
                                  }),
                                  espId: hpDetails?.espId ?? "",
                                  clinicTypeEliId: parseInt(
                                    hpDetails?.clinicTypeEliId,
                                    10
                                  ),
                                  clinicTypeLocationEliId: parseInt(
                                    hpDetails?.clinicTypeLocationEliId,
                                    10
                                  ),
                                  durationModifier: 1,
                                  clinicLocationEliText:
                                    hpDetails?.clinicLocationEliText ?? "",
                                  clinicTypeEliText:
                                    hpDetails?.clinicTypeEliText ?? "",
                                },
                                {
                                  onSuccess: (response: any) => {
                                    if (response.status === 200) {
                                      const responseCode =
                                        response?.data?.validationCode;
                                      if (
                                        responseCode ===
                                        "appointment.calendar.block.slot.success"
                                      ) {
                                        setSelectedSlot(
                                          format(hour, hFormat, { locale })
                                        );
                                        setSelectedSlotDate(
                                          format(date, "dd/MM/yyyy", {
                                            locale,
                                          })
                                        );
                                        setIsSlotBlocked(true);
                                        dispatchSnackbar(
                                          response,
                                          dispatch,
                                          language
                                        );
                                      }
                                    }
                                  },
                                }
                              );
                            }
                          }
                          setIsReserveSlot(true);
                        }}
                      >
                        {isReserveSlot && !isEnableBlockingMode && (
                          <Mui.Grid
                            container
                            sx={{
                              overflowX: "auto",
                              overflowY: "hidden",
                              scrollbarWidth: "thin",
                              "&::-webkit-scrollbar": {
                                display: "none",
                              },
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
                            {isReserveSlotBlock && (
                              <>
                                <Mui.Grid
                                  item
                                  xs={12}
                                  sx={{
                                    marginTop: "3px",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                  }}
                                >
                                  <Mui.Typography
                                    variant="h4"
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
                                    {t("reservedBy")} {userName}
                                  </Mui.Typography>
                                </Mui.Grid>

                                <Mui.Grid xs={12} sx={styles.weekUnBlockButton}>
                                  <CellmaButton
                                    label={t("delete")}
                                    height="25px"
                                    onClick={() => {
                                      setIsReservedSlotDeletePopup(true);
                                    }}
                                  />
                                </Mui.Grid>
                              </>
                            )}
                          </Mui.Grid>
                        )}
                        {isEnableBlockingMode &&
                          SLOT_STATUS.map((slotBlocked: any) => (
                            <Mui.Grid
                              item
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                marginTop: "2px",
                              }}
                              key={slotBlocked.time}
                            >
                              {slotBlocked?.time ===
                                format(hour, hFormat, { locale }) &&
                                slotBlocked?.date ===
                                  format(date, "dd/MM/yyyy", { locale }) &&
                                slotBlocked.status ===
                                  "slot already blocked" && (
                                  <Mui.Typography
                                    variant="h4"
                                    sx={{
                                      paddingLeft: "2px",
                                      display: "flex",
                                      justifyContent: "center",
                                    }}
                                  >
                                    {t("blockedBy")} Kanchan
                                  </Mui.Typography>
                                )}
                            </Mui.Grid>
                          ))}
                        {isEnableBlockingMode && (
                          <Mui.Grid
                            container
                            sx={{
                              overflowX: "auto",
                              overflowY: "hidden",
                              scrollbarWidth: "thin",
                              "&::-webkit-scrollbar": {
                                display: "none",
                              },
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
                            {isSlotBlocked && (
                              <>
                                <Mui.Grid
                                  item
                                  xs={12}
                                  sx={{
                                    marginTop: "3px",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                  }}
                                >
                                  <Mui.Typography
                                    variant="h4"
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
                                    {t("blockedBy")} {userName}
                                  </Mui.Typography>
                                </Mui.Grid>

                                <Mui.Grid xs={12} sx={styles.weekUnBlockButton}>
                                  <CellmaButton
                                    label={t("unblock")}
                                    height="25px"
                                    onClick={() => {
                                      deleteBlockCalendarSlot(resId, {
                                        onSuccess: (response: any) => {
                                          if (response.status === 200) {
                                            if (
                                              response?.data?.validationCode ===
                                              "appointment.calendar.block.slot.deleted"
                                            ) {
                                              setIsSlotBlocked(false);
                                            }
                                            dispatchSnackbar(
                                              response,
                                              dispatch,
                                              language
                                            );
                                          }
                                        },
                                      });
                                    }}
                                  />
                                </Mui.Grid>
                              </>
                            )}
                          </Mui.Grid>
                        )}
                        {!isEnableBlockingMode && !isReserveSlot && (
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
                            {format(hour, hFormat, { locale })} - Dummy data
                          </Mui.Typography>
                        )}
                      </Mui.Grid>
                    </Mui.Grid>
                  ))}
                </Mui.Grid>
              </Mui.Grid>
            ))}{" "}
        </Mui.Grid>
        {isReservedSlotDeletePopup && (
          <ReservedSlotDeletePopup
            handleCancel={() => setIsReservedSlotDeletePopup(false)}
            handleReservedSlot={() => setIsReserveSlotBlock(false)}
            handleSelectedSlot={() => setSelectedSlot("")}
            handleSelectedHPAndDate={() => setSelectedSlotDate("")}
            resId={resId}
          />
        )}
        {isPatientSelectPopup && (
          <SelectPatientPopup
            handleClose={() => {
              setIsPatientSelectPopup(false);
            }}
          />
        )}
      </Mui.Grid>
    );
  };

  return renderTable();
};

export default Weeks;
