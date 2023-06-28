import React, { useEffect, useRef, useState } from "react";

import { DeleteOutline } from "@mui/icons-material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import * as Mui from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useReactToPrint } from "react-to-print";

import PatientUniqueIdentifierPopup from "./AddPatientUniqueIdentifier";
import AssignTeamPopup from "./AssignTeamPopup";
import AssignTeamToPatientPopup from "./AssignTeamToPatientPopup";
import BarcodeLabelPrint from "./BarcodeLabelPrint";
import IDCard from "./IDCard";
import LabelPrint from "./LabelPrint";
import PatientBarcodePrint from "./PatientBarcodePrint";
import PatientLabelPrint from "./PatientLabelPrint";
import TestPatientPopup from "./TestPatientPopup";
import WBPrefPrint from "./WBPrefPrint";
import CellmaTable from "../../../common/CellmaTable";
import * as Common from "../../../common/CommonComponentsIndex";
import {
  setAddReferralMode,
  setIsUnderConstruction,
} from "../../../store/CommonAction";
import { isUndefinedOrNullOrEmpty } from "../../../utils/GeneralUtils";
import { useGetPatientExistingAddress } from "../api/usePatientAddress";
import { useGetPatientDetails } from "../api/usePatientDetails";
import {
  useDeletePatientIdentifierDetails,
  useGetPatientIdentifierDetails,
} from "../api/usePatientIdentifierDetails";
import Appointment from "../assets/icons/Appointment.png";
import AssessmentTeam from "../assets/icons/AssessmentTeam.png";
import AssignTeam from "../assets/icons/AssignTeam.png";
import BarcodeLabel from "../assets/icons/BarcodeLabel.png";
import BloodLabel from "../assets/icons/BloodLabel.png";
import Consent from "../assets/icons/Consent.png";
import Death from "../assets/icons/Death.png";
import Details from "../assets/icons/Details.png";
import Dialysis from "../assets/icons/Dialysis.png";
import Duplicate from "../assets/icons/Duplicate.png";
import FinanceSummary from "../assets/icons/FinanceSummary.png";
import Infusions from "../assets/icons/Infusions.png";
import Insurance from "../assets/icons/Insurance.png";
import Label from "../assets/icons/Label.png";
import MedicalNotes from "../assets/icons/MedicalNotes.png";
import PatientAdvanced from "../assets/icons/PatientAdvanced.png";
import PatientBarcode from "../assets/icons/PatientBarcode.png";
import patientID from "../assets/icons/patientID.png";
import PatientLabel from "../assets/icons/PatientLabel.png";
import PatientQuestion from "../assets/icons/PatientQuestion.png";
import Pin from "../assets/icons/Pin.png";
import PIP from "../assets/icons/PIP.png";
import PrintPatientId from "../assets/icons/PrintPatientId.png";
import Referrals from "../assets/icons/Referrals.png";
import Sheet from "../assets/icons/Sheet.png";
import Summary from "../assets/icons/Summary.png";
import Test from "../assets/icons/Test.png";
import Video from "../assets/icons/Video.png";
import WBpref from "../assets/icons/WBpref.png";
import Worklist from "../assets/icons/Worklist.png";
import translate from "../assets/translationFiles/commonPatientTranslation";

interface Props {
  // insert props here
}

