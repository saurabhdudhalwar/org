import { Grid, MenuItem } from "@mui/material";
import { useSelector } from "react-redux";

import { GridItem } from "./ExistingPatientDetails";
import * as Common from "../../../../common/CommonComponentsIndex";
import { isError } from "../../../../utils/GeneralUtils";
import * as validations from "../../../../utils/Validations";
import { BILLING } from "../../assets/dummyData/ExistingPatientDummyData";
import translate from "../../assets/translationFiles/existingPatientDetailsTranslation";

const TemporaryContactDetails = (props: any) => {
  const { language } = useSelector((state: any) => state.language);

  return (
    <Grid
      container
      spacing={{
        xs: 2,
        md: 3,
      }}
      paddingY="20px"
    >
      <Grid container item xs={12} spacing={3}>
        <GridItem>
          <Common.CellmaInputField
            label={translate("email", language)}
            name="tempAddressEmail"
            ariaLabel="tempContactEmail"
            value={props?.data?.values?.tempAddressEmail ?? ""}
            onBlur={props?.data?.handleBlur}
            maxLength="45"
            onHandleChange={(event: any) => {
              props.handleSaveButton(!event.target.value && event.target.value);
              props?.data?.setFieldValue(
                "tempAddressEmail",
                event.target.value
              );
            }}
            errorText={isError(props?.data, "tempAddressEmail")}
          />
        </GridItem>
        <GridItem>
          <Common.CellmaInputField
            label={translate("mobile", language)}
            ariaLabel="tempContactMobile"
            onHandleChange={(event: any) => {
              props.handleSaveButton(!event.target.value && event.target.value);
              props?.data?.setFieldValue(
                "tempAddressMobile",
                event.target.value
              );
            }}
            type="tel"
            name="tempAddressMobile"
            maxLength="10"
            value={props?.data?.values?.tempAddressMobile ?? ""}
            onBlur={validations.checkMobileValidation}
            onKeyPress={validations.restrictAlphabetsAndSpecialCharacters}
            onPaste={validations.restrictPastingCharactersAndSpecialSymbols}
            onInput={(event: any) => {
              event.target.value = event.target.value.toString().slice(0, 10);
            }}
          />
        </GridItem>
        <GridItem>
          <Common.CellmaInputField
            label={translate("phone", language)}
            name="tempAddressPhone"
            ariaLabel="tempContactPhone"
            value={props?.data?.values?.tempAddressPhone ?? ""}
            onBlur={props?.data?.handleBlur}
            onKeyPress={validations.restrictAlphabetsAndSpecialCharacters}
            maxLength="20"
            onPaste={
              validations.restrictPasteEventForSpecialCharactersAndAlphabets
            }
            onHandleChange={(event: any) => {
              props.handleSaveButton(!event.target.value && event.target.value);
              props?.data?.setFieldValue(
                "tempAddressPhone",
                event.target.value
              );
            }}
          />
        </GridItem>
        <GridItem>
          <Common.CellmaDatePicker
            label={translate("startDate", language)}
            name="tempAddressStartDate"
            maxDate={new Date("12/31/2050")}
            value={props?.data?.values?.tempAddressStartDate}
            onChange={(newDate: Date | null) => {
              props.handleSaveButton(!newDate && newDate);
              props?.data?.setFieldValue("tempAddressStartDate", newDate);
              props?.data?.setFieldTouched("tempAddressStartDate", true, false);
            }}
            onBlur={props?.data?.handleBlur}
            error={
              props.data.touched.tempAddressStartDate &&
              props.data.errors.tempAddressStartDate
                ? props.data.errors.tempAddressStartDate
                : ""
            }
          />
        </GridItem>
      </Grid>
      <Grid container item xs={12} spacing={3}>
        <GridItem>
          <Common.CellmaDatePicker
            label={translate("endDate", language)}
            name="tempAddressEndDate"
            maxDate={new Date("12/31/2050")}
            value={props?.data?.values?.tempAddressEndDate}
            onChange={(newDate: Date | null) => {
              props.handleSaveButton(!newDate && newDate);

              props?.data?.setFieldValue("tempAddressEndDate", newDate);
              props?.data?.setFieldTouched("tempAddressEndDate", true, false);
            }}
            onBlur={props?.data?.handleBlur}
            error={
              props.data.touched.tempAddressEndDate &&
              props.data.errors.tempAddressEndDate
                ? props.data.errors.tempAddressEndDate
                : ""
            }
          />
        </GridItem>
        <GridItem>
          <Common.CellmaSelectField
            label={translate("billing", language)}
            name="tempAddBillingAddress"
            ariaLabel="tempContactBilling"
            value={props?.data?.values?.tempAddBillingAddress ?? ""}
            changeevent={(event: any) => {
              props.handleSaveButton(!event.target.value && event.target.value);
              props?.data?.setFieldValue(
                "tempAddBillingAddress",
                event.target.value
              );
            }}
            onBlur={props?.data?.handleBlur}
            list={BILLING.map((patientWeb: any) => (
              <MenuItem
                sx={{ whiteSpace: "unset" }}
                key={patientWeb.id}
                value={patientWeb.name}
              >
                {translate(`${patientWeb.name}`, language)}
              </MenuItem>
            ))}
          />
        </GridItem>
      </Grid>
    </Grid>
  );
};

export default TemporaryContactDetails;
