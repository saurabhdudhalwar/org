import { useState } from "react";

import * as Mui from "@mui/material";
import { Outlet } from "react-router-dom";

import ReferralCardHeader from "./ReferralCardHeader";
import * as Common from "../../../common/CommonComponentsIndex";
import ServiceAppointmentDrawer from "../../eventData/common/ServiceAppointmentDrawer";

const ReferralCard = () => {
  const [title, setTitle] = useState("");
  const [isLink, setIsLink] = useState(true);
  const [isArrowCircleButton, setIsArrowCircleButton] = useState(true);
  const [isLeftOutlinedIcon, setIsLeftOutlinedIcon] = useState(true);
  const [screenName, setScreenName] = useState("");
  const [drawerName, setDrawerName] = useState("");
  const [customizableViewPath, setCustomizableViewPath] = useState("");

  return (
    <Mui.Box sx={{ display: "flex", width: "100%" }}>
      {drawerName === "ServiceAppointmentDrawer" && (
        <ServiceAppointmentDrawer />
      )}
      <Common.CellmaCard>
        <ReferralCardHeader
          screenName={screenName}
          title={title}
          isLink={isLink}
          isArrowCircleButton={isArrowCircleButton}
          isLeftOutlinedIcon={isLeftOutlinedIcon}
          customizableViewPath={customizableViewPath}
        />
        <Outlet
          context={{
            setTitle,
            setIsLink,
            setIsArrowCircleButton,
            setIsLeftOutlinedIcon,
            setScreenName,
            setDrawerName,
            setCustomizableViewPath,
          }}
        />
      </Common.CellmaCard>
    </Mui.Box>
  );
};

export default ReferralCard;
