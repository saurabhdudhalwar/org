import { useState } from "react";

import * as Mui from "@mui/material";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

import MultiplePatientDrawer from "./MultiplePatientDrawer";
import PatientCardHeader from "./PatientCardHeader";
import SinglePatientDrawer from "./SinglePatientDrawer";
import * as Common from "../../../common/CommonComponentsIndex";

interface Props {
  // insert props here
}

const PatientCard: React.FC<Props> = () => {
  const [title, setTitle] = useState("");
  const [isLink, setIsLink] = useState(true);
  const [isArrowCircleButton, setIsArrowCircleButton] = useState(true);
  const [isLeftOutlinedIcon, setIsLeftOutlinedIcon] = useState(true);
  const [screenName, setScreenName] = useState("");
  const [drawerName, setDrawerName] = useState("");
  const [customizableViewPath, setCustomizableViewPath] = useState("");

  const {
    isPatientSelected,
    isSinglePatientSearched,
    isMultiplePatientSearched,
  } = useSelector((state: any) => state.patient);
  const { isDrawerOpen } = useSelector((state: any) => state.common);

  return (
    <Mui.Box sx={{ display: "flex", width: "100%" }}>
      {(isPatientSelected || isMultiplePatientSearched) &&
        drawerName === "MultiplePatientDrawer" && (
          <MultiplePatientDrawer open={isDrawerOpen} />
        )}
      {(isPatientSelected || isSinglePatientSearched) &&
        drawerName === "SinglePatientDrawer" && (
          <SinglePatientDrawer open={isDrawerOpen} />
        )}
      <Common.CellmaCard>
        <PatientCardHeader
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

export default PatientCard;
