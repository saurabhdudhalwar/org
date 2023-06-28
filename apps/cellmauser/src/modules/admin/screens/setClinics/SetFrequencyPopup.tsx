import React, { MouseEventHandler, useState } from "react";

import * as Mui from "@mui/material";
import { useDispatch } from "react-redux";

import * as Common from "../../../../common/CommonComponentsIndex";
import { setSnackbar } from "../../../../store/SnackbarAction";
import * as dummyData from "../../assets/dummyData/setClinicsDummyData";
import t from "../../assets/translationFiles/setClinicsTranslation";

interface Props {
  handleCancel: MouseEventHandler<SVGSVGElement> | undefined;
  handleSave(): unknown;
}

const SetFrequencyPopup: React.FC<Props> = (props) => {
  const dispatch = useDispatch();

  return (
    <Mui.Backdrop open>
      <Common.CellmaPopup
        title={t("changeFrequency")}
        handleCancel={props.handleCancel}
      >
        <Mui.Grid item xs={12} sx={{ margin: "20px" }}>
          <Common.CellmaAutoSelectField
            dummyData
            label={t("changeFrequency")}
            name="changeFrequency"
            ariaLabel="changeFrequency"
            options={dummyData.FREQUENCY}
            getOptionLabel={(occurrence: any) => occurrence.label ?? ""}
            renderOption={(props: any, occurrence: any) => (
              <li {...props}>{occurrence.label}</li>
            )}
          />
        </Mui.Grid>
        <Mui.Grid item xs={12} sx={{ ...styles.alignEnd, marginX: "20px" }}>
          <Common.CellmaButton
            onClick={() => {
              props.handleSave();
              dispatch(
                setSnackbar(
                  true,
                  "success",
                  t("frequencyUpdatedSuccessfully"),
                  4
                )
              );
            }}
            label={t("save")}
          />
        </Mui.Grid>
      </Common.CellmaPopup>
    </Mui.Backdrop>
  );
};

export default SetFrequencyPopup;

const styles = {
  alignCenter: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  alignEnd: { display: "flex", justifyContent: "flex-end" },
  headerText: { my: "15px" },
};
