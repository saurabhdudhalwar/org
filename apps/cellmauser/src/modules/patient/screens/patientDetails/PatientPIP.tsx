// This page is merged with create patient/ Add PIP page and this page is for reference for react-team.
//  delete this page after integrating functionality
import { useState } from "react";

import CheckIcon from "@mui/icons-material/Check";
import EditIcon from "@mui/icons-material/Edit";
import * as Mui from "@mui/material";
import { Backdrop, IconButton, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { GridColDef } from "@mui/x-data-grid";
import { useSelector } from "react-redux";

import EditPatientPIP from "./EditPatientPIP";
import CellmaTable from "../../../../common/CellmaTable";
import * as Common from "../../../../common/CommonComponentsIndex";
import { useGetPatientExistingAddress } from "../../api/usePatientAddress";
import usePIPs from "../../api/usePIPs";
import translate from "../../assets/translationFiles/patientDetailsTranslation";
import { IPatientPip } from "../../types";

const PatientPIP = () => {
  const [pipId, setPipId] = useState();
  const [isShowEditPIP, setShowEditPatientPip] = useState(false);
  const [isIntrested, setIsIntrested] = useState(false);
  const [isShowAddress, setIsShowAddress] = useState(false);
  const { patientId, pageNumber } = useSelector((state: any) => state.patient);
  const { language } = useSelector((state: any) => state.language);
  const { patientInterestedPartyList } = usePIPs(patientId, pageNumber);
  const { data: patientAddress } = useGetPatientExistingAddress(patientId);

  const columns: GridColDef[] = [
    {
      field: "pipTitle",
      headerName: translate("title", language),
      headerClassName: "tableHeader",
      flex: 1,
      minWidth: 70,
      maxWidth: 80,
      renderCell: (params: any) => {
        return (
          <Mui.Typography>
            {params.row.pipTitle ? params.row.pipTitle : "-"}
          </Mui.Typography>
        );
      },
    },
    {
      field: "pipFirstname",
      headerName: translate("givenName", language),
      headerClassName: "tableHeader",
      flex: 1,
      minWidth: 100,
      renderCell: (params: any) => {
        return (
          <Mui.Typography>
            {params.row.pipFirstname ? params.row.pipFirstname : "-"}
          </Mui.Typography>
        );
      },
    },
    {
      field: "pipSurname",
      headerName: translate("familyName", language),
      headerClassName: "tableHeader",
      flex: 1,
      minWidth: 100,
      renderCell: (params: any) => {
        return (
          <Mui.Typography>
            {params.row.pipSurname ? params.row.pipSurname : "-"}
          </Mui.Typography>
        );
      },
    },
    {
      field: "pipGender",
      headerName: translate("sex", language),
      headerClassName: "tableHeader",
      flex: 1,
      maxWidth: 120,
      minWidth: 70,
      renderCell: (params: any) => {
        return (
          <Mui.Typography>
            {params.row.pipGender ? params.row.pipGender : "-"}
          </Mui.Typography>
        );
      },
    },
    {
      field: "pipRelationship",
      headerName: translate("relationship", language),
      headerClassName: "tableHeader",
      flex: 1,
      minWidth: 100,
      renderCell: (params: any) => {
        return (
          <Mui.Typography>
            {params.row.pipRelationship ? params.row.pipRelationship : "-"}
          </Mui.Typography>
        );
      },
    },
    {
      field: "pipNextOfKin",
      headerName: translate("nextOfKin", language),
      headerClassName: "tableHeader",
      flex: 1,
      minWidth: 100,
      renderCell: (params) => {
        return params.row.pipNextOfKin === "1" ||
          params.row.pipNextOfKin === 1 ? (
          <CheckIcon sx={{ color: "success.main" }} />
        ) : (
          <Mui.Typography>-</Mui.Typography>
        );
      },
    },
    {
      field: "pipFamilyAwareOfIllness",
      headerName: translate("familyAwareOfIllness", language),
      headerClassName: "tableHeader",
      flex: 1,
      minWidth: 170,
      renderCell: (params) => {
        return params.row.pipFamilyAwareIllness === "1" ||
          params.row.pipFamilyAwareIllness === 1 ? (
          <CheckIcon sx={{ color: "success.main" }} />
        ) : (
          <Mui.Typography>-</Mui.Typography>
        );
      },
    },
    {
      field: "pipIsPatientId",
      headerName: translate("isPatient", language),
      headerClassName: "tableHeader",
      flex: 1,
      minWidth: 100,
      renderCell: (params: any) => {
        return (
          <Mui.Typography>
            {params.row.pipIsPatientId ? "Yes" : "No"}
          </Mui.Typography>
        );
      },
    },
    {
      field: "search",
      headerName: translate("search", language),
      headerClassName: "tableHeader",
      flex: 1,
      minWidth: 70,
      maxWidth: 80,
      renderCell: (params) => {
        return (
          <Common.CellmaLink
            label="Select"
            // sx={{ textDecoration: "none" }}
            onClick={(e: any) => {
              e.stopPropagation(); // don't select this row after clicking
            }}
          >
            Select
          </Common.CellmaLink>
        );
      },
    },
    {
      field: "Edit",
      headerName: translate("edit", language),
      headerClassName: "tableHeader",
      flex: 1,
      minWidth: 70,
      maxWidth: 80,
      renderCell: (params) => {
        return (
          <IconButton
            sx={{ display: "flex", justifyContent: "center", width: "100%" }}
            onClick={(e: any) => {
              e.stopPropagation(); // don't select this row after clicking
              setShowEditPatientPip(true);
              setPipId(params.row.pipId);
            }}
          >
            <EditIcon sx={{ color: "success.main" }} />
          </IconButton>
        );
      },
    },

    {
      field: "address",
      headerName: translate("address", language),
      headerClassName: "tableHeader",
      flex: 1,
      minWidth: 80,
      maxWidth: 90,
      renderCell: (params) => {
        return (
          <Common.CellmaLink
            label="View"
            sx={{ textDecoration: "none" }}
            onClick={(e: any) => {
              e.stopPropagation(); // don't select this row after clicking
              setIsShowAddress(true);
            }}
          >
            View
          </Common.CellmaLink>
        );
      },
    },
  ];

  return (
    <Grid container>
      {!isShowEditPIP && (
        <Grid container item xs={12}>
          <Grid item xs={12}>
            <Typography
              sx={styles.typography}
              variant="subtitle1"
              align="left"
              gutterBottom
            >
              {translate("interestedPartiesList", language)}
            </Typography>
          </Grid>
          <Grid container item xs={12} spacing={2}>
            <Grid item>
              <Common.CellmaButton
                label={translate("addInterestedParty", language)}
                onClick={() => {
                  setIsIntrested(true);
                  setShowEditPatientPip(true);
                }}
              />{" "}
            </Grid>
            <Grid item>
              <Common.CellmaButton label={translate("exportList", language)} />
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <CellmaTable
              rows={patientInterestedPartyList}
              columns={columns}
              searchField
              noRecordsMessage={translate("noPIPfound", language)}
              getRowId={(row: IPatientPip) => row.pipId}
            />

            {isShowAddress && (
              <Backdrop open>
                <Common.CellmaPopup
                  title={translate("address", language)}
                  handleCancel={() => {
                    setIsShowAddress(false);
                  }}
                >
                  <Box>
                    <Grid
                      container
                      spacing={3}
                      sx={styles.addressPopupContaintGrid}
                    >
                      <Grid item xs={6}>
                        <Common.CellmaInputField
                          label={translate("number&Road", language)}
                          value={
                            patientAddress?.permanentAddress?.addAddress1
                              ? patientAddress?.permanentAddress?.addAddress1
                              : ""
                          }
                          disabled
                        />
                      </Grid>

                      <Grid item xs={6}>
                        <Common.CellmaInputField
                          label={translate("district", language)}
                          value={
                            patientAddress?.permanentAddress?.addAddress2
                              ? patientAddress?.permanentAddress?.addAddress2
                              : ""
                          }
                          disabled
                        />
                      </Grid>

                      <Grid item xs={6}>
                        <Common.CellmaInputField
                          label={translate("town", language)}
                          value={
                            patientAddress?.permanentAddress?.addAddress3
                              ? patientAddress?.permanentAddress?.addAddress3
                              : ""
                          }
                          disabled
                        />
                      </Grid>

                      <Grid item xs={6}>
                        <Common.CellmaInputField
                          label={translate("county", language)}
                          value={
                            patientAddress?.permanentAddress?.addAddress4
                              ? patientAddress?.permanentAddress?.addAddress4
                              : ""
                          }
                          disabled
                        />
                      </Grid>

                      <Grid item xs={6}>
                        <Common.CellmaInputField
                          label={translate("postcode", language)}
                          value={
                            patientAddress?.permanentAddress?.addAddress5
                              ? patientAddress?.permanentAddress?.addAddress5
                              : ""
                          }
                          disabled
                        />
                      </Grid>

                      <Grid item xs={6}>
                        <Common.CellmaInputField
                          label={translate("country", language)}
                          value={
                            patientAddress?.permanentAddress?.addAddress6
                              ? patientAddress?.permanentAddress?.addAddress6
                              : ""
                          }
                          disabled
                        />
                      </Grid>

                      <Grid item xs={6}>
                        <Common.CellmaInputField
                          label={translate("locale", language)}
                          value={
                            patientAddress?.permanentAddress?.addLocale
                              ? patientAddress?.permanentAddress?.addLocale
                              : ""
                          }
                          disabled
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <Common.CellmaInputField
                          label={translate("phone", language)}
                          value={
                            patientAddress?.permanentAddress?.addPhone
                              ? patientAddress?.permanentAddress?.addPhone
                              : ""
                          }
                          disabled
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <Common.CellmaInputField
                          label={translate("email", language)}
                          value={
                            patientAddress?.permanentAddress?.addEmail
                              ? patientAddress?.permanentAddress?.addEmail
                              : ""
                          }
                          disabled
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <Common.CellmaInputField
                          label={translate("mobile", language)}
                          value={
                            patientAddress?.permanentAddress?.addMobile
                              ? patientAddress?.permanentAddress?.addMobile
                              : ""
                          }
                          disabled
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <Common.CellmaInputField
                          label={translate("fax", language)}
                          value={
                            patientAddress?.permanentAddress?.addFax
                              ? patientAddress?.permanentAddress?.addFax
                              : ""
                          }
                          disabled
                        />
                      </Grid>
                    </Grid>
                  </Box>
                </Common.CellmaPopup>
              </Backdrop>
            )}
          </Grid>
        </Grid>
      )}
      {isShowEditPIP && pipId ? (
        <EditPatientPIP
          pipId={pipId}
          isIntrested={isIntrested}
          showEditPIP={(bool: boolean) => setShowEditPatientPip(bool)}
        />
      ) : null}
    </Grid>
  );
};

export default PatientPIP;

export const styles = {
  tableColumn: {
    color: "common.black",
    fontWeight: 600,
    margin: "10px",
    backgroundColor: "secondary.main",
  },
  tableData: {
    fontWeight: 400,
    color: "grey.500",
    margin: "10px",
  },

  icons: {
    color: "success.dark",
  },

  links: {
    color: "primary.dark",
    textDecoration: "none",
  },

  typography: { mt: "1px", ml: "4px", mb: "20px" },
  addressPopupContaintGrid: {
    paddingY: "15px",
    paddingX: "35px",
  },
};
