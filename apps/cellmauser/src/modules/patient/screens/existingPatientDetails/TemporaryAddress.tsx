import Grid from "@mui/material/Grid";
import { useSelector } from "react-redux";

import { GridItem } from "./ExistingPatientDetails";
import * as Common from "../../../../common/CommonComponentsIndex";
import { isError } from "../../../../utils/GeneralUtils";
import {
  allowDigitCharacterSpace,
  restrictCutCopyPaste,
} from "../../../../utils/Validations";
import translate from "../../assets/translationFiles/existingPatientDetailsTranslation";

const TemporaryAddress = (props: any) => {
  const { language } = useSelector((state: any) => state.language);
  const { estPatientPostcodeMandatory } = useSelector(
    (state: any) => state.auth
  );

  return (
    <Grid container spacing={3} paddingY="20px">
      <Grid container item xs={12} spacing={3}>
        <GridItem>
          <Common.CellmaInputField
            label={translate("companyName", language)}
            name="tempAddCompanyName"
            ariaLabel="tempAddressCompanyName"
            value={props?.data?.values?.tempAddCompanyName ?? ""}
            maxLength="255"
            onBlur={props?.data?.handleBlur}
            onHandleChange={(event: any) => {
              props.handleSaveButton(!event.target.value && event.target.value);
              props?.data?.setFieldValue(
                "tempAddCompanyName",
                event.target.value
              );
            }}
          />
        </GridItem>
        <GridItem>
          <Common.CellmaInputField
            label={translate("numberAndRoad", language)}
            name="tempAddAddress1"
            ariaLabel="tempAddressNumberAndRoad"
            value={props?.data?.values?.tempAddAddress1 ?? ""}
            maxLength="255"
            onBlur={props?.data?.handleBlur}
            onHandleChange={(event: any) => {
              props.handleSaveButton(!event.target.value && event.target.value);
              props?.data?.setFieldValue("tempAddAddress1", event.target.value);
            }}
          />
        </GridItem>
        <GridItem>
          <Common.CellmaInputField
            disabled
            label={translate("district", language)}
            name="tempAddAddress2"
            ariaLabel="tempAddressDistrict"
            value={props?.data?.values?.tempAddAddress2 ?? ""}
            maxLength="255"
            onBlur={props?.data?.handleBlur}
            onHandleChange={(event: any) => {
              props.handleSaveButton(!event.target.value && event.target.value);
              props?.data?.setFieldValue("tempAddAddress2", event.target.value);
            }}
          />
        </GridItem>
        <GridItem>
          <Common.CellmaInputField
            disabled
            label={translate("town", language)}
            name="tempAddAddress3"
            ariaLabel="tempAddressTown"
            value={props?.data?.values?.tempAddAddress3 ?? ""}
            maxLength="255"
            onBlur={props?.data?.handleBlur}
            onHandleChange={(event: any) => {
              props.handleSaveButton(!event.target.value && event.target.value);
              props?.data?.setFieldValue("tempAddAddress3", event.target.value);
            }}
          />
        </GridItem>
      </Grid>
      <Grid container item xs={12} spacing={3}>
        <GridItem>
          <Common.CellmaInputField
            disabled
            label={translate("county", language)}
            name="tempAddAddress4"
            ariaLabel="tempAddressCounty"
            value={props?.data?.values?.tempAddAddress4 ?? ""}
            maxLength="255"
            onBlur={props?.data?.handleBlur}
            onHandleChange={(event: any) => {
              props.handleSaveButton(!event.target.value && event.target.value);
              props?.data?.setFieldValue("tempAddAddress4", event.target.value);
            }}
          />
        </GridItem>
        <GridItem>
          <Common.CellmaInputField
            label={translate("postCode", language)}
            name="tempAddAddress5"
            ariaLabel="tempAddressPostCode"
            value={props?.data?.values?.tempAddAddress5 ?? ""}
            onKeyPress={allowDigitCharacterSpace}
            onPaste={restrictCutCopyPaste}
            maxLength="20"
            required={estPatientPostcodeMandatory === 1}
            style={{ textTransform: "uppercase" }}
            onBlur={props?.data?.handleBlur}
            onHandleChange={(event: any) => {
              props.handleSaveButton(!event.target.value && event.target.value);
              props?.data?.setFieldValue("tempAddAddress5", event.target.value);
            }}
            errorText={isError(props?.data, "tempAddAddress5")}
          />
        </GridItem>
        <GridItem>
          <Common.CellmaInputField
            disabled
            label={translate("country", language)}
            name="tempAddAddress6"
            ariaLabel="tempAddressCountry"
            value={props?.data?.values?.tempAddAddress6 ?? ""}
            maxLength="255"
            onBlur={props?.data?.handleBlur}
            onHandleChange={(event: any) => {
              props.handleSaveButton(!event.target.value && event.target.value);
              props?.data?.setFieldValue("tempAddAddress6", event.target.value);
            }}
          />
        </GridItem>
        <GridItem>
          <Common.CellmaInputField
            disabled
            label={translate("healthRegion", language)}
            name="tempAddHealthRegionEliId"
            ariaLabel="tempAddressHealthRegion"
            value={props?.data?.values?.tempAddHealthRegionEliId ?? ""}
            maxLength="255"
            onBlur={props?.data?.handleBlur}
            onHandleChange={(event: any) => {
              props.handleSaveButton(!event.target.value && event.target.value);
              props?.data?.setFieldValue(
                "tempAddHealthRegionEliId",
                event.target.value
              );
            }}
          />
        </GridItem>
      </Grid>
    </Grid>
  );
};
export default TemporaryAddress;
