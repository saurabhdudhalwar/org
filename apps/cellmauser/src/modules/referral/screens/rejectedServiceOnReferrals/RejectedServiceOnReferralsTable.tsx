import * as Mui from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";

import CellmaTable from "../../../../common/CellmaTable";
import * as Common from "../../../../common/CommonComponentsIndex";
import { showOverflowTooltip } from "../../../../utils/GeneralUtils";
import * as dummyData from "../../assets/dummyData/rejectedServiceOnReferralDummyData";
import t from "../../assets/translationFiles/rejectedServiceOnReferral";

interface Props {
  handleReRefer: any;
}
const RejectedServiceOnReferralsTable: React.FC<Props> = (props) => {
  const columns: GridColDef[] = [
    {
      field: "col1",
      headerName: t("referredTo"),
      headerClassName: "tableHeader",
      flex: 1,
      minWidth: 90,
    },
    {
      field: "col2",
      headerName: t("serviceLocation"),
      headerClassName: "tableHeader",
      flex: 1,
      minWidth: 90,
    },
    {
      field: "col3",
      headerName: t("referralDate"),
      headerClassName: "tableHeader",
      flex: 1,
      minWidth: 90,
    },

    {
      field: "col4",
      headerName: t("patientName"),
      headerClassName: "tableHeader",
      flex: 1,
      minWidth: 55,
      renderCell: (params) => {
        return (
          <Common.CellmaLink
            label={params.value}
            onClick={(event: any) => {
              event.stopPropagation(); // don't select this row after clicking
            }}
          >
            {params.value}
          </Common.CellmaLink>
        );
      },
    },
    {
      field: "col5",
      headerName: t("referredFrom"),
      headerClassName: "tableHeader",
      flex: 1,
      minWidth: 70,
    },
    {
      field: "col6",
      headerName: t("referralStatus"),
      headerClassName: "tableHeader",
      flex: 1,
      minWidth: 75,
    },
    {
      field: "col7",
      headerName: t("rejectionReason"),
      headerClassName: "tableHeader",
      flex: 1,
      minWidth: 60,
      renderCell: (params) => showOverflowTooltip(params),
    },
    {
      field: "col8",
      headerName: t("notes"),
      headerClassName: "tableHeader",
      flex: 1,
      minWidth: 100,
    },
    {
      field: "col9",
      headerName: "",
      sortable: false,
      headerClassName: "tableHeader",
      flex: 1,
      minWidth: 70,
      maxWidth: 100,
      renderCell: (params) => {
        return (
          <Common.CellmaLink
            label={t("reRefer")}
            onClick={(event: any) => {
              event.stopPropagation(); // don't select this row after clicking
              props?.handleReRefer();
            }}
          >
            {t("reRefer")}
          </Common.CellmaLink>
        );
      },
    },
  ];

  return (
    <Mui.Grid container>
      <Mui.Grid item xs={12}>
        <CellmaTable
          rows={dummyData.ROWS}
          columns={columns}
          noRecordsMessage={t("noRecordsFound")}
          getRowId={(row: any) => row}
          searchField
        />
      </Mui.Grid>
    </Mui.Grid>
  );
};

export default RejectedServiceOnReferralsTable;
