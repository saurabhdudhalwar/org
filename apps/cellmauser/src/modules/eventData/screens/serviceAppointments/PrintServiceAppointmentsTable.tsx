import { useState } from "react";

import * as Mui from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { useSelector } from "react-redux";

import CellmaLogo from "../../../../assets/logos/CellmaLogo.png";
import CellmaTable from "../../../../common/CellmaTable";
import t from "../../assets/translationFiles/serviceAppointmentTranslation";

export const rows = [
  {
    id: "10/01/2023",
    col1: "11:00",
    col2: "New",
    col3: "Derms Cons",
    col4: "Archway Center",
    col5: "ac23",
    col6: "Smith",
    col7: "Scheduled",
    col8: "Zone 1",
    col9: "Room A",
    col10: "Test",
    col11: "8987414525",
    col12: "Test",
  },
  {
    id: "19/01/2023",
    col1: "11:00",
    col2: "New",
    col3: "Derms Cons",
    col4: "Archway Center",
    col5: "ac23",
    col6: "David",
    col7: "Waiting",
    col8: "Zone 2",
    col9: "Room B",
    col10: "Test",
    col11: "8987414525",
    col12: "Test",
  },
];
const PrintServiceAppointmentsTable = () => {
  const [isShowPatientMobileOnServiceAppointment] = useState(true);
  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: t("date"),
      headerClassName: "tableHeader",
      flex: 1,
      maxWidth: 100,
      minWidth: 100,
    },
    {
      field: "col1",
      headerName: t("time"),
      headerClassName: "tableHeader",
      flex: 1,
      maxWidth: 70,
      minWidth: 70,
    },
    {
      field: "col2",
      headerName: t("type"),
      headerClassName: "tableHeader",
      flex: 1,
      maxWidth: 70,
      minWidth: 70,
    },
    {
      field: "col3",
      headerName: t("with"),
      headerClassName: "tableHeader",
      flex: 1,
      maxWidth: 100,
      minWidth: 100,
    },
    {
      field: "col4",
      headerName: t("serviceLocation"),
      headerClassName: "tableHeader",
      flex: 1,
      maxWidth: 120,
      minWidth: 120,
    },
    {
      field: "col5",
      headerName: t("payrollNo"),
      headerClassName: "tableHeader",
      flex: 1,
      maxWidth: 70,
      minWidth: 70,
    },
    {
      field: "col6",
      headerName: t("patient"),
      headerClassName: "tableHeader",
      flex: 1,
      maxWidth: 100,
      minWidth: 80,
    },
    {
      field: "col7",
      headerName: t("status"),
      headerClassName: "tableHeader",
      flex: 1,
      maxWidth: 100,
      minWidth: 80,
    },
    {
      field: "col8",
      headerName: t("zone"),
      headerClassName: "tableHeader",
      flex: 1,
      maxWidth: 70,
      minWidth: 70,
    },
    {
      field: "col9",
      headerName: t("room"),
      headerClassName: "tableHeader",
      flex: 1,
      maxWidth: 70,
      minWidth: 70,
    },
    {
      field: "col10",
      headerName: t("notes"),
      headerClassName: "tableHeader",
      flex: 1,
      maxWidth: 70,
      minWidth: 70,
    },
    {
      field: "col11",
      headerName: t("patientMobile"),
      headerClassName: "tableHeader",
      flex: 1,
      maxWidth: 100,
      minWidth: 80,
      hide: !isShowPatientMobileOnServiceAppointment,
    },
    {
      field: "col12",
      headerName: t("addressNotes"),
      headerClassName: "tableHeader",
      flex: 1,
      maxWidth: 110,
      minWidth: 90,
    },
  ];
  return (
    <Mui.Grid
      container
      padding={3}
      spacing={2}
      sx={{ backgroundColor: "common.white" }}
    >
      <Mui.Grid item xs={12} sx={styles.logoGrid}>
        <Mui.Avatar
          variant="square"
          sx={styles.cellmaLogo}
          src={CellmaLogo}
          alt="Cellma Image Avatar"
        />
      </Mui.Grid>
      <Mui.Grid item xs={12} sx={styles.header}>
        <Mui.Typography variant="h2">{t("generalMedicine")}</Mui.Typography>
      </Mui.Grid>
      <Mui.Grid item xs={12} sx={styles.hpTextGrid}>
        <Mui.Typography variant="h2" sx={styles.hpText}>
          {t("hp")} -
        </Mui.Typography>
        &nbsp;
        <Mui.Typography variant="h2" sx={styles.hpText}>
          Derms Cons
        </Mui.Typography>
      </Mui.Grid>
      <Mui.Grid item xs={6} sx={styles.hpTextGrid}>
        <Mui.Typography variant="h2" sx={styles.hpText}>
          {t("serviceLocation")} -
        </Mui.Typography>{" "}
        &nbsp;
        <Mui.Typography variant="h2" sx={styles.hpText}>
          Archway Center
        </Mui.Typography>
      </Mui.Grid>
      <Mui.Grid item xs={6} sx={styles.dateGrid}>
        <Mui.Typography variant="h4" sx={styles.dateText}>
          {t("startDate")} : 01/01/2023
        </Mui.Typography>{" "}
        &nbsp; &nbsp;
        <Mui.Typography variant="h4" sx={styles.dateText}>
          {t("endDate")} : 01/02/2023
        </Mui.Typography>
      </Mui.Grid>
      <Mui.Grid item xs={12}>
        <CellmaTable columns={columns} rows={rows} noRecordsMessage="" />
      </Mui.Grid>
    </Mui.Grid>
  );
};

export default PrintServiceAppointmentsTable;

const styles = {
  cellmaLogo: {
    width: { xs: "90px", sm: "170px" },
    height: { xs: "30px", sm: "55.8px" },
    maxWidth: "170px",
  },
  logoGrid: { display: "flex", justifyContent: "flex-end" },
  header: {
    display: "flex",
    justifyContent: "center",
    textDecoration: "underline",
  },
  hpText: { color: "primary.main" },
  dateText: { color: "grey.500" },
  dateGrid: { display: "flex", justifyContent: "flex-end" },
  hpTextGrid: { display: "flex", justifyContent: "flex-start" },
};
