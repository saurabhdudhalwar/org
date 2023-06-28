import * as Mui from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import * as Common from "../../../../common/CommonComponentsIndex";
import { setSnackbar } from "../../../../store/SnackbarAction";
import translate from "../../assets/translationFiles/listScreenTranslation";

const GridItem = (props: any) => {
  return (
    <Mui.Grid
      container
      item
      xs={6}
      sx={{ display: "flex", alignContent: "baseline" }}
    >
      <Mui.Grid item xs={12}>
        {props.children}
      </Mui.Grid>
    </Mui.Grid>
  );
};

const ClinicLocationAddressPopup = ({ handelCloseClinicPopup }: any) => {
  const { language } = useSelector((state: any) => state.language);

  const dispatch = useDispatch();

  const saveClinicAddress = () => {
    dispatch(
      setSnackbar(
        true,
        "success",
        translate("clinicLocationAddressAdded", language),
        4
      )
    );
    handelCloseClinicPopup();
  };

  return (
    <Common.CellmaPopup
      title={translate("clinicLocationAddress", language)}
      handleCancel={() => {
        handelCloseClinicPopup();
      }}
    >
      <Mui.Grid container padding={2} spacing={2}>
        <GridItem>
          <Common.CellmaInputField
            label={translate("numberAndRoad", language)}
            name="numberAndRoad"
          />
        </GridItem>
        <GridItem>
          <Common.CellmaInputField
            label={translate("email", language)}
            name="email"
          />
        </GridItem>
        <GridItem>
          <Common.CellmaInputField
            label={translate("district", language)}
            name="district"
          />
        </GridItem>
        <GridItem>
          <Common.CellmaInputField
            label={translate("phone", language)}
            name="phone"
          />
        </GridItem>
        <GridItem>
          <Common.CellmaInputField
            label={translate("town", language)}
            name="town"
          />
        </GridItem>
        <GridItem>
          <Common.CellmaInputField
            label={translate("mobile", language)}
            name="mobile"
          />
        </GridItem>
        <GridItem>
          <Common.CellmaInputField
            label={translate("county", language)}
            name="county"
          />
        </GridItem>
        <GridItem>
          <Common.CellmaInputField
            label={translate("fax", language)}
            name="fax"
          />
        </GridItem>
        <GridItem>
          <Common.CellmaInputField
            label={translate("postcode", language)}
            name="postcode"
          />
        </GridItem>
        <GridItem>
          <Common.CellmaInputField
            label={translate("workPhone", language)}
            name="workPhone"
          />
        </GridItem>
        <GridItem>
          <Common.CellmaInputField
            label={translate("country", language)}
            name="country"
          />
        </GridItem>

        <Mui.Grid sx={styles.popupButton} xs={12}>
          <Common.CellmaButton
            type="submit"
            label={translate("save", language)}
            onClick={() => saveClinicAddress()}
          />
        </Mui.Grid>
      </Mui.Grid>
    </Common.CellmaPopup>
  );
};

export default ClinicLocationAddressPopup;

export const styles = {
  popupButton: {
    display: "flex",
    justifyContent: "flex-end",
  },
};
