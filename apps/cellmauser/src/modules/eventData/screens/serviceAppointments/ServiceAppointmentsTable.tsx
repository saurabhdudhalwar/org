import { useEffect, useState } from "react";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CloseIcon from "@mui/icons-material/Close";
import * as Mui from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { GoogleMap } from "@react-google-maps/api";
import dayjs, { Dayjs } from "dayjs";
import { useDispatch, useSelector } from "react-redux";

import AppointmentStatusPopup from "./AppointmentStatusPopup";
import CallPatientPopup from "./CallPatientPopup";
import ConfirmPatientDetailsPopup from "./ConfirmPatientDetailsPopup";
import CellmaTable from "../../../../common/CellmaTable";
import * as Common from "../../../../common/CommonComponentsIndex";
import { setIsUnderConstruction } from "../../../../store/CommonAction";
import { setSnackbar } from "../../../../store/SnackbarAction";
import {
  openInNewTab,
  showOverflowTooltip,
} from "../../../../utils/GeneralUtils";
import { rows } from "../../assets/dummyData/ServiceAppointmentsDummyData";
import AppointmentSlip from "../../assets/icons/AppointmentSlip.png";
import CallPatient from "../../assets/icons/CallPatient.png";
import Letter from "../../assets/icons/Letter.png";
import PatientLabel from "../../assets/icons/PatientLabel.png";
import PatientLocation from "../../assets/icons/PatientLocation.png";
import t from "../../assets/translationFiles/serviceAppointmentTranslation";
import AppointmentLocationPopup from "../../common/AppointmentLocationPopup";
import ChangeAppointmentTypePopup from "../serviceBookAppointment/ChangeAppointmentTypePopup";

