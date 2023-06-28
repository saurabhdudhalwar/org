import { useState } from "react";

import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import * as Mui from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import CellmaDrawer from "../../../common/CellmaDrawer";
import { setIsUnderConstruction } from "../../../store/CommonAction";
import Appointments from "../assets/icons/Appointments.png";
import Communication from "../assets/icons/Communication.png";
import Patients from "../assets/icons/Patients.png";
import t from "../assets/translationFiles/serviceAppointmentTranslation";

const ServiceAppointmentReminderDrawer = () => {
  const [isServiceAlertOpen, setIsServiceAlertOpen] = useState(true);
  const [isServiceTasksOpen, setIsServiceTaskOpen] = useState(false);
  const [isCommunicationOpen, setIsCommunicationOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(1);

  const handleListItemSelected = (event: any, index: any) => {
    setSelectedIndex(index);
  };
  const dispatch = useDispatch();
  const { isDrawerOpen } = useSelector((state: any) => state.common);
  return (
    <CellmaDrawer open={isDrawerOpen}>
      <Mui.Grid container sx={styles.mainGrid}>
        <Mui.Grid item xs={12} sx={styles.alignCenter}>
          <Mui.ListItemButton
            onClick={() => setIsServiceAlertOpen(!isServiceAlertOpen)}
            selected={isServiceAlertOpen}
            sx={styles.listItemButton}
            data-testid="Service Alert"
          >
            <Mui.Avatar
              variant="square"
              src={Appointments}
              alt="Service Alert Image Avatar"
              sx={styles.avatar}
            />
            <Mui.ListItemText
              sx={styles.infoTitle}
              primary={t("serviceAlert")}
            />
            {isServiceAlertOpen ? (
              <ExpandLess />
            ) : (
              <ExpandMore sx={{ color: "success.dark" }} />
            )}
          </Mui.ListItemButton>
        </Mui.Grid>
        {isServiceAlertOpen && (
          <Mui.Grid item container sx={styles.openGrid}>
            <Mui.Grid item xs={12} sx={styles.gridItem}>
              <Mui.ListItemButton
                onClick={(event) => {
                  dispatch(setIsUnderConstruction(true));
                  handleListItemSelected(event, 0);
                }}
                data-testid="Alert"
              >
                <Mui.Typography variant={selectedIndex === 0 ? "h4" : "h5"}>
                  {t("alerts")}
                </Mui.Typography>
              </Mui.ListItemButton>
            </Mui.Grid>
            <Mui.Grid item xs={12} sx={styles.gridItem}>
              <Mui.ListItemButton
                onClick={(event) => {
                  handleListItemSelected(event, 1);
                }}
                data-testid="Service Reminders"
              >
                <Mui.Typography variant={selectedIndex === 1 ? "h4" : "h5"}>
                  {t("serviceReminders")}
                </Mui.Typography>
              </Mui.ListItemButton>
            </Mui.Grid>
          </Mui.Grid>
        )}
        <Mui.Grid item xs={12} sx={styles.alignCenter}>
          <Mui.ListItemButton
            onClick={() => setIsServiceTaskOpen(!isServiceTasksOpen)}
            selected={isServiceTasksOpen}
            sx={styles.listItemButton}
            data-testid="Service Task"
          >
            <Mui.Avatar
              variant="square"
              src={Patients}
              alt="Service Task Image Avatar"
              sx={styles.avatar}
            />
            <Mui.ListItemText
              sx={styles.infoTitle}
              primary={t("serviceTasks")}
            />
            {isServiceTasksOpen ? (
              <ExpandLess />
            ) : (
              <ExpandMore sx={{ color: "success.dark" }} />
            )}
          </Mui.ListItemButton>
        </Mui.Grid>
        {isServiceTasksOpen && (
          <Mui.Grid item container sx={styles.openGrid}>
            <Mui.Grid item xs={12} sx={styles.gridItem}>
              <Mui.ListItemButton
                onClick={(event) => {
                  dispatch(setIsUnderConstruction(true));
                  handleListItemSelected(event, 2);
                }}
                data-testid="Task"
              >
                <Mui.Typography variant={selectedIndex === 2 ? "h4" : "h5"}>
                  {t("tasks")}
                </Mui.Typography>
              </Mui.ListItemButton>
            </Mui.Grid>
            <Mui.Grid item xs={12} sx={styles.gridItem}>
              <Mui.ListItemButton
                onClick={(event) => {
                  dispatch(setIsUnderConstruction(true));
                  handleListItemSelected(event, 3);
                }}
                data-testid="WorkList"
              >
                <Mui.Typography variant={selectedIndex === 3 ? "h4" : "h5"}>
                  {t("worklist")}
                </Mui.Typography>
              </Mui.ListItemButton>
            </Mui.Grid>
          </Mui.Grid>
        )}
        <Mui.Grid item xs={12} sx={styles.alignCenter}>
          <Mui.ListItemButton
            onClick={() => setIsCommunicationOpen(!isCommunicationOpen)}
            selected={isCommunicationOpen}
            sx={styles.listItemButton}
            data-testid="Communication"
          >
            <Mui.Avatar
              variant="square"
              src={Communication}
              alt="Communication Image Avatar"
              sx={styles.avatar}
            />
            <Mui.ListItemText
              sx={styles.infoTitle}
              primary={t("communication")}
            />
            {isCommunicationOpen ? (
              <ExpandLess />
            ) : (
              <ExpandMore sx={{ color: "success.dark" }} />
            )}
          </Mui.ListItemButton>
        </Mui.Grid>
        {isCommunicationOpen && (
          <Mui.Grid item container sx={styles.openGrid}>
            <Mui.Grid item xs={12} sx={styles.gridItem}>
              <Mui.ListItemButton
                onClick={(event) => {
                  dispatch(setIsUnderConstruction(true));
                  handleListItemSelected(event, 4);
                }}
                data-testid="Communication"
              >
                <Mui.Typography variant={selectedIndex === 4 ? "h4" : "h5"}>
                  {t("communication")}
                </Mui.Typography>
              </Mui.ListItemButton>
            </Mui.Grid>
            <Mui.Grid item xs={12} sx={styles.gridItem}>
              <Mui.ListItemButton
                onClick={(event) => {
                  dispatch(setIsUnderConstruction(true));
                  handleListItemSelected(event, 5);
                }}
                data-testid="Patient Search"
              >
                <Mui.Typography variant={selectedIndex === 5 ? "h4" : "h5"}>
                  {t("patientSearch")}
                </Mui.Typography>
              </Mui.ListItemButton>
            </Mui.Grid>
            <Mui.Grid item xs={12} sx={styles.gridItem}>
              <Mui.ListItemButton
                onClick={(event) => {
                  dispatch(setIsUnderConstruction(true));
                  handleListItemSelected(event, 6);
                }}
                data-testid="Text And Email Sent"
              >
                <Mui.Typography variant={selectedIndex === 6 ? "h4" : "h5"}>
                  {t("textAndEmailSent")}
                </Mui.Typography>
              </Mui.ListItemButton>
            </Mui.Grid>
            <Mui.Grid item xs={12} sx={styles.gridItem}>
              <Mui.ListItemButton
                onClick={(event) => {
                  dispatch(setIsUnderConstruction(true));
                  handleListItemSelected(event, 7);
                }}
                data-testid="Patient Communication"
              >
                <Mui.Typography variant={selectedIndex === 7 ? "h4" : "h5"}>
                  {t("patientCommunication")}
                </Mui.Typography>
              </Mui.ListItemButton>
            </Mui.Grid>
            <Mui.Grid item xs={12} sx={styles.gridItem}>
              <Mui.ListItemButton
                onClick={(event) => {
                  dispatch(setIsUnderConstruction(true));
                  handleListItemSelected(event, 8);
                }}
                data-testid="Patient Location History"
              >
                <Mui.Typography variant={selectedIndex === 8 ? "h4" : "h5"}>
                  {t("patientLocationHistory")}
                </Mui.Typography>
              </Mui.ListItemButton>
            </Mui.Grid>
            <Mui.Grid item xs={12} sx={styles.gridItem}>
              <Mui.ListItemButton
                onClick={(event) => {
                  dispatch(setIsUnderConstruction(true));
                  handleListItemSelected(event, 9);
                }}
                data-testid="User Conversations"
              >
                <Mui.Typography variant={selectedIndex === 9 ? "h4" : "h5"}>
                  {t("userConversations")}
                </Mui.Typography>
              </Mui.ListItemButton>
            </Mui.Grid>
            <Mui.Grid item xs={12} sx={styles.gridItem}>
              <Mui.ListItemButton
                onClick={(event) => {
                  dispatch(setIsUnderConstruction(true));
                  handleListItemSelected(event, 10);
                }}
                data-testid="Investigation Conversations"
              >
                <Mui.Typography variant={selectedIndex === 10 ? "h4" : "h5"}>
                  {t("investigationConversations")}
                </Mui.Typography>
              </Mui.ListItemButton>
            </Mui.Grid>
          </Mui.Grid>
        )}
      </Mui.Grid>
    </CellmaDrawer>
  );
};

export default ServiceAppointmentReminderDrawer;

const styles = {
  mainGrid: {
    display: "flex",
    justifyContent: "center",
    mt: "90px",
    paddingX: "5px",
  },
  pinIconGrid: { display: "flex", justifyContent: "flex-end" },
  alignCenter: { display: "flex", justifyContent: "center", my: "5px" },
  infoTitle: {
    ml: "1px",
  },
  listItemButton: {
    display: "flex",
    justifyContent: "space-between",
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
    maxWidth: "100%",
    borderRadius: "10px",
    // whiteSpace: "initial"
    overflowWrap: "break-word",
  },
  openGrid: {
    paddingX: "20px",
    borderRadius: "10px",
  },
  avatar: { height: "24px", marginRight: "10px", width: "24px" },
};
