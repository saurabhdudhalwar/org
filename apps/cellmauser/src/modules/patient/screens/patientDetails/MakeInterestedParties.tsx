// This page is merged with create patient/MakeInterestedParties page and this page is for reference for react-team.
//  delete this page after integrating functionality
import { useState } from "react";

import { Box, Grid, Typography } from "@mui/material";
import { useSelector } from "react-redux";

import * as Common from "../../../../common/CommonComponentsIndex";
import translate from "../../assets/translationFiles/createPatientTranslation";

const MakeInterestedParties = () => {
  const [isPartnerCareDate, setIsPartnerCareDatee] = useState<Date | null>(
    new Date()
  );
  const [isHelpingPatientDate, setIsHelpingPatientDate] = useState<Date | null>(
    new Date()
  );
  const [isPhotographedDate, setIsPhotographedDate] = useState<Date | null>(
    new Date()
  );
  const [isGeneralPublicityDate, setIsGeneralPublicityDate] =
    useState<Date | null>(new Date());
  const [isGeneralPublicity, setIsGeneralPublicity] = useState(false);
  const { language } = useSelector((state: any) => state.language);

  return (
    <Box>
      {/* <Grid container item xs={12} sx={styles.consentTypographyGridContainer}>
        <Grid item xs={8}>
          <Typography color="error.main">
            {translate("consentForPhotographsAndRecordings", language)}
          </Typography>
        </Grid>
      </Grid>

      <Grid container item xs={12} spacing={3}>
        <Grid item xs={6} sx={styles.titleGrid}>
          <Typography variant="h3">
            {translate("assistingInPartner'sCareAndTreatments", language)}
          </Typography>
        </Grid>
        <Grid item xs={1} sx={styles.checkBoxGrid}>
          <Common.CellmaCheckbox />
        </Grid>
        <Grid item xs={5}>
          <Common.CellmaDatePicker
            disabled
            maxDate={new Date()}
            value={isPartnerCareDate}
            maxWidth={150}
            onChange={(newDate: any) => setIsPartnerCareDatee(newDate)}
          />
        </Grid>
        <Grid item xs={6} sx={styles.titleGrid}>
          <Typography variant="h3">
            {translate(
              "helpingPatientsAndTheirFamiliesUnderstandingTheImplantProcess",
              language
            )}
          </Typography>
        </Grid>
        <Grid item xs={1} sx={styles.checkBoxGrid}>
          <Common.CellmaCheckbox />
        </Grid>
        <Grid item xs={5}>
          <Common.CellmaDatePicker
            disabled
            maxDate={new Date()}
            value={isHelpingPatientDate}
            maxWidth={150}
            onChange={(newDate: any) => setIsHelpingPatientDate(newDate)}
          />
        </Grid>
        <Grid item xs={6} sx={styles.titleGrid}>
          <Typography variant="h3">
            {translate(
              "beingPhotographedOrVideoedForOn-goingTrainingAndTeachingPurposes",
              language
            )}
          </Typography>
        </Grid>
        <Grid item xs={1} sx={styles.checkBoxGrid}>
          <Common.CellmaCheckbox />
        </Grid>
        <Grid item xs={5}>
          <Common.CellmaDatePicker
            disabled
            maxDate={new Date()}
            value={isPhotographedDate}
            maxWidth={150}
            onChange={(newDate: any) => setIsPhotographedDate(newDate)}
          />
        </Grid>
        <Grid item xs={6} sx={styles.titleGrid}>
          <Typography variant="h3">
            {translate(
              "forUseOnTheUniversityHospitalSouthamptonWebsiteAndGeneralPublicity",
              language
            )}
          </Typography>
        </Grid>
        <Grid item xs={1} sx={styles.checkBoxGrid}>
          <Common.CellmaCheckbox
            onHandleChange={() => setIsGeneralPublicity(!isGeneralPublicity)}
          />
        </Grid>
        <Grid item xs={5}>
          <Common.CellmaDatePicker
            disabled
            maxDate={new Date()}
            value={isGeneralPublicityDate}
            maxWidth={150}
            onChange={(newDate: any) => setIsGeneralPublicityDate(newDate)}
          />
        </Grid>
      </Grid> */}
    </Box>
  );
};
export default MakeInterestedParties;

const styles = {
  checkBoxGrid: {
    display: "flex",
    alignItems: "center",
  },

  consentTypographyGridContainer: {
    marginY: "10px",
  },
  titleGrid: {
    display: "flex",
    alignItems: "center",
  },
};
