import * as Mui from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";

import CellmaTable from "../../../../common/CellmaTable";
import * as Common from "../../../../common/CommonComponentsIndex";
import { openInNewTab } from "../../../../utils/GeneralUtils";
import * as dummyData from "../../assets/dummyData/addReferralDummyData";
import t from "../../assets/translationFiles/addReferralTranslation";

const ReferralDocumentPopup = (props: any) => {
  const columns: GridColDef[] = [
    {
      field: "Documents",
      headerName: t("documents"),
      headerClassName: "tableHeader",
      flex: 1,
      minWidth: 100,
    },
    {
      field: "Type",
      headerName: t("type"),
      headerClassName: "tableHeader",
      flex: 1,
      minWidth: 100,
    },
    {
      field: "Description",
      headerName: t("description"),
      headerClassName: "tableHeader",
      flex: 1,
      minWidth: 100,
    },
    {
      field: "DisplayName",
      headerName: t("displayName"),
      headerClassName: "tableHeader",
      flex: 1,
      minWidth: 60,
    },
    {
      field: "UploadedBy",
      headerName: t("uploadedBy"),
      headerClassName: "tableHeader",
      flex: 1,
      minWidth: 60,
    },
    {
      field: "View",
      headerName: t("view"),
      headerClassName: "tableHeader",
      flex: 1,
      minWidth: 60,
      maxWidth: 90,
      renderCell: () => {
        return (
          <Common.CellmaLink
            label={t("view")}
            href="/cellmaUser/viewReferralDocument"
            onClick={() =>
              openInNewTab(
                "/cellmaUser/viewReferralDocument",
                "Referral Document",
                700,
                500
              )
            }
            target="_blank"
          >
            {t("view")}
          </Common.CellmaLink>
        );
      },
    },
  ];
  return (
    <Common.CellmaPopup
      title={t("referralDocument")}
      handleCancel={props.handleCancel}
      fullScreen
    >
      <Mui.Grid container spacing={1} sx={styles.popupGridContainer}>
        <CellmaTable
          searchField
          rows={dummyData.ROWS}
          columns={columns}
          getRowId={(row: any) => row?.Documents}
          noRecordsMessage={t("noRecordsFound")}
        />
      </Mui.Grid>
    </Common.CellmaPopup>
  );
};

export default ReferralDocumentPopup;

export const styles = {
  popupGridContainer: {
    justifyContent: "center",
    justifyItems: "center",
    paddingY: "15px",
    paddingX: "35px",
  },
};
