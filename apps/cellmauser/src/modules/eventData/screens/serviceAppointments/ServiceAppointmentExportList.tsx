import * as Mui from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { useSelector } from "react-redux";

import "jspdf-autotable";
import CellmaTable from "../../../../common/CellmaTable";
import * as Common from "../../../../common/CommonComponentsIndex";
import { showOverflowTooltip } from "../../../../utils/GeneralUtils";
import { APPOINTMENTS_ROWS } from "../../assets/dummyData/ServiceAppointmentsDummyData";
import t from "../../assets/translationFiles/serviceAppointmentTranslation";

interface Props {
  fields?: any;
  handleCancel: any;
  appointmentTypePopUp? : any;
}

export const ServiceAppointmentExportList: React.FC<Props> = (props) => {
  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: t("appointmentDate"),
      headerClassName: "tableHeader",
      flex: 1,
      maxWidth: 90,
      minWidth: 90,
    },
    {
      field: "col1",
      headerName: t("appointmentTime"),
      headerClassName: "tableHeader",
      flex: 1,
      maxWidth: 90,
      minWidth: 90,
    },
    {
      field: "col2",
      headerName: t("appointmentType"),
      headerClassName: "tableHeader",
      flex: 1,
      maxWidth: 75,
      minWidth: 70,
    },
    {
      field: "col3",
      headerName: t("appointmentWith"),
      headerClassName: "tableHeader",
      flex: 1,
      maxWidth: 80,
      minWidth: 80,
      renderCell: (params) => showOverflowTooltip(params),
    },

    {
      field: "col4",
      headerName: t("patient"),
      headerClassName: "tableHeader",
      flex: 1,
      maxWidth: 100,
      minWidth: 80,
      renderCell: (params) => showOverflowTooltip(params),
    },
    {
      field: "col5",
      headerName: t("cellmaBarcode"),
      headerClassName: "tableHeader",
      flex: 1,
      maxWidth: 75,
      minWidth: 75,
    },
    {
      field: "col6",
      headerName: t("dob"),
      headerClassName: "tableHeader",
      flex: 1,
      maxWidth: 95,
      minWidth: 95,
    },
    {
      field: "col7",
      headerName: t("patientEmail"),
      headerClassName: "tableHeader",
      flex: 1,
      maxWidth: 75,
      minWidth: 70,
      renderCell: (params) => showOverflowTooltip(params),
    },
    {
      field: "col8",
      headerName: t("patientHomeNo"),
      headerClassName: "tableHeader",
      flex: 1,
      maxWidth: 90,
      minWidth: 90,
    },
    {
      field: "col9",
      headerName: t("patientMobile"),
      headerClassName: "tableHeader",
      flex: 1,
      maxWidth: 75,
      minWidth: 70,
    },
    {
      field: "col10",
      headerName: t("location"),
      headerClassName: "tableHeader",
      flex: 1,
      maxWidth: 75,
      minWidth: 70,
    },
    {
      field: "col11",
      headerName: t("appointmentStatus"),
      headerClassName: "tableHeader",
      flex: 1,
      maxWidth: 75,
      minWidth: 70,
      renderCell: (params) => showOverflowTooltip(params),
    },
    {
      field: "col12",
      headerName: t("triage"),
      headerClassName: "tableHeader",
      flex: 1,
      maxWidth: 75,
      minWidth: 70,
    },
    {
      field: "col13",
      headerName: t("reason"),
      headerClassName: "tableHeader",
      flex: 1,
      maxWidth: 75,
      minWidth: 70,
    },
    {
      field: "col14",
      headerName: t("notes"),
      headerClassName: "tableHeader",
      flex: 1,
      maxWidth: 75,
      minWidth: 70,
    },
    {
      field: "col15",
      headerName: t("addressLine"),
      headerClassName: "tableHeader",
      flex: 1,
      maxWidth: 90,
      minWidth: 90,
      renderCell: (params) => showOverflowTooltip(params),
    },
    {
      field: "col16",
      headerName: t("country"),
      headerClassName: "tableHeader",
      flex: 1,
      maxWidth: 75,
      minWidth: 70,
    },
  ];

  return (
    <Mui.Backdrop open>
      <Common.CellmaPopup
        fullScreen
        title={t(props.appointmentTypePopUp)}
        handleCancel={props.handleCancel}
      >
        <Mui.Grid container spacing={1} sx={styles.popupGridContainer}>
          <Mui.Grid
            item
            xs={12}
            sx={{ display: "flex", justifyContent: "left" }}
          >
            <Mui.Typography variant="h4" sx={{ color: "primary.main" }}>
              {t("displayRecord")}
            </Mui.Typography>
          </Mui.Grid>
          <Mui.Grid item xs={12}>
            {/* <ServiceAppointmentsTable /> */}
            <CellmaTable
              columns={columns}
              rows={APPOINTMENTS_ROWS}
              noRecordsMessage={t("noDataAvailable")}
            />
          </Mui.Grid>
          <Mui.Grid item xs={12}>
            <Mui.Stack
              direction="row"
              sx={{ display: "flex", alignItems: "center" }}
            >
              <Mui.Typography
                variant="h4"
                sx={{ display: "flex", alignItems: "center", mr: "10px" }}
              >
                {t("exportTo")}:{" "}
              </Mui.Typography>
              <Common.CellmaLink label="CSV" variant="h5">
                CSV
              </Common.CellmaLink>
              <Mui.Divider
                orientation="vertical"
                flexItem
                variant="middle"
                sx={styles.divider}
              />
              <Common.CellmaLink label="Excel" variant="h5">
                Excel
              </Common.CellmaLink>{" "}
              <Mui.Divider
                orientation="vertical"
                flexItem
                variant="middle"
                sx={styles.divider}
              />
              <Common.CellmaLink label="XML" variant="h5">
                XML
              </Common.CellmaLink>{" "}
              <Mui.Divider
                orientation="vertical"
                flexItem
                variant="middle"
                sx={styles.divider}
              />
              <Common.CellmaLink label="PDF" variant="h5">
                PDF
              </Common.CellmaLink>
            </Mui.Stack>
          </Mui.Grid>
        </Mui.Grid>
      </Common.CellmaPopup>
    </Mui.Backdrop>
  );
};

export const styles = {
  popupGridContainer: {
    justifyContent: "center",
    justifyItems: "center",
    paddingY: "15px",
    paddingX: "35px",
  },

  divider: {
    borderRightWidth: 2,
    minHeight: "15px",
    color: "grey.900",
    margin: "5px",
  },

  link: { display: "flex", justifyContent: "flex-start", width: "100%" },
};
