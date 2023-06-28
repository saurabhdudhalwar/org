// Page Name : "hpDiary"
// Page Id : "c4user5"

import { useEffect, useState } from "react";

import * as Mui from "@mui/material";
import { format } from "date-fns";
import dayjs from "dayjs";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { useOutletContext } from "react-router-dom";

import Day from "./Day";
import Month from "./Month";
import Week from "./Week";
import CellmaCalendarPicker from "../../../../common/CellmaCalendarPicker";
import * as Common from "../../../../common/CommonComponentsIndex";
import Appointment from "../../../patient/assets/icons/Appointment.png";
import {
  useFetchClinicDairyCalender,
  useFetchHpDiaryCalender,
} from "../../api/useFetchHpDiaryCalender";
import translate from "../../assets/translationFiles/hpDiaryTranslation";
import { setSelectedDate } from "../../store/HpDiaryAction";

interface Props {
  // insert props here
  espId?: any;
  hpName?: any;
}

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

const HpDiary: React.FC<Props> = (props?: Props) => {
  // State for HP schedule is set
  const [isHpClinicSchedule, setIsHpClinicSchedule] = useState(true);
  const [activeButton, setActiveButton] = useState("hpDiary");
  const [hpDiaryTab, setHpDiaryTab] = useState("day");
  const { language } = useSelector((state: any) => state.language);
  const { setTitle, setIsLink }: { setTitle: any; setIsLink: any } =
    useOutletContext(); // <-- access context value

  const { selectedDate } = useSelector((state: any) => state.HpDiary);
  const { espDetails } = useSelector((state: any) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
    setTitle(translate("hpDiary", language));
    setIsLink(true);
    // eslint-disable-next-line
  }, [language]);

  // Handler for tab change
  const handleChangeTabs = (event: any, newAlignment: string) => {
    setHpDiaryTab(newAlignment);
  };

  const { refetch: hpCalenderRefetch, getHPCalenderDetails } =
    useFetchHpDiaryCalender({
      espId: props?.espId ?? espDetails?.establishmentProfessional?.espId,
      date: moment(selectedDate).format("DD/MM/YYYY"),
    });

  const { refetch: clinicCalenderRefetch, getClinicCalenderDetails } =
    useFetchClinicDairyCalender({
      espId: props?.espId ?? espDetails?.establishmentProfessional?.espId,
      month: format(selectedDate, "MMMM"),
      year: selectedDate.getFullYear(),
    });

  useEffect(() => {
    hpCalenderRefetch();
    clinicCalenderRefetch();
  }, [hpCalenderRefetch, clinicCalenderRefetch, selectedDate, activeButton]);

  return (
    <Mui.Grid container>
      <Mui.Grid item xs={12} sx={styles.typography}>
        <Mui.Typography variant="h2">{props?.hpName}</Mui.Typography>
      </Mui.Grid>
      <Mui.Grid item container>
        <Mui.Grid item sx={{ minWidth: "120px" }}>
          <Common.CellmaButton
            label={translate("clinicDiary", language)}
            backgroundColor={
              activeButton === "clinicDiary" ? "success.light" : "primary.main"
            }
            disabled={!isHpClinicSchedule}
            onClick={() => setActiveButton("clinicDiary")}
          />
        </Mui.Grid>
        <Mui.Grid item sx={{ minWidth: "120px" }}>
          <Common.CellmaButton
            label={translate("hpDiary", language)}
            backgroundColor={
              activeButton === "hpDiary" ? "success.light" : "primary.main"
            }
            onClick={() => setActiveButton("hpDiary")}
          />
        </Mui.Grid>
        <Mui.Grid
          item
          xs
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "flex-end",
          }}
          marginBottom={1}
        >
          <Mui.ToggleButtonGroup
            value={hpDiaryTab}
            exclusive
            onChange={handleChangeTabs}
            aria-label="HP Diary Tabs"
            size="small"
          >
            <Mui.ToggleButton
              value="day"
              data-testid="day"
              sx={styles.toggleButton}
            >
              <AppointmentIcon />
              <Mui.Typography sx={styles.tabTypography}>
                {translate("day", language)}
              </Mui.Typography>
            </Mui.ToggleButton>
            <Mui.ToggleButton
              value="week"
              data-testid="week"
              sx={styles.toggleButton}
            >
              <AppointmentIcon />
              <Mui.Typography sx={styles.tabTypography}>
                {translate("week", language)}
              </Mui.Typography>
            </Mui.ToggleButton>
            <Mui.ToggleButton
              value="month"
              data-testid="month"
              sx={styles.toggleButton}
            >
              <AppointmentIcon />
              <Mui.Typography sx={styles.tabTypography}>
                {translate("month", language)}
              </Mui.Typography>
            </Mui.ToggleButton>
          </Mui.ToggleButtonGroup>
        </Mui.Grid>
      </Mui.Grid>

      <Mui.Grid item container spacing={2}>
        <Mui.Grid
          item
          xs={3.5}
          sx={{
            display: "flex",
          }}
        >
          <CellmaCalendarPicker
            label="hpDiaryCalendarPicker"
            date={dayjs(selectedDate)}
            onChange={(newDate: any) => {
              dispatch(setSelectedDate(newDate?.$d));
            }}
          />
        </Mui.Grid>
        <Mui.Grid item xs={8.5}>
          {hpDiaryTab === "day" && (
            <Day
              activeDiaryButton={activeButton}
              getHPCalenderDetails={getHPCalenderDetails}
              getClinicCalenderDetails={getClinicCalenderDetails}
            />
          )}
          {hpDiaryTab === "week" && (
            <Week
              activeDiaryButton={activeButton}
              getHPCalenderDetails={getHPCalenderDetails}
              getClinicCalenderDetails={getClinicCalenderDetails}
            />
          )}
          {hpDiaryTab === "month" && (
            <Month
              activeDiaryButton={activeButton}
              getHPCalenderDetails={getHPCalenderDetails}
              hpCalenderRefetch={hpCalenderRefetch}
              getClinicCalenderDetails={getClinicCalenderDetails}
              espId={
                props?.espId ?? espDetails?.establishmentProfessional?.espId
              }
            />
          )}
        </Mui.Grid>
      </Mui.Grid>
    </Mui.Grid>
  );
};

const styles = {
  typography: { display: "flex", alignItems: "flex-start", m: "10px" },
  searchButton: {
    display: "flex",
    justifyContent: "flex-start",
  },
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

export default HpDiary;
