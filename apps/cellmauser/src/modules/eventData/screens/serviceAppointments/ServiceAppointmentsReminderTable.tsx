import * as Mui from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { useDispatch } from "react-redux";

import CellmaTable from "../../../../common/CellmaTable";
import * as Common from "../../../../common/CommonComponentsIndex";
import { setSnackbar } from "../../../../store/SnackbarAction";
import { showOverflowTooltip } from "../../../../utils/GeneralUtils";
import t from "../../assets/translationFiles/serviceAppointmentTranslation";

interface Props {
  appointmentReminderRows?: any;
}

const ServiceAppointmentsReminderTable: React.FC<Props> = (props) => {
  const dispatch = useDispatch();

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: t("patientName"),
      headerClassName: "tableHeader",
      flex: 2,
      minWidth: 10,
      renderCell: (params) => showOverflowTooltip(params),
    },
    {
      field: "col1",
      headerName: t("date"),
      headerClassName: "tableHeader",
      flex: 2,
      minWidth: 10,
    },
    {
      field: "col2",
      headerName: t("time"),
      headerClassName: "tableHeader",
      flex: 1,
      minWidth: 60,
    },
    {
      field: "col3",
      headerName: t("mobile"),
      headerClassName: "tableHeader",
      flex: 2,
      minWidth: 10,
      renderCell: (params) => showOverflowTooltip(params),
    },
    {
      field: "col4",
      headerName: t("location"),
      headerClassName: "tableHeader",
      flex: 2,
      minWidth: 10,
      renderCell: (params) => showOverflowTooltip(params),
    },
    {
      field: "col5",
      headerName: t("type"),
      headerClassName: "tableHeader",
      flex: 1,
      minWidth: 70,
    },
    {
      field: "col6",
      headerName: t("doctor"),
      headerClassName: "tableHeader",
      flex: 2,
      minWidth: 10,
      renderCell: (params) => showOverflowTooltip(params),
    },
    {
      field: "col7",
      headerName: t("scheduled"),
      headerClassName: "tableHeader",
      minWidth: 100,
    },
    {
      field: "col8",
      headerName: t("attended"),
      headerClassName: "tableHeader",
      flex: 2,
      minWidth: 10,
    },
    {
      field: "col9",
      headerName: t("dna"),
      headerClassName: "tableHeader",
      flex: 1,
      minWidth: 60,
    },
    {
      field: "col10",
      headerName: t("cancelled"),
      headerClassName: "tableHeader",
      flex: 2,
      minWidth: 10,
    },
    {
      field: "col11",
      headerName: t("reminder"),
      headerClassName: "tableHeader",
      flex: 2,
      minWidth: 10,
      sortable: false,
      renderCell: () => {
        return (
          <Mui.Grid sx={{ display: "flex", justifyContent: "center" }}>
            <Common.CellmaCheckbox label="hideLabel" />
          </Mui.Grid>
        );
      },
    },
  ];
  return (
    <Mui.Grid container spacing={1}>
      <Mui.Grid item xs={12}>
        <CellmaTable
          rows={props.appointmentReminderRows}
          columns={columns}
          noRecordsMessage={t("noRecordsFound")}
        />
      </Mui.Grid>
      <Mui.Grid
        item
        xs={12}
        sx={{ display: "flex", justifyContent: "flex-end" }}
        gap={2}
      >
        <Common.CellmaButton label={t("unCheckAll")} />
        <Common.CellmaButton label={t("checkAll")} />
        <Common.CellmaButton
          label={t("sendAll")}
          onClick={() => {
            dispatch(setSnackbar(true, "success", t("reminderSent"), 2));
          }}
        />
      </Mui.Grid>
    </Mui.Grid>
  );
};

export default ServiceAppointmentsReminderTable;
