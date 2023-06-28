import { useEffect, useState } from "react";

import * as Mui from "@mui/material";
import { Box, Grid, MenuItem } from "@mui/material";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";

import useEstablishmentListItems from "../../../../api/useEstablishmentListItems";
import * as Common from "../../../../common/CommonComponentsIndex";
import { setSnackbar } from "../../../../store/SnackbarAction";
import { allowCharHyphenApostropheSpace } from "../../../../utils/Validations";
import { useGetGpDetails } from "../../api/usePatientGp";
import translate from "../../assets/translationFiles/patientDetailsTranslation";
import GpList from "../createPatient/GpList";

const PatientGP = (props: any) => {
  const [isFindGpClicked, setIsFindGpClicked] = useState(false);
  const { language } = useSelector((state: any) => state.language);
  const dispatch = useDispatch();
  const { patientId } = useSelector((state: any) => state.patient);
  interface IPatientGP {
    title: string;
    initials: string;
    familyName: string;
    givenName: string;
    practiceCode: string;
    practiceName: string;
    ccg: string;
    gpCode: string;
  }
  const { data } = useGetGpDetails({ patId: patientId }, props?.mode);
  const { data: establishmentListItem } = useEstablishmentListItems(["title"]);

  const formik = useFormik({
    initialValues: {
      title: data?.gpInformation?.egpTitle ?? "",
      initials: data?.gpInformation?.egpInitials ?? "",
      familyName: data?.gpInformation?.egpSurname ?? "",
      givenName: data?.gpInformation?.egpFirstName ?? "",
      practiceCode: data?.gpInformation?.egpPractiseCode ?? "",
      practiceName: data?.gpInformation?.egpPctName ?? "",
      ccg: data?.gpInformation?.egpCcg ?? "",
      gpCode: data?.gpInformation?.egpGpCode ?? "",
    },
    onSubmit: () => {
      setIsFindGpClicked(true);
    },
  });

  useEffect(() => {
    formik.setFieldValue("title", data?.gpInformation?.egpTitle);
    formik.setFieldValue("initials", data?.gpInformation?.egpInitials);
    formik.setFieldValue("familyName", data?.gpInformation?.egpSurname);
    formik.setFieldValue("givenName", data?.gpInformation?.egpFirstName);
    formik.setFieldValue("practiceCode", data?.gpInformation?.egpPractiseCode);
    formik.setFieldValue("practiceName", data?.gpInformation?.egpPctName);
    formik.setFieldValue("ccg", data?.gpInformation?.egpCcg);
    formik.setFieldValue("gpCode", data?.gpInformation?.egpGpCode);
  }, [data]);

  return (
    <Box>
      <form onSubmit={formik.handleSubmit}>
        {!isFindGpClicked && (
          <Grid
            container
            spacing={3}
            columnSpacing={10}
            sx={{ display: "flex", alignItems: "center" }}
          >
            <Grid item xs={2.4}>
              <Common.CellmaSelectField
                label={translate("title", language)}
                name="title"
                disabled
                value={formik.values.title}
                changeevent={formik.handleChange}
                list={establishmentListItem.title.map((title: any) => (
                  <MenuItem
                    sx={{ whiteSpace: "unset" }}
                    key={title.id}
                    value={formik.values.title}
                  >
                    {formik.values.title}
                  </MenuItem>
                ))}
              />
            </Grid>
            <Grid item xs={2.4}>
              <Common.CellmaInputField
                label={translate("initials", language)}
                disabled
                name="initials"
                defaultValue=""
                maxLength="6"
                value={formik.values.initials ?? ""}
                onHandleChange={formik.handleChange}
              />
            </Grid>
            <Grid item xs={2.4}>
              <Common.CellmaInputField
                label={translate("familyName", language)}
                disabled
                name="familyName"
                value={formik.values.familyName ?? ""}
                onHandleChange={formik.handleChange}
                style={{ textTransform: "capitalize" }}
                maxLength="20"
                onKeyPress={allowCharHyphenApostropheSpace}
              />
            </Grid>
            <Grid item xs={2.4}>
              <Common.CellmaInputField
                label={translate("givenName", language)}
                disabled
                name="givenName"
                value={formik.values.givenName ?? ""}
                onHandleChange={formik.handleChange}
                style={{ textTransform: "capitalize" }}
                maxLength="20"
                onKeyPress={allowCharHyphenApostropheSpace}
              />
            </Grid>

            <Grid item xs={2.4}>
              <Common.CellmaInputField
                label={translate("practiceCode", language)}
                disabled
                name="practiceCode"
                maxLength="10"
                value={formik.values.practiceCode ?? ""}
                onHandleChange={formik.handleChange}
              />
            </Grid>
            <Grid item xs={2.4}>
              <Common.CellmaInputField
                label={translate("practiceName", language)}
                disabled
                name="practiceName"
                maxLength="255"
                value={formik.values.practiceName ?? ""}
                onHandleChange={formik.handleChange}
              />
            </Grid>
            <Grid item xs={2.4}>
              <Common.CellmaInputField
                label={translate("gpCode", language)}
                disabled
                name="gpCode"
                maxLength="255"
                value={formik.values.gpCode ?? ""}
                onHandleChange={formik.handleChange}
              />
            </Grid>
            <Grid item xs={2.4}>
              <Common.CellmaButton
                label={translate("findGP", language)}
                type="submit"
              />
            </Grid>
            <Grid
              item
              container
              spacing={2}
              xs={12}
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                mt: "30px",
              }}
            >
              <Grid item>
                <Common.CellmaButton
                  label={translate("save", language)}
                  onClick={() => {
                    dispatch(
                      setSnackbar(
                        true,
                        "success",
                        translate("patientGpUpdatedSuccessfully", language),
                        2
                      )
                    );
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
        )}
      </form>

      {isFindGpClicked && (
        <Mui.Backdrop open>
          <Common.CellmaPopup
            fullScreen
            title={translate("findGP", language)}
            handleCancel={() => {
              setIsFindGpClicked(false);
            }}
          >
            <Mui.Grid container spacing={1} padding={3}>
              <Mui.Grid item xs={12}>
                <GpList
                  handleCancel={() => {
                    setIsFindGpClicked(false);
                  }}
                  isShowEditGpColumn
                  mode={props?.mode}
                />
              </Mui.Grid>
            </Mui.Grid>
          </Common.CellmaPopup>
        </Mui.Backdrop>
      )}
    </Box>
  );
};

export default PatientGP;
