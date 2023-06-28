import { useRef, useState } from "react";

import { ExpandLess, ExpandMore } from "@mui/icons-material";
import {
  Avatar,
  Collapse,
  Grid,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { BsFillPinAngleFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useReactToPrint } from "react-to-print";

import LabelPrint from "./LabelPrint";
import CellmaDrawer from "../../../common/CellmaDrawer";
import { setIsUnderConstruction } from "../../../store/CommonAction";
import Appointment from "../assets/icons/Appointment.png";
import Consent from "../assets/icons/Consent.png";
import Patient from "../assets/icons/Patient.png";
import Referrals from "../assets/icons/Referrals.png";
import translate from "../assets/translationFiles/multiplePatientDrawerTranslation";
import { setIsPinSelected } from "../store/PatientAction";

interface Props {
  open: any;
}

const MultiplePatientDrawer: React.FC<Props> = (props) => {
  const [isOpenPatient, setIsOpenPatient] = useState(false);
  const [isOpenReferral, setIsOpenReferral] = useState(false);
  const [isOpenConsent, setIsOpenConsent] = useState(false);
  const [isOpenAppointments, setIsOpenAppointments] = useState(false);

  const { patientId } = useSelector((state: any) => state.patient);

  const { open } = props;
  const dispatch = useDispatch();
  const { language } = useSelector((state: any) => state.language);
  const { isPinSelected } = useSelector((state: any) => state.patient);
  const navigate = useNavigate();
  const componentToPatientLabelPrint = useRef(null);

  const handlePatientLabelPrint = useReactToPrint({
    content: () => componentToPatientLabelPrint.current,
  });

  return (
    <CellmaDrawer open={open}>
      <Grid container sx={styles.mainGrid}>
        <Grid item xs={12} sx={styles.pinIconGrid}>
          <IconButton
            aria-label="pin"
            data-testid="Multiple patient drawer pin"
            title="Multiple patient drawer pin"
            size="medium"
            sx={{ color: isPinSelected ? "primary.main" : "" }}
            onClick={() => {
              dispatch(setIsPinSelected(!isPinSelected));
            }}
          >
            <BsFillPinAngleFill />
          </IconButton>
        </Grid>

        <Grid item xs={12} sx={styles.alignCenter}>
          <ListItemButton
            onClick={() => setIsOpenPatient(!isOpenPatient)}
            selected={isOpenPatient}
            sx={styles.listItemButton}
            data-testid="Patient"
          >
            <Avatar
              variant="square"
              src={Patient}
              alt="Patient Image Avatar"
              sx={styles.avatar}
            />
            <ListItemText
              sx={styles.infoTitle}
              primary={translate("patient", language)}
            />
            {isOpenPatient ? (
              <ExpandLess />
            ) : (
              <ExpandMore sx={{ color: "success.dark" }} />
            )}
          </ListItemButton>
        </Grid>
        {isOpenPatient && (
          <Grid item container sx={styles.openGrid}>
            <Grid item xs={12} sx={styles.gridItem}>
              <Collapse in={isOpenPatient} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItemButton
                    data-testid="Search Patient"
                    onClick={() => {
                      navigate("/cellmaUser/patient/patientSearch");
                      window.location.reload();
                    }}
                  >
                    <ListItemText primary={translate("search", language)} />
                  </ListItemButton>
                </List>
              </Collapse>
            </Grid>
            <Grid item xs={12} sx={styles.gridItem}>
              <Collapse in={isOpenPatient} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItemButton
                    data-testid="Add Patient"
                    onClick={() =>
                      navigate("/cellmaUser/patient/patientDuplicateCheck", {
                        state: " ",
                      })
                    }
                    disabled={patientId !== null}
                  >
                    <ListItemText primary={translate("add", language)} />
                  </ListItemButton>
                </List>
              </Collapse>
            </Grid>
            <Grid item xs={12} sx={styles.gridItem}>
              <Collapse in={isOpenPatient} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItemButton
                    data-testid="Labels"
                    onClick={handlePatientLabelPrint}
                    disabled={!patientId}
                  >
                    <ListItemText primary={translate("labels", language)} />
                  </ListItemButton>
                </List>
              </Collapse>
            </Grid>
            <Grid item xs={12} sx={styles.gridItem}>
              <Collapse in={isOpenPatient} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItemButton
                    data-testid="Insurance"
                    onClick={() => dispatch(setIsUnderConstruction(true))}
                    disabled={!patientId}
                  >
                    <ListItemText primary={translate("insurance", language)} />
                  </ListItemButton>
                </List>
              </Collapse>
            </Grid>
            <Grid item xs={12} sx={styles.gridItem}>
              <Collapse in={isOpenPatient} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItemButton
                    data-testid="Duplicate Check"
                    onClick={() => dispatch(setIsUnderConstruction(true))}
                    disabled={!patientId}
                  >
                    <ListItemText
                      primary={translate("duplicateCheck", language)}
                    />
                  </ListItemButton>
                </List>
              </Collapse>
            </Grid>
            <Grid item xs={12} sx={styles.gridItem}>
              <Collapse in={isOpenPatient} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItemButton
                    data-testid="GP"
                    onClick={() => {
                      navigate("/cellmaUser/patient/editPatient");
                    }}
                    disabled={!patientId}
                  >
                    <ListItemText primary={translate("gp", language)} />
                  </ListItemButton>
                </List>
              </Collapse>
            </Grid>
            <Grid item xs={12} sx={styles.gridItem}>
              <Collapse in={isOpenPatient} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItemButton
                    data-testid="Interested Party"
                    onClick={() => dispatch(setIsUnderConstruction(true))}
                    disabled={!patientId}
                  >
                    <ListItemText
                      primary={translate("interestedParty", language)}
                    />
                  </ListItemButton>
                </List>
              </Collapse>
            </Grid>
          </Grid>
        )}

        <Grid item xs={12} sx={styles.alignCenter}>
          <ListItemButton
            sx={styles.listItemButton}
            onClick={() => setIsOpenConsent(!isOpenConsent)}
            selected={isOpenConsent}
            data-testid="Consent"
          >
            <Avatar
              variant="square"
              src={Consent}
              alt="Consent Image Avatar"
              sx={styles.avatar}
            />

            <ListItemText
              sx={styles.infoTitle}
              primary={translate("consent", language)}
            />
            {isOpenConsent ? (
              <ExpandLess />
            ) : (
              <ExpandMore sx={{ color: "success.dark" }} />
            )}
          </ListItemButton>
        </Grid>
        {isOpenConsent && (
          <Grid item container sx={styles.openGrid}>
            <Grid item xs={12} sx={styles.gridItem}>
              <Collapse in={isOpenConsent} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItemButton
                    data-testid="Add Concent"
                    onClick={() => dispatch(setIsUnderConstruction(true))}
                    disabled={!patientId}
                  >
                    <ListItemText primary={translate("add", language)} />
                  </ListItemButton>
                </List>
              </Collapse>
            </Grid>
            <Grid item xs={12} sx={styles.gridItem}>
              <Collapse in={isOpenConsent} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItemButton
                    data-testid="View Concent"
                    onClick={() => dispatch(setIsUnderConstruction(true))}
                    disabled={!patientId}
                  >
                    <ListItemText primary={translate("view", language)} />
                  </ListItemButton>
                </List>
              </Collapse>
            </Grid>
          </Grid>
        )}

        <Grid item xs={12} sx={styles.alignCenter}>
          <ListItemButton
            sx={styles.listItemButton}
            onClick={() => setIsOpenAppointments(!isOpenAppointments)}
            selected={isOpenAppointments}
            data-testid="Appointment"
          >
            <Avatar
              variant="square"
              src={Appointment}
              alt="Appointment Image Avatar "
              sx={styles.avatar}
            />

            <ListItemText
              sx={styles.infoTitle}
              primary={translate("appointment", language)}
            />
            {isOpenAppointments ? (
              <ExpandLess />
            ) : (
              <ExpandMore sx={{ color: "success.dark" }} />
            )}
          </ListItemButton>
        </Grid>
        {isOpenAppointments && (
          <Grid item container sx={styles.openGrid}>
            <Grid item xs={12} sx={styles.gridItem}>
              <Collapse in={isOpenAppointments} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItemButton
                    data-testid="Add Appointment"
                    onClick={() => dispatch(setIsUnderConstruction(true))}
                    disabled={!patientId}
                  >
                    <ListItemText primary={translate("add", language)} />
                  </ListItemButton>
                </List>
              </Collapse>
            </Grid>
            <Grid item xs={12} sx={styles.gridItem}>
              <Collapse in={isOpenAppointments} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItemButton
                    data-testid="View Appointment"
                    onClick={() => dispatch(setIsUnderConstruction(true))}
                    disabled={!patientId}
                  >
                    <ListItemText primary={translate("view", language)} />
                  </ListItemButton>
                </List>
              </Collapse>
            </Grid>
          </Grid>
        )}

        <Grid item xs={12} sx={styles.alignCenter}>
          <ListItemButton
            data-testid="Referral"
            onClick={() => setIsOpenReferral(!isOpenReferral)}
            selected={isOpenReferral}
            sx={styles.listItemButton}
          >
            <Avatar
              variant="square"
              src={Referrals}
              alt="Referrals Image Avatar"
              sx={styles.avatar}
            />

            <ListItemText
              sx={styles.infoTitle}
              primary={translate("referral", language)}
            />
            {isOpenReferral ? (
              <ExpandLess />
            ) : (
              <ExpandMore sx={{ color: "success.dark" }} />
            )}
          </ListItemButton>
        </Grid>
        {isOpenReferral && (
          <Grid item container sx={styles.openGrid}>
            <Grid item xs={12} sx={styles.gridItem}>
              <Collapse in={isOpenReferral} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItemButton
                    data-testid="Add Referral"
                    onClick={() => {
                      navigate("/cellmaUser/referral/addReferral");
                    }}
                    disabled={!patientId}
                  >
                    <ListItemText primary={translate("add", language)} />
                  </ListItemButton>
                </List>
              </Collapse>
            </Grid>
            <Grid item xs={12} sx={styles.gridItem}>
              <Collapse in={isOpenReferral} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItemButton
                    data-testid="View Referral"
                    onClick={() => dispatch(setIsUnderConstruction(true))}
                    disabled={!patientId}
                  >
                    <ListItemText primary={translate("view", language)} />
                  </ListItemButton>
                </List>
              </Collapse>
            </Grid>
          </Grid>
        )}
      </Grid>
      <Grid container sx={{ display: "none" }}>
        <Grid ref={componentToPatientLabelPrint}>
          <LabelPrint />
        </Grid>
      </Grid>
    </CellmaDrawer>
  );
};

export default MultiplePatientDrawer;

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
