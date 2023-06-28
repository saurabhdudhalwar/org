import React, { useState } from "react";

import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import * as Mui from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import EventDataLinks from "./EventDataLinks";
import { setIsDrawerOpen } from "../../../store/CommonAction";
import t from "../assets/translationFiles/commonEventDataTranslation";
import {
  setActiveScreenName,
  setIsCustomizeView,
  setIsNextAvailableAppointment,
} from "../store/EventDataAction";

interface Props {
  isLeftOutlinedIcon: boolean;
  title: string;
  isLink: boolean;
  screenName: string;
  customizableViewPath: string;
  isArrowCircleButton: boolean;
  isSelectedDateAndHp: boolean;
}

const EventDataCardHeader: React.FC<Props> = (props) => {
  const [settingAnchor, setSettingAnchor] = useState<null | HTMLElement>(null);
  const { isCustomizeView } = useSelector(
    (state: any) => state.eventDataReducer
  );
  const { activeScreenName } = useSelector(
    (state: any) => state.eventDataReducer
  );
  const openSetting = Boolean(settingAnchor);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // handler for open setting
  const handleSettingClick = (event: React.MouseEvent<HTMLElement>) => {
    setSettingAnchor(event.currentTarget);
  };

  // handler for setting close
  const handleSettingClose = () => {
    setSettingAnchor(null);
  };

  // handler for previous page
  const backPageHandler = () => {
    activeScreenName === "serviceAppointmentsScreen"
      ? navigate(-2)
      : navigate(-1);
    dispatch(setIsCustomizeView(false));
    dispatch(setIsDrawerOpen(false));
    dispatch(setIsNextAvailableAppointment(false));
  };

  return (
    <Mui.Grid
      container
      sx={{ display: "flex", alignItems: "center", mb: "20px" }}
    >
      <Mui.Grid
        item
        container
        xs={11.5}
        sx={{ display: "flex", alignItems: "center" }}
      >
        <Mui.Grid item>
          {props.isLeftOutlinedIcon && (
            <Mui.IconButton
              onClick={backPageHandler}
              aria-label="Back Button"
              sx={{ padding: { xs: "0px", sm: "8px" } }}
            >
              <ArrowCircleLeftOutlinedIcon sx={styles.arrowCircleIcon} />
            </Mui.IconButton>
          )}
        </Mui.Grid>
        <Mui.Grid item sx={{ minWidth: "100px" }}>
          <Mui.Typography variant="subtitle1">{props.title}</Mui.Typography>
        </Mui.Grid>

        <Mui.Grid item sx={{ ml: { xs: "0px", sm: "10px" } }}>
          {props.isLink && <EventDataLinks />}
        </Mui.Grid>
      </Mui.Grid>
      <Mui.Grid
        item
        xs={0.7}
        sm={0.5}
        sx={{ display: "flex", justifyContent: "center" }}
      >
        <Mui.IconButton
          aria-label="Setting Button"
          data-testid="Setting Button"
          sx={styles.settingIcon}
          disabled={props.screenName === ""}
          onClick={handleSettingClick}
        >
          <SettingsOutlinedIcon
            aria-label="Setting Button"
            sx={{ fontSize: "30px" }}
          />
        </Mui.IconButton>
      </Mui.Grid>
      <Mui.Backdrop open={openSetting} sx={{ zIndex: 1200 }}>
        <Mui.Menu
          anchorEl={settingAnchor}
          open={openSetting}
          onClose={handleSettingClose}
          PaperProps={{
            sx: {
              overflow: "visible",
              "&:before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 55,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 1500,
              },
            },
          }}
        >
          <Mui.MenuItem
            selected={isCustomizeView}
            sx={styles.menuItemText}
            onClick={() => {
              if (!isCustomizeView) {
                handleSettingClose();
                dispatch(setIsCustomizeView(true));
                navigate(props.customizableViewPath);
              }
            }}
            disabled={props.screenName === ""}
          >
            {t("customizableView")}
          </Mui.MenuItem>
          <Mui.Divider variant="middle" />
          <Mui.MenuItem
            selected={!isCustomizeView}
            sx={styles.menuItemText}
            onClick={() => {
              if (isCustomizeView) {
                handleSettingClose();
                dispatch(setIsCustomizeView(false));
                navigate(-1);
              }
            }}
            disabled={props.screenName === ""}
          >
            {t("defaultView")}
          </Mui.MenuItem>
        </Mui.Menu>
      </Mui.Backdrop>
    </Mui.Grid>
  );
};

export default EventDataCardHeader;

export const styles = {
  arrowCircleIcon: {
    color: "success.main",
    fontSize: "30px",
  },

  settingIcon: {
    color: "primary.main",
    fontSize: "30px",
    "&:hover": { color: "primary.dark" },
  },

  menuItemText: {
    mx: "10px",
    "&.Mui-selected": {
      backgroundColor: "secondary.main",
      color: "primary.dark",
    },
    "&:hover": { backgroundColor: "secondary.main", color: "primary.dark" },
  },
  menuIcon: { color: "grey.900", mr: "10px" },
  avatar: { height: "24px", marginRight: "10px", width: "24px" },
};
