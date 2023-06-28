import { useEffect, useRef, useState } from "react";

import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import {
  Backdrop,
  CircularProgress,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { useOutletContext } from "react-router-dom";

import ExportInterestedPartyList from "./ExportInterestedPartyList";
import CellmaTable from "../../../../common/CellmaTable";
import * as Common from "../../../../common/CommonComponentsIndex";
import { setIsUnderConstruction } from "../../../../store/CommonAction";
import { useSelectPatient } from "../../../authentication/api/useDeselectPatient";
import { useGetPatientExistingAddress } from "../../api/usePatientAddress";
import usePatientList from "../../api/usePatientList";
import usePIPs from "../../api/usePIPs";
import translate from "../../assets/translationFiles/createPatientTranslation";
import { setPipPatientId } from "../../store/PatientAction";
import ExistingPatientDetails from "../existingPatientDetails/ExistingPatientDetails";
import ContactTypeScreen from "../patientDemographics/ContactTypeScreen";
import PatientList from "../patientSearch/PatientList";

interface Props {
  handler(): unknown;
  handleStep?(arg0: number): void;
  editPipHandler(pip: number): unknown;
  mode?: string;
}

const InterestedPartyList: React.FC<Props> = (props: any) => {
  const [isShowAddress, setIsShowAddress] = useState(false);
  const [isPIPSearched, setIsPIPSearched] = useState(false);
  const [pipSelectionPage, setPIPSelectionPage] =
    useState<any>("patientSearch");
  const { userRoles } = useSelector((state: any) => state.auth);
  const { language } = useSelector((state: any) => state.language);
  const { patientId, pageNumber } = useSelector((state: any) => state.patient);
  const [exportList, setExportList] = useState(false);
  const [patFirstname, setPatFirstname] = useState<any>("");
  const [patSurname, setPatSurname] = useState<any>("");
  const [pipId, setPipId] = useState<number>();
  const { selectPatientID } = useSelectPatient();
  const existingPatientDetailsRef = useRef<HTMLDivElement>(null);
  const contactTypeScreenRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const { setTitle } = useOutletContext() as any; // <-- access context value

  const {
    listCount,
    patientInterestedPartyList,
    refetch: interestedPartiesRefetch,
  } = usePIPs(patientId, pageNumber);
  const { data, isLoading: patientPipAddressIsLoading } =
    useGetPatientExistingAddress(patientId);
  const {
    patientListCount,
    patientList,
    refetch: patientListRefetch,
  } = usePatientList(
    {
      patFirstname,
      patSurname,
    },
    pageNumber,
    false
  );

  const refetchHandler = () => {
    interestedPartiesRefetch();
  };

  useEffect(() => {
    if (patFirstname !== undefined && patSurname !== undefined) {
      patientListRefetch();
    }
  }, [patFirstname, patSurname, patientListRefetch]);

  const columns: GridColDef[] = [
    {
      field: "pipId",
      headerName: "id",
      headerClassName: "tableHeader",
      flex: 1,
      minWidth: 70,
      hide: true,
    },
    {
      field: "pipTitle",
      headerName: translate("title", language),
      headerClassName: "tableHeader",
      flex: 1,
      minWidth: 70,
    },
    {
      field: "pipFirstname",
      headerName: translate("givenName", language),
      headerClassName: "tableHeader",
      flex: 1,
      minWidth: 100,
    },
    {
      field: "pipSurname",
      headerName: translate("familyName", language),
      headerClassName: "tableHeader",
      flex: 1,
      minWidth: 110,
    },
    {
      field: "pipGender",
      headerName: translate("sex", language),
      headerClassName: "tableHeader",
      flex: 1,
      maxWidth: 120,
      minWidth: 70,
    },
    {
      field: "pipRelationship",
      headerName: translate("relationship", language),
      headerClassName: "tableHeader",
      flex: 1,
      minWidth: 100,
    },
    {
      field: "pipNextOfKin",
      headerName: translate("nextOfKin", language),
      headerClassName: "tableHeader",
      flex: 1,
      minWidth: 100,
      renderCell: (params: any) => (
        <Typography>
          {params?.row?.pipNextOfKin === 1 ? (
            <CheckIcon sx={{ color: "success.main" }} />
          ) : (
            <CloseIcon sx={{ color: "warning.dark" }} />
          )}
        </Typography>
      ),
    },
    {
      field: "pipFamilyAwareIllness",
      headerName: translate("familyAwareOfIllness", language),
      headerClassName: "tableHeader",
      flex: 1,
      minWidth: 130,
      maxWidth: 170,
      renderCell: (params: any) => (
        <Typography>
          {params?.row?.pipFamilyAwareIllness === 1 ? (
            <CheckIcon sx={{ color: "success.main" }} />
          ) : (
            <CloseIcon sx={{ color: "warning.dark" }} />
          )}
        </Typography>
      ),
    },

    {
      field: "pipIsPatientId",
      headerName: translate("isPatient", language),
      headerClassName: "tableHeader",
      flex: 1,
      minWidth: 80,
      renderCell: (params: any) => (
        <Typography>{params?.row?.pipIsPatientId ? "Yes" : "No"}</Typography>
      ),
    },
    {
      field: "pipOccupationText",
      headerName: translate("occupation", language),
      headerClassName: "tableHeader",
      flex: 1,
      minWidth: 100,
    },
    {
      field: "pipEthnicityText",
      headerName: translate("ethnicity", language),
      headerClassName: "tableHeader",
      flex: 1,
      minWidth: 100,
      maxWidth: 110,
    },
    {
      field: "pipPartnerPrint",
      headerName: translate("printPartnerDetails", language),
      headerClassName: "tableHeader",
      flex: 1,
      minWidth: 170,
      renderCell: (params: any) => (
        <Typography>
          {params?.row?.pipPartnerPrint === 1 ? (
            <CheckIcon sx={{ color: "success.main" }} />
          ) : (
            <CloseIcon sx={{ color: "warning.dark" }} />
          )}
        </Typography>
      ),
    },
    {
      field: "col8",
      headerName: translate("searchSelect", language),
      headerClassName: "tableHeader",
      flex: 1,
      minWidth: 70,
      maxWidth: 80,
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            {!params?.row?.pipIsPatientId && (
              <Common.CellmaLink
                label="select"
                onClick={(e: any) => {
                  e.stopPropagation(); // don't select this row after clicking
                  setPatFirstname(params.row.pipFirstname);
                  setPatSurname(params.row.pipSurname);
                  setPipId(params.row.pipId);
                  setIsPIPSearched(true);
                }}
              >
                <Typography>{translate("search", language)}</Typography>
              </Common.CellmaLink>
            )}
            {params?.row?.pipIsPatientId && (
              <Common.CellmaLink
                label="Select"
                onClick={(e: any) => {
                  e.stopPropagation(); // don't select this row after clicking
                  selectPatientID(params?.row?.pipIsPatientId);
                }}
              >
                <Typography>{translate("select", language)}</Typography>
              </Common.CellmaLink>
            )}
          </>
        );
      },
    },
    {
      field: "col9",
      headerName: translate("edit", language),
      headerClassName: "tableHeader",
      flex: 1,
      minWidth: 70,
      maxWidth: 80,
      sortable: false,
      renderCell: (params) => {
        return (
          <IconButton
            sx={{ display: "flex", justifyContent: "center", width: "100%" }}
            aria-label="edit"
            title={translate("edit", language)}
            onClick={(e: any) => {
              e.stopPropagation(); // don't select this row after clicking
              props.editPipHandler(params.row.pipId);
            }}
          >
            <EditIcon sx={{ color: "success.main" }} />
          </IconButton>
        );
      },
    },

    {
      field: "col10",
      headerName: translate("address", language),
      headerClassName: "tableHeader",
      flex: 1,
      minWidth: 80,
      maxWidth: 90,
      sortable: false,
      renderCell: (params) => {
        return (
          <Common.CellmaLink
            label="View"
            onClick={(e: any) => {
              e.stopPropagation(); // don't select this row after clicking
              setIsShowAddress(true);
            }}
          >
            <Typography>{translate("view", language)}</Typography>
          </Common.CellmaLink>
        );
      },
    },
  ];

  return (
    <>
      {patientPipAddressIsLoading && (
        <Backdrop sx={{ zIndex: "1500" }} open>
          <CircularProgress />
        </Backdrop>
      )}
      <Grid container>
        <Grid item xs={12}>
          <CellmaTable
            rows={patientInterestedPartyList}
            getRowId={(row: any) => row.pipId}
            columns={columns}
            searchField
            listCount={listCount}
            noRecordsMessage={translate("noRecordsFound", language)}
          />
        </Grid>
        {isShowAddress && (
          <Common.CellmaPopup
            title={translate("address", language)}
            handleCancel={() => {
              setIsShowAddress(false);
            }}
          >
            <Grid
              container
              spacing={3}
              sx={{ paddingY: "15px", paddingX: "35px" }}
            >
              <Grid item xs={6}>
                <Common.CellmaInputField
                  label={translate("number&Road", language)}
                  value={
                    data?.entity?.permanentAddress?.addAddress1
                      ? data?.entity?.permanentAddress?.addAddress1
                      : ""
                  }
                  disabled
                />
              </Grid>

              <Grid item xs={6}>
                <Common.CellmaInputField
                  label={translate("district", language)}
                  value={
                    data?.entity?.permanentAddress?.addAddress2
                      ? data?.entity?.permanentAddress?.addAddress2
                      : ""
                  }
                  disabled
                />
              </Grid>

              <Grid item xs={6}>
                <Common.CellmaInputField
                  label={translate("town", language)}
                  value={
                    data?.entity?.permanentAddress?.addAddress3
                      ? data?.entity?.permanentAddress?.addAddress3
                      : ""
                  }
                  disabled
                />
              </Grid>

              <Grid item xs={6}>
                <Common.CellmaInputField
                  label={translate("county", language)}
                  value={
                    data?.entity?.permanentAddress?.addAddress4
                      ? data?.entity?.permanentAddress?.addAddress4
                      : ""
                  }
                  disabled
                />
              </Grid>

              <Grid item xs={6}>
                <Common.CellmaInputField
                  label={translate("postcode", language)}
                  value={
                    data?.entity?.permanentAddress?.addAddress5
                      ? data?.entity?.permanentAddress?.addAddress5
                      : ""
                  }
                  disabled
                />
              </Grid>

              <Grid item xs={6}>
                <Common.CellmaInputField
                  label={translate("country", language)}
                  value={
                    data?.entity?.permanentAddress?.addAddress6
                      ? data?.entity?.permanentAddress?.addAddress6
                      : ""
                  }
                  disabled
                />
              </Grid>

              <Grid item xs={6}>
                <Common.CellmaInputField
                  label={translate("locale", language)}
                  value={
                    data?.entity?.permanentAddress?.addLocale
                      ? data?.entity?.permanentAddress?.addLocale
                      : ""
                  }
                  disabled
                />
              </Grid>
              <Grid item xs={6}>
                <Common.CellmaInputField
                  label={translate("phone", language)}
                  value={
                    data?.entity?.permanentAddress?.addPhone
                      ? data?.entity?.permanentAddress?.addPhone
                      : ""
                  }
                  disabled
                />
              </Grid>
              <Grid item xs={6}>
                <Common.CellmaInputField
                  label={translate("email", language)}
                  value={
                    data?.entity?.permanentAddress?.addEmail
                      ? data?.entity?.permanentAddress?.addEmail
                      : ""
                  }
                  disabled
                />
              </Grid>
              <Grid item xs={6}>
                <Common.CellmaInputField
                  label={translate("mobile", language)}
                  value={
                    data?.entity?.permanentAddress?.addMobile
                      ? data?.entity?.permanentAddress?.addMobile
                      : ""
                  }
                  disabled
                />
              </Grid>
              <Grid item xs={6}>
                <Common.CellmaInputField
                  label={translate("fax", language)}
                  value={
                    data?.entity?.permanentAddress?.addFax
                      ? data?.entity?.permanentAddress?.addFax
                      : ""
                  }
                  disabled
                />
              </Grid>
            </Grid>
          </Common.CellmaPopup>
        )}

        {/* PIP select Popup start here */}
        {isPIPSearched && (
          <Backdrop open>
            <Common.CellmaPopup
              title={translate(pipSelectionPage, language)}
              fullScreen
              handleCancel={() => {
                setIsPIPSearched(false);
                setPIPSelectionPage("patientSearch");
                setTitle(translate("patientDetails", language));
                dispatch(setPipPatientId(null));
              }}
            >
              {pipSelectionPage === "patientSearch" && (
                <Grid item xs={12} sx={styles.selectPIP}>
                  <PatientList
                    isSearched
                    list={patientList}
                    pipId={pipId}
                    onPatientSelect={() => {
                      setPIPSelectionPage("patientDetails");
                      setTitle(translate("patientDetails", language));
                      existingPatientDetailsRef?.current?.scrollIntoView();
                    }}
                    listCount={patientListCount}
                    refetchHandler={refetchHandler}
                  />
                </Grid>
              )}
              {pipSelectionPage === "patientDetails" && (
                <Grid
                  item
                  xs={12}
                  sx={styles.selectPIP}
                  ref={existingPatientDetailsRef}
                >
                  <ExistingPatientDetails
                    informationMessages={[]}
                    onConfirm={() => {
                      setPIPSelectionPage("patientSummary");
                      contactTypeScreenRef?.current?.scrollIntoView();
                    }}
                  />
                </Grid>
              )}
              {pipSelectionPage === "patientSummary" && (
                <Grid
                  item
                  xs={12}
                  sx={styles.selectPIP}
                  ref={contactTypeScreenRef}
                >
                  <ContactTypeScreen
                    onClick={() => dispatch(setIsUnderConstruction(true))}
                  />
                </Grid>
              )}
            </Common.CellmaPopup>
          </Backdrop>
        )}
        {/* PIP select Popup end here */}

        <Grid
          item
          xs={12}
          sx={{ display: "flex", justifyContent: "flex-end", gap: "1rem" }}
        >
          <Common.CellmaButton
            label={translate("addInterestedParty", language)}
            onClick={() => props.handler()}
          />

          {/* Default Preference setting 'Hide Export List Button', if this
          setting set to 0 then Export List button will be displayed. 
          @ React Team Please show this button based on settings */}

          {userRoles.includes("Administrator") ||
          userRoles.includes("Patient Administrator") ? (
            <Common.CellmaButton
              label={translate("exportList", language)}
              onClick={() => setExportList(true)}
            />
          ) : null}
          {props?.mode === "addPatient" && (
            <Common.CellmaButton
              label={translate("next", language)}
              onClick={() => props.handleStep(3)}
            />
          )}
        </Grid>
        {exportList && (
          <ExportInterestedPartyList
            mode="interested parties"
            rows={patientInterestedPartyList}
            columns={columns}
            handleCancel={() => setExportList(false)}
          />
        )}
      </Grid>
    </>
  );
};

export default InterestedPartyList;

const styles = {
  selectPIP: { padding: "20px", overflowY: "auto", height: "100%" },
};
