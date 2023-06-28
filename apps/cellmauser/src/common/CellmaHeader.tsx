import { useEffect, useState } from "react";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import LanguageIcon from "@mui/icons-material/Language";
import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import * as Mui from "@mui/material";
import { Box } from "@mui/system";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import CellmaButton from "./CellmaButton";
import useUserHeader from "../api/useUserHeader";
import Allergies from "../assets/icons/Allergies.png";
import Baby from "../assets/icons/Baby.png";
import Tasks from "../assets/icons/Tasks.png";
import CellmaLogo from "../assets/logos/CellmaLogo.png";
import translate from "../assets/translationFiles/commonTranslation";
import { useDeselectPatient } from "../modules/authentication/api/useDeselectPatient";
import CellmaLanguageDropdown from "../modules/authentication/common/CellmaLanguageDropdown";
import CellmaMenu from "../modules/authentication/common/CellmaMenuDropdown";
import usePatientBanner from "../modules/patient/api/usePatientBanner";
import ExitPatientPopup from "../modules/patient/common/ExitPatientPopup";
import PatientBanner from "../modules/patient/common/PatientBanner";
import PatientReminderPopup from "../modules/patient/common/PatientReminderPopup";
import {
  setIsBannerOpen,
  setIsContactTypeSelected,
  setIsPatientSelected,
} from "../modules/patient/store/PatientAction";
import { setIsDrawerOpen } from "../store/CommonAction";
import { getGender, isUndefinedOrNullOrEmpty } from "../utils/GeneralUtils";

interface Props {
  type: string;
  handleDrawerOpen?: any;
  open?: any;
  handleDrawerClose?: any;
}

