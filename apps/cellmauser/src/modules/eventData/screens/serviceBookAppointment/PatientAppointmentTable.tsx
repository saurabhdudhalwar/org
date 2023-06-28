import React, { useState } from "react";

import * as Mui from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import ChangeAppointmentTypePopup from "./ChangeAppointmentTypePopup";
import CellmaTable from "../../../../common/CellmaTable";
import * as Common from "../../../../common/CommonComponentsIndex";
import { setIsUnderConstruction } from "../../../../store/CommonAction";
import { setSnackbar } from "../../../../store/SnackbarAction";
import {
  openInNewTab,
  showOverflowTooltip,
} from "../../../../utils/GeneralUtils";
import AppointmentSlip from "../../assets/icons/AppointmentSlip.png";
import Letter from "../../assets/icons/Letter.png";
import Notes from "../../assets/icons/Notes.png";
import PatientLabel from "../../assets/icons/PatientLabel.png";
import t from "../../assets/translationFiles/ServiceBookAppointmentTranslation";
import AppointmentStatusPopup from "../serviceAppointments/AppointmentStatusPopup";

interface Props {
  rows: any;
  noRecordsMessage: any;
  screenName: any;
}

const PatientAppointmentTable: React.FC<Props> = (props) => {
  const [isChangeAppointmentType, setIsChangeAppointmentType] = useState(false);
  const [isAppointmentStatus, setIsAppointmentStatus] = useState(false);
  const [status, setStatus] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: t("service"),
      headerClassName: "tableHeader",
      flex: 1,
      minWidth: 120,
      maxWidth: 150,
      renderCell: (params) => showOverflowTooltip(params),
    },
    {
      field: "col1",
      headerName: t("appointmentType"),
      headerClassName: "tableHeader",
      flex: 1,
      minWidth: 80,
      renderCell: (params) => {
        return (
          <Mui.Box sx={styles.linkStyle}>
            <Common.CellmaLink
              label={t("appointmentType")}
              onClick={(e: any) => {
                setIsChangeAppointmentType(true);
              }}
            >
              {params?.value}
            </Common.CellmaLink>
          </Mui.Box>
        );
      },
    },
    {
      field: "col2",
      headerName: t("status"),
      headerClassName: "tableHeader",
      flex: 1,
      minWidth: 100,
      hide:
        props?.screenName === "cancelAppointment" ||
        props?.screenName === "wns" ||
        props?.screenName === "dna",
      maxWidth: 100,
      renderCell: (params) => {
        return (
          <Mui.Box sx={styles.linkStyle}>
            {props?.screenName === "attendedPatientAppointments" ? (
              <Mui.Typography>Attended</Mui.Typography>
            ) : (
              <Common.CellmaLink
                label={t("status")}
                onClick={(e: any) => {
                  e.stopPropagation(); // don't select this row after clicking
                  setIsAppointmentStatus(true);
                  setStatus("Scheduled");
                }}
              >
                Scheduled
              </Common.CellmaLink>
            )}
          </Mui.Box>
        );
      },
    },
    {
      field: "col3",
      headerName: t("room"),
      headerClassName: "tableHeader",
      flex: 1,
      minWidth: 120,
      hide: props?.screenName !== "attendedPatientAppointments",
    },
    {
      field: "col4",
      headerName: t("appointmentLocation"),
      headerClassName: "tableHeader",
      flex: 1,
      minWidth: 120,
    },
    {
      field: "col5",
      headerName: t("hp"),
      headerClassName: "tableHeader",
      flex: 1,
      minWidth: 80,
      // maxWidth: 120,
    },
    {
      field: "col6",
      headerName: t("date"),
      headerClassName: "tableHeader",
      flex: 1,
      minWidth: 100,
      maxWidth: 100,
      renderCell: (params) => {
        return props?.screenName !== "scheduledPatientAppointment" ? (
          params?.value
        ) : (
          <Mui.Box sx={styles.linkStyle}>
            <Common.CellmaLink
              label="Date"
              onClick={() =>
                navigate("/cellmaUser/eventData/addAndEditPatientAppointment")
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
      field: "col7",
      headerName: t("time"),
      headerClassName: "tableHeader",
      flex: 10,
      minWidth: 70,
      maxWidth: 80,
    },
    {
      field: "col8",
      headerName: t("reason"),
      headerClassName: "tableHeader",
      flex: 1,
      minWidth: 120,
      hide: props?.screenName === "dna",
      renderCell: (params) => showOverflowTooltip(params),
    },
    {
      field: "col9",
      headerName: t("notes"),
      headerClassName: "tableHeader",
      flex: 1,
      minWidth: 60,
      sortable: false,
      renderCell: (params) => {
        return (
          <Mui.IconButton
            sx={styles.icon}
            aria-label="appointmentSlip"
            title={t("notes")}
            onClick={() => {
              dispatch(setIsUnderConstruction(true));
            }}
          >
            <Mui.Avatar
              variant="square"
              src={Notes}
              alt="Notes Image Avatar"
              sx={styles.avatar}
            />
          </Mui.IconButton>
        );
      },
    },
    {
      field: "col10",
      headerName: t("appointmentSlip"),
      headerClassName: "tableHeader",
      flex: 1,
      minWidth: 105,
      maxWidth: 110,
      sortable: false,
      hide:
        props?.screenName === "cancelAppointment" ||
        props?.screenName === "wns" ||
        props?.screenName === "dna",
      renderCell: (params) => {
        return (
          <Mui.IconButton
            sx={styles.icon}
            aria-label="appointmentSlip"
            title={t("appointmentSlip")}
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
              alt="Appointment Slip Image Avatar"
              sx={styles.avatar}
            />
          </Mui.IconButton>
        );
      },
    },
    {
      field: "col11",
      headerName: t("letter"),
      headerClassName: "tableHeader",
      flex: 1,
      minWidth: 60,
      maxWidth: 70,
      sortable: false,
      renderCell: (params) => {
        return (
          <Mui.IconButton
            sx={styles.iconStyle}
            title={t("letter")}
            aria-label="letter"
            onClick={(e: any) => {
              e.stopPropagation(); // don't select this row after clicking
              dispatch(setIsUnderConstruction(true));
            }}
          >
            <Mui.Avatar
              variant="square"
              src={Letter}
              alt="Letter Image Avatar"
              sx={styles.avatar}
            />
          </Mui.IconButton>
        );
      },
    },
    {
      field: "col12",
      headerName: t("patientLabel"),
      headerClassName: "tableHeader",
      flex: 1,
      minWidth: 80,
      sortable: false,
      hide:
        props?.screenName === "cancelAppointment" ||
        props?.screenName === "wns" ||
        props?.screenName === "dna",
      renderCell: (params) => {
        return (
          <Mui.IconButton
            sx={styles.iconStyle}
            aria-label="patientLabel"
            title={t("patientLabel")}
            onClick={(e: any) => {
              e.stopPropagation(); // don't select this row after clicking
              openInNewTab(
                "/cellmaUser/patientLabelPrint",
                "PatientLabelPrint",
                700,
                500
              );
            }}
          >
            <Mui.Avatar
              variant="square"
              src={PatientLabel}
              alt="Patient Label Image Avatar"
              sx={styles.avatar}
            />
          </Mui.IconButton>
        );
      },
    },
    {
      field: "col13",
      headerName: t("history"),
      headerClassName: "tableHeader",
      flex: 1,
      minWidth: 80,
      sortable: false,
      renderCell: (params) => {
        return (
          <Mui.Box sx={styles.linkStyle}>
            <Common.CellmaLink
              label="History"
              onClick={() => {
                openInNewTab(
                  "/cellmaUser/appointmentHistoryPopup",
                  "AppointmentHistoryPopup",
                  900,
                  500
                );
              }}
              target="_blank"
            >
              History
            </Common.CellmaLink>
          </Mui.Box>
        );
      },
    },
    {
      field: "col14",
      headerName: t("multiAppointmentLetters"),
      headerClassName: "tableHeader",
      flex: 1,
      minWidth: 100,
      maxWidth: 100,
      sortable: false,
      hide:
        props?.screenName === "cancelAppointment" ||
        props?.screenName === "wns" ||
        props?.screenName === "attendedPatientAppointments" ||
        props?.screenName === "dna",
      renderCell: () => {
        return (
          <Mui.Box sx={{ display: "flex", justifyContent: "center" }}>
            <Common.CellmaCheckbox label="hideLabel" />
          </Mui.Box>
        );
      },
    },
  ];

  return (
    <Mui.Grid container>
      <Mui.Grid item xs={12}>
        <CellmaTable
          rows={props.rows}
          columns={columns}
          noRecordsMessage={props?.noRecordsMessage}
        />
      </Mui.Grid>

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
    </Mui.Grid>
  );
};

export default PatientAppointmentTable;

export const styles = {
  avatar: { height: "24px", width: "24px" },
  icon: { display: "flex", justifyContent: "center", width: "100%" },
  linkStyle: {
    display: "flex",
    justifyContent: "flex-start",
    width: "100%",
  },
  iconStyle: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
  },
};
