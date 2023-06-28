import { useState } from "react";

import * as Mui from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { useSelector } from "react-redux";

import ConfirmAppointmentPopup from "./ConfirmAppointmentPopup";
import ConfirmPatientDetailsPopup from "./ConfirmPatientDetailsPopup";
import CellmaTable from "../../../../common/CellmaTable";
import * as Common from "../../../../common/CommonComponentsIndex";
import {
  openInNewTab,
  showOverflowTooltip,
} from "../../../../utils/GeneralUtils";
import PatientLabel from "../../assets/icons/PatientLabel.png";
import PatientLocation from "../../assets/icons/PatientLocation.png";
import t from "../../assets/translationFiles/serviceAppointmentTranslation";
import AppointmentLocationPopup from "../../common/AppointmentLocationPopup";

interface Props {
  provisionalAppointmentRows?: any;
}
const ProvisionalAppointmentTable: React.FC<Props> = (props) => {
  const [isConfirmAppointmentPopup, setIsConfirmAppointmentPopup] =
    useState(false);
  const [isAppointmentLocation, setIsAppointmentLocation] = useState(false);
  const [isPatientLocation, setIsPatientLocation] = useState(false);
  const [isConfirmPatientDetails, setIsConfirmPatientDetails] = useState(false);
  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: t("appointmentType"),
      headerClassName: "tableHeader",
      flex: 1,
      minWidth: 105,
      renderCell: (params) => showOverflowTooltip(params),
    },
    {
      field: "col1",
      headerName: t("location"),
      headerClassName: "tableHeader",
      flex: 1,
      minWidth: 90,
      renderCell: (params) => {
        return (
          <Mui.Box sx={styles.linkStyle}>
            <Common.CellmaLink
              label="Location"
              onClick={() => {
                setIsAppointmentLocation(true);
              }}
            >
              {params.value}
            </Common.CellmaLink>
          </Mui.Box>
        );
      },
    },
    {
      field: "col2",
      headerName: t("date"),
      headerClassName: "tableHeader",
      flex: 1,
      minWidth: 90,
    },
    {
      field: "col3",
      headerName: t("confirmationStartDate"),
      headerClassName: "tableHeader",
      flex: 1,
      minWidth: 110,
    },
    {
      field: "col4",
      headerName: t("confirmationEndDate"),
      headerClassName: "tableHeader",
      flex: 1,
      minWidth: 110,
    },
    {
      field: "col5",
      headerName: t("patientName"),
      headerClassName: "tableHeader",
      flex: 1,
      minWidth: 90,
      renderCell: (params) => {
        return (
          <Mui.Box sx={styles.linkStyle}>
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
      field: "col6",
      headerName: t("patientLocation"),
      headerClassName: "tableHeader",
      flex: 1,
      minWidth: 90,
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
      field: "col7",
      headerName: t("cellmaBarcode"),
      headerClassName: "tableHeader",
      flex: 1,
      minWidth: 90,
    },
    {
      field: "col8",
      headerName: t("born"),
      headerClassName: "tableHeader",
      flex: 1,
      minWidth: 90,
      renderCell: (params) => showOverflowTooltip(params),
    },
    {
      field: "col9",
      headerName: t("status"),
      headerClassName: "tableHeader",
      flex: 1,
      minWidth: 170,
      renderCell: (params) => {
        return (
          <Mui.Box sx={styles.linkStyle}>
            <Common.CellmaLink
              label={params.value}
              onClick={() => {
                setIsConfirmAppointmentPopup(true);
              }}
            >
              {params.value}
            </Common.CellmaLink>
          </Mui.Box>
        );
      },
    },
    {
      field: "col10",
      headerName: t("patientLabel"),
      headerClassName: "tableHeader",
      flex: 1,
      minWidth: 90,
      sortable: false,
      renderCell: () => {
        return (
          <Mui.IconButton
            sx={styles.icon}
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
      field: "col11",
      headerName: t("patientDetails"),
      headerClassName: "tableHeader",
      flex: 1,
      minWidth: 90,
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
      field: "col12",
      headerName: t("patientType"),
      headerClassName: "tableHeader",
      flex: 1,
      minWidth: 90,
    },
  ];
  return (
    <Mui.Grid container>
      <Mui.Grid item xs={12}>
        <CellmaTable
          rows={props.provisionalAppointmentRows}
          columns={columns}
          noRecordsMessage={t("noRecordsAvailable")}
        />
      </Mui.Grid>
      {isConfirmAppointmentPopup && (
        <ConfirmAppointmentPopup
          handleClose={() => setIsConfirmAppointmentPopup(false)}
        />
      )}
      {isConfirmPatientDetails && (
        <ConfirmPatientDetailsPopup
          handleCancel={() => setIsConfirmPatientDetails(false)}
        />
      )}
      {(isAppointmentLocation || isPatientLocation) && (
        <AppointmentLocationPopup
          handleAppointmentLocationCancel={() =>
            setIsAppointmentLocation(false)
          }
          handlePatientLocationCancel={() => setIsPatientLocation(false)}
          appointmentLocation={isAppointmentLocation}
          address="17, Latif Bldg, Dr Ambedkar Road, Dadar(e)" // hardcoded temporary value for map
        />
      )}
    </Mui.Grid>
  );
};

export default ProvisionalAppointmentTable;

export const styles = {
  linkStyle: {
    display: "flex",
    justifyContent: "flex-start",
    width: "100%",
  },
  mapContainerStyle: {
    width: "100%",
    height: "500px",
  },
  avatar: { height: "24px", width: "24px" },
  icon: { display: "flex", justifyContent: "center", width: "100%" },
};
