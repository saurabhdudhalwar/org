import { Grid } from "@mui/material";
import { useSelector } from "react-redux";

import { GridItem } from "./ExistingPatientDetails";
import * as Common from "../../../../common/CommonComponentsIndex";
import translate from "../../assets/translationFiles/existingPatientDetailsTranslation";

export const Gp = (props: any) => {
  const { language } = useSelector((state: any) => state.language);

  return (
    <Grid container spacing={3} paddingY="20px">
      {/* If default Preference setting is off "Show Familyname" */}
      {props?.patientGp?.gpInformation?.egpFullname === "" && (
        <Grid container item xs={12} spacing={3}>
          <GridItem>
            <Common.CellmaInputField
              disabled
              label={translate("title", language)}
              value={props?.data?.values?.egpTitle ?? ""}
              onHandleChange={props?.data?.handleChange}
            />
          </GridItem>
          <GridItem>
            <Common.CellmaInputField
              disabled
              label={translate("initials", language)}
              value={props?.data?.values?.egpInitials ?? ""}
              onHandleChange={props?.data?.handleChange}
            />
          </GridItem>
          <GridItem>
            <Common.CellmaInputField
              disabled
              label={translate("familyName", language)}
              value={props?.data?.values?.egpSurname ?? ""}
              onHandleChange={props?.data?.handleChange}
            />
          </GridItem>
          <GridItem>
            <Common.CellmaInputField
              disabled
              label={translate("givenName", language)}
              value={props?.data?.values?.egpFirstName ?? ""}
              onHandleChange={props?.data?.handleChange}
            />
          </GridItem>
        </Grid>
      )}

      <Grid container item xs={12} spacing={3}>
        {/* If default Preference setting is on "Show Show GP full name" */}
        {props?.patientGp?.gpInformation?.egpFullname !== "" && (
          <GridItem>
            <Common.CellmaInputField
              disabled
              label={translate("gpFullName", language)}
              value={props?.data?.values?.egpFullname ?? ""}
              onHandleChange={props?.data?.handleChange}
            />
          </GridItem>
        )}
        <GridItem>
          <Common.CellmaInputField
            disabled
            label={translate("gpCode", language)}
            value={props?.data?.values?.egpGpCode ?? ""}
            onHandleChange={props?.data?.handleChange}
          />
        </GridItem>
        <GridItem>
          <Common.CellmaInputField
            disabled
            label={translate("gpPhoneNumber", language)}
            value={props?.data?.values?.egpAddPhone ?? ""}
            onHandleChange={props?.data?.handleChange}
          />
        </GridItem>
        <GridItem>
          <Common.CellmaInputField
            disabled
            label={translate("practiceCode", language)}
            value={props?.data?.values?.egpPctCode ?? ""}
            onHandleChange={props?.data?.handleChange}
          />
        </GridItem>
        <GridItem>
          <Common.CellmaInputField
            disabled
            label={translate("practiceName", language)}
            value={props?.data?.values?.egpPctName ?? ""}
            onHandleChange={props?.data?.handleChange}
          />
        </GridItem>
        <GridItem>
          <Common.CellmaInputField
            disabled
            label={translate("healthCCG", language)}
            value={props?.data?.values?.egpCcg ?? ""}
            onHandleChange={props?.data?.handleChange}
          />
        </GridItem>
        <GridItem>
          <Common.CellmaInputField
            disabled
            label={translate("email", language)}
            ariaLabel="emailGP"
            value={props?.data?.values?.epgAddEmail ?? ""}
            onHandleChange={props?.data?.handleChange}
          />
        </GridItem>
      </Grid>

      {/* <Grid container item xs={12} spacing={3}> */}
    </Grid>
  );
};

export default Gp;
