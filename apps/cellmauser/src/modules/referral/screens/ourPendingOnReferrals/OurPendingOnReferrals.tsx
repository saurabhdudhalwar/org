import React, { useEffect, useState } from "react";

import * as Mui from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useOutletContext } from "react-router-dom";

import CellmaTable from "../../../../common/CellmaTable";
import { setIsDrawerOpen } from "../../../../store/CommonAction";
import { ourPendingReferralRows as rows } from "../../assets/dummyData/ourPendingOnReferralsDummyData";
import t from "../../assets/translationFiles/ourPendingOnReferralTranslation";
import { setActiveScreenName } from "../../store/ReferralAction";

const OurPendingOnReferrals = () => {
  const { language } = useSelector((state: any) => state.language);
  const dispatch = useDispatch();

  const {
    setTitle,
    setIsLink,
    setScreenName,
    setDrawerName,
  }: { setTitle: any; setIsLink: any; setScreenName: any; setDrawerName: any } =
    useOutletContext(); // <-- access context value

  useEffect(() => {
    setTitle(t("ourPendingOnReferral"));
    setIsLink(false);
    setScreenName("");
    setDrawerName("ServiceAppointmentDrawer");
    dispatch(setActiveScreenName("ourPendingOnReferrals"));
  }, [language]);

  useEffect(() => {
    dispatch(setIsDrawerOpen(true));
  }, []);

  const [count, setCount] = useState<any>();

  const columns: any = [
    {
      field: "referredTo",
      headerName: t("referredTo"),
      headerClassName: "tableHeader",
      flex: 1,
      minWidth: 200,
      renderCell: (params: any) => (
        <Mui.Typography>
          {params?.row?.referredTo ? params?.row?.referredTo : "-"}
        </Mui.Typography>
      ),
    },
    {
      field: "clinicLocation",
      headerName: t("clinicLocation"),
      headerClassName: "tableHeader",
      flex: 1,
      minWidth: 120,
      renderCell: (params: any) => (
        <Mui.Typography>
          {params?.row?.clinicLocation ? params?.row?.clinicLocation : "-"}
        </Mui.Typography>
      ),
    },
    {
      field: "referralDate",
      headerName: t("referralDate"),
      headerClassName: "tableHeader",
      flex: 1,
      minWidth: 120,
      renderCell: (params: any) => (
        <Mui.Typography>
          {params?.row?.referralDate ? params?.row?.referralDate : "-"}
        </Mui.Typography>
      ),
    },
    {
      field: "patientName",
      headerName: t("patientName"),
      headerClassName: "tableHeader",
      flex: 1,
      minWidth: 120,
      renderCell: (params: any) => (
        <Mui.Typography>
          {params?.row?.patientName ? params?.row?.patientName : "-"}
        </Mui.Typography>
      ),
    },
    {
      field: "referredFrom",
      headerName: t("referredFrom"),
      headerClassName: "tableHeader",
      flex: 1,
      minWidth: 120,
      renderCell: (params: any) => (
        <Mui.Typography>
          {params?.row?.referredFrom ? params?.row?.referredFrom : "-"}
        </Mui.Typography>
      ),
    },
    {
      field: "notes",
      headerName: t("notes"),
      headerClassName: "tableHeader",
      flex: 1,
      minWidth: 200,
      renderCell: (params: any) => (
        <Mui.Tooltip title={params?.row?.notes ? params?.row?.notes : ""}>
          <Mui.Typography>
            {params?.row?.notes ? params?.row?.notes : "-"}
          </Mui.Typography>
        </Mui.Tooltip>
      ),
    },
  ];

  return (
    <Mui.Grid container sx={{ display: "flex", alignItems: "center" }}>
      <CellmaTable
        rows={rows}
        columns={columns}
        listCount={count}
        noRecordsMessage={t("noDataFound")}
        getRowId={(row: any) => row?.referredTo}
      />
    </Mui.Grid>
  );
};

export default OurPendingOnReferrals;
