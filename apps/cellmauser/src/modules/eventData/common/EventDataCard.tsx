import { useState } from "react";

import * as Mui from "@mui/material";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

import EventDataCardHeader from "./EventDataCardHeader";
import ServiceAppointmentDrawer from "./ServiceAppointmentDrawer";
import ServiceAppointmentReminderDrawer from "./ServiceAppointmentReminderDrawer";
import * as Common from "../../../common/CommonComponentsIndex";
import SelectDateAndHp from "../screens/eventDataPatientSearch/SelectDateAndHp";

interface Props {
  // insert props here
}

const EventDataCard: React.FC<Props> = () => {
  const [title, setTitle] = useState("");
  const [isLink, setIsLink] = useState(true);
  const [isArrowCircleButton, setIsArrowCircleButton] = useState(true);
  const [isLeftOutlinedIcon, setIsLeftOutlinedIcon] = useState(true);
  const [isSelectDateAndHp, setSelectDateAndHp] = useState(true);
  const [screenName, setScreenName] = useState("");
  const [drawerName, setDrawerName] = useState("");
  const [customizableViewPath, setCustomizableViewPath] = useState("");
  const { isDrawerOpen } = useSelector((state: any) => state.common);

  const outlet = (
    <Outlet
      context={{
        setTitle,
        setIsLink,
        setIsArrowCircleButton,
        setIsLeftOutlinedIcon,
        setScreenName,
        setDrawerName,
        setCustomizableViewPath,
        setSelectDateAndHp,
      }}
    />
  );

  return (
    <Mui.Grid sx={{ display: "flex", width: "100%" }}>
      {drawerName === "serviceAppointments" && <ServiceAppointmentDrawer />}
      {drawerName === "serviceAppointmentsReminder" && (
        <ServiceAppointmentReminderDrawer />
      )}
      <Common.CellmaCard>
        <EventDataCardHeader
          screenName={screenName}
          title={title}
          isLink={isLink}
          isArrowCircleButton={isArrowCircleButton}
          isLeftOutlinedIcon={isLeftOutlinedIcon}
          customizableViewPath={customizableViewPath}
          isSelectedDateAndHp={isSelectDateAndHp}
        />
        <Mui.Grid container spacing={2}>
          {isSelectDateAndHp && (
            <Mui.Grid
              item
              xs={12}
              sm={6}
              md={4}
              lg={3}
              sx={{
                borderRight: 1,
                borderColor: "grey.200",
                minWidth: "200px",
              }}
            >
              <SelectDateAndHp />
            </Mui.Grid>
          )}
          {isSelectDateAndHp ? (
            <Mui.Grid item xs={12} sm={6} md={8} lg={9}>
              {outlet}
            </Mui.Grid>
          ) : (
            <Mui.Grid item xs={12}>
              {outlet}
            </Mui.Grid>
          )}
        </Mui.Grid>
      </Common.CellmaCard>
    </Mui.Grid>
  );
};

export default EventDataCard;
