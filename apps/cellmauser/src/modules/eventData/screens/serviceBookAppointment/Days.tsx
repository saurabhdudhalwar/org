import { useEffect, useState } from "react";

import { SkipNext, SkipPrevious } from "@mui/icons-material";
import * as Mui from "@mui/material";
import * as Fns from "date-fns";
import { eachMinuteOfInterval, format, setHours, setMinutes } from "date-fns";
import { useDispatch, useSelector } from "react-redux";

import styles from "./DaysCss";
import ReservedSlotDeletePopup from "./ReservedSlotDeletePopup";
import { SelectPatientPopup } from "./SelectPatientPopup";
import CellmaPagination from "../../../../common/CellmaPagination";
import * as Common from "../../../../common/CommonComponentsIndex";
import { setSnackbar } from "../../../../store/SnackbarAction";
import dispatchSnackbar from "../../../../utils/ResponseCodeHandler";
import {
  useBlockCalendarSlot,
  useDeleteBlockCalendarSlot,
  useReserveCalendarSlot,
} from "../../api/useServiceBookAppointment";
import { SLOT_STATUS } from "../../assets/dummyData/ServiceBookAppointmentDummyData";
import t from "../../assets/translationFiles/ServiceBookAppointmentTranslation";
import { setActiveScreenName } from "../../store/EventDataAction";
import CallPatientPopup from "../serviceAppointments/CallPatientPopup";

interface Props {
  hpDetails?: any;
}

