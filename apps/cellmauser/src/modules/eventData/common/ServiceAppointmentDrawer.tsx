import { useState } from "react";

import { ExpandLess, ExpandMore } from "@mui/icons-material";
import * as Mui from "@mui/material";
import { Divider } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import CellmaDrawer from "../../../common/CellmaDrawer";
import { setIsUnderConstruction } from "../../../store/CommonAction";
import Appointments from "../assets/icons/Appointments.png";
import CellmaInbox from "../assets/icons/CellmaInbox.png";
import OrderComms from "../assets/icons/OrderComms.png";
import Patients from "../assets/icons/Patients.png";
import ServiceSettings from "../assets/icons/ServiceSettings.png";
import t from "../assets/translationFiles/serviceAppointmentTranslation";

interface Props {}

const ServiceAppointmentDrawer: React.FC<Props> = () => {
  const [isAppointmentOpen, setIsAppointmentOpen] = useState(true);
  const [isPatientsOpen, setIsPatientsOpen] = useState(false);
  const [isCellmaInboxOpen, setIsCellmaInboxOpen] = useState(false);
  const [isOrderCommOpen, setIsOrderCommOpen] = useState(false);
  const [isLabsOpen, setIsLabsOpen] = useState(false);
  const [isImagingOpen, setIsImagingOpen] = useState(false);
  const [isOutstandingInvestOpen, setIsOutstandingInvestOpen] = useState(false);

  const [isServiceSettingOpen, setIsServiceSettingOpen] = useState(false);
  const [isServiceDetailsOpen, setIsServiceDetailsOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isDrawerOpen } = useSelector((state: any) => state.common);

  return (
    <CellmaDrawer open={isDrawerOpen}>
      <Mui.Grid container sx={styles.mainGrid}>
        <Mui.Grid item xs={12} sx={styles.alignCenter}>
          <Mui.ListItemButton
            onClick={() => setIsAppointmentOpen(!isAppointmentOpen)}
            selected={isAppointmentOpen}
            sx={styles.listItemButton}
          >
            <Mui.Avatar
              variant="square"
              src={Appointments}
              alt="Appointments Image Avatar"
              sx={styles.avatar}
            />
            <Mui.ListItemText
              sx={styles.infoTitle}
              primary={t("appointments")}
            />
            {isAppointmentOpen ? (
              <ExpandLess />
            ) : (
              <ExpandMore sx={{ color: "success.dark" }} />
            )}
          </Mui.ListItemButton>
        </Mui.Grid>
        {isAppointmentOpen && (
          <Mui.Grid item container sx={styles.openGrid}>
            <Mui.Grid item xs={12} sx={styles.gridItem}>
              <Mui.ListItemButton
                onClick={() => dispatch(setIsUnderConstruction(true))}
              >
                <Mui.Typography variant="h5">
                  {t("addAppointments")}
                </Mui.Typography>
              </Mui.ListItemButton>
            </Mui.Grid>
            <Mui.Grid item xs={12} sx={styles.gridItem}>
              <Mui.ListItemButton
                onClick={() =>
                  navigate("/cellmaUser/eventData/serviceAppointments")
                }
              >
                <Mui.Typography variant="h5">
                  {t("serviceAppointments")}
                </Mui.Typography>
              </Mui.ListItemButton>
            </Mui.Grid>
            <Mui.Grid item xs={12} sx={styles.gridItem}>
              <Mui.ListItemButton
                onClick={() =>
                  navigate("/cellmaUser/eventData/serviceHPAppointments")
                }
              >
                <Mui.Typography variant="h5">
                  {t("hpAppointments")}
                </Mui.Typography>
              </Mui.ListItemButton>
            </Mui.Grid>
            <Mui.Grid item xs={12} sx={styles.gridItem}>
              <Mui.ListItemButton
                onClick={() =>
                  navigate("/cellmaUser/eventData/provisionalAppointment")
                }
              >
                <Mui.Typography variant="h5">
                  {t("provisionalAppointments")}
                </Mui.Typography>
              </Mui.ListItemButton>
            </Mui.Grid>
            <Mui.Grid item xs={12} sx={styles.gridItem}>
              <Mui.ListItemButton
                onClick={() => dispatch(setIsUnderConstruction(true))}
              >
                <Mui.Typography variant="h5">
                  {t("waitingRooms")}
                </Mui.Typography>
              </Mui.ListItemButton>
            </Mui.Grid>
            <Mui.Grid item xs={12} sx={styles.gridItem}>
              <Mui.ListItemButton
                onClick={() => dispatch(setIsUnderConstruction(true))}
              >
                <Mui.Typography variant="h5">{t("waitingList")}</Mui.Typography>
              </Mui.ListItemButton>
            </Mui.Grid>
            <Mui.Grid item xs={12} sx={styles.gridItem}>
              <Mui.ListItemButton
                onClick={() => navigate("/cellmaUser/eventData/roomBooking")}
              >
                <Mui.Typography variant="h5">{t("roomBooking")}</Mui.Typography>
              </Mui.ListItemButton>
            </Mui.Grid>
          </Mui.Grid>
        )}
        <Mui.Grid item xs={12} sx={styles.alignCenter}>
          <Mui.ListItemButton
            onClick={() => setIsPatientsOpen(!isPatientsOpen)}
            selected={isPatientsOpen}
            sx={styles.listItemButton}
          >
            <Mui.Avatar
              variant="square"
              src={Patients}
              alt="Patients Image Avatar"
              sx={styles.avatar}
            />

            <Mui.ListItemText sx={styles.infoTitle} primary={t("patients")} />
            {isPatientsOpen ? (
              <ExpandLess />
            ) : (
              <ExpandMore sx={{ color: "success.dark" }} />
            )}
          </Mui.ListItemButton>
        </Mui.Grid>
        {isPatientsOpen && (
          <Mui.Grid item container sx={styles.openGrid}>
            <Mui.Grid item xs={12} sx={styles.gridItem}>
              <Mui.ListItemButton
                onClick={() =>
                  navigate("/cellmaUser/referral/serviceReferrals")
                }
              >
                <Mui.Typography variant="h5">{t("referrals")}</Mui.Typography>
              </Mui.ListItemButton>
            </Mui.Grid>
            <Mui.Grid item xs={12} sx={styles.gridItem}>
              <Mui.ListItemButton
                onClick={() => dispatch(setIsUnderConstruction(true))}
              >
                <Mui.Typography variant="h5">{t("alerts")}</Mui.Typography>
              </Mui.ListItemButton>
            </Mui.Grid>
            <Mui.Grid item xs={12} sx={styles.gridItem}>
              <Mui.ListItemButton
                onClick={() => dispatch(setIsUnderConstruction(true))}
              >
                <Mui.Typography variant="h5">{t("myTasks")}</Mui.Typography>
              </Mui.ListItemButton>
            </Mui.Grid>
            <Mui.Grid item xs={12} sx={styles.gridItem}>
              <Mui.ListItemButton
                onClick={() => dispatch(setIsUnderConstruction(true))}
              >
                <Mui.Typography variant="h5">
                  {t("serviceTasks")}
                </Mui.Typography>
              </Mui.ListItemButton>
            </Mui.Grid>
            <Mui.Grid item xs={12} sx={styles.gridItem}>
              <Mui.ListItemButton
                onClick={() => dispatch(setIsUnderConstruction(true))}
              >
                <Mui.Typography variant="h5">{t("pathway")}</Mui.Typography>
              </Mui.ListItemButton>
            </Mui.Grid>
            <Mui.Grid item xs={12} sx={styles.gridItem}>
              <Mui.ListItemButton
                onClick={() => dispatch(setIsUnderConstruction(true))}
              >
                <Mui.Typography variant="h5">{t("proms")}</Mui.Typography>
              </Mui.ListItemButton>
            </Mui.Grid>
            <Mui.Grid item xs={12} sx={styles.gridItem}>
              <Mui.ListItemButton
                onClick={() => dispatch(setIsUnderConstruction(true))}
              >
                <Mui.Typography variant="h5">{t("documents")}</Mui.Typography>
              </Mui.ListItemButton>
            </Mui.Grid>
            <Mui.Grid item xs={12} sx={styles.gridItem}>
              <Mui.ListItemButton
                onClick={() => dispatch(setIsUnderConstruction(true))}
              >
                <Mui.Typography variant="h5">
                  {t("serviceLetters")}
                </Mui.Typography>
              </Mui.ListItemButton>
            </Mui.Grid>
            <Mui.Grid item xs={12} sx={styles.gridItem}>
              <Mui.ListItemButton
                onClick={() => dispatch(setIsUnderConstruction(true))}
              >
                <Mui.Typography variant="h5">
                  {t("contraceptionUnmatched")}
                </Mui.Typography>
              </Mui.ListItemButton>
            </Mui.Grid>
            <Mui.Grid item xs={12} sx={styles.gridItem}>
              <Mui.ListItemButton
                onClick={() => dispatch(setIsUnderConstruction(true))}
              >
                <Mui.Typography variant="h5">{t("templates")}</Mui.Typography>
              </Mui.ListItemButton>
            </Mui.Grid>
          </Mui.Grid>
        )}
        <Mui.Grid item xs={12} sx={styles.alignCenter}>
          <Mui.ListItemButton
            onClick={() => setIsCellmaInboxOpen(!isCellmaInboxOpen)}
            selected={isCellmaInboxOpen}
            sx={styles.listItemButton}
          >
            <Mui.Avatar
              variant="square"
              src={CellmaInbox}
              alt="Cellma Inbox Image Avatar"
              sx={styles.avatar}
            />

            <Mui.ListItemText
              sx={styles.infoTitle}
              primary={t("cellmaInbox")}
            />
            {isCellmaInboxOpen ? (
              <ExpandLess />
            ) : (
              <ExpandMore sx={{ color: "success.dark" }} />
            )}
          </Mui.ListItemButton>
        </Mui.Grid>
        {isCellmaInboxOpen && (
          <Mui.Grid item container sx={styles.openGrid}>
            <Mui.Grid item xs={12} sx={styles.gridItem}>
              <Mui.ListItemButton
                onClick={() => dispatch(setIsUnderConstruction(true))}
              >
                <Mui.Typography variant="h5">{t("sent")}</Mui.Typography>
              </Mui.ListItemButton>
            </Mui.Grid>
            <Mui.Grid item xs={12} sx={styles.gridItem}>
              <Mui.ListItemButton
                onClick={() => dispatch(setIsUnderConstruction(true))}
              >
                <Mui.Typography variant="h5">{t("received")}</Mui.Typography>
              </Mui.ListItemButton>
            </Mui.Grid>
          </Mui.Grid>
        )}
        <Mui.Grid item xs={12} sx={styles.alignCenter}>
          <Mui.ListItemButton
            onClick={() => setIsOrderCommOpen(!isOrderCommOpen)}
            selected={isOrderCommOpen}
            sx={styles.listItemButton}
          >
            <Mui.Avatar
              variant="square"
              src={OrderComms}
              alt="Order comm Image Avatar"
              sx={styles.avatar}
            />

            <Mui.ListItemText sx={styles.infoTitle} primary={t("orderComm")} />
            {isOrderCommOpen ? (
              <ExpandLess />
            ) : (
              <ExpandMore sx={{ color: "success.dark" }} />
            )}
          </Mui.ListItemButton>
        </Mui.Grid>
        {isOrderCommOpen && (
          <Mui.Grid item container sx={styles.openGrid}>
            <Mui.Grid item xs={12} sx={styles.gridItem}>
              <Mui.Collapse in={isOrderCommOpen} timeout="auto" unmountOnExit>
                <Mui.List component="div" disablePadding>
                  <Mui.ListItemButton
                    onClick={() => setIsLabsOpen(!isLabsOpen)}
                    selected={isLabsOpen}
                    sx={styles.listItemButton}
                  >
                    <Mui.Typography variant="h5" sx={{ fontWeight: "bold" }}>
                      {t("labs")}
                    </Mui.Typography>
                    {isLabsOpen ? (
                      <ExpandLess />
                    ) : (
                      <ExpandMore sx={{ color: "success.dark" }} />
                    )}
                  </Mui.ListItemButton>
                </Mui.List>
              </Mui.Collapse>
            </Mui.Grid>
            {isLabsOpen && (
              <Mui.Grid item container sx={styles.openGrid}>
                <Mui.Grid item xs={12} sx={styles.gridItem}>
                  <Mui.ListItemButton
                    onClick={() => dispatch(setIsUnderConstruction(true))}
                  >
                    <Mui.Typography variant="h5">
                      {t("outstanding")}
                    </Mui.Typography>
                  </Mui.ListItemButton>
                </Mui.Grid>
                <Mui.Grid item xs={12} sx={styles.gridItem}>
                  <Mui.ListItemButton
                    onClick={() => dispatch(setIsUnderConstruction(true))}
                  >
                    <Mui.Typography variant="h5">{t("request")}</Mui.Typography>
                  </Mui.ListItemButton>
                </Mui.Grid>
                <Mui.Grid item xs={12} sx={styles.gridItem}>
                  <Mui.ListItemButton
                    onClick={() => dispatch(setIsUnderConstruction(true))}
                  >
                    <Mui.Typography variant="h5">{t("result")}</Mui.Typography>
                  </Mui.ListItemButton>
                </Mui.Grid>

                <Mui.Grid item xs={12}>
                  <Divider sx={{ my: "5px" }} />
                </Mui.Grid>
              </Mui.Grid>
            )}
            <Mui.Grid item xs={12} sx={styles.gridItem}>
              <Mui.Collapse in={isOrderCommOpen} timeout="auto" unmountOnExit>
                <Mui.List component="div" disablePadding>
                  <Mui.ListItemButton
                    onClick={() => setIsImagingOpen(!isImagingOpen)}
                    selected={isImagingOpen}
                    sx={styles.listItemButton}
                  >
                    <Mui.Typography variant="h5" sx={{ fontWeight: "bold" }}>
                      {t("imaging")}
                    </Mui.Typography>
                    {isImagingOpen ? (
                      <ExpandLess />
                    ) : (
                      <ExpandMore sx={{ color: "success.dark" }} />
                    )}
                  </Mui.ListItemButton>
                </Mui.List>
              </Mui.Collapse>
            </Mui.Grid>
            {isImagingOpen && (
              <Mui.Grid item container sx={styles.openGrid}>
                <Mui.Grid item xs={12} sx={styles.gridItem}>
                  <Mui.ListItemButton
                    onClick={() => dispatch(setIsUnderConstruction(true))}
                  >
                    <Mui.Typography variant="h5">
                      {t("outstanding")}
                    </Mui.Typography>
                  </Mui.ListItemButton>
                </Mui.Grid>
                <Mui.Grid item xs={12} sx={styles.gridItem}>
                  <Mui.ListItemButton
                    onClick={() => dispatch(setIsUnderConstruction(true))}
                  >
                    <Mui.Typography variant="h5">{t("request")}</Mui.Typography>
                  </Mui.ListItemButton>
                </Mui.Grid>

                <Mui.Grid item xs={12}>
                  <Divider sx={{ my: "5px" }} />
                </Mui.Grid>
              </Mui.Grid>
            )}
            <Mui.Grid item xs={12} sx={styles.gridItem}>
              <Mui.Collapse in={isOrderCommOpen} timeout="auto" unmountOnExit>
                <Mui.List component="div" disablePadding>
                  <Mui.ListItemButton
                    onClick={() =>
                      setIsOutstandingInvestOpen(!isOutstandingInvestOpen)
                    }
                    selected={isOutstandingInvestOpen}
                    sx={styles.listItemButton}
                  >
                    <Mui.Typography variant="h5" sx={{ fontWeight: "bold" }}>
                      {t("outstandingInvest")}
                    </Mui.Typography>
                    {isOutstandingInvestOpen ? (
                      <ExpandLess />
                    ) : (
                      <ExpandMore sx={{ color: "success.dark" }} />
                    )}
                  </Mui.ListItemButton>
                </Mui.List>
              </Mui.Collapse>
            </Mui.Grid>
            {isOutstandingInvestOpen && (
              <Mui.Grid item container sx={styles.openGrid}>
                <Mui.Grid item xs={12} sx={styles.gridItem}>
                  <Mui.ListItemButton
                    onClick={() => dispatch(setIsUnderConstruction(true))}
                  >
                    <Mui.Typography variant="h5">
                      {t("allInvestigation")}
                    </Mui.Typography>
                  </Mui.ListItemButton>
                </Mui.Grid>

                <Mui.Grid item xs={12}>
                  <Divider sx={{ my: "5px" }} />
                </Mui.Grid>
              </Mui.Grid>
            )}
          </Mui.Grid>
        )}
        <Mui.Grid item xs={12} sx={styles.alignCenter}>
          <Mui.ListItemButton
            onClick={() => setIsServiceSettingOpen(!isServiceSettingOpen)}
            selected={isServiceSettingOpen}
            sx={styles.listItemButton}
          >
            <Mui.Avatar
              variant="square"
              src={ServiceSettings}
              alt="Service Setting Image Avatar"
              sx={styles.avatar}
            />

            <Mui.ListItemText
              sx={styles.infoTitle}
              primary={t("serviceSettings")}
            />
            {isServiceSettingOpen ? (
              <ExpandLess />
            ) : (
              <ExpandMore sx={{ color: "success.dark" }} />
            )}
          </Mui.ListItemButton>
        </Mui.Grid>
        {isServiceSettingOpen && (
          <Mui.Grid item container sx={styles.openGrid}>
            <Mui.Grid item xs={12} sx={styles.gridItem}>
              <Mui.Collapse
                in={isServiceSettingOpen}
                timeout="auto"
                unmountOnExit
              >
                <Mui.List component="div" disablePadding>
                  <Mui.ListItemButton
                    onClick={() =>
                      setIsServiceDetailsOpen(!isServiceDetailsOpen)
                    }
                    selected={isServiceDetailsOpen}
                    sx={styles.listItemButton}
                  >
                    <Mui.Typography variant="h5" sx={{ fontWeight: "bold" }}>
                      {t("serviceDetails")}
                    </Mui.Typography>
                    {isServiceDetailsOpen ? (
                      <ExpandLess />
                    ) : (
                      <ExpandMore sx={{ color: "success.dark" }} />
                    )}
                  </Mui.ListItemButton>
                </Mui.List>
              </Mui.Collapse>
            </Mui.Grid>
            {isServiceDetailsOpen && (
              <Mui.Grid item container sx={styles.openGrid}>
                <Mui.Grid item xs={12} sx={styles.gridItem}>
                  <Mui.ListItemButton
                    onClick={() => dispatch(setIsUnderConstruction(true))}
                  >
                    <Mui.Typography variant="h5">
                      {t("serviceDetails")}
                    </Mui.Typography>
                  </Mui.ListItemButton>
                </Mui.Grid>
                <Mui.Grid item xs={12} sx={styles.gridItem}>
                  <Mui.ListItemButton
                    onClick={() => dispatch(setIsUnderConstruction(true))}
                  >
                    <Mui.Typography variant="h5">
                      {t("scheduling")}
                    </Mui.Typography>
                  </Mui.ListItemButton>
                </Mui.Grid>
                <Mui.Grid item xs={12} sx={styles.gridItem}>
                  <Mui.ListItemButton
                    onClick={() => dispatch(setIsUnderConstruction(true))}
                  >
                    <Mui.Typography variant="h5">{t("finance")}</Mui.Typography>
                  </Mui.ListItemButton>
                </Mui.Grid>
                <Mui.Grid item xs={12} sx={styles.gridItem}>
                  <Mui.ListItemButton
                    onClick={() => dispatch(setIsUnderConstruction(true))}
                  >
                    <Mui.Typography variant="h5">
                      {t("patientSummary")}
                    </Mui.Typography>
                  </Mui.ListItemButton>
                </Mui.Grid>
                <Mui.Grid item xs={12} sx={styles.gridItem}>
                  <Mui.ListItemButton
                    onClick={() => dispatch(setIsUnderConstruction(true))}
                  >
                    <Mui.Typography variant="h5">
                      {t("waitingRoomMessages")}
                    </Mui.Typography>
                  </Mui.ListItemButton>
                </Mui.Grid>
                <Mui.Grid item xs={12} sx={styles.gridItem}>
                  <Mui.ListItemButton
                    onClick={() => dispatch(setIsUnderConstruction(true))}
                  >
                    <Mui.Typography variant="h5">
                      {t("hideHelpSections")}
                    </Mui.Typography>
                  </Mui.ListItemButton>
                </Mui.Grid>
                <Mui.Grid item xs={12}>
                  <Divider sx={{ my: "5px" }} />
                </Mui.Grid>
              </Mui.Grid>
            )}
            <Mui.Grid item xs={12} sx={styles.gridItem}>
              <Mui.ListItemButton
                onClick={() => dispatch(setIsUnderConstruction(true))}
              >
                <Mui.Typography variant="h5">{t("preferences")}</Mui.Typography>
              </Mui.ListItemButton>
            </Mui.Grid>
            <Mui.Grid item xs={12} sx={styles.gridItem}>
              <Mui.ListItemButton
                onClick={() => dispatch(setIsUnderConstruction(true))}
              >
                <Mui.Typography variant="h5">
                  {t("serviceDashboard")}
                </Mui.Typography>
              </Mui.ListItemButton>
            </Mui.Grid>
            <Mui.Grid item xs={12} sx={styles.gridItem}>
              <Mui.ListItemButton
                onClick={() => dispatch(setIsUnderConstruction(true))}
              >
                <Mui.Typography variant="h5">
                  {t("serviceDefaultQuestions")}
                </Mui.Typography>
              </Mui.ListItemButton>
            </Mui.Grid>
          </Mui.Grid>
        )}
      </Mui.Grid>
    </CellmaDrawer>
  );
};

export default ServiceAppointmentDrawer;

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
