import { useCallback, useEffect, useState } from "react";

import {
  Backdrop,
  Box,
  CircularProgress,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";

import AddGp from "./AddGp";
import GpListTable from "./GpListTable";
import * as Common from "../../../../common/CommonComponentsIndex";
import { setSnackbar } from "../../../../store/SnackbarAction";
import * as validations from "../../../../utils/Validations";
import { useGPList } from "../../api/useGP";
import translate from "../../assets/translationFiles/createPatientTranslation";
import { ILocalGpSearch } from "../../types";

const GridItem = (props: any) => {
  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      {props.children}
    </Grid>
  );
};

interface Props {
  handleStep?(arg0: number): void;
  handleCancel?: any;
  isShowEditGpColumn?: any;
  mode?: any;
}

const GpList: React.FC<Props> = (props: any) => {
  const [activePage, setActivePage] = useState("gpList");
  const [newGP, setNewGP] = useState<object[]>([]);
  const { language } = useSelector((state: any) => state.language);
  const { isShowGpFullName } = useSelector((state: any) => state.patient);
  const [isGpAddedToPatient, setIsGpAddedToPatient] = useState(false);
  const { pageNumber } = useSelector((state: any) => state.patient);
  const dispatch = useDispatch();
  const [egpId, setEgpId] = useState<any>([]);
  const { preventDemographicsChange } = useSelector(
    (state: any) => state.patient
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const gpSearchForm = useFormik({
    initialValues: {
      familyName: "",
      gpFullName: "",
      gpCode: "",
      ccg: "",
      practiceName: "",
      towncity: "",
      postcode: "",
      buildingNumber: "",
      town: "",
      country: "",
    },
    onSubmit: (values: ILocalGpSearch) => {
      setNewGP([]);
      refetch();
    },
  });

  const {
    gpList,
    gpCount,
    refetch,
    listType,
    isLoading: gpListLoading,
    status: GPSearchStatus,
  } = useGPList(gpSearchForm.values, pageNumber);

  const handler = useCallback((gpDetails: object) => {
    setNewGP([gpDetails]);
    setActivePage("gpList");
    dispatch(setSnackbar(true, "success", translate("gpCreated", language), 4));
  }, []);

  const iconHandler = useCallback(() => {
    setActivePage("gpList");
    setIsGpAddedToPatient(true);
    dispatch(
      setSnackbar(true, "success", translate("gpAddedIcon", language), 4)
    );
  }, []);

  const editHandler = useCallback((event: any, egpId: any) => {
    setEgpId(egpId);
    setActivePage("editPatient");
  }, []);
  return (
    <>
      {gpListLoading && (
        <Backdrop sx={{ zIndex: "1500" }} open>
          <CircularProgress />
        </Backdrop>
      )}
      <form onSubmit={gpSearchForm.handleSubmit}>
        <Grid container sx={styles.mainGridContainer}>
          {activePage === "gpList" && (
            <Grid container item xs={12} rowSpacing={4} columnSpacing={6}>
              <Grid item xs={12}>
                <Typography variant="h2" gutterBottom>
                  {translate("gpList", language)}
                </Typography>
                <Divider />
              </Grid>
              <GridItem>
                {/* If default Preference setting is off "Show FamilyName" */}
                {!isShowGpFullName && (
                  <Common.CellmaInputField
                    label={translate("familyName", language)}
                    name="familyName"
                    value={gpSearchForm.values.familyName}
                    onHandleChange={gpSearchForm.handleChange}
                    style={{ textTransform: "capitalize" }}
                    onKeyPress={validations.allowCharHyphenApostropheSpace}
                    onPaste={
                      validations.restrictPasteEventForSpecialCharactersAndNumbers
                    }
                  />
                )}
                {/* If default Preference setting is on "Show Show GP full name" */}
                {isShowGpFullName && (
                  <Common.CellmaInputField
                    label={translate("gpFullName", language)}
                    name="gpFullName"
                    value={gpSearchForm.values.gpFullName}
                    onHandleChange={gpSearchForm.handleChange}
                    style={{ textTransform: "capitalize" }}
                    onKeyPress={validations.allowCharHyphenApostropheSpace}
                    onPaste={
                      validations.restrictPasteEventForSpecialCharactersAndNumbers
                    }
                  />
                )}
              </GridItem>

              <GridItem>
                <Common.CellmaInputField
                  label={translate("gpCode", language)}
                  name="gpCode"
                  value={gpSearchForm.values.gpCode}
                  onHandleChange={gpSearchForm.handleChange}
                />
              </GridItem>
              <GridItem>
                <Common.CellmaInputField
                  label={translate("practiceName", language)}
                  name="practiceName"
                  value={gpSearchForm.values.practiceName}
                  onHandleChange={gpSearchForm.handleChange}
                />
              </GridItem>
              <GridItem>
                <Common.CellmaInputField
                  label={translate("buildingNumber", language)}
                  name="buildingNumber"
                  value={gpSearchForm.values.buildingNumber}
                  onHandleChange={gpSearchForm.handleChange}
                />
              </GridItem>
              <GridItem>
                <Common.CellmaInputField
                  label={translate("town", language)}
                  name="town"
                  value={gpSearchForm.values.town}
                  onHandleChange={gpSearchForm.handleChange}
                />
              </GridItem>
              <GridItem>
                <Common.CellmaInputField
                  label={translate("country", language)}
                  name="country"
                  value={gpSearchForm.values.country}
                  onHandleChange={gpSearchForm.handleChange}
                />
              </GridItem>
              <GridItem>
                <Common.CellmaInputField
                  label={translate("postcode", language)}
                  name="postcode"
                  style={{ textTransform: "uppercase" }}
                  value={gpSearchForm.values.postcode}
                  onHandleChange={gpSearchForm.handleChange}
                  onKeyPress={validations.allowDigitCharacterSpace}
                  maxLength="20"
                  onPaste={validations.restrictCutCopyPaste}
                />
              </GridItem>
              <GridItem>
                <Box sx={styles.searchButton}>
                  <Common.CellmaButton
                    label={translate("search", language)}
                    size="medium"
                    type="submit"
                  />
                </Box>
              </GridItem>

              {gpList?.length !== 0 ? (
                <Grid item xs={12}>
                  <GpListTable
                    iconHandler={iconHandler}
                    addIconHandler={props.handleCancel}
                    editHandler={editHandler}
                    gpList={newGP.length === 0 ? gpList : newGP}
                    listCount={newGP.length === 0 ? gpCount : newGP.length}
                    listType={listType}
                    isShowEditGpColumn={props.isShowEditGpColumn}
                  />
                </Grid>
              ) : null}
              {GPSearchStatus === "success" &&
                !isGpAddedToPatient &&
                props?.mode === "addPatient" && (
                  <Grid
                    item
                    xs={12}
                    sx={{
                      display: "flex",
                      justifyContent: "flex-end",
                      gap: "1rem",
                    }}
                  >
                    <Common.CellmaButton
                      label={translate("addGp", language)}
                      onClick={() => {
                        setActivePage("addGp");
                        window.scrollTo(0, 0);
                      }}
                    />
                  </Grid>
                )}
              {props?.mode === "editPatient" &&
                GPSearchStatus === "success" &&
                (preventDemographicsChange === 0 ||
                  preventDemographicsChange === "") && (
                  <Grid
                    item
                    xs={12}
                    sx={{
                      display: "flex",
                      justifyContent: "flex-end",
                      gap: "1rem",
                    }}
                  >
                    <Common.CellmaButton
                      label={translate("addGp", language)}
                      onClick={() => {
                        setActivePage("addGp");
                        window.scrollTo(0, 0);
                      }}
                    />
                  </Grid>
                )}

              {isGpAddedToPatient && props?.mode === "addPatient" && (
                <Grid
                  item
                  xs={12}
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    gap: "1rem",
                  }}
                >
                  <Common.CellmaButton
                    label={translate("next", language)}
                    onClick={() => props.handleStep(4)}
                  />
                </Grid>
              )}
            </Grid>
          )}
          {activePage === "addGp" && (
            <AddGp
              handleStep={props.handleStep}
              handler={handler}
              handleCancel={() => setActivePage("gpList")}
              mode={props?.mode}
            />
          )}

          {activePage === "editPatient" && (
            <AddGp
              handleStep={props.handleStep}
              handler={handler}
              handleCancel={() => setActivePage("gpList")}
              mode={props?.mode}
              egpId={props?.mode === "editPatient" && egpId}
            />
          )}
        </Grid>
      </form>
    </>
  );
};
export default GpList;

const styles = {
  mainGridContainer: {
    display: "flex",

    justifyContent: "center",
  },
  button: {
    display: "flex",
    gap: "2.5rem",
  },
  alignCenter: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  alert: {
    color: "common.white",
    backgroundColor: "success.dark",
  },
  searchButton: {
    display: "flex",
    justifyContent: "flex-start",
    marginTop: "-10px",
  },
};
