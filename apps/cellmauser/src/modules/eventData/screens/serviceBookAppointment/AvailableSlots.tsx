import { useState } from "react";

import { SkipNext, SkipPrevious } from "@mui/icons-material";
import * as Mui from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import * as Common from "../../../../common/CommonComponentsIndex";
import { setSnackbar } from "../../../../store/SnackbarAction";
import * as dummyData from "../../assets/dummyData/ServiceBookAppointmentDummyData";
import t from "../../assets/translationFiles/ServiceBookAppointmentTranslation";

export const AvailableSlots = () => {
  const [slotBooked, setSlotBooked] = useState();
  const dispatch = useDispatch();

  return (
    <Mui.Grid container spacing={3}>
      <Mui.Grid container item>
        <Mui.Grid container item>
          <Mui.Grid item xs={11.3}>
            <Mui.Typography variant="h2" sx={styles.slotsTextGrid}>
              {t("morning")}
            </Mui.Typography>
          </Mui.Grid>

          <Mui.Grid item xs={0.7} sx={styles.previousAndNextIconGrid}>
            <Mui.IconButton
              size="small"
              aria-label="Previous"
              data-testid="previous"
            >
              <Mui.Tooltip title={t("previous")} placement="left" arrow>
                <SkipPrevious sx={styles.previousAndNextIcon} />
              </Mui.Tooltip>
            </Mui.IconButton>
            <Mui.IconButton size="small" aria-label="Next" data-testid="next">
              <Mui.Tooltip title={t("next")} placement="right" arrow>
                <SkipNext sx={styles.previousAndNextIcon} />
              </Mui.Tooltip>
            </Mui.IconButton>
          </Mui.Grid>
        </Mui.Grid>
        <Mui.Grid container item sx={styles.slotsGridIem}>
          {dummyData.MORNING_AVAILABLE_SLOTS.map((availableSlot: any) => (
            <Mui.Grid
              item
              lg={1.2}
              key={availableSlot.time}
              sx={styles.slotButtonGrid}
            >
              <Common.CellmaButton
                label={availableSlot.time}
                borderColor={
                  slotBooked === availableSlot.time
                    ? "primary.main"
                    : "primary.light"
                }
                color="common.black"
                backgroundColor={
                  slotBooked === availableSlot.time
                    ? "primary.light"
                    : "common.white"
                }
                borderRadius={2}
                onClick={() => {
                  setSlotBooked(availableSlot.time);
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
                }}
              />
            </Mui.Grid>
          ))}
        </Mui.Grid>
      </Mui.Grid>
      <Mui.Grid container item>
        <Mui.Grid container item>
          <Mui.Grid item xs={11}>
            <Mui.Typography variant="h2" sx={styles.slotsTextGrid}>
              {t("afternoon")}
            </Mui.Typography>
          </Mui.Grid>
        </Mui.Grid>

        <Mui.Grid container item sx={styles.slotsGridIem}>
          {dummyData.AFTERNOON_AVAILABLE_SLOTS.map((availableSlot: any) => (
            <Mui.Grid
              item
              xs={1.2}
              key={availableSlot.time}
              sx={styles.slotButtonGrid}
            >
              <Common.CellmaButton
                label={availableSlot.time}
                borderColor={
                  slotBooked === availableSlot.time
                    ? "primary.main"
                    : "primary.light"
                }
                color="common.black"
                backgroundColor={
                  slotBooked === availableSlot.time
                    ? "primary.light"
                    : "common.white"
                }
                borderRadius={2}
                onClick={() => {
                  setSlotBooked(availableSlot.time);
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
                }}
              />
            </Mui.Grid>
          ))}
        </Mui.Grid>
      </Mui.Grid>
      <Mui.Grid container item>
        <Mui.Grid item xs={11}>
          <Mui.Typography variant="h2" sx={styles.slotsTextGrid}>
            {t("evening")}
          </Mui.Typography>
        </Mui.Grid>

        <Mui.Grid container item sx={styles.slotsGridIem}>
          {dummyData.EVENING_AVAILABLE_SLOTS.map((availableSlot: any) => (
            <Mui.Grid
              item
              xs={1.2}
              key={availableSlot.time}
              sx={styles.slotButtonGrid}
            >
              <Common.CellmaButton
                label={availableSlot.time}
                borderColor={
                  slotBooked === availableSlot.time
                    ? "primary.main"
                    : "primary.light"
                }
                color="common.black"
                backgroundColor={
                  slotBooked === availableSlot.time
                    ? "primary.light"
                    : "common.white"
                }
                borderRadius={2}
                onClick={() => {
                  setSlotBooked(availableSlot.time);
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
                }}
              />
            </Mui.Grid>
          ))}
        </Mui.Grid>
      </Mui.Grid>
    </Mui.Grid>
  );
};

export const styles = {
  previousAndNextIcon: { color: "primary.main", fontSize: "18px" },
  slotsTextGrid: {
    color: "common.white",
    backgroundColor: "primary.main",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "30px",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    width: "150px",
  },
  previousAndNextIconGrid: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 3,
    border: 1,
    borderColor: "primary.main",
    height: "20px",
  },
  slotsGridIem: {
    boxShadow: 3,
    padding: "10px",
  },
  slotButtonGrid: {
    display: "flex",
    justifyContent: "center",
  },
};
