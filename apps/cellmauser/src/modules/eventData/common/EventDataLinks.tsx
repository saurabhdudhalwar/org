import React, { useState } from "react";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import * as Mui from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import AppointmentsRoomsCalenderPopup from "./AppointmentsRoomsCalenderPopup";
import json from "./eventDataLinksUrl.json";
import { SelectPatientPopup } from "./SelectPatientPopup";
import * as Common from "../../../common/CommonComponentsIndex";
import { setIsUnderConstruction } from "../../../store/CommonAction";
import { fetchNavigationPath, openInNewTab } from "../../../utils/GeneralUtils";
import { LINKS_MENU_ITEMS } from "../assets/dummyData/CommonEventDataLinksDummyData";
import t from "../assets/translationFiles/serviceAppointmentTranslation";
import AddProvisionalAppointmentPopup from "../screens/serviceAppointments/AddProvisionalAppointmentPopup";

const EventDataLinks = () => {
  const [menuItem, setMenuItem] = useState() as any;
  const { activeScreenName } = useSelector(
    (state: any) => state.eventDataReducer
  );
  const { isPatientSelected } = useSelector((state: any) => state.patient);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [linkAnchor, setLinkAnchor] = useState<null | HTMLElement>(null);
  const openLink = Boolean(linkAnchor);

  // handler for open link
  const handleLinkClick = (event: React.MouseEvent<HTMLElement>) => {
    setLinkAnchor(event.currentTarget);
  };

  // handler for link close
  const handleLinkClose = () => {
    setLinkAnchor(null);
  };

  const getImgURL = (item: string) => {
    return new URL(`../assets/icons/${item}.png`, import.meta.url).toString();
  };

  return (
    <Mui.Grid container>
      <Common.CellmaButton
        label={t("links")}
        onClick={handleLinkClick}
        endIcon={<KeyboardArrowDownIcon />}
        backgroundColor="common.white"
        color="primary.main"
        borderColor="common.white"
      />
      <Mui.Backdrop open={openLink} sx={{ zIndex: 1200 }}>
        <Mui.Menu
          anchorEl={linkAnchor}
          open={openLink}
          onClose={handleLinkClose}
          onClick={handleLinkClose}
          sx={{
            mt: { xs: "60px", sm: "70px", md: "50px", lg: "35px" },
            maxHeight: "460px",
            width: "450px",
          }}
          anchorOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
        >
          {LINKS_MENU_ITEMS?.map((item: any) => (
            <Mui.Box key={item.name}>
              {item?.roles?.includes(activeScreenName) && (
                <Mui.Tooltip
                  title={t(item.labelTooltip ? item.labelTooltip : item.name)}
                  placement="right"
                  arrow
                >
                  <Mui.MenuItem
                    sx={styles.menuItemText}
                    data-testid={item.name}
                    onClick={() => {
                      if (item.onClick === "onClick") {
                        setMenuItem(item.name);
                      } else {
                        fetchNavigationPath(
                          item?.name,
                          item?.navigationType,
                          json,
                          dispatch,
                          navigate
                        );
                      }
                    }}
                  >
                    <Mui.Avatar
                      variant="square"
                      src={getImgURL(item?.src)}
                      alt={`alt_${item?.name}`}
                      sx={styles.avatar}
                    />
                    <Mui.Typography variant="h5">
                      {t(item?.name)}
                    </Mui.Typography>
                  </Mui.MenuItem>
                </Mui.Tooltip>
              )}
            </Mui.Box>
          ))}
        </Mui.Menu>
      </Mui.Backdrop>
      {menuItem === "addProvisionalAppointment" && isPatientSelected ? (
        <AddProvisionalAppointmentPopup
          handleClose={() => setMenuItem(false)}
        />
      ) : (
        menuItem === "addProvisionalAppointment" &&
        !isPatientSelected && (
          <SelectPatientPopup
            handleClose={() => {
              setMenuItem(false);
            }}
          />
        )
      )}
      {menuItem === "rooms" && (
        <AppointmentsRoomsCalenderPopup
          handleClose={() => setMenuItem(false)}
        />
      )}
    </Mui.Grid>
  );
};

export default EventDataLinks;

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
    whiteSpace: "unset",
  },
  menuIcon: { color: "grey.900", mr: "10px" },
  avatar: { height: "24px", marginRight: "10px", width: "24px" },
};
