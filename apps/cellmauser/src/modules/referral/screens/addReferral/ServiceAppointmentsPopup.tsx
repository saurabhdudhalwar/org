import * as Mui from "@mui/material";
import { GridColDef, GridRowsProp } from "@mui/x-data-grid";

import CellmaTable from "../../../../common/CellmaTable";
import * as Common from "../../../../common/CommonComponentsIndex";
import t from "../../assets/translationFiles/addReferralTranslation";

const rows: GridRowsProp = [
  {
    id: "Dr.Lee",
    col1: "2",
    col2: "Archway Clinic",
    col3: "Smith John",
    col4: "14:20:00",
    col5: "15 mins",
  },
  {
    id: "Dr.Emma Hoper",
    col1: "2",
    col2: "Archway Clinic",
    col3: "David John",
    col4: "10:15:00",
    col5: "15 mins",
  },
];
const ServiceAppointmentsPopup = (props: any) => {
  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: t("healthProfessional"),
      headerClassName: "tableHeader",
      flex: 1,
      maxWidth: 200,
      minWidth: 100,
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
      maxWidth: 150,
      minWidth: 130,
    },
    {
      field: "col5",
      headerName: t("duration"),
      headerClassName: "tableHeader",
      flex: 1,
      minWidth: 100,
      maxWidth: 150,
    },
  ];

  return (
    <Mui.Backdrop open>
      <Common.CellmaPopup
        fullScreen
        title={t("serviceAppointments")}
        handleCancel={props.handleCancel}
      >
        <Mui.Grid container spacing={1} sx={styles.popupGridContainer}>
          <Mui.Grid
            item
            xs={12}
            sx={{ display: "flex", justifyContent: "flex-start" }}
          >
            <Mui.Typography variant="h4" sx={{ color: "common.black" }}>
              {t("generalMedicine")}
            </Mui.Typography>
          </Mui.Grid>
          <Mui.Grid
            item
            xs={12}
            sx={{ display: "flex", justifyContent: "flex-start" }}
          >
            <Mui.Typography variant="h4" sx={{ color: "common.black" }}>
              {t("forDate")}: 28/12/2022
            </Mui.Typography>
          </Mui.Grid>
          <Mui.Grid
            item
            xs={12}
            sx={{ display: "flex", justifyContent: "flex-end" }}
          >
            {t("totalScheduledAppointments")} 2
          </Mui.Grid>
          <Mui.Grid item xs={12}>
            <CellmaTable
              rows={rows}
              columns={columns}
              noRecordsMessage={t("noRecordsFound")}
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
    justifyContent: "center",
    justifyItems: "center",
    paddingY: "15px",
    paddingX: "35px",
  },
  popupButton: {
    display: "flex",
    justifyContent: "flex-end",
    marginX: "20px",
  },
};
