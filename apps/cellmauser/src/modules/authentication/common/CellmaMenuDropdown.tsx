import { useState } from "react";

import {
  Avatar,
  Backdrop,
  Grid,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


import useCellmaVersion from "../../../api/useCellmaVersion";
import * as Common from "../../../common/CommonComponentsIndex";
import {
  setAddReferralMode,
  setIsUnderConstruction,
} from "../../../store/CommonAction";
import {
  setIsContactTypeSelected,
  setIsPatientDeath,
  setIsPatientSelected,
} from "../../patient/store/PatientAction";
import { useDeselectPatient } from "../api/useDeselectPatient";
import useLogout from "../api/useLogout";
import Alerts from "../assets/icons/Alerts.png";
import Appointments from "../assets/icons/Appointments.png";
import CellmaVersion from "../assets/icons/CellmaVersion.png";
import Details from "../assets/icons/Details.png";
import FindPatient from "../assets/icons/FindPatient.png";
import Logout from "../assets/icons/Logout.png";
import PatientSummary from "../assets/icons/PatientSummary.png";
import PhysicalSigns from "../assets/icons/PhysicalSigns.png";
import Referrals from "../assets/icons/Referrals.png";
import Tasks from "../assets/icons/Tasks.png";
import Templates from "../assets/icons/Templates.png";
import WorkLists from "../assets/icons/WorkLists.png";
import t from "../assets/translationFiles/commonAuthenticationTranslation";

interface Props {
  open: boolean;
  onClose:
    | ((event: {}, reason: "backdropClick" | "escapeKeyDown") => void)
    | undefined;
  closeMenu: any;
}

const CellmaMenuDropdown: React.FC<Props> = (props) => {
  const packageJson = 10.00;
  const [showCellmaVersion, setShowCellmaVersion] = useState(false);
  const { isPatientSelected, patientId, sgrId } = useSelector(
    (state: any) => state.patient
  );
  const { userRoles, administration, userName } = useSelector(
    (state: any) => state.auth
  );

  let roles: string[] = [];
  roles = userRoles.includes(",") ? userRoles?.split(",") : [];

  // Api Call for deselect patient
  const { refetch: deselectPatient } = useDeselectPatient(
    parseInt(patientId, 10),
    sgrId,
    false
  );
  const { data: cellmaApiVersion } = useCellmaVersion();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { mutate: logoutAPICall } = useLogout();

  const logout = () => {
    if (patientId !== null) deselectPatient();

    dispatch(setIsPatientSelected(false));
    logoutAPICall();
  };

  return (
    <>
      <Backdrop open={props.open} sx={{ zIndex: 1300 }}>
        {administration !== 1 && userName !== "" && (
          <Menu
            open={props.open}
            onClose={props.onClose}
            onClick={props.closeMenu}
            anchorOrigin={{ vertical: "top", horizontal: "left" }}
            transformOrigin={{ vertical: "top", horizontal: "left" }}
            PaperProps={{
              style: {
                maxHeight: "800px",
                width: "230px",
                marginTop: "45px",
              },
              sx: {
                overflow: "visible",
                "&:before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: 0,
                  right: 100,
                  width: 10,
                  height: 10,
                  bgcolor: "background.paper",
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 1500,
                },
              },
            }}
          >
            <MenuItem
              sx={styles.menuItem}
              data-testid="menuDropDownFindPatient"
              onClick={() => {
                if (patientId !== null && patientId !== undefined) {
                  deselectPatient();
                  dispatch(setIsPatientSelected(false));
                  dispatch(setIsPatientDeath(false));
                }
                navigate("/cellmaUser/patient/patientSearch");
                props.closeMenu();
              }}
            >
              <Avatar
                variant="square"
                src={FindPatient}
                alt="Find Patient Avatar"
                sx={styles.avatar}
              />
              <Typography sx={styles.menuItemText}>
                {t("menuDropDownFindPatient")}
              </Typography>
            </MenuItem>
            <MenuItem
              sx={styles.menuItem}
              data-testid="menuDropDownPatientSummary"
              onClick={() => {
                dispatch(setIsContactTypeSelected(true));
                navigate("/cellmaUser/patient/contactTypeScreen");
              }}
              disabled={!isPatientSelected}
            >
              <Avatar
                variant="square"
                src={PatientSummary}
                alt="Patient Summary Avatar"
                sx={styles.avatar}
              />
              <Typography sx={styles.menuItemText}>
                {t("menuDropDownPatientSummary")}
              </Typography>
            </MenuItem>
            <MenuItem
              sx={styles.menuItem}
              data-testid="menuDropDownAddReferral"
              onClick={() => {
                dispatch(setAddReferralMode("addReferralMode"));
                navigate("/cellmaUser/referral/addReferral");
              }}
              disabled={!isPatientSelected}
            >
              <Avatar
                variant="square"
                src={Referrals}
                alt="Add Referral Avatar"
                sx={styles.avatar}
              />
              <Typography sx={styles.menuItemText}>
                {t("menuDropDownAddReferral")}
              </Typography>
            </MenuItem>
            <MenuItem
              sx={styles.menuItem}
              data-testid="menuDropDownMyDetails"
              onClick={() => dispatch(setIsUnderConstruction(true))}
            >
              <Avatar
                variant="square"
                src={Details}
                alt="My Details Avatar"
                sx={styles.avatar}
              />

              <Typography sx={styles.menuItemText}>
                {t("menuDropDownMyDetails")}
              </Typography>
            </MenuItem>
            <MenuItem
              sx={styles.menuItem}
              data-testid="menuDropDownMyTask"
              onClick={() => dispatch(setIsUnderConstruction(true))}
            >
              <Avatar
                variant="square"
                src={Tasks}
                alt="My Task Avatar"
                sx={styles.avatar}
              />

              <Typography sx={styles.menuItemText}>
                {t("menuDropDownMyTask")}
              </Typography>
            </MenuItem>
            <MenuItem
              sx={styles.menuItem}
              data-testid="menuDropDownMyAlerts"
              onClick={() => dispatch(setIsUnderConstruction(true))}
            >
              <Avatar
                variant="square"
                src={Alerts}
                alt="My Alerts Avatar"
                sx={styles.avatar}
              />

              <Typography sx={styles.menuItemText}>
                {t("menuDropDownMyAlerts")}
              </Typography>
            </MenuItem>
            <MenuItem
              sx={styles.menuItem}
              data-testid="menuDropDownMyTemplates"
              onClick={() => dispatch(setIsUnderConstruction(true))}
            >
              <Avatar
                variant="square"
                src={Templates}
                alt="My Templates Avatar"
                sx={styles.avatar}
              />

              <Typography sx={styles.menuItemText}>
                {t("menuDropDownMyTemplates")}
              </Typography>
            </MenuItem>
            <MenuItem
              sx={styles.menuItem}
              data-testid="menuDropDownMyPhysicalSigns"
              onClick={() => dispatch(setIsUnderConstruction(true))}
            >
              <Avatar
                variant="square"
                src={PhysicalSigns}
                alt="My Physical Signs Avatar"
                sx={styles.avatar}
              />
              <Typography sx={styles.menuItemText}>
                {t("menuDropDownMyPhysicalSigns")}
              </Typography>
            </MenuItem>
            <MenuItem
              sx={styles.menuItem}
              data-testid="menuDropDownMyAppointments"
              onClick={() => dispatch(setIsUnderConstruction(true))}
            >
              <Avatar
                variant="square"
                src={Appointments}
                alt="My Appointments Avatar"
                sx={styles.avatar}
              />

              <Typography sx={styles.menuItemText}>
                {t("menuDropDownMyAppointments")}
              </Typography>
            </MenuItem>
            {roles.includes("Communication") && (
              <MenuItem
                sx={styles.menuItem}
                data-testid="menuDropDownWorklists"
                onClick={() => dispatch(setIsUnderConstruction(true))}
              >
                <Avatar
                  variant="square"
                  src={WorkLists}
                  alt="Work lists Avatar"
                  sx={styles.avatar}
                />

                <Typography sx={styles.menuItemText}>
                  {t("menuDropDownWorklists")}
                </Typography>
              </MenuItem>
            )}

            <MenuItem
              sx={styles.menuItem}
              data-testid="menuDropDownCellmaUserVersion"
              onClick={() => {
                setShowCellmaVersion(true);
              }}
            >
              <Avatar
                variant="square"
                src={CellmaVersion}
                alt="Cellma Version Avatar"
                sx={styles.avatar}
              />

              <Typography sx={styles.menuItemText}>
                {t("menuDropDownCellmaUserVersion")}
              </Typography>
            </MenuItem>
            <MenuItem
              sx={styles.menuItem}
              onClick={logout}
              data-testid="menuDropDownLogout"
            >
              <Avatar
                variant="square"
                src={Logout}
                alt="Logout Avatar"
                sx={styles.avatar}
              />

              <Typography sx={styles.menuItemText}>
                {t("menuDropDownLogout")}
              </Typography>
            </MenuItem>
          </Menu>
        )}
      </Backdrop>
      {showCellmaVersion && (
        <Backdrop open>
          <Common.CellmaPopup
            title={t("menuDropDownCellmaUserVersion")}
            handleCancel={() => setShowCellmaVersion(false)}
          >
            <Grid
              container
              sx={{
                display: "flex",
                justifyContent: "center",
                padding: "20px",
              }}
              rowGap={3}
            >
              <Grid item container spacing={1} xs={12} sx={styles.versionGrid}>
                <Grid item>
                  <Typography variant="h3" display="block">
                    {t("menuDropDownCellmaReactVersion")}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="h2" display="block">
                    {packageJson}
                  </Typography>
                </Grid>
              </Grid>

              <Grid item container spacing={1} xs={12} sx={styles.versionGrid}>
                <Grid item>
                  <Typography variant="h3" display="block">
                    {t("menuDropDownCellmaApiVersion")}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="h2" display="block">
                    {cellmaApiVersion}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Common.CellmaPopup>
        </Backdrop>
      )}
    </>
  );
};

export default CellmaMenuDropdown;

const styles = {
  menuItem: {
    margin: "5px",
    color: "grey.900",
    "&:hover": { backgroundColor: "secondary.main" },
  },
  menuItemText: {
    fontWeight: "500",
    color: "grey.900",
    fontSize: "18px",
    ml: "10px",
    "&:hover": { color: "primary.main" },
  },

  versionGrid: {
    display: "flex",
    justifyContent: "center",

    minWidth: "400px",
  },
  cellmaLogo: {
    width: "170px",
    height: "60px",
    maxWidth: "170px",
  },
  avatar: { height: "24px", width: "24px" },
};
