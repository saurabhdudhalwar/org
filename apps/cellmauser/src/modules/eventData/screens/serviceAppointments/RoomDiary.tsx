// Page Name : "roomDiary"
// Page Id : "c4eve14"

import { useEffect, useState } from "react";

import * as Mui from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useOutletContext } from "react-router-dom";

import Days from "./Days";
import Month from "./Month";
import Weeks from "./Weeks";
import { setIsDrawerOpen } from "../../../../store/CommonAction";
import Appointment from "../../../patient/assets/icons/Appointment.png";
import t from "../../assets/translationFiles/serviceAppointmentTranslation";
import { setActiveScreenName } from "../../store/EventDataAction";

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

const RoomDiary = () => {
  const [roomDiaryTab, setRoomDiaryTab] = useState("day");
  const dispatch = useDispatch();
  const { language } = useSelector((state: any) => state.language);
  const { setTitle, setSelectDateAndHp } = useOutletContext() as any;

  useEffect(() => {
    window.scrollTo(0, 0);
    setTitle(t("roomDiary"));
    dispatch(setActiveScreenName("roomDiary"));
    setSelectDateAndHp(true);
  });

  useEffect(() => {
    dispatch(setIsDrawerOpen(false));
  }, [language]);

  // Handler for change tab
  const handleChangeTabs = (event: any, newAlignment: string) => {
    setRoomDiaryTab(newAlignment);
  };

  return (
    <Mui.Grid container spacing={2}>
      <Mui.Grid
        item
        xs={6}
        sx={{ display: "flex", justifyContent: "flex-start" }}
      >
        <Mui.Typography variant="h4">Dolphin</Mui.Typography>
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
          value={roomDiaryTab}
          exclusive
          onChange={handleChangeTabs}
          aria-label="Appointment Slot Tabs"
          size="small"
        >
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
        <Mui.Divider />
      </Mui.Grid>
      <Mui.Grid item xs={12}>
        {roomDiaryTab === "day" && <Days />}
        {roomDiaryTab === "week" && <Weeks />}
        {roomDiaryTab === "month" && <Month />}
      </Mui.Grid>
    </Mui.Grid>
  );
};

export default RoomDiary;

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