const CellmaHeader: React.FC<Props> = (props) => {
  const { data: userHeader, isLoading: userHeaderIsLoading } = useUserHeader();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement | boolean>(null);
  const [showLanguageMenu, setShowLanguageMenu] = useState<null | HTMLElement>(
    null
  );
  const [isPatient, setIsPatient] = useState(false);
  const [menuClicked, setMenuClicked] = useState<boolean>(false);
  const {
    isPatientSelected,
    isDeathPatientSelected,
    isPinSelected,
    isContactTypeSelected,
    isBannerOpen,
    patientId,
    sgrId,
    cliHidePatientRemindersPopup,
  } = useSelector((state: any) => state.patient);
  const { language } = useSelector((state: any) => state.language);
  const { isDrawerOpen } = useSelector((state: any) => state.common);
  const { token } = useSelector((state: any) => state.auth);
  const [isPatientReminder, setIsPatientReminder] = useState(false);
  const [isExitPopup, setIsExitPopup] = useState(false);
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const openMenu = Boolean(anchorEl);
  const openLanguageMenu = Boolean(showLanguageMenu);
  const { data: patientBanner } = usePatientBanner(patientId, !!patientId);
  const barcodeNo =
    patientBanner?.settings.estBarcodeTopbarShow === 1 &&
    patientBanner?.entity?.patientBannerJson?.patId
      ? `, Barcode No: ${
          patientBanner?.entity?.patientBannerJson?.patId + 1000
        }`
      : "";

  const closeMenu = (event: React.MouseEvent<HTMLElement>) => {
    setMenuClicked(true);
  };

  const handleClickMenu = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    setAnchorEl(event.currentTarget);
    dispatch(setIsBannerOpen(false));
  };
  const handleCloseDropdown = (event: any) => {
    event.preventDefault();
    setAnchorEl(null);
    setShowLanguageMenu(null);
  };

  const handleClickLanguage = (event: React.MouseEvent<HTMLButtonElement>) => {
    setShowLanguageMenu(event.currentTarget);
    dispatch(setIsBannerOpen(false));
  };

  const handleBanner = () => {
    dispatch(setIsBannerOpen(!isBannerOpen));
    setIsPatient(true);
  };

  const ageCalculation = patientBanner?.entity?.patientBannerJson?.patDob;
  const age = moment().diff(ageCalculation, "years");

  // API call deselect patient

  const { refetch: deselectPatient } = useDeselectPatient(
    parseInt(patientId, 10),
    sgrId,
    false
  );

  useEffect(() => {
    setAnchorEl(null);
    setShowLanguageMenu(null);
    setMenuClicked(false);
  }, [pathname, menuClicked, sgrId]);

  return (
    <>
      {userHeaderIsLoading && (
        <Mui.Backdrop sx={{ zIndex: "1500" }} open>
          <Mui.CircularProgress />
        </Mui.Backdrop>
      )}
      <Mui.AppBar sx={styles.toolbar}>
        <Mui.Toolbar>
          <Mui.Grid container>
            <Mui.Grid item xs={0.4} sx={styles.headerGrid}>
              {props.type !== "Authentication" && (
                <Mui.IconButton
                  disabled={isPinSelected}
                  aria-label="Close Menu"
                  onClick={() => dispatch(setIsDrawerOpen(!isDrawerOpen))}
                  edge="start"
                  size="medium"
                  sx={{ color: "common.white" }}
                >
                  {isDrawerOpen ? <MenuOpenIcon /> : <MenuIcon />}
                </Mui.IconButton>
              )}
            </Mui.Grid>
            <Mui.Grid item xs={0.4} sx={styles.headerGrid}>
              <Mui.IconButton
                aria-label="Language Icon"
                edge="start"
                size="medium"
                onClick={handleClickLanguage}
                sx={{ color: "common.white" }}
              >
                <LanguageIcon />
              </Mui.IconButton>
              <CellmaLanguageDropdown
                anchorEl={showLanguageMenu}
                open={openLanguageMenu}
                onClose={handleCloseDropdown}
              />
            </Mui.Grid>
            <Mui.Grid item xs={0.8} sx={styles.headerGrid}>
              {props.type !== "Authentication" && (
                <CellmaButton
                  label={translate("menuButton", language)}
                  onClick={handleClickMenu}
                  endIcon={<KeyboardArrowDownIcon />}
                  borderColor="common.white"
                />
              )}
              <CellmaMenu
                open={openMenu}
                onClose={handleCloseDropdown}
                closeMenu={closeMenu}
              />
            </Mui.Grid>
            {props.type !== "Authentication" && !isPatientSelected && (
              <Mui.Grid item xs={9.4} sx={styles.headerText}>
                <Mui.Typography
                  variant="subtitle1"
                  sx={{ color: "common.white" }}
                >
                  {translate("welcomeTitleName", language)},&nbsp;
                </Mui.Typography>
                <Mui.Typography
                  variant="subtitle1"
                  style={{ textTransform: "capitalize" }}
                  sx={{ color: "common.white" }}
                >
                  {userHeader?.username} {userHeader?.userSurname} -&nbsp;
                  {userHeader?.userProfession}
                </Mui.Typography>
              </Mui.Grid>
            )}

            {props.type !== "Authentication" && (
              <Mui.Grid
                item
                container
                xs={8.8}
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                {patientId && isPatientSelected === true && (
                  <>
                    <Mui.Grid item sx={styles.headerText}>
                      <CellmaButton
                        testid=" Banner Button"
                        endIcon={
                          <Mui.IconButton
                            aria-label="KeyboardArrowDownIcon"
                            onClick={handleBanner}
                            sx={{ maxHeight: "20px", color: "common.white" }}
                          >
                            <KeyboardArrowDownIcon data-testid="Open/Close Banner" />
                          </Mui.IconButton>
                        }
                        backgroundColor={
                          isDeathPatientSelected ||
                          patientBanner?.entity?.patientBannerJson?.patDod
                            ? "warning.dark"
                            : "primary.main"
                        }
                        borderColor="common.white"
                        borderRadius="13px"
                        label={[
                          !isUndefinedOrNullOrEmpty(
                            patientBanner?.entity?.patientBannerJson?.patTitle
                          )
                            ? `${patientBanner?.entity?.patientBannerJson?.patTitle}.`
                            : "",
                          " ",
                          !isUndefinedOrNullOrEmpty(
                            patientBanner?.entity?.patientBannerJson
                              ?.patFirstname
                          )
                            ? patientBanner?.entity?.patientBannerJson
                                ?.patFirstname
                            : "",
                          ", ",
                          !isUndefinedOrNullOrEmpty(
                            patientBanner?.entity?.patientBannerJson?.patSurname
                          )
                            ? patientBanner?.entity?.patientBannerJson
                                ?.patSurname
                            : "",
                          " ",

                          "( DOB: ",
                          patientBanner?.entity?.patientBannerJson?.patDob
                            ?.toString()
                            .slice(0, 10),
                          " ",
                          patientBanner?.entity?.patientBannerJson?.patDob
                            ?.toString()
                            .slice(10),
                          ", ",
                          patientBanner?.entity?.patientBannerJson?.patSex
                            ? getGender(
                                patientBanner?.entity?.patientBannerJson?.patSex
                              )
                            : " ",
                          barcodeNo,
                          patientBanner?.entity?.patientBannerJson
                            ?.patMrnNumber !== "Not Recorded" &&
                          patientBanner?.entity?.patientBannerJson
                            ?.patMrnNumber !== undefined
                            ? `, MRN No: ${patientBanner?.entity?.patientBannerJson?.patMrnNumber}`
                            : "",
                          isDeathPatientSelected ||
                          patientBanner?.entity?.patientBannerJson?.patDod
                            ? `, Died: ${moment(
                                patientBanner?.entity?.patientBannerJson?.patDod
                              ).format(
                                "DD/MM/YYYY"
                              )}, Age at death : ${moment().diff(
                                patientBanner?.entity?.patientBannerJson
                                  ?.patDod,
                                "years"
                              )}`
                            : "",
                          ")",
                        ]}
                        onLabelClick={() => {
                          navigate("/cellmaUser/patient/editPatient");
                        }}
                      />
                    </Mui.Grid>
                    <Mui.Grid
                      item
                      sx={styles.headerGrid}
                      onClick={() => {
                        patientId && dispatch(setIsContactTypeSelected(true));
                        navigate("/cellmaUser/patient/contactTypeScreen");
                      }}
                    />

                    <Mui.Grid
                      item
                      sx={{ ...styles.headerGrid, maxWidth: "100px" }}
                    >
                      {patientBanner?.entity?.patientAllergies?.length !==
                        0 && (
                        <Mui.Avatar
                          variant="square"
                          src={Allergies}
                          alt="Allergies Image Avatar"
                          sx={styles.avatar}
                        />
                      )}
                      {age < 16 && (
                        <Mui.Avatar
                          variant="square"
                          src={Baby}
                          alt="Baby Image Avatar"
                          sx={styles.avatar}
                        />
                      )}
                      {patientBanner?.entity?.tasksCount
                        ? patientBanner?.entity?.tasksCount > 0 && (
                            <Mui.Badge
                              color="success"
                              badgeContent={patientBanner?.entity?.tasksCount}
                            >
                              <Mui.Avatar
                                variant="square"
                                src={Tasks}
                                alt="Tasks Image Avatar"
                                sx={styles.avatar}
                              />
                            </Mui.Badge>
                          )
                        : null}
                    </Mui.Grid>
                  </>
                )}
              </Mui.Grid>
            )}
            <Mui.Grid item>
              {isPatient && isBannerOpen && (
                <PatientBanner isBannerOpen={isBannerOpen} />
              )}
            </Mui.Grid>
            {props.type === "Authentication" && (
              <Mui.Grid item xs={9.4} sx={styles.headerGrid}>
                <Mui.Typography variant="subtitle1" sx={styles.welcomeTitle}>
                  {translate("welcomeTitle", language)}
                </Mui.Typography>
              </Mui.Grid>
            )}
            <Mui.Grid item xs={1} sx={styles.headerGrid}>
              <Box
                position="fixed"
                sx={styles.logoBox}
                data-testid="Cellma Logo"
              >
                <Mui.Avatar
                  variant="square"
                  sx={styles.cellmaLogo}
                  src={CellmaLogo}
                  alt="Cellma Image Avatar"
                  onClick={() => {
                    if (
                      sgrId === 0 &&
                      patientId !== null &&
                      patientId !== undefined
                    ) {
                      deselectPatient();
                    } else {
                      isContactTypeSelected && setIsPatientReminder(true);
                    }
                    dispatch(setIsBannerOpen(false));
                    dispatch(setIsPatientSelected(false));
                    if (token !== "") navigate("/cellmaUser/home");
                  }}
                />
              </Box>
            </Mui.Grid>
          </Mui.Grid>
        </Mui.Toolbar>
        {/* Patient reminder popup start */}
        {isPatientReminder &&
          cliHidePatientRemindersPopup === false &&
          sgrId !== 0 && (
            <PatientReminderPopup
              handleClose={() => {
                setIsPatientReminder(false);
                setIsExitPopup(true);
              }}
              patientId={patientId}
            />
          )}
        {/* Patient reminder popup end */}

        {/* Patient exit popup start */}
        {isExitPopup && (
          <ExitPatientPopup
            handleClose={() => {
              setIsExitPopup(false);
            }}
          />
        )}
        {/* Patient exit popup end */}
      </Mui.AppBar>
    </>
  );
};

const styles = {
  toolbar: {
    zIndex: 1300,
    height: { xs: "40px", sm: "60px" },
    backgroundColor: "primary.main",
    color: "primary.contrastText",
  },
  logoBox: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    top: 0,
    right: 0,
    border: 0,
    borderColor: "common.white",
    backgroundColor: "common.white",
    height: { xs: "40px", sm: "60px" },
    width: { xs: "100px", sm: "190px" },
  },

  cellmaLogo: {
    height: { xs: "40px", sm: "50px" },
    width: { xs: "100px", sm: "190px" },
    maxWidth: "170px",
  },
  headerGrid: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    display: "flex",
    justifyContent: "flex-Start",
    alignItems: "center",
  },
  avatar: {
    height: "24px",
    width: "24px",
    display: "flex",
    p: "5px",
    justifyContent: "flex-end",
  },
  welcomeTitle: {
    color: "common.white",
    marginRight: "auto",
    fontSize: { xs: "13px", sm: "18px" },
    marginLeft: { xs: "-25px", sm: "-50px" },
  },
  popupGridContainer: {
    justifyContent: "left",
    justifyItems: "left",
    paddingY: "15px",
    paddingX: "35px",
  },
};

export default CellmaHeader;
