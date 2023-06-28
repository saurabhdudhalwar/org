import * as Mui from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";

import CellmaTable from "../../../../common/CellmaTable";
import * as Common from "../../../../common/CommonComponentsIndex";
import { setIsUnderConstruction } from "../../../../store/CommonAction";
import { SERVICE_APPOINTMENT_ROWS } from "../../assets/dummyData/ServiceBookAppointmentDummyData";
import t from "../../assets/translationFiles/ServiceBookAppointmentTranslation";

const ServiceAppointmentsPopup = (props: any) => {
  const dispatch = useDispatch();
  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: t("healthProfessional"),
      headerClassName: "tableHeader",
      flex: 1,
      minWidth: 200,
    },
    {
      field: "col1",
      headerName: t("total"),
      headerClassName: "tableHeader",
      flex: 1,
      maxWidth: 150,
      minWidth: 100,
    },
    {
      field: "col2",
      headerName: t("location"),
      headerClassName: "tableHeader",
      flex: 1,
      minWidth: 150,
      maxWidth: 200,
    },
    {
      field: "col3",
      headerName: t("patientName"),
      headerClassName: "tableHeader",
      flex: 1,
      minWidth: 300,
      maxWidth: 350,
    },
    {
      field: "col4",
      headerName: t("appointmentTime"),
      headerClassName: "tableHeader",
      flex: 1,
      minWidth: 180,
      renderCell: () => {
        return (
          <Mui.Grid container>
            <Mui.Grid item xs={12}>
              14:20:00&nbsp;&nbsp;&nbsp;15mins
            </Mui.Grid>
          </Mui.Grid>
        );
      },
    },
  ];
  return (
    <Mui.Backdrop open>
      <Common.CellmaPopup
        fullScreen
        title={t("serviceAppointments")}
        handleCancel={props.handleCancel}
      >
        <Mui.Grid container spacing={2} sx={styles.popupGridContainer}>
          <Mui.Grid item xs={12}>
            <Mui.Typography variant="h2" sx={{ color: "common.black" }}>
              {t("generalMedicine")}
            </Mui.Typography>
          </Mui.Grid>
          <Mui.Grid item container xs={3}>
            <Mui.Grid item xs={6}>
              <Mui.Typography variant="h4">{t("forDate")}</Mui.Typography>
            </Mui.Grid>
            <Mui.Grid item xs={6}>
              <Mui.Typography variant="h4">28/12/2022</Mui.Typography>
            </Mui.Grid>
          </Mui.Grid>
          <Mui.Grid item container xs={3}>
            <Mui.Grid item xs={9}>
              <Mui.Typography variant="h4">
                {t("totalScheduledAppointments")}
              </Mui.Typography>
            </Mui.Grid>
            <Mui.Grid item xs={1}>
              <Mui.Typography variant="h4">2</Mui.Typography>
            </Mui.Grid>
          </Mui.Grid>
          <Mui.Grid item xs={12}>
            <Common.CellmaLink
              label="Reschedule Appointments"
              onClick={() => {
                dispatch(setIsUnderConstruction(true));
              }}
            >
              {t("rescheduleAppointment")}
            </Common.CellmaLink>
          </Mui.Grid>
          <Mui.Grid item xs={12}>
            <CellmaTable
              rows={SERVICE_APPOINTMENT_ROWS}
              columns={columns}
              noRecordsMessage={t("noDataAvailable")}
            />
          </Mui.Grid>
        </Mui.Grid>
      </Common.CellmaPopup>
    </Mui.Backdrop>
  );
};

export default ServiceAppointmentsPopup;

export const styles = {
  popupGridContainer: {
    paddingY: "15px",
    paddingX: "35px",
  },
  popupButton: {
    display: "flex",
    justifyContent: "flex-end",
    marginX: "20px",
  },
};
