import React, { useState } from "react";

import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import * as Mui from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import * as Common from "../../../../common/CommonComponentsIndex";
import { setSnackbar } from "../../../../store/SnackbarAction";
import * as dummyData from "../../assets/dummyData/ServiceAppointmentsDummyData";
import t from "../../assets/translationFiles/serviceAppointmentTranslation";

interface Props {
  handleClose: any;
}

const ConfirmAppointmentPopup: React.FC<Props> = (props: any) => {
  const [patientAppointmentDate, setPatientAppointmentDate] = useState(null);
  const [isAppointmentWith, setIsAppointmentWith] = useState(false);
  const [isAppointmentFor, setIsAppointmentFor] = useState(false);
  const [appointmentTime, setAppointmentTime] = useState();
  const [slotBooked, setSlotBooked] = useState();
  const [isAvailableSlots, setIsAvailableSlots] = useState(false);
  const dispatch = useDispatch();

  return (
    <Common.CellmaPopup
      title={t("confirmAppointment")}
      fullScreen
      handleCancel={() => props.handleClose()}
    >
      <Mui.Grid container spacing={2} sx={styles.popupGridContainer}>
        <Mui.Grid item container>
          <Mui.Grid item xs={4} sx={styles.textGrid}>
            <Mui.Typography>{t("appointmentDate")}</Mui.Typography>
          </Mui.Grid>
          <Mui.Grid item xs={3}>
            <Common.CellmaDatePicker
              label={t("appointmentDate")}
              name="appointmentDate"
              value={patientAppointmentDate}
              onChange={(newDate: any) => {
                setPatientAppointmentDate(newDate);
              }}
            />
          </Mui.Grid>
        </Mui.Grid>
        <Mui.Grid item container>
          <Mui.Grid item xs={4} sx={styles.textGrid}>
            <Mui.Typography>{t("appointmentWith")}</Mui.Typography>
          </Mui.Grid>
          <Mui.Grid item xs={3} sx={{ width: "20px" }}>
            <Common.CellmaAutoSelectField
              dummyData
              label={t("appointmentWith")}
              name="appointmentWith"
              disabled={isAppointmentWith}
              onChange={(event: any, value: any) => {
                setIsAppointmentFor(true);
              }}
              options={dummyData.APPOINTMENT_WITH}
              getOptionLabel={(appointmentWith: any) => appointmentWith.label}
              renderOption={(props: any, appointmentWith: any) => (
                <li {...props}>{appointmentWith.label}</li>
              )}
            />
          </Mui.Grid>
        </Mui.Grid>
        <Mui.Grid item container>
          <Mui.Grid item xs={4} sx={styles.textGrid}>
            <Mui.Typography>{t("differentToAssignHp")}</Mui.Typography>
          </Mui.Grid>
          <Mui.Grid item xs={3}>
            <Common.CellmaAutoSelectField
              dummyData
              label={t("differentToAssignHp")}
              name="differentToAssignHp"
              disabled={isAppointmentFor}
              onChange={(event: any, value: any) => {
                setIsAppointmentWith(true);
              }}
              options={dummyData.APPOINTMENT_WITH}
              getOptionLabel={(differentToAssignHp: any) =>
                differentToAssignHp.label
              }
              renderOption={(props: any, differentToAssignHp: any) => (
                <li {...props}>{differentToAssignHp.label}</li>
              )}
            />
          </Mui.Grid>
        </Mui.Grid>
        {(isAppointmentFor || isAppointmentWith) && (
          <Mui.Grid item container>
            <Mui.Grid item xs={4} sx={styles.textGrid}>
              <Mui.Typography>{t("appointmentDuration")}</Mui.Typography>
            </Mui.Grid>
            <Mui.Grid item xs={3}>
              <Common.CellmaAutoSelectField
                dummyData
                label={t("appointmentDuration")}
                name="appointmentDuration"
                options={dummyData.APPOINTMENT_DURATION}
                getOptionLabel={(appointmentDuration: any) =>
                  appointmentDuration.label
                }
                renderOption={(props: any, appointmentDuration: any) => (
                  <li {...props}>{appointmentDuration.label}</li>
                )}
              />
            </Mui.Grid>
          </Mui.Grid>
        )}
        {(isAppointmentFor || isAppointmentWith) && (
          <Mui.Grid item container spacing={2}>
            <Mui.Grid item xs={4} sx={styles.textGrid}>
              <Mui.Typography>{t("appointmentTime")}</Mui.Typography>
              <Mui.Typography sx={{ color: "warning.dark" }}>*</Mui.Typography>
            </Mui.Grid>
            <Mui.Grid
              item
              xs={8}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
              }}
            >
              <Mui.Typography>08:00:00</Mui.Typography>
            </Mui.Grid>
            {dummyData.APPOINTMENT_TIME.map((appointmentAvailable: any) => (
              <Mui.Grid
                item
                key={appointmentAvailable.id}
                sx={styles.slotButtonGrid}
              >
                <Common.CellmaButton
                  label={t(`${appointmentAvailable.label}`)}
                  borderColor={
                    appointmentTime === appointmentAvailable.label
                      ? "primary.dark"
                      : "common.white"
                  }
                  color={
                    appointmentTime === appointmentAvailable.label
                      ? "primary.dark"
                      : "common.black"
                  }
                  backgroundColor={
                    appointmentTime === appointmentAvailable.label
                      ? "primary.light"
                      : "grey.200"
                  }
                  borderRadius={5}
                  onClick={() => {
                    setAppointmentTime(appointmentAvailable.label);
                    setIsAvailableSlots(true);
                  }}
                />
              </Mui.Grid>
            ))}
          </Mui.Grid>
        )}
        {isAvailableSlots && (
          <Mui.Grid item container spacing={2}>
            <Mui.Grid item xs={12} sx={styles.textGrid}>
              <Mui.Typography>
                {t("available")}&nbsp;
                {t(`${appointmentTime}`)}&nbsp;
                {t("slots")}
              </Mui.Typography>
            </Mui.Grid>
            <Mui.Grid item xs={0.4} sx={styles.previousAndNextIconStyle}>
              <Mui.IconButton aria-label="ArrowBackIosIcon Menu">
                <ArrowBackIosIcon sx={{ fontSize: "18px" }} />
              </Mui.IconButton>
            </Mui.Grid>

            {dummyData.AVAILABLE_SLOTS_TIME.map((slotAvailable: any) => (
              <Mui.Grid item key={slotAvailable.id} sx={styles.slotButtonGrid}>
                <Common.CellmaButton
                  label={slotAvailable.label}
                  borderColor={
                    slotBooked === slotAvailable.label
                      ? "primary.dark"
                      : "common.white"
                  }
                  color={
                    slotBooked === slotAvailable.label
                      ? "primary.dark"
                      : "common.black"
                  }
                  backgroundColor={
                    slotBooked === slotAvailable.label
                      ? "primary.light"
                      : "grey.200"
                  }
                  borderRadius={5}
                  onClick={() => {
                    setSlotBooked(slotAvailable.label);
                  }}
                />
              </Mui.Grid>
            ))}
            <Mui.Grid item xs={0.4} sx={styles.previousAndNextIconStyle}>
              <Mui.IconButton aria-label="ArrowForwardIosIcon Menu">
                <ArrowForwardIosIcon sx={{ fontSize: "18px" }} />
              </Mui.IconButton>
            </Mui.Grid>
          </Mui.Grid>
        )}
        {isAvailableSlots && (
          <Mui.Grid item container>
            <Mui.Grid item xs={4} sx={styles.textGrid}>
              <Mui.Typography>{t("appointmentRoom")}</Mui.Typography>
              <Mui.Typography sx={{ color: "warning.dark" }}>*</Mui.Typography>
            </Mui.Grid>
            <Mui.Grid item xs={3}>
              <Common.CellmaAutoSelectField
                dummyData
                label={t("appointmentRoom")}
                name="appointmentRoom"
                options={dummyData.APPOINTMENT_ROOM}
                getOptionLabel={(appointmentRoom: any) => appointmentRoom.label}
                renderOption={(props: any, appointmentRoom: any) => (
                  <li {...props}>{appointmentRoom.label}</li>
                )}
              />
            </Mui.Grid>
          </Mui.Grid>
        )}
        <Mui.Grid item container>
          <Mui.Grid item xs={4} sx={styles.textGrid}>
            <Mui.Typography>{t("appointmentReason")}</Mui.Typography>
          </Mui.Grid>
          <Mui.Grid item xs={3.5}>
            <Common.CellmaAutoSelectField
              dummyData
              label={t("appointmentReason")}
              name="appointmentReason"
              options={dummyData.REASON_FOR_APPOINTMENT}
              getOptionLabel={(appointmentReason: any) =>
                appointmentReason.label
              }
              renderOption={(props: any, appointmentReason: any) => (
                <li {...props}>{appointmentReason.label}</li>
              )}
            />
          </Mui.Grid>
        </Mui.Grid>
        <Mui.Grid item container>
          <Mui.Grid item xs={4}>
            <Mui.Typography>{t("appointmentNotes")}</Mui.Typography>
          </Mui.Grid>
          <Mui.Grid item xs={5}>
            <Common.CellmaInputField
              label={t("appointmentNotes")}
              rows="3"
              multiline
            />
          </Mui.Grid>
        </Mui.Grid>
        <Mui.Grid
          item
          xs={12}
          sx={{ display: "flex", justifyContent: "flex-end" }}
        >
          <Common.CellmaButton
            label={t("save")}
            onClick={() => {
              dispatch(
                setSnackbar(
                  true,
                  "success",
                  t("provisionalAppointmentConfirmed"),
                  2
                )
              );
              props.handleClose();
            }}
          />
        </Mui.Grid>
      </Mui.Grid>
    </Common.CellmaPopup>
  );
};

export default ConfirmAppointmentPopup;

const styles = {
  textGrid: { display: "flex", alignItems: "center" },
  checkAppointmentLink: {
    display: "flex",
    alignItems: "center",
    marginLeft: "20px",
  },
  popupGridContainer: {
    paddingY: "15px",
    paddingX: "35px",
  },
  slotButtonGrid: {
    display: "flex",
    justifyContent: "flex-start",
  },
  previousAndNextIconStyle: {
    display: "flex",
    alignItems: "center",
  },
};