const PatientLinks: React.FC<Props> = () => {
  const { language } = useSelector((state: any) => state.language);
  const { userRoles, administration } = useSelector((state: any) => state.auth);
  const [isTestPatient, setIsTestPatient] = useState(false);
  const [isAssignTeamPopup, setIsAssignTeamPopup] = useState(false);
  const [isAssignTeamToPatientPopup, setIsAssignTeamToPatientPopup] =
    useState(false);
  const [assignTeamMode, setAssignTeamMode] = useState("");
  const [isPatientUniqueIdentifierPopup, setIsPatientUniqueIdentifierPopup] =
    useState(false);
  const [pidId, setPidId] = useState<any>();
  const [isExistingIdentifier, setIsExistingIdentifier] = useState(false);
  const dispatch = useDispatch();
  const [linkAnchor, setLinkAnchor] = useState<null | HTMLElement>(null);
  const [phlId, setPhlId] = useState<any>();
  const openLink = Boolean(linkAnchor);

  // handler for open link
  const handleLinkClick = (event: React.MouseEvent<HTMLElement>) => {
    setLinkAnchor(event.currentTarget);
  };
  const navigate = useNavigate();
  // handler for link close
  const handleLinkClose = () => {
    setLinkAnchor(null);
  };

  const {
    patientDod,
    patientId,
    activeScreenName,
    estUseCellmaInterface,
    estPasPreference,
    preventDemographicsChange,
    allowToOpenInHtml,
  } = useSelector((state: any) => state.patient);
  const componentToBarcodePrint = useRef(null);
  const componentToLabelPrint = useRef(null);
  const componentToPatientLabelPrint = useRef(null);
  const componentToWBPrefPrint = useRef(null);
  const componentToPatientBarcodePrint = useRef(null);
  const componentToPrintId = useRef(null);

  // Handler for barcode label print
  const handleBarcodeLabelPrint = useReactToPrint({
    content: () => componentToBarcodePrint.current,
  });

  // Handler for label print
  const handleLabelPrint = useReactToPrint({
    content: () => componentToLabelPrint.current,
  });

  // Handler for patient label print
  const handlePatientLabelPrint = useReactToPrint({
    content: () => componentToPatientLabelPrint.current,
  });

  // Handler for WB Pref label print
  const handleWbPrefPrint = useReactToPrint({
    content: () => componentToWBPrefPrint.current,
  });

  // Handler for patient barcode print
  const handlePatientBarcodePrint = useReactToPrint({
    content: () => componentToPatientBarcodePrint.current,
  });

  // Handler for patient barcode print
  const handlePrintId = useReactToPrint({
    content: () => componentToPrintId.current,
  });

  // api call for get patient details
  const { data: patientDetails, refetch: patientDetailsRefetch } =
    useGetPatientDetails(patientId);

  // api call for get identifier details
  const { refetch: patientIdentifierRefetch, data: patientIdentifierDetails } =
    useGetPatientIdentifierDetails(patientId);
  const patientIdentifier = patientIdentifierDetails?.patIdentifierList ?? [];

  // api call for delete identifier details
  const { mutate: deleteIdentifier } = useDeletePatientIdentifierDetails();

  const { data: address, refetch: existingAddressRefetch } =
    useGetPatientExistingAddress(patientId);
  const patientAddress = address?.permanentAddress;

  useEffect(() => {
    if (patientId !== null) {
      patientDetailsRefetch();
      existingAddressRefetch();
    }
  }, []);

  const columns: GridColDef[] = [
    {
      field: "identifierType",
      headerName: translate("identifierType", language),
      headerClassName: "tableHeader",
      flex: 1,
      minWidth: 200,
      renderCell: (params: any) => (
        <Mui.Typography>
          {params?.row?.identifierType ? params?.row?.identifierType : "-"}
        </Mui.Typography>
      ),
    },
    {
      field: "number",
      headerName: translate("number", language),
      headerClassName: "tableHeader",
      flex: 1,
      minWidth: 200,
      renderCell: (params: any) => (
        <Mui.Typography>
          {params?.row?.number ? params?.row?.number : "-"}
        </Mui.Typography>
      ),
    },
    {
      field: "issuingCountry",
      headerName: translate("issuingCountry", language),
      headerClassName: "tableHeader",
      flex: 1,
      minWidth: 200,
      renderCell: (params: any) => (
        <Mui.Typography>
          {params?.row?.issuingCountry ? params?.row?.issuingCountry : "-"}
        </Mui.Typography>
      ),
    },
    {
      field: "pidAddedBy",
      headerName: translate("addedBy", language),
      headerClassName: "tableHeader",
      flex: 1,
      minWidth: 200,
      renderCell: (params: any) => (
        <Mui.Typography>
          {params?.row?.pidAddedBy ? params?.row?.pidAddedBy : "-"}
        </Mui.Typography>
      ),
    },
    {
      field: "pidAdded",
      headerName: translate("added", language),
      headerClassName: "tableHeader",
      flex: 1,
      minWidth: 200,
      renderCell: (params: any) => (
        <Mui.Typography>
          {params?.row?.pidAdded !== null
            ? moment(params?.row?.pidAdded).format("DD/MM/YYYY")
            : "-"}
        </Mui.Typography>
      ),
    },
    {
      field: "pidApprovedBy",
      headerName: translate("verifiedBy", language),
      headerClassName: "tableHeader",
      flex: 1,
      minWidth: 80,
      maxWidth: 100,
      renderCell: (params: any) => (
        <Mui.Typography>
          {params?.row?.pidApprovedBy ? params?.row?.pidApprovedBy : "-"}
        </Mui.Typography>
      ),
    },
    {
      field: "col6",
      headerName: " ",
      headerClassName: "tableHeader",
      flex: 1,
      minWidth: 80,
      maxWidth: 100,
      renderCell: (params) => {
        return (
          <Mui.IconButton
            sx={{ display: "flex", justifyContent: "center", width: "100%" }}
            aria-label="Delete identifier"
            onClick={(e: any) => {
              if (params?.row?.pidId !== undefined) {
                setPidId(params?.row?.pidId);
              }
              e.stopPropagation(); // don't select this row after clicking
              setIsExistingIdentifier(true);
            }}
          >
            <Mui.Tooltip
              title={translate("deleteIdentifier", language)}
              placement="right"
              arrow
            >
              <DeleteOutline sx={{ color: "warning.dark" }} />
            </Mui.Tooltip>
          </Mui.IconButton>
        );
      },
    },
  ];

  return (
    <Mui.Grid container>
      <Common.CellmaButton
        label={translate("links", language)}
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
          sx={styles.menu}
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
          {activeScreenName === "DemographicScreen" &&
            administration < 3 &&
            administration >= 1 && (
              <Mui.Tooltip
                title={translate("addressLabel", language)}
                placement="right"
                arrow
              >
                <Mui.MenuItem
                  data-testid="Address Label"
                  sx={styles.menuItemText}
                  onClick={handleLabelPrint}
                >
                  <Mui.Avatar
                    variant="square"
                    src={Label}
                    alt="Label Image Avatar"
                    sx={styles.avatar}
                  />
                  <Mui.Typography variant="h5">
                    {translate("addressLabel", language)}
                  </Mui.Typography>
                </Mui.MenuItem>
              </Mui.Tooltip>
            )}
          {activeScreenName === "DemographicScreen" &&
            administration >= 3 &&
            (patientId === null ||
              (patientId !== null && isUndefinedOrNullOrEmpty(patientDod))) && (
              <Mui.Tooltip
                title={translate("addressLabel", language)}
                placement="right"
                arrow
              >
                <Mui.MenuItem
                  data-testid="Address Label"
                  sx={styles.menuItemText}
                  onClick={handleLabelPrint}
                >
                  <Mui.Avatar
                    variant="square"
                    src={Label}
                    alt="Label Image Avatar"
                    sx={styles.avatar}
                  />
                  <Mui.Typography variant="h5">
                    {translate("addressLabel", language)}
                  </Mui.Typography>
                </Mui.MenuItem>
              </Mui.Tooltip>
            )}
          {activeScreenName === "DemographicScreen" &&
            administration >= 3 &&
            patientId !== null &&
            !isUndefinedOrNullOrEmpty(patientDod) && (
              <Mui.Tooltip
                title={translate("addressLabel", language)}
                placement="right"
                arrow
              >
                <Mui.MenuItem
                  data-testid="Address Label"
                  sx={styles.menuItemText}
                  onClick={handleLabelPrint}
                >
                  <Mui.Avatar
                    variant="square"
                    src={Label}
                    alt="Label Image Avatar"
                    sx={styles.avatar}
                  />
                  <Mui.Typography variant="h5">
                    {translate("addressLabel", language)}
                  </Mui.Typography>
                </Mui.MenuItem>
              </Mui.Tooltip>
            )}
          {activeScreenName === "patientSearchScreen" &&
            userRoles.includes("Reports") && (
              <Mui.Tooltip
                title={translate("advancePatientSearch", language)}
                placement="right"
                arrow
              >
                <Mui.MenuItem
                  data-testid="Advance Patient Search"
                  sx={styles.menuItemText}
                  onClick={() => dispatch(setIsUnderConstruction(true))}
                >
                  <Mui.Avatar
                    variant="square"
                    src={PatientAdvanced}
                    alt="PatientAdvance Image Avatar"
                    sx={styles.avatar}
                  />

                  <Mui.Typography variant="h5">
                    {translate("advancePatientSearch", language)}
                  </Mui.Typography>
                </Mui.MenuItem>
              </Mui.Tooltip>
            )}
          {((activeScreenName === "editDemographicScreen" &&
            administration >= 3 &&
            (patientId === null ||
              (patientId !== null && isUndefinedOrNullOrEmpty(patientDod)))) ||
            activeScreenName === "patientSearchScreen") && (
            <Mui.Tooltip
              title={translate("appointment", language)}
              placement="right"
              arrow
            >
              <Mui.MenuItem
                data-testid="Appointment"
                sx={styles.menuItemText}
                onClick={() => dispatch(setIsUnderConstruction(true))}
              >
                <Mui.Avatar
                  variant="square"
                  src={Appointment}
                  alt="Appointment Image Avatar"
                  sx={styles.avatar}
                />

                <Mui.Typography variant="h5">
                  {translate("appointment", language)}
                </Mui.Typography>
              </Mui.MenuItem>
            </Mui.Tooltip>
          )}
          {activeScreenName === "DemographicScreen" &&
            administration < 3 &&
            administration >= 1 && (
              <Mui.Tooltip
                title={translate("assignTeam", language)}
                placement="right"
                arrow
              >
                <Mui.MenuItem
                  data-testid="Assign Team"
                  sx={styles.menuItemText}
                  onClick={() => setIsAssignTeamPopup(true)}
                >
                  <Mui.Avatar
                    variant="square"
                    src={AssessmentTeam}
                    alt="AssTeam Image Avatar"
                    sx={styles.avatar}
                  />

                  <Mui.Typography variant="h5">
                    {translate("assignTeam", language)}
                  </Mui.Typography>
                </Mui.MenuItem>
              </Mui.Tooltip>
            )}
          {activeScreenName === "DemographicScreen" &&
            administration >= 3 &&
            (patientId === null ||
              (patientId !== null && isUndefinedOrNullOrEmpty(patientDod))) && (
              <Mui.Tooltip
                title={translate("assignTeam", language)}
                placement="right"
                arrow
              >
                <Mui.MenuItem
                  data-testid="Assign Team"
                  sx={styles.menuItemText}
                  onClick={() => setIsAssignTeamPopup(true)}
                >
                  <Mui.Avatar
                    variant="square"
                    src={AssessmentTeam}
                    alt="AssTeam Image Avatar"
                    sx={styles.avatar}
                  />

                  <Mui.Typography variant="h5">
                    {translate("assignTeam", language)}
                  </Mui.Typography>
                </Mui.MenuItem>
              </Mui.Tooltip>
            )}
          {activeScreenName === "AssignedTeam/HealthProfessionals" && (
            <Mui.Tooltip
              title={translate("assignTeamHP", language)}
              placement="right"
              arrow
            >
              <Mui.MenuItem
                data-testid="Assign Team HP"
                sx={styles.menuItemText}
                onClick={() => {
                  setIsAssignTeamToPatientPopup(true);
                  setAssignTeamMode("Add");
                }}
              >
                <Mui.Avatar
                  variant="square"
                  src={AssignTeam}
                  alt="Assign Team/HP Image Avatar"
                  sx={styles.avatar}
                />

                <Mui.Typography variant="h5">
                  {translate("assignTeamHP", language)}
                </Mui.Typography>
              </Mui.MenuItem>
            </Mui.Tooltip>
          )}

          {activeScreenName === "DemographicScreen" &&
            administration < 3 &&
            administration >= 1 && (
              <Mui.Tooltip
                title={translate("barcodeLabel", language)}
                placement="right"
                arrow
              >
                <Mui.MenuItem
                  data-testid="Barcode Label"
                  sx={styles.menuItemText}
                  onClick={handleBarcodeLabelPrint}
                >
                  <Mui.Avatar
                    variant="square"
                    src={BarcodeLabel}
                    alt="BcLabel Image Avatar"
                    sx={styles.avatar}
                  />
                  <Mui.Typography variant="h5">
                    {translate("barcodeLabel", language)}
                  </Mui.Typography>
                </Mui.MenuItem>
              </Mui.Tooltip>
            )}

          {activeScreenName === "DemographicScreen" &&
            administration >= 3 &&
            (patientId === null ||
              (patientId !== null && isUndefinedOrNullOrEmpty(patientDod))) && (
              <Mui.Tooltip
                title={translate("barcodeLabel", language)}
                placement="right"
                arrow
              >
                <Mui.MenuItem
                  data-testid="Barcode Label"
                  sx={styles.menuItemText}
                  onClick={handleBarcodeLabelPrint}
                >
                  <Mui.Avatar
                    variant="square"
                    src={BarcodeLabel}
                    alt="BcLabel Image Avatar"
                    sx={styles.avatar}
                  />
                  <Mui.Typography variant="h5">
                    {translate("barcodeLabel", language)}
                  </Mui.Typography>
                </Mui.MenuItem>
              </Mui.Tooltip>
            )}

          {activeScreenName === "singlePageRegistration" && (
            <Mui.Tooltip
              title={translate("barcodeLabel", language)}
              placement="right"
              arrow
            >
              <Mui.MenuItem
                data-testid="Barcode Label"
                sx={styles.menuItemText}
                onClick={handleBarcodeLabelPrint}
              >
                <Mui.Avatar
                  variant="square"
                  src={BarcodeLabel}
                  alt="BcLabel Image Avatar"
                  sx={styles.avatar}
                />
                <Mui.Typography variant="h5">
                  {translate("barcodeLabel", language)}
                </Mui.Typography>
              </Mui.MenuItem>
            </Mui.Tooltip>
          )}
          {activeScreenName === "editDemographicScreen" &&
            userRoles.includes("BloodBank") && (
              <Mui.Tooltip
                title={translate("bloodLabel", language)}
                placement="right"
                arrow
              >
                <Mui.MenuItem
                  data-testid="Barcode Label"
                  sx={styles.menuItemText}
                  onClick={() => dispatch(setIsUnderConstruction(true))}
                >
                  <Mui.Avatar
                    variant="square"
                    src={BloodLabel}
                    alt="BloodLabel Image Avatar"
                    sx={styles.avatar}
                  />
                  <Mui.Typography variant="h5">
                    {translate("bloodLabel", language)}
                  </Mui.Typography>
                </Mui.MenuItem>
              </Mui.Tooltip>
            )}

          {activeScreenName === "DemographicScreen" &&
            administration < 3 &&
            administration >= 1 && (
              <Mui.Tooltip
                title={translate("consent", language)}
                placement="right"
                arrow
              >
                <Mui.MenuItem
                  data-testid="Consent"
                  sx={styles.menuItemText}
                  onClick={() => dispatch(setIsUnderConstruction(true))}
                >
                  <Mui.Avatar
                    variant="square"
                    src={Consent}
                    alt="Consent Image Avatar"
                    sx={styles.avatar}
                  />

                  <Mui.Typography variant="h5">
                    {translate("consent", language)}
                  </Mui.Typography>
                </Mui.MenuItem>
              </Mui.Tooltip>
            )}

          {activeScreenName === "DemographicScreen" &&
            administration >= 3 &&
            (patientId === null ||
              (patientId !== null && isUndefinedOrNullOrEmpty(patientDod))) && (
              <Mui.Tooltip
                title={translate("consent", language)}
                placement="right"
                arrow
              >
                <Mui.MenuItem
                  data-testid="Consent"
                  sx={styles.menuItemText}
                  onClick={() => dispatch(setIsUnderConstruction(true))}
                >
                  <Mui.Avatar
                    variant="square"
                    src={Consent}
                    alt="Consent Image Avatar"
                    sx={styles.avatar}
                  />
                  <Mui.Typography variant="h5">
                    {translate("consent", language)}
                  </Mui.Typography>
                </Mui.MenuItem>
              </Mui.Tooltip>
            )}

          {activeScreenName === "editDemographicScreen" &&
            administration < 3 &&
            administration >= 1 && (
              <Mui.Tooltip
                title={translate("consent", language)}
                placement="right"
                arrow
              >
                <Mui.MenuItem
                  data-testid="Consent"
                  sx={styles.menuItemText}
                  onClick={() => dispatch(setIsUnderConstruction(true))}
                >
                  <Mui.Avatar
                    variant="square"
                    src={Consent}
                    alt="Consent Image Avatar"
                    sx={styles.avatar}
                  />
                  <Mui.Typography variant="h5">
                    {translate("consent", language)}
                  </Mui.Typography>
                </Mui.MenuItem>
              </Mui.Tooltip>
            )}

          {activeScreenName === "editDemographicScreen" &&
            administration >= 3 &&
            (patientId === null ||
              (patientId !== null && isUndefinedOrNullOrEmpty(patientDod))) && (
              <Mui.Tooltip
                title={translate("Consent", language)}
                placement="right"
                arrow
              >
                <Mui.MenuItem
                  data-testid="consent"
                  sx={styles.menuItemText}
                  onClick={() => dispatch(setIsUnderConstruction(true))}
                >
                  <Mui.Avatar
                    variant="square"
                    src={Consent}
                    alt="Consent Image Avatar"
                    sx={styles.avatar}
                  />
                  <Mui.Typography variant="h5">
                    {translate("consent", language)}
                  </Mui.Typography>
                </Mui.MenuItem>
              </Mui.Tooltip>
            )}

          {activeScreenName === "DemographicScreen" &&
            administration < 3 &&
            administration >= 1 &&
            preventDemographicsChange === 0 && (
              <Mui.Tooltip
                title={translate("death", language)}
                placement="right"
                arrow
              >
                <Mui.MenuItem
                  data-testid="Death"
                  sx={styles.menuItemText}
                  onClick={() => navigate("/cellmaUser/patient/deathPatient")}
                >
                  <Mui.Avatar
                    variant="square"
                    src={Death}
                    alt="Death Image Avatar"
                    sx={styles.avatar}
                  />

                  <Mui.Typography variant="h5">
                    {translate("death", language)}
                  </Mui.Typography>
                </Mui.MenuItem>
              </Mui.Tooltip>
            )}

          {activeScreenName === "DemographicScreen" &&
            administration >= 3 &&
            (patientId === null ||
              (patientId !== null && isUndefinedOrNullOrEmpty(patientDod))) &&
            preventDemographicsChange === 0 && (
              <Mui.Tooltip
                title={translate("death", language)}
                placement="right"
                arrow
              >
                <Mui.MenuItem
                  data-testid="Death"
                  sx={styles.menuItemText}
                  onClick={() => navigate("/cellmaUser/patient/deathPatient")}
                >
                  <Mui.Avatar
                    variant="square"
                    src={Death}
                    alt="Death Image Avatar"
                    sx={styles.avatar}
                  />
                  <Mui.Typography variant="h5">
                    {translate("death", language)}
                  </Mui.Typography>
                </Mui.MenuItem>
              </Mui.Tooltip>
            )}

          {activeScreenName === "editDemographicScreen" &&
            administration < 3 &&
            administration >= 1 &&
            preventDemographicsChange === 0 && (
              <Mui.Tooltip
                title={translate("death", language)}
                placement="right"
                arrow
              >
                <Mui.MenuItem
                  data-testid="Death"
                  sx={styles.menuItemText}
                  onClick={() => navigate("/cellmaUser/patient/deathPatient")}
                >
                  <Mui.Avatar
                    variant="square"
                    src={Death}
                    alt="Death Image Avatar"
                    sx={styles.avatar}
                  />
                  <Mui.Typography variant="h5">
                    {translate("death", language)}
                  </Mui.Typography>
                </Mui.MenuItem>
              </Mui.Tooltip>
            )}
          {activeScreenName === "editDemographicScreen" &&
            administration >= 3 &&
            patientId !== null &&
            preventDemographicsChange === 0 && (
              <Mui.Tooltip
                title={translate("death", language)}
                placement="right"
                arrow
              >
                <Mui.MenuItem
                  data-testid="Death"
                  sx={styles.menuItemText}
                  onClick={() => navigate("/cellmaUser/patient/deathPatient")}
                >
                  <Mui.Avatar
                    variant="square"
                    src={Death}
                    alt="Death Image Avatar"
                    sx={styles.avatar}
                  />
                  <Mui.Typography variant="h5">
                    {translate("death", language)}
                  </Mui.Typography>
                </Mui.MenuItem>
              </Mui.Tooltip>
            )}
          {activeScreenName === "editDemographicScreen" &&
            administration >= 3 &&
            (patientId === null ||
              (patientId !== null && isUndefinedOrNullOrEmpty(patientDod))) &&
            preventDemographicsChange === 0 && (
              <Mui.Tooltip
                title={translate("death", language)}
                placement="right"
                arrow
              >
                <Mui.MenuItem
                  data-testid="Death"
                  sx={styles.menuItemText}
                  onClick={() => navigate("/cellmaUser/patient/deathPatient")}
                >
                  <Mui.Avatar
                    variant="square"
                    src={Death}
                    alt="Death Image Avatar"
                    sx={styles.avatar}
                  />
                  <Mui.Typography variant="h5">
                    {translate("death", language)}
                  </Mui.Typography>
                </Mui.MenuItem>
              </Mui.Tooltip>
            )}

          {activeScreenName === "DemographicScreen" &&
            administration >= 3 &&
            patientId !== null &&
            !isUndefinedOrNullOrEmpty(patientDod) && (
              <Mui.Tooltip
                title={translate("details", language)}
                placement="right"
                arrow
              >
                <Mui.MenuItem
                  data-testid="Details"
                  sx={styles.menuItemText}
                  onClick={() => dispatch(setIsUnderConstruction(true))}
                >
                  <Mui.Avatar
                    variant="square"
                    src={Details}
                    alt="Details Image Avatar"
                    sx={styles.avatar}
                  />

                  <Mui.Typography variant="h5">
                    {translate("details", language)}
                  </Mui.Typography>
                </Mui.MenuItem>
              </Mui.Tooltip>
            )}

          {activeScreenName === "DemographicScreen" &&
            administration >= 3 &&
            (patientId === null ||
              (patientId !== null && isUndefinedOrNullOrEmpty(patientDod))) && (
              <Mui.Tooltip
                title={translate("details", language)}
                placement="right"
                arrow
              >
                <Mui.MenuItem
                  data-testid="Details"
                  sx={styles.menuItemText}
                  onClick={() => dispatch(setIsUnderConstruction(true))}
                >
                  <Mui.Avatar
                    variant="square"
                    src={Details}
                    alt="Details Image Avatar"
                    sx={styles.avatar}
                  />
                  <Mui.Typography variant="h5">
                    {translate("details", language)}
                  </Mui.Typography>
                </Mui.MenuItem>
              </Mui.Tooltip>
            )}
          {activeScreenName === "editDemographicScreen" &&
            administration >= 3 &&
            patientId !== null && (
              <Mui.Tooltip
                title={translate("details", language)}
                placement="right"
                arrow
              >
                <Mui.MenuItem
                  data-testid="Details"
                  sx={styles.menuItemText}
                  onClick={() => dispatch(setIsUnderConstruction(true))}
                >
                  <Mui.Avatar
                    variant="square"
                    src={Details}
                    alt="Details Image Avatar"
                    sx={styles.avatar}
                  />
                  <Mui.Typography variant="h5">
                    {translate("details", language)}
                  </Mui.Typography>
                </Mui.MenuItem>
              </Mui.Tooltip>
            )}

          {activeScreenName === "DemographicScreen" &&
            administration < 3 &&
            administration >= 1 &&
            !userRoles.includes("Non Clinical") && (
              <Mui.Tooltip
                title={translate("details", language)}
                placement="right"
                arrow
              >
                <Mui.MenuItem
                  data-testid="Details"
                  sx={styles.menuItemText}
                  onClick={() => dispatch(setIsUnderConstruction(true))}
                >
                  <Mui.Avatar
                    variant="square"
                    src={Details}
                    alt="Details Image Avatar"
                    sx={styles.avatar}
                  />
                  <Mui.Typography variant="h5">
                    {translate("details", language)}
                  </Mui.Typography>
                </Mui.MenuItem>
              </Mui.Tooltip>
            )}

          {activeScreenName === "DemographicScreen" &&
            administration < 3 &&
            administration >= 1 &&
            userRoles.includes("Dialysis") && (
              <Mui.Tooltip
                title={translate("dialysis", language)}
                placement="right"
                arrow
              >
                <Mui.MenuItem
                  data-testid="Dialysis"
                  sx={styles.menuItemText}
                  onClick={() => dispatch(setIsUnderConstruction(true))}
                >
                  <Mui.Avatar
                    variant="square"
                    src={Dialysis}
                    alt="Dialysis Image Avatar"
                    sx={styles.avatar}
                  />
                  <Mui.Typography variant="h5">
                    {translate("dialysis", language)}
                  </Mui.Typography>
                </Mui.MenuItem>
              </Mui.Tooltip>
            )}
          {activeScreenName === "DemographicScreen" &&
            administration >= 3 &&
            (patientId === null ||
              (patientId !== null && isUndefinedOrNullOrEmpty(patientDod))) &&
            userRoles.includes("Dialysis") &&
            activeScreenName === "DemographicScreen" && (
              <Mui.Tooltip
                title={translate("dialysis", language)}
                placement="right"
                arrow
              >
                <Mui.MenuItem
                  data-testid="Dialysis"
                  sx={styles.menuItemText}
                  onClick={() => dispatch(setIsUnderConstruction(true))}
                >
                  <Mui.Avatar
                    variant="square"
                    src={Dialysis}
                    alt="Dialysis Image Avatar"
                    sx={styles.avatar}
                  />
                  <Mui.Typography variant="h5">
                    {translate("dialysis", language)}
                  </Mui.Typography>
                </Mui.MenuItem>
              </Mui.Tooltip>
            )}
          {administration < 3 &&
            administration >= 1 &&
            userRoles.includes("Finance") && (
              <Mui.Tooltip
                title={translate("financeSummary", language)}
                placement="right"
                arrow
              >
                <Mui.MenuItem
                  data-testid="Finance Summary"
                  sx={styles.menuItemText}
                  onClick={() => dispatch(setIsUnderConstruction(true))}
                >
                  <Mui.Avatar
                    variant="square"
                    src={FinanceSummary}
                    alt="Finance Summary Image Avatar"
                    sx={styles.avatar}
                  />

                  <Mui.Typography variant="h5">
                    {translate("financeSummary", language)}
                  </Mui.Typography>
                </Mui.MenuItem>
              </Mui.Tooltip>
            )}

          {activeScreenName === "DemographicScreen" &&
            administration >= 3 &&
            (patientId === null ||
              (patientId !== null && isUndefinedOrNullOrEmpty(patientDod))) &&
            userRoles.includes("Finance") && (
              <Mui.Tooltip
                title={translate("financeSummary", language)}
                placement="right"
                arrow
              >
                <Mui.MenuItem
                  data-testid="Finance Summary"
                  sx={styles.menuItemText}
                  onClick={() => dispatch(setIsUnderConstruction(true))}
                >
                  <Mui.Avatar
                    variant="square"
                    src={FinanceSummary}
                    alt="Finance Summary Image Avatar"
                    sx={styles.avatar}
                  />
                  <Mui.Typography variant="h5">
                    {translate("financeSummary", language)}
                  </Mui.Typography>
                </Mui.MenuItem>
              </Mui.Tooltip>
            )}

          {activeScreenName === "editDemographicScreen" &&
            administration < 3 &&
            administration >= 1 &&
            userRoles.includes("Finance") && (
              <Mui.Tooltip
                title={translate("financeSummary", language)}
                placement="right"
                arrow
              >
                <Mui.MenuItem
                  data-testid="Finance Summary"
                  sx={styles.menuItemText}
                  onClick={() => dispatch(setIsUnderConstruction(true))}
                >
                  <Mui.Avatar
                    variant="square"
                    src={FinanceSummary}
                    alt="Finance Summary Image Avatar"
                    sx={styles.avatar}
                  />
                  <Mui.Typography variant="h5">
                    {translate("financeSummary", language)}
                  </Mui.Typography>
                </Mui.MenuItem>
              </Mui.Tooltip>
            )}

          {activeScreenName === "editDemographicScreen" &&
            administration >= 3 &&
            (patientId === null ||
              (patientId !== null && isUndefinedOrNullOrEmpty(patientDod))) &&
            userRoles.includes("Finance") && (
              <Mui.Tooltip
                title={translate("financeSummary", language)}
                placement="right"
                arrow
              >
                <Mui.MenuItem
                  data-testid="Finance Summary"
                  sx={styles.menuItemText}
                  onClick={() => dispatch(setIsUnderConstruction(true))}
                >
                  <Mui.Avatar
                    variant="square"
                    src={FinanceSummary}
                    alt="Finance Summary Image Avatar"
                    sx={styles.avatar}
                  />
                  <Mui.Typography variant="h5">
                    {translate("financeSummary", language)}
                  </Mui.Typography>
                </Mui.MenuItem>
              </Mui.Tooltip>
            )}

          {activeScreenName === "patientSearchScreen" && (
            <Mui.Tooltip
              title={translate("helpVideo", language)}
              placement="right"
              arrow
            >
              <Mui.MenuItem
                data-testid="Help Video"
                sx={styles.menuItemText}
                onClick={() => dispatch(setIsUnderConstruction(true))}
              >
                <Mui.Avatar
                  variant="square"
                  src={Video}
                  alt="Video Image Avatar"
                  sx={styles.avatar}
                />

                <Mui.Typography variant="h5">
                  {translate("helpVideo", language)}
                </Mui.Typography>
              </Mui.MenuItem>
            </Mui.Tooltip>
          )}

          {activeScreenName === "editDemographicScreen" &&
            administration < 3 &&
            administration >= 1 && (
              <Mui.Tooltip
                title={translate("helpVideo", language)}
                placement="right"
                arrow
              >
                <Mui.MenuItem
                  data-testid="Help Video"
                  sx={styles.menuItemText}
                  onClick={() => dispatch(setIsUnderConstruction(true))}
                >
                  <Mui.Avatar
                    variant="square"
                    src={Video}
                    alt="Video Image Avatar"
                    sx={styles.avatar}
                  />
                  <Mui.Typography variant="h5">
                    {translate("helpVideo", language)}
                  </Mui.Typography>
                </Mui.MenuItem>
              </Mui.Tooltip>
            )}
          {activeScreenName === "editDemographicScreen" &&
            administration < 3 &&
            administration >= 1 && (
              <Mui.Tooltip
                title={translate("helpVideo", language)}
                placement="right"
                arrow
              >
                <Mui.MenuItem
                  data-testid="Help Video"
                  sx={styles.menuItemText}
                  onClick={() => dispatch(setIsUnderConstruction(true))}
                >
                  <Mui.Avatar
                    variant="square"
                    src={Video}
                    alt="Video Image Avatar"
                    sx={styles.avatar}
                  />
                  <Mui.Typography variant="h5">
                    {translate("helpVideo", language)}
                  </Mui.Typography>
                </Mui.MenuItem>
              </Mui.Tooltip>
            )}
          {activeScreenName === "patientSearchScreen" &&
            userRoles.includes("Infusions Specialist") && (
              <Mui.Tooltip
                title={translate("infusion", language)}
                placement="right"
                arrow
              >
                <Mui.MenuItem
                  data-testid="Infusion"
                  sx={styles.menuItemText}
                  onClick={() => dispatch(setIsUnderConstruction(true))}
                >
                  <Mui.Avatar
                    variant="square"
                    src={Infusions}
                    alt="Infusion Image Avatar"
                    sx={styles.avatar}
                  />

                  <Mui.Typography variant="h5">
                    {translate("infusion", language)}
                  </Mui.Typography>
                </Mui.MenuItem>
              </Mui.Tooltip>
            )}

          {activeScreenName === "DemographicScreen" &&
            administration < 3 &&
            administration >= 1 && (
              <Mui.Tooltip
                title={translate("insurance", language)}
                placement="right"
                arrow
              >
                <Mui.MenuItem
                  data-testid="Insurance"
                  sx={styles.menuItemText}
                  onClick={() => dispatch(setIsUnderConstruction(true))}
                >
                  <Mui.Avatar
                    variant="square"
                    src={Insurance}
                    alt="Insurance Image Avatar"
                    sx={styles.avatar}
                  />

                  <Mui.Typography variant="h5">
                    {translate("insurance", language)}
                  </Mui.Typography>
                </Mui.MenuItem>
              </Mui.Tooltip>
            )}

          {activeScreenName === "DemographicScreen" &&
            administration >= 3 &&
            (patientId === null ||
              (patientId !== null && isUndefinedOrNullOrEmpty(patientDod))) && (
              <Mui.Tooltip
                title={translate("insurance", language)}
                placement="right"
                arrow
              >
                <Mui.MenuItem
                  data-testid="Insurance"
                  sx={styles.menuItemText}
                  onClick={() => dispatch(setIsUnderConstruction(true))}
                >
                  <Mui.Avatar
                    variant="square"
                    src={Insurance}
                    alt="Insurance Image Avatar"
                    sx={styles.avatar}
                  />
                  <Mui.Typography variant="h5">
                    {translate("insurance", language)}
                  </Mui.Typography>
                </Mui.MenuItem>
              </Mui.Tooltip>
            )}

          {activeScreenName === "editDemographicScreen" &&
            administration >= 3 &&
            (patientId === null ||
              (patientId !== null && isUndefinedOrNullOrEmpty(patientDod))) && (
              <Mui.Tooltip
                title={translate("insurance", language)}
                placement="right"
                arrow
              >
                <Mui.MenuItem
                  data-testid="Insurance"
                  sx={styles.menuItemText}
                  onClick={() => dispatch(setIsUnderConstruction(true))}
                >
                  <Mui.Avatar
                    variant="square"
                    src={Insurance}
                    alt="Insurance Image Avatar"
                    sx={styles.avatar}
                  />
                  <Mui.Typography variant="h5">
                    {translate("insurance", language)}
                  </Mui.Typography>
                </Mui.MenuItem>
              </Mui.Tooltip>
            )}

          {(activeScreenName === "editDemographicScreen" ||
            activeScreenName === "singlePageRegistration") && (
            <Mui.Tooltip
              title={translate("insurance", language)}
              placement="right"
              arrow
            >
              <Mui.MenuItem
                data-testid="Insurance"
                sx={styles.menuItemText}
                onClick={() => dispatch(setIsUnderConstruction(true))}
              >
                <Mui.Avatar
                  variant="square"
                  src={Insurance}
                  alt="Insurance Image Avatar"
                  sx={styles.avatar}
                />
                <Mui.Typography variant="h5">
                  {translate("insurance", language)}
                </Mui.Typography>
              </Mui.MenuItem>
            </Mui.Tooltip>
          )}

          {activeScreenName === "DemographicScreen" &&
            administration < 3 &&
            administration >= 1 &&
            userRoles.includes("Medical Notes") && (
              <Mui.Tooltip
                title={translate("notes", language)}
                placement="right"
                arrow
              >
                <Mui.MenuItem
                  data-testid="Notes"
                  sx={styles.menuItemText}
                  onClick={() => dispatch(setIsUnderConstruction(true))}
                >
                  <Mui.Avatar
                    variant="square"
                    src={MedicalNotes}
                    alt="MedicalNotes Image Avatar"
                    sx={styles.avatar}
                  />
                  <Mui.Typography variant="h5">
                    {translate("notes", language)}
                  </Mui.Typography>
                </Mui.MenuItem>
              </Mui.Tooltip>
            )}

          {activeScreenName === "DemographicScreen" &&
            administration >= 3 &&
            (patientId === null ||
              (patientId !== null && isUndefinedOrNullOrEmpty(patientDod))) &&
            userRoles.includes("Medical Notes") && (
              <Mui.Tooltip
                title={translate("notes", language)}
                placement="right"
                arrow
              >
                <Mui.MenuItem
                  data-testid="Notes"
                  sx={styles.menuItemText}
                  onClick={() => dispatch(setIsUnderConstruction(true))}
                >
                  <Mui.Avatar
                    variant="square"
                    src={MedicalNotes}
                    alt="MedicalNotes Image Avatar"
                    sx={styles.avatar}
                  />
                  <Mui.Typography variant="h5">
                    {translate("notes", language)}
                  </Mui.Typography>
                </Mui.MenuItem>
              </Mui.Tooltip>
            )}

          {activeScreenName === "editDemographicScreen" &&
            administration < 3 &&
            administration >= 1 &&
            userRoles.includes("Medical Notes") && (
              <Mui.Tooltip
                title={translate("notes", language)}
                placement="right"
                arrow
              >
                <Mui.MenuItem
                  data-testid="Notes"
                  sx={styles.menuItemText}
                  onClick={() => dispatch(setIsUnderConstruction(true))}
                >
                  <Mui.Avatar
                    variant="square"
                    src={MedicalNotes}
                    alt="MedicalNotes Image Avatar"
                    sx={styles.avatar}
                  />
                  <Mui.Typography variant="h5">
                    {translate("notes", language)}
                  </Mui.Typography>
                </Mui.MenuItem>
              </Mui.Tooltip>
            )}

          {activeScreenName === "editDemographicScreen" &&
            administration >= 3 &&
            (patientId === null ||
              (patientId !== null && isUndefinedOrNullOrEmpty(patientDod))) &&
            userRoles.includes("Medical Notes") && (
              <Mui.Tooltip
                title={translate("notes", language)}
                placement="right"
                arrow
              >
                <Mui.MenuItem
                  data-testid="Notes"
                  sx={styles.menuItemText}
                  onClick={() => dispatch(setIsUnderConstruction(true))}
                >
                  <Mui.Avatar
                    variant="square"
                    src={MedicalNotes}
                    alt="MedicalNotes Image Avatar"
                    sx={styles.avatar}
                  />
                  <Mui.Typography variant="h5">
                    {translate("notes", language)}
                  </Mui.Typography>
                </Mui.MenuItem>
              </Mui.Tooltip>
            )}
          {activeScreenName === "patientSearchScreen" &&
            (estPasPreference === "Find" || estPasPreference === "Both") &&
            estUseCellmaInterface && (
              <Mui.Tooltip
                title={translate("passPatientSearch", language)}
                placement="right"
                arrow
              >
                <Mui.MenuItem
                  data-testid="Pass Patient Search"
                  sx={styles.menuItemText}
                  onClick={() => dispatch(setIsUnderConstruction(true))}
                >
                  <Mui.Avatar
                    variant="square"
                    src={PatientAdvanced}
                    alt="PatientAdvanceSearch Image Avatar"
                    sx={styles.avatar}
                  />

                  <Mui.Typography variant="h5">
                    {translate("passPatientSearch", language)}
                  </Mui.Typography>
                </Mui.MenuItem>
              </Mui.Tooltip>
            )}
          {activeScreenName === "DemographicScreen" &&
            administration < 3 &&
            administration >= 1 && (
              <Mui.Tooltip
                title={translate("patientBarcode", language)}
                placement="right"
                arrow
              >
                <Mui.MenuItem
                  data-testid="Patient Barcode"
                  sx={styles.menuItemText}
                  onClick={handlePatientBarcodePrint}
                >
                  <Mui.Avatar
                    variant="square"
                    src={PatientBarcode}
                    alt="PtBc Image Avatar"
                    sx={styles.avatar}
                  />

                  <Mui.Typography variant="h5">
                    {translate("patientBarcode", language)}
                  </Mui.Typography>
                </Mui.MenuItem>
              </Mui.Tooltip>
            )}
          {activeScreenName === "DemographicScreen" &&
            administration >= 3 &&
            (patientId === null ||
              (patientId !== null && isUndefinedOrNullOrEmpty(patientDod))) && (
              <Mui.Tooltip
                title={translate("patientBarcode", language)}
                placement="right"
                arrow
              >
                <Mui.MenuItem
                  data-testid="Patient Barcode"
                  sx={styles.menuItemText}
                  onClick={handlePatientBarcodePrint}
                >
                  <Mui.Avatar
                    variant="square"
                    src={PatientBarcode}
                    alt="PtBc Image Avatar"
                    sx={styles.avatar}
                  />
                  <Mui.Typography variant="h5">
                    {translate("patientBarcode", language)}
                  </Mui.Typography>
                </Mui.MenuItem>
              </Mui.Tooltip>
            )}
          {activeScreenName === "patientSearchScreen" &&
            (administration >= 3 || userRoles.includes("Merge")) && (
              <Mui.Tooltip
                title={translate("patientDuplicate", language)}
                placement="right"
                arrow
              >
                <Mui.MenuItem
                  data-testid="Patient Duplicate"
                  sx={styles.menuItemText}
                  onClick={() => dispatch(setIsUnderConstruction(true))}
                >
                  <Mui.Avatar
                    variant="square"
                    src={Duplicate}
                    alt="Duplicate Image Avatar"
                    sx={styles.avatar}
                  />
                  <Mui.Typography variant="h5">
                    {translate("patientDuplicate", language)}
                  </Mui.Typography>
                </Mui.MenuItem>
              </Mui.Tooltip>
            )}
          {activeScreenName === "editDemographicScreen" &&
            administration >= 3 &&
            (patientId === null ||
              (patientId !== null && isUndefinedOrNullOrEmpty(patientDod))) && (
              <Mui.Tooltip
                title={translate("patientDuplicate", language)}
                placement="right"
                arrow
              >
                <Mui.MenuItem
                  data-testid="Patient Duplicate"
                  sx={styles.menuItemText}
                  onClick={() => dispatch(setIsUnderConstruction(true))}
                >
                  <Mui.Avatar
                    variant="square"
                    src={Duplicate}
                    alt="Duplicate Image Avatar"
                    sx={styles.avatar}
                  />
                  <Mui.Typography variant="h5">
                    {translate("patientDuplicate", language)}
                  </Mui.Typography>
                </Mui.MenuItem>
              </Mui.Tooltip>
            )}

          {activeScreenName === "DemographicScreen" &&
            administration < 3 &&
            administration >= 1 && (
              <Mui.Tooltip
                title={translate("patientId", language)}
                placement="right"
                arrow
              >
                <Mui.MenuItem
                  data-testid="Patient Id"
                  sx={styles.menuItemText}
                  onClick={() => setIsPatientUniqueIdentifierPopup(true)}
                >
                  <Mui.Avatar
                    variant="square"
                    src={patientID}
                    alt="PtId Image Avatar"
                    sx={styles.avatar}
                  />

                  <Mui.Typography variant="h5">
                    {translate("patientId", language)}
                  </Mui.Typography>
                </Mui.MenuItem>
              </Mui.Tooltip>
            )}
          {activeScreenName === "DemographicScreen" &&
            administration >= 3 &&
            (patientId === null ||
              (patientId !== null && isUndefinedOrNullOrEmpty(patientDod))) &&
            userRoles.includes("Registration") && (
              <Mui.Tooltip
                title={translate("printId", language)}
                placement="right"
                arrow
              >
                <Mui.MenuItem
                  data-testid="Patient Id"
                  sx={styles.menuItemText}
                  onClick={handlePrintId}
                >
                  <Mui.Avatar
                    variant="square"
                    src={PrintPatientId}
                    alt="PrintId Image Avatar"
                    sx={styles.avatar}
                  />

                  <Mui.Typography variant="h5">
                    {translate("printId", language)}
                  </Mui.Typography>
                </Mui.MenuItem>
              </Mui.Tooltip>
            )}

          {activeScreenName === "DemographicScreen" &&
            administration >= 3 &&
            patientId !== null &&
            !isUndefinedOrNullOrEmpty(patientDod) && (
              <Mui.Tooltip
                title={translate("patientId", language)}
                placement="right"
                arrow
              >
                <Mui.MenuItem
                  data-testid="Patient Id"
                  sx={styles.menuItemText}
                  onClick={() => setIsPatientUniqueIdentifierPopup(true)}
                >
                  <Mui.Avatar
                    variant="square"
                    src={patientID}
                    alt="PtId Image Avatar"
                    sx={styles.avatar}
                  />
                  <Mui.Typography variant="h5">
                    {translate("patientId", language)}
                  </Mui.Typography>
                </Mui.MenuItem>
              </Mui.Tooltip>
            )}

          {activeScreenName === "DemographicScreen" &&
            administration >= 3 &&
            (patientId === null ||
              (patientId !== null && isUndefinedOrNullOrEmpty(patientDod))) && (
              <Mui.Tooltip
                title={translate("patientId", language)}
                placement="right"
                arrow
              >
                <Mui.MenuItem
                  data-testid="Patient Id"
                  sx={styles.menuItemText}
                  onClick={() => setIsPatientUniqueIdentifierPopup(true)}
                >
                  <Mui.Avatar
                    variant="square"
                    src={patientID}
                    alt="PtId Image Avatar"
                    sx={styles.avatar}
                  />
                  <Mui.Typography variant="h5">
                    {translate("patientId", language)}
                  </Mui.Typography>
                </Mui.MenuItem>
              </Mui.Tooltip>
            )}

          {activeScreenName === "editDemographicScreen" &&
            administration < 3 &&
            administration >= 1 && (
              <Mui.Tooltip
                title={translate("patientInterestedParties", language)}
                placement="right"
                arrow
              >
                <Mui.MenuItem
                  data-testid="Patient Interested Parties"
                  sx={styles.menuItemText}
                  onClick={() => dispatch(setIsUnderConstruction(true))}
                >
                  <Mui.Avatar
                    variant="square"
                    src={PIP}
                    alt="Pip Image Avatar"
                    sx={styles.avatar}
                  />
                  <Mui.Typography variant="h5">
                    {translate("patientInterestedParties", language)}
                  </Mui.Typography>
                </Mui.MenuItem>
              </Mui.Tooltip>
            )}

          {activeScreenName === "editDemographicScreen" &&
            administration >= 3 &&
            patientId !== null && (
              <Mui.Tooltip
                title={translate("patientInterestedParties", language)}
                placement="right"
                arrow
              >
                <Mui.MenuItem
                  data-testid="Patient Interested Parties"
                  sx={styles.menuItemText}
                  onClick={() => dispatch(setIsUnderConstruction(true))}
                >
                  <Mui.Avatar
                    variant="square"
                    src={PIP}
                    alt="Pip Image Avatar"
                    sx={styles.avatar}
                  />
                  <Mui.Typography variant="h5">
                    {translate("patientInterestedParties", language)}
                  </Mui.Typography>
                </Mui.MenuItem>
              </Mui.Tooltip>
            )}

          {activeScreenName === "editDemographicScreen" &&
            administration >= 3 &&
            (patientId === null ||
              (patientId !== null && isUndefinedOrNullOrEmpty(patientDod))) && (
              <Mui.Tooltip
                title={translate("patientInterestedParties", language)}
                placement="right"
                arrow
              >
                <Mui.MenuItem
                  data-testid="Patient Interested Parties"
                  sx={styles.menuItemText}
                  onClick={() => dispatch(setIsUnderConstruction(true))}
                >
                  <Mui.Avatar
                    variant="square"
                    src={PIP}
                    alt="Pip Image Avatar"
                    sx={styles.avatar}
                  />
                  <Mui.Typography variant="h5">
                    {translate("patientInterestedParties", language)}
                  </Mui.Typography>
                </Mui.MenuItem>
              </Mui.Tooltip>
            )}
          {activeScreenName === "DemographicScreen" &&
            administration >= 3 &&
            (patientId === null ||
              (patientId !== null && isUndefinedOrNullOrEmpty(patientDod))) && (
              <Mui.Tooltip
                title={translate("patientInterestedParties", language)}
                placement="right"
                arrow
              >
                <Mui.MenuItem
                  data-testid="Patient Interested Parties"
                  sx={styles.menuItemText}
                  onClick={() => dispatch(setIsUnderConstruction(true))}
                >
                  <Mui.Avatar
                    variant="square"
                    src={PIP}
                    alt="Pip Image Avatar"
                    sx={styles.avatar}
                  />
                  <Mui.Typography variant="h5">
                    {translate("patientInterestedParties", language)}
                  </Mui.Typography>
                </Mui.MenuItem>
              </Mui.Tooltip>
            )}
          {activeScreenName === "DemographicScreen" &&
            administration >= 3 &&
            patientId !== null &&
            !isUndefinedOrNullOrEmpty(patientDod) && (
              <Mui.Tooltip
                title={translate("patientInterestedParties", language)}
                placement="right"
                arrow
              >
                <Mui.MenuItem
                  data-testid="Patient Interested Parties"
                  sx={styles.menuItemText}
                  onClick={() => dispatch(setIsUnderConstruction(true))}
                >
                  <Mui.Avatar
                    variant="square"
                    src={PIP}
                    alt="Pip Image Avatar"
                    sx={styles.avatar}
                  />
                  <Mui.Typography variant="h5">
                    {translate("patientInterestedParties", language)}
                  </Mui.Typography>
                </Mui.MenuItem>
              </Mui.Tooltip>
            )}
          {activeScreenName === "DemographicScreen" &&
            administration < 3 &&
            administration >= 1 && (
              <Mui.Tooltip
                title={translate("patientInterestedParties", language)}
                placement="right"
                arrow
              >
                <Mui.MenuItem
                  data-testid="Patient Interested Parties"
                  sx={styles.menuItemText}
                  onClick={() => dispatch(setIsUnderConstruction(true))}
                >
                  <Mui.Avatar
                    variant="square"
                    src={PIP}
                    alt="Pip Image Avatar"
                    sx={styles.avatar}
                  />
                  <Mui.Typography variant="h5">
                    {translate("patientInterestedParties", language)}
                  </Mui.Typography>
                </Mui.MenuItem>
              </Mui.Tooltip>
            )}
          {activeScreenName === "DemographicScreen" &&
            administration < 3 &&
            administration >= 1 &&
            patientId !== null && (
              <Mui.Tooltip
                title={translate("patientLabel", language)}
                placement="right"
                arrow
              >
                <Mui.MenuItem
                  data-testid="Patient Label"
                  sx={styles.menuItemText}
                  onClick={handlePatientLabelPrint}
                >
                  <Mui.Avatar
                    variant="square"
                    src={PatientLabel}
                    alt="PtLabel Image Avatar"
                    sx={styles.avatar}
                  />

                  <Mui.Typography variant="h5">
                    {translate("patientLabel", language)}
                  </Mui.Typography>
                </Mui.MenuItem>
              </Mui.Tooltip>
            )}
          {activeScreenName === "DemographicScreen" &&
            administration >= 3 &&
            (patientId === null ||
              (patientId !== null && isUndefinedOrNullOrEmpty(patientDod))) && (
              <Mui.Tooltip
                title={translate("patientLabel", language)}
                placement="right"
                arrow
              >
                <Mui.MenuItem
                  data-testid="Patient Label"
                  sx={styles.menuItemText}
                  onClick={handlePatientLabelPrint}
                >
                  <Mui.Avatar
                    variant="square"
                    src={PatientLabel}
                    alt="PtLabel Image Avatar"
                    sx={styles.avatar}
                  />
                  <Mui.Typography variant="h5">
                    {translate("patientLabel", language)}
                  </Mui.Typography>
                </Mui.MenuItem>
              </Mui.Tooltip>
            )}

          {activeScreenName === "DemographicScreen" &&
            administration < 3 &&
            administration >= 1 && (
              <Mui.Tooltip
                title={translate("patientQuestion", language)}
                placement="right"
                arrow
              >
                <Mui.MenuItem
                  data-testid="Patient Question"
                  sx={styles.menuItemText}
                  onClick={() => dispatch(setIsUnderConstruction(true))}
                >
                  <Mui.Avatar
                    variant="square"
                    src={PatientQuestion}
                    alt="Pq Image Avatar"
                    sx={styles.avatar}
                  />

                  <Mui.Typography variant="h5">
                    {translate("patientQuestion", language)}
                  </Mui.Typography>
                </Mui.MenuItem>
              </Mui.Tooltip>
            )}
          {activeScreenName === "DemographicScreen" &&
            administration >= 3 &&
            patientId !== null &&
            !isUndefinedOrNullOrEmpty(patientDod) && (
              <Mui.Tooltip
                title={translate("patientQuestion", language)}
                placement="right"
                arrow
              >
                <Mui.MenuItem
                  data-testid="Patient Question"
                  sx={styles.menuItemText}
                  onClick={() => dispatch(setIsUnderConstruction(true))}
                >
                  <Mui.Avatar
                    variant="square"
                    src={PatientQuestion}
                    alt="Pq Image Avatar"
                    sx={styles.avatar}
                  />
                  <Mui.Typography variant="h5">
                    {translate("patientQuestion", language)}
                  </Mui.Typography>
                </Mui.MenuItem>
              </Mui.Tooltip>
            )}
          {activeScreenName === "DemographicScreen" &&
            administration >= 3 &&
            (patientId === null ||
              (patientId !== null && isUndefinedOrNullOrEmpty(patientDod))) && (
              <Mui.Tooltip
                title={translate("patientQuestion", language)}
                placement="right"
                arrow
              >
                <Mui.MenuItem
                  data-testid="Patient Question"
                  sx={styles.menuItemText}
                  onClick={() => dispatch(setIsUnderConstruction(true))}
                >
                  <Mui.Avatar
                    variant="square"
                    src={PatientQuestion}
                    alt="Pq Image Avatar"
                    sx={styles.avatar}
                  />
                  <Mui.Typography variant="h5">
                    {translate("patientQuestion", language)}
                  </Mui.Typography>
                </Mui.MenuItem>
              </Mui.Tooltip>
            )}
          {activeScreenName === "DemographicScreen" &&
            administration < 3 &&
            administration >= 1 && (
              <Mui.Tooltip
                title={translate("patientWbPref", language)}
                placement="right"
                arrow
              >
                <Mui.MenuItem
                  data-testid="Patient Wb Pref"
                  sx={styles.menuItemText}
                  onClick={handleWbPrefPrint}
                >
                  <Mui.Avatar
                    variant="square"
                    src={WBpref}
                    alt="WbPref Image Avatar"
                    sx={styles.avatar}
                  />

                  <Mui.Typography variant="h5">
                    {translate("patientWbPref", language)}
                  </Mui.Typography>
                </Mui.MenuItem>
              </Mui.Tooltip>
            )}

          {activeScreenName === "DemographicScreen" &&
            administration >= 3 &&
            (patientId === null ||
              (patientId !== null && isUndefinedOrNullOrEmpty(patientDod))) && (
              <Mui.Tooltip
                title={translate("patientWbPref", language)}
                placement="right"
                arrow
              >
                <Mui.MenuItem
                  data-testid="Patient Wb Pref"
                  sx={styles.menuItemText}
                  onClick={handleWbPrefPrint}
                >
                  <Mui.Avatar
                    variant="square"
                    src={WBpref}
                    alt="WbPref Image Avatar"
                    sx={styles.avatar}
                  />
                  <Mui.Typography variant="h5">
                    {translate("patientWbPref", language)}
                  </Mui.Typography>
                </Mui.MenuItem>
              </Mui.Tooltip>
            )}

          {activeScreenName === "DemographicScreen" &&
            administration >= 3 &&
            (patientId === null ||
              (patientId !== null && isUndefinedOrNullOrEmpty(patientDod))) && (
              <Mui.Tooltip
                title={translate("pin", language)}
                placement="right"
                arrow
              >
                <Mui.MenuItem
                  data-testid="Pin"
                  sx={styles.menuItemText}
                  onClick={() => dispatch(setIsUnderConstruction(true))}
                >
                  <Mui.Avatar
                    variant="square"
                    src={Pin}
                    alt="Pin Image Avatar"
                    sx={styles.avatar}
                  />

                  <Mui.Typography variant="h5">
                    {translate("pin", language)}
                  </Mui.Typography>
                </Mui.MenuItem>
              </Mui.Tooltip>
            )}

          {activeScreenName === "DemographicScreen" &&
            administration < 3 &&
            administration >= 1 &&
            userRoles.includes("Registration") && (
              <Mui.Tooltip
                title={translate("printId", language)}
                placement="right"
                arrow
              >
                <Mui.MenuItem
                  data-testid="Print Id"
                  sx={styles.menuItemText}
                  onClick={handlePrintId}
                >
                  <Mui.Avatar
                    variant="square"
                    src={PrintPatientId}
                    alt="PrintId Image Avatar"
                    sx={styles.avatar}
                  />

                  <Mui.Typography variant="h5">
                    {translate("printId", language)}
                  </Mui.Typography>
                </Mui.MenuItem>
              </Mui.Tooltip>
            )}
          {activeScreenName === "DemographicScreen" &&
            administration < 3 &&
            administration >= 1 && (
              <Mui.Tooltip
                title={translate("referral", language)}
                placement="right"
                arrow
              >
                <Mui.MenuItem
                  data-testid="Referral"
                  sx={styles.menuItemText}
                  onClick={() => {
                    dispatch(setAddReferralMode("addReferralMode"));
                    navigate("/cellmaUser/referral/addReferral");
                  }}
                >
                  <Mui.Avatar
                    variant="square"
                    src={Referrals}
                    alt="Referral Image Avatar"
                    sx={styles.avatar}
                  />

                  <Mui.Typography variant="h5">
                    {translate("referral", language)}
                  </Mui.Typography>
                </Mui.MenuItem>
              </Mui.Tooltip>
            )}

          {activeScreenName === "DemographicScreen" &&
            administration >= 3 &&
            (patientId === null ||
              (patientId !== null && isUndefinedOrNullOrEmpty(patientDod))) && (
              <Mui.Tooltip
                title={translate("referral", language)}
                placement="right"
                arrow
              >
                <Mui.MenuItem
                  data-testid="Referral"
                  sx={styles.menuItemText}
                  onClick={() => {
                    dispatch(setAddReferralMode("addReferralMode"));
                    navigate("/cellmaUser/referral/addReferral");
                  }}
                >
                  <Mui.Avatar
                    variant="square"
                    src={Referrals}
                    alt="Referral Image Avatar"
                    sx={styles.avatar}
                  />
                  <Mui.Typography variant="h5">
                    {translate("referral", language)}
                  </Mui.Typography>
                </Mui.MenuItem>
              </Mui.Tooltip>
            )}

          {activeScreenName === "editDemographicScreen" &&
            administration < 3 &&
            administration >= 1 && (
              <Mui.Tooltip
                title={translate("referral", language)}
                placement="right"
                arrow
              >
                <Mui.MenuItem
                  data-testid="Referral"
                  sx={styles.menuItemText}
                  onClick={() => {
                    dispatch(setAddReferralMode("addReferralMode"));
                    navigate("/cellmaUser/referral/addReferral");
                  }}
                >
                  <Mui.Avatar
                    variant="square"
                    src={Referrals}
                    alt="Referral Image Avatar"
                    sx={styles.avatar}
                  />
                  <Mui.Typography variant="h5">
                    {translate("referral", language)}
                  </Mui.Typography>
                </Mui.MenuItem>
              </Mui.Tooltip>
            )}

          {activeScreenName === "editDemographicScreen" &&
            administration >= 3 &&
            (patientId === null ||
              (patientId !== null && isUndefinedOrNullOrEmpty(patientDod))) && (
              <Mui.Tooltip
                title={translate("referral", language)}
                placement="right"
                arrow
              >
                <Mui.MenuItem
                  data-testid="Referral"
                  sx={styles.menuItemText}
                  onClick={() => {
                    dispatch(setAddReferralMode("addReferralMode"));
                    navigate("/cellmaUser/referral/addReferral");
                  }}
                >
                  <Mui.Avatar
                    variant="square"
                    src={Referrals}
                    alt="Referral Image Avatar"
                    sx={styles.avatar}
                  />
                  <Mui.Typography variant="h5">
                    {translate("referral", language)}
                  </Mui.Typography>
                </Mui.MenuItem>
              </Mui.Tooltip>
            )}

          {activeScreenName === "DemographicScreen" &&
            administration < 3 &&
            administration >= 1 && (
              <Mui.Tooltip
                title={translate("sheet", language)}
                placement="right"
                arrow
              >
                <Mui.MenuItem
                  data-testid="Sheet"
                  sx={styles.menuItemText}
                  onClick={() => dispatch(setIsUnderConstruction(true))}
                >
                  <Mui.Avatar
                    variant="square"
                    src={Sheet}
                    alt="Sheet Image Avatar"
                    sx={styles.avatar}
                  />

                  <Mui.Typography variant="h5">
                    {translate("sheet", language)}
                  </Mui.Typography>
                </Mui.MenuItem>
              </Mui.Tooltip>
            )}
          {activeScreenName === "DemographicScreen" &&
            administration >= 3 &&
            (patientId === null ||
              (patientId !== null && isUndefinedOrNullOrEmpty(patientDod))) && (
              <Mui.Tooltip
                title={translate("sheet", language)}
                placement="right"
                arrow
              >
                <Mui.MenuItem
                  data-testid="Sheet"
                  sx={styles.menuItemText}
                  onClick={() => dispatch(setIsUnderConstruction(true))}
                >
                  <Mui.Avatar
                    variant="square"
                    src={Sheet}
                    alt="Sheet Image Avatar"
                    sx={styles.avatar}
                  />
                  <Mui.Typography variant="h5">
                    {translate("sheet", language)}
                  </Mui.Typography>
                </Mui.MenuItem>
              </Mui.Tooltip>
            )}
          {activeScreenName === "DemographicScreen" &&
            administration < 3 &&
            administration >= 1 && (
              <Mui.Tooltip
                title={translate("summary", language)}
                placement="right"
                arrow
              >
                <Mui.MenuItem
                  data-testid="Summary"
                  sx={styles.menuItemText}
                  onClick={() => dispatch(setIsUnderConstruction(true))}
                >
                  <Mui.Avatar
                    variant="square"
                    src={Summary}
                    alt="Summary Image Avatar"
                    sx={styles.avatar}
                  />

                  <Mui.Typography variant="h5">
                    {translate("summary", language)}
                  </Mui.Typography>
                </Mui.MenuItem>
              </Mui.Tooltip>
            )}

          {activeScreenName === "DemographicScreen" &&
            administration >= 3 &&
            patientId !== null &&
            !isUndefinedOrNullOrEmpty(patientDod) && (
              <Mui.Tooltip
                title={translate("summary", language)}
                placement="right"
                arrow
              >
                <Mui.MenuItem
                  data-testid="Summary"
                  sx={styles.menuItemText}
                  onClick={() => dispatch(setIsUnderConstruction(true))}
                >
                  <Mui.Avatar
                    variant="square"
                    src={Summary}
                    alt="Summary Image Avatar"
                    sx={styles.avatar}
                  />
                  <Mui.Typography variant="h5">
                    {translate("summary", language)}
                  </Mui.Typography>
                </Mui.MenuItem>
              </Mui.Tooltip>
            )}
          {activeScreenName === "DemographicScreen" &&
            administration >= 3 &&
            (patientId === null ||
              (patientId !== null && isUndefinedOrNullOrEmpty(patientDod))) && (
              <Mui.Tooltip
                title={translate("summary", language)}
                placement="right"
                arrow
              >
                <Mui.MenuItem
                  data-testid="Summary"
                  sx={styles.menuItemText}
                  onClick={() => dispatch(setIsUnderConstruction(true))}
                >
                  <Mui.Avatar
                    variant="square"
                    src={Summary}
                    alt="Summary Image Avatar"
                    sx={styles.avatar}
                  />
                  <Mui.Typography variant="h5">
                    {translate("summary", language)}
                  </Mui.Typography>
                </Mui.MenuItem>
              </Mui.Tooltip>
            )}
          {activeScreenName === "editDemographicScreen" &&
            administration >= 3 &&
            patientId !== null && (
              <Mui.Tooltip
                title={translate("summary", language)}
                placement="right"
                arrow
              >
                <Mui.MenuItem
                  data-testid="Summary"
                  sx={styles.menuItemText}
                  onClick={() => dispatch(setIsUnderConstruction(true))}
                >
                  <Mui.Avatar
                    variant="square"
                    src={Summary}
                    alt="Summary Image Avatar"
                    sx={styles.avatar}
                  />
                  <Mui.Typography variant="h5">
                    {translate("summary", language)}
                  </Mui.Typography>
                </Mui.MenuItem>
              </Mui.Tooltip>
            )}

          {activeScreenName === "editDemographicScreen" &&
            administration >= 3 &&
            (patientId === null ||
              (patientId !== null && isUndefinedOrNullOrEmpty(patientDod))) && (
              <Mui.Tooltip
                title={translate("summary", language)}
                placement="right"
                arrow
              >
                <Mui.MenuItem
                  data-testid="Summary"
                  sx={styles.menuItemText}
                  onClick={() => dispatch(setIsUnderConstruction(true))}
                >
                  <Mui.Avatar
                    variant="square"
                    src={Summary}
                    alt="Summary Image Avatar"
                    sx={styles.avatar}
                  />
                  <Mui.Typography variant="h5">
                    {translate("summary", language)}
                  </Mui.Typography>
                </Mui.MenuItem>
              </Mui.Tooltip>
            )}

          {(activeScreenName === "editDemographicScreen" ||
            activeScreenName === "DemographicScreen") &&
            administration >= 3 &&
            (patientId === null ||
              (patientId !== null && isUndefinedOrNullOrEmpty(patientDod))) && (
              <Mui.Tooltip
                title={translate("test", language)}
                placement="right"
                arrow
              >
                <Mui.MenuItem
                  data-testid="Test"
                  sx={styles.menuItemText}
                  onClick={() => setIsTestPatient(true)}
                >
                  <Mui.Avatar
                    variant="square"
                    src={Test}
                    alt="Test Image Avatar"
                    sx={styles.avatar}
                  />

                  <Mui.Typography variant="h5">
                    {translate("test", language)}
                  </Mui.Typography>
                </Mui.MenuItem>
              </Mui.Tooltip>
            )}

          {activeScreenName === "DemographicScreen" &&
            administration >= 3 &&
            (patientId === null ||
              (patientId !== null && isUndefinedOrNullOrEmpty(patientDod))) && (
              <Mui.Tooltip
                title={translate("worklist", language)}
                placement="right"
                arrow
              >
                <Mui.MenuItem
                  data-testid="Worklist"
                  sx={styles.menuItemText}
                  onClick={() => dispatch(setIsUnderConstruction(true))}
                >
                  <Mui.Avatar
                    variant="square"
                    src={Worklist}
                    alt="Worklist Image Avatar"
                    sx={styles.avatar}
                  />

                  <Mui.Typography variant="h5">
                    {translate("worklist", language)}
                  </Mui.Typography>
                </Mui.MenuItem>
              </Mui.Tooltip>
            )}
        </Mui.Menu>
      </Mui.Backdrop>
      <Mui.Grid container sx={{ display: "none" }}>
        <Mui.Grid ref={componentToBarcodePrint}>
          <BarcodeLabelPrint patientDetails={patientDetails?.patientDetails} />
        </Mui.Grid>
        <Mui.Grid ref={componentToLabelPrint}>
          <LabelPrint
            patientDetails={patientDetails?.patientDetails}
            patientAddress={patientAddress}
          />
        </Mui.Grid>
        <Mui.Grid ref={componentToPatientLabelPrint}>
          <PatientLabelPrint patientDetails={patientDetails?.patientDetails} />
        </Mui.Grid>
        <Mui.Grid ref={componentToWBPrefPrint}>
          <WBPrefPrint patientDetails={patientDetails?.patientDetails} />
        </Mui.Grid>
        <Mui.Grid ref={componentToPatientBarcodePrint}>
          <PatientBarcodePrint
            patientDetails={patientDetails?.patientDetails}
          />
        </Mui.Grid>
        <Mui.Grid ref={componentToPrintId}>
          <IDCard />
        </Mui.Grid>
      </Mui.Grid>
      {isTestPatient && (
        <TestPatientPopup handleClose={() => setIsTestPatient(false)} />
      )}
      {isPatientUniqueIdentifierPopup && (
        <Common.CellmaPopup
          fullScreen
          title={translate("patientUniqueIdentifier", language)}
          handleCancel={() => {
            setIsPatientUniqueIdentifierPopup(false);
          }}
        >
          <Mui.Grid
            item
            xs={12}
            container
            spacing={2}
            sx={{ display: "flex", justifyContent: "center", padding: "20px" }}
          >
            <Mui.Grid item xs={12}>
              {/* Integrate functionality for edit identifier table */}
              <CellmaTable
                rows={patientIdentifier}
                columns={columns}
                noRecordsMessage={translate("noRecordsFound", language)}
                getRowId={(row: any) => row?.identifierType}
                listCount={patientIdentifier?.length}
              />
            </Mui.Grid>
            <Mui.Grid item xs={12}>
              <PatientUniqueIdentifierPopup
                patientId={patientId}
                getPatientDetailsRefetch={patientIdentifierRefetch}
                handleClose={() => setIsPatientUniqueIdentifierPopup(false)}
              />
            </Mui.Grid>
          </Mui.Grid>
        </Common.CellmaPopup>
      )}
      {isExistingIdentifier && (
        <Mui.Backdrop open>
          <Common.CellmaPopup
            title={translate("deleteExistingIdentifier", language)}
            handleCancel={() => setIsExistingIdentifier(false)}
          >
            <Mui.Grid container padding={2}>
              <Mui.Grid item xs={12}>
                <Mui.Typography
                  variant="h2"
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    margin: "10px",
                  }}
                >
                  {translate("deleteMessage", language)}
                </Mui.Typography>
              </Mui.Grid>
              <Mui.Grid
                item
                xs={12}
                sx={{ display: "flex", justifyContent: "flex-end" }}
                gap={1}
              >
                <Common.CellmaButton
                  onClick={() => {
                    deleteIdentifier(pidId, {
                      onSuccess: (response: any) => {
                        if (response?.status === 200) {
                          patientIdentifierRefetch();
                          setIsExistingIdentifier(false);
                        }
                      },
                    });
                  }}
                  label={translate("ok", language)}
                />
                <Common.CellmaButton
                  onClick={() => {
                    setIsExistingIdentifier(false);
                  }}
                  label={translate("cancel", language)}
                />
              </Mui.Grid>
            </Mui.Grid>
          </Common.CellmaPopup>
        </Mui.Backdrop>
      )}
      {isAssignTeamPopup && (
        <AssignTeamPopup
          handleClose={() => setIsAssignTeamPopup(false)}
          handleEdit={() => setIsAssignTeamToPatientPopup(true)}
          handleId={(phlId: any) => {
            setPhlId(phlId);
          }}
        />
      )}
      {isAssignTeamToPatientPopup && (
        <AssignTeamToPatientPopup
          handleClose={() => setIsAssignTeamToPatientPopup(false)}
          handleId={phlId}
          handleSave={() => {}}
        />
      )}
    </Mui.Grid>
  );
};

export default PatientLinks;

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
  menu: {
    mt: { xs: "60px", sm: "70px", md: "50px", lg: "35px" },
    maxHeight: "460px",
    width: "450px",
  },
};