const ServiceAppointmentsTable = () => {
  const [isAppointmentLocation, setIsAppointmentLocation] = useState(false);
  const [isPatientLocation, setIsPatientLocation] = useState(false);
  const [isCallPatient, setIsCallPatient] = useState(false);
  const [isChangeAppointmentType, setIsChangeAppointmentType] = useState(false);
  const [isAppointmentStatus, setIsAppointmentStatus] = useState(false);
  const [isCustomizeSearchAppointmentPageResults] = useState(false);
  const [isConfirmPatientDetails, setIsConfirmPatientDetails] = useState(false);
  const [isShowAppointmentInvoicePaymentStatus] = useState(true);
  const [isUseSpecialtyAndRegion] = useState(true);
  const [status, setStatus] = useState("");
  const [isArriveTime, setIsArriveTime] = useState(false);
  const [isSeenTime, setIsSeenTime] = useState(false);
  const [changeArriveTime, setChangeArriveTime] = useState<Dayjs | null>(
    dayjs("")
  );
  const [changeSeenTime, setChangeSeenTime] = useState<Dayjs | null>(dayjs(""));

  const { isAllowToBookOnlineMeeting } = useSelector(
    (state: any) => state.eventDataReducer
  );
  const dispatch = useDispatch();
  const [isPrinted] = useState(false);

  const columns: GridColDef[] = [
    {
      field: "col1",
      headerName: t("invoiceToday"),
      headerClassName: "tableHeader",
      flex: 1,
      maxWidth: 90,
      minWidth: 90,
      // This field is setting based
      // hide: isCustomizeSearchAppointmentPageResults,
      renderCell: (params: any) => <CloseIcon sx={{ color: "warning.dark" }} />,
    },
    {
      field: "col2",
      headerName: t("seenByNurse"),
      headerClassName: "tableHeader",
      flex: 1,
      maxWidth: 90,
      minWidth: 90,
      // This field is setting based
      // hide: isCustomizeSearchAppointmentPageResults,
      renderCell: (params: any) => <CloseIcon sx={{ color: "warning.dark" }} />,
    },
    {
      field: "col3",
      headerName: t("paymentStatus"),
      headerClassName: "tableHeader",
      flex: 1,
      maxWidth: 90,
      minWidth: 90,
      // This field is setting based
      // hide: !isShowAppointmentInvoicePaymentStatus,
    },

    {
      field: "col4",
      headerName: t("type"),
      headerClassName: "tableHeader",
      flex: 1,
      maxWidth: 55,
      minWidth: 55,
      renderCell: (params) => {
        return (
          <Mui.Box sx={styles.link}>
            <Common.CellmaLink
              label={t("type")}
              onClick={() => {
                setIsChangeAppointmentType(true);
              }}
            >
              {params.value}
            </Common.CellmaLink>
          </Mui.Box>
        );
      },
    },
    {
      field: "col5",
      headerName: t("with"),
      headerClassName: "tableHeader",
      flex: 1,
      maxWidth: 80,
      minWidth: 70,
      renderCell: (params) => {
        return (
          <Mui.Box sx={styles.link}>
            <Common.CellmaLink
              label={t("with")}
              onClick={() =>
                openInNewTab(
                  "/cellmaUser/appointmentWithPrint",
                  "AppointmentWithPrint",
                  900,
                  600
                )
              }
              target="_blank"
            >
              {params.value}
            </Common.CellmaLink>
          </Mui.Box>
        );
      },
    },
    {
      field: "col6",
      headerName: t("location"),
      headerClassName: "tableHeader",
      flex: 1,
      maxWidth: 75,
      minWidth: 75,
      renderCell: (params) => {
        return isAllowToBookOnlineMeeting ? (
          <Mui.Tooltip title={t("joinTeamsMeeting")}>
            <Mui.Box sx={styles.link}>
              <Common.CellmaLink
                label={t("location")}
                onClick={() => {
                  setIsCallPatient(true);
                }}
              >
                {t("joinTeamsMeeting")}
              </Common.CellmaLink>
            </Mui.Box>
          </Mui.Tooltip>
        ) : (
          <Mui.Box sx={styles.link}>
            {params.value === "-" ? (
              <Mui.Typography>{params.value}</Mui.Typography>
            ) : (
              <Common.CellmaLink
                label={t("location")}
                onClick={() => {
                  setIsAppointmentLocation(true);
                }}
              >
                {params.value}
              </Common.CellmaLink>
            )}
          </Mui.Box>
        );
      },
    },
    {
      field: "col7",
      headerName: t("room"),
      headerClassName: "tableHeader",
      flex: 1,
      maxWidth: 60,
      minWidth: 60,
      // This field is setting based
      // hide: !isUseSpecialtyAndRegion,
      renderCell: (params) => showOverflowTooltip(params),
    },
    {
      field: "col8",
      headerName: t("date"),
      headerClassName: "tableHeader",
      flex: 1,
      maxWidth: 100,
      minWidth: 100,
    },
    {
      field: "col9",
      headerName: t("time"),
      headerClassName: "tableHeader",
      flex: 1,
      maxWidth: 75,
      minWidth: 70,
    },
    {
      field: "col10",
      headerName: t("arriveTime"),
      headerClassName: "tableHeader",
      flex: 1,
      maxWidth: 80,
      minWidth: 70,
      // This field is setting based
      // hide: !isCustomizeSearchAppointmentPageResults,
      renderCell: (params) => {
        return (
          <Mui.Box sx={styles.icon}>
            <Common.CellmaLink
              label={t("arriveTime")}
              onClick={(event: any) => {
                setIsArriveTime(true); // don't select this row after clicking
              }}
            >
              {params.value}
            </Common.CellmaLink>
          </Mui.Box>
        );
      },
    },
    {
      field: "col11",
      headerName: t("seenTime"),
      headerClassName: "tableHeader",
      flex: 1,
      maxWidth: 80,
      minWidth: 70,
      // This field is setting based
      // hide: !isCustomizeSearchAppointmentPageResults,
      renderCell: (params) => {
        return (
          <Mui.Box sx={styles.icon}>
            <Common.CellmaLink
              label={t("seenTime")}
              onClick={(event: any) => {
                setIsSeenTime(true); // don't select this row after clicking
              }}
            >
              {params.value}
            </Common.CellmaLink>
          </Mui.Box>
        );
      },
    },
    {
      field: "col12",
      headerName: t("seenBy"),
      headerClassName: "tableHeader",
      flex: 1,
      maxWidth: 75,
      minWidth: 75,
      // This field is setting based
      // hide: !isCustomizeSearchAppointmentPageResults,
      renderCell: (params) => showOverflowTooltip(params),
    },
    {
      field: "id",
      headerName: t("patient"),
      headerClassName: "tableHeader",
      flex: 1,
      maxWidth: 65,
      minWidth: 65,
      renderCell: (params) => {
        return (
          <Mui.Box sx={styles.link}>
            <Common.CellmaLink
              label={t("patient")}
              onClick={(event: any) => {
                event.stopPropagation();
              }}
            >
              {params.value}
            </Common.CellmaLink>
          </Mui.Box>
        );
      },
    },
    {
      field: "col13",
      headerName: t("patientLocation"),
      headerClassName: "tableHeader",
      flex: 1,
      maxWidth: 90,
      minWidth: 80,
      sortable: false,
      renderCell: () => {
        return (
          <Mui.IconButton
            sx={styles.icon}
            aria-label="patientLocation"
            title={t("patientLocation")}
            onClick={() => {
              setIsPatientLocation(true);
            }}
          >
            <Mui.Avatar
              variant="square"
              src={PatientLocation}
              alt="Appointment Slip Image Avatar"
              sx={styles.avatar}
            />
          </Mui.IconButton>
        );
      },
    },
    {
      field: "col14",
      headerName: t("cellmaBarcode"),
      headerClassName: "tableHeader",
      flex: 1,
      maxWidth: 100,
      minWidth: 80,
    },
    {
      field: "col15",
      headerName: t("born"),
      headerClassName: "tableHeader",
      flex: 1,
      maxWidth: 95,
      minWidth: 95,
    },
    {
      field: "col16",
      headerName: t("status"),
      headerClassName: "tableHeader",
      flex: 1,
      maxWidth: 120,
      minWidth: 120,
      renderCell: (params) => {
        return params?.row?.col16 === "Attended" ||
          params?.row?.col16 === "Waited Not Seen" ||
          params?.row?.col16 === "Waiting" ||
          params?.row?.col16 === "Scheduled" ? (
          <Mui.Tooltip title={params.value} placement="bottom" arrow>
            <Mui.Box sx={styles.link}>
              <Common.CellmaLink
                label={t("status")}
                onClick={(event: any) => {
                  event.stopPropagation();
                  setIsAppointmentStatus(true);
                  setStatus(params.value); // don't select this row after clicking
                }}
              >
                {params.value}
              </Common.CellmaLink>
            </Mui.Box>
          </Mui.Tooltip>
        ) : (
          params?.value
        );
      },
    },
    {
      field: "col17",
      headerName: t("appointmentEmailSent"),
      headerClassName: "tableHeader",
      flex: 1,
      maxWidth: 90,
      minWidth: 90,
      // This field is setting based
      // hide: isCustomizeSearchAppointmentPageResults,
      renderCell: (params) => {
        return (
          <CheckCircleIcon
            sx={{
              color: "success.dark",
              justifyContent: "center",
              display: "flex",
              width: "100%",
            }}
          />
        );
      },
    },
    {
      field: "col18",
      headerName: t("letter"),
      headerClassName: "tableHeader",
      flex: 1,
      maxWidth: 90,
      minWidth: 90,
      sortable: false,
      // This field is setting based
      // hide: isCustomizeSearchAppointmentPageResults,
      renderCell: () => {
        return (
          <Mui.IconButton
            sx={styles.icon}
            aria-label="letter"
            title={t("letter")}
            onClick={() => dispatch(setIsUnderConstruction(true))}
          >
            <Mui.Avatar
              variant="square"
              src={Letter}
              alt="Letter Slip Image Avatar"
              sx={styles.avatar}
            />
          </Mui.IconButton>
        );
      },
    },
    {
      field: "col19",
      headerName: isCustomizeSearchAppointmentPageResults
        ? t("appointmentSlip")
        : t("triageSlip"),
      headerClassName: "tableHeader",
      flex: 1,
      maxWidth: 120,
      minWidth: 110,
      sortable: false,
      renderCell: () => {
        return (
          <Mui.IconButton
            sx={styles.icon}
            aria-label="triageSlip"
            title={t("triageSlip")}
            href="/cellmaUser/appointmentSlipPrint"
            onClick={() =>
              openInNewTab(
                "/cellmaUser/appointmentSlipPrint",
                "AppointmentSlipPrint",
                700,
                500
              )
            }
            target="_blank"
          >
            <Mui.Avatar
              variant="square"
              src={AppointmentSlip}
              alt="triageSlip Slip Image Avatar"
              sx={styles.avatar}
            />
          </Mui.IconButton>
        );
      },
    },
    {
      field: "col20",
      headerName: t("patientLabel"),
      headerClassName: "tableHeader",
      flex: 1,
      maxWidth: 80,
      minWidth: 70,
      sortable: false,
      // This field is setting based
      // hide: !isCustomizeSearchAppointmentPageResults,
      renderCell: (params) => {
        return params?.row?.col20 !== isPrinted ? (
          <Mui.IconButton
            sx={styles.icon}
            aria-label="PatientLabel"
            title={t("patientLabel")}
            href="/cellmaUser/patientLabelPrint"
            onClick={() =>
              openInNewTab(
                "/cellmaUser/patientLabelPrint",
                "PatientLabelPrint",
                700,
                500
              )
            }
            target="_blank"
          >
            <Mui.Avatar
              variant="square"
              src={CallPatient}
              alt="Call Patient Image Avatar"
              sx={styles.avatar}
            />
          </Mui.IconButton>
        ) : (
          <CheckCircleIcon
            sx={{
              color: "success.dark",
              justifyContent: "center",
              display: "flex",
              width: "100%",
            }}
          />
        );
      },
    },

    {
      field: "col21",
      headerName: t("callPatient"),
      headerClassName: "tableHeader",
      flex: 1,
      maxWidth: 70,
      minWidth: 65,
      sortable: false,
      renderCell: (params) => {
        return params?.row?.col16 ===
          ("Waiting" || "Waited Not Seen" || "Scheduled") ? (
          <Mui.IconButton
            sx={styles.icon}
            aria-label="callPatient"
            title={t("callPatient")}
            onClick={() => {
              setIsCallPatient(true);
            }}
          >
            <Mui.Avatar
              variant="square"
              src={CallPatient}
              alt="Call Patient Image Avatar"
              sx={styles.avatar}
            />
          </Mui.IconButton>
        ) : (
          "-"
        );
      },
    },
    {
      field: "col22",
      headerName: t("patientDetails"),
      headerClassName: "tableHeader",
      flex: 1,
      maxWidth: 75,
      minWidth: 70,
      renderCell: (params) => {
        return (
          <Mui.Box sx={styles.icon}>
            <Common.CellmaLink
              label={t("patientDetails")}
              onClick={(event: any) => {
                event.stopPropagation(); // don't select this row after clicking
                setIsConfirmPatientDetails(true);
              }}
            >
              {params.value}
            </Common.CellmaLink>
          </Mui.Box>
        );
      },
    },
    {
      field: "col23",
      headerName: t("patientType"),
      headerClassName: "tableHeader",
      flex: 1,
      maxWidth: 75,
      minWidth: 70,
    },
  ];

  return (
    <Mui.Grid container>
      <Mui.Grid item xs={12}>
        <CellmaTable rows={rows} columns={columns} noRecordsMessage="" />
      </Mui.Grid>
      {isCallPatient && (
        <CallPatientPopup handleClose={() => setIsCallPatient(false)} />
      )}
      {/* Pass Appointment location or Patient location dynamically to map */}
      {(isAppointmentLocation || isPatientLocation) && (
        <AppointmentLocationPopup
          handleAppointmentLocationCancel={() =>
            setIsAppointmentLocation(false)
          }
          handlePatientLocationCancel={() => setIsPatientLocation(false)}
          appointmentLocation={isAppointmentLocation}
          address="17, Latif Bldg, Dr Ambedkar Road, Dadar(e)" // hardcoded temporary value for map
        />
        /* @ React Team - if clinic location address not available then show this message */

        /* <Mui.Typography>
                {t("clinicLocationNotAvailable")}
              </Mui.Typography> */
      )}
      {/* Pass Arrive time and Seen time dynamically */}
      {(isArriveTime || isSeenTime) && (
        <Common.CellmaPopup
          title={t("changeTime")}
          handleCancel={() => {
            setIsArriveTime(false);
            setIsSeenTime(false);
          }}
        >
          <Mui.Grid
            item
            xs={12}
            sx={{ display: "flex", justifyContent: "center" }}
            padding={2}
          >
            <Common.CellmaTimePicker
              zIndex={1400}
              label={isArriveTime ? t("arriveTime") : t("seenTime")}
              value={isArriveTime ? changeArriveTime : changeSeenTime}
              onChange={(newValue: any) => {
                // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                isArriveTime
                  ? setChangeArriveTime(newValue)
                  : setChangeSeenTime(newValue);
              }}
            />
          </Mui.Grid>
          <Mui.Grid
            item
            xs={12}
            sx={{ display: "flex", justifyContent: "flex-end" }}
            paddingRight={2}
          >
            <Common.CellmaButton
              label={t("save")}
              onClick={() => {
                setIsArriveTime(false);
                setIsSeenTime(false);

                dispatch(
                  setSnackbar(
                    true,
                    "success",
                    isArriveTime
                      ? t("arriveTimeUpdated")
                      : t("seenTimeUpdated"),
                    4
                  )
                );
              }}
            />
          </Mui.Grid>
        </Common.CellmaPopup>
      )}
      {isChangeAppointmentType && (
        <ChangeAppointmentTypePopup
          handleCancel={() => setIsChangeAppointmentType(false)}
          onChangeClick={() => {
            setIsChangeAppointmentType(false);
            dispatch(
              setSnackbar(true, "success", `${t("appointmentTypeChanged")}`, 4)
            );
          }}
        />
      )}
      {isAppointmentStatus && (
        <AppointmentStatusPopup
          handleCancel={() => setIsAppointmentStatus(false)}
          handleStatus={status}
        />
      )}
      {isConfirmPatientDetails && (
        <ConfirmPatientDetailsPopup
          handleCancel={() => setIsConfirmPatientDetails(false)}
        />
      )}
    </Mui.Grid>
  );
};

export default ServiceAppointmentsTable;

export const styles = {
  avatar: { height: "24px", width: "24px" },
  icon: { display: "flex", justifyContent: "center", width: "100%" },
  link: { display: "flex", justifyContent: "center", width: "100%" },
  mapContainerStyle: {
    width: "100%",
    height: "500px",
  },
};
