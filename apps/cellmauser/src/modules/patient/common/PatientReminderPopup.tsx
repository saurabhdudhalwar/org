import React, { useState } from "react";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import * as Mui from "@mui/material";
import { GridColDef, GridRowsProp } from "@mui/x-data-grid";
import { useSelector } from "react-redux";

import translate from "../../../assets/translationFiles/commonTranslation";
import CellmaTable from "../../../common/CellmaTable";
import * as Common from "../../../common/CommonComponentsIndex";
import useGetPatientReminderDetails from "../api/usePatientReminder";
import Alert from "../assets/icons/Alert.png";
import Appointment from "../assets/icons/Appointment.png";

const rows: GridRowsProp = [
  // {
  //   id: "T10228",
  //   col1: "1220",
  //   col2: "Test3",
  //   col3: "Dhanraj",
  // },
];

interface Props {
  handleClose: any;
  patientId: any;
}

const PatientReminderPopup: React.FC<Props> = (props: any) => {
  const [linkAnchor, setLinkAnchor] = useState<null | HTMLElement>(null);
  const { language } = useSelector((state: any) => state.language);
  const openLink = Boolean(linkAnchor);

  const { patientReminderData, refetch: getPatientReminderRefetch } =
    useGetPatientReminderDetails(props?.patientId);

  // Handler for open link
  const handleLinkClick = (event: React.MouseEvent<HTMLElement>) => {
    setLinkAnchor(event.currentTarget);
  };

  // Handler for close link
  const handleLinkClose = () => {
    setLinkAnchor(null);
  };

  const appointmentColumns: GridColDef[] = [
    {
      field: "reaDate",
      headerName: translate("dueDate", language),
      headerClassName: "tableHeader",
      flex: 1,
      maxWidth: 100,
      minWidth: 100,
      renderCell: (params: any) => (
        <Mui.Typography>
          {params?.row?.reaDate ? params?.row?.reaDate : "-"}
        </Mui.Typography>
      ),
    },
    {
      field: "reaTime",
      headerName: translate("dueTime", language),
      headerClassName: "tableHeader",
      flex: 1,
      maxWidth: 100,
      minWidth: 100,
      renderCell: (params: any) => (
        <Mui.Typography>
          {params?.row?.reaTime ? params?.row?.reaTime : "-"}
        </Mui.Typography>
      ),
    },
    {
      field: "reaLocation",
      headerName: translate("location", language),
      headerClassName: "tableHeader",
      flex: 1,
      minWidth: 100,
      renderCell: (params: any) => (
        <Mui.Typography>
          {params?.row?.reaLocation ? params?.row?.reaLocation : "-"}
        </Mui.Typography>
      ),
    },
    {
      field: "reaDuration",
      headerName: translate("duration", language),
      headerClassName: "tableHeader",
      flex: 1,
      minWidth: 120,
      renderCell: (params: any) => (
        <Mui.Typography>
          {params?.row?.reaDuration ? params?.row?.reaDuration : "-"} mins
        </Mui.Typography>
      ),
    },
  ];

  const alertColumns: GridColDef[] = [
    {
      field: "aleDueDate",
      headerName: translate("dueDate", language),
      headerClassName: "tableHeader",
      flex: 1,
      maxWidth: 100,
      minWidth: 100,
      renderCell: (params: any) => (
        <Mui.Typography>
          {params?.row?.aleDueDate ? params?.row?.aleDueDate : "-"}
        </Mui.Typography>
      ),
    },
    {
      field: "aleDueTime",
      headerName: translate("dueTime", language),
      headerClassName: "tableHeader",
      flex: 1,
      maxWidth: 100,
      minWidth: 100,
      renderCell: (params: any) => (
        <Mui.Typography>
          {params?.row?.aleDueTime ? params?.row?.aleDueTime : "-"}
        </Mui.Typography>
      ),
    },
    {
      field: "aleCategory",
      headerName: translate("category", language),
      headerClassName: "tableHeader",
      flex: 1,
      minWidth: 100,
      renderCell: (params: any) => (
        <Mui.Typography>
          {params?.row?.aleCategory ? params?.row?.aleCategory : "-"}
        </Mui.Typography>
      ),
    },
    {
      field: "aleDescription",
      headerName: translate("description", language),
      headerClassName: "tableHeader",
      flex: 1,
      minWidth: 120,
      renderCell: (params: any) => (
        <Mui.Typography>
          {params?.row?.aleDescription ? params?.row?.aleDescription : "-"}
        </Mui.Typography>
      ),
    },
  ];

  return (
    <Common.CellmaPopup
      title={translate("patientReminders", language)}
      handleCancel={() => {
        props.handleClose();
      }}
      fullScreen
    >
      <Mui.Grid container spacing={3} sx={styles.popupGridContainer}>
        <Mui.Grid item xs={12}>
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
              PaperProps={{
                sx: {
                  ml: "-35px",
                  overflow: "visible",
                  "&:before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 140,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 1500,
                  },
                },
              }}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
            >
              <Mui.MenuItem sx={styles.menuItemText}>
                <Mui.Avatar
                  variant="square"
                  src={Alert}
                  alt="Alert Image Avatar"
                  sx={styles.avatar}
                />
                {translate("alerts", language)}
              </Mui.MenuItem>
              <Mui.MenuItem sx={styles.menuItemText}>
                <Mui.Avatar
                  variant="square"
                  src={Appointment}
                  alt="Schedule Image Avatar"
                  sx={styles.avatar}
                />
                {translate("schedule", language)}
              </Mui.MenuItem>
            </Mui.Menu>
          </Mui.Backdrop>
        </Mui.Grid>
        <Mui.Grid item xs={12}>
          <Mui.Typography variant="h2" sx={styles.typography}>
            {translate("alerts", language)}
          </Mui.Typography>
        </Mui.Grid>
        <Mui.Grid item xs={12}>
          <CellmaTable
            rows={patientReminderData?.alertDetails}
            columns={alertColumns}
            getRowId={(row: any) => row?.aleId}
            noRecordsMessage={translate("noAlerts", language)}
          />
        </Mui.Grid>
        <Mui.Grid item xs={12}>
          <Mui.Typography variant="h2" sx={styles.typography}>
            {translate("appointments", language)}
          </Mui.Typography>
        </Mui.Grid>
        <Mui.Grid item xs={12}>
          <CellmaTable
            rows={patientReminderData?.referralAppointmentDetails}
            columns={appointmentColumns}
            getRowId={(row: any) => row?.reaId}
            noRecordsMessage={translate("noAppointments", language)}
          />
        </Mui.Grid>
        <Mui.Grid />
      </Mui.Grid>
    </Common.CellmaPopup>
  );
};

export default PatientReminderPopup;

const styles = {
  popupGridContainer: {
    justifyContent: "left",
    justifyItems: "left",
    paddingY: "15px",
    paddingX: "35px",
  },
  avatar: { height: "24px", width: "24px", marginRight: "10px" },
  menuItemText: {
    fontWeight: "500",
    color: "grey.900",
    fontSize: "18px",
    mx: "10px",
    "&:hover": { color: "primary.main" },
  },
  typography: {
    color: "primary.main",
  },
};
