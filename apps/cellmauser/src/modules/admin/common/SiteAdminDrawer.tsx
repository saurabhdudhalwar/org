import { useState } from "react";

import { ExpandLess, ExpandMore } from "@mui/icons-material";
import * as Mui from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import CellmaDrawer from "../../../common/CellmaDrawer";
import { setIsUnderConstruction } from "../../../store/CommonAction";
import Configurations from "../assets/icons/Configurations.png";
import Setup from "../assets/icons/Setup.png";
import t from "../assets/translationFiles/siteAdminTranslation";

interface Props {
  open: any;
}

const SiteAdminDrawer: React.FC<Props> = (props) => {
  const [isSetupOpen, setIsSetupOpen] = useState(true);
  const [isConfigurationOpen, setIsConfigurationOpen] = useState(false);

  const { open } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <CellmaDrawer open={open}>
      <Mui.Grid container sx={styles.mainGrid}>
        <Mui.Grid item xs={12}>
          <Mui.Typography variant="h2" sx={{ p: "10px" }}>
            {t("siteAdminUpperCase")}
          </Mui.Typography>
        </Mui.Grid>
        <Mui.Grid item xs={12} sx={styles.alignCenter}>
          <Mui.ListItemButton
            onClick={() => setIsSetupOpen(!isSetupOpen)}
            selected={isSetupOpen}
            sx={styles.listItemButton}
            data-testid="Set-Up"
          >
            <Mui.Avatar
              variant="square"
              src={Setup}
              alt="Set-Up Avatar"
              sx={styles.avatar}
            />
            <Mui.ListItemText sx={styles.infoTitle} primary={t("setup")} />
            {isSetupOpen ? (
              <ExpandLess />
            ) : (
              <ExpandMore sx={{ color: "success.dark" }} />
            )}
          </Mui.ListItemButton>
        </Mui.Grid>
        {isSetupOpen && (
          <Mui.Grid item container sx={styles.openGrid}>
            <Mui.Grid item xs={12} sx={styles.gridItem}>
              <Mui.Collapse in={isSetupOpen} timeout="auto" unmountOnExit>
                <Mui.List component="div" disablePadding>
                  <Mui.ListItemButton
                    data-testid="List"
                    onClick={() => navigate("/cellmaUser/admin/listItemList")}
                  >
                    <Mui.ListItemText primary={t("list")} />
                  </Mui.ListItemButton>
                </Mui.List>
              </Mui.Collapse>
            </Mui.Grid>
          </Mui.Grid>
        )}

        <Mui.Grid item xs={12} sx={styles.alignCenter}>
          <Mui.ListItemButton
            sx={styles.listItemButton}
            onClick={() => setIsConfigurationOpen(!isConfigurationOpen)}
            selected={isConfigurationOpen}
            data-testid="Configuration"
          >
            <Mui.Avatar
              variant="square"
              src={Configurations}
              alt="Configurations Avatar"
              sx={styles.avatar}
            />

            <Mui.ListItemText
              sx={styles.infoTitle}
              primary={t("configuration")}
            />
            {isConfigurationOpen ? (
              <ExpandLess />
            ) : (
              <ExpandMore sx={{ color: "success.dark" }} />
            )}
          </Mui.ListItemButton>
        </Mui.Grid>
        {isConfigurationOpen && (
          <Mui.Grid item container sx={styles.openGrid}>
            <Mui.Grid item xs={12} sx={styles.gridItem}>
              <Mui.List component="div" disablePadding>
                <Mui.ListItemButton
                  data-testid="Clinics"
                  onClick={() => navigate("/cellmaUser/admin/setClinics")}
                >
                  <Mui.ListItemText primary={t("clinics")} />
                </Mui.ListItemButton>
              </Mui.List>
            </Mui.Grid>
            <Mui.Grid item xs={12} sx={styles.gridItem}>
              <Mui.List component="div" disablePadding>
                <Mui.ListItemButton
                  data-testid="Rooms"
                  onClick={() => navigate("/cellmaUser/admin/setRooms")}
                >
                  <Mui.ListItemText primary={t("rooms")} />
                </Mui.ListItemButton>
              </Mui.List>
            </Mui.Grid>
          </Mui.Grid>
        )}
      </Mui.Grid>
    </CellmaDrawer>
  );
};

export default SiteAdminDrawer;

const styles = {
  drawer: {
    "& .MuiDrawer-paper": {
      backgroundColor: "common.white",
      outline: 0,
      border: "none",
      overflowY: "auto",
      overflowX: "hidden",
      "&::-webkit-scrollbar": {
        display: "none",
      },
    },
  },
  mainGrid: {
    display: "flex",
    justifyContent: "center",
    mt: "60px",
    paddingX: "5px",
  },

  pinIconGrid: { display: "flex", justifyContent: "flex-end" },
  alignCenter: { display: "flex", justifyContent: "center", my: "5px" },
  infoTitle: {
    ml: "16px",
  },
  listItemButton: {
    borderRadius: "10px",

    color: "grey.900",
    "&.Mui-selected": {
      backgroundColor: "secondary.dark",
      color: "common.black",
    },
    ":hover": {
      backgroundColor: "secondary.dark",
    },
  },

  gridItem: {
    maxwidth: "100%",
    whiteSpace: "initial",
    overflowWrap: "break-word",
    ":hover": {
      backgroundColor: "secondary.dark",
    },
  },

  openGrid: {
    paddingX: "30px",
  },
  avatar: { height: "24px", marginRight: "10px", width: "24px" },
};
