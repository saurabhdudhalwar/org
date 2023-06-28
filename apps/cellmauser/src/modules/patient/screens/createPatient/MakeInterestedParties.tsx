import { Box, Grid, Typography } from "@mui/material";
import { useSelector } from "react-redux";

import * as Common from "../../../../common/CommonComponentsIndex";
import translate from "../../assets/translationFiles/createPatientTranslation";

interface Props {
  data: any;
}

const MakeInterestedParties: React.FC<Props> = (props) => {
  const { language } = useSelector((state: any) => state.language);

  return (
    <Box>
      <Grid container item xs={12} sx={styles.consentTypographyGridContainer}>
        <Grid item xs={8}>
          <Typography color="error.main">
            {translate("consentForPhotographsAndRecordings", language)}
          </Typography>
        </Grid>
      </Grid>

      <Grid container item xs={12} spacing={3}>
        <Grid item xs={7} sx={styles.checkBoxGrid}>
          <Common.CellmaCheckbox
            label={translate("assistingInPartner'sCareAndTreatments", language)}
            inputName="partnerCare"
            value={props.data.values.partnerCare}
            onHandleChange={props.data.handleChange}
          />
        </Grid>
        <Grid item xs={5}>
          <Common.CellmaDatePicker
            label={translate("date", language)}
            disabled
            maxDate={new Date()}
            maxWidth={150}
            value={props.data.values.partnerCareDate}
            name="partnerCareDate"
          />
        </Grid>
        <Grid item xs={7} sx={styles.checkBoxGrid}>
          <Common.CellmaCheckbox
            label={translate(
              "helpingPatientsAndTheirFamiliesUnderstandingTheImplantProcess",
              language
            )}
            inputName="helpingPatient"
            value={props.data.values.helpingPatient}
            onHandleChange={props.data.handleChange}
          />
        </Grid>
        <Grid item xs={5}>
          <Common.CellmaDatePicker
            label={translate("date", language)}
            disabled
            maxDate={new Date()}
            maxWidth={150}
            value={props.data.values.helpingPatientDate}
            name="helpingPatientDate"
          />
        </Grid>
        <Grid item xs={7} sx={styles.checkBoxGrid}>
          <Common.CellmaCheckbox
            label={translate(
              "beingPhotographedOrVideoedForOn-goingTrainingAndTeachingPurposes",
              language
            )}
            inputName="photographed"
            value={props.data.values.photographed}
            onHandleChange={props.data.handleChange}
          />
        </Grid>
        <Grid item xs={5}>
          <Common.CellmaDatePicker
            label={translate("date", language)}
            disabled
            maxDate={new Date()}
            maxWidth={150}
            value={props.data.values.photographedDate}
            name="photographedDate"
          />
        </Grid>

        <Grid item xs={7} sx={styles.checkBoxGrid}>
          <Common.CellmaCheckbox
            label={translate(
              "forUseOnTheUniversityHospitalSouthamptonWebsiteAndGeneralPublicity",
              language
            )}
            inputName="generalPublicity"
            value={props.data.values.generalPublicity}
            onHandleChange={props.data.handleChange}
          />
        </Grid>
        <Grid item xs={5}>
          <Common.CellmaDatePicker
            label={translate("date", language)}
            disabled
            maxDate={new Date()}
            maxWidth={150}
            value={props.data.values.generalPublicityDate}
            name="generalPublicityDate"
          />
        </Grid>
      </Grid>
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
