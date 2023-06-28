import { useState } from "react";

import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import * as Mui from "@mui/material";
import { useSelector } from "react-redux";

import { GridItem } from "./DemographicsAccordions";
import * as Common from "../../../../common/CommonComponentsIndex";
import { getGender } from "../../../../utils/GeneralUtils";
import { useGetPatientExistingAddress } from "../../api/usePatientAddress";
import usePIPs from "../../api/usePIPs";
import translate from "../../assets/translationFiles/patientDemographicsTranslation";

const addressSearch = [
  { postcode: "422009", numberRoad: "Kharadi,Pune" },
  { postcode: "422010", numberRoad: "Panvel,Mumbai" },
  { postcode: "890257", numberRoad: "Port of Spain" },
  { postcode: "987458", numberRoad: "Delhi" },
  { postcode: "472315", numberRoad: "Nashik" },
];

const PatientInterestedParties = () => {
  const [isSameAddress, setIsSameAddress] = useState(true);
  const [isShowPopup, setIsShowPopup] = useState(true);
  const { language } = useSelector((state: any) => state.language);
  const { patientId } = useSelector((state: any) => state.patient);
  const { patientInterestedPartyList } = usePIPs(patientId);
  const { data: patientAddress } = useGetPatientExistingAddress(patientId);

  return (
    <Mui.Grid container paddingX={{ xs: "none", sm: "40px" }}>
      {patientInterestedPartyList?.map((data: any) => (
        <>
          <Mui.Grid item container xs={12} sm={6}>
            <GridItem>
              <Mui.Typography variant="h2">
                {translate("givenName", language)}:
              </Mui.Typography>
            </GridItem>
            <GridItem>
              <Mui.Typography variant="h3">
                {data?.pipFirstname ? data?.pipFirstname : "-"}
              </Mui.Typography>
            </GridItem>
            <GridItem>
              <Mui.Typography variant="h2">
                {translate("familyName", language)}:
              </Mui.Typography>
            </GridItem>
            <GridItem>
              <Mui.Typography variant="h3">
                {data?.pipSurname ? data?.pipSurname : "-"}
              </Mui.Typography>
            </GridItem>
            <GridItem>
              <Mui.Typography variant="h2">
                {translate("currentGender", language)}:
              </Mui.Typography>
            </GridItem>
            <GridItem>
              <Mui.Typography variant="h3">
                {data?.pipGender ? getGender(data?.pipGender) : "-"}
              </Mui.Typography>
            </GridItem>
            <GridItem>
              <Mui.Typography variant="h2">
                {translate("relationship", language)}:
              </Mui.Typography>
            </GridItem>
            <GridItem>
              <Mui.Typography variant="h3">
                {data?.pipRelationship ? data?.pipRelationship : "-"}
              </Mui.Typography>
            </GridItem>
            <GridItem>
              <Mui.Typography variant="h2">
                {translate("nextOfKin", language)}:
              </Mui.Typography>
            </GridItem>
            <GridItem>
              <Mui.Typography variant="h3">
                {data?.pipNextOfKin === 1 ? "Yes" : "No"}
              </Mui.Typography>
            </GridItem>
            <GridItem>
              <Mui.Typography variant="h2">
                {translate("consent", language)}:
              </Mui.Typography>
            </GridItem>
            <GridItem>
              {data?.pipConsent === "1" ? (
                <CheckIcon sx={{ color: "success.main" }} />
              ) : (
                <CloseIcon sx={{ color: "warning.dark" }} />
              )}
            </GridItem>
          </Mui.Grid>
          <Mui.Grid item container xs={12} sm={6}>
            <GridItem>
              <Mui.Typography variant="h2">
                {translate("familyAwareOfIllness", language)}:
              </Mui.Typography>
            </GridItem>
            <GridItem>
              {data?.pipFamilyAwareIllness === 1 ? (
                <CheckIcon sx={{ color: "success.main" }} />
              ) : (
                <CloseIcon sx={{ color: "warning.dark" }} />
              )}
            </GridItem>
            <GridItem>
              <Mui.Typography variant="h2">
                {translate("isPatient", language)}:
              </Mui.Typography>
            </GridItem>
            <GridItem>
              <Mui.Typography variant="h3">
                {data?.pipPatId === "1" ? "Yes" : "No"}
              </Mui.Typography>
            </GridItem>
            <GridItem>
              <Mui.Typography variant="h2">
                {translate("occupation", language)}:
              </Mui.Typography>
            </GridItem>
            <GridItem>
              <Mui.Typography variant="h3">
                {data?.pipOccupationText ? data?.pipOccupationText : "-"}
              </Mui.Typography>
            </GridItem>
            <GridItem>
              <Mui.Typography variant="h2">
                {translate("ethnicity", language)}:
              </Mui.Typography>
            </GridItem>
            <GridItem>
              <Mui.Typography variant="h3">
                {data?.pipEthnicityText ? data?.pipEthnicityText : "-"}
              </Mui.Typography>
            </GridItem>
            <GridItem>
              <Mui.Typography variant="h2">
                {translate("printPartnerDetails", language)}:
              </Mui.Typography>
            </GridItem>
            <GridItem>
              {data?.pipPartnerPrint === 1 ? (
                <CheckIcon sx={{ color: "success.main" }} />
              ) : (
                <CloseIcon sx={{ color: "warning.dark" }} />
              )}
            </GridItem>
            <GridItem>
              <Mui.Typography variant="h2">
                {translate("address", language)}:
              </Mui.Typography>
            </GridItem>
            <GridItem>
              <Common.CellmaLink
                label={translate("view", language)}
                variant="h5"
                onClick={() => {
                  setIsSameAddress(!isSameAddress);
                  setIsShowPopup(true);
                }}
              >
                {translate("view", language)}
              </Common.CellmaLink>
            </GridItem>
            <GridItem />
          </Mui.Grid>
          <Mui.Grid item xs={12}>
            {patientInterestedPartyList?.length > 1 ? <Mui.Divider /> : ""}
          </Mui.Grid>
        </>
      ))}

      {patientInterestedPartyList?.totalCount === 0 && (
        <Mui.Grid
          item
          xs={12}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <Mui.Typography variant="h5">
            {translate("noRecordsFound", language)}
          </Mui.Typography>
        </Mui.Grid>
      )}

      {!isSameAddress && isShowPopup && (
        <Common.CellmaPopup
          title={translate("address", language)}
          handleCancel={() => {
            setIsSameAddress(!isSameAddress);
          }}
        >
          <Mui.Box>
            <Mui.Grid
              container
              spacing={3}
              sx={styles.addressPopupContainerGrid}
            >
              <GridItem>
                <Common.CellmaAutocompleteField
                  label={translate("numberAndRoad", language)}
                  name="numberAndRoad"
                  disabled
                  options={addressSearch.map(
                    (option: any) => option.numberRoad
                  )}
                  value={
                    patientAddress?.entity.permanentAddress?.addAddress1
                      ? patientAddress?.entity.permanentAddress?.addAddress1
                      : ""
                  }
                />
              </GridItem>
              <GridItem>
                <Common.CellmaInputField
                  label={translate("district", language)}
                  name="district"
                  disabled
                  value={
                    patientAddress?.entity.permanentAddress?.addAddress2
                      ? patientAddress?.entity.permanentAddress?.addAddress2
                      : ""
                  }
                />
              </GridItem>
              <GridItem>
                <Common.CellmaInputField
                  label={translate("town", language)}
                  disabled
                  value={
                    patientAddress?.entity.permanentAddress?.addAddress3
                      ? patientAddress?.entity.permanentAddress?.addAddress3
                      : ""
                  }
                  name="town"
                />
              </GridItem>
              <GridItem>
                <Common.CellmaInputField
                  label={translate("county", language)}
                  disabled
                  name="county"
                  value={
                    patientAddress?.entity.permanentAddress?.addAddress4
                      ? patientAddress?.entity.permanentAddress?.addAddress4
                      : ""
                  }
                />
              </GridItem>
              <GridItem>
                <Common.CellmaAutocompleteField
                  label={translate("postcode", language)}
                  disabled
                  name="postcode"
                  options={addressSearch.map((option: any) => option.postcode)}
                  value={
                    patientAddress?.entity.permanentAddress?.addAddress5
                      ? patientAddress?.entity.permanentAddress?.addAddress5
                      : ""
                  }
                />
              </GridItem>
              <GridItem>
                <Common.CellmaInputField
                  label={translate("country", language)}
                  disabled
                  name="country"
                  value={
                    patientAddress?.entity.permanentAddress?.addAddress6
                      ? patientAddress?.entity.permanentAddress?.addAddress6
                      : ""
                  }
                />
              </GridItem>
              <GridItem>
                <Common.CellmaInputField
                  label={translate("locale", language)}
                  disabled
                  name="locale"
                  value={
                    patientAddress?.entity.permanentAddress?.addLocale
                      ? patientAddress?.entity.permanentAddress?.addLocale
                      : ""
                  }
                />
              </GridItem>
              <GridItem>
                <Common.CellmaInputField
                  label={translate("phone", language)}
                  disabled
                  name="phone"
                  value={
                    patientAddress?.entity.permanentAddress?.addPhone
                      ? patientAddress?.entity.permanentAddress?.addPhone
                      : ""
                  }
                />
              </GridItem>
              <GridItem>
                <Common.CellmaInputField
                  label={translate("email", language)}
                  disabled
                  name="addEmail"
                  value={
                    patientAddress?.entity.permanentAddress?.addEmail
                      ? patientAddress?.entity.permanentAddress?.addEmail
                      : ""
                  }
                />
              </GridItem>
              <GridItem>
                <Common.CellmaInputField
                  label={translate("mobile", language)}
                  disabled
                  name="addMobile"
                  maxLength="16"
                  value={
                    patientAddress?.entity.permanentAddress?.addMobile
                      ? patientAddress?.entity.permanentAddress?.addMobile
                      : ""
                  }
                />
              </GridItem>
              <GridItem>
                <Common.CellmaInputField
                  label={translate("fax", language)}
                  disabled
                  name="fax"
                  value={
                    patientAddress?.entity.permanentAddress?.addFax
                      ? patientAddress?.entity.permanentAddress?.addFax
                      : ""
                  }
                />
              </GridItem>
            </Mui.Grid>
            <Mui.Grid container item xs={12} sx={styles.addressPopupButton} />
          </Mui.Box>
        </Common.CellmaPopup>
      )}
    </Mui.Grid>
  );
};

export default PatientInterestedParties;
const styles = {
  addressPopupContainerGrid: {
    paddingY: "15px",
    paddingX: "35px",
  },
  addressPopupButton: {
    paddingLeft: "500px",
  },
  mainGridContainer: {
    display: "flex",
    justifyContent: "center",
  },
  link: {
    color: "primary.dark",
    textDecoration: "none",
  },
};
