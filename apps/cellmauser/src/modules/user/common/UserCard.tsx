import { useState } from "react";

import * as Mui from "@mui/material";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

import UserCardHeader from "./UserCardHeader";
import UserDrawer from "./UserDrawer";
import * as Common from "../../../common/CommonComponentsIndex";

interface Props {
  // insert props here
}

const UserCard: React.FC<Props> = () => {
  const [title, setTitle] = useState("");
  const [isLink, setIsLink] = useState(true);
  const [isArrowCircleButton, setIsArrowCircleButton] = useState(true);
  const [isLeftOutlinedIcon, setIsLeftOutlinedIcon] = useState(true);
  const [screenName, setScreenName] = useState("");
  const [drawerName, setDrawerName] = useState("");
  const [customizableViewPath, setCustomizableViewPath] = useState("");

  const { isDrawerOpen } = useSelector((state: any) => state.common);

  return (
    <Mui.Box sx={{ display: "flex", width: "100%" }}>
      {drawerName === "UserDrawer" && <UserDrawer open={isDrawerOpen} />}
      <Common.CellmaCard>
        <UserCardHeader
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

export default UserCard;
