import { useEffect, useState } from "react";

import { SkipNext, SkipPrevious } from "@mui/icons-material";
import * as Mui from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import styles from "./AvailableSlotsForMultipleHpCss";
import CellmaPagination from "../../../../common/CellmaPagination";
import * as Common from "../../../../common/CommonComponentsIndex";
import { setSnackbar } from "../../../../store/SnackbarAction";
import {
  AFTERNOON_AVAILABLE_SLOTS,
  EVENING_AVAILABLE_SLOTS,
  MORNING_AVAILABLE_SLOTS,
} from "../../assets/dummyData/ServiceBookAppointmentDummyData";
import t from "../../assets/translationFiles/ServiceBookAppointmentTranslation";

interface Props {
  slotDetails: any;
}

const HEALTH_PROFESSIONAL = [
  {
    id: 1,
    name: "Dr. John",
    MORNING_AVAILABLE_SLOTS,
    AFTERNOON_AVAILABLE_SLOTS,
    EVENING_AVAILABLE_SLOTS,
  },
  {
    id: 2,
    name: "Dr. Henry",
    MORNING_AVAILABLE_SLOTS,
    AFTERNOON_AVAILABLE_SLOTS,
    EVENING_AVAILABLE_SLOTS,
  },
  {
    id: 3,
    name: "Dr. Smith",
    MORNING_AVAILABLE_SLOTS,
    AFTERNOON_AVAILABLE_SLOTS,
    EVENING_AVAILABLE_SLOTS,
  },
  {
    id: 4,
    name: "Emma Hooper",
    MORNING_AVAILABLE_SLOTS,
    AFTERNOON_AVAILABLE_SLOTS,
    EVENING_AVAILABLE_SLOTS,
  },
  {
    id: 5,
    name: "Sarie Cross",
    MORNING_AVAILABLE_SLOTS,
    AFTERNOON_AVAILABLE_SLOTS,
    EVENING_AVAILABLE_SLOTS,
  },
  {
    id: 6,
    name: "Laura Merwood",
    MORNING_AVAILABLE_SLOTS,
    AFTERNOON_AVAILABLE_SLOTS,
    EVENING_AVAILABLE_SLOTS,
  },
  {
    id: 7,
    name: "DK Merwood",
    MORNING_AVAILABLE_SLOTS,
    AFTERNOON_AVAILABLE_SLOTS,
    EVENING_AVAILABLE_SLOTS,
  },
  {
    id: 8,
    name: "JLR Dec",
    MORNING_AVAILABLE_SLOTS,
    AFTERNOON_AVAILABLE_SLOTS,
    EVENING_AVAILABLE_SLOTS,
  },
];

