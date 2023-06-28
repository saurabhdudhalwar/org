import { useState } from "react";

import * as Mui from "@mui/material";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

import AdminCardHeader from "./AdminCardHeader";
import SiteAdminDrawer from "./SiteAdminDrawer";
import * as Common from "../../../common/CommonComponentsIndex";

interface Props {
  // insert props here
}

const AdminCard: React.FC<Props> = () => {
  const [title, setTitle] = useState("");
  const [isLink, setIsLink] = useState(true);
  const [isArrowCircleButton, setIsArrowCircleButton] = useState(true);
  const [isLeftOutlinedIcon, setIsLeftOutlinedIcon] = useState(true);
  const [screenName, setScreenName] = useState("");
  const [drawerName, setDrawerName] = useState("");
  const [customizableViewPath, setCustomizableViewPath] = useState("");

  const { isDrawerOpen } = useSelector((state: any) => state.common);

  console.log(isDrawerOpen, "is drawer open");

  return (
    <Mui.Box sx={{ display: "flex", width: "100%" }}>
      {isDrawerOpen && <SiteAdminDrawer open={isDrawerOpen} />}

      <Common.CellmaCard>
        <AdminCardHeader
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

export default AdminCard;
