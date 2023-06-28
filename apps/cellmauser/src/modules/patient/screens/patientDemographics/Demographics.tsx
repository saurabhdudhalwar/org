// Page Name : "demographics"
// Page Id : "c4pat10"

import { useEffect, useState } from "react";

import EditIcon from "@mui/icons-material/Edit";
import PersonIcon from "@mui/icons-material/Person";
import * as Mui from "@mui/material";
import { Formik, FormikProps } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useOutletContext } from "react-router-dom";

import DemographicsAccordions from "./DemographicsAccordions";
import * as Common from "../../../../common/CommonComponentsIndex";
import { lowerCaseAllWordsExceptFirstLetters } from "../../../../utils/GeneralUtils";
import usePatientBanner from "../../api/usePatientBanner";
import {
  useGetPatientPhoto,
  useUploadPatientPhoto,
} from "../../api/usePatientPhoto";
import translate from "../../assets/translationFiles/patientDemographicsTranslation";
import { setActiveScreenName } from "../../store/PatientAction";

const Demographics = () => {
  const [imageState, setImageState] = useState("");
  const [consentValue, setConsentValue] = useState("Yes");
  const navigate = useNavigate();
  const { language } = useSelector((state: any) => state.language);
  const [file, setFile] = useState<string | Blob>("");
  const dispatch = useDispatch();
  const { setTitle, setIsLink } = useOutletContext() as any; // <-- access context value
  setTitle(translate("patientDetail", language));
  const { patientId } = useSelector((state: any) => state.patient);
  const { loadPatientPhoto } = useUploadPatientPhoto();
  const { data: patientBanner } = usePatientBanner(patientId, !!patientId);
  const { data: photoURL } = useGetPatientPhoto(parseInt(patientId, 10));

  useEffect(() => {
    setIsLink(true);
    dispatch(setActiveScreenName("DemographicScreen"));
    window.scrollTo(0, 0);
  }, []);

  // changed the value of radio button
  const handleChangeConsent = (event: any) => {
    setConsentValue(event.target.value);
  };

  return (
    <Formik
      initialValues={{
        file: "",
      }}
      onSubmit={() => {}}
    >
      {(data: FormikProps<any>) => {
        return (
          <form onSubmit={data.handleSubmit} noValidate>
            <Mui.Grid container sx={styles.alignCenter} rowGap={2}>
              <Mui.Grid
                item
                xs={11.5}
                sx={{ display: "flex", justifyContent: "flex-end" }}
              >
                <Mui.Tooltip
                  title={translate("editDetails", language)}
                  placement="right"
                  arrow
                >
                  <Mui.Avatar
                    sx={{ bgcolor: "primary.main", width: 30, height: 30 }}
                    data-testid="Edit Patient"
                  >
                    <EditIcon
                      onClick={() =>
                        navigate("/cellmaUser/patient/editPatient")
                      }
                    />
                  </Mui.Avatar>
                </Mui.Tooltip>
              </Mui.Grid>
              <Mui.Grid container item xs={12} sx={styles.alignCenter}>
                <Mui.Grid item>
                  <Mui.Paper
                    variant="outlined"
                    sx={{ width: "120px", height: "160px" }}
                  >
                    <input
                      type="file"
                      accept="image/*"
                      name="image"
                      id="file"
                      onChange={(event: any) => {
                        loadPatientPhoto(event, patientId);
                      }}
                      style={{ display: "none" }}
                      onClick={(event: any) => {
                        event.target.value = null;
                      }}
                      disabled={consentValue === "No"}
                    />
                    {photoURL ? (
                      <img
                        style={{ width: "120px", height: "160px" }}
                        alt="profile Pic"
                        src={photoURL}
                        id="output"
                      />
                    ) : (
                      <Mui.Avatar
                        data-testid="Edit Image"
                        sx={styles.patientEditIcon}
                      >
                        <PersonIcon />
                      </Mui.Avatar>
                    )}
                  </Mui.Paper>
                </Mui.Grid>
                <label
                  aria-label="editImageDemographics"
                  htmlFor="file"
                  style={{ cursor: "pointer" }}
                >
                  <Mui.Grid item sx={styles.editProfile}>
                    <Mui.Tooltip
                      title={translate("editImage", language)}
                      placement="right"
                      arrow
                    >
                      <Mui.Avatar data-testid="Edit Image" sx={styles.editIcon}>
                        <EditIcon sx={styles.badgeEditIcon} />
                      </Mui.Avatar>
                    </Mui.Tooltip>
                  </Mui.Grid>
                </label>
              </Mui.Grid>
              <Mui.Grid
                item
                xs={12}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <Mui.Typography
                  variant="subtitle1"
                  sx={{ color: "primary.main" }}
                >
                  {patientBanner?.entity?.patientBannerJson?.patSurname
                    ? lowerCaseAllWordsExceptFirstLetters(
                        patientBanner?.entity?.patientBannerJson?.patSurname
                      )
                    : ""}
                  ,{" "}
                  {patientBanner?.entity?.patientBannerJson?.patFirstname ?? ""}{" "}
                  ({patientBanner?.entity?.patientBannerJson?.patBarcode ?? ""})
                </Mui.Typography>
              </Mui.Grid>
              <Mui.Grid item xs={12} sx={styles.alignCenter}>
                <Mui.FormControl>
                  <Mui.Stack direction="row" spacing={{ xs: 2, sm: 4 }}>
                    <Mui.Grid sx={styles.text1}>
                      <Mui.Typography>
                        {translate("consentForPhotographs", language)}
                      </Mui.Typography>
                    </Mui.Grid>
                    <Mui.RadioGroup
                      row
                      id="consentsForPhotographsButton"
                      name="consentsForPhotographs"
                      value={consentValue}
                      onChange={handleChangeConsent}
                    >
                      <Mui.FormControlLabel
                        value="Yes"
                        control={<Mui.Radio data-testid="Photo Consent Yes" />}
                        label={translate("yes", language)}
                        checked={consentValue === "Yes"}
                      />
                      <Mui.FormControlLabel
                        value="No"
                        control={<Mui.Radio data-testid="Photo Consent No" />}
                        label={translate("no", language)}
                        onChange={() => setImageState("")}
                      />
                    </Mui.RadioGroup>
                    <Common.CellmaButton
                      disabled={consentValue === "No"}
                      onClick={() => {
                        setFile("");
                      }}
                      label={translate("save", language)}
                    />
                  </Mui.Stack>
                </Mui.FormControl>
              </Mui.Grid>
              <Mui.Grid item xs={12}>
                <DemographicsAccordions />
              </Mui.Grid>
            </Mui.Grid>
          </form>
        );
      }}
    </Formik>
  );
};

const styles = {
  alignCenter: {
    display: "flex",
    justifyContent: "center",
  },
  button: {
    display: "flex",
    gap: "2.5rem",
  },
  text1: {
    justifyContent: "center",
    mt: "10px",
  },
  patientEditIcon: {
    backgroundColor: "common.white",
    border: "0px solid ",
    color: "primary.main",
    borderColor: "grey.300",
    height: "160px",
    width: "120px",
    justifyContent: "center",
  },
  editIcon: {
    backgroundColor: "common.white",
    border: "1px solid ",
    color: "primary.main",
    borderColor: "grey.300",
    height: "25px",
    width: "25px",
  },
  badgeEditIcon: {
    height: "15px",
    width: "15px",
    color: "grey.800",
  },
  editProfile: {
    display: "flex",
    justifyContent: "center",
    ml: "-15px",
    mt: "-10px",
  },
};

export default Demographics;
