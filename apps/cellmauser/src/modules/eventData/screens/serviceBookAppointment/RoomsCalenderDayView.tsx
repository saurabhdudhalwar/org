import { useEffect, useState } from "react";

import * as Mui from "@mui/material";
import * as Fns from "date-fns";
import { eachMinuteOfInterval, format, setHours, setMinutes } from "date-fns";
import _ from "lodash";
import moment from "moment";
import { useSelector } from "react-redux";

import styles from "./DaysCss";
import CellmaPagination from "../../../../common/CellmaPagination";
import useRoomCalenderList from "../../api/useRoomCalenderList";
import t from "../../assets/translationFiles/ServiceBookAppointmentTranslation";
import CallPatientPopup from "../serviceAppointments/CallPatientPopup";

const RoomsCalenderDayView = () => {
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(5);
  const [isCallPatient, setIsCallPatient] = useState(false);
  const { paginationNumber } = useSelector((state: any) => state.common);
  const { selectedDate } = useSelector((state: any) => state?.HpDiary);

  let locale: Fns.Locale;

  let { roomList } = useRoomCalenderList(
    moment(selectedDate).format("DD/MM/YYYY")
  );

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

  const START_TIME = setMinutes(setHours(selectedDate, 0), 0);
  const END_TIME = setMinutes(setHours(selectedDate, 24), 0);
  const hours = eachMinuteOfInterval(
    {
      start: START_TIME,
      end: END_TIME,
    },
    { step: 15 }
  );

  const hFormat = "HH:mm:ss";
  const hoursList: any = [];
  hours?.map((hour: any) => {
    if (!hoursList.includes(format(hour, hFormat, { locale }))) {
      hoursList?.push(format(hour, hFormat, { locale }));
    }
  });

  roomList?.map((room: any) => {
    room.hours = _.cloneDeep(hoursList);
  });

  roomList = roomList?.map((element: any) => {
    element?.appointmentRoomsAvilableSlots?.map((index: any) => {
      if (!element?.hours?.includes(index?.referralAppointmentTime)) {
        element?.hours?.push(index?.referralAppointmentTime);
        element.hours = element?.hours?.sort();
      }
    });
    return element;
  });

  const handleStatus = (time: any, room: any) => {
    let color;
    if (time >= room?.appointmentRoomStart && time < room?.appointmentRoomEnd) {
      room?.appointmentRoomsUnavilableSlot?.map((element: any) => {
        if (
          time >= element?.appointmentRoomsUnavilableSlotStartTime &&
          time < element?.appointmentRoomsUnavilableSlotEndTime
        ) {
          color = "error.light";
        }
      });
      room?.appointmentRoomsAvilableSlots?.map((element: any) => {
        if (time === element?.referralAppointmentTime) {
          color = "warning.light";
        }
      });
      const newColor = color ?? "common.white";
      return newColor;
    }

    return "error.light";
  };

  const showType = (item: any) => {
    let type;
    switch (item) {
      case "new":
        type = "New";
        break;
      case "review":
        type = "Review";
        break;
      case "emergency":
        type = "Emergency";
        break;
      case "walk in":
        type = "Walk In";
        break;
      case "telephoneNew":
        type = "Telephone New";
        break;
      case "vaccineFirstDose":
        type = "Vaccine First Dose";
        break;
      case "vaccineSecondDose":
        type = "Vaccine Second Dose";
        break;
      default:
        type = "";
    }
    return type;
  };

  const renderTable = () => {
    return (
      <Mui.Grid item container xs={12} sx={{ boxShadow: 1 }}>
        <Mui.Grid item container columnSpacing={2}>
          {roomList?.slice(startIndex, endIndex).map((room: any) => (
            <Mui.Grid
              item
              container
              key={room?.appointmentRoomEliId}
              xs={roomList?.length > 5 ? 12 / 5 : 12 / roomList?.length}
            >
              <Mui.Grid item xs={12} sx={styles.hpText}>
                <Mui.Typography
                  variant="h4"
                  sx={{ display: "flex", justifyContent: "center", m: "5px" }}
                >
                  {room?.appointmentRoomName}
                </Mui.Typography>
              </Mui.Grid>

              <Mui.Grid item container sx={styles.mainGrid}>
                {room?.hours?.map((hour: any) => (
                  <Mui.Grid
                    item
                    container
                    xs={12}
                    key={hour}
                    sx={styles.hourBox}
                  >
                    <Mui.Grid
                      item
                      xs={roomList?.length > 1 ? 3 : 0.75}
                      sx={styles.timeGrid}
                    >
                      <Mui.Typography variant="h5">
                        {hour.slice(3, 5) === "00"
                          ? hour.slice(0, 5)
                          : hour.slice(3, 5)}
                      </Mui.Typography>
                    </Mui.Grid>

                    <Mui.Grid
                      item
                      xs={roomList?.length > 1 ? 9 : 11.25}
                      sx={{
                        ...styles.cellBox,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: handleStatus(hour, room),
                      }}
                    >
                      {room?.appointmentRoomsAvilableSlots?.map(
                        (element: any) => (
                          <Mui.Grid key={element?.referralAppointmentId}>
                            {moment(element?.referralAppointmentDate).format(
                              "DD/MM/YYYY"
                            ) &&
                              room?.appointmentRoomName &&
                              hour === element?.referralAppointmentTime && (
                                <Mui.Typography
                                  variant="h5"
                                  style={{ textTransform: "capitalize" }}
                                >
                                  {element?.patientFullName}(
                                  {showType(element?.reaType)}){" "}
                                  {element?.reaStatus}
                                </Mui.Typography>
                              )}
                          </Mui.Grid>
                        )
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
            <CellmaPagination listCount={roomList?.length} maxLength={5} />
          </Mui.Grid>
        </Mui.Grid>
        {isCallPatient && (
          <CallPatientPopup handleClose={() => setIsCallPatient(false)} />
        )}
      </Mui.Grid>
    );
  };

  return renderTable();
};

export default RoomsCalenderDayView;