const Days: React.FC<Props> = (props) => {
  const [selectedSlot, setSelectedSlot] = useState<any>();
  const [selectedHP, setSelectedHP] = useState<any>();
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(5);
  const [isCallPatient, setIsCallPatient] = useState(false);
  const [isSlotBlocked, setIsSlotBlocked] = useState(false);
  const [isPatientSelectPopup, setIsPatientSelectPopup] = useState(false);
  const [isReserveSlot, setIsReserveSlot] = useState(false);
  const [isReserveSlotBlock, setIsReserveSlotBlock] = useState(false);
  const [isReservedSlotDeletePopup, setIsReservedSlotDeletePopup] =
    useState(false);
  const { isPatientSelected } = useSelector((state: any) => state.patient);
  const { paginationNumber } = useSelector((state: any) => state.common);
  const { selectedDate } = useSelector((state: any) => state?.HpDiary);
  const {
    isUseSpecialtyAndRegionSetting,
    isAllowToBookOnlineMeeting,
    isEnableBlockingMode,
  } = useSelector((state: any) => state.eventDataReducer);
  const { language } = useSelector((state: any) => state.language);
  const { userName } = useSelector((state: any) => state.auth);

  const dispatch = useDispatch();
  const hpDetails = props?.hpDetails;
  let locale: Fns.Locale;
  useEffect(() => {
    dispatch(setActiveScreenName("DayCalender"));
  }, []);

  const resId = 50;
  // Api call block calendar slot
  const { mutate: blockCalendarSlot } = useBlockCalendarSlot();

  // Api call delete blocked calendar slot ]
  const { mutate: deleteBlockCalendarSlot } = useDeleteBlockCalendarSlot();

  // Api call reserve calendar slot
  const { mutate: reserveCalendarSlot } = useReserveCalendarSlot();

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

  const hFormat = "hh:mm a";

  const selectedHPs = isUseSpecialtyAndRegionSetting
    ? [
        { name: "Dr.David", slots: SLOT_STATUS },
        { name: "Dr.John", slots: SLOT_STATUS },
        { name: "Dr.Henry", slots: SLOT_STATUS },
        { name: "Dr.Smith", slots: SLOT_STATUS },
        { name: "Dr.Jyo", slots: SLOT_STATUS },
        { name: "Dr.Veer", slots: SLOT_STATUS },
        { name: "Dr.JLR", slots: SLOT_STATUS },
        { name: "Dr.Abcd", slots: SLOT_STATUS },
      ]
    : [{ name: "Dr.David", slots: SLOT_STATUS }];

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
          case "slot already blocked":
            status = isEnableBlockingMode && "warning.300";
            break;
          default:
            break;
        }
      } else if (selectedSlot === slot && selectedHP === name) {
        status = isEnableBlockingMode
          ? isSlotBlocked
            ? "warning.300"
            : "common.white"
          : "primary.light";
      }
    });
    return status;
  };

  console.log(isReserveSlotBlock, "isReserveSlotBlock");

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

                    <Mui.Grid
                      item
                      xs={selectedHPs.length > 1 ? 9 : 11.25}
                      sx={{
                        ...styles.cellBox,
                        display: "flex",
                        justifyContent:
                          isAllowToBookOnlineMeeting || isEnableBlockingMode
                            ? "flex-start"
                            : "center",
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
                          // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                          if (
                            !isAllowToBookOnlineMeeting &&
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
                            setSelectedHP("Dr.David");
                            setSelectedSlot(format(hour, hFormat, { locale }));
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
                                      setSelectedHP(hp.name);
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
                      }}
                    >
                      {/* isAllowToBookOnlineMeeting setting is ON */}
                      {isAllowToBookOnlineMeeting && (
                        <Mui.Grid
                          container
                          sx={{
                            display:
                              selectedSlot ===
                                format(hour, hFormat, { locale }) &&
                              selectedHP === hp.name
                                ? "flex"
                                : "none",
                            alignItems: "center",
                            paddingX: "10px",
                          }}
                        >
                          <Mui.Grid item xs={11}>
                            <Common.CellmaLink
                              label={t("ScheduledJoinTeamsMeeting")}
                              onClick={() => {
                                setIsCallPatient(true);
                              }}
                            >
                              Miss. Kasturi Kusurkar&nbsp;
                              {t("ScheduledJoinTeamsMeeting")}
                            </Common.CellmaLink>
                          </Mui.Grid>
                          <Mui.Grid
                            xs={1}
                            sx={{
                              display: "flex",
                              justifyContent: "flex-end",
                            }}
                          >
                            <Common.CellmaLink label={t("add")}>
                              {t("add")}
                            </Common.CellmaLink>
                          </Mui.Grid>
                        </Mui.Grid>
                      )}
                      {isReserveSlot && !isEnableBlockingMode && (
                        <Mui.Grid
                          container
                          sx={{
                            display:
                              selectedSlot ===
                                format(hour, hFormat, { locale }) &&
                              selectedHP === hp.name
                                ? "flex"
                                : "none",
                            alignItems: "center",
                          }}
                        >
                          {isReserveSlotBlock && (
                            <>
                              <Mui.Grid item xs={11} sx={{ marginTop: "2px" }}>
                                <Mui.Typography
                                  variant="h4"
                                  sx={{ marginLeft: "10px" }}
                                >
                                  {t("reservedBy")} {userName}
                                </Mui.Typography>
                              </Mui.Grid>

                              <Mui.Grid xs={1} sx={styles.unblockButtonGrid}>
                                <Common.CellmaButton
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
                      {/* isEnableBlockingMode is ON and If another user blocked the slot */}
                      {isEnableBlockingMode &&
                        SLOT_STATUS.map((slotBlocked: any) => (
                          <Mui.Grid
                            item
                            sx={styles.userSlotGrid}
                            key={slotBlocked.time}
                          >
                            {slotBlocked?.time ===
                              format(hour, hFormat, { locale }) &&
                              slotBlocked.status === "slot already blocked" && (
                                <Mui.Typography
                                  variant="h4"
                                  sx={{ marginLeft: "10px" }}
                                >
                                  {t("blockedBy")} Kanchan Jaryal
                                </Mui.Typography>
                              )}
                          </Mui.Grid>
                        ))}
                      {/* isEnableBlockingMode is ON and if user want to block slot */}
                      {isEnableBlockingMode && (
                        <Mui.Grid
                          container
                          sx={{
                            display:
                              selectedSlot ===
                                format(hour, hFormat, { locale }) &&
                              selectedHP === hp.name
                                ? "flex"
                                : "none",
                            alignItems: "center",
                          }}
                        >
                          {isSlotBlocked && (
                            <>
                              <Mui.Grid item xs={11} sx={{ marginTop: "2px" }}>
                                <Mui.Typography
                                  variant="h4"
                                  sx={{ marginLeft: "10px" }}
                                >
                                  {t("blockedBy")} {userName}
                                </Mui.Typography>
                              </Mui.Grid>

                              <Mui.Grid xs={1} sx={styles.unblockButtonGrid}>
                                <Common.CellmaButton
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
                                            setSelectedSlot("");
                                            setSelectedHP("");
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

                      {!isEnableBlockingMode &&
                        !isAllowToBookOnlineMeeting &&
                        !isReserveSlot && (
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
                            }}
                          >
                            {format(hour, hFormat, { locale })} - Dummy Data
                          </Mui.Typography>
                        )}
                    </Mui.Grid>
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
        {isCallPatient && (
          <CallPatientPopup handleClose={() => setIsCallPatient(false)} />
        )}
        {isPatientSelectPopup && (
          <SelectPatientPopup
            handleClose={() => {
              setIsPatientSelectPopup(false);
            }}
          />
        )}
        {isReservedSlotDeletePopup && (
          <ReservedSlotDeletePopup
            handleCancel={() => setIsReservedSlotDeletePopup(false)}
            handleReservedSlot={() => setIsReserveSlotBlock(false)}
            handleSelectedSlot={() => setSelectedSlot("")}
            handleSelectedHPAndDate={() => setSelectedHP("")}
            resId={resId}
          />
        )}
      </Mui.Grid>
    );
  };

  return renderTable();
};

export default Days;
