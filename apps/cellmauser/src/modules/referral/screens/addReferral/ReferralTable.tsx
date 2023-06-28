import { useEffect, useState } from "react";

import * as Mui from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import AddAssessmentPopup from "./AddAssessmentPopup";
import ReferralDocumentPopup from "./ReferralDocumentPopup";
import RejectReferralPopup from "./RejectReferralPopup";
import SelectContactTypePopup from "./SelectContactTypePopup";
import TeamPopup from "./TeamPopup";
import ViewAssessmentPopup from "./ViewAssessmentPopup";
import ViewDetailsPopup from "./ViewDetailsPopup";
import CellmaTable from "../../../../common/CellmaTable";
import * as Common from "../../../../common/CommonComponentsIndex";
import { setIsUnderConstruction } from "../../../../store/CommonAction";
import { setSnackbar } from "../../../../store/SnackbarAction";
import * as dummyData from "../../assets/dummyData/referralTableDummyData";
import { referralTableDummyData as rows } from "../../assets/dummyData/referralTableDummyData";
import t from "../../assets/translationFiles/addReferralTranslation";

const ReferralTable = (props: any) => {
  const [renameIdentifierFieldToPayrollNo] = useState<any>(1);
  const [isViewAssessment, setIsViewAssessment] = useState<any>(false);
  const [isAddAssessment, setIsAddAssessment] = useState<any>(false);
  const [isTeamPopup, setIsTeamPopup] = useState<any>(false);
  const [isReferralDocument, setIsReferralDocument] = useState<any>(false);
  const [isViewDetailsPopup, setIsViewDetailsPopup] = useState<any>(false);
  const [isRejectedReferralPopup, setIsRejectedReferralPopup] =
    useState<any>(false);
  const [isContactTypePopup, setIsContactTypePopup] = useState<any>(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const activeScreenName = useSelector(
    (state: any) => state?.referral?.activeScreenName
  );
  const { serviceReferralStatus } = useSelector((state: any) => state.referral);

  const getImgURL = (item: string) => {
    return new URL(
      `../../assets/icons/${item}.png`,
      import.meta.url
    ).toString();
  };

  useEffect(() => {
    props?.HandleContactTypePopup(isContactTypePopup);
  }, [isContactTypePopup]);

  const columns: any = [
    {
      field: "referredDate",
      headerName: t("referredDate"),
      headerClassName: "tableHeader",
      flex: 1,
      minWidth: 150,
      renderCell: (params: any) => (
        <Mui.Typography>
          {params?.row?.referredDate ? params?.row?.referredDate : "-"}
        </Mui.Typography>
      ),
    },
    // NOTE: If Default Preference setting "Rename identifier Field to Payroll No" is set to 1,
    // then Identifier field will be called as Payroll No. on Service Referrals page. If this is set to 0,
    // then that field and column will be called as "Identifier"

    {
      field: "payrollNo",
      headerName:
        renameIdentifierFieldToPayrollNo === 1
          ? t("payrollNo")
          : t("identifier"),
      headerClassName: "tableHeader",
      flex: 1,
      minWidth: 120,
      renderCell: (params: any) => (
        <Mui.Typography>
          {params?.row?.payrollNo ? params?.row?.payrollNo : "-"}
        </Mui.Typography>
      ),
    },
    {
      field: "patientName",
      headerName: t("patientName"),
      headerClassName: "tableHeader",
      flex: 1,
      minWidth: 200,
      renderCell: (params: any) => (
        // Please use proper condition for this field this is only dummy condition used for displaying DummyData

        <Mui.Typography>
          {params?.row?.patientName === "Renuka M" ? (
            <Mui.Typography sx={{ color: "error.main" }}>
              {params?.row?.patientName}
            </Mui.Typography>
          ) : params?.row?.patientName ? (
            <Common.CellmaLink
              label={params?.row?.patientName}
              onClick={() => setIsContactTypePopup(true)}
            >
              {params?.row?.patientName}
            </Common.CellmaLink>
          ) : (
            "-"
          )}
        </Mui.Typography>
      ),
    },
    {
      field: "team",
      headerName: t("team"),
      headerClassName: "tableHeader",
      flex: 1,
      minWidth: 200,
      renderCell: (params: any) => (
        <Common.CellmaLink
          label={params?.row?.team ? params?.row?.team : "-"}
          onClick={() => setIsTeamPopup(true)}
        >
          {params?.row?.team ? params?.row?.team : "-"}
        </Common.CellmaLink>
      ),
    },
    {
      field: "clinicLocation",
      headerName: t("clinicLocation"),
      headerClassName: "tableHeader",
      flex: 1,
      minWidth: 200,
      renderCell: (params: any) => (
        <Mui.Typography>
          {params?.row?.clinicLocation ? params?.row?.clinicLocation : "-"}
        </Mui.Typography>
      ),
    },
    {
      field: "clinicType",
      headerName: t("clinicType"),
      headerClassName: "tableHeader",
      flex: 1,
      minWidth: 200,
      renderCell: (params: any) => (
        <Mui.Typography>
          {params?.row?.clinicType ? params?.row?.clinicType : "-"}
        </Mui.Typography>
      ),
    },
    {
      field: "form",
      headerName: t("form"),
      headerClassName: "tableHeader",
      flex: 1,
      minWidth: 70,
      sortable: false,
      renderCell: (params: any) => (
        <Common.CellmaLink
          label={params?.row?.form ? t("show") : "-"}
          onClick={() => setIsViewDetailsPopup(true)}
        >
          {params?.row?.form ? t("show") : "-"}
        </Common.CellmaLink>
      ),
    },
    {
      field: "chat",
      headerName: t("chat"),
      headerClassName: "tableHeader",
      flex: 1,
      sortable: false,
      minWidth: 60,
      renderCell: (params: any) => (
        <Mui.IconButton size="small">
          <Mui.Tooltip title={t("chat")} arrow placement="right">
            <Mui.Avatar
              variant="square"
              src={getImgURL("Messages")}
              alt={`alt_${params?.row?.clinicType}`}
              sx={styles.avatar}
            />
          </Mui.Tooltip>
        </Mui.IconButton>
      ),
    },
    {
      field: "doc",
      headerName: t("doc"),
      headerClassName: "tableHeader",
      flex: 1,
      minWidth: 60,
      sortable: false,
      renderCell: (params: any) => (
        <Mui.IconButton
          size="small"
          onClick={() => setIsReferralDocument(true)}
        >
          <Mui.Tooltip title={t("doc")} arrow placement="right">
            <Mui.Avatar
              variant="square"
              src={getImgURL("Document")}
              alt={`alt_${params?.row?.payrollNo}`}
              sx={styles.avatar}
            />
          </Mui.Tooltip>
        </Mui.IconButton>
      ),
    },
    {
      field: "triageAssessment",
      headerName: t("triageAssessment"),
      headerClassName: "tableHeader",
      flex: 1,
      minWidth: 100,
      hide: serviceReferralStatus === "Discharged",

      renderCell: (params: any) => (
        <Common.CellmaLink
          label={
            params?.row?.triageAssessment ? params?.row?.triageAssessment : "-"
          }
          onClick={() =>
            params?.row?.triageAssessment === "View"
              ? setIsViewAssessment(true)
              : setIsAddAssessment(true)
          }
        >
          {params?.row?.triageAssessment === "View" ? t("view") : t("add")}
        </Common.CellmaLink>
      ),
    },
    {
      field: "clinicalPriority",
      headerName: t("clinicalPriority"),
      headerClassName: "tableHeader",
      flex: 1,
      minWidth: 200,
      hide: serviceReferralStatus === "Discharged",

      renderCell: (params: any) => (
        // Please use proper condition for this field this is only dummy condition used for displaying DummyData
        <Mui.Box width={1}>
          {params?.row?.clinicalPriority === "Emergency" ? (
            <Mui.Typography sx={{ color: "error.dark" }}>
              {t("emergency")}
            </Mui.Typography>
          ) : (
            <Common.CellmaAutoSelectField
              label={t("clinicalPriority")}
              name="clinicalPriority"
              ariaLabel="clinicalPriority"
              options={dummyData.clinicalPriority}
              getOptionLabel={(REFERRED_BY: any) => REFERRED_BY.label ?? ""}
              renderOption={(props: any, REFERRED_BY: any) => (
                <li {...props}>{REFERRED_BY.label}</li>
              )}
            />
          )}
        </Mui.Box>
      ),
    },
    {
      field: "accept",
      headerName: t("accept"),
      headerClassName: "tableHeader",
      flex: 1,
      minWidth: 100,
      hide:
        activeScreenName === "createAnOnReferral" ||
        serviceReferralStatus === "Accepted then Rejected" ||
        serviceReferralStatus === "We Rejected" ||
        serviceReferralStatus === "Rejected By Other Service" ||
        serviceReferralStatus === "Discharged" ||
        serviceReferralStatus === "Returned Referral",

      renderCell: () =>
        serviceReferralStatus === "Accepted Requires Appointment" ||
        serviceReferralStatus === "Accepted on Waiting List" ||
        serviceReferralStatus === "Accepted Appointment Set" ||
        serviceReferralStatus === "Accepted Appointment Set" ? (
          <Mui.Typography>{t("yes")}</Mui.Typography>
        ) : (
          <Common.CellmaLink
            label={t("accept")}
            onClick={() =>
              dispatch(
                setSnackbar(true, "success", t("acceptedSuccessfully"), 4)
              )
            }
          >
            {t("accept")}
          </Common.CellmaLink>
        ),
    },
    {
      field: "reject",
      headerName: t("reject"),
      headerClassName: "tableHeader",
      flex: 1,
      minWidth: 100,
      hide:
        activeScreenName === "createAnOnReferral" ||
        serviceReferralStatus === "Accepted then Rejected" ||
        serviceReferralStatus === "We Rejected" ||
        serviceReferralStatus === "Rejected By Other Service" ||
        serviceReferralStatus === "Discharged" ||
        serviceReferralStatus === "Returned Referral",

      renderCell: () => (
        <Common.CellmaLink
          label={t("reject")}
          onClick={() => setIsRejectedReferralPopup(true)}
        >
          {t("reject")}
        </Common.CellmaLink>
      ),
    },
    {
      field: "bookAppointment",
      headerName: t("bookAppointment"),
      headerClassName: "tableHeader",
      flex: 1,
      minWidth: 100,
      hide:
        serviceReferralStatus === "Awaiting Acceptance" ||
        serviceReferralStatus === "Accepted then Rejected" ||
        serviceReferralStatus === "We Rejected" ||
        serviceReferralStatus === "Rejected By Other Service" ||
        serviceReferralStatus === "Discharged",

      renderCell: (params: any) =>
        serviceReferralStatus === "Accepted Appointment Set" ? (
          <Mui.Typography>{t("booked")}</Mui.Typography>
        ) : (
          <Mui.IconButton
            size="small"
            onClick={() =>
              navigate("/cellmaUser/eventData/serviceBookAppointment")
            }
          >
            <Mui.Tooltip title={t("bookAppointment")} arrow placement="right">
              <Mui.Avatar
                variant="square"
                src={getImgURL("BookAppointments")}
                alt={`alt_${params?.row?.payrollNo}`}
                sx={styles.avatar}
              />
            </Mui.Tooltip>
          </Mui.IconButton>
        ),
    },
    {
      field: "inviteForAppointment",
      headerName: t("inviteForAppointment"),
      headerClassName: "tableHeader",
      flex: 1,
      minWidth: 100,
      hide:
        serviceReferralStatus === "Awaiting Acceptance" ||
        serviceReferralStatus === "Accepted then Rejected" ||
        serviceReferralStatus === "We Rejected" ||
        serviceReferralStatus === "Rejected By Other Service" ||
        serviceReferralStatus === "Discharged" ||
        serviceReferralStatus === "Accepted Appointment Set",

      renderCell: (params: any) =>
        params?.row?.inviteForAppointment === "Invited" ? (
          <Mui.IconButton
            onClick={() =>
              dispatch(
                setSnackbar(true, "info", t("appointmentRequestPending"), 4)
              )
            }
          >
            <Mui.Typography>{t("invited")}</Mui.Typography>
          </Mui.IconButton>
        ) : (
          <Mui.IconButton
            size="small"
            onClick={() =>
              dispatch(
                setSnackbar(true, "success", t("inviteSentSuccessfully"), 4)
              )
            }
          >
            <Mui.Tooltip
              title={t("inviteForAppointment")}
              arrow
              placement="right"
            >
              <Mui.Avatar
                variant="square"
                src={getImgURL("InvitePatientForAnAppointment")}
                alt={`alt_${params?.row?.payrollNo}`}
                sx={styles.avatar}
              />
            </Mui.Tooltip>
          </Mui.IconButton>
        ),
    },
    {
      field: "addToWaitingList",
      headerName: t("addToWaitingList"),
      headerClassName: "tableHeader",
      flex: 1,
      minWidth: 100,
      hide:
        serviceReferralStatus === "Awaiting Acceptance" ||
        serviceReferralStatus === "Accepted then Rejected" ||
        serviceReferralStatus === "We Rejected" ||
        serviceReferralStatus === "Rejected By Other Service" ||
        serviceReferralStatus === "Discharged" ||
        serviceReferralStatus === "Accepted Appointment Set",

      renderCell: (params: any) =>
        serviceReferralStatus === "Accepted on Waiting List" ? (
          <Mui.Typography>{t("added")}</Mui.Typography>
        ) : (
          <Mui.IconButton
            size="small"
            onClick={() =>
              dispatch(setSnackbar(true, "success", t("addedToWaitingList"), 4))
            }
          >
            <Mui.Tooltip title={t("addToWaitingList")} arrow placement="right">
              <Mui.Avatar
                variant="square"
                src={getImgURL("WaitingList")}
                alt={`alt_${params?.row?.payrollNo}`}
                sx={styles.avatar}
              />
            </Mui.Tooltip>
          </Mui.IconButton>
        ),
    },
    {
      field: "referralStatus",
      headerName: t("referralStatus"),
      headerClassName: "tableHeader",
      flex: 1,
      minWidth: 150,
      hide:
        activeScreenName === "serviceReferrals" ||
        serviceReferralStatus === "Discharged" ||
        serviceReferralStatus === "Returned Referral",

      renderCell: (params: any) => (
        <Common.CellmaLink
          label={
            params?.row?.referralStatus ? params?.row?.referralStatus : "-"
          }
        >
          {params?.row?.referralStatus ? params?.row?.referralStatus : "-"}
        </Common.CellmaLink>
      ),
    },
    {
      field: "reReferral",
      headerName: t("reReferral"),
      headerClassName: "tableHeader",
      flex: 1,
      minWidth: 150,
      hide:
        activeScreenName === "serviceReferrals" ||
        serviceReferralStatus === "Discharged" ||
        serviceReferralStatus === "Returned Referral",

      renderCell: (params: any) => (
        <Common.CellmaLink
          label={params?.row?.reReferral ? params?.row?.reReferral : "-"}
        >
          {params?.row?.reReferral ? params?.row?.reReferral : ""}
        </Common.CellmaLink>
      ),
    },

    {
      field: "completelyReject",
      headerName: t("completelyReject"),
      headerClassName: "tableHeader",
      flex: 1,
      minWidth: 150,
      hide: true,
      renderCell: () => (
        <Mui.Typography sx={{ color: "primary.dark" }}>
          {t("completelyReject")}
        </Mui.Typography>
      ),
    },
    {
      field: "rejectionReason",
      headerName: t("rejectionReason"),
      headerClassName: "tableHeader",
      flex: 1,
      minWidth: 150,
      hide:
        serviceReferralStatus === "Awaiting Acceptance" ||
        serviceReferralStatus === "Accepted Requires Appointment" ||
        serviceReferralStatus === "Accepted on Waiting List" ||
        serviceReferralStatus === "Discharged" ||
        serviceReferralStatus === "Returned Referral" ||
        serviceReferralStatus === "Accepted Appointment Set",
    },
    {
      field: "referralLocation",
      headerName: t("referralLocation"),
      headerClassName: "tableHeader",
      flex: 1,
      minWidth: 200,
      hide:
        serviceReferralStatus === "Accepted Requires Appointment" ||
        serviceReferralStatus === "Accepted on Waiting List" ||
        serviceReferralStatus === "Accepted then Rejected" ||
        serviceReferralStatus === "We Rejected" ||
        serviceReferralStatus === "Rejected By Other Service" ||
        serviceReferralStatus === "Discharged" ||
        serviceReferralStatus === "Returned Referral" ||
        serviceReferralStatus === "Accepted Appointment Set",

      renderCell: (params: any) => (
        <Mui.Box width={1}>
          <Common.CellmaAutoSelectField
            dummyData
            label={t("referralLocation")}
            name="referralLocation"
            ariaLabel={`${params?.row?.payrollNo}referralLocation`}
            options={dummyData?.clinicalPriority}
            getOptionLabel={(referralLocation: any) => referralLocation.label}
            renderOption={(props: any, referralLocation: any) => (
              <li {...props}>{referralLocation.label}</li>
            )}
          />
        </Mui.Box>
      ),
    },
    {
      field: "save",
      headerName: t("save"),
      headerClassName: "tableHeader",
      flex: 1,
      minWidth: 100,
      hide:
        serviceReferralStatus === "Accepted Requires Appointment" ||
        serviceReferralStatus === "Accepted on Waiting List" ||
        serviceReferralStatus === "Accepted then Rejected" ||
        serviceReferralStatus === "We Rejected" ||
        serviceReferralStatus === "Rejected By Other Service" ||
        serviceReferralStatus === "Discharged" ||
        serviceReferralStatus === "Returned Referral" ||
        serviceReferralStatus === "Accepted Appointment Set",

      renderCell: () => (
        <Mui.Box width={1}>
          <Common.CellmaButton label={t("save")} />
        </Mui.Box>
      ),
    },
  ];

  return (
    <>
      <Mui.Grid
        container
        sx={{ display: "flex", alignItems: "center", mt: "10px" }}
      >
        <CellmaTable
          rows={rows}
          columns={columns}
          noRecordsMessage={t("noRecordsFound")}
          getRowId={(row: any) => row?.payrollNo}
        />
        {isViewAssessment && (
          <ViewAssessmentPopup
            handleCancel={() => setIsViewAssessment(false)}
          />
        )}
        {isAddAssessment && (
          <AddAssessmentPopup handleCancel={() => setIsAddAssessment(false)} />
        )}
        {isTeamPopup && (
          <TeamPopup handleCancel={() => setIsTeamPopup(false)} />
        )}
        {isReferralDocument && (
          <ReferralDocumentPopup
            handleCancel={() => setIsReferralDocument(false)}
          />
        )}
        {isViewDetailsPopup && (
          <ViewDetailsPopup handleCancel={() => setIsViewDetailsPopup(false)} />
        )}
        {isRejectedReferralPopup && (
          <RejectReferralPopup
            handleCancel={() => setIsRejectedReferralPopup(false)}
          />
        )}
        {isContactTypePopup && (
          <SelectContactTypePopup
            handleCancel={() => {
              setIsContactTypePopup(false);
            }}
          />
        )}
      </Mui.Grid>

      <Mui.Grid sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Export List button on Service Referrals page should be dispalyed only for Users with Referral Admin or Administrator rights afterward */}
        <Common.CellmaButton
          label={t("exportList")}
          onClick={() => dispatch(setIsUnderConstruction(true))}
        />
        <Common.CellmaButton
          label={t("addToWorkList")}
          onClick={() => dispatch(setIsUnderConstruction(true))}
        />
      </Mui.Grid>
    </>
  );
};

export default ReferralTable;

export const styles = {
  avatar: { height: "24px", width: "24px" },
};
