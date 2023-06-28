import { useEffect, useState } from "react";

import * as Mui from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import { AvailableSlots } from "./AvailableSlots";
import AvailableSlotsForMultipleHp from "./AvailableSlotsForMultipleHp";
import Days from "./Days";
import Month from "./Month";
import { SelectPatientPopup } from "./SelectPatientPopup";
import Weeks from "./Weeks";
import * as Common from "../../../../common/CommonComponentsIndex";
import { setPaginationNumber } from "../../../../store/CommonAction";
import Appointment from "../../../patient/assets/icons/Appointment.png";
import t from "../../assets/translationFiles/ServiceBookAppointmentTranslation";
import {
  setActiveScreenName,
  setSelectedSlotDetails,
} from "../../store/EventDataAction";

const AppointmentIcon = () => {
  return (
    <Mui.Avatar
      variant="rounded"
      src={Appointment}
      alt="Appointment Image Avatar"
      sx={styles.avatar}
    />
  );
};

export const AppointmentSlots = (props: any) => {
  const { isUseSpecialtyAndRegionSetting, isNextAvailableAppointment } =
    useSelector((state: any) => state.eventDataReducer);

  const [appointmentTab, setAppointmentTab] = useState(
    isUseSpecialtyAndRegionSetting ? "multipleAvailableSlots" : "availableSlots"
  );
  const [isPatientSelectPopup, setIsPatientSelectPopup] = useState(false);
  const dispatch = useDispatch();
  const [slotDetails, setSlotDetails] = useState<any>();
  const { isPatientSelected } = useSelector((state: any) => state.patient);

  useEffect(() => {
    dispatch(setActiveScreenName("serviceAppointmentsScreen"));
  }, []);

  useEffect(() => {
    dispatch(setPaginationNumber(1));
    // eslint-disable-next-line
  }, [appointmentTab]);

  // Handler for change tab
  const handleChangeTabs = (event: any, newAlignment: string) => {
    setAppointmentTab(newAlignment);
  };

  return (
    <Mui.Grid container spacing={2}>
      {isUseSpecialtyAndRegionSetting && (
        <Mui.Grid item xs={12} sx={{ display: "flex", alignItems: "center" }}>
          <Mui.Typography variant="h2">{t("appointmentSlots")}</Mui.Typography>
        </Mui.Grid>
      )}

      {!isUseSpecialtyAndRegionSetting && (
        <Mui.Grid item container spacing={2}>
          <Mui.Grid item xs={12} sx={{ display: "flex", alignItems: "center" }}>
            <Mui.Typography variant="h2">
              {t("service")}: GUM/SRH Service
            </Mui.Typography>
          </Mui.Grid>
          <Mui.Grid item xs={4}>
            <Mui.Typography variant="h2">{t("clinicType")}: F2F</Mui.Typography>
          </Mui.Grid>
          <Mui.Grid item xs={4}>
            <Mui.Typography variant="h2">
              {t("clinicLocation")}: Archway Center
            </Mui.Typography>
          </Mui.Grid>
          <Mui.Grid item xs={4}>
            <Mui.Typography variant="h2">
              {t("healthProfessional")}: Dr. John
            </Mui.Typography>
          </Mui.Grid>
        </Mui.Grid>
      )}

      {isUseSpecialtyAndRegionSetting && (
        <Mui.Grid container item spacing={1}>
          <Mui.Grid item xs={9}>
            <Mui.Typography variant="h4">
              {t("clinicType")} : Audiology Further Tests
            </Mui.Typography>
          </Mui.Grid>
          <Mui.Grid
            item
            xs={3}
            sx={{ display: "flex", justifyContent: "flex-start" }}
          >
            <Mui.Typography variant="h4">
              {t("clinicLocation")} : USAIS
            </Mui.Typography>
          </Mui.Grid>
          <Mui.Grid item xs={9}>
            <Mui.Typography variant="h4">
              {t("specialty")} : All Specialty
            </Mui.Typography>
          </Mui.Grid>
          <Mui.Grid
            item
            xs={3}
            sx={{ display: "flex", justifyContent: "flex-start" }}
          >
            <Mui.Typography variant="h4">{t("team")} : All Team</Mui.Typography>
          </Mui.Grid>
        </Mui.Grid>
      )}

      <Mui.Grid item xs={12}>
        <Mui.Divider />
      </Mui.Grid>
      <Mui.Grid
        item
        xs={6}
        sx={{ display: "flex", justifyContent: "flex-start" }}
      >
        {isUseSpecialtyAndRegionSetting ? (
          <Mui.Typography variant="h4">{t("hpDiary")}</Mui.Typography>
        ) : (
          <Mui.Typography variant="h4">Dr. John&apos;s Diary</Mui.Typography>
        )}
      </Mui.Grid>
      <Mui.Grid
        item
        xs={6}
        sx={{
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Mui.ToggleButtonGroup
          value={appointmentTab}
          exclusive
          onChange={handleChangeTabs}
          aria-label="Appointment Slot Tabs"
          size="small"
        >
          <Mui.ToggleButton
            data-testid="availableSlots"
            value={
              isUseSpecialtyAndRegionSetting
                ? "multipleAvailableSlots"
                : "availableSlots"
            }
            sx={styles.toggleButton}
          >
            <AppointmentIcon />
            <Mui.Typography sx={styles.tabTypography}>
              {t("availableSlot")}
            </Mui.Typography>
          </Mui.ToggleButton>
          <Mui.ToggleButton
            value="day"
            data-testid="day"
            sx={styles.toggleButton}
          >
            <AppointmentIcon />
            <Mui.Typography sx={styles.tabTypography}>
              {t("day")}
            </Mui.Typography>
          </Mui.ToggleButton>
          <Mui.ToggleButton
            value="week"
            data-testid="week"
            sx={styles.toggleButton}
          >
            <AppointmentIcon />
            <Mui.Typography sx={styles.tabTypography}>
              {t("week")}
            </Mui.Typography>
          </Mui.ToggleButton>
          <Mui.ToggleButton
            value="month"
            data-testid="month"
            sx={styles.toggleButton}
          >
            <AppointmentIcon />
            <Mui.Typography sx={styles.tabTypography}>
              {t("month")}
            </Mui.Typography>
          </Mui.ToggleButton>
        </Mui.ToggleButtonGroup>
      </Mui.Grid>
      <Mui.Grid item xs={12}>
        {/* If use specialty and region setting is off show the available slot tab  */}
        {!isUseSpecialtyAndRegionSetting &&
          appointmentTab === "availableSlots" && <AvailableSlots />}
        {/* If use specialty and region setting is off show the multiple available slot tab  */}
        {isUseSpecialtyAndRegionSetting &&
          appointmentTab === "multipleAvailableSlots" && (
            <AvailableSlotsForMultipleHp slotDetails={setSlotDetails} />
          )}
        {appointmentTab === "day" && <Days hpDetails={props?.hpDetails} />}
        {appointmentTab === "month" && (
          <Month
            onSlotSelection={() => {
              setAppointmentTab("day");
            }}
          />
        )}
        {appointmentTab === "week" && (
          <Weeks
            hpDetails={props?.hpDetails}
            onSlotSelection={() => {
              setAppointmentTab("day");
            }}
          />
        )}
      </Mui.Grid>
      <Mui.Grid
        item
        xs={12}
        sx={{ display: "flex", justifyContent: "flex-end" }}
      >
        <Common.CellmaButton
          label={t("next")}
          onClick={() => {
            if (isPatientSelected) {
              props.handleStep(2);
              dispatch(setSelectedSlotDetails(slotDetails));
            } else {
              setIsPatientSelectPopup(true);
            }
          }}
        />
      </Mui.Grid>

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

export const styles = {
  toggleButton: {
    "&.Mui-selected, &.Mui-selected:hover": {
      color: "white",
      backgroundColor: "primary.main",
    },
    padding: "0px",
    minWidth: "65px",
  },
  avatar: {
    padding: "5px",
    backgroundColor: "common.white",
    height: "20px",
    width: "20px",
  },
  tabTypography: {
    paddingX: "5px",
    fontSize: "14px",
  },
};