const AvailableSlotsForMultipleHp: React.FC<Props> = (props) => {
  const { selectedDate } = useSelector((state: any) => state?.HpDiary);
  const [selectedSlot, setSelectedSlot] = useState();
  const [selectedHp, setSelectedHp] = useState();
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(5);
  const dispatch = useDispatch();
  const { paginationNumber } = useSelector((state: any) => state.common);

  // selector for get the selected slot details value from store
  const { selectedSlotDetails } = useSelector(
    (state: any) => state?.eventDataReducer
  );
  useEffect(() => {
    window.scroll(0, 0);
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

  const renderTable = () => {
    return (
      <Mui.Grid item container xs={12} sx={{ boxShadow: 1 }}>
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
        <Mui.Grid container item>
          {HEALTH_PROFESSIONAL.slice(startIndex, endIndex).map((hp: any) => (
            <Mui.Grid
              container
              item
              sx={{ borderRight: 1, borderLeft: 1, borderColor: "grey.100" }}
              key={hp.id}
              xs={
                HEALTH_PROFESSIONAL.length <= 5
                  ? 12 / HEALTH_PROFESSIONAL.length
                  : 12 / 5
              }
            >
              <Mui.Grid item container sx={styles.hpHeaderGrid}>
                {/*  Hp Name Header  */}
                <Mui.Grid item xs={12} key={hp.id}>
                  <Mui.Typography sx={styles.headerDays} variant="h4">
                    {hp.name}
                  </Mui.Typography>
                </Mui.Grid>
              </Mui.Grid>
              {/* Morning slot start */}
              <Mui.Grid item container sx={styles.mainGrid} padding={2}>
                <Mui.Grid item xs={12}>
                  <Mui.Typography variant="h5" sx={styles.slotsTextGrid}>
                    {t("morning")}
                  </Mui.Typography>
                </Mui.Grid>
                <Mui.Grid item container xs={12} sx={styles.slotsGridIem}>
                  {hp.MORNING_AVAILABLE_SLOTS.map((availableSlot: any) => (
                    <Mui.Grid
                      item
                      xs={12}
                      sx={styles.slotButtonGrid}
                      key={availableSlot.id}
                    >
                      <Common.CellmaButton
                        label={
                          selectedSlotDetails?.availableSlot ===
                            availableSlot.time &&
                          selectedSlotDetails?.hpName === hp.name ? (
                            <Mui.Typography variant="h4" sx={styles.hpText}>
                              Miss. Kasturi Kusurkar (Appointment)
                            </Mui.Typography>
                          ) : (
                            availableSlot.time
                          )
                        }
                        borderColor={
                          selectedSlot === availableSlot.time &&
                          selectedHp === hp.name
                            ? "primary.main"
                            : "primary.light"
                        }
                        color="common.black"
                        backgroundColor={
                          selectedSlotDetails?.availableSlot ===
                            availableSlot.time &&
                          selectedSlotDetails?.hpName === hp.name
                            ? "warning.light"
                            : selectedSlot === availableSlot.time &&
                              selectedHp === hp.name
                            ? "primary.light"
                            : "common.white"
                        }
                        borderRadius={2}
                        onClick={() => {
                          if (
                            selectedSlotDetails?.availableSlot ===
                              availableSlot.time &&
                            selectedSlotDetails?.hpName === hp.name
                          ) {
                            // No any action perform when slot is booked
                          } else {
                            setSelectedSlot(availableSlot.time);
                            setSelectedHp(hp.name);
                            props.slotDetails({
                              availableSlot: availableSlot.time,
                              hpName: hp.name,
                            });
                            dispatch(
                              setSnackbar(
                                true,
                                "success",
                                `${t("appointmentSlotSelectedFor")} ${
                                  availableSlot.time
                                }`,
                                2
                              )
                            );
                          }
                        }}
                      />
                    </Mui.Grid>
                  ))}
                </Mui.Grid>
              </Mui.Grid>
              {/* Afternoon slot start */}
              <Mui.Grid item container sx={styles.mainGrid} padding={2}>
                <Mui.Grid item xs={12}>
                  <Mui.Typography variant="h5" sx={styles.slotsTextGrid}>
                    {t("afternoon")}
                  </Mui.Typography>
                </Mui.Grid>
                <Mui.Grid item container xs={12} sx={styles.slotsGridIem}>
                  {hp.AFTERNOON_AVAILABLE_SLOTS.map((availableSlot: any) => (
                    <Mui.Grid
                      item
                      xs={12}
                      sx={styles.slotButtonGrid}
                      key={availableSlot.id}
                    >
                      <Common.CellmaButton
                        label={
                          selectedSlotDetails?.availableSlot ===
                            availableSlot.time &&
                          selectedSlotDetails?.hpName === hp.name ? (
                            <Mui.Typography variant="h4" sx={styles.hpText}>
                              Miss. Kasturi Kusurkar (Appointment)
                            </Mui.Typography>
                          ) : (
                            availableSlot.time
                          )
                        }
                        borderColor={
                          selectedSlot === availableSlot.time &&
                          selectedHp === hp.name
                            ? "primary.main"
                            : "primary.light"
                        }
                        color="common.black"
                        backgroundColor={
                          selectedSlotDetails?.availableSlot ===
                            availableSlot.time &&
                          selectedSlotDetails?.hpName === hp.name
                            ? "warning.light"
                            : selectedSlot === availableSlot.time &&
                              selectedHp === hp.name
                            ? "primary.light"
                            : "common.white"
                        }
                        borderRadius={2}
                        onClick={() => {
                          if (
                            selectedSlotDetails?.availableSlot ===
                              availableSlot.time &&
                            selectedSlotDetails?.hpName === hp.name
                          ) {
                            // No any action perform when slot is booked
                          } else {
                            setSelectedSlot(availableSlot.time);
                            setSelectedHp(hp.name);
                            props.slotDetails({
                              availableSlot: availableSlot.time,
                              hpName: hp.name,
                            });
                            dispatch(
                              setSnackbar(
                                true,
                                "success",
                                `${t("appointmentSlotSelectedFor")} ${
                                  availableSlot.time
                                }`,
                                2
                              )
                            );
                          }
                        }}
                      />
                    </Mui.Grid>
                  ))}
                </Mui.Grid>
              </Mui.Grid>
              {/* Evening Slot start */}
              <Mui.Grid item container sx={styles.mainGrid} padding={2}>
                <Mui.Grid item xs={12}>
                  <Mui.Typography variant="h6" sx={styles.slotsTextGrid}>
                    {t("evening")}
                  </Mui.Typography>
                </Mui.Grid>
                <Mui.Grid item container xs={12} sx={styles.slotsGridIem}>
                  {hp.EVENING_AVAILABLE_SLOTS.map((availableSlot: any) => (
                    <Mui.Grid
                      item
                      xs={12}
                      sx={styles.slotButtonGrid}
                      key={availableSlot.id}
                    >
                      <Common.CellmaButton
                        label={
                          selectedSlotDetails?.availableSlot ===
                            availableSlot.time &&
                          selectedSlotDetails?.hpName === hp.name ? (
                            <Mui.Typography variant="h4" sx={styles.hpText}>
                              Miss. Kasturi Kusurkar (Appointment)
                            </Mui.Typography>
                          ) : (
                            availableSlot.time
                          )
                        }
                        borderColor={
                          selectedSlot === availableSlot.time &&
                          selectedHp === hp.name
                            ? "primary.main"
                            : "primary.light"
                        }
                        color="common.black"
                        backgroundColor={
                          selectedSlotDetails?.availableSlot ===
                            availableSlot.time &&
                          selectedSlotDetails?.hpName === hp.name
                            ? "warning.light"
                            : selectedSlot === availableSlot.time &&
                              selectedHp === hp.name
                            ? "primary.light"
                            : "common.white"
                        }
                        borderRadius={2}
                        onClick={() => {
                          if (
                            selectedSlotDetails?.availableSlot ===
                              availableSlot.time &&
                            selectedSlotDetails?.hpName === hp.name
                          ) {
                            // No any action perform when slot is booked
                          } else {
                            setSelectedSlot(availableSlot.time);
                            setSelectedHp(hp.name);
                            props.slotDetails({
                              availableSlot: availableSlot.time,
                              hpName: hp.name,
                            });
                            dispatch(
                              setSnackbar(
                                true,
                                "success",
                                `${t("appointmentSlotSelectedFor")} ${
                                  availableSlot.time
                                }`,
                                2
                              )
                            );
                          }
                        }}
                      />
                    </Mui.Grid>
                  ))}
                </Mui.Grid>
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
            <CellmaPagination
              listCount={HEALTH_PROFESSIONAL.length}
              maxLength={5}
            />
          </Mui.Grid>
        </Mui.Grid>
      </Mui.Grid>
    );
  };

  return renderTable();
};

export default AvailableSlotsForMultipleHp;
